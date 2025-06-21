/**
 * @file FeaturesSection.tsx
 * @description Defines the Features section for the HomePage.
 * It showcases key features of the product/service in a responsive grid.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FeatureIcon1 from './icons/FeatureIcon1';
import FeatureIcon2 from './icons/FeatureIcon2';
import FeatureIcon3 from './icons/FeatureIcon3';

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
    icon: FeatureIcon1,
    titleKey: 'feature1Title',
    defaultTitle: 'Robust Performance',
    descriptionKey: 'feature1Desc',
    defaultDescription: 'Experience lightning-fast interactions and seamless processing with our optimized architecture.',
  },
  {
    id: 'feature2',
    icon: FeatureIcon2,
    titleKey: 'feature2Title',
    defaultTitle: 'Secure & Reliable',
    descriptionKey: 'feature2Desc',
    defaultDescription: 'Built with top-tier security measures to protect your data and ensure constant availability.',
  },
  {
    id: 'feature3',
    icon: FeatureIcon3,
    titleKey: 'feature3Title',
    defaultTitle: 'Scalable Solutions',
    descriptionKey: 'feature3Desc',
    defaultDescription: 'Our platform grows with you, offering flexible and scalable options to meet your evolving needs.',
  },
];

/**
 * FeaturesSection component for the landing page.
 * Displays a grid of key features, each with an icon, title, and description.
 * @returns {JSX.Element} The rendered FeaturesSection component.
 */
const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animation of children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="w-full bg-background text-default py-16 md:py-24">
      <div className="container mx-auto px-space-md text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-space-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {t('featuresTitle', 'Key Features')}
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-3 gap-space-lg"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // amount: 0.2 means 20% of element is visible
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="bg-surface p-space-lg rounded-radius-lg shadow-md dark:shadow-neutral-700/50 flex flex-col items-center"
              variants={itemVariants}
            >
              <feature.icon />
              <h3 className="text-xl font-semibold mb-space-sm text-primary dark:text-primary-dark">
                {t(feature.titleKey, feature.defaultTitle)}
              </h3>
              <p className="text-text-muted text-sm">
                {t(feature.descriptionKey, feature.defaultDescription)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
