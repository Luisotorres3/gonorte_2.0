/**
 * @file WhatICanDoForYouSection.tsx
 * @description Defines the 'What I Can Do For You' section for the HomePage.
 * This section highlights key services offered, using cards with icons, titles, descriptions, and action buttons.
 * It uses framer-motion for animations and react-i18next for internationalization.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiUsers, FiActivity, FiClipboard, FiTrendingUp, FiChevronRight } from 'react-icons/fi'; // Example icons

const WhatICanDoForYouSection: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('whatICanDoForYou.services.personalizedTraining.title'),
      description: t('whatICanDoForYou.services.personalizedTraining.description'),
      icon: <FiUsers className="w-12 h-12 text-teal-500 mb-4" />,
      buttonText: t('whatICanDoForYou.services.contactButton'),
    },
    {
      title: t('whatICanDoForYou.services.habitImprovement.title'),
      description: t('whatICanDoForYou.services.habitImprovement.description'),
      icon: <FiClipboard className="w-12 h-12 text-teal-500 mb-4" />,
      buttonText: t('whatICanDoForYou.services.contactButton'),
    },
    {
      title: t('whatICanDoForYou.services.biomechanicsAnalysis.title'),
      description: t('whatICanDoForYou.services.biomechanicsAnalysis.description'),
      icon: <FiActivity className="w-12 h-12 text-teal-500 mb-4" />,
      buttonText: t('whatICanDoForYou.services.contactButton'),
    },
    {
      title: t('whatICanDoForYou.services.progressiveTracking.title'),
      description: t('whatICanDoForYou.services.progressiveTracking.description'),
      icon: <FiTrendingUp className="w-12 h-12 text-teal-500 mb-4" />,
      buttonText: t('whatICanDoForYou.services.contactButton'),
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-white mb-12 md:mb-16"
        >
          {t('whatICanDoForYou.title')}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {service.icon}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow">{service.description}</p>
              <button className="mt-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center w-full">
                {service.buttonText}
                <FiChevronRight className="ml-2 w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatICanDoForYouSection;
