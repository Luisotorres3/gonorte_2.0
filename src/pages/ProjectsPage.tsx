/**
 * @file ProjectsPage.tsx
 * @description Defines the "Projects" page, which showcases a list of projects.
 * Each project is displayed as a card with a name, description, and technologies used.
 * The page uses framer-motion for animations and react-i18next for internationalization.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion'; // Keep for inner card animations
import AnimatedPage from '../components/motion/AnimatedPage'; // Import the new component

/**
 * @typedef {object} Project
 * @property {number} id - The unique identifier for the project.
 * @property {string} name - The name of the project.
 * @property {string} description - A brief description of the project.
 * @property {string[]} tech - An array of technologies used in the project.
 */

/**
 * Placeholder data for projects showcased on the page.
 * @type {Project[]}
 */
const projects = [
  { id: 1, name: "Cosmic Ray Analyzer", description: "A tool for visualizing cosmic ray data from various observatories.", tech: ["React", "D3.js", "Python"] },
  { id: 2, name: "Stellar Navigation UI", description: "Next-generation user interface for interstellar spacecraft.", tech: ["TypeScript", "WebGL", "Rust"] },
  { id: 3, name: "Planet Colonization Sim", description: "A simulation game about establishing a colony on a new planet.", tech: ["C#", "Unity", "Blender"] },
];

/**
 * The Projects page, displaying a collection of project cards.
 * Each card shows project details and technologies used.
 * The page is animated and uses internationalization.
 * @returns {JSX.Element} The rendered ProjectsPage component.
 */
const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();

  // TODO: Implement pagination or infinite scrolling if the number of projects grows significantly.
  // TODO: Add filtering or sorting options for projects (e.g., by technology, date).
  return (
    <AnimatedPage className="container mx-auto px-space-md py-12">
      <h1 className="text-4xl font-bold mb-10 text-center text-primary">{t('projectsTitle')}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-space-xl">
        {projects.map((project, index) => (
          // Each card can still have its own motion component for staggered animations
          <motion.div
            key={project.id}
            className="bg-surface p-space-lg rounded-radius-lg shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-space-sm text-primary">{project.name}</h2>
            <p className="text-text-muted mb-space-md">{project.description}</p>
            <div className="flex flex-wrap gap-space-sm">
              {project.tech.map(techName => (
                <span key={techName} className="px-2 py-1 bg-primary/20 text-primary-dark dark:bg-primary/30 dark:text-primary-light text-xs rounded-radius-full">
                  {techName}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedPage>
  );
};

export default ProjectsPage;
