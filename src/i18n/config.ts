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

// Custom path detector to extract language from URL path
const pathLanguageDetector = {
  name: 'pathDetector',
  lookup() {
    // Get the pathname and remove the base URL prefix if present
    let pathname = window.location.pathname;
    const baseUrl = import.meta.env.BASE_URL || '/';
    const normalizedBaseUrl = baseUrl === '/' ? '/' : baseUrl.replace(/\/+$/, '');
    
    if (normalizedBaseUrl !== '/' && pathname.startsWith(normalizedBaseUrl)) {
      pathname = pathname.slice(normalizedBaseUrl.length) || '/';
      if (!pathname.startsWith('/')) {
        pathname = `/${pathname}`;
      }
    }

    pathname = pathname.replace(/\/+/g, '/');
    
    // Extract the first segment of the path (e.g., /es/about -> es)
    const match = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
    if (match) {
      const lang = match[1];
      if (['es', 'en', 'fr'].includes(lang)) {
        return lang;
      }
    }
    return null;
  },
  cacheUserLanguage() {
    // We don't cache from path - let localStorage handle caching
  }
};

// Create a custom language detector instance
const languageDetector = new LanguageDetector();
languageDetector.addDetector(pathLanguageDetector);

i18n
  .use(Backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['es', 'en', 'fr'],
    load: 'languageOnly',
    fallbackLng: 'es',
    debug: false,
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}.json`,
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['pathDetector', 'localStorage'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
