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
        {t('aboutTitlePage', 'Gonorte - About Me')}
      </h1>
      <div className="max-w-3xl mx-auto text-text-default dark:text-text-default-dark space-y-space-md text-left">
        {/* TODO: Add trainer image here - potentially in a floated div or a two-column layout */}
        <h2 className="text-3xl font-semibold mb-space-md text-primary dark:text-primary-dark">
          {t('aboutSectionMainHeading', 'About Me')}
        </h2>
        <div className="text-lg mb-8">
          {t('aboutParagraph1')}
        </div>
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-primary dark:text-primary-dark mb-2">🧭 {t('aboutParagraph2').split('\n')[0]}</h3>
          <p className="text-lg">{t('aboutParagraph2').split('\n').slice(1).join('\n')}</p>
        </div>
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-primary dark:text-primary-dark mb-2">🌍 {t('aboutParagraph3').split('\n')[0]}</h3>
          <p className="text-lg">{t('aboutParagraph3').split('\n').slice(1).join('\n')}</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-primary dark:text-primary-dark mb-2">💡 {t('aboutParagraph4').split('\n')[0]}</h3>
          <div className="text-lg space-y-2">
            {t('aboutParagraph4').split('\n').slice(1).map((line, index) => {
              if (line.trim().startsWith('•')) {
                return <p key={index}>{line}</p>;
              }
              return null;
            })}
          </div>
        </div>
        <h2 className="text-3xl font-semibold mb-space-md text-primary dark:text-primary-dark mt-space-xl">
          {t('aboutSectionCertifications', 'Training and Background')}
        </h2>
        <p>{t('aboutParagraph5')}</p>
        <h2 className="text-3xl font-semibold mb-space-md text-primary dark:text-primary-dark mt-space-xl">
          {t('aboutSectionPhilosophy', 'Gonorte Philosophy')}</h2>
        <p>{t('aboutParagraph6')}</p>
      </div>
    </AnimatedPage>
  );
};

export default AboutPage;
