/**
 * @file i18n/config.ts
 * @description Configuration file for i18next internationalization library.
 * Sets up language detection, backend for loading translation files,
 * and integration with React. Supported languages are English and Spanish.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Load translations using http (default public/locales/{{lng}}/{{ns}}.json)
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    supportedLngs: ['en', 'es'],
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'], // Cache found language in localStorage
    },
    backend: {
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}.json`, // Path to translation files
    },
  });

export default i18n;
