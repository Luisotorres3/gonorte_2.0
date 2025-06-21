/**
 * @file TestimonialsSection.tsx
 * @description Defines the Testimonials section for the HomePage.
 * It displays user testimonials in a card-like format.
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
}

const testimonials: Testimonial[] = [
  {
    id: 'gonorteTestimonial1',
    quoteKey: 'gonorteTestimonial1Quote',
    defaultQuote: "¡Increíble transformación! Gracias a Gonorte y al entrenador, alcancé mis metas de pérdida de peso y me siento con más energía que nunca.",
    authorKey: 'gonorteTestimonial1Author',
    defaultAuthor: 'Ana Pérez',
    roleKey: 'gonorteTestimonial1Details',
    defaultRole: 'Plan de Pérdida de Peso',
  },
  {
    id: 'gonorteTestimonial2',
    quoteKey: 'gonorteTestimonial2Quote',
    defaultQuote: "Las rutinas online son súper prácticas y efectivas. He ganado mucha fuerza y resistencia entrenando desde casa.",
    authorKey: 'gonorteTestimonial2Author',
    defaultAuthor: 'Carlos López',
    roleKey: 'gonorteTestimonial2Details',
    defaultRole: 'Rutinas Online de Fuerza',
  },
  {
    id: 'gonorteTestimonial3',
    quoteKey: 'gonorteTestimonial3Quote',
    defaultQuote: "El asesoramiento nutricional fue clave. Aprendí a comer de forma inteligente y complementó perfectamente mi entrenamiento.",
    authorKey: 'gonorteTestimonial3Author',
    defaultAuthor: 'Laura Gómez',
    roleKey: 'gonorteTestimonial3Details',
    defaultRole: 'Asesoramiento Nutricional',
  },
];

/**
 * TestimonialsSection component for the landing page.
 * Displays a set of user testimonials.
 * @returns {JSX.Element} The rendered TestimonialsSection component.
 */
const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="w-full bg-neutral-background dark:bg-neutral-surface py-16 md:py-24"> {/* Slightly different bg for variation */}
      <div className="container mx-auto px-space-md text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-space-lg text-default"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {t('testimonialsTitle', 'Testimonios de Clientes')}
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-3 gap-space-lg"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-surface dark:bg-neutral-background p-space-lg rounded-radius-lg shadow-lg flex flex-col"
              variants={itemVariants}
            >
              <p className="text-text-muted italic mb-space-md flex-grow">
                "{t(testimonial.quoteKey, testimonial.defaultQuote)}"
              </p>
              <footer className="mt-auto">
                <p className="font-semibold text-primary dark:text-primary-dark">
                  {t(testimonial.authorKey, testimonial.defaultAuthor)}
                </p>
                {testimonial.roleKey && (
                  <p className="text-sm text-text-muted">
                    {t(testimonial.roleKey, testimonial.defaultRole || '')}
                  </p>
                )}
              </footer>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
