/**
 * @file Footer.tsx
 * @description Defines the multi-column footer component for the application.
 * It includes quick navigation links, contact information, language selection,
 * social media links, newsletter subscription, and a copyright notice.
 * Used within the MainLayout.
 */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import LanguageSelector from '../ui/LanguageSelector';
import Logo from '../ui/Logo';

const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props} aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props} aria-hidden="true">
    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
  </svg>
);

const LinkedInIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TikTokIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props} aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const YouTubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props} aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);


/**
 * Displays the multi-column footer section of the application.
 * Includes navigation, contact info, language selector, social media links, newsletter, and copyright.
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 300px
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinkClasses = "text-text-muted-light dark:text-text-muted-dark hover:text-primary-DEFAULT dark:hover:text-primary-light transition-all duration-300 text-sm inline-block relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary-DEFAULT dark:after:bg-primary-light after:transition-all after:duration-300 hover:after:w-full";
  const sectionTitleClasses = "text-text-default-light dark:text-text-default-dark font-bold mb-space-md text-base uppercase tracking-wider";
  const iconClasses = "text-text-muted-light dark:text-text-muted-dark hover:text-primary-DEFAULT dark:hover:text-primary-light transition-all duration-300 transform hover:scale-110 hover:-translate-y-1";

  return (
    <>
      {/* Fixed Scroll to Top Button - Only shows when scrolled */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 z-50 bg-primary-DEFAULT dark:bg-primary-light text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary-light/50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
        }`}
        aria-label={t('footer.backToTop', 'Back to top')}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      <footer className="relative bg-gradient-to-b from-neutral-surface-light to-neutral-bg-light dark:from-neutral-surface-dark dark:to-neutral-bg-dark text-text-muted-light dark:text-text-muted-dark pt-16 pb-8 border-t-2 border-neutral-border-light dark:border-neutral-border-dark shadow-2xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl mb-12">
          {/* Column 1: About & Logo */}
          <div className="space-y-space-md">
            <div className="mb-space-md">
              <Logo className="h-12 w-auto" />
            </div>
            <p className="text-sm leading-relaxed text-text-muted-light dark:text-text-muted-dark">
              {t('footer.aboutText', 'Transform your body and mind with personalized training programs designed by certified professionals.')}
            </p>
            <div className="pt-space-sm">
              <LanguageSelector />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className={sectionTitleClasses}>{t('footer.quickLinks', 'Quick Links')}</h3>
            <ul className="space-y-space-sm">
              <li><NavLink to="/" className={footerLinkClasses}>{t('navHome', 'Home')}</NavLink></li>
              <li><NavLink to="/about" className={footerLinkClasses}>{t('navAbout', 'About Me')}</NavLink></li>
              <li><NavLink to="/services" className={footerLinkClasses}>{t('navServices', 'Services')}</NavLink></li>
              <li><NavLink to="/testimonials" className={footerLinkClasses}>{t('navTestimonials', 'Testimonials')}</NavLink></li>
              <li><NavLink to="/contact" className={footerLinkClasses}>{t('navContact', 'Contact')}</NavLink></li>
              <li><NavLink to="/legal" className={footerLinkClasses}>{t('footer.legal', 'Legal')}</NavLink></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className={sectionTitleClasses}>{t('footer.contactUs', 'Contact Us')}</h3>
            <address className="not-italic text-sm space-y-space-sm text-text-muted-light dark:text-text-muted-dark">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-DEFAULT" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:gonorte.biomechanics@gmail.com" className={footerLinkClasses}>
                  gonorte.biomechanics@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-DEFAULT" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+34644001599" className={footerLinkClasses}>
                  +34 644 00 15 99
                </a>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-DEFAULT" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Jaén, España</span>
              </div>
            </address>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className={sectionTitleClasses}>{t('footer.followUs', 'Follow Us')}</h3>
            <p className="text-sm mb-space-lg text-text-muted-light dark:text-text-muted-dark">
              {t('footer.followUsText', 'Stay connected on social media')}
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <a 
                href="https://www.instagram.com/gonorte.training/" 
                aria-label={t('footer.visitInstagram', 'Visit our Instagram page')} 
                className={iconClasses}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <InstagramIcon className="w-7 h-7" />
              </a>
              <a 
                href="https://www.tiktok.com/@gonorte.training" 
                aria-label={t('footer.visitTikTok', 'Visit our TikTok page')} 
                className={iconClasses}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <TikTokIcon className="w-7 h-7" />
              </a>
              <a 
                href="#" 
                aria-label={t('footer.visitYouTube', 'Visit our YouTube page')} 
                className={iconClasses}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <YouTubeIcon className="w-7 h-7" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61577890884590" 
                aria-label={t('footer.visitFacebook', 'Visit our Facebook page')} 
                className={iconClasses}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FacebookIcon className="w-7 h-7" />
              </a>
              <a 
                href="https://www.linkedin.com/in/carmen-mar%C3%ADa-gonz%C3%A1lez-ortega-3747b5258/" 
                aria-label={t('footer.visitLinkedIn', 'Visit our LinkedIn page')} 
                className={iconClasses}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <LinkedInIcon className="w-7 h-7" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-border-light dark:border-neutral-border-dark pt-6 mt-8 text-center">
          <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
            &copy; {currentYear} {t('footer.companyName', 'Gonorte')}. {t('footer.allRightsReserved', 'All rights reserved.')}
          </p>
        </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;