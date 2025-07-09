/**
 * @file CookieConsentPopup.tsx
 * @description Defines a popup/banner for handling cookie consent from the user.
 * It uses localStorage to remember the user's choice.
 */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import useLocalStorage from '../../hooks/useLocalStorage'; // Ensure this path is correct

/**
 * CookieConsentPopup component displays a banner at the bottom of the screen
 * asking for user consent regarding cookie usage. The user's choice is stored
 * in localStorage to prevent showing the popup repeatedly.
 *
 * @returns {JSX.Element | null} The rendered popup or null if consent has been given.
 */
const CookieConsentPopup: React.FC = () => {
  const { t } = useTranslation();
  const [consentAccepted, setConsentAccepted] = useLocalStorage<boolean>('cookieConsentAccepted', false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show the popup if consent has not been accepted.
    // Delay showing slightly to ensure localStorage is read by useLocalStorage hook.
    const timer = setTimeout(() => {
      if (!consentAccepted) {
        setIsVisible(true);
      }
    }, 100); // Small delay to allow useLocalStorage to initialize
    return () => clearTimeout(timer);
  }, [consentAccepted]);

  const handleAccept = () => {
    setConsentAccepted(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="region"
          aria-label={t('cookieConsentBannerLabel', 'Cookie Consent Banner')}
          className="fixed bottom-0 z-[100] w-full bg-neutral-surface-light dark:bg-neutral-surface-dark text-text-default-light dark:text-text-default-dark p-space-md shadow-[-2px_0px_15px_rgba(0,0,0,0.2)] transition-colors duration-300"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <p className="text-sm flex-grow">
              {t('cookieConsentText', 'We use cookies to improve your experience. By using our site, you agree to our use of cookies.')}
            </p>
            <button
              onClick={handleAccept}
              className="bg-gray-200 dark:bg-gray-700 text-primary-DEFAULT dark:text-white font-semibold py-space-xs px-space-md rounded-radius-md transition-all whitespace-nowrap border border-primary-DEFAULT dark:border-transparent"
              aria-label={t('cookieConsentAcceptLabel', 'Accept cookie usage')}
            >
              {t('cookieConsentAccept', 'Accept')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentPopup;
