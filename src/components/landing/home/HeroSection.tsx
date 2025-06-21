/**
 * @file HeroSection.tsx
 * @description Defines the Hero section for the HomePage.
 * It features a prominent title, subtitle, and a primary call-to-action button.
 * Redesigned for fitness trainer theme with elegant gym aesthetics and teal color palette.
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
    <section className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 dark:from-slate-950 dark:via-teal-950 dark:to-slate-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full opacity-20 blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full opacity-20 blur-xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative container mx-auto px-space-md flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            {t('heroBadge', 'Entrenadora Personal Certificada')}
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white via-teal-200 to-cyan-200 bg-clip-text text-transparent">
              {t('heroTitle', 'Transforma Tu Cuerpo, Supera Tus Límites')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('heroSubtitle', 'Entrenamiento personalizado y online con Gonorte. Alcanza tus metas de fitness y bienestar.')}
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex justify-center items-center space-x-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400">500+</div>
              <div className="text-sm text-gray-400">{t('heroStatsClients', 'Clientes Satisfechos')}</div>
            </div>
            <div className="w-px h-12 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400">5+</div>
              <div className="text-sm text-gray-400">{t('heroStatsYears', 'Años de Experiencia')}</div>
            </div>
            <div className="w-px h-12 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400">98%</div>
              <div className="text-sm text-gray-400">{t('heroStatsSuccess', 'Tasa de Éxito')}</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-full shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => console.log('Primary CTA clicked')}
            >
              <span className="relative z-10">{t('heroCTA', 'Empieza Hoy')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-cyan-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>

            <motion.button
              className="group px-8 py-4 border-2 border-teal-400 text-teal-400 font-bold rounded-full hover:bg-teal-400 hover:text-white transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => console.log('Secondary CTA clicked')}
            >
              {t('heroSecondaryCTA', 'Ver Servicios')}
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
