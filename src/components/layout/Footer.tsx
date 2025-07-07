/**
 * @file Footer.tsx
 * @description Defines the multi-column footer component for the application.
 * It includes quick navigation links, contact information, language selection,
 * social media links, and a copyright notice.
 * Used within the MainLayout.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import LanguageSelector from '../ui/LanguageSelector';

// Placeholder Social Icons (inline for simplicity of this subtask)
const TwitterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props} aria-hidden="true">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.22.085 4.936 4.936 0 004.604 3.417A9.867 9.867 0 010 17.539a13.94 13.94 0 007.547 2.219c9.053 0 13.998-7.504 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const LinkedInIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.776 13.019H3.561V9h3.552v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const GitHubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props} aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.036 1.531 1.036.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.201 2.398.098 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.308.678.92.678 1.852 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);


/**
 * Displays the multi-column footer section of the application.
 * Includes navigation, contact info, language selector, social media links, and copyright.
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinkClasses = "text-text-muted hover:text-primary dark:hover:text-primary-dark transition-colors text-sm";
  const sectionTitleClasses = "text-text-default dark:text-text-default-dark font-semibold mb-space-sm text-base";

  return (
    <footer className="bg-surface dark:bg-gray-950 text-text-muted pt-space-lg pb-space-md border-t border-neutral-border dark:border-neutral-border-dark shadow-lg transition-colors duration-700">
      <div className="container mx-auto px-space-md">
        {/* Columns Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg mb-space-lg">
          {/* Column 1: Quick Navigation */}
          <div>
            <h3 className={sectionTitleClasses}>{t('footer.quickLinks', 'Quick Links')}</h3>
            <ul className="space-y-space-xs">
              <li><NavLink to="/" className={footerLinkClasses}>{t('navHome', 'Home')}</NavLink></li>
              <li><NavLink to="/about" className={footerLinkClasses}>{t('navAbout', 'About Me')}</NavLink></li>
              <li><NavLink to="/services" className={footerLinkClasses}>{t('navServices', 'Services')}</NavLink></li>
              <li><NavLink to="/testimonials" className={footerLinkClasses}>{t('navTestimonials', 'Testimonials')}</NavLink></li>
              <li><NavLink to="/contact" className={footerLinkClasses}>{t('navContact', 'Contact')}</NavLink></li>
              <li><NavLink to="/legal" className={footerLinkClasses}>{t('footer.legal', 'Legal')}</NavLink></li>
            </ul>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h3 className={sectionTitleClasses}>{t('footer.contactUs', 'Contact Us')}</h3>
            <address className="not-italic text-sm space-y-space-xs">
              <p><a href="mailto:info@example.com" className={footerLinkClasses}>info@example.com</a></p>
              <p><a href="tel:+1234567890" className={footerLinkClasses}>+1 (234) 567-890</a></p>
              <p>123 Cosmic Way, Galaxy City, ST 45678</p>
            </address>
          </div>

          {/* Column 3: Settings & Social */}
          <div>
            <h3 className={sectionTitleClasses}>{t('footer.settingsSocial', 'Settings & Social')}</h3>
            <div className="mb-space-md">
              <LanguageSelector />
            </div>
            <div className="flex space-x-space-md">
              <a href="#" aria-label="Twitter" className={`text-text-muted hover:text-primary dark:hover:text-primary-dark w-6 h-6`}><TwitterIcon /></a>
              <a href="#" aria-label="LinkedIn" className={`text-text-muted hover:text-primary dark:hover:text-primary-dark w-6 h-6`}><LinkedInIcon /></a>
              <a href="#" aria-label="GitHub" className={`text-text-muted hover:text-primary dark:hover:text-primary-dark w-6 h-6`}><GitHubIcon /></a>
              {/* Placeholder for Instagram */}
              <a href="#" aria-label="Instagram" className={footerLinkClasses}>Instagram</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-border dark:border-neutral-border-dark pt-space-md text-center text-xs">
          <p>
            &copy; {currentYear} {t('footer.companyName', 'Gonorte')}. {t('footer.allRightsReserved', 'All rights reserved.')}
          </p>
          {/* Optional: Links to Privacy Policy, Terms of Service */}
          {/* <p className="mt-space-xs">
            <NavLink to="/privacy" className={footerLinkClasses}>Privacy Policy</NavLink> | <NavLink to="/terms" className={footerLinkClasses}>Terms of Service</NavLink>
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
