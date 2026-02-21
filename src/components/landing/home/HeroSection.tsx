/**
 * @file HeroSection.tsx
 * @description Defines the Hero section for the HomePage.
 * It features a prominent title, subtitle, and a primary call-to-action button.
 * Redesigned for fitness trainer theme with elegant gym aesthetics and teal color palette.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { getLocalizedRoute } from '../../../router/routes.config';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import CarmenPlaceholder from '../../../assets/carmen-placeholder.webp';
// no MARKETING import needed here — booking now uses internal route

/**
 * HeroSection component for the landing page.
 * Displays a main headline, a supportive tagline, and a call-to-action button.
 * @returns {JSX.Element} The rendered HeroSection component.
 */
const HeroSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'es';

  return (
    <section
      className="relative w-full min-h-screen text-fg-base overflow-hidden bg-cover bg-center flex flex-col justify-center items-center p-4 sm:p-8"
      style={{ backgroundImage: `url(${CarmenPlaceholder})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-neutral-900 opacity-70"></div>

      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center text-center max-w-3xl">
        {/* Main Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('heroTitle', 'Empieza a construir fuerza desde hoy mismo')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/90 mb-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {t(
              'heroSubtitle',
              'Entrenamiento online para personas con molestias recurrentes, mala postura o con miedo a lesionarse. Un enfoque basado en biomecánica, fuerza y hábitos para que dejes de improvisar y empieces con seguridad',
            )}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link to={getLocalizedRoute('videoCall', currentLang)} aria-label={t('heroCTA', 'Agendar videollamada inicial')}>
              <motion.div
                className="group relative px-8 py-4 sm:px-10 sm:py-5 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-fg-on-primary font-semibold rounded-lg shadow-xl hover:shadow-primary-500/30 transition-all duration-300 transform hover:scale-105 text-md sm:text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{t('heroCTA', 'Agendar videollamada inicial')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </Link>
          </motion.div>
          <p className="mt-3 text-sm text-white/90">{t('heroMicrotext', 'Te escuchamos y valoramos tu caso')}</p>

          {/* Scroll Indicator - Can be re-added with theme colors if desired */}
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
