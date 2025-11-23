import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ContactInfo {
  icon: string;
  titleKey: string;
  defaultTitle: string;
  valueKey: string;
  defaultValue: string;
  link?: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: '📧',
    titleKey: 'contactEmailTitle',
    defaultTitle: 'Email',
    valueKey: 'contactEmail',
    defaultValue: 'gonorte.biomechanics@gmail.com',
    link: 'mailto:gonorte.biomechanics@gmail.com'
  },
  {
    icon: '📱',
    titleKey: 'contactPhoneTitle',
    defaultTitle: 'Teléfono',
    valueKey: 'contactPhone',
    defaultValue: '+34 644 00 15 99',
    link: 'tel:+34644001599'
  },
  {
    icon: '📍',
    titleKey: 'contactLocationTitle',
    defaultTitle: 'Ubicación',
    valueKey: 'contactLocation',
    defaultValue: 'Jaén, España'
  }
];

const socialLinks = [
  { icon: '📘', name: 'Facebook', url: '#', color: 'hover:bg-blue-500' },
  { icon: '📷', name: 'Instagram', url: '#', color: 'hover:bg-pink-500' },
  { icon: '🐦', name: 'Twitter', url: '#', color: 'hover:bg-blue-400' },
  { icon: '💼', name: 'LinkedIn', url: '#', color: 'hover:bg-blue-600' }
];

const ContactSection: React.FC = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut" as const
      }
    },
  };

  return (
    <section className="w-full py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            {t('contactTitle', 'Ponte en Contacto')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('contactSubtitle', '¿Listo para comenzar tu transformación? Contáctame y juntos crearemos el plan perfecto para alcanzar tus objetivos')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                {t('contactInfoTitle', 'Información de Contacto')}
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="text-2xl">{info.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {t(info.titleKey, info.defaultTitle)}
                      </h4>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                        >
                          {t(info.valueKey, info.defaultValue)}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300">
                          {t(info.valueKey, info.defaultValue)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {t('contactSocialTitle', 'Sígueme en Redes Sociales')}
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl transition-all duration-300 ${social.color} hover:scale-110`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Response Indicator */}
              <div className="mt-8 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-semibold text-teal-800 dark:text-teal-200">
                      {t('contactQuickResponseTitle', 'Respuesta Rápida')}
                    </p>
                    <p className="text-sm text-teal-700 dark:text-teal-300">
                      {t('contactQuickResponseText', 'Suelo responder en menos de 24 horas. ¡No dudes en contactarme!')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="text-center">
                <div className="text-6xl mb-6">💪</div>
                <h3 className="text-3xl font-bold mb-4">
                  {t('contactReadyTitle', '¿Listo para tu Transformación?')}
                </h3>
                <p className="text-xl mb-8 opacity-90">
                  {t('contactReadyText', 'Comienza tu viaje hacia una vida más saludable y en forma. Te ayudo a alcanzar tus objetivos fitness de manera personalizada y efectiva.')}
                </p>
                
                <div className="space-y-4">
                  <Link
                    to="/contact"
                    className="inline-block w-full bg-white text-teal-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors transform hover:scale-105"
                  >
                    {t('contactCTA', 'Enviar Mensaje')}
                  </Link>
                  
                  <a
                    href="tel:+34600123456"
                    className="inline-block w-full bg-teal-600 text-white font-semibold py-4 px-8 rounded-xl hover:bg-teal-700 transition-colors border-2 border-white/20"
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
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
