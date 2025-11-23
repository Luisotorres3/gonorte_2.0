/**
 * @file LanguageSelector.tsx
 * @description Defines a dropdown component for selecting the application language.
 * It displays the current language with its flag and allows users to switch between supported languages.
 * This component is typically used in the Navbar.
 */
import React, { useState, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from './icons/ChevronDownIcon'; // Assuming an icon component exists or will be created

// Helper function to get a simple ChevronDownIcon if not available
const DefaultChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5 ml-1 opacity-70"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
);


interface Language {
  code: string;
  name: string;
  flag: string; // SVG flag URL
}

const languages: Language[] = [
  {
    code: "es",
    flag: "https://flagcdn.com/es.svg",
    name: "Español",
  },
  {
    code: "en",
    flag: "https://flagcdn.com/gb.svg",
    name: "English",
  },
  {
    code: "fr",
    flag: "https://flagcdn.com/fr.svg",
    name: "Français",
  },
];

const getFlagDisplay = (code: string) => {
  const language = languages.find(lang => lang.code === code);
  if (language) {
    return (
      <img
        src={language.flag}
        alt={`${language.name} flag`}
        className="w-5 h-4 object-cover rounded-sm"
        loading="lazy"
      />
    );
  }
  return (
    <img
      src="https://flagcdn.com/xx.svg"
      alt="Default flag"
      className="w-5 h-4 object-cover rounded-sm"
      loading="lazy"
    />
  );
};

/**
 * LanguageSelector component allows users to switch the application's language via a dropdown menu.
 * It displays the currently selected language (flag and name) and provides options to choose other supported languages.
 * Includes keyboard navigation and accessibility features.
 * @returns {JSX.Element} The rendered LanguageSelector component.
 */
const LanguageSelector: React.FC = () => {
  const { t, i18n: i18nInstance } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18nInstance.language);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  // Update current language when i18n language changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLang(lng);
    };
    
    i18nInstance.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18nInstance.off('languageChanged', handleLanguageChange);
    };
  }, [i18nInstance]);

  const currentLanguage = languages.find((lang) => lang.code === currentLang) || { code: currentLang, name: currentLang.toUpperCase(), flag: '🌐' };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (lngCode: string) => {
    i18nInstance.changeLanguage(lngCode);
    setIsOpen(false);
    triggerButtonRef.current?.focus(); // Return focus to button after selection
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation for dropdown
  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (!isOpen) return;

    const items = Array.from(dropdownRef.current?.querySelectorAll('li[role="option"]') || []);
    const activeElement = document.activeElement;
    let currentIndex = items.findIndex(item => item === activeElement);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      currentIndex = (currentIndex + 1) % items.length;
      (items[currentIndex] as HTMLLIElement)?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      (items[currentIndex] as HTMLLIElement)?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
      triggerButtonRef.current?.focus();
    }
  };

  const handleOptionKeyDown = (event: KeyboardEvent<HTMLLIElement>, langCode: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectLanguage(langCode);
    }
  };


  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={triggerButtonRef}
        type="button"
        className="flex items-center justify-center px-3 py-2 bg-neutral-surface-light dark:bg-neutral-surface-dark text-text-default-light dark:text-text-default-dark hover:bg-neutral-border-light dark:hover:bg-neutral-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:ring-offset-2 focus:ring-offset-neutral-background-light dark:focus:ring-offset-neutral-background-dark transition-colors"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t('selectLanguage', 'Select language') + `: ${currentLanguage.name}`}
      >
        {getFlagDisplay(currentLanguage.code)}
        {/* Ensure ChevronDownIcon also uses themed colors if it's a custom component */}
        {typeof ChevronDownIcon !== 'undefined' ? <ChevronDownIcon className="w-5 h-5 ml-1 opacity-70 icon-default" /> : <DefaultChevronDownIcon />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            className="absolute z-50 mt-1 w-auto min-w-[60px] right-0 md:left-0 bg-neutral-surface-light dark:bg-neutral-surface-dark border border-neutral-border-light dark:border-neutral-border-dark rounded-lg shadow-lg overflow-hidden focus:outline-none transition-colors duration-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {languages.map((lang) => (
              <li
                key={lang.code}
                role="option"
                tabIndex={0}
                aria-selected={currentLang === lang.code}
                className={`flex items-center justify-center gap-2 px-3 py-2 text-sm cursor-pointer
                  ${ currentLang === lang.code
                    ? 'bg-primary-DEFAULT text-text-default-dark dark:bg-primary-dark dark:text-text-default-light' // Active state with theme colors
                    : 'text-text-default-light dark:text-text-default-dark hover:bg-primary-light dark:hover:bg-primary-hover hover:text-primary-dark dark:hover:text-primary-light' // Default and hover states
                  }
                  focus:bg-primary-light dark:focus:bg-primary-hover focus:text-primary-dark dark:focus:text-primary-light focus:outline-none transition-colors duration-150`}
                onClick={() => selectLanguage(lang.code)}
                onKeyDown={(e) => handleOptionKeyDown(e, lang.code)}
              >
                <img
                  src={lang.flag}
                  alt={`${lang.name} flag`}
                  className="w-5 h-4 object-cover rounded-sm"
                  loading="lazy"
                />
                <span className="sr-only">{lang.name}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
