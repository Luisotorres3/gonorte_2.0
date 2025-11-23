/**
 * @file i18n/config.ts
 * @description Configuration file for i18next internationalization library.
 * Sets up language detection, backend for loading translation files,
 * and integration with React. Supported languages are English, Spanish, and French.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'es', 'fr'],
    load: 'languageOnly',
    fallbackLng: 'es',
    debug: true,
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}.json`,
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    },
  });

console.log('✅ i18n initialized with BASE_URL:', import.meta.env.BASE_URL);
console.log('✅ Current language:', i18n.language);
console.log('✅ Available languages:', i18n.languages);

export default i18n;
