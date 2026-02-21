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
    <section className="w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 py-12 sm:py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-space-md">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-800 to-teal-800 dark:from-slate-200 dark:to-teal-300 bg-clip-text text-transparent">
            {t('profileTitle', 'Conoce a Gonorte')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-fg-muted max-w-3xl mx-auto">
            {t('profileSubtitle', 'Tu entrenadora personal dedicada a transformar vidas a través del fitness y el bienestar')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
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
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900 dark:to-cyan-900 max-w-sm w-full min-h-[300px] sm:min-h-[400px] mx-auto flex items-center justify-center">
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
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert">
              <p className="text-fg-muted leading-relaxed text-sm sm:text-base md:text-lg">
                Soy Carmen, especialista en biomecánica deportiva. Mi enfoque parte de una idea simple: el movimiento es medicina, pero solo cuando se adapta a tu cuerpo, a tu contexto y a tu punto de partida.
              </p>
              <p className="text-fg-muted leading-relaxed mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">
                Trabajo con personas que conviven con molestias, tensión o inseguridad al entrenar. Mi objetivo es ayudarte a construir una base de postura y fuerza para moverte mejor, con más confianza y resultados sostenibles.
              </p>
            </div>

            <div className="pt-4 sm:pt-6">
              <Link 
                to={getLocalizedRoute('about', currentLang)}
                className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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