/**
 * @file HomePage.tsx
 * @description Defines the main landing page (HomePage) of the application.
 * This page is composed of multiple sections to showcase content in a modern, responsive layout.
 * It utilizes framer-motion for animations and react-i18next for internationalization.
 */
import React from 'react';
import AnimatedPage from '../components/motion/AnimatedPage';
import HeroSection from '../components/landing/home/HeroSection';
import TestimonialsSection from '../components/landing/home/TestimonialsSection';
// import SecondaryCTASection from '../components/landing/home/SecondaryCTASection'; // Removed as per requirement
import AboutSection from '../components/landing/home/AboutSection';
import ServicesSection from '../components/landing/home/ServicesSection';
import ContactSection from '../components/landing/home/ContactSection';

/**
 * The main landing page of the application, composed of several content sections.
 * Each section is animated and styled using the application's design tokens.
 * @returns {JSX.Element} The rendered HomePage component.
 */
const HomePage: React.FC = () => {
  return (
    <AnimatedPage className="flex flex-col items-center w-full">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
    </AnimatedPage>
  );
};

export default HomePage;
