/**
 * @file App.tsx
 * @description This is the root component of the application.
 * It sets up the main router using React Router.
 * All other content and layouts are rendered via this router.
 */
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';

/**
 * The main App component.
 * It renders the RouterProvider which handles all application routing.
 * @returns {JSX.Element} The RouterProvider component.
 */
const App: React.FC = () => {
  // TODO: Implement more comprehensive error boundaries for React components to catch and handle runtime errors gracefully.
  // This could involve wrapping <RouterProvider> or specific routes/layouts with an ErrorBoundary component.
  return <RouterProvider router={router} />;
};

export default App;
