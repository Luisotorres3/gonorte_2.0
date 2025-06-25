import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGoogle } from 'react-icons/fa';

const AdminLoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { loginWithEmailPassword, loginWithGoogle, userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Determine redirect based on role after login, or a sensible default
  const getRedirectPath = (role: string | null) => {
    if (role === 'admin') return '/admin/users';
    if (role === 'coach') return '/dashboard/coach';
    return '/'; // Fallback, though ideally role is known post-login
  };

  // Default 'from' if not specified, or use role-based path
  // Note: userRole is from existing session, not post-login for *this* attempt.
  // So, we primarily rely on onAuthStateChanged in AuthContext to set the role,
  // and then PrivateRoute will handle redirection if the user lands on a page
  // they shouldn't be on. For direct navigation after login, we make a best guess.
  const from = location.state?.from?.pathname || getRedirectPath(userRole);


  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await loginWithEmailPassword(email, password);
      // AuthContext's onAuthStateChanged will fetch the user's role.
      // The navigation here is an optimistic attempt.
      // If the role fetched is different, PrivateRoute might redirect again.
      // A more robust way is to await role confirmation if needed immediately.
      // For now, we navigate and let AuthContext + PrivateRoute handle final destination.
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || t('login.errorDefault'));
       console.error("Admin Login Page Error (Email):", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      // Similar to email login, navigate optimistically.
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || t('login.errorGoogle'));
      console.error("Admin Login Page Error (Google):", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {t('login.adminTitle', 'Admin & Coach Login')}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t('login.adminSubtitle', 'Access the management panel.')}
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-300 rounded-lg" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-gray-900 dark:text-white"
              placeholder={t('login.emailPlaceholder', 'admin@example.com')}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-gray-900 dark:text-white"
              placeholder="••••••••"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-300"
            >
              {loading ? t('login.loggingIn', 'Logging in...') : t('login.loginButton', 'Log In')}
            </button>
          </div>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              {t('login.orContinueWith', 'Or continue with')}
            </span>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-colors"
          >
            <FaGoogle className="w-5 h-5 mr-2" />
            {t('login.googleButton', 'Sign in with Google')}
          </button>
        </div>
         <div className="text-sm text-center">
          <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300">
            {t('login.clientLoginLink', 'Are you a Client?')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
