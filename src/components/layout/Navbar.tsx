/**
 * @file Navbar.tsx
 * @description This file defines the main navigation bar component for the application.
 * It includes links to different pages, a theme toggle, a language selector,
 * and conditional rendering for login/logout/profile links based on authentication state.
 * Now supports internationalized routes.
 */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSelector from '../ui/LanguageSelector';
import Logo from '../ui/Logo';
import { getLocalizedRoute } from '../../router/routes.config';

/**
 * Displays the main navigation bar for the application.
 * Includes navigation links, auth controls, theme toggle, and LanguageSelector.
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get current language
  const currentLang = i18n.language || 'es';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleScrollOnMenuOpen = () => setIsMobileMenuOpen(false);
      window.addEventListener('scroll', handleScrollOnMenuOpen);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('scroll', handleScrollOnMenuOpen);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden ${
      isActive
        ? 'text-fg-on-primary bg-primary-600 dark:bg-primary-500 shadow-lg'
        : 'text-fg-base hover:text-primary-700 dark:hover:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30'
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-3 text-base font-medium transition-colors rounded-lg ${
      isActive
        ? 'text-fg-on-primary bg-primary-600 dark:bg-primary-500'
        : 'text-fg-base hover:text-primary-700 dark:hover:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30'
    }`;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-bg-surface/95 backdrop-blur-md shadow-lg border-b border-border-base'
            : 'bg-bg-base/80'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16 lg:h-20">
            <div className="flex-1 flex items-center justify-start">
              <motion.div
                className="flex items-center flex-shrink-0 h-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Logo textClassName="h-16 sm:h-14 lg:h-32 max-h-full w-auto" />
              </motion.div>
            </div>

            <div className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-2">
              <NavLink to={getLocalizedRoute('home', currentLang)} className={navLinkClasses} end>{t('navHome', 'Inicio')}</NavLink>
              <NavLink to={getLocalizedRoute('services', currentLang)} className={navLinkClasses}>{t('navProgram', 'El Plan')}</NavLink>
              <NavLink to={getLocalizedRoute('resources', currentLang)} className={navLinkClasses}>{t('navResources', 'Análisis postural')}</NavLink>
              <NavLink to={getLocalizedRoute('testimonials', currentLang)} className={navLinkClasses}>{t('navTestimonials', 'Testimonios')}</NavLink>
              <NavLink to={getLocalizedRoute('about', currentLang)} className={navLinkClasses}>{t('navAbout', 'Sobre Mí')}</NavLink>
              <NavLink to={getLocalizedRoute('contact', currentLang)} className={navLinkClasses}>{t('navContact', 'Contacto')}</NavLink>
            </div>

            <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-3">
              <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                <ThemeToggle />
                <LanguageSelector />
              </div>

              <div className="lg:hidden flex items-center space-x-2">
                <ThemeToggle />
                <LanguageSelector />
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg text-fg-base hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                  aria-label={t('navbar.toggleMenu', 'Toggle mobile menu')}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50 bg-bg-surface/95 backdrop-blur-md pt-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-3.5 right-4 p-2 rounded-lg text-fg-base hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors z-50"
              aria-label={t('navbar.closeMenu', 'Close menu')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
              <div className="flex flex-col h-full overflow-y-auto px-4 pt-8 pb-24 space-y-3">
                <NavLink to={getLocalizedRoute('home', currentLang)} className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)} end>{t('navHome', 'Inicio')}</NavLink>
                <NavLink to={getLocalizedRoute('services', currentLang)} className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>{t('navProgram', 'El Plan')}</NavLink>
                <NavLink to={getLocalizedRoute('resources', currentLang)} className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>{t('navResources', 'Análisis postural')}</NavLink>
                <NavLink to={getLocalizedRoute('testimonials', currentLang)} className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>{t('navTestimonials', 'Testimonios')}</NavLink>
                <NavLink to={getLocalizedRoute('about', currentLang)} className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>{t('navAbout', 'Sobre Mí')}</NavLink>
                <NavLink to={getLocalizedRoute('contact', currentLang)} className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>{t('navContact', 'Contacto')}</NavLink>

              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
