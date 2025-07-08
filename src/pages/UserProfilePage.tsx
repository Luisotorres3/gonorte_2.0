import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc, updateDoc, Timestamp, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase/config';
import type { UserProfile as UserProfileType } from '../types/user';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { 
  FaDownload, 
  FaFileUpload, 
  FaExternalLinkAlt, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt, 
  FaClock, 
  FaWeight, 
  FaPercentage, 
  FaStickyNote, 
  FaDumbbell, 
  FaEdit, 
  FaTimes,
  FaSave,
  FaArrowLeft,
  FaUserTie,
  FaUserGraduate,
  FaUserShield
} from 'react-icons/fa';

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

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get role icon
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <FaUserShield className="w-5 h-5" />;
      case 'coach':
        return <FaUserGraduate className="w-5 h-5" />;
      case 'client':
        return <FaUser className="w-5 h-5" />;
      default:
        return <FaUser className="w-5 h-5" />;
    }
  };

  // Get role color
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'coach':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'client':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800';
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        {location.state?.from && (
          <button 
            onClick={() => navigate(location.state.from)} 
            className="mb-6 flex items-center text-text-muted-light dark:text-text-muted-dark hover:text-text-default-light dark:hover:text-text-default-dark transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" />
            {t('common.back', 'Volver atrás')}
          </button>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 text-sm text-semantic-error-light dark:text-semantic-error-dark bg-semantic-error-light/20 dark:bg-semantic-error-dark/20 rounded-xl border border-semantic-error-light/30 dark:border-semantic-error-dark/30">
            {error}
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-500">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {profileData?.displayName ? getUserInitials(profileData.displayName) : 'U'}
                </div>
                {profileData?.role && (
                  <div className={`absolute -bottom-2 -right-2 p-2 rounded-full border-2 border-white dark:border-slate-800 ${getRoleColor(profileData.role)}`}>
                    {getRoleIcon(profileData.role)}
                  </div>
                )}
              </div>

              {/* User Info */}
              <div>
                <h1 className="text-3xl font-bold text-text-default-light dark:text-text-default-dark mb-2">
                  {profileData?.displayName || t('profile.noName', 'Usuario')}
                </h1>
                <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-3">
                  {profileData?.email}
                </p>
                {profileData?.role && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(profileData.role)}`}>
                    {getRoleIcon(profileData.role)}
                    <span className="ml-2">{t(`roles.${profileData.role}`, profileData.role)}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Edit Button */}
            {canEditProfile() && (
              <button
                onClick={handleEditToggle}
                className={`mt-6 lg:mt-0 flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg
                  ${isEditing
                    ? 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-text-default-light dark:text-text-default-dark'
                    : 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white'}`}
              >
                {isEditing ? (
                  <>
                    <FaTimes className="mr-2" />
                    {t('profile.cancelButton', 'Cancelar')}
                  </>
                ) : (
                  <>
                    <FaEdit className="mr-2" />
                    {t('profile.editButton', 'Editar Perfil')}
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 transition-colors duration-500">
            <h2 className="text-xl font-bold text-text-default-light dark:text-text-default-dark mb-6 flex items-center">
              <FaUser className="mr-3 text-teal-600 dark:text-teal-400" />
              {t('profile.personalInfo', 'Información Personal')}
            </h2>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('profile.form.displayName', 'Nombre Completo')}
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                    placeholder={t('profile.form.displayNamePlaceholder', 'Tu nombre completo')}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('profile.form.email', 'Correo Electrónico')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={profileData?.email || ''}
                    disabled
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-600 border border-gray-200 dark:border-slate-600 rounded-xl text-text-muted-light dark:text-text-muted-dark cursor-not-allowed transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('profile.form.phone', 'Teléfono')}
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                    placeholder={t('profile.form.phonePlaceholder', '+34 600 000 000')}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="px-6 py-3 rounded-xl font-medium transition-all duration-300 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-text-default-light dark:text-text-default-dark"
                  >
                    {t('profile.form.cancelButton', 'Cancelar')}
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white disabled:opacity-50 flex items-center"
                  >
                    <FaSave className="mr-2" />
                    {isLoading ? t('profile.form.savingButton', 'Guardando...') : t('profile.form.saveButton', 'Guardar')}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <InfoCard 
                  icon={<FaUser className="w-5 h-5" />}
                  label={t('profile.display.displayName', 'Nombre Completo')}
                  value={profileData?.displayName}
                  t={t}
                />
                <InfoCard 
                  icon={<FaEnvelope className="w-5 h-5" />}
                  label={t('profile.display.email', 'Correo Electrónico')}
                  value={profileData?.email}
                  t={t}
                />
                <InfoCard 
                  icon={<FaPhone className="w-5 h-5" />}
                  label={t('profile.display.phone', 'Teléfono')}
                  value={profileData?.phoneNumber}
                  t={t}
                />
                {profileData?.registrationDate && (
                  <InfoCard 
                    icon={<FaCalendarAlt className="w-5 h-5" />}
                    label={t('profile.display.registrationDate', 'Miembro Desde')}
                    value={profileData.registrationDate instanceof Date ? profileData.registrationDate.toLocaleDateString() : ''}
                    t={t}
                  />
                )}
                {profileData?.lastLoginDate && (
                  <InfoCard 
                    icon={<FaClock className="w-5 h-5" />}
                    label={t('profile.display.lastLogin', 'Último Acceso')}
                    value={profileData.lastLoginDate instanceof Date ? profileData.lastLoginDate.toLocaleString() : ''}
                    t={t}
                  />
                )}
              </div>
            )}
          </div>

          {/* Client Data Card */}
          {profileData?.role === 'client' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 transition-colors duration-500">
              <h2 className="text-xl font-bold text-text-default-light dark:text-text-default-dark mb-6 flex items-center">
                <FaDumbbell className="mr-3 text-teal-600 dark:text-teal-400" />
                {t('profile.clientDataTitle', 'Datos del Cliente')}
              </h2>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                      {t('profile.form.weight', 'Peso (kg)')}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      id="weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                      placeholder="70.5"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bodyFatPercentage" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                      {t('profile.form.bodyFat', 'Grasa Corporal (%)')}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      id="bodyFatPercentage"
                      value={bodyFatPercentage}
                      onChange={(e) => setBodyFatPercentage(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                      placeholder="15.0"
                    />
                  </div>

                  <div>
                    <label htmlFor="clientNotes" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                      {t('profile.form.clientNotes', 'Notas del Cliente')}
                    </label>
                    <textarea
                      id="clientNotes"
                      rows={3}
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder={t('profile.form.clientNotesPlaceholder', 'Notas sobre el progreso, objetivos, etc.')}
                    />
                  </div>

                  {(userRole === 'admin' || userRole === 'coach') && (
                    <div>
                      <label htmlFor="assignedPlanId" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                        {t('profile.form.assignedPlanId', 'Plan de Entrenamiento Asignado')}
                      </label>
                      <input
                        type="text"
                        id="assignedPlanId"
                        value={assignedPlanId}
                        onChange={(e) => setAssignedPlanId(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                        placeholder={t('profile.form.planIdPlaceholder', 'Ej: P001')}
                      />
                      <p className="mt-1 text-xs text-text-muted-light dark:text-text-muted-dark">
                        {t('profile.form.planIdHelp', 'ID del plan asignado. Los detalles se gestionan por separado.')}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <InfoCard 
                    icon={<FaWeight className="w-5 h-5" />}
                    label={t('profile.display.weight', 'Peso (kg)')}
                    value={profileData.weight?.toString()}
                    t={t}
                  />
                  <InfoCard 
                    icon={<FaPercentage className="w-5 h-5" />}
                    label={t('profile.display.bodyFat', 'Grasa Corporal (%)')}
                    value={profileData.bodyFatPercentage?.toString()}
                    t={t}
                  />
                  <InfoCard 
                    icon={<FaStickyNote className="w-5 h-5" />}
                    label={t('profile.display.clientNotes', 'Notas del Cliente')}
                    value={profileData.notes}
                    isBlock={true}
                    t={t}
                  />
                  <InfoCard 
                    icon={<FaDumbbell className="w-5 h-5" />}
                    label={t('profile.display.assignedPlanId', 'Plan Asignado')}
                    value={profileData.assignedPlanId}
                    t={t}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Files Section */}
        {profileData?.role === 'client' && profileData.coachUploadedFiles && profileData.coachUploadedFiles.length > 0 && (
          <div className="mt-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 transition-colors duration-500">
              <h2 className="text-xl font-bold text-text-default-light dark:text-text-default-dark mb-6 flex items-center">
                <FaDownload className="mr-3 text-teal-600 dark:text-teal-400" />
                {t('profile.coachUploadedFiles.title', 'Archivos del Entrenador')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profileData.coachUploadedFiles.map((file, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-slate-600 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-default-light dark:text-text-default-dark mb-1">{file.fileName}</p>
                        {file.description && (
                          <p className="text-xs text-text-muted-light dark:text-text-muted-dark mb-2">{file.description}</p>
                        )}
                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                          {t('profile.coachUploadedFiles.uploadedAt', 'Subido:')} {file.uploadedAt instanceof Date ? file.uploadedAt.toLocaleDateString() : ''}
                        </p>
                      </div>
                    </div>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 text-xs font-medium text-teal-700 dark:text-teal-300 hover:text-teal-800 dark:hover:text-teal-200 border border-teal-200 dark:border-teal-700 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-300"
                      title={t('profile.coachUploadedFiles.downloadTooltip', 'Descargar/Ver Archivo')}
                    >
                      <FaDownload className="mr-1.5 h-3 w-3" />
                      {t('profile.coachUploadedFiles.downloadButton', 'Ver/Descargar')}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Coach Upload Section */}
        {isEditing && (userRole === 'admin' || userRole === 'coach') && profileData?.role === 'client' && (
          <div className="mt-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 transition-colors duration-500">
              <h2 className="text-xl font-bold text-text-default-light dark:text-text-default-dark mb-6 flex items-center">
                <FaFileUpload className="mr-3 text-teal-600 dark:text-teal-400" />
                {t('profile.coachUpload.title', 'Subir Archivo para Cliente')}
              </h2>
              <form onSubmit={handleCoachFileUpload} className="space-y-4 p-6 border-2 border-dashed border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                <div>
                  <label htmlFor="coachFile" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('profile.coachUpload.selectFileLabel', 'Seleccionar Archivo (Máx 10MB)')}
                  </label>
                  <input
                    type="file"
                    id="coachFile"
                    onChange={handleCoachFileChange}
                    className="w-full text-sm text-text-muted-light dark:text-text-muted-dark
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-teal-600 file:text-white
                      hover:file:bg-teal-700 transition-colors"
                  />
                  {coachFile && (
                    <p className="mt-2 text-xs text-text-muted-light dark:text-text-muted-dark">
                      {t('profile.coachUpload.selectedFile', 'Seleccionado:')} {coachFile.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="coachFileDescription" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('profile.coachUpload.descriptionLabel', 'Descripción del Archivo (Opcional)')}
                  </label>
                  <input
                    type="text"
                    id="coachFileDescription"
                    value={coachFileDescription}
                    onChange={(e) => setCoachFileDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                    placeholder={t('profile.coachUpload.descriptionPlaceholder', 'Ej: Plan de Dieta Semanal, Notas de Forma')}
                  />
                </div>
                {coachUploadError && (
                  <p className="text-sm text-semantic-error-light dark:text-semantic-error-dark bg-semantic-error-light/20 dark:bg-semantic-error-dark/20 p-3 rounded-lg">
                    {coachUploadError}
                  </p>
                )}
                <div>
                  <button
                    type="submit"
                    disabled={isUploadingCoachFile || !coachFile || isLoading}
                    className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 transition-all duration-300"
                  >
                    <FaFileUpload className="mr-2 h-4 w-4"/>
                    {isUploadingCoachFile ? t('profile.coachUpload.uploadingButton', 'Subiendo...') : t('profile.coachUpload.uploadButton', 'Subir Archivo')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoCard: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  value?: string | null; 
  isBlock?: boolean; 
  t: TFunction 
}> = ({ icon, label, value, isBlock, t }) => {
  if (value === undefined || value === null || value.trim() === '') {
    value = t('profile.notSet', { defaultValue: 'No establecido' });
  }
  
  return (
    <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300">
      <div className="flex-shrink-0 w-8 h-8 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center text-teal-600 dark:text-teal-400">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <dt className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wide mb-1">
          {label}
        </dt>
        <dd className={`text-sm text-text-default-light dark:text-text-default-dark ${isBlock ? 'whitespace-pre-wrap' : ''}`}>
          {value}
        </dd>
      </div>
    </div>
  );
};

export default UserProfilePage;
