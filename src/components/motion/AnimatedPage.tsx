/**
 * @file AnimatedPage.tsx
 * @description Defines a reusable component that wraps page content with standard animations.
 * This component uses Framer Motion to apply consistent entry and exit animations to pages.
 */
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Props for the AnimatedPage component.
 */
interface AnimatedPageProps {
  /** The content to be rendered within the animated wrapper. */
  children: ReactNode;
  /** Optional CSS classes to apply to the motion.div wrapper. */
  className?: string;
}

/**
 * A reusable component that wraps its children with predefined Framer Motion animations.
 * Provides consistent page transition effects (fade in, slide up on entry; fade out, slide down on exit).
 *
 * @param {AnimatedPageProps} props The component props.
 * @returns {JSX.Element} The rendered animated page wrapper.
 */
const AnimatedPage = ({ children, className }: AnimatedPageProps) => {
  return (
    <motion.div
      className={`min-h-full w-full ${className || ''}`} // Ensure full height and width
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} // Consistent exit animation
      transition={{ duration: 0.3 }} // Short and smooth duration
      style={{ overflowX: 'hidden' }} // Added overflowX hidden
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
