/**
 * @file ForWhomSection.tsx
 * @description "¿Para quién es?" section for the HomePage, placed right after the Hero.
 * Helps visitors self-identify with a set of relatable bullets and a booking CTA.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import BookCallButton from '../../ui/BookCallButton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const ForWhomSection: React.FC = () => {
  const { t } = useTranslation();

  const bullets: string[] = [
    t('forWhomBullet1', 'Sientes tensión o molestias que van y vienen'),
    t('forWhomBullet2', 'Notas que tu postura te pasa factura (estrés, cargas, sedentarismo, hábitos del día a día).'),
    t('forWhomBullet3', 'Necesitas una base segura para progresar.'),
    t('forWhomBullet4', 'Estás cansada/o de probar cosas sueltas y quieres un plan adaptado y guiado.'),
  ];

  return (
    <section className="w-full bg-white dark:bg-neutral-900 py-10 sm:py-14 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-space-md">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary-500 mb-3">
            {t('forWhomLabel', '¿Para quién es?')}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.25] pb-2 text-primary-700 dark:text-primary-300">
            {t('forWhomTitle', 'Esto es para ti si…')}
          </h2>
        </motion.div>

        {/* Two-column layout: bullets left, decorative accent right */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
          {/* Bullets */}
          <motion.ul
            className="md:col-span-3 space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {bullets.map((bullet, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-4 bg-primary-50 dark:bg-neutral-800 rounded-xl p-4 sm:p-5 border border-border-base shadow-sm hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
              >
                <FaCheckCircle className="flex-shrink-0 mt-0.5 w-5 h-5 text-primary-500" />
                <span className="text-sm sm:text-base text-fg-base leading-relaxed">{bullet}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Decorative accent panel */}
          <motion.div
            className="md:col-span-2 flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary-600 to-secondary-600 p-7 sm:p-9 text-white text-center shadow-xl">
              {/* Decorative blurred circle */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/10 blur-2xl pointer-events-none" />

              <p className="relative z-10 text-base sm:text-lg font-medium leading-relaxed mb-6 opacity-95">
                {t('forWhomAccent', 'Si te identificas con alguno de estos puntos, estás en el lugar correcto.')}
              </p>

                <BookCallButton
                  label={t('forWhomCTA', 'Agendar videollamada inicial')}
                  className="relative z-10 inline-flex items-center justify-center w-full bg-white text-primary-700 px-6 sm:px-8 py-3 rounded-full font-bold text-sm sm:text-base hover:bg-primary-50 hover:shadow-lg active:scale-95 transition-all duration-300 shadow-md"
                />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ForWhomSection;
