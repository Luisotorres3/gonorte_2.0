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
    id: 'gonorteTestimonial1',
    quoteKey: 'gonorteTestimonial1Quote',
    defaultQuote: "¡Increíble transformación! Gracias a Gonorte y su método personalizado, perdí 15kg en 6 meses y me siento con más energía que nunca. Su enfoque en la nutrición y el entrenamiento funcional cambió mi vida completamente.",
    authorKey: 'gonorteTestimonial1Author',
    defaultAuthor: 'Ana Pérez',
    roleKey: 'gonorteTestimonial1Details',
    defaultRole: 'Plan de Pérdida de Peso',
    rating: 5,
    icon: <FaUserTie />
  },
  {
    id: 'gonorteTestimonial2',
    quoteKey: 'gonorteTestimonial2Quote',
    defaultQuote: "Las rutinas online son súper prácticas y efectivas. He ganado mucha fuerza y resistencia entrenando desde casa. Gonorte siempre está disponible para ajustar los ejercicios según mi progreso.",
    authorKey: 'gonorteTestimonial2Author',
    defaultAuthor: 'Carlos López',
    roleKey: 'gonorteTestimonial2Details',
    defaultRole: 'Rutinas Online de Fuerza',
    rating: 5,
    icon: <FaUserGraduate />
  },
  {
    id: 'gonorteTestimonial3',
    quoteKey: 'gonorteTestimonial3Quote',
    defaultQuote: "El asesoramiento nutricional fue clave para mi transformación. Aprendí a comer de forma inteligente y complementó perfectamente mi entrenamiento. Ahora tengo hábitos saludables que mantendré toda la vida.",
    authorKey: 'gonorteTestimonial3Author',
    defaultAuthor: 'Laura Gómez',
    roleKey: 'gonorteTestimonial3Details',
    defaultRole: 'Asesoramiento Nutricional',
    rating: 5,
    icon: <FaUserDoctor />
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
    <section className="w-full py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            {t('testimonialsTitle', 'Lo Que Dicen Mis Clientes')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('testimonialsSubtitle', 'Descubre las transformaciones reales y testimonios de clientes que han alcanzado sus objetivos con mi método personalizado')}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
              <div className="bg-surface dark:bg-neutral-surface-dark rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-300 dark:border-teal-700 relative overflow-hidden h-full flex flex-col">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                
                {/* Quote Icon */}
                <div className="absolute top-6 left-6 text-4xl text-teal-200 dark:text-teal-700 opacity-50">
                  <FaQuoteLeft />
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-6 relative z-10 flex-grow">
                  {t(testimonial.quoteKey, testimonial.defaultQuote)}
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="text-3xl text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/30 p-2 rounded-full">
                    {testimonial.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {t(testimonial.authorKey, testimonial.defaultAuthor)}
                    </p>
                    {testimonial.roleKey && (
                      <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">
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
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to={getLocalizedRoute('testimonials', currentLang)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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