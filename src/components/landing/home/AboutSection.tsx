import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="w-full py-16 md:py-24 bg-bg-base text-fg-base">
      <div className="container mx-auto px-space-md text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-space-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {t('aboutTitle', 'Acerca de Gonorte')}
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto text-fg-muted"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('aboutTextPlaceholder', 'Aquí irá una breve introducción sobre Gonorte, su filosofía de entrenamiento y su pasión por ayudar a otros a alcanzar sus metas de fitness. Este contenido se personalizará para reflejar la identidad y experiencia del entrenador.')}
        </motion.p>
      </div>
    </section>
  );
};
export default AboutSection;
