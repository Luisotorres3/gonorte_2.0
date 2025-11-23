import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import AnimatedPage from '../components/motion/AnimatedPage';
import { Link } from 'react-router-dom';
import { 
  FaCheck, 
  FaXmark, 
  FaTrophy, 
  FaMobileScreen, 
  FaBullseye, 
  FaLock, 
  FaFileExcel, 
  FaWhatsapp,
  FaGift
} from 'react-icons/fa6';

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

const ServicesPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  const currencyFormatter = useMemo(() => {
    const locale =
      i18n.language === 'es'
        ? 'es-ES'
        : i18n.language === 'fr'
          ? 'fr-FR'
          : 'en-US';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    });
  }, [i18n.language]);

  const billingDurations: Record<BillingCycle, number> = {
    monthly: 1,
    quarterly: 3,
    semiannual: 6,
  };

  const periodLabels: Record<BillingCycle, string> = {
    monthly: t('perMonth', '/mes'),
    quarterly: t('perQuarter', '/trimestre'),
    semiannual: t('perSemiannual', '/semestre'),
  };

  const plans: Plan[] = [
    {
      id: 'starter',
      name: t('planStarterName', 'Plan Inicio'),
      description: t('planStarterDesc', 'Perfecto para comenzar tu viaje fitness'),
      pricing: {
        monthly: 49,
        quarterly: 135,
        semiannual: 249,
      },
      features: [
        { text: t('planStarterFeature1', 'Plan de entrenamiento personalizado'), included: true },
        { text: t('planStarterFeature2', 'Acceso a rutinas online'), included: true },
        { text: t('planStarterFeature3', 'Seguimiento mensual'), included: true },
        { text: t('planStarterFeature4', 'Soporte por email'), included: true },
        { text: t('planStarterFeature5', 'Guía de nutrición básica'), included: true },
        { text: t('planStarterFeature6', 'Videollamadas mensuales'), included: false },
        { text: t('planStarterFeature7', 'Plan nutricional personalizado'), included: false },
        { text: t('planStarterFeature8', 'Análisis biomecánico'), included: false },
      ],
      gifts: {
        quarterly: t('planStarterGift', 'Ebook de ejercicios GRATIS'),
        semiannual: t('planStarterGiftSemi', 'Sesión extra 1:1 + Pack elásticos'),
      },
      buttonText: t('selectPlan', 'Seleccionar Plan'),
    },
    {
      id: 'professional',
      name: t('planProfessionalName', 'Plan Profesional'),
      description: t('planProfessionalDesc', 'La opción más popular para resultados serios'),
      pricing: {
        monthly: 99,
        quarterly: 270,
        semiannual: 510,
      },
      popular: true,
      features: [
        { text: t('planProfessionalFeature1', 'Plan de entrenamiento avanzado'), included: true },
        { text: t('planProfessionalFeature2', 'Acceso ilimitado a rutinas online'), included: true },
        { text: t('planProfessionalFeature3', 'Seguimiento semanal'), included: true },
        { text: t('planProfessionalFeature4', 'Soporte prioritario 24/7'), included: true },
        { text: t('planProfessionalFeature5', 'Plan nutricional personalizado'), included: true },
        { text: t('planProfessionalFeature6', 'Videollamadas semanales'), included: true },
        { text: t('planProfessionalFeature7', 'Ajustes ilimitados del plan'), included: true },
        { text: t('planProfessionalFeature8', 'Análisis biomecánico'), included: false },
      ],
      gifts: {
        quarterly: t('planProfessionalGift', 'Sesión de análisis postural GRATIS'),
        semiannual: t('planProfessionalGiftSemi', 'Evaluación completa + Kit de movilidad'),
      },
      buttonText: t('selectPlan', 'Seleccionar Plan'),
      highlight: t('mostPopular', 'MÁS POPULAR'),
    },
    {
      id: 'elite',
      name: t('planEliteName', 'Plan Elite'),
      description: t('planEliteDesc', 'Transformación completa con seguimiento premium'),
      pricing: {
        monthly: 149,
        quarterly: 399,
        semiannual: 750,
      },
      features: [
        { text: t('planEliteFeature1', 'Plan de entrenamiento premium'), included: true },
        { text: t('planEliteFeature2', 'Acceso VIP a todas las rutinas'), included: true },
        { text: t('planEliteFeature3', 'Seguimiento diario'), included: true },
        { text: t('planEliteFeature4', 'Soporte dedicado 24/7'), included: true },
        { text: t('planEliteFeature5', 'Plan nutricional avanzado + recetas'), included: true },
        { text: t('planEliteFeature6', 'Videollamadas ilimitadas'), included: true },
        { text: t('planEliteFeature7', 'Análisis biomecánico completo'), included: true },
        { text: t('planEliteFeature8', 'Sesiones presenciales (2/mes)'), included: true },
      ],
      gifts: {
        quarterly: t('planEliteGift', 'Kit de fitness premium + Consulta nutricional GRATIS'),
        semiannual: t('planEliteGiftSemi', 'Retreat presencial + Pack recovery'),
      },
      buttonText: t('selectPlan', 'Seleccionar Plan'),
    },
  ];

  const billingOptions: Array<{
    value: BillingCycle;
    label: string;
    description: string;
    badge?: string;
  }> = [
    {
      value: 'monthly',
      label: t('billingMonthlyLabel', 'Mensual'),
      description: t('billingMonthlyDesc', 'Flexibilidad total, paga mes a mes'),
      badge: t('billingMonthlyBadge', 'Flexible'),
    },
    {
      value: 'quarterly',
      label: t('billingQuarterlyLabel', 'Trimestral'),
      description: t('billingQuarterlyDesc', 'Ahorra más con pagos cada 3 meses'),
      badge: t('billingQuarterlyBadge', 'Ahorra 10%'),
    },
    {
      value: 'semiannual',
      label: t('billingSemiannualLabel', 'Semestral'),
      description: t('billingSemiannualDesc', 'La mejor inversión a 6 meses'),
      badge: t('billingSemiannualBadge', 'Ahorra 15%'),
    },
  ];

  const renderSavingsTag = (plan: Plan) => {
    if (billingCycle === 'monthly') return null;
    const duration = billingDurations[billingCycle];
    const reference = plan.pricing.monthly * duration;
    const selected = plan.pricing[billingCycle];
    const savings = reference - selected;
    if (savings <= 0) return null;

    return (
      <span className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
        {t('saveAmount', 'Ahorra {{amount}}', { amount: currencyFormatter.format(savings) })}
      </span>
    );
  };

  const renderPriceDisplay = (plan: Plan) => {
    const price = currencyFormatter.format(plan.pricing[billingCycle]);
    const periodLabel = periodLabels[billingCycle];
    const savingsTag = renderSavingsTag(plan);

    if (billingCycle === 'monthly') {
      return (
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl font-bold text-text-default dark:text-text-default-dark">
              {price}
            </span>
            <span className="text-text-muted-light dark:text-text-muted-dark">
              {periodLabel}
            </span>
          </div>
          {savingsTag}
        </div>
      );
    }

    const reference = currencyFormatter.format(plan.pricing.monthly * billingDurations[billingCycle]);

    return (
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark">
          <span className="text-lg line-through decoration-red-500/50 decoration-2">{reference}</span>
        </div>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl font-bold text-text-default dark:text-text-default-dark">
            {price}
          </span>
          <span className="text-text-muted-light dark:text-text-muted-dark">
            {periodLabel}
          </span>
        </div>
        {savingsTag}
      </div>
    );
  };

  return (
    <AnimatedPage className="min-h-full">
      <div className="container mx-auto px-4 py-12 text-text-default dark:text-text-default-dark">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight pb-2 bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent">
            {t('servicesPageMainHeading', 'Elige Tu Plan Ideal')}
          </h1>
          <p className="text-xl text-text-muted-light dark:text-text-muted-dark max-w-3xl mx-auto mb-12">
            {t('servicesPageSubheading', 'Planes diseñados para adaptarse a tus objetivos y presupuesto. Todos incluyen garantía de satisfacción.')}
          </p>

          {/* Billing Cycle Selector */}
          <div className="flex flex-wrap justify-center gap-3">
            {billingOptions.map((option) => {
              const isSelected = billingCycle === option.value;
              const discount = option.value === 'quarterly' ? '-10%' : option.value === 'semiannual' ? '-15%' : null;

              return (
                <button
                  key={option.value}
                  onClick={() => setBillingCycle(option.value)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 border-2 ${
                    isSelected
                      ? 'border-primary bg-primary/5 text-primary dark:text-primary-dark'
                      : 'border-transparent bg-neutral-surface-light dark:bg-neutral-surface-dark text-text-muted-light dark:text-text-muted-dark hover:border-primary/30'
                  }`}
                >
                  {option.label}
                  {discount && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-accent text-white'
                      }`}
                    >
                      {discount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan) => {
            const gift = plan.gifts?.[billingCycle];

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 flex flex-col h-full ${
                  plan.popular
                    ? 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary shadow-2xl'
                    : 'bg-neutral-surface-light/50 dark:bg-neutral-surface-dark/50 border border-neutral-border-light dark:border-neutral-border-dark hover:shadow-xl'
                }`}
              >
              {/* Popular Badge */}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    {plan.highlight}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-primary dark:text-primary-dark">
                  {plan.name}
                </h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-4">
                  {plan.description}
                </p>
                {renderPriceDisplay(plan)}
              </div>

              {/* Gift Badge */}
              {gift && (
                <div className="mb-6 p-3 bg-accent/10 border border-accent/30 rounded-lg text-center flex items-center justify-center gap-2">
                  <FaGift className="text-accent" />
                  <p className="text-sm font-semibold text-accent">{gift}</p>
                </div>
              )}

              {/* Features List */}
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        feature.included
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-gray-300/20 text-gray-400'
                      }`}
                    >
                      {feature.included ? <FaCheck size={10} /> : <FaXmark size={10} />}
                    </span>
                    <span
                      className={`text-sm ${
                        feature.included
                          ? 'text-text-default dark:text-text-default-dark'
                          : 'text-text-muted-light dark:text-text-muted-dark line-through'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link to="/contact">
                <button
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-2xl hover:scale-105'
                      : 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </Link>
            </div>
            );
          })}
        </div>

        {/* Additional Benefits Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary dark:text-primary-dark">
            {t('allPlansInclude', 'Todos los Planes Incluyen')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaTrophy />,
                title: t('benefit1Title', 'Garantía de Resultados'),
                desc: t('benefit1Desc', '30 días de garantía'),
              },
              {
                icon: <FaMobileScreen />,
                title: t('benefit2Title', 'App Móvil'),
                desc: t('benefit2Desc', 'Acceso desde cualquier lugar'),
              },
              {
                icon: <FaBullseye />,
                title: t('benefit3Title', 'Seguimiento Progreso'),
                desc: t('benefit3Desc', 'Métricas y estadísticas'),
              },
              {
                icon: <FaLock />,
                title: t('benefit4Title', 'Cancelación Flexible'),
                desc: t('benefit4Desc', 'Sin permanencia'),
              },
              {
                icon: <FaFileExcel />,
                title: t('benefit5Title', 'Excel de Seguimiento'),
                desc: t('benefit5Desc', 'Hoja de control de proceso'),
              },
              {
                icon: <FaWhatsapp />,
                title: t('benefit6Title', 'Comunidad Whatsapp'),
                desc: t('benefit6Desc', 'Grupo exclusivo de apoyo'),
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="text-center p-6 bg-neutral-surface-light/30 dark:bg-neutral-surface-dark/30 rounded-xl border border-neutral-border-light dark:border-neutral-border-dark hover:shadow-lg transition-all duration-300 flex flex-col items-center"
              >
                <div className="text-4xl mb-3 text-primary dark:text-primary-dark">{benefit.icon}</div>
                <h3 className="font-bold mb-2 text-text-default dark:text-text-default-dark">
                  {benefit.title}
                </h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary dark:text-primary-dark">
            {t('servicesPageFAQTitle', 'Preguntas Frecuentes')}
          </h2>
          <div className="space-y-4">
            {[
              {
                q: t('servicesFAQ1Q', '¿Puedo cambiar de plan más adelante?'),
                a: t('servicesFAQ1A', 'Sí, puedes actualizar o cambiar tu plan en cualquier momento sin penalización.'),
              },
              {
                q: t('servicesFAQ2Q', '¿Hay compromiso de permanencia?'),
                a: t('servicesFAQ2A', 'No, todos los planes son sin permanencia. Puedes cancelar cuando quieras.'),
              },
              {
                q: t('servicesFAQ3Q', '¿Qué incluye el análisis biomecánico?'),
                a: t('servicesFAQ3A', 'Evaluación completa de tu postura, movilidad y patrones de movimiento para prevenir lesiones.'),
              },
              {
                q: t('servicesFAQ4Q', '¿Los planes incluyen nutrición?'),
                a: t('servicesFAQ4A', 'Los planes Profesional y Elite incluyen asesoramiento nutricional personalizado completo.'),
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group bg-neutral-surface-light/50 dark:bg-neutral-surface-dark/50 rounded-lg border border-neutral-border-light dark:border-neutral-border-dark overflow-hidden"
              >
                <summary className="cursor-pointer p-4 font-semibold text-text-default dark:text-text-default-dark hover:bg-primary/5 transition-colors list-none flex justify-between items-center">
                  {faq.q}
                  <span className="transform transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="p-4 pt-0 text-text-muted-light dark:text-text-muted-dark">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="max-w-4xl mx-auto text-center p-12 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/30">
          <h2 className="text-3xl font-bold mb-4 text-primary dark:text-primary-dark">
            {t('servicesCTATitle', '¿Listo para Comenzar tu Transformación?')}
          </h2>
          <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-8">
            {t('servicesCTADesc', 'Contáctanos para una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos.')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-all duration-300 hover:shadow-xl hover:scale-105">
                {t('servicesCTAButton', 'Consulta Gratuita')}
              </button>
            </Link>
            <Link to="/testimonials">
              <button className="bg-transparent border-2 border-primary text-primary dark:text-primary-dark px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/10 transition-all duration-300">
                {t('viewTestimonials', 'Ver Testimonios')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ServicesPage;
