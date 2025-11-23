/**
 * @file Navbar.tsx
 * @description This file defines the main navigation bar component for the application.
 * It includes links to different pages, a theme toggle, a language selector,
 * and conditional rendering for login/logout/profile links based on authentication state.
 * Now supports internationalized routes.
 */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSelector from '../ui/LanguageSelector';
import Logo from '../ui/Logo';
import { useAuth } from '../../contexts/AuthContext'; // Updated path
import { getLocalizedRoute } from '../../router/routes.config';

/**
 * Displays the main navigation bar for the application.
 * Includes navigation links, auth controls, theme toggle, and LanguageSelector.
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, currentUser, userRole, logout, loading } = useAuth();
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false); // Close menu on logout
    navigate(getLocalizedRoute('home', currentLang)); // Redirect to home page after logout
  };

  const getDashboardPath = () => {
    if (!userRole) return getLocalizedRoute('login', currentLang);
    switch (userRole) {
      case 'admin':
        return `/${currentLang}/${t('routes.admin')}/${t('routes.users')}`;
      case 'coach':
        return `/${currentLang}/${t('routes.dashboard')}/coach`;
      case 'client':
        return `/${currentLang}/${t('routes.dashboard')}/client`;
      default:
        return getLocalizedRoute('home', currentLang);
    }
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden ${
      isActive
        ? 'text-neutral-900 dark:text-text-default-light bg-primary-dark dark:bg-primary-dark shadow-lg'
        : 'text-text-default-light dark:text-text-default-dark hover:text-primary-dark dark:hover:text-primary-light hover:bg-primary-light dark:hover:bg-primary-hover'
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-3 text-base font-medium transition-colors rounded-lg ${
      isActive
        ? 'text-neutral-900 dark:text-text-default-light bg-primary-dark dark:bg-primary-dark'
        : 'text-text-default-light dark:text-text-default-dark hover:text-primary-dark dark:hover:text-primary-light hover:bg-primary-light dark:hover:bg-primary-hover'
    }`;

  const authButtonClasses = "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-text-default-light dark:text-text-default-dark hover:text-primary-dark dark:hover:text-primary-light hover:bg-primary-light dark:hover:bg-primary-hover";
  const mobileAuthButtonClasses = "block w-full text-left px-3 py-3 text-base font-medium transition-colors rounded-lg text-text-default-light dark:text-text-default-dark hover:text-primary-dark dark:hover:text-primary-light hover:bg-primary-light dark:hover:bg-primary-hover duration-300";

  const renderAuthControls = (isMobile: boolean) => {
    if (loading) {
      return <div className={`${isMobile ? mobileAuthButtonClasses : authButtonClasses} text-text-muted-light dark:text-text-muted-dark`}>{t('navbar.loadingUser', 'Loading...')}</div>;
    }

    if (isAuthenticated && currentUser) {
      return (
        <>
          <NavLink
            to={getLocalizedRoute('profile', currentLang).replace(':userId', currentUser.uid)}
            className={isMobile ? mobileNavLinkClasses : navLinkClasses}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            {currentUser.displayName || t('navbar.profile', 'Profile')}
          </NavLink>
          {/* Mostrar solo el panel de coach si es admin */}
          {userRole === 'admin' ? (
            <NavLink
              to={`/${currentLang}/${t('routes.dashboard')}/coach`}
              className={isMobile ? mobileNavLinkClasses : navLinkClasses}
              onClick={() => isMobile && setIsMobileMenuOpen(false)}
            >
              {t('navbar.panel', 'Panel')}
            </NavLink>
          ) : (
            <NavLink
              to={getDashboardPath()}
              className={isMobile ? mobileNavLinkClasses : navLinkClasses}
              onClick={() => isMobile && setIsMobileMenuOpen(false)}
            >
              {t('navbar.dashboard', 'Dashboard')}
            </NavLink>
          )}
          <button onClick={handleLogout} className={isMobile ? mobileAuthButtonClasses : authButtonClasses}>
            {t('navbar.logout', 'Logout')}
          </button>
        </>
      );
    } else {
      return (
        <NavLink
          to={getLocalizedRoute('login', currentLang)}
          className={isMobile ? mobileAuthButtonClasses : authButtonClasses}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          {t('navbar.login', 'Login')}
        </NavLink>
      );
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-neutral-surface-light/95 dark:bg-neutral-surface-dark/95 backdrop-blur-md shadow-lg border-b border-neutral-border-light dark:border-neutral-border-dark'
            : 'bg-neutral-background-light/80 dark:bg-neutral-background-dark/80'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16 lg:h-20">
            <div className="flex-1 flex items-center justify-start">
              <motion.div
                className="flex items-center flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Logo textClassName="h-10 lg:h-12 w-auto" />
              </motion.div>
            </div>

            <div className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-2">
              <NavLink to={getLocalizedRoute('home', currentLang)} className={navLinkClasses} end>{t('navHome', 'Inicio')}</NavLink>
              <NavLink to={getLocalizedRoute('about', currentLang)} className={navLinkClasses}>{t('navAbout', 'Sobre Mí')}</NavLink>
              <NavLink to={getLocalizedRoute('services', currentLang)} className={navLinkClasses}>{t('navServices', 'Servicios')}</NavLink>
              <NavLink to={getLocalizedRoute('testimonials', currentLang)} className={navLinkClasses}>{t('navTestimonials', 'Testimonios')}</NavLink>
              <NavLink to={getLocalizedRoute('contact', currentLang)} className={navLinkClasses}>{t('navContact', 'Contacto')}</NavLink>
            </div>

            <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-3">
              <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                {!loading && renderAuthControls(false)}
                <ThemeToggle />
                <LanguageSelector />
              </div>

              <div className="lg:hidden flex items-center space-x-2">
                <ThemeToggle />
                <LanguageSelector />
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg text-text-default-light dark:text-text-default-dark hover:bg-primary-light dark:hover:bg-primary-hover transition-colors"
                  aria-label={t('navbar.toggleMenu', 'Toggle mobile menu')}
                >
                  <svg className="w-6 h-6 icon-default" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="lg:hidden fixed inset-0 z-50 bg-neutral-surface-light/95 dark:bg-neutral-surface-dark/95 backdrop-blur-md pt-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-3.5 right-4 p-2 rounded-lg text-text-default-light dark:text-text-default-dark hover:bg-primary-light dark:hover:bg-primary-hover transition-colors z-50"
              aria-label={t('navbar.closeMenu', 'Close menu')}
            >
              <svg className="w-6 h-6 icon-default" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col h-full overflow-y-auto px-4 pt-8 pb-24 space-y-3">
              <NavLink to={getLocalizedRoute('home', currentLang)} className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)} end>{t('navHome', 'Inicio')}</NavLink>
              <NavLink to={getLocalizedRoute('about', currentLang)} className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>{t('navAbout', 'Sobre Mí')}</NavLink>
              <NavLink to={getLocalizedRoute('services', currentLang)} className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>{t('navServices', 'Servicios')}</NavLink>
              <NavLink to={getLocalizedRoute('testimonials', currentLang)} className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>{t('navTestimonials', 'Testimonios')}</NavLink>
              <NavLink to={getLocalizedRoute('contact', currentLang)} className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>{t('navContact', 'Contacto')}</NavLink>

              <hr className="my-3 border-neutral-border-light dark:border-neutral-border-dark" />

              {!loading && renderAuthControls(true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
