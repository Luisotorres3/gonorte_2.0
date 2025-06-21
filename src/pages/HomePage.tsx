/**
 * @file HomePage.tsx
 * @description Defines the main landing page (HomePage) of the application.
 * This page is composed of multiple sections to showcase fitness training content in a modern, responsive layout.
 * It utilizes framer-motion for animations and react-i18next for internationalization.
 * Updated for fitness trainer theme with elegant gym aesthetics and teal color palette.
 */
import React from 'react';
import AnimatedPage from '../components/motion/AnimatedPage';
import HeroSection from '../components/landing/home/HeroSection';
import FeaturesSection from '../components/landing/home/FeaturesSection';
import StatsSection from '../components/landing/home/StatsSection';
import ProfileSection from '../components/landing/home/ProfileSection';
import ServicesSection from '../components/landing/home/ServicesSection';
import TestimonialsSection from '../components/landing/home/TestimonialsSection';
import FAQSection from '../components/landing/home/FAQSection';
import ContactSection from '../components/landing/home/ContactSection';

/**
 * The main landing page of the application, composed of several content sections.
 * Each section is animated and styled using the application's design tokens.
 * Updated for fitness trainer theme with elegant gym aesthetics and teal color palette.
 * @returns {JSX.Element} The rendered HomePage component.
 */
const HomePage: React.FC = () => {
  return (
    <AnimatedPage className="flex flex-col items-center w-full">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <ProfileSection />
      <ServicesSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </AnimatedPage>
  );
};

export default HomePage;
