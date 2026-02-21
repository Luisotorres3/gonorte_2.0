/**
 * @file PlanPage.tsx
 * @description "El Plan" page for Gonorte Training.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/motion/AnimatedPage';
import { getLocalizedRoute } from '../router/routes.config';
import {
  FaVideo,
  FaClipboardCheck,
  FaFileLines,
  FaCalendarCheck,
  FaCirclePlay,
  FaWhatsapp,
  FaCircleCheck,
  FaCircleXmark,
  FaArrowRight,
  FaPersonRunning,
} from 'react-icons/fa6';

const PlanPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'es';

  const includes = [
    { icon: <FaVideo />, label: t('planIncludesItem1', 'Videollamada inicial') },
    { icon: <FaClipboardCheck />, label: t('planIncludesItem2', 'Evaluación en directo') },
    { icon: <FaFileLines />, label: t('planIncludesItem3', 'Plan individualizado') },
    { icon: <FaCalendarCheck />, label: t('planIncludesItem4', 'Revisión semanal') },
    { icon: <FaCirclePlay />, label: t('planIncludesItem5', 'Ejercicios explicados en vídeo (técnica clara)') },
    { icon: <FaWhatsapp />, label: t('planIncludesItem6', 'Soporte y acompañamiento por WhatsApp') },
  ];

  const forWhom = [
    t('forWhomBullet1', 'Sientes tensión o molestias que van y vienen'),
    t('forWhomBullet2', 'Notas que tu postura te pasa factura (estrés, cargas, sedentarismo, hábitos del día a día).'),
    t('forWhomBullet3', 'Necesitas una base segura para progresar.'),
    t('forWhomBullet4', 'Estás cansada/o de probar cosas sueltas y quieres un plan adaptado y guiado.'),
  ];

  const notThis = [
    t('planNotItem1', 'NO es una rutina genérica.'),
    t('planNotItem2', 'NO es "estirar y ya".'),
    t('planNotItem3', 'NO es entrenar por entrenar sin entender tu cuerpo.'),
    t('planNotItem4', 'NO es hacerlo sola/o sin correcciones.'),
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, delay: i * 0.08 },
    }),
  };

  return (
    <AnimatedPage className="min-h-full bg-bg-base">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-8 sm:py-12"
        style={{ backgroundColor: 'hsl(var(--color-bg-base))' }}
      >
        {/* Background gradient blob */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 70% 40%, hsl(var(--color-primary-500) / 0.15) 0%, transparent 65%)',
          }}
        />

        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-widest text-primary-500 font-semibold mb-3"
          >
            {t('planHeroBadge', 'El Plan')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-4"
          >
            {t('planHeroTitle', 'Postura, fuerza y hábitos para moverte con menos molestias')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-5"
            style={{ color: 'hsl(var(--color-fg-muted))' }}
          >
            {t('planHeroSubtitle', 'Un proceso guiado y adaptado a ti para mejorar postura, reducir tensión y construir fuerza útil. No se trata de hacer más, sino de hacerlo mejor y con sentido.')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.35 }}
          >
            <Link to={getLocalizedRoute('videoCall', currentLang)}>
              <button className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-7 py-3.5 rounded-full font-semibold text-base transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                {t('planCTA', 'Agendar videollamada inicial')}
                <FaArrowRight className="text-sm" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── QUÉ INCLUYE ─────────────────────────────────────────── */}
      <section className="py-6 sm:py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-primary-600 dark:text-primary-400 mb-5"
          >
            {t('planIncludesTitle', 'Qué incluye')}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {includes.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group flex items-start gap-3 p-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                style={{
                  backgroundColor: 'hsl(var(--color-bg-surface))',
                  border: '1px solid hsl(var(--color-border-base))',
                }}
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-primary-500/10 text-primary-500 text-xl group-hover:bg-primary-500/20 transition-colors duration-300">
                  {item.icon}
                </div>
                <p
                  className="text-sm sm:text-base font-medium leading-snug pt-1"
                  style={{ color: 'hsl(var(--color-fg-base))' }}
                >
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARA QUIÉN / QUÉ NO ES (2-column) ───────────────────── */}
      <section className="py-6 sm:py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-5">

            {/* Para quién es */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-4 sm:p-5 rounded-xl"
              style={{
                backgroundColor: 'hsl(var(--color-bg-surface))',
                border: '1px solid hsl(var(--color-border-base))',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-primary-500/10">
                  <FaPersonRunning className="text-xl text-primary-500" />
                </div>
                <h2
                  className="text-lg sm:text-xl font-bold text-primary-600 dark:text-primary-400"
                >
                  {t('planForWhomTitle', 'Para quién es')}
                </h2>
              </div>
              <ul className="space-y-3">
                {forWhom.map((item, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <FaCircleCheck className="flex-shrink-0 text-primary-500 text-lg mt-0.5" />
                    <span
                      className="text-sm sm:text-base"
                      style={{ color: 'hsl(var(--color-fg-muted))' }}
                    >
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Qué NO es */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-4 sm:p-5 rounded-xl"
              style={{
                backgroundColor: 'hsl(var(--color-bg-surface))',
                border: '1px solid hsl(var(--color-border-base))',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl"
                  style={{ backgroundColor: 'hsl(var(--color-fg-muted) / 0.1)' }}
                >
                  <FaCircleXmark className="text-xl" style={{ color: 'hsl(var(--color-fg-muted))' }} />
                </div>
                <h2
                  className="text-lg sm:text-xl font-bold"
                  style={{ color: 'hsl(var(--color-fg-base))' }}
                >
                  {t('planNotTitle', 'Qué NO es')}
                </h2>
              </div>
              <ul className="space-y-3">
                {notThis.map((item, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <FaCircleXmark
                      className="flex-shrink-0 text-lg mt-0.5"
                      style={{ color: 'hsl(var(--color-fg-muted))' }}
                    />
                    <span
                      className="text-sm sm:text-base"
                      style={{ color: 'hsl(var(--color-fg-muted))' }}
                    >
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center p-6 sm:p-10 rounded-2xl relative overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, hsl(var(--color-primary-600)), hsl(var(--color-primary-500)))',
            }}
          >
            {/* Decorative circle */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10 bg-white pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-10 bg-white pointer-events-none" />

            <p className="text-sm uppercase tracking-widest text-white/70 font-semibold mb-3 relative z-10">
              {t('planFinalBadge', '¿Lista para empezar?')}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
              {t('planFinalTitle', 'Da el primer paso hacia moverte mejor')}
            </h2>
            <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-5 relative z-10">
              {t('planFinalText', 'Comenzamos con una videollamada para entender tu situación y ver cómo puedo ayudarte.')}
            </p>
            <Link to={getLocalizedRoute('videoCall', currentLang)} className="relative z-10">
              <button className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3.5 rounded-full font-bold text-base hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:scale-105">
                {t('planCTA', 'Agendar videollamada inicial')}
                <FaArrowRight className="text-sm" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

    </AnimatedPage>
  );
};

export default PlanPage;

