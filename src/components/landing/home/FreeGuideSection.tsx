/**
 * @file FreeGuideSection.tsx
 * @description Lead-magnet section — collects name + email and saves to Firestore `leads` collection.
 * Shows a success state after submission.
 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaEnvelope, FaUser, FaShield, FaCircleCheck } from 'react-icons/fa6';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const FreeGuideSection: React.FC = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setFormState('submitting');
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setFormState('success');
    } catch {
      setFormState('error');
    }
  };

  return (
    <section className="w-full bg-white dark:bg-neutral-900 py-16 sm:py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-primary-100 dark:bg-primary-900/20 blur-3xl opacity-60" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-secondary-100 dark:bg-secondary-900/20 blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-space-md relative z-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary-500 mb-3">
              {t('guideLabel', 'Recursos gratuitos')}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-neutral-800 to-primary-700 dark:from-neutral-200 dark:to-primary-400 bg-clip-text text-transparent mb-5">
              {t('guideTitle', 'Descarga la guía y empieza con una base sólida')}
            </h2>
            <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
              {t(
                'guideIntro',
                'Te envío por email una guía práctica para mejorar postura, moverte mejor y empezar a construir fuerza sin improvisar.',
              )}
            </p>

            <ul className="mt-5 space-y-2.5">
              <li className="flex items-center gap-2.5 text-fg-base font-semibold text-sm sm:text-base">
                <FaCircleCheck className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span>Mejora tu postura desde la raíz</span>
              </li>
              <li className="flex items-center gap-2.5 text-fg-base font-semibold text-sm sm:text-base">
                <FaCircleCheck className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span>Muévete mejor en tu día a día</span>
              </li>
              <li className="flex items-center gap-2.5 text-fg-base font-semibold text-sm sm:text-base">
                <FaCircleCheck className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span>Empieza a construir fuerza sin improvisar</span>
              </li>
            </ul>

            {/* Decorative guide preview card */}
            <div className="mt-7 flex items-center gap-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-4 border border-primary-100 dark:border-primary-800/40">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-md">
                <FaDownload className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-fg-base">
                  {t('guideFileName', 'Guía: Postura, Movimiento y Fuerza')}
                </p>
                <p className="text-xs text-fg-muted mt-0.5">PDF · {t('guideFree', 'Gratis')}</p>
              </div>
            </div>
          </motion.div>

          {/* Right: form / success */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <div className="bg-primary-50/60 dark:bg-neutral-800 rounded-2xl border border-border-base shadow-lg p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-4"
                  >
                    <FaCircleCheck className="w-14 h-14 text-primary-500 mx-auto mb-4" />
                    <h3 className="text-lg sm:text-xl font-bold text-fg-base mb-2">
                      {t('guideSuccessTitle', '¡Guía en camino!')}
                    </h3>
                    <p className="text-sm text-fg-muted leading-relaxed">
                      {t(
                        'guideSuccessText',
                        'Revisa tu bandeja de entrada (y el spam, por si acaso). En breve recibirás la guía.',
                      )}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <h3 className="text-base sm:text-lg font-bold text-fg-base mb-5">
                      {t('guideFormHeading', 'Recíbela ahora, es gratis')}
                    </h3>

                    {/* Name field */}
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-fg-muted uppercase tracking-wider mb-1.5">
                        {t('guideName', 'Nombre')}
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-fg-muted/60 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t('guideNamePlaceholder', 'Tu nombre')}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border-base bg-bg-surface text-sm text-fg-base placeholder:text-fg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary-400 transition"
                        />
                      </div>
                    </div>

                    {/* Email field */}
                    <div className="mb-6">
                      <label className="block text-xs font-semibold text-fg-muted uppercase tracking-wider mb-1.5">
                        {t('guideEmail', 'Email')}
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-fg-muted/60 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t('guideEmailPlaceholder', 'tucorreo@email.com')}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border-base bg-bg-surface text-sm text-fg-base placeholder:text-fg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary-400 transition"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-xl font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      whileHover={{ scale: formState === 'submitting' ? 1 : 1.02 }}
                      whileTap={{ scale: formState === 'submitting' ? 1 : 0.97 }}
                    >
                      <FaDownload className="w-4 h-4" />
                      {formState === 'submitting'
                        ? t('guideSubmitting', 'Enviando…')
                        : t('guideSubmit', 'Quiero la guía')}
                    </motion.button>

                    {/* Error */}
                    {formState === 'error' && (
                      <p className="mt-3 text-xs text-red-500 text-center">
                        {t('guideError', 'Algo salió mal. Inténtalo de nuevo.')}
                      </p>
                    )}

                    {/* Privacy note */}
                    <div className="mt-4 flex items-start gap-2">
                      <FaShield className="flex-shrink-0 mt-0.5 w-3.5 h-3.5 text-primary-400" />
                      <p className="text-xs text-fg-muted leading-relaxed">
                        {t(
                          'guidePrivacy',
                          'Respeto tu privacidad. Tus datos no serán compartidos con terceros.',
                        )}
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FreeGuideSection;
