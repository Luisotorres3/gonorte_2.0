/**
 * @file router/index.tsx
 * @description Defines the routing configuration for the application.
 * It uses `react-router-dom` to create a browser router with nested routes
 * under a common MainLayout. This file exports the configured router instance.
 */
import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProjectsPage from '../pages/ProjectsPage';
import CatalogPage from '../pages/CatalogPage';
import LegalPage from '../pages/LegalPage'; // Import the new LegalPage
import ServicesPage from '../pages/ServicesPage'; // Import the new ServicesPage
import TestimonialsPage from '../pages/TestimonialsPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';

// --- How to Add a New Page ---
//
// 1. Create your page component:
//    Add a new .tsx file in the `src/pages/` directory (e.g., `src/pages/ContactPage.tsx`).
//    This component will represent the content of your new page.
//
// 2. Import the component here:
//    `import ContactPage from '../pages/ContactPage';`
//
// 3. Add a new route object to the `routes` array below:
//    Make sure it's within the `children` array of the `MainLayout` if you want the standard layout.
//    Example:
//    `{ path: 'contact', element: <ContactPage /> }`
//    Or for a top-level route (without MainLayout, if needed):
//    `{ path: '/standalone', element: <StandalonePage /> }`
//
// 4. Add navigation (optional):
//    If the page should be accessible from the main navigation bar,
//    add a `<NavLink>` to it in `src/components/layout/Navbar.tsx`.
//
// 5. Add translations (optional):
//    If your page uses new text strings, add them to the translation files
//    in `src/locales/` (see the translation files for details).
//
// --- End of Guide ---

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'catalog',
        element: <CatalogPage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
      {
        path: 'legal',
        element: <LegalPage />,
      },
      {
        path: 'testimonials',
        element: <TestimonialsPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
    ],
  },
  // Add a catch-all route for 404 errors
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

// Remove the basename or set it to the correct path for your deployment
const router = createBrowserRouter(routes);

export default router;
