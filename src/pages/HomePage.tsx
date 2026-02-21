/**
 * @file HomePage.tsx
 * @description Defines the main landing page (HomePage) of the application.
 * This page is composed of multiple sections to showcase fitness training content in a modern, responsive layout.
 * It utilizes framer-motion for animations and react-i18next for internationalization.
 * Updated for fitness trainer theme with elegant gym aesthetics and teal color palette.
 */
import AnimatedPage from '../components/motion/AnimatedPage';
import HeroSection from '../components/landing/home/HeroSection';
import ForWhomSection from '../components/landing/home/ForWhomSection';
import OutcomesSection from '../components/landing/home/OutcomesSection';
import HowItWorksSection from '../components/landing/home/HowItWorksSection';
import WhatIsItSection from '../components/landing/home/WhatIsItSection';
import InPersonAnalysisSection from '../components/landing/home/InPersonAnalysisSection';
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
    <AnimatedPage className="flex flex-col items-center w-full min-h-full">
      <HeroSection />
      <ForWhomSection />
      <OutcomesSection />
      <HowItWorksSection />
      <WhatIsItSection />
      <InPersonAnalysisSection />
      <FAQSection />
      <ContactSection />
    </AnimatedPage>
  );
};

export default HomePage;
