/**
 * @file SecondaryCTASection.tsx
 * @description Defines the Secondary Call-to-Action section for the HomePage.
 * It provides another opportunity to engage the user.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

/**
 * SecondaryCTASection component for the landing page.
 * Offers a final call to action before the footer.
 * @returns {JSX.Element} The rendered SecondaryCTASection component.
 */
const SecondaryCTASection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-background text-default py-16 md:py-24">
      <div className="container mx-auto px-space-md text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-space-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {t('secondaryCTATitle', 'Ready to Take the Next Step?')}
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-text-muted mb-space-lg max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('secondaryCTADescription', "Join thousands of innovators leveraging our platform to build the future. Don't miss out.")}
        </motion.p>
        <motion.button
          className="bg-primary text-white font-bold py-space-sm px-space-lg rounded-radius-lg shadow-md hover:opacity-90 transition-opacity transform hover:scale-105"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('secondaryCTAButton', 'Learn More')}
        </motion.button>
      </div>
    </section>
  );
};

export default SecondaryCTASection;
