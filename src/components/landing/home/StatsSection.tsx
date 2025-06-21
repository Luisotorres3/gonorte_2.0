/**
 * @file StatsSection.tsx
 * @description Defines the Stats section for the HomePage.
 * It showcases fitness achievements and statistics in an elegant layout.
 * Designed for fitness trainer theme with teal color palette and dark/light mode support.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface StatItem {
  id: string;
  number: string;
  labelKey: string;
  defaultLabel: string;
  icon: string;
}

const stats: StatItem[] = [
  {
    id: 'stat1',
    number: '500+',
    labelKey: 'statsClients',
    defaultLabel: 'Clientes Transformados',
    icon: '💪'
  },
  {
    id: 'stat2',
    number: '5+',
    labelKey: 'statsYears',
    defaultLabel: 'Años de Experiencia',
    icon: '⭐'
  },
  {
    id: 'stat3',
    number: '98%',
    labelKey: 'statsSuccess',
    defaultLabel: 'Tasa de Éxito',
    icon: '🎯'
  },
  {
    id: 'stat4',
    number: '24/7',
    labelKey: 'statsSupport',
    defaultLabel: 'Soporte Disponible',
    icon: '📱'
  }
];

/**
 * StatsSection component for the landing page.
 * Displays fitness achievements and statistics in an elegant grid layout.
 * @returns {JSX.Element} The rendered StatsSection component.
 */
const StatsSection: React.FC = () => {
  const { t } = useTranslation();

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="w-full bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 dark:from-slate-950 dark:via-teal-950 dark:to-slate-950 py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-10 left-20 w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full opacity-10 blur-xl"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-20 h-20 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full opacity-10 blur-xl"
        animate={{
          y: [0, 15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative container mx-auto px-space-md">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
            {t('statsTitle', 'Resultados que Hablan por Sí Mismos')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('statsSubtitle', 'Estos números representan la dedicación y el compromiso con la excelencia en el entrenamiento personal')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className="text-center group"
              variants={itemVariants}
            >
              <div className="relative">
                {/* Icon */}
                <motion.div
                  className="text-4xl mb-4 inline-block"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.icon}
                </motion.div>

                {/* Number */}
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors duration-300"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                >
                  {stat.number}
                </motion.div>

                {/* Label */}
                <p className="text-gray-300 text-sm md:text-base font-medium">
                  {t(stat.labelKey, stat.defaultLabel)}
                </p>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center space-x-2 text-teal-300 hover:text-white transition-colors duration-300 cursor-pointer">
            <span className="text-lg font-medium">
              {t('statsCTA', '¿Quieres ser parte de estas estadísticas?')}
            </span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </motion.svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection; 