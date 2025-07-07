/**
 * @file Tooltip.tsx
 * @description Defines a reusable Tooltip component with animation and customizable positioning.
 * It appears when the user hovers over or focuses on its child element.
 */
import React, { useState, useId } from 'react';
import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Props for the Tooltip component.
 */
export interface TooltipProps {
  /** The content to display inside the tooltip. Can be a string or any React node. */
  content: React.ReactNode;
  /** The child element that will trigger the tooltip. Must be a single ReactElement. */
  children: ReactElement;
  /** The position of the tooltip relative to the child element. Defaults to 'top'. */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Additional className for custom styling of the tooltip container. */
  className?: string;
}

/**
 * A Tooltip component that displays a message when its child element is hovered or focused.
 * It uses Framer Motion for animations and can be positioned on any side of the child.
 *
 * @param {TooltipProps} props The component props.
 * @returns {JSX.Element} The rendered Tooltip component with its child.
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className = '',
}) => {
  const [isVisible] = useState(false);
  const tooltipId = useId(); // Generate a unique ID for aria-describedby

  // Base classes for the tooltip popup
  const tooltipBaseClasses =
    'absolute z-50 px-space-sm py-space-xs text-sm text-text-default-dark dark:text-text-default-light bg-neutral-surface-dark dark:bg-neutral-surface-light rounded-radius-md shadow-lg whitespace-nowrap transition-colors duration-300';

  // Classes for positioning the tooltip and its arrow
  let positionClasses = '';
  // Arrow color should match the tooltip background
  let arrowClasses = 'absolute w-2 h-2 bg-neutral-surface-dark dark:bg-neutral-surface-light transform rotate-45 transition-colors duration-300';

  switch (position) {
    case 'bottom':
      positionClasses = 'top-full mt-2 left-1/2 -translate-x-1/2';
      arrowClasses += ' -top-1 left-1/2 -translate-x-1/2';
      break;
    case 'left':
      positionClasses = 'right-full mr-2 top-1/2 -translate-y-1/2';
      arrowClasses += ' -right-1 top-1/2 -translate-y-1/2';
      break;
    case 'right':
      positionClasses = 'left-full ml-2 top-1/2 -translate-y-1/2';
      arrowClasses += ' -left-1 top-1/2 -translate-y-1/2';
      break;
    case 'top':
    default:
      positionClasses = 'bottom-full mb-2 left-1/2 -translate-x-1/2';
      arrowClasses += ' -bottom-1 left-1/2 -translate-x-1/2';
      break;
  }

  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            className={`${tooltipBaseClasses} ${positionClasses}`}
            initial={{ opacity: 0, scale: 0.9, y: position === 'top' ? 5 : (position === 'bottom' ? -5 : 0) }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: position === 'top' ? 5 : (position === 'bottom' ? -5 : 0) }}
            transition={{ duration: 0.2 }}
          >
            {content}
            <div className={arrowClasses} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
