import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getLocalizedRoute } from '../../../router/routes.config';
import { FaDumbbell } from 'react-icons/fa6';

const ContactSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'es';

  return (
    <section className="w-full py-10 sm:py-14 lg:py-16 bg-gradient-to-br from-neutral-50 via-bg-surface to-primary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-primary-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-12 text-white shadow-xl text-center">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 flex justify-center"><FaDumbbell /></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              {t('contactReadyTitle', '¿Tienes más preguntas o estás listo para tu transformación?')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
              {t('contactReadyText', 'Te ayudamos con tus dudas y te guiamos en el siguiente paso personalizado para tu caso.')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to={getLocalizedRoute('videoCall', currentLang)}
                className="inline-flex items-center justify-center gap-2 bg-secondary-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl hover:bg-secondary-700 transition-colors transform hover:scale-105 shadow-lg text-sm sm:text-base"
                aria-label={t('contactVideoCallCTA', 'Agendar videollamada inicial')}
              >
                <span aria-hidden="true">🎥</span>
                {t('contactVideoCallCTA', 'Agendar videollamada inicial')}
              </Link>

              <Link
                to={getLocalizedRoute('contact', currentLang)}
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl hover:bg-neutral-50 transition-colors transform hover:scale-105 shadow-lg text-sm sm:text-base"
                aria-label={t('contactCTA', 'Enviar Mensaje')}
              >
                <span aria-hidden="true">💬</span>
                {t('contactCTA', 'Enviar Mensaje')}
              </Link>
              
              <a
                href="tel:+34644001599"
                className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl hover:bg-primary-700 transition-colors border-2 border-white/20 text-sm sm:text-base"
                aria-label={`${t('contactCallCTA', 'Llamar Ahora')}: +34 644 00 15 99`}
              >
                <span aria-hidden="true">📲</span>
                +34 644 00 15 99
              </a>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20">
              <p className="text-xs sm:text-sm opacity-80">
                {t('contactAvailable', 'Disponible ahora')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
