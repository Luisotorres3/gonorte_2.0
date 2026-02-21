/**
 * @file TestimonialsPage.tsx
 * @description Testimonials page – real client reviews.
 */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { getLocalizedRoute } from '../router/routes.config';

const TestimonialsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'es';

  const reviews = [
    {
      id: 1,
      name: 'Olalla Iglesias',
      date: 'Reseña verificada',
      content: t('testimonialsReview1Content', 'Carmen me ha acompañado desde el primer minuto en mi proceso de cambio. Siempre tiene palabras de ánimo y prepara cada revisión con muchísimo cariño. Además, cuenta con un repertorio infinito de vídeos para cada situación o duda que pueda surgir, ¡lo cual es increíble! Sin duda, sin su apoyo no estaría donde estoy hoy'),
    },
    {
      id: 2,
      name: 'Maria García',
      date: 'Reseña verificada',
      content: t('testimonialsReview2Content', 'En solo un mes noté cambios físicos y un gran aumento de fuerza. Carmen no es solo una entrenadora, es una amiga que te apoya, te escucha y te anima en todo el proceso. Sin duda, es la mejor. Además, adapta las rutinas según tus necesidades y el tiempo que tengas. ¡Recomendadísima!'),
    },
    {
      id: 3,
      name: 'Jose Antonio Perales',
      date: 'Reseña verificada',
      content: t('testimonialsReview3Content', 'Carmen se preocupa enormemente tanto a nivel profesional como personal. Con esfuerzo y trabajo y siguiendo sus instrucciones parece que voy consiguiendo lo que pensaba que no conseguiría: ir aliviando de mis lesiones'),
    },
    {
      id: 4,
      name: 'Gema Rodríguez',
      date: 'Reseña verificada',
      content: t('testimonialsReview4Content', 'Entrenar con Carmen ha sido un antes y un después para mí. Está siempre pendiente, corrige cada ejercicio y te motiva desde el minuto uno, retándote de una forma que te hace sentir capaz y llena de energía. Y lo más sorprendente es que, aun siendo a distancia, nunca imaginé que un entrenamiento online pudiera ser tan efectivo. En menos de tres meses he conseguido resultados que no imaginaba, y sé que esto es solo el principio. Estoy feliz de haberla encontrado y no pienso dejarla. Es una entrenadora maravillosa'),
    },
    {
      id: 5,
      name: 'Andrea Mora',
      date: 'Reseña verificada',
      content: t('testimonialsReview5Content', 'La dedicación es excepcional, siempre atenta a cada detalle y comprometida con nuestros avances. Sin duda, seguiré entrenando con ella.'),
    },
    {
      id: 6,
      name: 'Segui Mora',
      date: 'Reseña verificada',
      content: t('testimonialsReview6Content', 'Desde agosto he comenzado a hacer ejercicio con mi entrenadora personal Carmen, me ha motivado a tope desde el minuto uno, siempre pendiente de mí, poniéndome objetivos de manera gradual… Es una gran profesional implicándose en su trabajo.'),
    },
    {
      id: 7,
      name: 'Sandra Prieto',
      date: 'Reseña verificada',
      content: t('testimonialsReview7Content', 'Ha sido muy sencillo trabajar con ella. Siempre atenta y cuidando cada detalle de la programación y animándome a trabajar duro. Una verdadera profesional con la que sin duda volvería a trabajar'),
    },
    {
      id: 8,
      name: 'Nelia Sanchez',
      date: 'Reseña verificada',
      content: t('testimonialsReview8Content', 'Lo recomiendo, es un equipo de profesionales!!!'),
    },
    {
      id: 9,
      name: 'isabel Domínguez',
      date: 'Reseña verificada',
      content: t('testimonialsReview9Content', 'Entrenar con Carmen ha superado todas mis expectativas. Es una gran profesional y, sobre todo, una persona muy cercana que siempre se preocupa por cada detalle. Está pendiente en todo momento, aconseja, escucha y motiva cuando más lo necesitas. Gracias a su apoyo constante no me rindo y estoy más motivada con el deporte que nunca.'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-8 min-h-full"
      style={{ backgroundColor: 'hsl(var(--color-bg-base))' }}
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            {t('testimonialsPageTitle', 'Casos reales')}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'hsl(var(--color-fg-muted))' }}>
            {t('testimonialsPageSubtitle', 'Cada proceso es único. Estos mensajes reflejan experiencia real, acompañamiento y progreso sostenido.')}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-sm font-semibold mt-5">
            <FaGoogle className="w-4 h-4 text-secondary-700 dark:text-secondary-300" aria-hidden="true" />
            <span>{t('testimonialsPageBadge', 'Reseñas verificadas de Google')}</span>
          </div>
        </motion.div>

        {/* Tarjetas */}
        <motion.section variants={itemVariants} className="mb-10 sm:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                variants={itemVariants}
                className="flex flex-col rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border-base bg-bg-surface"
                style={{
                  backgroundColor: 'hsl(var(--color-bg-surface))',
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0 border border-primary-200 dark:border-primary-800">
                      <span className="text-primary-700 dark:text-primary-300 font-bold text-lg">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-fg-base truncate">{review.name}</p>
                      <p className="text-xs text-fg-muted">{t('testimonialsPageReviewVerified', review.date)}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-secondary-700 dark:text-secondary-300 whitespace-nowrap">
                    <FaGoogle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t('testimonialsPageGoogleLabel', 'Google')}</span>
                  </span>
                </div>

                <div className="mb-3 text-yellow-500 tracking-wide" aria-label={t('testimonialsPageStarsAria', '5 estrellas')}>★★★★★</div>

                <p className="flex-1 mb-3 leading-relaxed text-fg-muted">
                  {review.content}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section variants={itemVariants} className="text-center pb-12">
          <Link
            to={getLocalizedRoute('videoCall', currentLang)}
            className="inline-block px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            {t('testimonialsPageCTA', 'Agendar videollamada inicial')}
          </Link>
        </motion.section>

      </div>
    </motion.div>
  );
};

export default TestimonialsPage;