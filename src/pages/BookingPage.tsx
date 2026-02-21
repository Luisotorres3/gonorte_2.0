import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocalizedRoute } from '../router/routes.config';
import { InlineWidget } from 'react-calendly';
import AnimatedPage from '../components/motion/AnimatedPage';
import { MARKETING } from '../constants';
import { FaCheck, FaArrowLeft } from 'react-icons/fa6';
import BookingSteps from '../components/ui/BookingSteps';

interface PlanFeature {
  text: string;
  included: boolean;
}

type BillingCycle = 'monthly' | 'quarterly' | 'semiannual';

interface Plan {
  id: string;
  name: string;
  description: string;
  pricing: Record<BillingCycle, number>;
  features: PlanFeature[];
  popular?: boolean;
  gifts?: Partial<Record<BillingCycle, string>>;
  buttonText: string;
  highlight?: string;
}

interface BookingPageState {
  plan: Plan;
  billingCycle: BillingCycle;
}

const CALENDLY_FALLBACK_MS = 10_000;

const BookingPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLang = i18n.language || 'es';
  const state = location.state as BookingPageState;
  const { plan, billingCycle } = state || {};

  const [step, setStep] = useState<2 | 3>(2);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'beginner',
    otherInfo: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    privacyConsent: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false
  });
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);

  useEffect(() => {
    if (!plan) {
      navigate(getLocalizedRoute('services', currentLang));
    }
  }, [plan, navigate, currentLang]);

  useEffect(() => {
    if (step !== 3) {
      return;
    }

    setIsCalendlyLoaded(false);

    const fallbackTimeout = window.setTimeout(() => {
      setIsCalendlyLoaded(true);
    }, CALENDLY_FALLBACK_MS);

    const handler = (e: MessageEvent) => {
      if (
        e.origin === 'https://calendly.com' &&
        e.data?.event === 'calendly.event_type_viewed'
      ) {
        window.clearTimeout(fallbackTimeout);
        setIsCalendlyLoaded(true);
      }
    };

    window.addEventListener('message', handler);

    return () => {
      window.removeEventListener('message', handler);
      window.clearTimeout(fallbackTimeout);
    };
  }, [step]);

  if (!plan) return null;

  const validateName = (name: string): string => {
    if (!name.trim()) {
      return t('formErrorNameRequired', 'El nombre es obligatorio');
    }
    if (name.trim().length < 2) {
      return t('formErrorNameTooShort', 'El nombre debe tener al menos 2 caracteres');
    }
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return t('formErrorEmailRequired', 'El email es obligatorio');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return t('formErrorEmailInvalid', 'Introduce un email válido');
    }
    return '';
  };

  const validatePhone = (phone: string): string => {
    if (phone && phone.length > 0 && phone.length < 9) {
      return t('formErrorPhoneInvalid', 'Introduce un número válido');
    }
    return '';
  };

  const handleBlur = (field: 'name' | 'email' | 'phone') => {
    setTouched({ ...touched, [field]: true });
    let error = '';
    if (field === 'name') error = validateName(userInfo.name);
    if (field === 'email') error = validateEmail(userInfo.email);
    if (field === 'phone') error = validatePhone(userInfo.phone);
    setErrors({ ...errors, [field]: error });
  };

  const handleInputChange = (field: 'name' | 'email' | 'phone', value: string) => {
    setUserInfo({ ...userInfo, [field]: value });
    if (touched[field]) {
      let error = '';
      if (field === 'name') error = validateName(value);
      if (field === 'email') error = validateEmail(value);
      if (field === 'phone') error = validatePhone(value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const nameError = validateName(userInfo.name);
    const emailError = validateEmail(userInfo.email);
    const phoneError = validatePhone(userInfo.phone);
    const privacyError = !privacyConsent ? t('formErrorPrivacyRequired', 'Debes aceptar la política de privacidad') : '';

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      privacyConsent: privacyError
    });

    setTouched({
      name: true,
      email: true,
      phone: true
    });

    if (nameError || emailError || phoneError || privacyError) {
      setIsSubmitting(false);
      return;
    }

    // Simulate a small delay for better UX
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 500);
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
    } else {
      navigate(getLocalizedRoute('services', currentLang));
    }
  };

  return (
    <AnimatedPage className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-20" style={{ backgroundColor: 'hsl(var(--color-bg-base))' }}>
      <div className="container mx-auto px-3 sm:px-4">
        {/* Back Button - Top Left */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium shadow-md hover:shadow-lg group transition-all duration-300"
            style={{ 
              backgroundColor: 'hsl(var(--color-bg-surface))', 
              color: 'hsl(var(--color-fg-base))',
              border: '1px solid hsl(var(--color-border-base))'
            }}
          >
            <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="hidden sm:inline">{step === 2 ? t('backToPlanSelection', 'Volver a selección de plan') : t('backToInfo', 'Volver a mis datos')}</span>
            <span className="sm:hidden">{t('back', 'Volver')}</span>
          </button>
        </div>

        <BookingSteps currentStep={step} />
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Plan Summary */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <div className="hidden md:block">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                {step === 2 ? 'Tus Datos' : 'Agenda tu Sesión'}
              </h1>
              <p className="text-base sm:text-lg max-w-2xl" style={{ color: 'hsl(var(--color-fg-muted))' }}>
                {step === 2
                  ? 'Completa tus datos para personalizar tu experiencia.'
                  : 'Selecciona el horario que mejor te convenga para nuestra primera reunión.'}
              </p>
            </div>

            <div 
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg"
              style={{ 
                backgroundColor: 'hsl(var(--color-bg-surface))', 
                border: '1px solid hsl(var(--color-border-base))'
              }}
            >
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4" style={{ color: 'hsl(var(--color-fg-base))' }}>
                {t('selectedPlan', 'Plan Seleccionado')}
              </h2>
              
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1 sm:mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm sm:text-base mb-3 sm:mb-4" style={{ color: 'hsl(var(--color-fg-muted))' }}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1.5 sm:gap-2">
                  <span className="text-2xl sm:text-3xl font-bold" style={{ color: 'hsl(var(--color-fg-base))' }}>
                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(plan.pricing[billingCycle])}
                  </span>
                  <span style={{ color: 'hsl(var(--color-fg-muted))' }}>
                    /{billingCycle === 'monthly' ? t('perMonth', 'mes') : billingCycle === 'quarterly' ? t('perQuarter', 'trimestre') : t('perSemiannual', 'semestre')}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold" style={{ color: 'hsl(var(--color-fg-base))' }}>
                  {t('whatsIncluded', '¿Qué incluye?')}
                </h4>
                <ul className="space-y-2">
                  {plan.features.filter((f) => f.included).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: 'hsl(var(--color-fg-muted))' }}>
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div 
            className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg min-h-[500px] p-4 sm:p-6 md:p-8"
            style={{ 
              backgroundColor: 'hsl(var(--color-bg-surface))', 
              border: '1px solid hsl(var(--color-border-base))'
            }}
          >
            {step === 2 ? (
              <form onSubmit={handleInfoSubmit} className="space-y-4 sm:space-y-6">
                {/* Mobile Title */}
                <div className="md:hidden mb-4 sm:mb-6">
                  <h2 className="text-2xl font-bold text-primary dark:text-primary-dark mb-2">
                    {t('bookingTitleInfo', 'Tus Datos')}
                  </h2>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    {t('bookingSubtitleInfo', 'Completa tus datos para personalizar tu experiencia.')}
                  </p>
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-default dark:text-text-default-dark mb-2">
                    {t('formName', 'Nombre Completo')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    aria-required="true"
                    aria-invalid={touched.name && errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg border text-sm sm:text-base ${
                      touched.name && errors.name
                        ? 'border-red-500 focus:ring-red-500'
                        : touched.name && !errors.name
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-neutral-border-light dark:border-neutral-border-dark focus:ring-primary'
                    } bg-neutral-background-light dark:bg-neutral-background-dark text-text-default dark:text-text-default-dark focus:ring-2 outline-none transition-all`}
                    value={userInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder={t('formNamePlaceholder', 'Tu nombre')}
                  />
                  {touched.name && errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <span>⚠</span> {errors.name}
                    </p>
                  )}
                  {touched.name && !errors.name && userInfo.name && (
                    <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
                      <span>✓</span> {t('formValidName', 'Perfecto')}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-default dark:text-text-default-dark mb-2">
                    {t('formEmail', 'Email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    aria-required="true"
                    aria-invalid={touched.email && errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg border text-sm sm:text-base ${
                      touched.email && errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : touched.email && !errors.email
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-neutral-border-light dark:border-neutral-border-dark focus:ring-primary'
                    } bg-neutral-background-light dark:bg-neutral-background-dark text-text-default dark:text-text-default-dark focus:ring-2 outline-none transition-all`}
                    value={userInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder={t('formEmailPlaceholder', 'tu@email.com')}
                  />
                  {touched.email && errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <span>⚠</span> {errors.email}
                    </p>
                  )}
                  {touched.email && !errors.email && userInfo.email && (
                    <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
                      <span>✓</span> {t('formValidEmail', 'Email válido')}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text-default dark:text-text-default-dark mb-2">
                    {t('formPhone', 'Teléfono (Opcional)')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    aria-invalid={touched.phone && errors.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg border text-sm sm:text-base ${
                      touched.phone && errors.phone
                        ? 'border-red-500 focus:ring-red-500'
                        : touched.phone && !errors.phone && userInfo.phone
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-neutral-border-light dark:border-neutral-border-dark focus:ring-primary'
                    } bg-neutral-background-light dark:bg-neutral-background-dark text-text-default dark:text-text-default-dark focus:ring-2 outline-none transition-all`}
                    value={userInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    placeholder="+34 600 000 000"
                  />
                  {touched.phone && errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <span>⚠</span> {errors.phone}
                    </p>
                  )}
                  {touched.phone && !errors.phone && userInfo.phone && (
                    <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
                      <span>✓</span> {t('formValidPhone', 'Teléfono válido')}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-default dark:text-text-default-dark mb-3">
                    {t('formExperience', 'Experiencia en Entrenamiento')}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { value: 'beginner', label: t('expBeginner', 'Principiante (0-1 años)') },
                      { value: 'intermediate', label: t('expIntermediate', 'Intermedio (1-3 años)') },
                      { value: 'advanced', label: t('expAdvanced', 'Avanzado (+3 años)') }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setUserInfo({ ...userInfo, experience: option.value })}
                        className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg border-2 transition-all duration-200 text-center font-medium text-xs sm:text-sm ${
                          userInfo.experience === option.value
                            ? 'border-primary bg-primary text-white'
                            : 'border-neutral-border-light dark:border-neutral-border-dark text-text-default dark:text-text-default-dark hover:border-primary/50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="otherInfo" className="block text-sm font-medium text-text-default dark:text-text-default-dark">
                      {t('formOtherInfo', 'Información Adicional (Objetivos, Lesiones, etc.)')}
                    </label>
                    <span className="text-xs text-text-muted-light dark:text-text-muted-dark">
                      {userInfo.otherInfo.length}/500
                    </span>
                  </div>
                  <textarea
                    id="otherInfo"
                    rows={4}
                    maxLength={500}
                    aria-describedby="otherInfo-hint"
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg border text-sm sm:text-base border-neutral-border-light dark:border-neutral-border-dark bg-neutral-background-light dark:bg-neutral-background-dark text-text-default dark:text-text-default-dark focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                    value={userInfo.otherInfo}
                    onChange={(e) => setUserInfo({ ...userInfo, otherInfo: e.target.value })}
                    placeholder={t('formOtherInfoPlaceholder', 'Cuéntame un poco sobre tus objetivos, si tienes alguna lesión o cualquier otra cosa que deba saber...')}
                  />
                  <p id="otherInfo-hint" className="mt-1 text-xs text-text-muted-light dark:text-text-muted-dark">
                    {t('formOtherInfoHint', 'Esta información me ayudará a personalizar mejor tu programa de entrenamiento')}
                  </p>
                </div>

                {/* GDPR Compliance Section */}
                <div className="space-y-4 pt-4 border-t border-neutral-border-light dark:border-neutral-border-dark">
                  <h3 className="text-sm font-semibold text-text-default dark:text-text-default-dark">
                    {t('formPrivacyTitle', 'Privacidad y Consentimiento')}
                  </h3>
                  
                  {/* Required Privacy Consent */}
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={privacyConsent}
                          onChange={(e) => {
                            setPrivacyConsent(e.target.checked);
                            if (e.target.checked) {
                              setErrors({ ...errors, privacyConsent: '' });
                            }
                          }}
                          className="w-5 h-5 rounded border-2 border-neutral-border-light dark:border-neutral-border-dark text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 cursor-pointer"
                          required
                        />
                      </div>
                      <span className="text-sm text-text-default dark:text-text-default-dark flex-1">
                        {t('formPrivacyConsent', 'He leído y acepto la')}{' '}
                        <a 
                          href="/legal#privacy" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          {t('privacyPolicyTitle', 'Política de Privacidad')}
                        </a>
                        {' '}{t('formPrivacyConsentAnd', 'y los')}{' '}
                        <a 
                          href="/legal#terms" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          {t('termsOfUseTitle', 'Términos de Uso')}
                        </a>
                        {' '}<span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.privacyConsent && (
                      <p className="text-sm text-red-500 flex items-center gap-1 ml-8">
                        <span>⚠</span> {errors.privacyConsent}
                      </p>
                    )}
                  </div>

                  {/* Optional Marketing Consent */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={marketingConsent}
                          onChange={(e) => setMarketingConsent(e.target.checked)}
                          className="w-5 h-5 rounded border-2 border-neutral-border-light dark:border-neutral-border-dark text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 cursor-pointer"
                        />
                      </div>
                      <span className="text-sm text-text-default dark:text-text-default-dark flex-1">
                        {t('formMarketingConsent', 'Acepto recibir comunicaciones promocionales, consejos de entrenamiento y ofertas especiales por email')}{' '}
                        <span className="text-text-muted-light dark:text-text-muted-dark">({t('formOptional', 'Opcional')})</span>
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 sm:pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || !privacyConsent}
                    className={`w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3 sm:py-4 text-sm sm:text-base rounded-xl transition-all duration-300 transform ${
                      isSubmitting || !privacyConsent
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:shadow-2xl hover:-translate-y-1'
                    } flex items-center justify-center gap-2`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{t('formProcessing', 'Procesando...')}</span>
                      </>
                    ) : (
                      t('continueToSchedule', 'Continuar a Agenda')
                    )}
                  </button>
                  <p className="mt-3 text-xs text-center text-text-muted-light dark:text-text-muted-dark">
                    🔒 {t('formSecureInfo', 'Tu información está segura y solo será usada para personalizar tu experiencia')}
                  </p>
                </div>
              </form>
            ) : (
              <div className="h-full min-h-[600px] flex flex-col relative">
                {!isCalendlyLoaded && (
                  <div
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3"
                    style={{
                      backgroundColor: 'hsl(var(--color-bg-surface) / 0.88)',
                      backdropFilter: 'blur(2px)'
                    }}
                    aria-live="polite"
                    aria-busy="true"
                  >
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm sm:text-base font-medium text-text-default dark:text-text-default-dark">
                      {t('loadingBookingWidget', 'Cargando agenda...')}
                    </p>
                  </div>
                )}
                <InlineWidget 
                  url={MARKETING.CALENDLY_URL} 
                  styles={{ height: '100%', width: '100%', minHeight: '600px' }}
                  prefill={{
                    name: userInfo.name,
                    email: userInfo.email,
                    customAnswers: {
                      a1: `Plan: ${plan.name} (${billingCycle})`,
                      a2: userInfo.phone,
                      a3: userInfo.experience,
                      a4: userInfo.otherInfo
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default BookingPage;
