import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc, updateDoc, Timestamp, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase/config'; // storage import added
import type { UserProfile as UserProfileType } from '../types/user'; // Renamed to avoid conflict
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { FaDownload, FaFileUpload, FaExternalLinkAlt } from 'react-icons/fa'; // Icons for file display

const UserProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const { currentUser, userRole, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
            setClientNotes(data.notes || '');
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('edit') === '1') setIsEditing(true);
  }, [location.search]);

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
            setClientNotes(profileData.notes || '');
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
        coachUploadedFiles: [
          ...(prev.coachUploadedFiles || []),
          {
            ...fileMetadata,
            uploadedAt: (fileMetadata.uploadedAt instanceof Timestamp)
              ? fileMetadata.uploadedAt.toDate()
              : fileMetadata.uploadedAt,
          }
        ]
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
      updatedData.notes = clientNotes || null;
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
      <div className="bg-neutral-surface-light dark:bg-neutral-surface-dark shadow-xl rounded-lg p-6 md:p-8 transition-colors duration-300">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-text-default-light dark:text-text-default-dark">
              {isEditing ? t('profile.editTitle', 'Edit Profile') : t('profile.viewTitle', 'User Profile')}
            </h1>
            {!isEditing && <p className="text-text-muted-light dark:text-text-muted-dark">{profileData.displayName || t('profile.noName', 'N/A')}</p>}
          </div>
          {canEditProfile() && (
            <button
              onClick={handleEditToggle}
              className={`mt-4 md:mt-0 px-6 py-2 rounded-lg font-medium transition-colors
                ${isEditing
                  ? 'bg-neutral-border-light hover:bg-neutral-border-light/80 dark:bg-neutral-border-dark dark:hover:bg-neutral-border-dark/80 text-text-default-light dark:text-text-default-dark'
                  : 'bg-primary-DEFAULT hover:bg-primary-hover text-text-default-dark dark:text-text-default-light'}`}
            >
              {isEditing ? t('profile.cancelButton', 'Cancel') : t('profile.editButton', 'Edit Profile')}
            </button>
          )}
        </div>

        {error && <div className="mb-4 p-3 text-sm text-semantic-error-light dark:text-semantic-error-dark bg-semantic-error-light/20 dark:bg-semantic-error-dark/20 rounded-lg">{error}</div>}

        {location.state?.from && (
          <button onClick={() => navigate(location.state.from)} className="mb-4 px-4 py-2 bg-neutral-border-light dark:bg-neutral-border-dark text-text-default-light dark:text-text-default-dark rounded hover:opacity-80 transition-opacity">
            Volver atrás
          </button>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark">{t('profile.form.displayName', 'Full Name')}</label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-neutral-background-light dark:bg-neutral-background-dark border border-neutral-border-light dark:border-neutral-border-dark rounded-md shadow-sm text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT dark:focus:border-primary-dark transition-colors duration-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark">{t('profile.form.email', 'Email')}</label>
              <input
                type="email"
                id="email"
                value={profileData.email || ''}
                disabled
                className="mt-1 block w-full px-3 py-2 bg-neutral-background-light/50 dark:bg-neutral-background-dark/50 border border-neutral-border-light dark:border-neutral-border-dark rounded-md shadow-sm text-text-muted-light dark:text-text-muted-dark cursor-not-allowed transition-colors duration-300"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark">{t('profile.form.phone', 'Phone Number')}</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-neutral-background-light dark:bg-neutral-background-dark border border-neutral-border-light dark:border-neutral-border-dark rounded-md shadow-sm text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT dark:focus:border-primary-dark transition-colors duration-300"
              />
            </div>

            {profileData.role === 'client' && (
              <>
                <hr className="my-6 border-neutral-border-light dark:border-neutral-border-dark" />
                <h2 className="text-xl font-semibold text-text-default-light dark:text-text-default-dark">{t('profile.clientDataTitle', 'Client Data')}</h2>
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark">{t('profile.form.weight', 'Weight (kg)')}</label>
                  <input
                    type="number"
                    step="0.1"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-neutral-background-light dark:bg-neutral-background-dark border border-neutral-border-light dark:border-neutral-border-dark rounded-md shadow-sm text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT dark:focus:border-primary-dark transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="bodyFatPercentage" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark">{t('profile.form.bodyFat', 'Body Fat (%)')}</label>
                  <input
                    type="number"
                    step="0.1"
                    id="bodyFatPercentage"
                    value={bodyFatPercentage}
                    onChange={(e) => setBodyFatPercentage(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-neutral-background-light dark:bg-neutral-background-dark border border-neutral-border-light dark:border-neutral-border-dark rounded-md shadow-sm text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT dark:focus:border-primary-dark transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="clientNotes" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark">{t('profile.form.clientNotes', 'Client Notes (Coach/Admin visible)')}</label>
                  <textarea
                    id="clientNotes"
                    rows={3}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-neutral-background-light dark:bg-neutral-background-dark border border-neutral-border-light dark:border-neutral-border-dark rounded-md shadow-sm text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT dark:focus:border-primary-dark transition-colors duration-300"
                  />
                </div>
                {(userRole === 'admin' || userRole === 'coach') && profileData.role === 'client' && (
                  <div>
                    <label htmlFor="assignedPlanId" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark">
                      {t('profile.form.assignedPlanId', 'Assigned Training Plan ID')}
                    </label>
                    <input
                      type="text"
                      id="assignedPlanId"
                      value={assignedPlanId}
                      onChange={(e) => setAssignedPlanId(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-neutral-background-light dark:bg-neutral-background-dark border border-neutral-border-light dark:border-neutral-border-dark rounded-md shadow-sm text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT dark:focus:border-primary-dark transition-colors duration-300"
                      placeholder={t('profile.form.planIdPlaceholder', 'Enter Plan ID (e.g., P001)')}
                    />
                    <p className="mt-1 text-xs text-text-muted-light dark:text-text-muted-dark">
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
                className="px-6 py-2 rounded-lg font-medium transition-colors bg-neutral-border-light hover:bg-neutral-border-light/80 dark:bg-neutral-border-dark dark:hover:bg-neutral-border-dark/80 text-text-default-light dark:text-text-default-dark"
              >
                {t('profile.form.cancelButton', 'Cancel')}
              </button>
              <button
                type="submit"
                disabled={isLoading || isUploadingCoachFile}
                className="px-6 py-2 rounded-lg font-medium transition-colors text-text-default-dark dark:text-text-default-light bg-primary-DEFAULT hover:bg-primary-hover active:bg-primary-active disabled:opacity-50"
              >
                {isLoading ? t('profile.form.savingButton', 'Saving...') : t('profile.form.saveButton', 'Save Changes')}
              </button>
            </div>
          </form>
        ) : (
          // READ-ONLY VIEW
          <div className="space-y-4">
            <InfoRow label={t('profile.display.displayName', 'Full Name:')} value={profileData.displayName} t={t} />
            <InfoRow label={t('profile.display.email', 'Email:')} value={profileData.email} t={t} />
            <InfoRow label={t('profile.display.phone', 'Phone:')} value={profileData.phoneNumber} t={t} />
            <InfoRow label={t('profile.display.role', 'Role:')} value={profileData.role ? t(`roles.${profileData.role}`, profileData.role) : undefined} t={t} />
            {profileData.registrationDate && (
                <InfoRow label={t('profile.display.registrationDate', 'Member Since:')} value={profileData.registrationDate instanceof Date ? profileData.registrationDate.toLocaleDateString() : ''} t={t} />
            )}
            {profileData.lastLoginDate && (
                 <InfoRow label={t('profile.display.lastLogin', 'Last Login:')} value={profileData.lastLoginDate instanceof Date ? profileData.lastLoginDate.toLocaleString() : ''} t={t} />
            )}

            {profileData.role === 'client' && (
              <>
                <hr className="my-6 border-neutral-border-light dark:border-neutral-border-dark" />
                <h2 className="text-xl font-semibold text-text-default-light dark:text-text-default-dark mb-3">{t('profile.clientDataTitle', 'Client Data')}</h2>
                <InfoRow label={t('profile.display.weight', 'Weight (kg):')} value={profileData.weight?.toString()} t={t} />
                <InfoRow label={t('profile.display.bodyFat', 'Body Fat (%):')} value={profileData.bodyFatPercentage?.toString()} t={t} />
                <InfoRow label={t('profile.display.clientNotes', 'Client Notes:')} value={profileData.notes} isBlock={true} t={t} />
                <InfoRow label={t('profile.display.assignedPlanId', 'Assigned Plan ID:')} value={profileData.assignedPlanId} t={t} />
              </>
            )}

            {profileData.role === 'client' && profileData.coachUploadedFiles && profileData.coachUploadedFiles.length > 0 && (
              <div className="mt-8 pt-6 border-t border-neutral-border-light dark:border-neutral-border-dark">
                <h2 className="text-xl font-semibold text-text-default-light dark:text-text-default-dark mb-3">
                  {t('profile.coachUploadedFiles.title', 'Files from Coach/Admin')}
                </h2>
                <ul className="space-y-3">
                  {profileData.coachUploadedFiles.map((file, index) => (
                    <li key={index} className="p-3 bg-neutral-background-light dark:bg-neutral-background-dark/50 rounded-md flex justify-between items-center border border-neutral-border-light dark:border-neutral-border-dark">
                      <div>
                        <p className="text-sm font-medium text-text-default-light dark:text-text-default-dark">{file.fileName}</p>
                        {file.description && <p className="text-xs text-text-muted-light dark:text-text-muted-dark">{file.description}</p>}
                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                          {t('profile.coachUploadedFiles.uploadedAt', 'Uploaded:')} {file.uploadedAt instanceof Date ? file.uploadedAt.toLocaleDateString() : ''}
                        </p>
                      </div>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 px-3 py-1.5 text-xs font-medium text-primary-dark dark:text-primary-light hover:text-primary-DEFAULT dark:hover:text-primary-DEFAULT border border-primary-DEFAULT/50 dark:border-primary-light/50 rounded-md hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-colors flex items-center"
                        title={t('profile.coachUploadedFiles.downloadTooltip', 'Download/View File')}
                      >
                        <FaDownload className="mr-1.5 h-3 w-3 icon-primary" /> {t('profile.coachUploadedFiles.downloadButton', 'View/Download')}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {isEditing && (userRole === 'admin' || userRole === 'coach') && profileData?.role === 'client' && (
          <div className="mt-8 pt-6 border-t border-neutral-border-light dark:border-neutral-border-dark">
            <h2 className="text-xl font-semibold text-text-default-light dark:text-text-default-dark mb-4">
              {t('profile.coachUpload.title', 'Upload File for Client')}
            </h2>
            <form onSubmit={handleCoachFileUpload} className="space-y-4 p-4 border border-dashed border-neutral-border-light dark:border-neutral-border-dark rounded-lg">
              <div>
                <label htmlFor="coachFile" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark">
                  {t('profile.coachUpload.selectFileLabel', 'Select File (Max 10MB)')}
                </label>
                <input
                  type="file"
                  id="coachFile"
                  onChange={handleCoachFileChange}
                  className="mt-1 block w-full text-sm text-text-muted-light dark:text-text-muted-dark
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-accent-light file:text-accent-dark dark:file:bg-accent-dark dark:file:text-accent-light
                    hover:file:bg-accent-DEFAULT dark:hover:file:bg-accent-hover transition-colors"
                />
                {coachFile && <p className="mt-1 text-xs text-text-muted-light dark:text-text-muted-dark">{t('profile.coachUpload.selectedFile', 'Selected:')} {coachFile.name}</p>}
              </div>
              <div>
                <label htmlFor="coachFileDescription" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark">
                  {t('profile.coachUpload.descriptionLabel', 'File Description (Optional)')}
                </label>
                <input
                  type="text"
                  id="coachFileDescription"
                  value={coachFileDescription}
                  onChange={(e) => setCoachFileDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-neutral-background-light dark:bg-neutral-background-dark border border-neutral-border-light dark:border-neutral-border-dark rounded-md shadow-sm text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-accent-DEFAULT dark:focus:ring-accent-dark focus:border-accent-DEFAULT dark:focus:border-accent-dark sm:text-sm transition-colors"
                  placeholder={t('profile.coachUpload.descriptionPlaceholder', 'E.g., Weekly Diet Plan, Form Check Video Notes')}
                />
              </div>
              {coachUploadError && <p className="text-sm text-semantic-error-light dark:text-semantic-error-dark">{coachUploadError}</p>}
              <div>
                <button
                  type="submit"
                  disabled={isUploadingCoachFile || !coachFile || isLoading}
                  className="w-full sm:w-auto flex items-center justify-center px-6 py-2 bg-accent-DEFAULT text-text-default-dark dark:text-text-default-light font-medium rounded-md hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-dark dark:focus:ring-accent-light disabled:opacity-50 transition-colors"
                >
                  <FaFileUpload className="mr-2 h-4 w-4 icon-default"/>
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

const InfoRow: React.FC<{ label: string; value?: string | null; isBlock?: boolean; t: TFunction }> = ({ label, value, isBlock, t }) => {
  if (value === undefined || value === null || value.trim() === '') {
    value = t('profile.notSet', { defaultValue: 'Not set' });
  }
  return (
    <div className={`py-2 ${isBlock ? '' : 'sm:grid sm:grid-cols-3 sm:gap-4 items-center'}`}>
      <dt className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">{label}</dt>
      <dd className={`mt-1 text-sm text-text-default-light dark:text-text-default-dark ${isBlock ? 'whitespace-pre-wrap' : 'sm:mt-0 sm:col-span-2'}`}>{value}</dd>
    </div>
  );
};

export default UserProfilePage;
