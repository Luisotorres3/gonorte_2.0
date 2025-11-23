/**
 * @file router/index.tsx
 * @description Defines the routing configuration for the application.
 * It uses `react-router-dom` to create a browser router with nested routes
 * under a common MainLayout. This file exports the configured router instance.
 * Supports internationalized routes with language prefixes.
 */
import { createBrowserRouter, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { SUPPORTED_LANGUAGES, getLocalizedPath } from './routes.config';
import i18n from '../i18n/config';

// Debug routes in development
if (import.meta.env.DEV) {
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

// Layouts and Core Pages
import MainLayout from '../components/layout/MainLayout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProjectsPage from '../pages/ProjectsPage';
import CatalogPage from '../pages/CatalogPage';
import LegalPage from '../pages/LegalPage';
import ServicesPage from '../pages/ServicesPage';
import TestimonialsPage from '../pages/TestimonialsPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';

// Auth Pages
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import BookingPage from '../pages/BookingPage';

// User Specific Pages
import UserProfilePage from '../pages/UserProfilePage';
import ClientDashboardPage from '../pages/ClientDashboardPage';
import CoachDashboardPage from '../pages/CoachDashboardPage';
import ClientTrainingPlanPage from '../pages/ClientTrainingPlanPage';
import ClientTrainingHistoryPage from '../pages/ClientTrainingHistoryPage';
import CoachAnalyticsPage from '../pages/CoachAnalyticsPage';
import CoachSchedulePage from '../pages/CoachSchedulePage';
import NotificationsPage from '../pages/NotificationsPage';
import UserSettingsPage from '../pages/UserSettingsPage';

// Admin Pages
import AdminUsersPage from '../pages/AdminUsersPage';
import AdminPlansPage from '../pages/AdminPlansPage';
import AdminSettingsPage from '../pages/AdminSettingsPage';

// PrivateRoute HOC
import PrivateRoute from './PrivateRoute';

/**
 * Generate localized route children for a specific language
 */
const generateLocalizedRoutes = (lang: string): RouteObject['children'] => {
  const routes: RouteObject[] = [
    { index: true, element: <HomePage /> }, // Home page at /{lang}
    { path: getLocalizedPath('about', lang), element: <AboutPage /> },
    { path: getLocalizedPath('projects', lang), element: <ProjectsPage /> },
    { path: getLocalizedPath('catalog', lang), element: <CatalogPage /> },
    { path: getLocalizedPath('services', lang), element: <ServicesPage /> },
    { path: getLocalizedPath('legal', lang), element: <LegalPage /> },
    { path: getLocalizedPath('testimonials', lang), element: <TestimonialsPage /> },
    { path: getLocalizedPath('contact', lang), element: <ContactPage /> },
    { path: getLocalizedPath('booking', lang), element: <BookingPage /> },
    { path: getLocalizedPath('login', lang), element: <LoginPage /> },
    { path: getLocalizedPath('register', lang), element: <RegistrationPage /> },
    { path: getLocalizedPath('forgotPassword', lang), element: <ForgotPasswordPage /> },
    { path: getLocalizedPath('privacy', lang), element: <PrivacyPolicyPage /> },

  // Client-specific routes (protected)
  {
    element: <PrivateRoute allowedRoles={['client', 'coach', 'admin']} loginPath={`/${lang}/${getLocalizedPath('login', lang)}`} />,
    children: [
      { path: `${getLocalizedPath('profile', lang)}/:userId`, element: <UserProfilePage /> },
    ],
  },
  {
    element: <PrivateRoute allowedRoles={['client']} loginPath={`/${lang}/${getLocalizedPath('login', lang)}`} />,
    children: [
      { path: `${getLocalizedPath('dashboard', lang)}/client`, element: <ClientDashboardPage /> },
      { path: getLocalizedPath('trainingPlan', lang), element: <ClientTrainingPlanPage /> },
      { path: getLocalizedPath('trainingHistory', lang), element: <ClientTrainingHistoryPage /> },
      { path: getLocalizedPath('notifications', lang), element: <NotificationsPage /> },
      { path: getLocalizedPath('settings', lang), element: <UserSettingsPage /> },
    ],
  },

  // Coach-specific routes (protected)
  {
    element: <PrivateRoute allowedRoles={['coach', 'admin']} loginPath={`/${lang}/${getLocalizedPath('login', lang)}`} />,
    children: [
      { path: `${getLocalizedPath('dashboard', lang)}/coach`, element: <CoachDashboardPage /> },
      { path: getLocalizedPath('analytics', lang), element: <CoachAnalyticsPage /> },
      { path: getLocalizedPath('schedule', lang), element: <CoachSchedulePage /> },
    ],
  },

  // Admin-specific routes (protected)
  {
    element: <PrivateRoute allowedRoles={['admin', 'coach']} loginPath={`/${lang}/${getLocalizedPath('login', lang)}`} />,
    children: [
      { path: `${getLocalizedPath('admin', lang)}/${getLocalizedPath('users', lang)}`, element: <AdminUsersPage /> },
      { path: `${getLocalizedPath('admin', lang)}/${getLocalizedPath('plans', lang)}`, element: <AdminPlansPage /> },
    ],
  },
  {
    element: <PrivateRoute allowedRoles={['admin']} loginPath={`/${lang}/${getLocalizedPath('login', lang)}`} />,
    children: [
      { path: `${getLocalizedPath('admin', lang)}/${getLocalizedPath('settings', lang)}`, element: <AdminSettingsPage /> },
    ],
  },
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
  // Catch-all route for 404 errors (ensure this is last)
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
