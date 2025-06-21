/**
 * @file ContactPage.tsx
 * @description This file defines the contact page component.
 * It includes a contact form and contact information for users to get in touch.
 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

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
    defaultValue: 'gonorte@fitness.com',
    link: 'mailto:gonorte@fitness.com'
  },
  {
    icon: '📱',
    titleKey: 'contactPhoneTitle',
    defaultTitle: 'Teléfono',
    valueKey: 'contactPhone',
    defaultValue: '+34 600 123 456',
    link: 'tel:+34600123456'
  },
  {
    icon: '📍',
    titleKey: 'contactLocationTitle',
    defaultTitle: 'Ubicación',
    valueKey: 'contactLocation',
    defaultValue: 'Madrid, España'
  },
  {
    icon: '⏰',
    titleKey: 'contactHoursTitle',
    defaultTitle: 'Horarios',
    valueKey: 'contactHours',
    defaultValue: 'Lun-Vie: 6:00-22:00'
  }
];

const socialLinks = [
  { icon: '📘', name: 'Facebook', url: '#', color: 'hover:bg-blue-500' },
  { icon: '📷', name: 'Instagram', url: '#', color: 'hover:bg-pink-500' },
  { icon: '🐦', name: 'Twitter', url: '#', color: 'hover:bg-blue-400' },
  { icon: '💼', name: 'LinkedIn', url: '#', color: 'hover:bg-blue-600' }
];

/**
 * Displays the contact page with a form and contact information.
 * @returns {JSX.Element} The rendered ContactPage component.
 */
const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '',
    experience: '',
    goals: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        message: '', 
        service: '', 
        experience: '', 
        goals: '' 
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            {t('contactTitle', 'Ponte en Contacto')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('contactSubtitle', '¿Listo para comenzar tu transformación? Contáctame y juntos crearemos el plan perfecto para alcanzar tus objetivos')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {t('contactFormTitle', 'Envíame un Mensaje')}
              </h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 rounded-xl">
                  {t('contactSuccess', '¡Mensaje enviado con éxito! Te responderemos pronto.')}
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-xl">
                  {t('contactError', 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.')}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contactFormName', 'Nombre')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      placeholder={t('contactFormNamePlaceholder', 'Tu nombre completo')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contactFormEmail', 'Email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      placeholder={t('contactFormEmailPlaceholder', 'tu@email.com')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contactFormPhone', 'Teléfono')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      placeholder={t('contactFormPhonePlaceholder', '+34 600 123 456')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contactFormService', 'Servicio de Interés')}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    >
                      <option value="">{t('contactFormServicePlaceholder', 'Selecciona un servicio')}</option>
                      <option value="personal-training">{t('service1Title', 'Entrenamiento Personalizado')}</option>
                      <option value="nutrition-coaching">{t('service2Title', 'Asesoría Nutricional')}</option>
                      <option value="online-classes">{t('service3Title', 'Clases Online')}</option>
                      <option value="rehabilitation">{t('service4Title', 'Rehabilitación y Recuperación')}</option>
                      <option value="sports-training">{t('service5Title', 'Entrenamiento Deportivo')}</option>
                      <option value="group-sessions">{t('service6Title', 'Sesiones Grupales')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nivel de Experiencia
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  >
                    <option value="">Selecciona tu nivel</option>
                    <option value="beginner">Principiante</option>
                    <option value="intermediate">Intermedio</option>
                    <option value="advanced">Avanzado</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="goals" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Objetivos Principales
                  </label>
                  <textarea
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors resize-none"
                    placeholder="Ej: Perder peso, ganar músculo, mejorar resistencia..."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contactFormMessage', 'Mensaje')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors resize-none"
                    placeholder={t('contactFormMessagePlaceholder', 'Cuéntame sobre tus objetivos y cómo puedo ayudarte...')}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? t('contactSending', 'Enviando...') : t('contactFormSubmit', 'Enviar Mensaje')}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.titleKey}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{info.icon}</div>
                    <div>
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
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                {t('contactSocialTitle', 'Sígueme en Redes Sociales')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className="flex flex-col items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 group"
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Response */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">
                {t('contactQuickResponseTitle', 'Respuesta Rápida')}
              </h3>
              <p className="text-teal-100 mb-6">
                {t('contactQuickResponseText', 'Normalmente respondo en menos de 24 horas. ¡No dudes en contactarme!')}
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-teal-100">
                  {t('contactAvailable', 'Disponible ahora')}
                </span>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                Ubicación
              </h3>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-48 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  {t('contactMapPlaceholder', 'Mapa interactivo aquí')}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage; 