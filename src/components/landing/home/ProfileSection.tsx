/**
 * @file ProfileSection.tsx
 * @description Defines the Profile section for the HomePage.
 * It showcases Gonorte's profile with photo and description in an elegant layout.
 * Designed for fitness trainer theme with teal color palette and dark/light mode support.
 */
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import perfilImg from '../../../assets/perfil.webp';

/**
 * ProfileSection component for the landing page.
 * Displays Gonorte's profile with photo and description.
 * @returns {JSX.Element} The rendered ProfileSection component.
 */
const ProfileSection = () => {
  const { t } = useTranslation();

  const certifications = [
    { id: 1, name: t('certification1', 'Entrenadora Personal Certificada'), icon: '🏆' },
    { id: 2, name: t('certification2', 'Especialista en Nutrición Deportiva'), icon: '🥗' },
    { id: 3, name: t('certification3', 'Instructora de Yoga y Pilates'), icon: '🧘‍♀️' },
    { id: 4, name: t('certification4', 'Coach de Bienestar Integral'), icon: '💚' }
  ];

  const achievements = [
    { id: 1, number: '500+', label: t('achievement1', 'Clientes Transformados') },
    { id: 2, number: '5+', label: t('achievement2', 'Años de Experiencia') },
    { id: 3, number: '98%', label: t('achievement3', 'Tasa de Satisfacción') }
  ];

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 py-20 md:py-32">
      <div className="container mx-auto px-space-md">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-teal-800 dark:from-slate-200 dark:to-teal-300 bg-clip-text text-transparent">
            {t('profileTitle', 'Conoce a Gonorte')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('profileSubtitle', 'Tu entrenadora personal dedicada a transformar vidas a través del fitness y el bienestar')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
              
              {/* Main photo container */}
              <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-4 shadow-2xl">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900 dark:to-cyan-900 max-w-sm w-full min-h-[500px] mx-auto flex items-center justify-center">
                  <img
                    src={perfilImg}
                    alt={t('profilePhotoAlt', 'Entrenadora personal sonriendo')}
                    className="w-full h-full object-contain rounded-2xl shadow-lg"
                  />
                </div>
              </div>

              {/* Floating achievement badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-3 rounded-full shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="text-2xl">🏆</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white p-3 rounded-full shadow-lg"
                initial={{ scale: 0, rotate: 180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span className="text-2xl">💪</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Introduction */}
            <div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                {t('profileName', 'Gonorte')}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {t('profileDescription', 'Soy una entrenadora personal apasionada por el fitness y el bienestar. Con más de 5 años de experiencia, he ayudado a cientos de personas a alcanzar sus metas de salud y transformar sus vidas a través del ejercicio físico y la nutrición equilibrada.')}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('profileMission', 'Mi misión es inspirar y guiar a cada persona en su viaje hacia una vida más saludable, proporcionando programas personalizados que se adapten a sus necesidades, objetivos y estilo de vida.')}
              </p>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                {t('profileCertifications', 'Certificaciones y Especialidades')}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    className="flex items-center space-x-3 p-3 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-100 dark:border-slate-600"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <span className="text-2xl">{cert.icon}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {cert.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                {t('profileAchievements', 'Logros Destacados')}
              </h4>
              <div className="flex space-x-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                  >
                    <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                      {achievement.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-3 rounded-full font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                {t('profileCTA', 'Conoce Mi Historia Completa')}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection; 