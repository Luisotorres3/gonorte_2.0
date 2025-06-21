/**
 * @file FeaturesSection.tsx
 * @description Defines the Features section for the HomePage.
 * It showcases key features of the fitness training services in a responsive grid.
 * Updated for fitness trainer theme with elegant gym aesthetics and teal color palette.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FitnessIcon1 from './icons/FitnessIcon1';
import FitnessIcon2 from './icons/FitnessIcon2';
import FitnessIcon3 from './icons/FitnessIcon3';

interface FeatureItem {
  id: string;
  icon: React.ElementType;
  titleKey: string;
  defaultTitle: string;
  descriptionKey: string;
  defaultDescription: string;
}

const features: FeatureItem[] = [
  {
    id: 'feature1',
    icon: FitnessIcon1,
    titleKey: 'feature1Title',
    defaultTitle: 'Entrenamiento Personalizado',
    descriptionKey: 'feature1Desc',
    defaultDescription: 'Planes de entrenamiento individualizados diseñados específicamente para tus objetivos y nivel de fitness.',
  },
  {
    id: 'feature2',
    icon: FitnessIcon2,
    titleKey: 'feature2Title',
    defaultTitle: 'Asesoría Nutricional',
    descriptionKey: 'feature2Desc',
    defaultDescription: 'Guía nutricional personalizada para complementar tu entrenamiento y maximizar tus resultados.',
  },
  {
    id: 'feature3',
    icon: FitnessIcon3,
    titleKey: 'feature3Title',
    defaultTitle: 'Entrenamiento Online',
    descriptionKey: 'feature3Desc',
    defaultDescription: 'Accede a tus rutinas desde cualquier lugar con entrenamiento virtual flexible y efectivo.',
  },
];

/**
 * FeaturesSection component for the landing page.
 * Displays a grid of key fitness features, each with an icon, title, and description.
 * @returns {JSX.Element} The rendered FeaturesSection component.
 */
const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 py-20 md:py-32">
      <div className="container mx-auto px-space-md text-center">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-teal-800 dark:from-slate-200 dark:to-teal-300 bg-clip-text text-transparent">
            {t('featuresTitle', 'Por Qué Elegir Gonorte')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('featuresSubtitle', 'Descubre las ventajas de entrenar con una profesional certificada que se adapta a tus necesidades')}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="group relative bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-slate-600"
              variants={itemVariants}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <feature.icon />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors duration-300">
                  {t(feature.titleKey, feature.defaultTitle)}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t(feature.descriptionKey, feature.defaultDescription)}
                </p>

                {/* Feature number */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('featuresCTA', '¿Listo para Transformar Tu Vida?')}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {t('featuresCTASubtitle', 'Únete a cientos de personas que ya han alcanzado sus metas con Gonorte')}
            </p>
            <motion.button
              className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('featuresCTAButton', 'Comenzar Ahora')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
