import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { doc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config'; // storage is new
import { FaPlay, FaHistory, FaBell, FaCog } from 'react-icons/fa';

const ClientDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [progressUpdateText, setProgressUpdateText] = useState(''); // For text updates
  const [progressPhoto, setProgressPhoto] = useState<File | null>(null);
  const [photoCaption, setPhotoCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null); // For text updates

  const handleTextProgressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !progressUpdateText.trim()) return;

    setIsUploading(true); // Use isUploading for both text and photo for now
    setGeneralError(null);
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        trainingHistory: arrayUnion({ // Or a dedicated 'progressUpdates' field if preferred
          date: Timestamp.now(),
          notes: progressUpdateText,
          type: 'text_update', // Differentiate from completed routines or photo uploads
        }),
      });
      setProgressUpdateText('');
      // Add success feedback, e.g., a toast message
    } catch (err) {
      console.error("Error submitting text progress:", err);
      setGeneralError(t('dashboard.client.progressError', 'Failed to submit progress.'));
    } finally {
      setIsUploading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProgressPhoto(e.target.files[0]);
      setUploadError(null); // Clear previous error on new file selection
    }
  };

  const handlePhotoUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!progressPhoto || !currentUser) {
      setUploadError(t('dashboard.client.photoUpload.noFileError', 'Please select a photo to upload.'));
      return;
    }
    if (progressPhoto.size > 5 * 1024 * 1024) { // Example: 5MB limit
        setUploadError(t('dashboard.client.photoUpload.fileTooLargeError', 'File is too large. Max 5MB.'));
        return;
    }

    setIsUploading(true);
    setUploadError(null);

    const fileExtension = progressPhoto.name.split('.').pop();
    const uniqueFileName = `${currentUser.uid}_${Date.now()}.${fileExtension}`;
    const photoRef = ref(storage, `userFiles/${currentUser.uid}/progressPhotos/${uniqueFileName}`);

    try {
      const snapshot = await uploadBytes(photoRef, progressPhoto);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        progressPhotos: arrayUnion({
          url: downloadURL,
          caption: photoCaption || '',
          uploadedAt: Timestamp.now(),
          fileName: uniqueFileName, // Store filename for reference if needed
        }),
      });

      setProgressPhoto(null);
      setPhotoCaption('');
      // Add success feedback (e.g., toast message)
      // Optionally, re-fetch user data or update local state to show the new photo
    } catch (error: any) {
      console.error("Error uploading photo:", error);
      setUploadError(t('dashboard.client.photoUpload.uploadFailedError', 'Photo upload failed. Please try again. Error: ' + error.message));
    } finally {
      setIsUploading(false);
    }
  };


  if (loading || !currentUser) {
    return <div className="container mx-auto p-4 text-center">{t('loading', 'Loading...')}</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-neutral-surface-light dark:bg-neutral-surface-dark shadow-xl rounded-lg p-6 md:p-8 transition-colors duration-300">
        <h1 className="text-3xl font-bold text-text-default-light dark:text-text-default-dark mb-6">
          {t('dashboard.client.title', { name: (currentUser?.displayName || currentUser?.email || 'Cliente') })}
        </h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Summary Card */}
          <div className="bg-primary-light/30 dark:bg-primary-dark/30 p-6 rounded-lg shadow transition-colors duration-300">
            <h2 className="text-xl font-semibold text-primary-dark dark:text-primary-light mb-3">{t('dashboard.client.profileSummaryTitle', 'Profile Summary')}</h2>
            <p className="text-text-default-light dark:text-text-default-dark"><strong>{t('profile.display.email', 'Email:')}</strong> {currentUser.email}</p>
            <p className="text-text-default-light dark:text-text-default-dark"><strong>{t('profile.display.phone', 'Phone:')}</strong> {currentUser.phoneNumber || t('profile.notSet', 'Not set')}</p>
            <div className="mt-4">
              <Link
                to={`/profile/${currentUser.uid}`}
                className="text-sm font-medium text-primary-dark hover:text-primary-DEFAULT dark:text-primary-light dark:hover:text-primary-DEFAULT transition-colors"
              >
                {t('dashboard.client.viewEditProfile', 'View/Edit Full Profile')} &rarr;
              </Link>
            </div>
          </div>

          {/* Assigned Routine Card */}
          <div className="bg-secondary-light/30 dark:bg-secondary-dark/30 p-6 rounded-lg shadow transition-colors duration-300">
            <h2 className="text-xl font-semibold text-secondary-dark dark:text-secondary-light mb-3">{t('dashboard.client.assignedRoutineTitle', 'Your Current Routine')}</h2>
            <p className="text-text-muted-light dark:text-text-muted-dark">
              {currentUser.assignedPlanId
                ? t('dashboard.client.currentPlanInfo', `Details for plan ID: ${currentUser.assignedPlanId} will be shown here.`)
                : t('dashboard.client.noPlanAssigned', 'No training plan assigned yet. Contact your coach!')}
            </p>
            {currentUser.assignedPlanId && (
                 <div className="mt-4">
                    <Link
                        to="/training-plan"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-sm font-medium rounded-lg transition-all duration-300"
                    >
                        <FaPlay className="mr-2" />
                        {t('dashboard.client.viewPlanDetails', 'Ver Plan de Entrenamiento')}
                    </Link>
                </div>
            )}
          </div>

          {/* Training History Card */}
          <div className="bg-accent-light/30 dark:bg-accent-dark/30 p-6 rounded-lg shadow transition-colors duration-300">
            <h2 className="text-xl font-semibold text-accent-dark dark:text-accent-light mb-3">{t('dashboard.client.trainingHistoryTitle', 'Training History')}</h2>
            <p className="text-text-muted-light dark:text-text-muted-dark">{t('dashboard.client.historyPlaceholder', 'Your recent workouts and completed routines will appear here.')}</p>
            <div className="mt-4">
                 <Link
                    to="/training-history"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-medium rounded-lg transition-all duration-300"
                >
                    <FaHistory className="mr-2" />
                    {t('dashboard.client.viewFullHistory', 'Ver Historial Completo')}
                </Link>
            </div>
          </div>

          {/* Notifications Card */}
          <div className="bg-orange-100 dark:bg-orange-900/30 p-6 rounded-lg shadow transition-colors duration-300">
            <h2 className="text-xl font-semibold text-orange-800 dark:text-orange-200 mb-3">{t('dashboard.client.notificationsTitle', 'Notificaciones')}</h2>
            <p className="text-text-muted-light dark:text-text-muted-dark">{t('dashboard.client.notificationsDescription', 'Mantente al día con tus alertas y mensajes importantes.')}</p>
            <div className="mt-4">
                 <Link
                    to="/notifications"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-sm font-medium rounded-lg transition-all duration-300"
                >
                    <FaBell className="mr-2" />
                    {t('dashboard.client.viewNotifications', 'Ver Notificaciones')}
                </Link>
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-lg shadow transition-colors duration-300">
            <h2 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-3">{t('dashboard.client.settingsTitle', 'Configuración')}</h2>
            <p className="text-text-muted-light dark:text-text-muted-dark">{t('dashboard.client.settingsDescription', 'Gestiona tus preferencias y configuración de cuenta.')}</p>
            <div className="mt-4">
                 <Link
                    to="/settings"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg transition-all duration-300"
                >
                    <FaCog className="mr-2" />
                    {t('dashboard.client.viewSettings', 'Ver Configuración')}
                </Link>
            </div>
          </div>
        </div>

        {/* Progress Update Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-6 border-t border-neutral-border-light dark:border-neutral-border-dark transition-colors duration-300">
          {/* Text Progress Update */}
          <div>
            <h2 className="text-2xl font-semibold text-text-default-light dark:text-text-default-dark mb-4">{t('dashboard.client.progressUpdateTitle', 'Log Your Progress (Text)')}</h2>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
              {t('dashboard.client.progressUpdateDesc', 'Share how you\'re feeling, any achievements, or challenges.')}
            </p>
            <form onSubmit={handleTextProgressSubmit} className="space-y-4">
              <div>
                <label htmlFor="progressUpdate" className="sr-only">{t('dashboard.client.progressNotesLabel', 'Progress Notes')}</label>
                <textarea
                  id="progressUpdate"
                  rows={4}
                  value={progressUpdateText}
                  onChange={(e) => setProgressUpdateText(e.target.value)}
                  className="w-full p-3 border border-neutral-border-light dark:border-neutral-border-dark rounded-md shadow-sm focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT dark:focus:border-primary-dark bg-neutral-background-light dark:bg-neutral-background-dark text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark transition-colors duration-300"
                  placeholder={t('dashboard.client.progressPlaceholder', 'E.g., Felt strong today, hit a new PR on squats!')}
                />
              </div>
              {generalError && <p className="text-sm text-semantic-error-light dark:text-semantic-error-dark">{generalError}</p>}
              <div>
                <button
                  type="submit"
                  disabled={isUploading || !progressUpdateText.trim()}
                  className="px-6 py-2 bg-primary-DEFAULT text-text-default-dark dark:text-text-default-light font-medium rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark dark:focus:ring-primary-light disabled:opacity-50 transition-colors duration-300"
                >
                  {isUploading ? t('dashboard.client.submittingProgress', 'Submitting...') : t('dashboard.client.submitProgressButton', 'Submit Text Update')}
                </button>
              </div>
            </form>
          </div>

          {/* Photo Progress Update */}
          <div>
            <h2 className="text-2xl font-semibold text-text-default-light dark:text-text-default-dark mb-4">{t('dashboard.client.photoUpload.title', 'Upload Progress Photo')}</h2>
             <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
              {t('dashboard.client.photoUpload.desc', 'Visually track your transformation. Photos are visible to you and your coach.')}
            </p>
            <form onSubmit={handlePhotoUpload} className="space-y-4">
              <div>
                <label htmlFor="progressPhoto" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark">
                  {t('dashboard.client.photoUpload.selectLabel', 'Select Photo (Max 5MB)')}
                </label>
                <input
                  type="file"
                  id="progressPhoto"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handlePhotoChange}
                  className="mt-1 block w-full text-sm text-text-muted-light dark:text-text-muted-dark
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary-light file:text-primary-dark dark:file:bg-primary-dark dark:file:text-primary-light
                    hover:file:bg-primary-DEFAULT dark:hover:file:bg-primary-hover transition-colors duration-300"
                />
                {progressPhoto && <p className="mt-1 text-xs text-text-muted-light dark:text-text-muted-dark">{t('dashboard.client.photoUpload.selectedFile', 'Selected:')} {progressPhoto.name}</p>}
              </div>
              <div>
                <label htmlFor="photoCaption" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark">
                  {t('dashboard.client.photoUpload.captionLabel', 'Caption (Optional)')}
                </label>
                <input
                  type="text"
                  id="photoCaption"
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-neutral-background-light dark:bg-neutral-background-dark border border-neutral-border-light dark:border-neutral-border-dark rounded-md shadow-sm text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT dark:focus:border-primary-dark sm:text-sm transition-colors duration-300"
                  placeholder={t('dashboard.client.photoUpload.captionPlaceholder', 'E.g., Week 4 - Front View')}
                />
              </div>
              {uploadError && <p className="text-sm text-semantic-error-light dark:text-semantic-error-dark">{uploadError}</p>}
              <div>
                <button
                  type="submit"
                  disabled={isUploading || !progressPhoto}
                  className="px-6 py-2 bg-secondary-DEFAULT text-text-default-dark dark:text-text-default-light font-medium rounded-md hover:bg-secondary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-dark dark:focus:ring-secondary-light disabled:opacity-50 transition-colors duration-300"
                >
                  {isUploading ? t('dashboard.client.photoUpload.uploadingButton', 'Uploading...') : t('dashboard.client.photoUpload.uploadButton', 'Upload Photo')}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClientDashboardPage;
