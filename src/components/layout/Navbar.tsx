/**
 * @file Navbar.tsx
 * @description This file defines the main navigation bar component for the application.
 * It includes links to different pages, a theme toggle, and a language selector.
 * It is typically used as part of the MainLayout.
 */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSelector from '../ui/LanguageSelector';
import Logo from '../ui/Logo'; // Import the new Logo component

/**
 * Displays the main navigation bar for the application.
 * It includes navigation links, a theme toggle, and the LanguageSelector component.
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Generates the CSS classes for NavLink components based on their active state.
   * @param {{ isActive: boolean }} props - Object containing the active state of the NavLink.
   * @param {boolean} props.isActive - Whether the NavLink is currently active.
   * @returns {string} A string of Tailwind CSS classes.
   */
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden
    ${isActive
      ? 'text-white bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg'
      : 'text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20'
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-base font-medium transition-colors rounded-lg
    ${isActive
      ? 'text-white bg-gradient-to-r from-teal-500 to-cyan-500'
      : 'text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20'
    }`;

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-1 flex items-center justify-start">
            <motion.div 
              className="flex items-center flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Logo textClassName="h-10 lg:h-12 w-auto" />
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center space-x-2">
            <NavLink to="/" className={navLinkClasses}>
              {t('navHome')}
            </NavLink>
            <NavLink to="/about" className={navLinkClasses}>
              {t('navAbout')}
            </NavLink>
            <NavLink to="/services" className={navLinkClasses}>
              {t('navServices')}
            </NavLink>
            <NavLink to="/testimonials" className={navLinkClasses}>
              {t('navTestimonials')}
            </NavLink>
            <NavLink to="/contact" className={navLinkClasses}>
              {t('navContact')}
            </NavLink>
          </div>

          {/* Controls */}
          <div className="flex-1 flex items-center justify-end space-x-3">
            <div className="hidden lg:flex items-center space-x-3">
              <ThemeToggle />
              <LanguageSelector />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <ThemeToggle />
              <LanguageSelector />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 top-16 z-40 bg-white dark:bg-gray-900 shadow-2xl border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col py-6 px-4 space-y-4">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => `${mobileNavLinkClasses({ isActive })} text-lg py-4`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('navHome')}
                </NavLink>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => `${mobileNavLinkClasses({ isActive })} text-lg py-4`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('navAbout')}
                </NavLink>
                <NavLink 
                  to="/services" 
                  className={({ isActive }) => `${mobileNavLinkClasses({ isActive })} text-lg py-4`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('navServices')}
                </NavLink>
                <NavLink 
                  to="/testimonials" 
                  className={({ isActive }) => `${mobileNavLinkClasses({ isActive })} text-lg py-4`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('navTestimonials')}
                </NavLink>
                <NavLink 
                  to="/contact" 
                  className={({ isActive }) => `${mobileNavLinkClasses({ isActive })} text-lg py-4`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('navContact')}
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
