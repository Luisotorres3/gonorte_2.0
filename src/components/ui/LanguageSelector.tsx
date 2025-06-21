/**
 * @file LanguageSelector.tsx
 * @description Defines a dropdown component for selecting the application language.
 * It displays the current language with its flag and allows users to switch between supported languages.
 * This component is typically used in the Navbar.
 */
import React, { useState, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/config';
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
    code: "en",
    flag: "https://flagcdn.com/gb.svg",
    name: "EN",
  },
  {
    code: "es",
    flag: "https://flagcdn.com/es.svg",
    name: "ES",
  },
  {
    code: "fr",
    flag: "https://flagcdn.com/fr.svg",
    name: "FR",
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
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || { code: i18n.language, name: i18n.language.toUpperCase(), flag: '🌐' };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (lngCode: string) => {
    i18n.changeLanguage(lngCode);
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
        className="flex items-center justify-center px-3 py-2 bg-surface text-text-default hover:bg-neutral-border dark:hover:bg-neutral-border-dark rounded-radius-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface transition-colors"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t('selectLanguage', 'Select language') + `: ${currentLanguage.name}`}
      >
        {getFlagDisplay(currentLanguage.code)}
        {typeof ChevronDownIcon !== 'undefined' ? <ChevronDownIcon /> : <DefaultChevronDownIcon />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            tabIndex={-1} // Make the list focusable for keyboard events when open
            onKeyDown={handleKeyDown}
            className="absolute z-50 mt-1 w-auto min-w-[150px] right-0 md:left-0 bg-surface border border-neutral-border dark:border-neutral-border-dark rounded-radius-md shadow-lg overflow-hidden focus:outline-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {languages.map((lang) => (
              <li
                key={lang.code}
                role="option"
                tabIndex={0} // Make individual options focusable
                aria-selected={i18n.language === lang.code}
                className={`flex items-center px-3 py-2 text-sm cursor-pointer
                  ${ i18n.language === lang.code
                    ? 'bg-primary text-white'
                    : 'text-text-default hover:bg-primary-light hover:text-white dark:hover:bg-primary-dark dark:hover:text-text-default'
                  }
                  focus:bg-primary-light focus:text-white dark:focus:bg-primary-dark dark:focus:text-text-default focus:outline-none`}
                onClick={() => selectLanguage(lang.code)}
                onKeyDown={(e) => handleOptionKeyDown(e, lang.code)}
              >
                <img
                  src={lang.flag}
                  alt={`${lang.name} flag`}
                  className="w-5 h-4 object-cover rounded-sm mr-3"
                  loading="lazy"
                />
                {lang.name}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
