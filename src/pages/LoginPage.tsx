import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGoogle } from 'react-icons/fa'; // Example icon

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { loginWithEmailPassword, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard/client'; // Default redirect for client

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await loginWithEmailPassword(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      let errorMessage = t('login.errorDefault', 'An unknown error occurred. Please try again.');
      if (err.code) {
        switch (err.code) {
          case 'auth/user-not-found':
          case 'auth/invalid-credential':
            errorMessage = t('login.errorInvalidCredentials', 'Invalid email or password. Please try again.');
            break;
          case 'auth/wrong-password':
            errorMessage = t('login.errorWrongPassword', 'Incorrect password. Please try again.');
            break;
          case 'auth/invalid-email':
            errorMessage = t('login.errorInvalidEmail', 'The email address is not valid.');
            break;
          case 'auth/user-disabled':
            errorMessage = t('login.errorUserDisabled', 'This account has been disabled.');
            break;
          case 'auth/network-request-failed':
            errorMessage = t('login.errorNetwork', 'A network error occurred. Please check your connection and try again.');
            break;
          default:
            errorMessage = t('login.errorDefault', 'Login failed. Please try again.');
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error("Login Page Error (Email):", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      // Successful login will trigger onAuthStateChanged,
      // which should then fetch user profile. If profile fetch fails,
      // user is signed out by AuthContext.
      // We assume successful Google login means user *should* have a profile.
      navigate(from, { replace: true });
    } catch (err: any) {
      let errorMessage = t('login.errorDefaultGoogle', 'An error occurred during Google Sign-In. Please try again.');
      if (err.code) {
        switch (err.code) {
          case 'auth/popup-closed-by-user':
            errorMessage = t('login.errorPopupClosed', 'Google Sign-In was cancelled.');
            break;
          case 'auth/cancelled-popup-request':
            errorMessage = t('login.errorPopupCancelled', 'Google Sign-In was cancelled.');
            break;
          case 'auth/popup-blocked':
            errorMessage = t('login.errorPopupBlocked', 'Google Sign-In popup was blocked by the browser. Please enable popups for this site.');
            break;
          case 'auth/network-request-failed':
            errorMessage = t('login.errorNetworkGoogle', 'A network error occurred during Google Sign-In. Please check your connection.');
            break;
          default:
            errorMessage = t('login.errorGoogleDefault', 'Google Sign-In failed. Please try again.');
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error("Login Page Error (Google):", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full bg-neutral-background dark:bg-neutral-background-dark py-16 selection:bg-primary selection:text-white">
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-neutral-surface dark:bg-neutral-surface-dark rounded-radius-lg shadow-2xl">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-default dark:text-text-default-dark">
            {t('login.clientTitle', 'Client Login')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-text-muted dark:text-text-muted-dark">
            {t('login.clientSubtitle', 'Access your personal dashboard.')}
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-semantic-error dark:text-semantic-error-dark bg-red-100 dark:bg-red-900/30 rounded-radius-md" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-6">
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-default dark:text-text-default-dark"
            >
              {t('login.passwordLabel', 'Password')}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-neutral-surface dark:bg-neutral-background-dark border border-neutral-border dark:border-neutral-border-dark rounded-radius-md shadow-sm placeholder-text-muted dark:placeholder-text-muted-dark focus:outline-none focus:ring-primary dark:focus:ring-primary-light focus:border-primary dark:focus:border-primary-light sm:text-sm text-text-default dark:text-text-default-dark"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary transition-colors duration-300 ease-in-out">
                {t('login.forgotPasswordLink', 'Forgot your password?')}
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-radius-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            >
              {loading ? t('login.loggingIn', 'Logging in...') : t('login.loginButton', 'Log In')}
            </button>
          </div>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-neutral-border dark:border-neutral-border-dark" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-neutral-surface dark:bg-neutral-surface-dark text-text-muted dark:text-text-muted-dark">
              {t('login.orContinueWith', 'Or continue with')}
            </span>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center py-2.5 px-4 border border-neutral-border dark:border-neutral-border-dark rounded-radius-md shadow-sm text-sm font-medium text-text-default dark:text-text-default-dark bg-neutral-surface dark:bg-neutral-surface-dark hover:bg-neutral-background dark:hover:bg-neutral-background-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <FaGoogle className="w-5 h-5 mr-2 text-primary" />
            {t('login.googleButton', 'Sign in with Google')}
          </button>
        </div>
        <div className="text-sm text-center space-y-2">
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
