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

const LinkedInIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.776 13.019H3.561V9h3.552v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props} aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props} aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.01C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

const TikTokIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props} aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.86-.95-6.69-2.8-1.95-1.98-2.85-4.81-2.6-7.56.24-2.6.9-5.1 2.36-7.11 1.4-1.9.38-3.91.38-3.91s3.11-1.87 4.07-1.91c.82-.03 1.64.16 2.42.47.45.18.88.42 1.29.72.01-1.43.01-2.85 0-4.27z" />
    </svg>
);

const YouTubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props} aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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

  const footerLinkClasses = "text-text-muted-light dark:text-text-muted-dark hover:text-primary-DEFAULT dark:hover:text-primary-light transition-colors text-sm";
  const sectionTitleClasses = "text-text-default-light dark:text-text-default-dark font-semibold mb-space-md text-lg border-b border-neutral-border-light dark:border-neutral-border-dark pb-space-xs";
  const iconClasses = "icon-default hover:icon-primary dark:hover:icon-primary w-6 h-6"; // Updated icon classes

  return (
    <footer className="bg-neutral-surface-light dark:bg-neutral-surface-dark text-text-muted-light dark:text-text-muted-dark pt-space-xl pb-space-md border-t border-neutral-border-light dark:border-neutral-border-dark shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-space-md">
        {/* Columns Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl mb-space-lg">
          {/* Column 1: Quick Navigation */}
          <div className="bg-neutral-surface-light/50 dark:bg-neutral-surface-dark/50 p-space-md rounded-lg border border-neutral-border-light/30 dark:border-neutral-border-dark/30">
            <h3 className={sectionTitleClasses}>{t('footer.quickLinks', 'Quick Links')}</h3>
            <div className="grid grid-cols-2 gap-x-space-md gap-y-space-xs">
              <div>
                <ul className="space-y-space-xs">
                  <li><NavLink to="/" className={footerLinkClasses}>{t('navHome', 'Home')}</NavLink></li>
                  <li><NavLink to="/about" className={footerLinkClasses}>{t('navAbout', 'About Me')}</NavLink></li>
                  <li><NavLink to="/services" className={footerLinkClasses}>{t('navServices', 'Services')}</NavLink></li>
                </ul>
              </div>
              <div>
                <ul className="space-y-space-xs">
                  <li><NavLink to="/testimonials" className={footerLinkClasses}>{t('navTestimonials', 'Testimonials')}</NavLink></li>
                  <li><NavLink to="/contact" className={footerLinkClasses}>{t('navContact', 'Contact')}</NavLink></li>
                  <li><NavLink to="/legal" className={footerLinkClasses}>{t('footer.legal', 'Legal')}</NavLink></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div className="bg-neutral-surface-light/50 dark:bg-neutral-surface-dark/50 p-space-md rounded-lg border border-neutral-border-light/30 dark:border-neutral-border-dark/30">
            <h3 className={sectionTitleClasses}>{t('footer.contactUs', 'Contact Us')}</h3>
            {/* Ensure text color for address details is also themed if needed */}
            <address className="not-italic text-sm space-y-space-xs text-text-muted-light dark:text-text-muted-dark">
              <p><a href="mailto:gonorte.biomechanics@gmail.com" className={footerLinkClasses}>gonorte.biomechanics@gmail.com</a></p>
              <p><a href="tel:+34644001599" className={footerLinkClasses}>+34 644 00 15 99</a></p>
              <p>Jaén, España</p>
            </address>
          </div>

          {/* Column 3: Settings & Social */}
          <div className="bg-neutral-surface-light/50 dark:bg-neutral-surface-dark/50 p-space-md rounded-lg border border-neutral-border-light/30 dark:border-neutral-border-dark/30">
            <h3 className={sectionTitleClasses}>{t('footer.settingsSocial', 'Settings & Social')}</h3>
            <div className="mb-space-md">
              <LanguageSelector />
            </div>
            <div className="flex flex-row items-center justify-start gap-5 mb-space-md mt-2">
              <a href="https://www.facebook.com/profile.php?id=61577890884590" aria-label={t('footer.visitFacebook', 'Visit our Facebook page')} className={iconClasses} target="_blank" rel="noopener noreferrer">
                <FacebookIcon className="w-8 h-8" />
              </a>
              <a href="https://www.instagram.com/gonorte.training/" aria-label={t('footer.visitInstagram', 'Visit our Instagram page')} className={`${footerLinkClasses} ${iconClasses}`} target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="w-8 h-8" />
              </a>
              <a href="https://www.linkedin.com/in/carmen-mar%C3%ADa-gonz%C3%A1lez-ortega-3747b5258/" aria-label={t('footer.visitLinkedIn', 'Visit our LinkedIn page')} className={iconClasses} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className="w-8 h-8" />
              </a>
              <a href="https://www.tiktok.com/@gonorte.training" aria-label={t('footer.visitTikTok', 'Visit our TikTok page')} className={iconClasses} target="_blank" rel="noopener noreferrer">
                <TikTokIcon className="w-8 h-8" />
              </a>
              <a href="#" aria-label={t('footer.visitYouTube', 'Visit our YouTube page')} className={iconClasses} target="_blank" rel="noopener noreferrer">
                <YouTubeIcon className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-border-light dark:border-neutral-border-dark pt-space-md text-center text-xs text-text-muted-light dark:text-text-muted-dark">
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
