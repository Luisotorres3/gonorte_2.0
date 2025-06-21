/**
 * @file Navbar.tsx
 * @description This file defines the main navigation bar component for the application.
 * It includes links to different pages, a theme toggle, and a language selector.
 * It is typically used as part of the MainLayout.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSelector from '../ui/LanguageSelector';
import Logo from '../ui/Logo'; // Import the new Logo component

/**
 * Displays the main navigation bar for the application.
 * It includes navigation links, a theme toggle, and the LanguageSelector component.
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar: React.FC = () => {
  const { t } = useTranslation();

  // changeLanguage function is removed from here

  /**
   * Generates the CSS classes for NavLink components based on their active state.
   * @param {{ isActive: boolean }} props - Object containing the active state of the NavLink.
   * @param {boolean} props.isActive - Whether the NavLink is currently active.
   * @returns {string} A string of Tailwind CSS classes.
   */
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-radius-md text-sm font-medium transition-colors
    ${isActive
      ? 'bg-primary text-white' // Assuming white text provides good contrast on primary
      : 'text-text-muted hover:bg-primary-light dark:hover:bg-primary-dark hover:text-white'
    }`;
  // TODO: Consider more advanced language persistence options if needed (e.g., user accounts, server-side preferences).

  return (
    <nav className="bg-surface shadow-lg">
      <div className="container mx-auto px-space-md sm:px-space-lg lg:px-space-xl">
        <div className="flex items-center justify-between h-16"> {/* h-16 is 4rem, maps to space-xl*2 or keep as is if not in scale */}
          <div className="flex items-center flex-shrink-0 mr-10"> {/* Más margen derecho */}
            <Logo textClassName="h-12 w-auto" /> {/* Tamaño más grande, prop renamed */}
          </div>
          <div className="hidden md:flex items-center space-x-space-md">
            {/* TODO: Implement a responsive mobile menu (hamburger button) for smaller screens. This div would be part of that logic. */}
            <NavLink to="/" className={navLinkClasses}>{t('navHome', 'Home')}</NavLink>
            <NavLink to="/about" className={navLinkClasses}>{t('navAbout', 'About Me')}</NavLink>
            <NavLink to="/services" className={navLinkClasses}>{t('navServices', 'Services')}</NavLink>
            <NavLink to="/testimonials" className={navLinkClasses}>{t('navTestimonials', 'Testimonials')}</NavLink>
            <NavLink to="/contact" className={navLinkClasses}>{t('navContact', 'Contact')}</NavLink>
            <ThemeToggle />
            <LanguageSelector /> {/* Use the new component here */}
          </div>
          {/* Mobile menu button can be added here - This is where the hamburger button would likely go */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
