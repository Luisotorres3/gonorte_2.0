/**
 * @file NotFoundPage.tsx
 * @description This file defines the 404 Not Found page component.
 * It displays when users navigate to a route that doesn't exist.
 */
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getLocalizedRoute } from '../router/routes.config';

/**
 * Displays the 404 Not Found page.
 * @returns {JSX.Element} The rendered NotFoundPage component.
 */
const NotFoundPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'es';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-background"
    >
      <div className="text-center max-w-md mx-auto px-4">
        {/* 404 Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-8xl font-bold text-primary mb-4"
        >
          404
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-text-primary mb-4"
        >
          {t('pageNotFoundTitle', 'Página No Encontrada')}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-text-muted mb-8"
        >
          {t('pageNotFoundMessage', 'Lo sentimos, la página que buscas no existe.')}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to={getLocalizedRoute('home', currentLang)}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            {t('navHome', 'Inicio')}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            {t('goBackButton', 'Volver')}
          </button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            {t('helpfulLinks', 'Enlaces útiles')}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={getLocalizedRoute('about', currentLang)}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              {t('navAbout', 'Sobre Mí')}
            </Link>
            <Link
              to={getLocalizedRoute('services', currentLang)}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              {t('navServices', 'Servicios')}
            </Link>
            <Link
              to={getLocalizedRoute('contact', currentLang)}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              {t('navContact', 'Contacto')}
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage; 