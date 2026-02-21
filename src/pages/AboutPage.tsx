/**
 * @file AboutPage.tsx
 * @description Compact and visually appealing "About Me" page for personal coaching website.
 */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { getLocalizedRoute } from '../router/routes.config';
import AnimatedPage from '../components/motion/AnimatedPage';
import { 
  FaDumbbell, 
  FaBowlFood, 
  FaBrain,
  FaHeart,
  FaGraduationCap,
  FaQuoteLeft,
  FaArrowRight
} from 'react-icons/fa6';
import perfilImg from '../assets/perfil.webp';
import carmenPlaceholder from '../assets/carmen-placeholder.webp';
import aumentoImg from '../assets/aumento.webp';
import rehabilitacionImg from '../assets/rehabilitacion.webp';
import rendimientoImg from '../assets/rendimiento.webp';
import yogaImg from '../assets/yoga.webp';

const AboutPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'es';
  const [currentSlide, setCurrentSlide] = useState(0);

  const stats = [
    { value: '2+', label: t('aboutStatYears', 'Años de entrenamiento personalizado') },
    { value: '50+', label: t('aboutStatClients', 'Personas guiadas') },
  ];

  const specialties = [
    { icon: <FaDumbbell />, name: t('aboutSpecialty1', 'Fuerza & Acondicionamiento') },
    { icon: <FaBowlFood />, name: t('aboutSpecialty2', 'Prevención y Readaptación') },
    { icon: <FaBrain />, name: t('aboutSpecialty3', 'Mentalidad & Hábitos') },
    { icon: <FaHeart />, name: t('aboutSpecialty4', 'Salud Integral') },
  ];

  const certifications = [
    t('aboutCertificationList1', 'Graduada en Ciencias del Deporte (Universidad de Granada)'),
    t('aboutCertificationList2', 'Monitora de pilates suelo'),
    t('aboutCertificationList3', 'Máster en Tecnología Humana en el Deporte y la Medicina (Universidad Alemana de Colonia)'),
    t('aboutCertificationList4', 'Especialista en Biomecánica Deportiva'),
    t('aboutCertificationList5', 'Operadora remota en primera y segunda división de fútbol en partidos de Bundesliga, MLS, Eredivisie. Tracab'),
    t('aboutCertificationList6', 'Asistente de investigación en la simulación de cargas musculoesqueléticas en la cabeza y el cuello tras golpes de boxeo. Universidad Deportiva de Colonia, Alemania.'),
  ];

  const galleryImages = [
    { src: perfilImg, alt: t('aboutGalleryAlt1', 'Carmen entrenando y evaluando postura') },
    { src: carmenPlaceholder, alt: t('aboutGalleryAlt2', 'Gonorte Training - sesión de fuerza') },
    { src: aumentoImg, alt: t('aboutGalleryAlt3', 'Trabajo de fuerza progresiva') },
    { src: rehabilitacionImg, alt: t('aboutGalleryAlt4', 'Readaptación y control del movimiento') },
    { src: rendimientoImg, alt: t('aboutGalleryAlt5', 'Rendimiento y técnica') },
    { src: yogaImg, alt: t('aboutGalleryAlt6', 'Movilidad y estabilidad') },
  ];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, [galleryImages.length]);

  return (
    <AnimatedPage className="min-h-full bg-bg-base">
      {/* Hero Section with Photo */}
      <section className="relative overflow-hidden py-6 sm:py-8 md:py-12" style={{ backgroundColor: 'hsl(var(--color-bg-base))' }}>
        {/* Background gradient */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{ 
            background: 'linear-gradient(to bottom right, hsl(var(--color-primary-500) / 0.1), transparent, hsl(var(--color-primary-500) / 0.05))'
          }}
        />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            
            {/* Photo */}
            <motion.div
              className="relative order-1 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative max-w-md mx-auto lg:mx-0">
                {/* Decorative background */}
                <div 
                  className="absolute inset-0 rounded-3xl transform rotate-3 scale-105"
                  style={{ backgroundColor: 'hsl(var(--color-primary-500) / 0.2)' }}
                />
                
                {/* Photo container */}
                <div 
                  className="relative rounded-3xl p-3 shadow-2xl"
                  style={{ backgroundColor: 'hsl(var(--color-bg-surface))' }}
                >
                  <div className="relative w-full h-[380px] sm:h-[440px] md:h-[500px] rounded-2xl overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={galleryImages[currentSlide].src}
                        src={galleryImages[currentSlide].src}
                        alt={galleryImages[currentSlide].alt}
                        className="absolute inset-0 w-full h-full rounded-2xl object-cover"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                      />
                    </AnimatePresence>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/50">
                      {galleryImages.map((image, index) => (
                        <button
                          key={image.alt}
                          type="button"
                          aria-label={t('aboutGoToImage', 'Ir a imagen {{index}}', { index: index + 1 })}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentSlide === index ? 'bg-white scale-110' : 'bg-white/55 hover:bg-white/85'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Stats overlay */}
                  <div 
                    className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-4 p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl"
                    style={{ backgroundColor: 'hsl(var(--color-bg-surface))' }}
                  >
                    {stats.map((stat) => (
                      <div key={stat.label} className="text-center px-1.5 sm:px-3">
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-500">{stat.value}</p>
                        <p className="text-[10px] sm:text-xs" style={{ color: 'hsl(var(--color-fg-muted))' }}>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              className="space-y-4 order-2 lg:order-2 mt-6 lg:mt-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                  {t('aboutHeroTitle', 'Sobre Gonorte Training')}
                </h1>
              </div>

              <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'hsl(var(--color-fg-muted))' }}>
                {t('aboutHeroDescription', 'Soy Carmen, fundadora de Gonorte Training y especialista en biomecánica deportiva. Nuestro enfoque parte de una idea simple: el movimiento es medicina, pero solo cuando se adapta a tu cuerpo, a tu contexto y a tu punto de partida.')}
              </p>

              <div
                className="p-4 sm:p-5 rounded-xl border"
                style={{
                  backgroundColor: 'hsl(var(--color-bg-surface))',
                  borderColor: 'hsl(var(--color-border-base))',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <FaGraduationCap className="text-primary-500" />
                  <h2 className="text-base sm:text-lg font-bold text-primary-600 dark:text-primary-400">{t('aboutEducationTitle', 'Formación')}</h2>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base" style={{ color: 'hsl(var(--color-fg-muted))' }}>
                  {certifications.map((cert) => (
                    <li key={cert}>{cert}</li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to={getLocalizedRoute('videoCall', currentLang)}>
                  <button className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                    {t('aboutCtaPrimary', 'Agendar videollamada inicial')}
                    <FaArrowRight className="text-sm" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-4 sm:py-5 md:py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-left text-primary-600 dark:text-primary-400 mb-4 sm:mb-5">
                {t('aboutSpecialtiesTitle', 'Especialidades')}
              </h2>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {specialties.map((spec, index) => (
                  <motion.div
                    key={spec.name}
                    className="group text-center p-3 sm:p-4 rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      backgroundColor: 'hsl(var(--color-bg-surface))',
                      border: '1px solid hsl(var(--color-border-base))'
                    }}
                  >
                    <div className="text-xl sm:text-2xl text-primary-500 mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                      {spec.icon}
                    </div>
                    <p className="text-[11px] sm:text-xs md:text-sm font-medium" style={{ color: 'hsl(var(--color-fg-base))' }}>
                      {spec.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="text-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl relative overflow-hidden h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'linear-gradient(135deg, hsl(var(--color-primary-500) / 0.1), hsl(var(--color-primary-500) / 0.05))',
                border: '1px solid hsl(var(--color-primary-500) / 0.2)'
              }}
            >
              <FaQuoteLeft className="text-xl sm:text-2xl text-primary-500/30 mx-auto mb-2 sm:mb-3" />
              <blockquote className="text-sm sm:text-base md:text-lg italic font-medium mb-2 sm:mb-3" style={{ color: 'hsl(var(--color-fg-base))' }}>
                {t('aboutQuote', '"El movimiento es medicina"')}
              </blockquote>
              <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm sm:text-base">
                {t('aboutQuoteAuthor', '— Gonorte')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            className="text-center p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              background: 'linear-gradient(135deg, hsl(var(--color-primary-600)), hsl(var(--color-primary-500)))',
            }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
              {t('aboutFinalCTA', '¿Lista para empezar tu transformación?')}
            </h2>
            <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6 max-w-xl mx-auto">
              {t('aboutFinalCTADesc', 'Da el primer paso hacia tu mejor versión. Estoy aquí para ayudarte.')}
            </p>
            <Link to={getLocalizedRoute('videoCall', currentLang)}>
              <button className="bg-white text-primary-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:scale-105">
                {t('aboutFinalCTAButton', 'Agendar videollamada inicial')}
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default AboutPage;
