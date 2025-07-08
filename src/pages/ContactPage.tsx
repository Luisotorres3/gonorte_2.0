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
    <div className="min-h-full bg-gradient-to-br from-neutral-background-light via-neutral-background-light to-primary-light/20 dark:from-neutral-background-dark dark:via-neutral-background-dark dark:to-primary-dark/20 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-neutral-surface-light dark:bg-neutral-surface-dark rounded-2xl p-8 shadow-xl border-2 border-gray-300 dark:border-neutral-border-dark transition-colors duration-300">
              <h2 className="text-2xl font-bold mb-6 text-text-default-light dark:text-text-default-dark">
                {t('contactFormTitle', 'Envíame un Mensaje')}
              </h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-semantic-success-light/20 dark:bg-semantic-success-dark/20 border border-semantic-success-light dark:border-semantic-success-dark text-semantic-success-light dark:text-semantic-success-dark rounded-xl">
                  {t('contactSuccess', '¡Mensaje enviado con éxito! Te responderemos pronto.')}
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-semantic-error-light/20 dark:bg-semantic-error-dark/20 border border-semantic-error-light dark:border-semantic-error-dark text-semantic-error-light dark:text-semantic-error-dark rounded-xl">
                  {t('contactError', 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.')}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                      {t('contactFormName', 'Nombre')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-border-dark rounded-xl focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-transparent bg-neutral-surface-light dark:bg-neutral-surface-dark text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark transition-colors duration-300"
                      placeholder={t('contactFormNamePlaceholder', 'Tu nombre completo')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                      {t('contactFormEmail', 'Email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-border-dark rounded-xl focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-transparent bg-neutral-surface-light dark:bg-neutral-surface-dark text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark transition-colors duration-300"
                      placeholder={t('contactFormEmailPlaceholder', 'tu@email.com')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                      {t('contactFormPhone', 'Teléfono')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-border-dark rounded-xl focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-transparent bg-neutral-surface-light dark:bg-neutral-surface-dark text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark transition-colors duration-300"
                      placeholder={t('contactFormPhonePlaceholder', '+34 600 123 456')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                      {t('contactFormService', 'Servicio de Interés')}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-border-dark rounded-xl focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-transparent bg-neutral-surface-light dark:bg-neutral-surface-dark text-text-default-light dark:text-text-default-dark transition-colors duration-300 appearance-none cursor-pointer [&>option]:bg-neutral-surface-light [&>option]:dark:bg-neutral-surface-dark [&>option]:text-text-default-light [&>option]:dark:text-text-default-dark [&>option]:py-2 [&>option]:px-3 [&>option]:hover:bg-gray-100 [&>option]:dark:hover:bg-gray-700 [&>option]:border-b [&>option]:border-gray-200 [&>option]:dark:border-gray-600"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}
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
                  <label htmlFor="experience" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    Nivel de Experiencia
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-border-dark rounded-xl focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-transparent bg-neutral-surface-light dark:bg-neutral-surface-dark text-text-default-light dark:text-text-default-dark transition-colors duration-300 appearance-none cursor-pointer [&>option]:bg-neutral-surface-light [&>option]:dark:bg-neutral-surface-dark [&>option]:text-text-default-light [&>option]:dark:text-text-default-dark [&>option]:py-2 [&>option]:px-3 [&>option]:hover:bg-gray-100 [&>option]:dark:hover:bg-gray-700 [&>option]:border-b [&>option]:border-gray-200 [&>option]:dark:border-gray-600"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="">Selecciona tu nivel</option>
                    <option value="beginner">Principiante</option>
                    <option value="intermediate">Intermedio</option>
                    <option value="advanced">Avanzado</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="goals" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    Objetivos Principales
                  </label>
                  <textarea
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-border-dark rounded-xl focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-transparent bg-neutral-surface-light dark:bg-neutral-surface-dark text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark resize-none transition-colors duration-300"
                    placeholder="Ej: Perder peso, ganar músculo, mejorar resistencia..."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('contactFormMessage', 'Mensaje')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-border-dark rounded-xl focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-transparent bg-neutral-surface-light dark:bg-neutral-surface-dark text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark resize-none transition-colors duration-300"
                    placeholder={t('contactFormMessagePlaceholder', 'Cuéntame sobre tus objetivos y cómo puedo ayudarte...')}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-black dark:text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? t('contactSending', 'Enviando...') : t('contactFormSubmit', 'Enviar Mensaje')}
                </motion.button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="h-full flex flex-col justify-between space-y-6">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {contactInfo.map((info) => (
                <motion.div
                  key={info.titleKey}
                  className="bg-gray-200 dark:bg-neutral-surface-dark rounded-xl p-4 shadow-lg border-2 border-gray-300 dark:border-neutral-border-dark hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="text-2xl icon-primary">{info.icon}</div>
                    <div>
                      <h4 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                        {t(info.titleKey, info.defaultTitle)}
                      </h4>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-xs text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-100 transition-colors"
                        >
                          {t(info.valueKey, info.defaultValue)}
                        </a>
                      ) : (
                        <p className="text-xs text-neutral-600 dark:text-neutral-300">
                          {t(info.valueKey, info.defaultValue)}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="bg-gray-200 dark:bg-neutral-surface-dark rounded-xl p-4 shadow-lg border-2 border-gray-300 dark:border-neutral-border-dark hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="text-2xl icon-primary">{social.icon}</div>
                    <div>
                      <h4 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                        {social.name}
                      </h4>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 dark:bg-neutral-surface-dark rounded-xl p-8 shadow-lg border-2 border-gray-300 dark:border-neutral-border-dark flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-6 text-text-default-light dark:text-text-default-dark">
                Ubicación
              </h3>
              <div className="bg-neutral-background-light dark:bg-neutral-background-dark rounded-xl flex-1 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3180.1234567890123!2d-3.9237!3d37.4627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6dd7b8b8b8b8b8%3A0x8b8b8b8b8b8b8b8!2sAlcal%C3%A1%20la%20Real%2C%20Ja%C3%A9n!5e0!3m2!1ses!2ses!4v1234567890123&maptype=roadmap&zoom=15&disableDefaultUI=true&zoomControl=false&mapTypeControl=false&scaleControl=false&streetViewControl=false&rotateControl=false&fullscreenControl=false"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;