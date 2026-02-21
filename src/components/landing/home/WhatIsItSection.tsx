/**
 * @file WhatIsItSection.tsx
 * @description "¿Qué es el Programa Gonorte?" section — contrast between what it IS and what it is NOT.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaXmark, FaCheck } from 'react-icons/fa6';

interface ListItem {
  textKey: string;
  defaultText: string;
}

const notItems: ListItem[] = [
  {
    textKey: 'whatIsNotItem1',
    defaultText: 'Una plantilla de ejercicios y estiramientos para aliviar el dolor.',
  },
  {
    textKey: 'whatIsNotItem2',
    defaultText: 'Una solución rápida al dolor de tus articulaciones.',
  },
  {
    textKey: 'whatIsNotItem3',
    defaultText: 'Clases grupales.',
  },
];

const isItems: ListItem[] = [
  {
    textKey: 'whatIsItem1',
    defaultText: 'Un programa de ejercicios adaptado a tu caso.',
  },
  {
    textKey: 'whatIsItem2',
    defaultText: 'Una solución efectiva y duradera a largo plazo para tu dolor.',
  },
  {
    textKey: 'whatIsItem3',
    defaultText: 'Un programa con ejercicios personalizados y mejora de hábitos.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

const WhatIsItSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-primary-50 dark:bg-neutral-800 py-10 sm:py-14 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-space-md">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary-500 mb-3">
            {t('whatIsLabel', '¿QUÉ ES?')}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.25] pb-2 text-primary-700 dark:text-primary-300 mb-5">
            {t('whatIsTitle', 'EL PLAN')}
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-fg-muted leading-relaxed">
            <span className="font-semibold text-fg-base">
              {t('whatIsSubtitleStrong', 'No es una plantilla de ejercicios ni una solución rápida:')}
            </span>{' '}
            {t('whatIsSubtitle', 'es un proceso individualizado para mejorar postura, reducir molestias y ganar fuerza')}
          </p>
        </motion.div>

        {/* Two-column comparison */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">

          {/* NOT column */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-7 h-7 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                <FaXmark className="w-3.5 h-3.5 text-red-500" />
              </span>
              <span className="text-sm font-bold uppercase tracking-wider text-red-500">
                {t('whatIsNotLabel', 'NO es')}
              </span>
            </div>

            <motion.ul
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {notItems.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 bg-white dark:bg-neutral-900 rounded-xl p-4 border border-red-100 dark:border-red-900/30"
                  variants={rowVariants}
                >
                  <FaXmark className="flex-shrink-0 mt-0.5 w-4 h-4 text-red-400" />
                  <span className="text-sm text-fg-muted leading-relaxed">
                    {t(item.textKey, item.defaultText)}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* IS column */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                <FaCheck className="w-3.5 h-3.5 text-primary-500" />
              </span>
              <span className="text-sm font-bold uppercase tracking-wider text-primary-500">
                {t('whatIsIsLabel', 'SÍ es')}
              </span>
            </div>

            <motion.ul
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {isItems.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 bg-white dark:bg-neutral-900 rounded-xl p-4 border border-primary-100 dark:border-primary-900/30"
                  variants={rowVariants}
                >
                  <FaCheck className="flex-shrink-0 mt-0.5 w-4 h-4 text-primary-500" />
                  <span className="text-sm text-fg-base leading-relaxed font-medium">
                    {t(item.textKey, item.defaultText)}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsItSection;
