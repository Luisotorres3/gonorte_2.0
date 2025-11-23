import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaDumbbell } from 'react-icons/fa6';

const ContactSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-8 md:p-12 text-white shadow-xl text-center">
            <div className="text-6xl mb-6 flex justify-center"><FaDumbbell /></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('contactReadyTitle', '¿Listo para tu Transformación?')}
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              {t('contactReadyText', 'Comienza tu viaje hacia una vida más saludable y en forma. Te ayudo a alcanzar tus objetivos fitness de manera personalizada y efectiva.')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-block bg-white text-teal-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors transform hover:scale-105 shadow-lg"
              >
                {t('contactCTA', 'Enviar Mensaje')}
              </Link>
              
              <a
                href="tel:+34600123456"
                className="inline-block bg-teal-600 text-white font-semibold py-4 px-8 rounded-xl hover:bg-teal-700 transition-colors border-2 border-white/20"
              >
                {t('contactCallCTA', 'Llamar Ahora')}
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-sm opacity-80">
                {t('contactAvailable', 'Disponible ahora')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
