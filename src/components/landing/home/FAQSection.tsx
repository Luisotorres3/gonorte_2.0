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
    defaultQuestion: '¿Cómo funciona el entrenamiento personalizado?',
    answerKey: 'faq1Answer',
    defaultAnswer: 'El entrenamiento personalizado se adapta completamente a tus necesidades. Primero realizamos una evaluación inicial de tu condición física, objetivos y disponibilidad. Luego diseñamos un programa específico que incluye ejercicios, rutinas y seguimiento continuo para maximizar tus resultados.'
  },
  {
    id: 2,
    questionKey: 'faq2Question',
    defaultQuestion: '¿Ofrecen entrenamiento online?',
    answerKey: 'faq2Answer',
    defaultAnswer: '¡Sí! Ofrecemos entrenamiento online completo con rutinas personalizadas, videos explicativos, seguimiento semanal y soporte 24/7. Puedes entrenar desde casa o donde quieras, manteniendo la misma calidad y personalización que el entrenamiento presencial.'
  },
  {
    id: 3,
    questionKey: 'faq3Question',
    defaultQuestion: '¿Qué incluye el asesoramiento nutricional?',
    answerKey: 'faq3Answer',
    defaultAnswer: 'El asesoramiento nutricional incluye un plan de alimentación personalizado, educación sobre nutrición, seguimiento de progreso, ajustes según tus resultados y soporte continuo. No se trata de dietas restrictivas, sino de crear hábitos saludables y sostenibles.'
  },
  {
    id: 4,
    questionKey: 'faq4Question',
    defaultQuestion: '¿Cuánto tiempo necesito para ver resultados?',
    answerKey: 'faq4Answer',
    defaultAnswer: 'Los resultados varían según cada persona, pero típicamente puedes notar mejoras en energía y bienestar desde la primera semana. Cambios físicos más notables suelen aparecer entre 4-8 semanas con constancia en el entrenamiento y nutrición.'
  },
  {
    id: 5,
    questionKey: 'faq5Question',
    defaultQuestion: '¿Trabajan con principiantes?',
    answerKey: 'faq5Answer',
    defaultAnswer: '¡Absolutamente! Nos especializamos en trabajar con personas de todos los niveles, desde principiantes hasta avanzados. Cada programa se adapta a tu nivel actual, progresando gradualmente para evitar lesiones y maximizar resultados.'
  },
  {
    id: 6,
    questionKey: 'faq6Question',
    defaultQuestion: '¿Qué equipamiento necesito para entrenar?',
    answerKey: 'faq6Answer',
    defaultAnswer: 'Para empezar, solo necesitas tu cuerpo y ganas de entrenar. Muchos ejercicios se pueden hacer sin equipamiento. Si tienes acceso a pesas, bandas de resistencia o una pelota de ejercicio, podemos incorporarlos, pero no son necesarios para comenzar.'
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
  const [showAll, setShowAll] = useState(false);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const displayedFaqData = showAll ? faqData : faqData.slice(0, 3);

  return (
    <section className="w-full bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 py-20 md:py-32">
      <div className="container mx-auto px-space-md">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 break-words whitespace-normal text-slate-800 dark:text-slate-200">
            {t('faqTitle', 'Preguntas Frecuentes')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('faqSubtitle', 'Resolvemos las dudas más comunes sobre nuestros servicios de entrenamiento personal')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {displayedFaqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-300 dark:border-teal-700 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors duration-200"
                  onClick={() => toggleItem(faq.id)}
                >
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 pr-4">
                    {t(faq.questionKey, faq.defaultQuestion)}
                  </h3>
                  <motion.div
                    className="flex-shrink-0 w-6 h-6 text-teal-600 dark:text-teal-400"
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
                      <div className="px-6 pb-6">
                        <div className="pt-4 border-t border-gray-100 dark:border-slate-600">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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

          {faqData.length > 3 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-teal-600 dark:text-teal-400 font-semibold hover:underline focus:outline-none"
              >
                {showAll ? t('showLess', 'Ver menos preguntas') : t('showMore', 'Ver más preguntas')}
              </button>
            </div>
          )}

          {/* CTA Section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {t('faqCTA', '¿Tienes más preguntas?')}
              </h3>
              <p className="text-lg mb-6 opacity-90">
                {t('faqCTASubtitle', 'No dudes en contactarme para resolver cualquier duda sobre tu entrenamiento personal')}
              </p>
              <motion.button
                className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('faqCTAButton', 'Contactar Ahora')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 