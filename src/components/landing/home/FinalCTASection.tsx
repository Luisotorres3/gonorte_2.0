/**
 * @file FinalCTASection.tsx
 * @description Full-width closing CTA — "Empieza sin improvisar".
 * Placed just before ContactSection as the last conversion push.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaCalendarCheck } from 'react-icons/fa6';
import BookCallButton from '../../ui/BookCallButton';

const FinalCTASection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-primary-50 dark:bg-neutral-800 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-space-md">
        <motion.div
          className="relative max-w-3xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 px-8 sm:px-14 py-12 sm:py-16 text-white text-center shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background decorative blobs */}
          <div className="absolute -top-16 -left-16 w-52 h-52 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          {/* Icon */}
          <motion.div
            className="flex justify-center mb-5"
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <FaCalendarCheck className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {t('finalCTATitle', 'Empieza sin improvisar')}
          </h2>

          <p className="relative z-10 text-base sm:text-lg opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
            {t('finalCTAText', 'Agenda tu videollamada inicial y vemos el mejor camino para tu caso.')}
          </p>

          <BookCallButton
            label={t('finalCTAButton', 'Agendar videollamada inicial')}
            icon={<FaCalendarCheck className="w-4 h-4" />}
            className="relative z-10 inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base shadow-lg hover:bg-neutral-50 transition-colors duration-300 hover:scale-105"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
