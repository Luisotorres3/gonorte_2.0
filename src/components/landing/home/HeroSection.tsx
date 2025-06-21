/**
 * @file HeroSection.tsx
 * @description Defines the Hero section for the HomePage.
 * It features a prominent title, subtitle, and a primary call-to-action button.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

/**
 * HeroSection component for the landing page.
 * Displays a main headline, a supportive tagline, and a call-to-action button.
 * @returns {JSX.Element} The rendered HeroSection component.
 */
const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    // TODO: Consider replacing gradient with/adding a Gonorte hero image
    <section className="w-full bg-gradient-to-br from-primary via-secondary to-accent dark:from-primary-dark dark:via-secondary-dark dark:to-accent-dark text-white py-20 md:py-32">
      <div className="container mx-auto text-center px-space-md">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-space-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('heroTitle', 'Welcome to Gonorte')}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-space-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t('heroSubtitle', 'Your journey towards a better version of yourself starts here.')}
        </motion.p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-space-sm sm:space-y-0 sm:space-x-space-md">
          <motion.button
            className="bg-primary text-white font-bold py-space-sm px-space-lg rounded-radius-lg shadow-lg hover:bg-primary-dark transition-colors transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log('Primary CTA clicked')} // Placeholder action
          >
            {t('heroCTA', 'Get Started Today')}
          </motion.button>
          <motion.button
            className="bg-white text-primary font-bold py-space-sm px-space-lg rounded-radius-lg shadow-lg hover:bg-opacity-90 transition-colors transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log('Secondary CTA clicked')} // Placeholder action
          >
            {t('homeSecondaryCTA', 'Book Your Session')}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
