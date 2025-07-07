/**
 * @file HeroSection.tsx
 * @description Defines the Hero section for the HomePage.
 * It features a prominent title, subtitle, and a primary call-to-action button.
 * Redesigned for fitness trainer theme with elegant gym aesthetics and teal color palette.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import CarmenPlaceholder from '../../../assets/carmen-placeholder.webp';

/**
 * HeroSection component for the landing page.
 * Displays a main headline, a supportive tagline, and a call-to-action button.
 * @returns {JSX.Element} The rendered HeroSection component.
 */
const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      className="relative w-full min-h-screen text-white overflow-hidden bg-cover bg-center flex flex-col justify-center items-center p-4 sm:p-8" // Added flex centering and padding for responsiveness
      style={{ backgroundImage: `url(${CarmenPlaceholder})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div> {/* Increased opacity for better text contrast */}

      {/* Floating Elements - Removed for cleaner design focused on Carmen */}

      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center text-center max-w-3xl"> {/* Centered content and limited max-width */}
        {/* Main Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight" // Further adjusted text sizes and margins for responsiveness
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Removed gradient text for better readability on image background */}
            {t('heroTitleCarmen', 'Lucha por tu cambio. Con biomecánica, con propósito, con confianza.')}
          </motion.h1>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center" // Removed spacing classes, will be handled by button margin
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.button
              className="group relative px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg shadow-xl hover:shadow-teal-400/30 transition-all duration-300 transform hover:scale-105 text-md sm:text-lg" // Adjusted padding and text size for responsiveness, reduced hover scale slightly
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => console.log('Primary CTA clicked')}
            >
              <span className="relative z-10">{t('heroCTACarmen', 'Empieza tu cambio')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>

          {/* Scroll Indicator - Removed for a cleaner look, can be added back if desired */}
          {/*
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
          */}
        </div>
      </section>
  );
};

export default HeroSection;
