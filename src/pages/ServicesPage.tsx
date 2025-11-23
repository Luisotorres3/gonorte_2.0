import { useTranslation } from 'react-i18next';
import AnimatedPage from '../components/motion/AnimatedPage';

const ServicesPage: React.FC = () => { // Added React.FC type
  const { t } = useTranslation();

  return (
    <AnimatedPage className="min-h-full">
      <div className="container mx-auto px-4 py-8 text-text-default dark:text-text-default-dark min-h-full flex flex-col">
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
        <section className="mb-12">
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

        {/* Group Training Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-primary dark:text-primary-dark">
            {t('servicesGroupTrainingTitle', 'Entrenamiento Grupal')}
          </h2>
          <p className="mb-4">
            {t('servicesGroupTrainingDesc1', 'Únete a nuestras sesiones de entrenamiento grupal donde la motivación y el compañerismo se combinan para crear una experiencia de fitness excepcional. Nuestras clases están diseñadas para todos los niveles, desde principiantes hasta atletas avanzados, y ofrecen una variedad de formatos que incluyen HIIT, entrenamiento funcional, yoga y más.')}
          </p>
          <p>
            {t('servicesGroupTrainingDesc2', 'El entrenamiento grupal no solo te ayuda a mantener la consistencia, sino que también te conecta con una comunidad de personas que comparten tus objetivos de fitness. Nuestros instructores certificados aseguran que cada participante reciba la atención necesaria mientras mantienen el dinamismo y la energía de la clase.')}
          </p>
        </section>

        {/* Rehabilitation & Recovery Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-primary dark:text-primary-dark">
            {t('servicesRehabilitationTitle', 'Rehabilitación y Recuperación')}
          </h2>
          <p className="mb-4">
            {t('servicesRehabilitationDesc1', 'Nuestro programa de rehabilitación y recuperación está diseñado para ayudarte a recuperarte de lesiones y mejorar tu movilidad funcional. Trabajamos en estrecha colaboración con fisioterapeutas y profesionales de la salud para crear programas personalizados que aceleren tu recuperación y prevengan futuras lesiones.')}
          </p>
          <p>
            {t('servicesRehabilitationDesc2', 'Utilizamos técnicas avanzadas de movilidad, ejercicios de estabilización y progresiones graduales para restaurar tu rango de movimiento, fuerza y confianza. Nuestro objetivo es no solo recuperarte, sino hacerte más fuerte y resistente que antes de la lesión.')}
          </p>
        </section>

        {/* Sports Performance Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-primary dark:text-primary-dark">
            {t('servicesSportsPerformanceTitle', 'Rendimiento Deportivo')}
          </h2>
          <p className="mb-4">
            {t('servicesSportsPerformanceDesc1', 'Especializado en mejorar el rendimiento deportivo de atletas de todos los niveles. Nuestros programas están diseñados para optimizar la fuerza, velocidad, agilidad y resistencia específicas de tu deporte. Utilizamos análisis biomecánico y evaluaciones de rendimiento para crear programas que maximicen tu potencial atlético.')}
          </p>
          <p>
            {t('servicesSportsPerformanceDesc2', 'Ya seas un atleta recreativo o competitivo, nuestro enfoque basado en la ciencia te ayudará a mejorar tu técnica, prevenir lesiones y alcanzar nuevos niveles de rendimiento. Trabajamos con deportistas de fútbol, baloncesto, tenis, atletismo y muchos otros deportes.')}
          </p>
        </section>

        {/* Call to Action Section */}
        <section className="mt-space-xl p-space-lg bg-neutral-surface-light/50 dark:bg-neutral-surface-dark/50 rounded-lg border border-neutral-border-light/30 dark:border-neutral-border-dark/30">
          <h2 className="text-2xl font-bold text-center mb-space-md text-primary dark:text-primary-dark">
            {t('servicesCTATitle', '¿Listo para Comenzar tu Transformación?')}
          </h2>
          <p className="text-center text-text-muted-light dark:text-text-muted-dark mb-space-md">
            {t('servicesCTADesc', 'Cada servicio está diseñado para adaptarse a tus necesidades específicas. Contáctanos para una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos de fitness.')}
          </p>
          <div className="text-center">
            <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300">
              {t('servicesCTAButton', 'Solicitar Consulta Gratuita')}
            </button>
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
};

export default ServicesPage;
