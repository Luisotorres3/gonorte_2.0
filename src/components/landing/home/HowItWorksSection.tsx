/**
 * @file HowItWorksSection.tsx
 * @description "Cómo funciona el proceso" section — 6-step method with a booking CTA.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  FaVideo,
  FaClipboardList,
  FaFileLines,
  FaRotate,
  FaCirclePlay,
  FaWhatsapp,
} from 'react-icons/fa6';
import BookCallButton from '../../ui/BookCallButton';

interface Step {
  icon: React.ElementType;
  number: number;
  titleKey: string;
  defaultTitle: string;
  descKey: string;
  defaultDesc: string;
}

const steps: Step[] = [
  {
    icon: FaVideo,
    number: 1,
    titleKey: 'howStep1Title',
    defaultTitle: 'Entrevista inicial (videollamada)',
    descKey: 'howStep1Desc',
    defaultDesc:
      'Conoceré tu situación, tus molestias y objetivos. Te explico cómo trabajo y vemos si encaja contigo.',
  },
  {
    icon: FaClipboardList,
    number: 2,
    titleKey: 'howStep2Title',
    defaultTitle: 'Evaluación en directo',
    descKey: 'howStep2Desc',
    defaultDesc:
      'Definimos tu punto de partida y qué ejercicios te convienen o deberías evitar en este momento.',
  },
  {
    icon: FaFileLines,
    number: 3,
    titleKey: 'howStep3Title',
    defaultTitle: 'Programa individualizado',
    descKey: 'howStep3Desc',
    defaultDesc:
      'Creo tu plan adaptado a tu horario, material, nivel, objetivos y necesidades.',
  },
  {
    icon: FaRotate,
    number: 4,
    titleKey: 'howStep4Title',
    defaultTitle: 'Seguimiento semanal',
    descKey: 'howStep4Desc',
    defaultDesc: 'Revisamos progresos, hacemos ajustes y resolvemos bloqueos.',
  },
  {
    icon: FaCirclePlay,
    number: 5,
    titleKey: 'howStep5Title',
    defaultTitle: 'Ejercicios perfectamente explicados',
    descKey: 'howStep5Desc',
    defaultDesc:
      'Todo está explicado al detalle para que ejecutes con técnica y seguridad.',
  },
  {
    icon: FaWhatsapp,
    number: 6,
    titleKey: 'howStep6Title',
    defaultTitle: 'Feedback y soporte por WhatsApp',
    descKey: 'howStep6Desc',
    defaultDesc:
      'Contacto para dudas, correcciones y acompañamiento real.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const HowItWorksSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-white dark:bg-neutral-900 py-10 sm:py-14 md:py-16">
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
            {t('howLabel', 'Cómo trabajamos')}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] pb-1 bg-gradient-to-r from-neutral-800 to-primary-700 dark:from-neutral-200 dark:to-primary-400 bg-clip-text text-transparent">
            {t('howTitle', 'Cómo funciona el proceso')}
          </h2>
        </motion.div>

        {/* Steps — two columns on md+ */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              className="group relative flex items-start gap-4 bg-primary-50/60 dark:bg-neutral-800 rounded-2xl p-5 sm:p-6 border border-border-base shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              variants={itemVariants}
            >
              {/* Large faded step number */}
              <span className="absolute top-3 right-4 text-6xl font-black text-primary-100 dark:text-primary-900/40 select-none leading-none pointer-events-none">
                {step.number}
              </span>

              {/* Icon bubble */}
              <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 z-10">
                <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>

              {/* Text */}
              <div className="z-10 pt-0.5 flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-fg-base mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {t(step.titleKey, step.defaultTitle)}
                </h3>
                <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                  {t(step.descKey, step.defaultDesc)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 sm:mt-14 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.35 }}
        >
          <BookCallButton
            label={t('howCTA', 'Agendar videollamada inicial')}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 sm:px-10 py-3 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
