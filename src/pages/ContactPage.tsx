/**
 * @file ContactPage.tsx
 * @description This file defines the contact page component.
 * It includes a contact form and contact information for users to get in touch.
 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

/**
 * Displays the contact page with a form and contact information.
 * @returns {JSX.Element} The rendered ContactPage component.
 */
const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📧',
      title: t('contactEmail', 'Email'),
      value: 'info@gonorte.com',
      link: 'mailto:info@gonorte.com'
    },
    {
      icon: '📱',
      title: t('contactPhone', 'Teléfono'),
      value: '+34 123 456 789',
      link: 'tel:+34123456789'
    },
    {
      icon: '📍',
      title: t('contactAddress', 'Dirección'),
      value: t('contactAddressValue', 'Madrid, España'),
      link: null
    },
    {
      icon: '⏰',
      title: t('contactHours', 'Horario'),
      value: t('contactHoursValue', 'Lun - Vie: 9:00 - 18:00'),
      link: null
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {t('contactTitle', 'Ponte en contacto')}
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            {t('contactSubtitle', '¿Tienes un proyecto en mente? Estamos aquí para ayudarte a hacerlo realidad')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="bg-surface rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">
              {t('contactFormTitle', 'Envíanos un mensaje')}
            </h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                {t('contactSuccess', '¡Mensaje enviado con éxito! Te responderemos pronto.')}
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {t('contactError', 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.')}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                  {t('contactName', 'Nombre')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  {t('contactEmailLabel', 'Email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                  {t('contactSubject', 'Asunto')} *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">{t('contactSelectSubject', 'Selecciona un asunto')}</option>
                  <option value="project">{t('contactProject', 'Nuevo proyecto')}</option>
                  <option value="consultation">{t('contactConsultation', 'Consulta')}</option>
                  <option value="partnership">{t('contactPartnership', 'Colaboración')}</option>
                  <option value="other">{t('contactOther', 'Otro')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                  {t('contactMessage', 'Mensaje')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('contactSending', 'Enviando...') : t('contactSend', 'Enviar mensaje')}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-text-primary">
                {t('contactInfoTitle', 'Información de contacto')}
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="text-2xl">{info.icon}</div>
                    <div>
                      <h3 className="font-semibold text-text-primary">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-primary hover:text-primary-dark transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-text-muted">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-text-primary">
                {t('contactSocialTitle', 'Síguenos')}
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-2xl hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  💼
                </a>
                <a
                  href="#"
                  className="text-2xl hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  🐦
                </a>
                <a
                  href="#"
                  className="text-2xl hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  📷
                </a>
                <a
                  href="#"
                  className="text-2xl hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  💻
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <p className="text-text-muted">
                {t('contactMapPlaceholder', 'Mapa interactivo aquí')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage; 