/**
 * @file InPersonAnalysisSection.tsx
 * @description "Servicio presencial en Jaén — análisis postural 3D" section for the HomePage.
 * Highlights the in-person 3D postural analysis available after the initial video call.
 * NOTE: This block belongs to Home only, not to the navigation menu.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import BookCallButton from '../../ui/BookCallButton';

interface DetailItem {
  textKey: string;
  defaultText: string;
}

const details: DetailItem[] = [
  {
    textKey: 'presentialDetail1',
    defaultText: '📍 Calle Doctor Federico del Castillo nº1, CADE, Jaén',
  },
  {
    textKey: 'presentialDetail2',
    defaultText: '🕒 45–60 minutos',
  },
  {
    textKey: 'presentialDetail3',
    defaultText:
      '🧠 Valoración con tecnología 3D e Inteligencia Artificial (IA), que permite medir lo que a simple vista no se ve. Prevenimos lesiones, mejoramos la recuperación y optimizamos el bienestar corporal.',
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.48, ease: 'easeOut' as const } },
};

const InPersonAnalysisSection: React.FC = () => {
  const { t } = useTranslation();
  const mapsUrl = 'https://maps.app.goo.gl/ZXPstJWdyFbfrDqBA';

  return (
    <section className="w-full bg-white dark:bg-neutral-900 py-10 sm:py-14 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-space-md">
        <div className="max-w-4xl mx-auto mb-5 sm:mb-6 text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary-500 mb-3">
            {t('presentialLabel', 'Servicio presencial · Jaén')}
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.2] pb-1 bg-gradient-to-r from-neutral-800 to-primary-700 dark:from-neutral-200 dark:to-primary-400 bg-clip-text text-transparent">
            {t('presentialTitle', 'Analizamos tu postura completa')}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-8 rounded-2xl overflow-hidden border border-border-base shadow-md bg-bg-surface"
        >
          <video
            className="w-full h-[260px] sm:h-[320px] md:h-[380px] object-cover"
            autoPlay
            loop
            muted
            playsInline
            controls
            preload="metadata"
          >
            <source src={`${import.meta.env.BASE_URL}images/analisis-postural/videos/video_analysis.mp4`} type="video/mp4" />
            Tu navegador no puede reproducir este video.
          </video>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* Left: text content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-sm sm:text-base text-fg-muted leading-relaxed mb-8">
              {t(
                'presentialIntro',
                'Realizamos una valoración de tu sistema músculo-esquelético para conocer tu punto de partida, detectar zonas de compensaciones y sobrecargas. Obtendrás un informe detallado y recomendaciones adaptadas.',
              )}
            </p>

            {/* Closing note */}
            <blockquote className="border-l-4 border-primary-400 pl-4 mb-8">
              <p className="text-sm sm:text-base text-fg-muted italic leading-relaxed">
                {t(
                  'presentialNote',
                  'Enviame un mensaje haciendo click en el siguiente botón y te contactaremos con la mayor brevedad posible',
                )}
              </p>
            </blockquote>

            <BookCallButton
              label={t('presentialCTA', 'Quiero mi análisis postural')}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 sm:px-10 py-3 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            />
          </motion.div>

          {/* Right: detail cards */}
          <div className="space-y-4">
            <motion.ul
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
            >
              {details.map((item, i) => (
                <motion.li
                  key={i}
                  className="group flex items-start gap-4 bg-primary-50/60 dark:bg-neutral-700 rounded-2xl p-5 sm:p-6 border border-border-base shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                  variants={itemVariants}
                >
                  {item.textKey === 'presentialDetail1' ? (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-fg-base leading-relaxed hover:text-primary-600 dark:hover:text-primary-300 underline underline-offset-2"
                    >
                      {t(item.textKey, item.defaultText)}
                    </a>
                  ) : (
                    <p className="text-sm sm:text-base text-fg-base leading-relaxed">
                      {t(item.textKey, item.defaultText)}
                    </p>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InPersonAnalysisSection;
