/**
 * @file ProfileSection.tsx
 * @description Defines the Profile section for the HomePage.
 * It showcases Gonorte's profile with photo and description in an elegant layout.
 * Designed for fitness trainer theme with teal color palette and dark/light mode support.
 */
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getLocalizedRoute } from '../../../router/routes.config';
import { FaArrowRight } from 'react-icons/fa6';
import perfilImg from '../../../assets/perfil.webp';

/**
 * ProfileSection component for the landing page.
 * Displays Gonorte's profile with photo and description.
 * @returns {JSX.Element} The rendered ProfileSection component.
 */
const ProfileSection = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'es';

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
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900 dark:to-cyan-900 max-w-sm w-full min-h-[400px] mx-auto flex items-center justify-center">
                  <img
                    src={perfilImg}
                    alt={t('profilePhotoAlt', 'Entrenadora personal sonriendo')}
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('profileDescription1', 'Soy una apasionada del fitness y la salud integral. Mi misión es ayudarte a descubrir tu mejor versión a través de un enfoque equilibrado que combina entrenamiento físico, nutrición consciente y bienestar mental.')}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                {t('profileDescription2', 'Con años de experiencia y múltiples certificaciones, he desarrollado un método único que se adapta a tus necesidades específicas, ya sea que busques perder peso, ganar fuerza, recuperarte de una lesión o simplemente mejorar tu calidad de vida.')}
              </p>
            </div>

            <div className="pt-6">
              <Link 
                to={getLocalizedRoute('about', currentLang)}
                className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t('profileReadMore', 'Leer más sobre mí')}
                <FaArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default ProfileSection; 