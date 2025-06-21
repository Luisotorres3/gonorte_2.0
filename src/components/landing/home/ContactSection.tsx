import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="w-full py-16 md:py-24 bg-background dark:bg-neutral-surface text-default">
      <div className="container mx-auto px-space-md text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-space-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {t('contactTitle', 'Ponte en Contacto')}
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-space-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('contactTextPlaceholder', '¿Listo para empezar tu transformación? Envíame un mensaje o encuéntrame en redes sociales.')}
        </motion.p>
        {/* Placeholder for contact form or social links */}
        <motion.button
            className="bg-primary text-white font-bold py-space-sm px-space-lg rounded-radius-lg shadow-lg hover:bg-primary-dark transition-colors transform hover:scale-105 mt-space-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log('Contact CTA clicked')} // Placeholder action
          >
            {t('contactCTA', 'Enviar Mensaje')}
          </motion.button>
      </div>
    </section>
  );
};
export default ContactSection;
