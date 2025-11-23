/**
 * @file router/index.tsx
 * @description Defines the routing configuration for the application.
 * It uses `react-router-dom` to create a browser router with nested routes
 * under a common MainLayout. This file exports the configured router instance.
 */
import { createHashRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

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

const routes: RouteObject[] = [
  // Public routes accessible to everyone
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'catalog', element: <CatalogPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'legal', element: <LegalPage /> },
      { path: 'testimonials', element: <TestimonialsPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'booking', element: <BookingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegistrationPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'privacidad', element: <PrivacyPolicyPage /> },

      // Client-specific routes (protected)
      {
        element: <PrivateRoute allowedRoles={['client', 'coach', 'admin']} loginPath="/login" />,
        children: [
          { path: 'profile/:userId', element: <UserProfilePage /> }, // Accessible by self, coach, admin
        ],
      },
      {
        element: <PrivateRoute allowedRoles={['client']} loginPath="/login" />,
        children: [
          { path: 'dashboard/client', element: <ClientDashboardPage /> },
          { path: 'training-plan', element: <ClientTrainingPlanPage /> },
          { path: 'training-history', element: <ClientTrainingHistoryPage /> },
          { path: 'notifications', element: <NotificationsPage /> },
          { path: 'settings', element: <UserSettingsPage /> },
        ],
      },

      // Coach-specific routes (protected)
      {
        element: <PrivateRoute allowedRoles={['coach', 'admin']} loginPath="/login" />,
        children: [
          { path: 'dashboard/coach', element: <CoachDashboardPage /> },
          { path: 'analytics', element: <CoachAnalyticsPage /> },
          { path: 'schedule', element: <CoachSchedulePage /> },
          // Coaches might also access a version of AdminUsersPage, filtered to their clients, or specific parts of it.
          // For now, keeping AdminUsersPage for admin/coach with full view.
        ],
      },

      // Admin-specific routes (protected)
      // These routes are also within MainLayout. If a different layout is needed for admin panel,
      // it would require a separate top-level route group.
      {
        element: <PrivateRoute allowedRoles={['admin', 'coach']} loginPath="/login" />,
        children: [
          { path: 'admin/users', element: <AdminUsersPage /> },
          { path: 'admin/plans', element: <AdminPlansPage /> },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={['admin']} loginPath="/login" />,
        children: [
          { path: 'admin/settings', element: <AdminSettingsPage /> },
        ],
      },
    ],
  },
  // Catch-all route for 404 errors (ensure this is last)
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

const router = createHashRouter(routes);

export default router;
