import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AnimatedPage from '../components/motion/AnimatedPage';
import { getLocalizedRoute } from '../router/routes.config';
import { FaArrowRight } from 'react-icons/fa';

const AnalysisPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'es';
  const mapsUrl = 'https://maps.app.goo.gl/ZXPstJWdyFbfrDqBA';
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; alt: string } | null>(null);

  const analysisPhotos = [
    {
      src: `${import.meta.env.BASE_URL}images/analisis-postural/fotos/analysis_foto1.webp`,
      alt: t('analysisPhotoAlt1', 'Sesión de análisis postural en consulta'),
    },
    {
      src: `${import.meta.env.BASE_URL}images/analisis-postural/fotos/analysis_foto2.webp`,
      alt: t('analysisPhotoAlt2', 'Medición de postura con tecnología 3D'),
    },
    {
      src: `${import.meta.env.BASE_URL}images/analisis-postural/fotos/analysis_foto3.webp`,
      alt: t('analysisPhotoAlt3', 'Evaluación personalizada de compensaciones'),
    },
    {
      src: `${import.meta.env.BASE_URL}images/analisis-postural/fotos/analysis_foto4.webp`,
      alt: t('analysisPhotoAlt4', 'Registro postural para identificar desequilibrios'),
    },
    {
      src: `${import.meta.env.BASE_URL}images/analisis-postural/fotos/analysis_foto5.webp`,
      alt: t('analysisPhotoAlt5', 'Revisión final con recomendaciones individualizadas'),
    },
  ];

  const analysisHighlights = [
    {
      icon: '📍',
      title: t('analysisHighlightTitle1', 'Ubicación'),
      description: t('analysisHighlightDesc1', 'Calle Doctor Federico del Castillo nº1, CADE, Jaén'),
      link: mapsUrl,
    },
    {
      icon: '⏱️',
      title: t('analysisHighlightTitle2', 'Duración'),
      description: t('analysisHighlightDesc2', '45–60 minutos'),
    },
    {
      icon: '🧠',
      title: t('analysisHighlightTitle3', 'Tecnología'),
      description: t('analysisHighlightDesc3', 'Valoración 3D + IA para medir lo que a simple vista no se ve'),
    },
    {
      icon: '📋',
      title: t('analysisHighlightTitle4', 'Entrega'),
      description: t('analysisHighlightDesc4', 'Informe detallado y recomendaciones totalmente adaptadas'),
    },
  ];

  useEffect(() => {
    if (!selectedPhoto) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedPhoto]);

  return (
    <AnimatedPage className="min-h-full bg-bg-base">
      <section className="w-full py-10 sm:py-14 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-space-md">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary-500 mb-3">
                {t('analysisLabel', 'Servicio presencial · Jaén')}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                {t('analysisTitle', 'Análisis postural 3D')}
              </h1>
              <p className="text-base sm:text-lg text-fg-muted max-w-3xl mx-auto">
                {t('analysisIntro', 'Valoramos tu sistema músculo-esquelético para detectar compensaciones y sobrecargas, y darte un informe claro con recomendaciones adaptadas a tu caso.')}
              </p>
            </div>

            <div className="rounded-2xl border border-border-base bg-bg-surface p-5 sm:p-6 mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">
                {t('analysisWhatIsTitle', '¿Qué es el análisis postural de MOTI Physio?')}
              </h2>
              <p className="text-sm sm:text-base text-fg-base leading-relaxed">
                {t('analysisWhatIsText', 'Es una valoración presencial avanzada que combina observación clínica, medición 3D y lectura de patrones de movimiento para detectar desalineaciones, compensaciones y sobrecargas que pueden estar afectando tu rendimiento o generando dolor. Con esta información te entregamos un informe comprensible y una hoja de ruta práctica para corregir tu postura y optimizar tu entrenamiento de forma segura.')}
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border-base shadow-md bg-bg-surface mb-8">
              <video
                className="w-full h-[260px] sm:h-[340px] md:h-[420px] object-cover"
                playsInline
                controls
                preload="none"
                poster={`${import.meta.env.BASE_URL}images/analisis-postural/fotos/analysis_foto1.webp`}
              >
                <source src={`${import.meta.env.BASE_URL}images/analisis-postural/videos/video_analysis.mp4`} type="video/mp4" />
                {t('analysisVideoFallback', 'Tu navegador no puede reproducir este video.')}
              </video>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
              {analysisPhotos.map((photo) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                  className="rounded-2xl overflow-hidden border border-border-base bg-bg-surface shadow-sm text-left transition-transform duration-300 hover:scale-[1.01]"
                  aria-label={`${t('analysisOpenImage', 'Ampliar imagen')}: ${photo.alt}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-[220px] sm:h-[240px] md:h-[260px] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8">
              {analysisHighlights.map((item) => (
                <div key={item.title} className="p-4 sm:p-5 rounded-2xl border border-border-base bg-bg-surface shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-lg flex-shrink-0">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-fg-base mb-0.5">{item.title}</p>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base text-fg-muted leading-relaxed hover:text-primary-600 dark:hover:text-primary-400 underline underline-offset-2"
                        >
                          {item.description}
                        </a>
                      ) : (
                        <p className="text-sm sm:text-base text-fg-muted leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to={getLocalizedRoute('videoCall', currentLang)}
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-7 py-3.5 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
              >
                {t('analysisCTA', 'Agendar videollamada inicial')}
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-bg-base/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label={t('analysisModalAria', 'Vista ampliada de imagen de análisis postural')}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-border-base bg-bg-surface shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 z-10 bg-bg-base/80 hover:bg-bg-base text-fg-base rounded-full w-9 h-9 flex items-center justify-center border border-border-base"
              aria-label={t('analysisCloseImage', 'Cerrar imagen ampliada')}
            >
              ×
            </button>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="w-full max-h-[85vh] object-contain bg-bg-base"
            />
          </div>
        </div>
      )}
    </AnimatedPage>
  );
};

export default AnalysisPage;
