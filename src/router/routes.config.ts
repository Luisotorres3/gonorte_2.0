/**
 * @file router/routes.config.ts
 * @description Configuration and utilities for internationalized routing.
 * Provides functions to get localized route paths and generate route configurations.
 */

import i18n from '../i18n/config';

export type RouteKey = 
  | 'home'
  | 'about'
  | 'projects'
  | 'catalog'
  | 'services'
  | 'legal'
  | 'testimonials'
  | 'contact'
  | 'booking'
  | 'login'
  | 'register'
  | 'forgotPassword'
  | 'privacy'
  | 'profile'
  | 'dashboard'
  | 'trainingPlan'
  | 'trainingHistory'
  | 'notifications'
  | 'settings'
  | 'analytics'
  | 'schedule'
  | 'admin'
  | 'users'
  | 'plans';

export const SUPPORTED_LANGUAGES = ['es', 'en', 'fr'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

/**
 * Hardcoded route translations to ensure they're available immediately
 * These must match the translations in the locale files
 */
export const ROUTE_TRANSLATIONS: Record<RouteKey, Record<SupportedLanguage, string>> = {
  home: { es: '', en: '', fr: '' },
  about: { es: 'acerca-de', en: 'about', fr: 'a-propos' },
  projects: { es: 'proyectos', en: 'projects', fr: 'projets' },
  catalog: { es: 'catalogo', en: 'catalog', fr: 'catalogue' },
  services: { es: 'servicios', en: 'services', fr: 'services' },
  legal: { es: 'legal', en: 'legal', fr: 'legal' },
  testimonials: { es: 'testimonios', en: 'testimonials', fr: 'temoignages' },
  contact: { es: 'contacto', en: 'contact', fr: 'contact' },
  booking: { es: 'reservar', en: 'booking', fr: 'reserver' },
  login: { es: 'iniciar-sesion', en: 'login', fr: 'connexion' },
  register: { es: 'registrarse', en: 'register', fr: 'inscription' },
  forgotPassword: { es: 'recuperar-contrasena', en: 'forgot-password', fr: 'mot-de-passe-oublie' },
  privacy: { es: 'privacidad', en: 'privacy', fr: 'confidentialite' },
  profile: { es: 'perfil', en: 'profile', fr: 'profil' },
  dashboard: { es: 'panel', en: 'dashboard', fr: 'tableau-de-bord' },
  trainingPlan: { es: 'plan-entrenamiento', en: 'training-plan', fr: 'plan-entrainement' },
  trainingHistory: { es: 'historial-entrenamiento', en: 'training-history', fr: 'historique-entrainement' },
  notifications: { es: 'notificaciones', en: 'notifications', fr: 'notifications' },
  settings: { es: 'configuracion', en: 'settings', fr: 'parametres' },
  analytics: { es: 'analiticas', en: 'analytics', fr: 'analytique' },
  schedule: { es: 'horario', en: 'schedule', fr: 'horaire' },
  admin: { es: 'admin', en: 'admin', fr: 'admin' },
  users: { es: 'usuarios', en: 'users', fr: 'utilisateurs' },
  plans: { es: 'planes', en: 'plans', fr: 'plans' },
};

/**
 * Get the localized path for a route key in a specific language
 * @param routeKey - The route key to translate
 * @param language - The target language (defaults to current i18n language)
 * @returns The localized path
 */
export const getLocalizedPath = (routeKey: RouteKey, language?: string): string => {
  const lang = (language || i18n.language || 'es') as SupportedLanguage;
  
  // Use hardcoded translations first for reliability
  if (ROUTE_TRANSLATIONS[routeKey] && ROUTE_TRANSLATIONS[routeKey][lang]) {
    return ROUTE_TRANSLATIONS[routeKey][lang];
  }
  
  // Fallback to i18n translation if available
  const translationKey = `routes.${routeKey}`;
  const path = i18n.t(translationKey, { lng: lang, defaultValue: '' });
  
  // If path is empty string or the same as the key (translation missing), return empty for home or the key itself
  if (!path || path === translationKey) {
    console.warn(`Missing translation for route key "${routeKey}" in language "${lang}"`);
    return routeKey === 'home' ? '' : routeKey;
  }
  
  return path;
};

/**
 * Get the full localized route with language prefix
 * @param routeKey - The route key to translate
 * @param language - The target language (defaults to current i18n language)
 * @returns The full localized route path with language prefix
 */
export const getLocalizedRoute = (routeKey: RouteKey, language?: string): string => {
  const lang = language || i18n.language;
  const path = getLocalizedPath(routeKey, lang);
  return path ? `/${lang}/${path}` : `/${lang}`;
};

/**
 * Extract the route key from a localized path
 * @param pathname - The current pathname
 * @returns Object containing language and route key, or null if not found
 */
export const parseLocalizedPath = (pathname: string): { language: string; routeKey: string | null } | null => {
  // Remove leading slash and split by '/'
  const parts = pathname.replace(/^\//, '').split('/');
  
  // Check if first part is a supported language
  const language = parts[0];
  if (!SUPPORTED_LANGUAGES.includes(language as SupportedLanguage)) {
    return null;
  }

  // Get the path after language
  const localizedPath = parts.slice(1).join('/') || '';

  // Find matching route key
  const routeKeys: RouteKey[] = [
    'home', 'about', 'projects', 'catalog', 'services', 'legal', 'testimonials',
    'contact', 'booking', 'login', 'register', 'forgotPassword', 'privacy',
    'profile', 'dashboard', 'trainingPlan', 'trainingHistory', 'notifications',
    'settings', 'analytics', 'schedule', 'admin', 'users', 'plans'
  ];

  for (const key of routeKeys) {
    const translatedPath = getLocalizedPath(key, language);
    if (translatedPath === localizedPath) {
      return { language, routeKey: key };
    }
  }

  return { language, routeKey: null };
};

/**
 * Generate all language variants of a route path
 * @param routeKey - The route key to translate
 * @returns Array of all language variants
 */
export const getAllLanguageVariants = (routeKey: RouteKey): string[] => {
  return SUPPORTED_LANGUAGES.map(lang => {
    const path = getLocalizedPath(routeKey, lang);
    return path ? `/${lang}/${path}` : `/${lang}`;
  });
};

/**
 * Switch the current path to a different language
 * @param currentPath - The current pathname
 * @param targetLanguage - The target language
 * @returns The equivalent path in the target language
 */
export const switchLanguagePath = (currentPath: string, targetLanguage: string): string => {
  const parsed = parseLocalizedPath(currentPath);
  
  if (!parsed || !parsed.routeKey) {
    // If can't parse or no route key, just return base language path
    return `/${targetLanguage}`;
  }

  const newPath = getLocalizedPath(parsed.routeKey as RouteKey, targetLanguage);
  return newPath ? `/${targetLanguage}/${newPath}` : `/${targetLanguage}`;
};
