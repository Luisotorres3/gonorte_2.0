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
    <AnimatedPage className="container mx-auto px-space-md py-12 text-center">
      <h1 className="text-4xl font-bold mb-space-lg text-primary">{t('aboutTitle')}</h1>
      <div className="max-w-3xl mx-auto text-text-muted space-y-space-md">
        <p>
          We are a passionate team dedicated to crafting beautiful and functional web experiences.
          Our mission is to explore new frontiers in technology and design, pushing the boundaries of what's possible.
        </p>
        <p>
          This application serves as a showcase of our skills in React, TypeScript, Tailwind CSS, Framer Motion, and i18next,
          all brought together to create a seamless and engaging user journey.
        </p>
        <p>
          Join us as we navigate the digital universe, building innovative solutions one line of code at a time.
        </p>
      </div>
    </AnimatedPage>
  );
};

export default AboutPage;
