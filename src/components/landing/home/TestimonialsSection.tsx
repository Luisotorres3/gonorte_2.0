/**
 * @file TestimonialsSection.tsx
 * @description Defines the Testimonials section for the HomePage.
 * It displays user testimonials in a card-like format with modern design.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar, FaQuoteLeft, FaUserTie, FaUserGraduate, FaUserDoctor, FaArrowRight } from 'react-icons/fa6';
import { getLocalizedRoute } from '../../../router/routes.config';

// Google Reviews SVG badge (inline — no external dependency needed)
const GoogleReviewsBadge: React.FC = () => (
  <a
    href="https://maps.app.goo.gl/ZXPstJWdyFbfrDqBA"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-white dark:bg-neutral-800 border border-border-base rounded-full px-4 py-1.5 shadow-sm hover:shadow-md transition-shadow duration-200 text-xs font-semibold text-fg-muted"
    aria-label="Ver reseñas en Google"
  >
    {/* Google 'G' coloured mark */}
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
    Reseñas verificadas en Google
    <span className="flex">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </span>
  </a>
);

interface Testimonial {
  id: string;
  quoteKey: string;
  defaultQuote: string;
  authorKey: string;
  defaultAuthor: string;
  roleKey?: string;
  defaultRole?: string;
  rating: number;
  icon: React.ReactNode;
}

const testimonials: Testimonial[] = [
  {
    id: 'olalla',
    quoteKey: 't1',
    defaultQuote: 'Carmen me ha acompañado desde el primer minuto en mi proceso de cambio. Siempre tiene palabras de ánimo y prepara cada revisión con muchísimo cariño. Además, cuenta con un repertorio infinito de vídeos para cada situación o duda que pueda surgir, ¡lo cual es increíble! Sin duda, sin su apoyo no estaría donde estoy hoy',
    authorKey: 'olallaAuthor',
    defaultAuthor: 'Olalla Iglesias',
    rating: 5,
    icon: <FaUserTie />
  },
  {
    id: 'isabel',
    quoteKey: 't2',
    defaultQuote: 'Entrenar con Carmen ha superado todas mis expectativas. Es una gran profesional y, sobre todo, una persona muy cercana que siempre se preocupa por cada detalle. Está pendiente en todo momento, aconseja, escucha y motiva cuando más lo necesitas. Gracias a su apoyo constante no me rindo y estoy más motivada con el deporte que nunca.',
    authorKey: 'isabelAuthor',
    defaultAuthor: 'Isabel Dominguez',
    rating: 5,
    icon: <FaUserGraduate />
  },
  {
    id: 'maria',
    quoteKey: 't3',
    defaultQuote: 'En solo un mes noté cambios físicos y un gran aumento de fuerza. Carmen no es solo una entrenadora, es una amiga que te apoya, te escucha y te anima en todo el proceso. Sin duda, es la mejor. Además, adapta las rutinas según tus necesidades y el tiempo que tengas. ¡Recomendadísima!',
    authorKey: 'mariaAuthor',
    defaultAuthor: 'Maria García',
    rating: 5,
    icon: <FaUserDoctor />
  },
  {
    id: 'jose',
    quoteKey: 't4',
    defaultQuote: 'Carmen se preocupa enormemente tanto a nivel profesional como personal. Con esfuerzo y trabajo y siguiendo sus instrucciones parece que voy consiguiendo lo que pensaba que no conseguiría: ir aliviando de mis lesiones',
    authorKey: 'joseAuthor',
    defaultAuthor: 'Jose Antonio Perales',
    rating: 5,
    icon: <FaUserTie />
  },
  {
    id: 'gema',
    quoteKey: 't5',
    defaultQuote: 'Entrenar con Carmen ha sido un antes y un después para mí. Está siempre pendiente, corrige cada ejercicio y te motiva desde el minuto uno, retándote de una forma que te hace sentir capaz y llena de energía. Y lo más sorprendente es que, aun siendo a distancia, nunca imaginé que un entrenamiento online pudiera ser tan efectivo. En menos de tres meses he conseguido resultados que no imaginaba, y sé que esto es solo el principio. Estoy feliz de haberla encontrado y no pienso dejarla. Es una entrenadora maravillosa',
    authorKey: 'gemaAuthor',
    defaultAuthor: 'Gema Rodríguez',
    rating: 5,
    icon: <FaUserGraduate />
  }
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      ))}
    </div>
  );
};

/**
 * TestimonialsSection component for the landing page.
 * Displays a set of user testimonials with modern design.
 * @returns {JSX.Element} The rendered TestimonialsSection component.
 */
const TestimonialsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'es';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut" as const
      }
    },
  };

  return (
    <section className="w-full py-12 sm:py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {t('testimonialsTitle', 'Lo Que Dicen Mis Clientes')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-fg-muted max-w-3xl mx-auto mb-5 sm:mb-6">
            {t('testimonialsSubtitle', 'Descubre las transformaciones reales y testimonios de clientes que han alcanzado sus objetivos con mi método personalizado')}
          </p>
          {/* Google Reviews verified badge */}
          <div className="flex justify-center">
            <GoogleReviewsBadge />
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="group relative"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card */}
              <div className="bg-bg-surface rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border-base relative overflow-hidden h-full flex flex-col">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                
                {/* Quote Icon */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-2xl sm:text-3xl md:text-4xl text-teal-200 dark:text-teal-700 opacity-50">
                  <FaQuoteLeft />
                </div>

                {/* Rating */}
                <div className="mb-3 sm:mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 dark:text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 relative z-10 flex-grow">
                  {t(testimonial.quoteKey, testimonial.defaultQuote)}
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="text-xl sm:text-2xl md:text-3xl text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 p-1.5 sm:p-2 rounded-full">
                    {testimonial.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {t(testimonial.authorKey, testimonial.defaultAuthor)}
                    </p>
                    {testimonial.roleKey && (
                      <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                        {t(testimonial.roleKey, testimonial.defaultRole || '')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-10 sm:mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to={getLocalizedRoute('testimonials', currentLang)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            {t('testimonialsViewAll', 'Ver Más Historias')}
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;