import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ServicesSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="w-full py-16 md:py-24 bg-surface dark:bg-neutral-background text-default">
      <div className="container mx-auto px-space-md text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-space-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {t('servicesTitle', 'Mis Servicios')}
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-space-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('servicesTextPlaceholder', 'Detalles sobre los diferentes planes de entrenamiento, asesoramiento nutricional, clases online, etc., que Gonorte ofrece. Se destacarán los beneficios y cómo pueden ayudar a los clientes.')}
        </motion.p>
        {/* Placeholder for service cards/items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-space-md mt-space-lg">
          {/* Example Service Item (repeat as needed) */}
          <motion.div
            className="bg-background dark:bg-neutral-surface p-space-lg rounded-radius-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-space-sm text-primary dark:text-primary-dark">{t('service1Title', 'Entrenamiento Personalizado')}</h3>
            <p className="text-text-muted text-sm">{t('service1Desc', 'Planes adaptados a tus objetivos y nivel.')}</p>
          </motion.div>
          <motion.div
            className="bg-background dark:bg-neutral-surface p-space-lg rounded-radius-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-space-sm text-primary dark:text-primary-dark">{t('service2Title', 'Asesoría Nutricional')}</h3>
            <p className="text-text-muted text-sm">{t('service2Desc', 'Guía para una alimentación saludable y efectiva.')}</p>
          </motion.div>
          <motion.div
            className="bg-background dark:bg-neutral-surface p-space-lg rounded-radius-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-space-sm text-primary dark:text-primary-dark">{t('service3Title', 'Clases Online')}</h3>
            <p className="text-text-muted text-sm">{t('service3Desc', 'Entrena desde donde quieras, a tu ritmo.')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default ServicesSection;
