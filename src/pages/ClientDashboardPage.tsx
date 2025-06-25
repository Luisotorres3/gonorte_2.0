import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { doc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config'; // storage is new

const ClientDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser, loading } = useAuth();
  const [progressUpdateText, setProgressUpdateText] = useState(''); // For text updates
  const [progressPhoto, setProgressPhoto] = useState<File | null>(null);
  const [photoCaption, setPhotoCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null); // For text updates

  const handleTextProgressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  //   if (!currentUser || !progressUpdateText.trim()) return;

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
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          {t('dashboard.client.title', `Welcome, ${currentUser.displayName || 'Client'}!`)}
        </h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Summary Card */}
          <div className="bg-teal-50 dark:bg-teal-900/30 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-teal-700 dark:text-teal-300 mb-3">{t('dashboard.client.profileSummaryTitle', 'Profile Summary')}</h2>
            <p className="text-gray-700 dark:text-gray-300"><strong>{t('profile.display.email', 'Email:')}</strong> {currentUser.email}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>{t('profile.display.phone', 'Phone:')}</strong> {currentUser.phoneNumber || t('profile.notSet', 'Not set')}</p>
            <div className="mt-4">
              <Link
                to={`/profile/${currentUser.uid}`}
                className="text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
              >
                {t('dashboard.client.viewEditProfile', 'View/Edit Full Profile')} &rarr;
              </Link>
            </div>
          </div>

          {/* Assigned Routine Card */}
          <div className="bg-cyan-50 dark:bg-cyan-900/30 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300 mb-3">{t('dashboard.client.assignedRoutineTitle', 'Your Current Routine')}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {currentUser.assignedPlanId
                ? t('dashboard.client.currentPlanInfo', `Details for plan ID: ${currentUser.assignedPlanId} will be shown here.`)
                : t('dashboard.client.noPlanAssigned', 'No training plan assigned yet. Contact your coach!')}
            </p>
            {currentUser.assignedPlanId && (
                 <div className="mt-4">
                    <Link
                        to={`/training-plans/${currentUser.assignedPlanId}`}
                        className="text-sm font-medium text-cyan-600 hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
                    >
                        {t('dashboard.client.viewPlanDetails', 'View Plan Details')} &rarr;
                    </Link>
                </div>
            )}
          </div>

          {/* Training History Card */}
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-3">{t('dashboard.client.trainingHistoryTitle', 'Training History')}</h2>
            <p className="text-gray-600 dark:text-gray-400">{t('dashboard.client.historyPlaceholder', 'Your recent workouts and completed routines will appear here.')}</p>
            <div className="mt-4">
                 <Link
                    to="/training-history"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    {t('dashboard.client.viewFullHistory', 'View Full History')} &rarr;
                </Link>
            </div>
          </div>
        </div>

        {/* Progress Update Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          {/* Text Progress Update */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{t('dashboard.client.progressUpdateTitle', 'Log Your Progress (Text)')}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
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
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={t('dashboard.client.progressPlaceholder', 'E.g., Felt strong today, hit a new PR on squats!')}
                />
              </div>
              {generalError && <p className="text-sm text-red-500">{generalError}</p>}
              <div>
                <button
                  type="submit"
                  disabled={isUploading || !progressUpdateText.trim()}
                  className="px-6 py-2 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
                >
                  {isUploading ? t('dashboard.client.submittingProgress', 'Submitting...') : t('dashboard.client.submitProgressButton', 'Submit Text Update')}
                </button>
              </div>
            </form>
          </div>

          {/* Photo Progress Update */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{t('dashboard.client.photoUpload.title', 'Upload Progress Photo')}</h2>
             <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('dashboard.client.photoUpload.desc', 'Visually track your transformation. Photos are visible to you and your coach.')}
            </p>
            <form onSubmit={handlePhotoUpload} className="space-y-4">
              <div>
                <label htmlFor="progressPhoto" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('dashboard.client.photoUpload.selectLabel', 'Select Photo (Max 5MB)')}
                </label>
                <input
                  type="file"
                  id="progressPhoto"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handlePhotoChange}
                  className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-teal-50 file:text-teal-700 dark:file:bg-teal-700 dark:file:text-teal-50
                    hover:file:bg-teal-100 dark:hover:file:bg-teal-600"
                />
                {progressPhoto && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{t('dashboard.client.photoUpload.selectedFile', 'Selected:')} {progressPhoto.name}</p>}
              </div>
              <div>
                <label htmlFor="photoCaption" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('dashboard.client.photoUpload.captionLabel', 'Caption (Optional)')}
                </label>
                <input
                  type="text"
                  id="photoCaption"
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder={t('dashboard.client.photoUpload.captionPlaceholder', 'E.g., Week 4 - Front View')}
                />
              </div>
              {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
              <div>
                <button
                  type="submit"
                  disabled={isUploading || !progressPhoto}
                  className="px-6 py-2 bg-cyan-500 text-white font-medium rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
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
