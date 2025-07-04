import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Ensure useAuth and auth are correctly set up
import { auth } from '../firebase/config'; // Direct import of auth for sendPasswordResetEmail
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaEnvelope } from 'react-icons/fa';

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(t('forgotPassword.successMessage', 'If an account exists for this email, a password reset link has been sent. Please check your inbox (and spam folder).'));
    } catch (err: any) {
      let errorMessage = t('forgotPassword.errorDefault', 'Failed to send password reset email. Please try again.');
      if (err.code) {
        switch (err.code) {
          case 'auth/invalid-email':
            errorMessage = t('forgotPassword.errorInvalidEmail', 'The email address is not valid.');
            break;
          case 'auth/user-not-found':
            // For security, we might not want to explicitly say the user was not found.
            // The generic success message handles this implicitly.
            // However, if specific feedback is desired for dev/admin:
            // errorMessage = t('forgotPassword.errorUserNotFound', 'No account found with this email address.');
            // For production, stick to the generic success to avoid user enumeration.
             setMessage(t('forgotPassword.successMessage', 'If an account exists for this email, a password reset link has been sent. Please check your inbox (and spam folder).'));
             // To avoid showing an error and instead show the success message:
             setLoading(false);
             return;
          case 'auth/network-request-failed':
            errorMessage = t('forgotPassword.errorNetwork', 'A network error occurred. Please check your connection.');
            break;
          default:
            // Keep generic for other Firebase errors
            errorMessage = t('forgotPassword.errorDefault', 'Failed to send password reset email. Please try again.');
        }
      }
      setError(errorMessage);
      console.error("Forgot Password Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-background dark:bg-neutral-background-dark p-4 selection:bg-primary selection:text-white">
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-neutral-surface dark:bg-neutral-surface-dark rounded-radius-lg shadow-2xl">
        <div className="text-center">
          <FaEnvelope className="mx-auto h-12 w-12 text-primary dark:text-primary-light mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-text-default dark:text-text-default-dark">
            {t('forgotPassword.title', 'Forgot Your Password?')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-text-muted dark:text-text-muted-dark">
            {t('forgotPassword.subtitle', "No problem! Enter your email address below and we'll send you a link to reset it.")}
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-semantic-error dark:text-semantic-error-dark bg-red-100 dark:bg-red-900/30 rounded-radius-md" role="alert">
            {error}
          </div>
        )}
        {message && (
          <div className="p-3 text-sm text-semantic-success dark:text-semantic-success-dark bg-green-100 dark:bg-green-900/30 rounded-radius-md" role="status">
            {message}
          </div>
        )}

        {!message && ( // Only show form if no success message is displayed
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-default dark:text-text-default-dark"
              >
                {t('login.emailLabel', 'Email Address')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-neutral-surface dark:bg-neutral-background-dark border border-neutral-border dark:border-neutral-border-dark rounded-radius-md shadow-sm placeholder-text-muted dark:placeholder-text-muted-dark focus:outline-none focus:ring-primary dark:focus:ring-primary-light focus:border-primary dark:focus:border-primary-light sm:text-sm text-text-default dark:text-text-default-dark"
                placeholder={t('login.emailPlaceholder', 'you@example.com')}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-radius-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              >
                {loading ? t('forgotPassword.sendingButton', 'Sending Link...') : t('forgotPassword.sendButton', 'Send Reset Link')}
              </button>
            </div>
          </form>
        )}

        <div className="text-sm text-center mt-6">
          <Link to="/login" className="font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary transition-colors duration-300 ease-in-out">
            {t('forgotPassword.backToLogin', 'Back to Log In')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
