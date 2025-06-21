/**
 * @file MainLayout.tsx
 * @description This file defines the main layout structure used across the application.
 * It wraps page content with a consistent Navbar and Footer, and handles page transitions.
 * It is used as the root layout for all authenticated/standard pages.
 */
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { AnimatePresence } from 'framer-motion';
import ScrollToTop from '../utils/ScrollToTop';
import CookieConsentPopup from '../ui/CookieConsentPopup'; // Import the CookieConsentPopup

/**
 * Provides the main layout structure for the application.
 * It includes the Navbar, Footer, and a central area for page content rendered by React Router's Outlet.
 * It also incorporates Framer Motion's AnimatePresence for page transition animations.
 * @returns {JSX.Element} The rendered MainLayout component.
 */
const MainLayout: React.FC = () => {
  const location = useLocation(); // Needed for AnimatePresence to detect route changes

  // TODO: Conduct a more thorough accessibility audit (e.g., WCAG compliance check) for complex components or user flows.
  // This layout is a good place to ensure overall page structure is accessible (e.g., landmarks, skip links if needed).
  // TODO: For forms (if added later), implement robust validation and error handling (e.g., using a library like react-hook-form or Zod).
  // (Placing this TODO here as a general reminder for forms that might be added within this layout's children).
  return (
    <>
      <ScrollToTop /> {/* Add ScrollToTop here, it doesn't render UI so position among visual elements is flexible */}
      <div className="flex flex-col min-h-screen bg-background text-default transition-colors duration-300">
        <Navbar />
        <main className="flex-grow container mx-auto p-space-md">
          <AnimatePresence mode="wait">
          {/* Keying Outlet wrapper with location.pathname ensures AnimatePresence detects route changes */}
          <React.Fragment key={location.pathname}>
            <Outlet />
          </React.Fragment>
        </AnimatePresence>
      </main>
      <Footer />
      </div>
      <CookieConsentPopup /> {/* Add CookieConsentPopup here so it can overlay */}
    </>
  );
};

export default MainLayout;
