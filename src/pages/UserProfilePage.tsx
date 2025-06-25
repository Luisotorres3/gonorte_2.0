import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, Timestamp, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase/config'; // storage import added
import type { UserProfile as UserProfileType } from '../types/user'; // Renamed to avoid conflict
import { useTranslation } from 'react-i18next';
import { FaDownload, FaFileUpload, FaExternalLinkAlt } from 'react-icons/fa'; // Icons for file display

const UserProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const { currentUser, userRole, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<UserProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  // Client specific fields
  const [weight, setWeight] = useState<number | string>('');
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | string>('');
  const [clientNotes, setClientNotes] = useState('');
  const [assignedPlanId, setAssignedPlanId] = useState('');

  // Coach/Admin file upload state
  const [coachFile, setCoachFile] = useState<File | null>(null);
  const [coachFileDescription, setCoachFileDescription] = useState('');
  const [isUploadingCoachFile, setIsUploadingCoachFile] = useState(false);
  const [coachUploadError, setCoachUploadError] = useState<string | null>(null);


  useEffect(() => {
    if (!userId) {
      setError(t('profile.errorNoUserId', 'User ID not found.'));
      setIsLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const userDocRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfileType;
          setProfileData(data);
          // Initialize form fields
          setDisplayName(data.displayName || '');
          setPhoneNumber(data.phoneNumber || '');
          if (data.role === 'client') {
            setWeight(data.weight?.toString() || '');
            setBodyFatPercentage(data.bodyFatPercentage?.toString() || '');
            setClientNotes(data.clientNotes || '');
            setAssignedPlanId(data.assignedPlanId || '');
          }
        } else {
          setError(t('profile.errorNotFound', 'User profile not found.'));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(t('profile.errorFetching', 'Failed to fetch profile.'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, t]);

  const canEditProfile = () => {
    if (authLoading || !currentUser || !profileData) return false;
    if (currentUser.uid === userId) return true; // User can edit their own profile
    if (userRole === 'admin') return true; // Admin can edit any profile
    // Coach can edit client profiles - this might need refinement based on coach's assigned clients
    if (userRole === 'coach' && profileData.role === 'client') return true;
    return false;
  };

  const handleEditToggle = () => {
    if (!canEditProfile()) return;
    // If toggling off editing, reset form fields to profileData
    if (isEditing && profileData) {
        setDisplayName(profileData.displayName || '');
        setPhoneNumber(profileData.phoneNumber || '');
        if (profileData.role === 'client') {
            setWeight(profileData.weight?.toString() || '');
            setBodyFatPercentage(profileData.bodyFatPercentage?.toString() || '');
            setClientNotes(profileData.clientNotes || '');
            setAssignedPlanId(profileData.assignedPlanId || '');
        }
    }
    setIsEditing(!isEditing);
  };

  const handleCoachFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoachFile(e.target.files[0]);
      setCoachUploadError(null);
    }
  };

  const handleCoachFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachFile || !currentUser || !userId || !(userRole === 'admin' || userRole === 'coach')) {
      setCoachUploadError(t('profile.coachUpload.noFileOrAuth', 'File or proper authorization missing.'));
      return;
    }
    if (coachFile.size > 10 * 1024 * 1024) { // Example: 10MB limit for coach uploads
        setCoachUploadError(t('profile.coachUpload.fileTooLarge', 'File is too large. Max 10MB.'));
        return;
    }

    setIsUploadingCoachFile(true);
    setCoachUploadError(null);

    const fileExtension = coachFile.name.split('.').pop();
    const uniqueFileName = `${currentUser.uid}_${Date.now()}.${fileExtension}`;
    // Store coach uploads in a subfolder for the specific client they are uploading for
    const coachUploadPath = `userFiles/${userId}/coachUploads/${uniqueFileName}`;
    const fileRef = ref(storage, coachUploadPath);

    try {
      const snapshot = await uploadBytes(fileRef, coachFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const clientUserDocRef = doc(db, 'users', userId); // Document of the client being viewed/edited
      const fileMetadata = {
        url: downloadURL,
        fileName: coachFile.name, // Store original filename
        uploadedAt: Timestamp.now(),
        uploadedBy: currentUser.uid,
        fileType: coachFile.type || fileExtension || 'unknown',
        description: coachFileDescription || '',
      };

      await updateDoc(clientUserDocRef, {
        coachUploadedFiles: arrayUnion(fileMetadata),
      });

      // Update local profileData state to reflect the new file
      setProfileData(prev => prev ? ({
        ...prev,
        coachUploadedFiles: [...(prev.coachUploadedFiles || []), fileMetadata]
      }) : null);

      setCoachFile(null);
      setCoachFileDescription('');
      // Add success feedback (e.g., toast message)
    } catch (error: any) {
      console.error("Error uploading file for coach/admin:", error);
      setCoachUploadError(t('profile.coachUpload.uploadFailed', 'File upload failed. Error: ' + error.message));
    } finally {
      setIsUploadingCoachFile(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEditProfile() || !userId) return;

    setIsLoading(true);
    setError(null);

    const updatedData: Partial<UserProfileType> = {
      displayName,
      phoneNumber: phoneNumber || null, // Store as null if empty
    };

    if (profileData?.role === 'client') {
      updatedData.weight = weight !== '' ? parseFloat(weight as string) : null;
      updatedData.bodyFatPercentage = bodyFatPercentage !== '' ? parseFloat(bodyFatPercentage as string) : null;
      updatedData.clientNotes = clientNotes || null;
      // Only allow admin/coach to change assignedPlanId for a client
      if ((userRole === 'admin' || userRole === 'coach') && profileData.role === 'client') {
        updatedData.assignedPlanId = assignedPlanId.trim() || null;
      }
    }
    // Ensure lastLoginDate and registrationDate are not accidentally overwritten if they are Timestamps
    // We are only updating specific fields.

    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, updatedData);
      setProfileData(prev => prev ? { ...prev, ...updatedData } : null);
      setIsEditing(false);
      // Optionally, show a success message
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(t('profile.errorUpdating', 'Failed to update profile.'));
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return <div className="container mx-auto p-4 text-center">{t('loading', 'Loading...')}</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">{error}</div>;
  }

  if (!profileData) {
    return <div className="container mx-auto p-4 text-center">{t('profile.errorNotFound', 'User profile not found.')}</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {isEditing ? t('profile.editTitle', 'Edit Profile') : t('profile.viewTitle', 'User Profile')}
            </h1>
            {!isEditing && <p className="text-gray-600 dark:text-gray-400">{profileData.displayName || t('profile.noName', 'N/A')}</p>}
          </div>
          {canEditProfile() && (
            <button
              onClick={handleEditToggle}
              className={`mt-4 md:mt-0 px-6 py-2 rounded-lg font-medium transition-colors
                ${isEditing
                  ? 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                  : 'bg-teal-500 hover:bg-teal-600 text-white'}`}
            >
              {isEditing ? t('profile.cancelButton', 'Cancel') : t('profile.editButton', 'Edit Profile')}
            </button>
          )}
        </div>

        {error && <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-300 rounded-lg">{error}</div>}

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('profile.form.displayName', 'Full Name')}</label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('profile.form.email', 'Email')}</label>
              <input
                type="email"
                id="email"
                value={profileData.email || ''}
                disabled
                className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('profile.form.phone', 'Phone Number')}</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {profileData.role === 'client' && (
              <>
                <hr className="my-6 border-gray-200 dark:border-gray-700" />
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{t('profile.clientDataTitle', 'Client Data')}</h2>
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('profile.form.weight', 'Weight (kg)')}</label>
                  <input
                    type="number"
                    step="0.1"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label htmlFor="bodyFatPercentage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('profile.form.bodyFat', 'Body Fat (%)')}</label>
                  <input
                    type="number"
                    step="0.1"
                    id="bodyFatPercentage"
                    value={bodyFatPercentage}
                    onChange={(e) => setBodyFatPercentage(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label htmlFor="clientNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('profile.form.clientNotes', 'Client Notes (Coach/Admin visible)')}</label>
                  <textarea
                    id="clientNotes"
                    rows={3}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                {/* Assigned Training Plan - Visible and Editable by Admin/Coach for Client profiles */}
                {(userRole === 'admin' || userRole === 'coach') && profileData.role === 'client' && (
                  <div>
                    <label htmlFor="assignedPlanId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('profile.form.assignedPlanId', 'Assigned Training Plan ID')}
                    </label>
                    <input
                      type="text"
                      id="assignedPlanId"
                      value={assignedPlanId}
                      onChange={(e) => setAssignedPlanId(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      placeholder={t('profile.form.planIdPlaceholder', 'Enter Plan ID (e.g., P001)')}
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {t('profile.form.planIdHelp', 'Assign a plan ID. Plan details are managed separately.')}
                    </p>
                  </div>
                )}
              </>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleEditToggle}
                className="px-6 py-2 rounded-lg font-medium transition-colors bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
              >
                {t('profile.form.cancelButton', 'Cancel')}
              </button>
              <button
                type="submit"
                disabled={isLoading || isUploadingCoachFile}
                className="px-6 py-2 rounded-lg font-medium transition-colors text-white bg-teal-500 hover:bg-teal-600 disabled:opacity-50"
              >
                {isLoading ? t('profile.form.savingButton', 'Saving...') : t('profile.form.saveButton', 'Save Changes')}
              </button>
            </div>
          </form>
        ) : (
          // READ-ONLY VIEW
          <div className="space-y-4">
            <InfoRow label={t('profile.display.displayName', 'Full Name:')} value={profileData.displayName} />
            <InfoRow label={t('profile.display.email', 'Email:')} value={profileData.email} />
            <InfoRow label={t('profile.display.phone', 'Phone:')} value={profileData.phoneNumber} />
            <InfoRow label={t('profile.display.role', 'Role:')} value={profileData.role ? t(`roles.${profileData.role}`, profileData.role) : undefined} />
            {profileData.registrationDate && (
                <InfoRow label={t('profile.display.registrationDate', 'Member Since:')} value={ (profileData.registrationDate as Timestamp)?.toDate().toLocaleDateString() || 'N/A'} />
            )}
            {profileData.lastLoginDate && (
                 <InfoRow label={t('profile.display.lastLogin', 'Last Login:')} value={(profileData.lastLoginDate as Timestamp)?.toDate().toLocaleString() || 'N/A'} />
            )}

            {profileData.role === 'client' && (
              <>
                <hr className="my-6 border-gray-200 dark:border-gray-700" />
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">{t('profile.clientDataTitle', 'Client Data')}</h2>
                <InfoRow label={t('profile.display.weight', 'Weight (kg):')} value={profileData.weight?.toString()} />
                <InfoRow label={t('profile.display.bodyFat', 'Body Fat (%):')} value={profileData.bodyFatPercentage?.toString()} />
                <InfoRow label={t('profile.display.clientNotes', 'Client Notes:')} value={profileData.clientNotes} isBlock={true} />
                <InfoRow label={t('profile.display.assignedPlanId', 'Assigned Plan ID:')} value={profileData.assignedPlanId} />
                {/* TODO: Link to actual plan details page if planId exists */}
                {/* TODO: Training History, Progress Photos will be added here */}
              </>
            )}
             {/* TODO: Coach specific data if viewing a coach profile */}
             {/* TODO: Admin specific data if viewing an admin profile */}

            {/* Display Coach Uploaded Files - Visible to client, coach, admin */}
            {profileData.role === 'client' && profileData.coachUploadedFiles && profileData.coachUploadedFiles.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  {t('profile.coachUploadedFiles.title', 'Files from Coach/Admin')}
                </h2>
                <ul className="space-y-3">
                  {profileData.coachUploadedFiles.map((file, index) => (
                    <li key={index} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{file.fileName}</p>
                        {file.description && <p className="text-xs text-gray-500 dark:text-gray-400">{file.description}</p>}
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t('profile.coachUploadedFiles.uploadedAt', 'Uploaded:')} {(file.uploadedAt as unknown as Timestamp)?.toDate().toLocaleDateString()}
                          {/* TODO: Display who uploaded it if needed, by fetching uploader's name using file.uploadedBy UID */}
                        </p>
                      </div>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 px-3 py-1.5 text-xs font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 border border-teal-500/50 dark:border-teal-400/50 rounded-md hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors flex items-center"
                        title={t('profile.coachUploadedFiles.downloadTooltip', 'Download/View File')}
                      >
                        <FaDownload className="mr-1.5 h-3 w-3" /> {t('profile.coachUploadedFiles.downloadButton', 'View/Download')}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Coach/Admin File Upload Section - only in edit mode for client profiles */}
        {isEditing && (userRole === 'admin' || userRole === 'coach') && profileData?.role === 'client' && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
              {t('profile.coachUpload.title', 'Upload File for Client')}
            </h2>
            <form onSubmit={handleCoachFileUpload} className="space-y-4 p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <div>
                <label htmlFor="coachFile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('profile.coachUpload.selectFileLabel', 'Select File (Max 10MB)')}
                </label>
                <input
                  type="file"
                  id="coachFile"
                  onChange={handleCoachFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-50 file:text-purple-700 dark:file:bg-purple-700 dark:file:text-purple-50
                    hover:file:bg-purple-100 dark:hover:file:bg-purple-600"
                />
                {coachFile && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{t('profile.coachUpload.selectedFile', 'Selected:')} {coachFile.name}</p>}
              </div>
              <div>
                <label htmlFor="coachFileDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('profile.coachUpload.descriptionLabel', 'File Description (Optional)')}
                </label>
                <input
                  type="text"
                  id="coachFileDescription"
                  value={coachFileDescription}
                  onChange={(e) => setCoachFileDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder={t('profile.coachUpload.descriptionPlaceholder', 'E.g., Weekly Diet Plan, Form Check Video Notes')}
                />
              </div>
              {coachUploadError && <p className="text-sm text-red-500">{coachUploadError}</p>}
              <div>
                <button
                  type="submit"
                  disabled={isUploadingCoachFile || !coachFile || isLoading}
                  className="w-full sm:w-auto flex items-center justify-center px-6 py-2 bg-purple-500 text-white font-medium rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                >
                  <FaFileUpload className="mr-2 h-4 w-4"/>
                  {isUploadingCoachFile ? t('profile.coachUpload.uploadingButton', 'Uploading...') : t('profile.coachUpload.uploadButton', 'Upload File')}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoRow: React.FC<{ label: string; value?: string | null; isBlock?: boolean }> = ({ label, value, isBlock }) => {
  if (value === undefined || value === null || value.trim() === '') {
    value = t('profile.notSet', 'Not set');
  }
  return (
    <div className={`py-2 ${isBlock ? '' : 'sm:grid sm:grid-cols-3 sm:gap-4 items-center'}`}>
      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
      <dd className={`mt-1 text-sm text-gray-900 dark:text-white ${isBlock ? 'whitespace-pre-wrap' : 'sm:mt-0 sm:col-span-2'}`}>{value}</dd>
    </div>
  );
};

export default UserProfilePage;
