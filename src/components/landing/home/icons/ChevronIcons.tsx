/**
 * @file ChevronIcons.tsx
 * @description Defines Chevron Left and Right SVG icons for UI navigation.
 */
import React from 'react';

/**
 * ChevronLeftIcon component.
 * @param {React.SVGProps<SVGSVGElement>} props SVG properties.
 * @returns {JSX.Element} The rendered SVG icon.
 */
export const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6" // Default size, can be overridden by props
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

/**
 * ChevronRightIcon component.
 * @param {React.SVGProps<SVGSVGElement>} props SVG properties.
 * @returns {JSX.Element} The rendered SVG icon.
 */
export const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6" // Default size, can be overridden by props
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);
