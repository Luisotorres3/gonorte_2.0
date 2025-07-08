/**
 * @file TestimonialsPage.tsx
 * @description This file defines the testimonials page component.
 * It displays customer testimonials and reviews in an attractive layout.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

/**
 * Displays the testimonials page with customer reviews and feedback.
 * @returns {JSX.Element} The rendered TestimonialsPage component.
 */
const TestimonialsPage: React.FC = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      name: 'María García',
      position: 'CEO, TechStart',
      content: 'Excelente trabajo en nuestro proyecto. El equipo demostró profesionalismo y entregó resultados excepcionales.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      position: 'Director de Marketing',
      content: 'La calidad del servicio superó nuestras expectativas. Definitivamente volveremos a trabajar juntos.',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      position: 'Fundadora, InnovateLab',
      content: 'Proceso transparente y comunicación constante. El resultado final fue exactamente lo que necesitábamos.',
      rating: 5,
      avatar: '👩‍🔬'
    },
    {
      id: 4,
      name: 'Luis Fernández',
      position: 'CTO, DigitalCorp',
      content: 'Técnicamente sólido y entregado a tiempo. Un partner confiable para proyectos tecnológicos.',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      id: 5,
      name: 'Sofia López',
      position: 'Diseñadora Senior',
      content: 'Creatividad y atención al detalle excepcionales. El diseño final fue perfecto para nuestra marca.',
      rating: 5,
      avatar: '👩‍🎨'
    },
    {
      id: 6,
      name: 'Diego Morales',
      position: 'Product Manager',
      content: 'Colaboración fluida y resultados medibles. Transformaron nuestra visión en realidad.',
      rating: 5,
      avatar: '👨‍💼'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-8 min-h-full"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {t('testimonialsTitle', 'Lo que dicen nuestros clientes')}
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            {t('testimonialsSubtitle', 'Descubre por qué nuestros clientes confían en nosotros para sus proyectos más importantes')}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-surface rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <span key={index} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>

              {/* Content */}
              <p className="text-text-muted mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="text-3xl mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-text-muted">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-DEFAULT to-accent-DEFAULT dark:from-primary-dark dark:to-accent-dark rounded-lg p-8 text-text-default-dark dark:text-text-default-light transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-4">
              {t('testimonialsCTA', '¿Listo para ser nuestro próximo caso de éxito?')}
            </h2>
            <p className="mb-6 text-lg opacity-90"> {/* Consider adjusting opacity if needed over new gradient */}
              {t('testimonialsCTASubtitle', 'Únete a nuestros clientes satisfechos y transforma tu visión en realidad')}
            </p>
            <button className="bg-neutral-surface-light dark:bg-neutral-surface-dark text-primary-dark dark:text-primary-light px-8 py-3 rounded-lg font-semibold hover:bg-neutral-border-light dark:hover:bg-neutral-border-dark transition-colors">
              {t('testimonialsCTAButton', 'Comienza tu proyecto')}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TestimonialsPage; 