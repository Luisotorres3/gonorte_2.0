/**
 * @file FAQSection.tsx
 * @description Defines the FAQ section for the HomePage.
 * It displays frequently asked questions in an expandable accordion format.
 * Designed for fitness trainer theme with teal color palette and dark/light mode support.
 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa6';

interface FAQItem {
  id: number;
  questionKey: string;
  defaultQuestion: string;
  answerKey: string;
  defaultAnswer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    questionKey: 'faq1Question',
    defaultQuestion: '¿Cómo funciona el entrenamiento online?',
    answerKey: 'faq1Answer',
    defaultAnswer: 'Simplemente necesitas acceso a internet a través de una tablet/móvil. Este entrenamiento incluye rutinas personalizadas, videos explicativos, seguimiento semanal y soporte 24/7. Puedes entrenar desde casa o donde quieras, manteniendo la misma calidad y personalización que el entrenamiento presencial.'
  },
  {
    id: 2,
    questionKey: 'faq2Question',
    defaultQuestion: '¿Cuál es el precio del entrenamiento online y/o del análisis postural?',
    answerKey: 'faq2Answer',
    defaultAnswer: 'Varía en función de las necesidades de cada persona y de su contexto. Para poder calcular tu presupuesto, agenda una videollamada inicial de manera gratuita y lo vemos.'
  },
  {
    id: 3,
    questionKey: 'faq3Question',
    defaultQuestion: '¿Qué equipamiento necesito para entrenar?',
    answerKey: 'faq3Answer',
    defaultAnswer: 'Para empezar, solo necesitas tu cuerpo y ganas de entrenar. Muchos ejercicios se pueden hacer sin equipamiento. Sin embargo, más común para usar al principio son las bandas de resistencia.'
  },
  {
    id: 4,
    questionKey: 'faq4Question',
    defaultQuestion: '¿Qué es la Biomecánica?',
    answerKey: 'faq4Answer',
    defaultAnswer: 'Es una ciencia que estudia cómo el cuerpo humano se mueve. Es como si nuestras articulaciones fueran palancas, y se estudiase su funcionamiento con fórmulas y matemáticas. Gracias a la Biomecánica podemos entender cómo nos movemos y que nos puede estar causando molestias.'
  },
  {
    id: 5,
    questionKey: 'faq5Question',
    defaultQuestion: '¿Trabajan con principiantes?',
    answerKey: 'faq5Answer',
    defaultAnswer: '¡Absolutamente! Nos especializamos en trabajar con personas de todos los niveles, desde principiantes hasta avanzados. Cada programa se adapta a tu nivel actual, progresando gradualmente para evitar lesiones y maximizar resultados'
  }
];

/**
 * FAQSection component for the landing page.
 * Displays frequently asked questions in an expandable accordion format.
 * @returns {JSX.Element} The rendered FAQSection component.
 */
const FAQSection: React.FC = () => {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="w-full bg-gradient-to-b from-bg-muted to-primary-50 dark:from-bg-base dark:to-neutral-900 py-10 sm:py-14 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-space-md">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 break-words whitespace-normal text-fg-base">
            {t('faqTitle', 'Preguntas Frecuentes')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-fg-muted max-w-3xl mx-auto">
            {t('faqSubtitle', 'Resolvemos las dudas más comunes sobre nuestros servicios de entrenamiento personal')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="bg-bg-surface rounded-xl sm:rounded-2xl shadow-lg border border-border-base overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full px-4 py-4 sm:px-6 sm:py-6 text-left flex items-center justify-between hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
                  onClick={() => toggleItem(faq.id)}
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-fg-base pr-3 sm:pr-4">
                    {t(faq.questionKey, faq.defaultQuestion)}
                  </h3>
                  <motion.div
                    className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400"
                    animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="w-full h-full" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                        <div className="pt-3 sm:pt-4 border-t border-border-muted">
                          <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                            {t(faq.answerKey, faq.defaultAnswer)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection; 