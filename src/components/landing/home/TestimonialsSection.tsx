/**
 * @file TestimonialsSection.tsx
 * @description Defines the Testimonials section for the HomePage.
 * It displays user testimonials in a card-like format with modern design.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  quoteKey: string;
  defaultQuote: string;
  authorKey: string;
  defaultAuthor: string;
  roleKey?: string;
  defaultRole?: string;
  rating: number;
  avatar?: string;
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
    avatar: '👩‍💼'
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
    avatar: '👨‍💻'
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
    avatar: '👩‍⚕️'
  },
  {
    id: 'gonorteTestimonial4',
    quoteKey: 'gonorteTestimonial4Quote',
    defaultQuote: "Como principiante, estaba muy nerviosa por empezar. Gonorte me hizo sentir cómoda desde el primer día. Su paciencia y conocimiento me han ayudado a construir confianza y fuerza gradualmente.",
    authorKey: 'gonorteTestimonial4Author',
    defaultAuthor: 'María Rodríguez',
    roleKey: 'gonorteTestimonial4Details',
    defaultRole: 'Entrenamiento para Principiantes',
    rating: 5,
    avatar: '👩‍🎓'
  },
  {
    id: 'gonorteTestimonial5',
    quoteKey: 'gonorteTestimonial5Quote',
    defaultQuote: "Después de una lesión, necesitaba rehabilitación específica. Gonorte diseñó un programa perfecto que me ayudó a recuperarme y volver más fuerte que antes. Su experiencia es invaluable.",
    authorKey: 'gonorteTestimonial5Author',
    defaultAuthor: 'David Martínez',
    roleKey: 'gonorteTestimonial5Details',
    defaultRole: 'Rehabilitación y Recuperación',
    rating: 5,
    avatar: '👨‍🦽'
  },
  {
    id: 'gonorteTestimonial6',
    quoteKey: 'gonorteTestimonial6Quote',
    defaultQuote: "Los resultados han sido increíbles. En solo 3 meses, he mejorado mi rendimiento deportivo significativamente. Gonorte entiende perfectamente las necesidades de los atletas.",
    authorKey: 'gonorteTestimonial6Author',
    defaultAuthor: 'Sofía Torres',
    roleKey: 'gonorteTestimonial6Details',
    defaultRole: 'Entrenamiento Deportivo',
    rating: 5,
    avatar: '🏃‍♀️'
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
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
  const { t } = useTranslation();

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
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="group relative"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card */}
              <div className="bg-surface dark:bg-neutral-surface-dark rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-300 dark:border-teal-700 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                
                {/* Quote Icon */}
                <div className="absolute top-6 left-6 text-4xl text-teal-200 dark:text-teal-700 opacity-50">
                  "
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-6 relative z-10">
                  {t(testimonial.quoteKey, testimonial.defaultQuote)}
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">
                    {testimonial.avatar}
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
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {t('testimonialsCTA', '¿Listo para tu transformación? Únete a estos clientes satisfechos')}
          </p>
          <motion.button
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('testimonialsCTAButton', 'Comenzar Mi Transformación')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
