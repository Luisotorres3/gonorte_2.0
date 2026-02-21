/**
 * @file ContactPage.tsx
 * @description This file defines the contact page component.
 * It includes a contact form and contact information for users to get in touch.
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa6';
import { getLocalizedRoute } from '../router/routes.config';

interface ContactInfo {
  icon: React.ReactNode;
  titleKey: string;
  defaultTitle: string;
  valueKey: string;
  defaultValue: string;
  link?: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: <FaEnvelope />,
    titleKey: 'contactEmailTitle',
    defaultTitle: 'Email',
    valueKey: 'contactEmail',
    defaultValue: 'gonorte.biomechanics@gmail.com',
    link: 'mailto:gonorte.biomechanics@gmail.com'
  },
  {
    icon: <FaPhone />,
    titleKey: 'contactPhoneTitle',
    defaultTitle: 'Teléfono',
    valueKey: 'contactPhone',
    defaultValue: '+34 644 00 15 99',
    link: 'tel:+34644001599'
  }
];

const socialLinks = [
  { icon: <FaFacebook />, name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61577890884590', hoverBg: 'hover:bg-[#1877F2]', hoverText: 'hover:text-white' },
  { icon: <FaInstagram />, name: 'Instagram', url: 'https://www.instagram.com/gonorte.training/', hoverBg: 'hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888]', hoverText: 'hover:text-white' },
  { icon: <FaLinkedin />, name: 'LinkedIn', url: 'https://www.linkedin.com/in/carmen-mar%C3%ADa-gonz%C3%A1lez-ortega-3747b5258/', hoverBg: 'hover:bg-[#0A66C2]', hoverText: 'hover:text-white' },
  { icon: <FaTiktok />, name: 'TikTok', url: 'https://www.tiktok.com/@gonorte.training', hoverBg: 'hover:bg-black dark:hover:bg-white', hoverText: 'hover:text-white dark:hover:text-black' },
  { icon: <FaYoutube />, name: 'YouTube', url: 'https://www.youtube.com/@Gonorte.training', hoverBg: 'hover:bg-[#FF0000]', hoverText: 'hover:text-white' }
];

/**
 * Displays the contact page with a form and contact information.
 * @returns {JSX.Element} The rendered ContactPage component.
 */
const ContactPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'es';
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
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-neutral-background-light via-neutral-background-light to-primary-light/20 dark:from-neutral-background-dark dark:via-neutral-background-dark dark:to-primary-dark/20 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            {t('contactHeroTitle', 'Contacto')}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'hsl(var(--color-fg-muted))' }}>
            {t('contactHeroSubtitle', 'Escríbeme y hablamos. Respondo en menos de 24 horas.')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-white dark:bg-neutral-surface-dark rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-xl border border-gray-200 dark:border-neutral-border-dark transition-colors duration-300">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-text-default-dark">
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

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-text-default-dark mb-2">
                      {t('contactFormName', 'Nombre')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-border-dark rounded-xl focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT bg-gray-50 dark:bg-neutral-surface-dark text-gray-900 dark:text-text-default-dark placeholder-gray-500 dark:placeholder-text-muted-dark transition-colors duration-300"
                      placeholder={t('contactFormNamePlaceholder', 'Tu nombre completo')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-text-default-dark mb-2">
                      {t('contactFormEmail', 'Email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-border-dark rounded-xl focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT bg-gray-50 dark:bg-neutral-surface-dark text-gray-900 dark:text-text-default-dark placeholder-gray-500 dark:placeholder-text-muted-dark transition-colors duration-300"
                      placeholder={t('contactFormEmailPlaceholder', 'tu@email.com')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-text-default-dark mb-2">
                      {t('contactFormPhone', 'Teléfono')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-border-dark rounded-xl focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT bg-gray-50 dark:bg-neutral-surface-dark text-gray-900 dark:text-text-default-dark placeholder-gray-500 dark:placeholder-text-muted-dark transition-colors duration-300"
                      placeholder={t('contactFormPhonePlaceholder', '+34 600 123 456')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-text-default-dark mb-2">
                      {t('contactFormService', 'Servicio de Interés')}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-border-dark rounded-xl focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT bg-gray-50 dark:bg-neutral-surface-dark text-gray-900 dark:text-text-default-dark transition-colors duration-300 appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}
                    >
                      <option value="">{t('contactFormServicePlaceholder', 'Selecciona un servicio')}</option>
                      <option value="personal-training">{t('contactServiceOptionPersonalTraining', 'Entrenamiento personal')}</option>
                      <option value="3d-postural-analysis">{t('contactServiceOptionPosturalAnalysis', 'Análisis postural en 3D')}</option>
                      <option value="rehabilitation">{t('contactServiceOptionRehab', 'Readaptación de lesiones')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-text-default-dark mb-2">
                    {t('contactFormExperience', 'Nivel de Experiencia')}
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-border-dark rounded-xl focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT bg-gray-50 dark:bg-neutral-surface-dark text-gray-900 dark:text-text-default-dark transition-colors duration-300 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="">{t('contactFormExperiencePlaceholder', 'Selecciona tu nivel')}</option>
                    <option value="beginner">{t('contactExperienceOptionBeginner', 'Principiante')}</option>
                    <option value="intermediate">{t('contactExperienceOptionIntermediate', 'Intermedio')}</option>
                    <option value="advanced">{t('contactExperienceOptionAdvanced', 'Avanzado')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="goals" className="block text-sm font-medium text-gray-700 dark:text-text-default-dark mb-2">
                    {t('contactFormGoals', 'Objetivos Principales')}
                  </label>
                  <textarea
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-border-dark rounded-xl focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT bg-gray-50 dark:bg-neutral-surface-dark text-gray-900 dark:text-text-default-dark placeholder-gray-500 dark:placeholder-text-muted-dark resize-none transition-colors duration-300"
                    placeholder={t('contactFormGoalsPlaceholder', 'Ej: mejorar movilidad, recuperarme de una lesión, mejorar postura...')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-text-default-dark mb-2">
                    {t('contactFormMessage', 'Mensaje')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-border-dark rounded-xl focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT bg-gray-50 dark:bg-neutral-surface-dark text-gray-900 dark:text-text-default-dark placeholder-gray-500 dark:placeholder-text-muted-dark resize-none transition-colors duration-300"
                    placeholder={t('contactFormMessagePlaceholder', 'Cuéntame sobre tus objetivos y cómo puedo ayudarte...')}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary dark:hover:bg-primary-dark text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? t('contactSending', 'Enviando...') : t('contactFormSubmit', 'Enviar Mensaje')}
                </motion.button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="h-full flex flex-col justify-between space-y-3">
            {/* Video Call CTA */}
            <Link
              to={getLocalizedRoute('videoCall', currentLang)}
              className="inline-flex items-center justify-center w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              {t('contactVideoCallCTA', 'Agendar videollamada inicial')}
            </Link>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactInfo.map((info) => (
                <motion.a
                  key={info.titleKey}
                  href={info.link}
                  className="bg-white dark:bg-neutral-surface-dark rounded-xl p-3 shadow-md border border-gray-200 dark:border-neutral-border-dark hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-dark transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-xl text-primary-600 dark:text-primary-400 flex-shrink-0">{info.icon}</div>
                    <span className="text-sm font-medium text-gray-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-100 transition-colors break-all">
                      {t(info.valueKey, info.defaultValue)}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-neutral-surface-dark rounded-xl p-3.5 shadow-sm border border-gray-200 dark:border-neutral-border-dark">
              <h3 className="text-sm font-semibold text-center mb-2.5 text-gray-900 dark:text-text-default-dark">
                {t('contactSocialTitle', 'Sígueme en redes')}
              </h3>
              <div className="flex justify-center items-center gap-2.5">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-background-dark border border-gray-200 dark:border-neutral-border-dark text-gray-600 dark:text-neutral-300 ${social.hoverBg} ${social.hoverText} transition-all duration-300 shadow-sm hover:shadow-md hover:border-transparent`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.name}
                  >
                    <span className="text-base">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white dark:bg-neutral-surface-dark rounded-xl p-4 shadow-sm border border-gray-200 dark:border-neutral-border-dark flex-1 flex flex-col">
              <h3 className="text-base font-bold mb-3 text-gray-900 dark:text-text-default-dark">
                {t('contactMapTitle', 'Gonorte Training en Jaén')}
              </h3>
              <div className="bg-gray-100 dark:bg-neutral-background-dark rounded-xl flex-1 flex items-center justify-center min-h-[200px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.632155525589!2d-3.7984841!3d37.7764501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6dd70193efdadf%3A0xd84e52ed4d80bbe4!2sGonorte%20Training!5e0!3m2!1ses!2ses!4v1733140800000!5m2!1ses!2ses"
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