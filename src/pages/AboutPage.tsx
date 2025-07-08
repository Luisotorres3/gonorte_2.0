/**
 * @file AboutPage.tsx
 * @description Defines the "About Us" page for the application.
 * This page provides information about the project, its purpose, and the technologies used.
 * It uses framer-motion for entry animations and react-i18next for internationalization.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedPage from '../components/motion/AnimatedPage'; // Import the new component

/**
 * The About page of the application.
 * It provides information about the team and the project's purpose and technologies used.
 * Content is internationalized and the page uses animations.
 * @returns {JSX.Element} The rendered AboutPage component.
 */
const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <AnimatedPage className="container mx-auto px-space-md py-12 min-h-full flex flex-col">
      <h1 className="text-4xl font-bold mb-space-lg text-primary text-center">
        {t('aboutTitle', 'Gonorte - About Me')}
      </h1>
      <div className="max-w-3xl mx-auto text-text-default dark:text-text-default-dark space-y-space-md text-left">
        {/* TODO: Add trainer image here - potentially in a floated div or a two-column layout */}
        <h2 className="text-3xl font-semibold mb-space-md text-primary dark:text-primary-dark">
          {t('aboutSectionMainHeading', 'Conoce a tu Entrenador')}
        </h2>
        <p>
          {t('aboutParagraph1', 'Hola, soy [Nombre del Entrenador], tu entrenador personal y coach de fitness en Gonorte.')}
        </p>
        <p>
          {t('aboutParagraph2', 'Desde que tengo memoria, el deporte y la actividad física han sido una parte fundamental de mi vida. Esta pasión me llevó a estudiar ciencias del deporte y a certificarme como entrenador personal, con el objetivo de compartir mis conocimientos y ayudar a otros a descubrir los beneficios de un cuerpo activo y una mente sana.')}
        </p>
        <p>
          {t('aboutParagraph3', 'Mi misión es ayudarte a alcanzar tus objetivos de fitness, ya sea perder peso, ganar músculo, mejorar tu resistencia o simplemente adoptar un estilo de vida más saludable. Creo en un enfoque personalizado, adaptando cada programa de entrenamiento y plan nutricional a tus necesidades, preferencias y capacidades individuales.')}
        </p>
        <p>
          {t('aboutParagraph4', 'Con años de experiencia y una dedicación continua al estudio del bienestar y el rendimiento humano, estoy aquí para guiarte y motivarte en cada paso de tu transformación. Juntos, podemos superar obstáculos, establecer metas realistas y celebrar cada logro en tu camino hacia una mejor versión de ti mismo.')}
        </p>
        
        <h2 className="text-3xl font-semibold mb-space-md text-primary dark:text-primary-dark mt-space-xl">
          {t('aboutSectionCertifications', 'Certificaciones y Especialidades')}
        </h2>
        <p>
          {t('aboutParagraph5', 'Mi formación incluye certificaciones en entrenamiento personal, nutrición deportiva, rehabilitación funcional y coaching de vida. Me especializo en entrenamiento de fuerza, pérdida de peso, rehabilitación post-lesión y preparación física para deportes específicos.')}
        </p>
        
        <h2 className="text-3xl font-semibold mb-space-md text-primary dark:text-primary-dark mt-space-xl">
          {t('aboutSectionPhilosophy', 'Mi Filosofía')}
        </h2>
        <p>
          {t('aboutParagraph6', 'Creo firmemente que el fitness no es solo una cuestión física, sino un viaje integral que abarca mente, cuerpo y espíritu. Mi enfoque se basa en la educación, la motivación sostenible y la creación de hábitos duraderos que transformen tu vida más allá del gimnasio.')}
        </p>
        
        <div className="mt-space-xl p-space-md bg-neutral-surface-light/50 dark:bg-neutral-surface-dark/50 rounded-lg border border-neutral-border-light/30 dark:border-neutral-border-dark/30">
          <h3 className="text-xl font-semibold mb-space-sm text-primary dark:text-primary-dark">
            {t('aboutSectionCommitment', 'Mi Compromiso Contigo')}
          </h3>
          <p className="text-text-muted-light dark:text-text-muted-dark">
            {t('aboutParagraph7', 'Te prometo un acompañamiento personalizado, honesto y comprometido. Juntos trabajaremos para alcanzar tus objetivos, superando cualquier obstáculo y celebrando cada pequeño logro en el camino hacia tu mejor versión.')}
          </p>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default AboutPage;
