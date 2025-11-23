import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaDumbbell, FaBowlFood, FaHouse, FaStethoscope, FaFutbol, FaCheck, FaUsers } from 'react-icons/fa6';

interface Service {
  id: string;
  titleKey: string;
  defaultTitle: string;
  descriptionKey: string;
  defaultDescription: string;
  icon: React.ReactNode;
  features: string[];
  price?: string;
  popular?: boolean;
}

const services: Service[] = [
  {
    id: 'personal-training',
    titleKey: 'service1Title',
    defaultTitle: 'Entrenamiento Personalizado',
    descriptionKey: 'service1Desc',
    defaultDescription: 'Planes completamente personalizados adaptados a tus objetivos, nivel y estilo de vida.',
    icon: <FaDumbbell />,
    features: [
      'Evaluación inicial completa',
      'Plan de entrenamiento personalizado',
      'Seguimiento semanal',
      'Ajustes según progreso',
      'Soporte 24/7'
    ],
    price: 'Desde $80/mes'
  },
  {
    id: 'nutrition-coaching',
    titleKey: 'service2Title',
    defaultTitle: 'Asesoría Nutricional',
    descriptionKey: 'service2Desc',
    defaultDescription: 'Guía nutricional personalizada para complementar tu entrenamiento y maximizar resultados.',
    icon: <FaBowlFood />,
    features: [
      'Análisis de composición corporal',
      'Plan nutricional personalizado',
      'Recetas y menús semanales',
      'Educación nutricional',
      'Seguimiento de progreso'
    ],
    price: 'Desde $60/mes'
  },
  {
    id: 'online-classes',
    titleKey: 'service3Title',
    defaultTitle: 'Clases Online',
    descriptionKey: 'service3Desc',
    defaultDescription: 'Entrena desde donde quieras con clases en vivo y rutinas grabadas de alta calidad.',
    icon: <FaHouse />,
    features: [
      'Clases en vivo diarias',
      'Biblioteca de rutinas',
      'Diferentes niveles',
      'Comunidad online',
      'Acceso 24/7'
    ],
    price: 'Desde $40/mes',
    popular: true
  },
  {
    id: 'rehabilitation',
    titleKey: 'service4Title',
    defaultTitle: 'Rehabilitación y Recuperación',
    descriptionKey: 'service4Desc',
    defaultDescription: 'Programas especializados para recuperación de lesiones y mejora de movilidad.',
    icon: <FaStethoscope />,
    features: [
      'Evaluación de lesiones',
      'Programa de rehabilitación',
      'Ejercicios de movilidad',
      'Prevención de recaídas',
      'Seguimiento médico'
    ],
    price: 'Desde $100/mes'
  },
  {
    id: 'sports-training',
    titleKey: 'service5Title',
    defaultTitle: 'Entrenamiento Deportivo',
    descriptionKey: 'service5Desc',
    defaultDescription: 'Mejora tu rendimiento deportivo con entrenamiento específico para tu disciplina.',
    icon: <FaFutbol />,
    features: [
      'Análisis de rendimiento',
      'Entrenamiento específico',
      'Mejora de habilidades',
      'Preparación física',
      'Planificación de temporada'
    ],
    price: 'Desde $90/mes'
  },
  {
    id: 'group-sessions',
    titleKey: 'service6Title',
    defaultTitle: 'Sesiones Grupales',
    descriptionKey: 'service6Desc',
    defaultDescription: 'Entrena en grupo con amigos o familiares para mayor motivación y diversión.',
    icon: <FaUsers />,
    features: [
      'Sesiones de 2-6 personas',
      'Precios reducidos',
      'Entrenamiento divertido',
      'Motivación grupal',
      'Horarios flexibles'
    ],
    price: 'Desde $30/persona'
  }
];

const ServicesSection: React.FC = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut" as const
      }
    },
  };

  return (
    <section className="w-full py-20 lg:py-32 bg-surface dark:bg-neutral-surface-dark">
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
            {t('servicesTitle', 'Mis Servicios')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('servicesSubtitle', 'Ofrezco una amplia gama de servicios personalizados para ayudarte a alcanzar tus objetivos fitness de manera efectiva y sostenible')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {t('popularBadge', 'Más Popular')}
                  </span>
                </div>
              )}

              {/* Service Card */}
              <div className={`bg-surface dark:bg-neutral-surface-dark rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border ${
                service.popular 
                  ? 'border-teal-500 dark:border-teal-400' 
                  : 'border-gray-300 dark:border-teal-700'
              } relative overflow-hidden h-full`}>
                
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className="text-5xl mb-6 relative z-10 text-teal-600 dark:text-teal-400">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white relative z-10">
                  {t(service.titleKey, service.defaultTitle)}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed relative z-10">
                  {t(service.descriptionKey, service.defaultDescription)}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 relative z-10">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-200">
                      <span className="text-teal-500 mr-3 flex-shrink-0">
                        <FaCheck className="w-5 h-5" />
                      </span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price */}
                {service.price && (
                  <div className="mb-6 relative z-10">
                    <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                      {service.price}
                    </p>
                  </div>
                )}

                {/* CTA Button */}
                <motion.button
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 relative z-10 ${
                    service.popular
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-teal-50 dark:hover:bg-teal-900/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('serviceCTA', 'Comenzar')}
                </motion.button>

                {/* Decorative Element */}
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {t('servicesCTA', '¿No encuentras lo que buscas? Contáctame para un plan personalizado')}
          </p>
          <motion.button
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('servicesCTAButton', 'Consulta Personalizada')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection; 