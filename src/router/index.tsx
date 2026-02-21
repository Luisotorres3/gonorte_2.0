/* eslint-disable react-refresh/only-export-components */
/**
 * @file router/index.tsx
 * @description Defines the routing configuration for the application.
 * It uses `react-router-dom` to create a browser router with nested routes
 * under a common MainLayout. This file exports the configured router instance.
 * Supports internationalized routes with language prefixes.
 */
import React from 'react';
import { createBrowserRouter, Navigate, useParams } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { SUPPORTED_LANGUAGES, getLocalizedPath } from './routes.config';
import i18n from '../i18n/config';

// Layouts and Core Pages
import MainLayout from '../components/layout/MainLayout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProjectsPage from '../pages/ProjectsPage';
import CatalogPage from '../pages/CatalogPage';
import LegalPage from '../pages/LegalPage';
import PlanPage from '../pages/PlanPage';
import TestimonialsPage from '../pages/TestimonialsPage';
import AnalysisPage from '../pages/AnalysisPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import BookingPage from '../pages/BookingPage';
import BookCallPage from '../pages/BookCallPage';

/** Redirects /any-slug → /es/any-slug for non-prefixed Spanish URLs */
const RedirectToEs: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/es/${slug ?? ''}`} replace />;
};

// Debug routes only when explicitly enabled
if (import.meta.env.DEV && import.meta.env.VITE_DEBUG_ROUTES === 'true') {
  // Wait for i18n to be ready before logging routes
  i18n.on('initialized', () => {
    console.log('🌐 i18n initialized, current language:', i18n.language);
    console.log('📍 Available languages:', SUPPORTED_LANGUAGES);
    
    // Log sample routes
    SUPPORTED_LANGUAGES.forEach(lang => {
      console.log(`\n${lang.toUpperCase()} Routes:`);
      console.log(`  Home: /${lang}`);
      console.log(`  About: /${lang}/${getLocalizedPath('about', lang)}`);
      console.log(`  Services: /${lang}/${getLocalizedPath('services', lang)}`);
      console.log(`  Plans: /${lang}/${getLocalizedPath('admin', lang)}/${getLocalizedPath('plans', lang)}`);
    });
  });
}

/**
 * Generate localized route children for a specific language
 */
const generateLocalizedRoutes = (lang: string): RouteObject['children'] => {
  const routes: RouteObject[] = [
    { index: true, element: <HomePage /> }, // Home page at /{lang}
    { path: getLocalizedPath('about', lang), element: <AboutPage /> },
    { path: getLocalizedPath('projects', lang), element: <ProjectsPage /> },
    { path: getLocalizedPath('catalog', lang), element: <CatalogPage /> },
    { path: getLocalizedPath('services', lang), element: <PlanPage /> },
    ...(lang === 'es'
      ? [{ path: 'servicios', element: <Navigate to={`/${lang}/${getLocalizedPath('services', lang)}`} replace /> }]
      : []),
    ...(lang === 'en'
      ? [{ path: 'services', element: <Navigate to={`/${lang}/${getLocalizedPath('services', lang)}`} replace /> }]
      : []),
    ...(lang === 'fr'
      ? [{ path: 'services', element: <Navigate to={`/${lang}/${getLocalizedPath('services', lang)}`} replace /> }]
      : []),
    { path: getLocalizedPath('resources', lang), element: <AnalysisPage /> },
    ...(lang === 'es'
      ? [{ path: 'recursos', element: <Navigate to={`/${lang}/${getLocalizedPath('resources', lang)}`} replace /> }]
      : []),
    ...(lang === 'en'
      ? [{ path: 'resources', element: <Navigate to={`/${lang}/${getLocalizedPath('resources', lang)}`} replace /> }]
      : []),
    ...(lang === 'fr'
      ? [{ path: 'ressources', element: <Navigate to={`/${lang}/${getLocalizedPath('resources', lang)}`} replace /> }]
      : []),
    { path: getLocalizedPath('legal', lang), element: <LegalPage /> },
    { path: getLocalizedPath('testimonials', lang), element: <TestimonialsPage /> },
    { path: getLocalizedPath('contact', lang), element: <ContactPage /> },
    { path: getLocalizedPath('booking', lang), element: <BookingPage /> },
    { path: getLocalizedPath('videoCall', lang), element: <BookCallPage /> },
    { path: getLocalizedPath('privacy', lang), element: <PrivacyPolicyPage /> },

    // Auth routes - disabled, redirect to home
    { path: getLocalizedPath('login', lang), element: <Navigate to={`/${lang}`} replace /> },
    { path: getLocalizedPath('register', lang), element: <Navigate to={`/${lang}`} replace /> },
    { path: getLocalizedPath('forgotPassword', lang), element: <Navigate to={`/${lang}`} replace /> },

    // Protected routes - disabled, redirect to home
    { path: `${getLocalizedPath('profile', lang)}/:userId`, element: <Navigate to={`/${lang}`} replace /> },
    { path: `${getLocalizedPath('dashboard', lang)}/client`, element: <Navigate to={`/${lang}`} replace /> },
    { path: `${getLocalizedPath('dashboard', lang)}/coach`, element: <Navigate to={`/${lang}`} replace /> },
    { path: getLocalizedPath('trainingPlan', lang), element: <Navigate to={`/${lang}`} replace /> },
    { path: getLocalizedPath('trainingHistory', lang), element: <Navigate to={`/${lang}`} replace /> },
    { path: getLocalizedPath('notifications', lang), element: <Navigate to={`/${lang}`} replace /> },
    { path: getLocalizedPath('settings', lang), element: <Navigate to={`/${lang}`} replace /> },
    { path: getLocalizedPath('analytics', lang), element: <Navigate to={`/${lang}`} replace /> },
    { path: getLocalizedPath('schedule', lang), element: <Navigate to={`/${lang}`} replace /> },
    { path: `${getLocalizedPath('admin', lang)}/${getLocalizedPath('users', lang)}`, element: <Navigate to={`/${lang}`} replace /> },
    { path: `${getLocalizedPath('admin', lang)}/${getLocalizedPath('plans', lang)}`, element: <Navigate to={`/${lang}`} replace /> },
    { path: `${getLocalizedPath('admin', lang)}/${getLocalizedPath('settings', lang)}`, element: <Navigate to={`/${lang}`} replace /> },
  ];
  
  return routes;
};

const routes: RouteObject[] = [
  // Root redirect to default language
  {
    path: '/',
    element: <Navigate to={`/${i18n.language || 'es'}`} replace />,
  },
  // Generate routes for each supported language
  ...SUPPORTED_LANGUAGES.map(lang => ({
    path: `/${lang}`,
    element: <MainLayout />,
    children: generateLocalizedRoutes(lang),
  })),
  // Redirect non-prefixed slugs → /es/:slug  (e.g. /analisis → /es/analisis)
  {
    path: '/:slug',
    element: <RedirectToEs />,
  },
  // Catch-all route for 404 errors (ensure this is last)
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

const normalizedBaseName = (() => {
  const base = import.meta.env.BASE_URL || '/';
  if (base === '/') return '/';
  return base.endsWith('/') ? base.slice(0, -1) : base;
})();

const router = createBrowserRouter(routes, {
  basename: normalizedBaseName,
});

export default router;
