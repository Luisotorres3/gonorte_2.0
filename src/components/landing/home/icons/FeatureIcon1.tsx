/**
 * @file FeatureIcon1.tsx
 * @description A placeholder icon for a feature.
 */
import React from 'react';

/**
 * Placeholder feature icon (e.g., a gear or abstract shape).
 * @param {React.SVGProps<SVGSVGElement>} props SVG properties.
 * @returns {JSX.Element} The rendered SVG icon.
 */
const FeatureIcon1: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-12 h-12 text-primary mb-space-sm" // Example styling
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

export default FeatureIcon1;
