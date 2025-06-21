import React from 'react'; // Added React import for JSX
import { useTranslation } from 'react-i18next';
import AnimatedPage from '@/components/motion/AnimatedPage';

const ServicesPage: React.FC = () => { // Added React.FC type
  const { t } = useTranslation();

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-8 text-text-default dark:text-text-default-dark">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary dark:text-primary-dark">
          {t('servicesPageMainHeading', 'Nuestros Servicios')}
        </h1>

        {/* Personal Training Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-primary dark:text-primary-dark">
            {t('servicesPersonalTrainingTitle', 'Entrenamiento Personalizado')}
          </h2>
          <p className="mb-4">
            {t('servicesPersonalTrainingDesc1', 'Ofrecemos programas de entrenamiento individualizados, diseñados específicamente para ayudarte a alcanzar tus metas de fitness. Ya sea que busques perder peso, ganar masa muscular, mejorar tu rendimiento deportivo o simplemente adoptar un estilo de vida más activo, trabajaremos contigo para crear un plan que se ajuste a tus necesidades, habilidades y preferencias.')}
          </p>
          <p>
            {t('servicesPersonalTrainingDesc2', 'Nuestras sesiones de entrenamiento personalizado incluyen seguimiento continuo, ajustes programáticos basados en tu progreso y la motivación necesaria para superar tus límites. Contáctanos para una consulta inicial y descubre cómo podemos transformar tu cuerpo y mente.')}
          </p>
        </section>

        {/* Online Routines Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-primary dark:text-primary-dark">
            {t('servicesOnlineRoutinesTitle', 'Rutinas Online')}
          </h2>
          <p className="mb-4">
            {t('servicesOnlineRoutinesDesc1', 'Accede a nuestros programas de entrenamiento desde cualquier lugar y en cualquier momento con nuestras rutinas online. Perfectas para quienes prefieren la flexibilidad de entrenar en casa o mientras viajan, nuestras rutinas digitales vienen con guías detalladas, videos explicativos y soporte para asegurar que ejecutes cada ejercicio de manera segura y efectiva.')}
          </p>
          <p>
            {t('servicesOnlineRoutinesDesc2', 'Ofrecemos una variedad de rutinas que se adaptan a diferentes niveles de experiencia y objetivos, desde programas de fuerza y acondicionamiento hasta rutinas de movilidad y bienestar general. Todo accesible a través de nuestra plataforma intuitiva.')}
          </p>
        </section>

        {/* Nutritional Coaching Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-primary dark:text-primary-dark">
            {t('servicesNutritionalCoachingTitle', 'Asesoramiento Nutricional')}
          </h2>
          <p className="mb-4">
            {t('servicesNutritionalCoachingDesc1', 'El complemento perfecto para tu entrenamiento. Nuestro servicio de asesoramiento nutricional te enseñará cómo alimentar tu cuerpo de manera inteligente para maximizar tus resultados y mejorar tu salud general. No se trata de dietas restrictivas, sino de construir hábitos alimenticios sostenibles.')}
          </p>
          <p>
            {t('servicesNutritionalCoachingDesc2', 'Desarrollamos planes de comidas personalizados, te educamos sobre la importancia de los macronutrientes y micronutrientes, y te ofrecemos el apoyo continuo para que la nutrición se convierta en una parte integral y placentera de tu estilo de vida saludable.')}
          </p>
        </section>
      </div>
    </AnimatedPage>
  );
};

export default ServicesPage;
