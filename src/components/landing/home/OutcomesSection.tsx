/**
 * @file OutcomesSection.tsx
 * @description "Lo que vamos a construir juntos" section for the HomePage.
 * Placed after ForWhomSection, it communicates the concrete outcomes clients can expect.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaPersonWalking, FaDumbbell, FaShieldHeart, FaBullseye } from 'react-icons/fa6';

interface OutcomeItem {
  icon: React.ElementType;
  gradient: string;
  textKey: string;
  defaultText: string;
}

const outcomes: OutcomeItem[] = [
  {
    icon: FaPersonWalking,
    gradient: 'from-primary-500 to-primary-400',
    textKey: 'outcomesBullet1',
    defaultText: 'Mejor postura y control corporal en tu día a día.',
  },
  {
    icon: FaDumbbell,
    gradient: 'from-secondary-500 to-secondary-400',
    textKey: 'outcomesBullet2',
    defaultText: 'Fuerza útil para que tu cuerpo deje de compensar.',
  },
  {
    icon: FaShieldHeart,
    gradient: 'from-primary-600 to-secondary-500',
    textKey: 'outcomesBullet3',
    defaultText: 'Menos tensión y menos recaídas con un proceso guiado.',
  },
  {
    icon: FaBullseye,
    gradient: 'from-secondary-600 to-primary-500',
    textKey: 'outcomesBullet4',
    defaultText: 'Entrenar con propósito: claridad, progresión y seguridad.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const OutcomesSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-primary-50 dark:bg-neutral-800 py-10 sm:py-14 md:py-16">
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
            {t('outcomesLabel', 'Qué vas a conseguir')}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.25] pb-2 text-primary-700 dark:text-primary-300">
            {t('outcomesTitle', 'Lo que vamos a construir juntos')}
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {outcomes.map((item, i) => (
            <motion.div
              key={i}
              className="group flex items-start gap-4 bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-6 border border-border-base shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              variants={cardVariants}
            >
              {/* Icon bubble */}
              <div
                className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>

              {/* Text */}
              <p className="text-sm sm:text-base text-fg-base leading-relaxed pt-1 font-medium">
                {t(item.textKey, item.defaultText)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OutcomesSection;
