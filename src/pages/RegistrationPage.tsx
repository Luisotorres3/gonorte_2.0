import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Assuming AuthContext will have a registration function
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGoogle } from 'react-icons/fa';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config'; // Ensure auth is exported from firebase/config
import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { UserProfile } from '../types/user';

const RegistrationPage: React.FC = () => {
  const { t } = useTranslation();
  // We'll use createUserWithEmailAndPassword directly, then potentially update profile via AuthContext or another service
  const { loginWithGoogle } = useAuth(); // For Google Sign-Up/Login
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState(''); // Optional: First name, last name
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError(t('register.errorPasswordMismatch', "Passwords do not match."));
      return;
    }
    if (password.length < 6) {
      setError(t('register.errorPasswordTooShort', "Password should be at least 6 characters."));
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Create user profile in Firestore
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const newUserProfile: UserProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: displayName || firebaseUser.displayName || '', // Use provided name or fallback
        role: 'client', // Default role for new sign-ups
        registrationDate: Timestamp.now(),
        lastLoginDate: Timestamp.now(), // Set initial login date
        // Initialize other fields as needed
        // e.g., phoneNumber: null, weight: null, etc.
      };
      await setDoc(userDocRef, newUserProfile);

      // Navigate to client dashboard or a welcome page
      navigate('/dashboard/client', { replace: true });
    } catch (err: any) {
      let errorMessage = t('register.errorDefault', 'An unknown error occurred. Please try again.');
      if (err.code) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            errorMessage = t('register.errorEmailExists', 'This email address is already in use.');
            break;
          case 'auth/invalid-email':
            errorMessage = t('register.errorInvalidEmail', 'The email address is not valid.');
            break;
          case 'auth/weak-password':
            errorMessage = t('register.errorPasswordTooShort', 'Password is too weak. It should be at least 6 characters.');
            break;
          case 'auth/network-request-failed':
            errorMessage = t('register.errorNetwork', 'A network error occurred. Please check your connection.');
            break;
          default:
            errorMessage = t('register.errorDefault', 'Registration failed. Please try again.');
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error("Registration Page Error (Email):", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError(null);
    setLoading(true);
    try {
      // loginWithGoogle handles both login and profile creation/check in AuthContext
      await loginWithGoogle();
      // onAuthStateChanged in AuthContext will handle profile creation if it's a new Google user
      // and then navigate. We assume new Google users are 'client' by default.
      navigate('/dashboard/client', { replace: true });
    } catch (err: any) {
      // Error handling for Google Sign-In is similar to LoginPage
      let errorMessage = t('login.errorDefaultGoogle', 'An error occurred during Google Sign-In. Please try again.');
      if (err.code) {
        switch (err.code) {
          case 'auth/popup-closed-by-user':
          case 'auth/cancelled-popup-request':
            errorMessage = t('login.errorPopupClosed', 'Google Sign-In was cancelled.');
            break;
          case 'auth/popup-blocked':
            errorMessage = t('login.errorPopupBlocked', 'Google Sign-In popup was blocked. Please enable popups.');
            break;
          default:
            errorMessage = t('login.errorGoogleDefault', 'Google Sign-In failed. Please try again.');
        }
      }
      setError(errorMessage);
      console.error("Registration Page Error (Google):", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-background dark:bg-neutral-background-dark p-4 selection:bg-primary selection:text-white">
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-neutral-surface dark:bg-neutral-surface-dark rounded-radius-lg shadow-2xl">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-default dark:text-text-default-dark">
            {t('register.title', 'Create Account')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-text-muted dark:text-text-muted-dark">
            {t('register.subtitle', 'Join us and start your fitness journey!')}
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-semantic-error dark:text-semantic-error-dark bg-red-100 dark:bg-red-900/30 rounded-radius-md" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailRegistration} className="space-y-4">
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-text-default dark:text-text-default-dark"
            >
              {t('register.displayNameLabel', 'Full Name (Optional)')}
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              autoComplete="name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-neutral-surface dark:bg-neutral-background-dark border border-neutral-border dark:border-neutral-border-dark rounded-radius-md shadow-sm placeholder-text-muted dark:placeholder-text-muted-dark focus:outline-none focus:ring-primary dark:focus:ring-primary-light focus:border-primary dark:focus:border-primary-light sm:text-sm text-text-default dark:text-text-default-dark"
              placeholder={t('register.displayNamePlaceholder', 'Your Name')}
            />
          </div>
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
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-neutral-surface dark:bg-neutral-background-dark border border-neutral-border dark:border-neutral-border-dark rounded-radius-md shadow-sm placeholder-text-muted dark:placeholder-text-muted-dark focus:outline-none focus:ring-primary dark:focus:ring-primary-light focus:border-primary dark:focus:border-primary-light sm:text-sm text-text-default dark:text-text-default-dark"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-text-default dark:text-text-default-dark"
            >
              {t('register.confirmPasswordLabel', 'Confirm Password')}
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-neutral-surface dark:bg-neutral-background-dark border border-neutral-border dark:border-neutral-border-dark rounded-radius-md shadow-sm placeholder-text-muted dark:placeholder-text-muted-dark focus:outline-none focus:ring-primary dark:focus:ring-primary-light focus:border-primary dark:focus:border-primary-light sm:text-sm text-text-default dark:text-text-default-dark"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-radius-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            >
              {loading ? t('register.registering', 'Creating Account...') : t('register.registerButton', 'Create Account')}
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
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full flex items-center justify-center py-2.5 px-4 border border-neutral-border dark:border-neutral-border-dark rounded-radius-md shadow-sm text-sm font-medium text-text-default dark:text-text-default-dark bg-neutral-surface dark:bg-neutral-surface-dark hover:bg-neutral-background dark:hover:bg-neutral-background-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <FaGoogle className="w-5 h-5 mr-2 text-primary" />
            {t('login.googleButton', 'Sign up with Google')}
          </button>
        </div>
        <div className="text-sm text-center">
          <p className="text-text-muted dark:text-text-muted-dark">
            {t('register.alreadyHaveAccount', 'Already have an account?')} {' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary transition-colors duration-300 ease-in-out">
              {t('login.loginButton', 'Log In')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
