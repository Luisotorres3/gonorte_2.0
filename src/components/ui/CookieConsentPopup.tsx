/**
 * @file CookieConsentPopup.tsx
 * @description Defines a popup/banner for handling cookie consent from the user.
 * It uses localStorage to remember the user's choice.
 */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useLocalStorage from '../../hooks/useLocalStorage'; // Ensure this path is correct
import { getLocalizedRoute } from '../../router/routes.config';

/**
 * CookieConsentPopup component displays a banner at the bottom of the screen
 * asking for user consent regarding cookie usage. The user's choice is stored
 * in localStorage to prevent showing the popup repeatedly.
 *
 * @returns {JSX.Element | null} The rendered popup or null if consent has been given.
 */
const CookieConsentPopup: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'es';
  const [consentStatus, setConsentStatus] = useLocalStorage<'accepted' | 'rejected' | null>('cookieConsentStatus', null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Compatibility with previous cookie key.
    const legacyConsent = typeof window !== 'undefined' ? window.localStorage.getItem('cookieConsentAccepted') : null;
    if (legacyConsent === 'true' && consentStatus === null) {
      setConsentStatus('accepted');
      return;
    }

    const timer = setTimeout(() => {
      if (consentStatus === null) {
        setIsVisible(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [consentStatus, setConsentStatus]);

  const handleConsent = (status: 'accepted' | 'rejected') => {
    setConsentStatus(status);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cookieConsentAccepted', status === 'accepted' ? 'true' : 'false');
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="region"
          aria-label={t('cookieConsentBannerLabel', 'Cookie Consent Banner')}
          className="fixed bottom-0 z-[100] w-full bg-white dark:bg-neutral-surface-dark text-gray-700 dark:text-text-default-dark p-space-md shadow-[-2px_0px_15px_rgba(0,0,0,0.15)] transition-colors duration-300 border-t border-gray-200 dark:border-transparent"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <p className="text-sm flex-grow">
              {t('cookieConsentText', 'We use essential cookies so the website can work and, with your permission, additional cookies for analytics and improvement.')}
            </p>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Link
                to={getLocalizedRoute('privacy', currentLang)}
                className="text-sm underline text-primary-DEFAULT dark:text-primary-300"
              >
                {t('cookieConsentManageLink', 'Read privacy policy')}
              </Link>
              <button
                onClick={() => handleConsent('rejected')}
                className="bg-transparent text-gray-700 dark:text-text-default-dark font-semibold py-space-xs px-space-md rounded-radius-md transition-all whitespace-nowrap border border-gray-300 dark:border-neutral-border-dark"
                aria-label={t('cookieConsentRejectLabel', 'Reject non-essential cookies')}
              >
                {t('cookieConsentReject', 'Essential only')}
              </button>
              <button
                onClick={() => handleConsent('accepted')}
                className="bg-gray-200 dark:bg-gray-700 text-primary-DEFAULT dark:text-white font-semibold py-space-xs px-space-md rounded-radius-md transition-all whitespace-nowrap border border-primary-DEFAULT dark:border-transparent"
                aria-label={t('cookieConsentAcceptLabel', 'Accept cookie usage')}
              >
                {t('cookieConsentAccept', 'Accept all')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentPopup;
