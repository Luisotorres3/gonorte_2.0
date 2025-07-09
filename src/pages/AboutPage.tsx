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
          Sobre mí
        </h2>
        <div className="text-lg mb-8">
          Soy Carmen, fundadora y CEO de Gonorte Biomechanics, tu entrenadora personal y técnica en movimiento humano.<br/>
          Graduada en Ciencias de la Actividad Física y el Deporte por la Universidad de Granada en 2022, y titulada con un Máster de Tecnología Humana y Medicina Deportiva por la Universidad Alemana de Colonia en 2025, una de las universidades más prestigiosas de Europa en tecnología aplicada a la salud y el movimiento humano.
        </div>
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-primary dark:text-primary-dark mb-2">🧭 Misión</h3>
          <p className="text-lg">Optimizar el movimiento humano a través de la ciencia.<br/>Nuestra misión es ayudar a cada persona —desde deportistas hasta población general— a moverse mejor, con menos dolor y mayor eficiencia a través de tecnología biomecánica.</p>
        </div>
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-primary dark:text-primary-dark mb-2">🌍 Visión</h3>
          <p className="text-lg">Ser referentes en biomecánica aplicada al entrenamiento y la salud a nivel nacional.<br/>Queremos liderar una nueva forma de entender el ejercicio físico, donde el análisis del movimiento sea la base.</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-primary dark:text-primary-dark mb-2">💡 Valores</h3>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li><b>Ciencia aplicada:</b> Nos guiamos por evidencia científica actualizada, sin dejarnos llevar por modas y mitos del fitness. Usamos tecnología para el análisis y la evaluación de la situación de cada persona.</li>
            <li><b>Individualización:</b> Cada cuerpo es único. Por eso, nuestros planes se adaptan 100% a las necesidades de cada persona.</li>
            <li><b>Prevención:</b> Detectar antes de corregir. Creemos en el poder del análisis para prevenir lesiones y disfunciones.</li>
            <li><b>Educación y cercanía:</b> No solo entrenamos, también enseñamos. Queremos que nuestros clientes entiendan su cuerpo y aprendan a cuidarlo. Escuchamos, acompañamos y apoyamos en cada paso.</li>
          </ul>
        </div>
        <h2 className="text-3xl font-semibold mb-space-md text-primary dark:text-primary-dark mt-space-xl">
          {t('aboutSectionCertifications', 'Formación y Trayectoria')}
        </h2>
        <p>{t('aboutParagraph5')}</p>
        <h2 className="text-3xl font-semibold mb-space-md text-primary dark:text-primary-dark mt-space-xl">
          {t('aboutSectionPhilosophy', 'Filosofía Gonorte')}</h2>
        <p>{t('aboutParagraph6')}</p>
      </div>
    </AnimatedPage>
  );
};

export default AboutPage;
