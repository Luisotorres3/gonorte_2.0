/**
 * @file ServicesSection.tsx
 * @description Overview of the Gonorte program for the HomePage.
 * Shows programme highlights (what it is / is not), how it works, and a 3D analysis upsell.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaXmark, FaCheck, FaArrowRight, FaMapPin, FaClock, FaBrain } from 'react-icons/fa6';
import { getLocalizedRoute } from '../../../router/routes.config';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

const notItems = [
  'Una plantilla de ejercicios y estiramientos para aliviar el dolor.',
  'Una solución rápida al dolor de tus articulaciones.',
  'Clases grupales.',
];
const isItems = [
  'Un programa de ejercicios adaptado a tu caso.',
  'Una solución efectiva y duradera a largo plazo para tu dolor.',
  'Ejercicios personalizados y mejora de hábitos.',
];
const steps = [
  { title: 'Entrevista inicial (videollamada)', desc: 'Conoceré tu situación, molestias y objetivos. Vemos si encaja contigo.' },
  { title: 'Evaluación en directo', desc: 'Definimos tu punto de partida y qué ejercicios te convienen o deberías evitar.' },
  { title: 'Programa individualizado', desc: 'Plan adaptado a tu horario, material y necesidades.' },
  { title: 'Seguimiento semanal', desc: 'Revisiones, ajustes y resolución de bloqueos.' },
  { title: 'Ejercicios perfectamente explicados', desc: 'Técnica y seguridad en cada movimiento.' },
  { title: 'Soporte por WhatsApp', desc: 'Dudas, correcciones y acompañamiento real.' },
];
const mapsUrl = 'https://maps.app.goo.gl/ZXPstJWdyFbfrDqBA';
const analysisItems = [
  {
    icon: <FaMapPin className="text-primary-400 mt-0.5 flex-shrink-0" />,
    text: (
      <>
        Servicio presencial en Jaén (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-white"
        >
          Calle Doctor Federico del Castillo nº1, CADE
        </a>
        ).
      </>
    ),
  },
  { icon: <FaClock className="text-primary-400 mt-0.5 flex-shrink-0" />, text: 'Duración aproximada: 45–60 minutos.' },
  { icon: <FaBrain className="text-primary-400 mt-0.5 flex-shrink-0" />, text: 'Estudio con tecnología 3D, análisis postural e informe de resultados con recomendaciones individualizadas.' },
];

const ServicesSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-white dark:bg-neutral-900 py-16 sm:py-20 md:py-28">
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
            {t('servicesSectionLabel', 'El programa')}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.25] pb-2 text-primary-700 dark:text-primary-300 mb-5">
            {t('servicesSectionTitle', 'El Programa Gonorte')}
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-fg-muted leading-relaxed">
            <span className="font-semibold text-fg-base">{t('servicesSectionSubStrong', 'No es una plantilla ni una solución rápida:')}</span>{' '}
            {t('servicesSectionSub', 'es un proceso individualizado para mejorar postura, reducir molestias y construir fuerza de forma sostenible.')}
          </p>
        </motion.div>

        {/* ES / NO ES + Pasos */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

          {/* Is / Is not */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* NOT */}
            <div className="bg-red-50 dark:bg-neutral-800 rounded-2xl p-6 border border-red-100 dark:border-red-900/30">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                  <FaXmark className="w-3.5 h-3.5 text-red-500" />
                </span>
                <span className="text-sm font-bold uppercase tracking-wider text-red-500">NO es</span>
              </div>
              <ul className="space-y-2.5">
                {notItems.map((item, i) => (
                  <motion.li key={i} className="flex items-start gap-3" variants={itemVariants}>
                    <FaXmark className="flex-shrink-0 mt-0.5 w-4 h-4 text-red-400" />
                    <span className="text-sm text-fg-muted leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* IS */}
            <div className="bg-primary-50 dark:bg-neutral-800 rounded-2xl p-6 border border-primary-100 dark:border-primary-900/30">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                  <FaCheck className="w-3.5 h-3.5 text-primary-500" />
                </span>
                <span className="text-sm font-bold uppercase tracking-wider text-primary-500">SÍ es</span>
              </div>
              <ul className="space-y-2.5">
                {isItems.map((item, i) => (
                  <motion.li key={i} className="flex items-start gap-3" variants={itemVariants}>
                    <FaCheck className="flex-shrink-0 mt-0.5 w-4 h-4 text-primary-500" />
                    <span className="text-sm text-fg-base leading-relaxed font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* How it works */}
          <motion.div
            className="bg-bg-surface dark:bg-neutral-800 rounded-2xl p-6 border border-border-base"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h3 className="text-base font-bold uppercase tracking-wider text-primary-500 mb-5">
              {t('servicesSectionHowTitle', 'Cómo funciona')}
            </h3>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-fg-base leading-snug">{step.title}</p>
                    <p className="text-xs text-fg-muted mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 pt-5 border-t border-border-base">
              <Link
                to={getLocalizedRoute('videoCall')}
                className="inline-flex items-center justify-center w-full gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              >
                {t('servicesSectionCTA', 'Agendar videollamada inicial')}
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 3D Analysis upsell */}
        <motion.div
          className="max-w-5xl mx-auto bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-2xl p-7 sm:p-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
              {t('analysisLabel', 'Opción adicional')}
            </p>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              {t('analysisTitle', '¿Quieres empezar con la máxima claridad?')}
            </h3>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-6">
              {t('analysisDesc', 'Además de El Plan, puedes realizar un análisis postural 3D presencial: una valoración detallada para conocer tu punto de partida y salir con un informe y recomendaciones adaptadas.')}
            </p>
            <ul className="space-y-3 mb-7">
              {analysisItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/70 text-xs italic mb-6">
              {t('analysisNote', 'Este servicio se valora y se agenda después de la videollamada inicial, para asegurarnos de que encaja contigo.')}
            </p>
            <Link
              to={getLocalizedRoute('videoCall')}
              className="inline-flex items-center gap-2 bg-white text-primary-700 hover:bg-primary-50 px-7 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              {t('servicesSectionCTA', 'Agendar videollamada inicial')}
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesSection;