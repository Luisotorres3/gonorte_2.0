/**
 * @file constants.ts
 * @description Application-wide constants and configuration values
 */

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  COACH: 'coach',
  CLIENT: 'client',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Payment Status
export const PAYMENT_STATUS = {
  PAID: 'paid',
  PENDING: 'pending',
  OVERDUE: 'overdue',
  NOT_APPLICABLE: 'not_applicable',
} as const;

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];

// Supported Languages
export const SUPPORTED_LANGUAGES = ['en', 'es', 'fr'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Theme Options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Theme = typeof THEMES[keyof typeof THEMES];

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  LANGUAGE: 'i18nextLng',
  COOKIE_CONSENT: 'cookieConsent',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  PROJECTS: '/projects',
  CATALOG: '/catalog',
  TESTIMONIALS: '/testimonials',
  CONTACT: '/contact',
  LEGAL: '/legal',
  PRIVACY: '/privacy',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  CLIENT_DASHBOARD: '/client/dashboard',
  CLIENT_TRAINING: '/client/training',
  CLIENT_HISTORY: '/client/history',
  COACH_DASHBOARD: '/coach/dashboard',
  COACH_ANALYTICS: '/coach/analytics',
  COACH_SCHEDULE: '/coach/schedule',
  ADMIN_USERS: '/admin/users',
  ADMIN_PLANS: '/admin/plans',
  ADMIN_SETTINGS: '/admin/settings',
  USER_PROFILE: '/user/:id',
  USER_SETTINGS: '/settings',
  NOTIFICATIONS: '/notifications',
} as const;

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Breakpoints (matches Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;
