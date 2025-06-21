/**
 * @file FeatureIcon3.tsx
 * @description A placeholder icon for a feature.
 */
import React from 'react';

/**
 * Placeholder feature icon (e.g., a trending up arrow or abstract shape).
 * @param {React.SVGProps<SVGSVGElement>} props SVG properties.
 * @returns {JSX.Element} The rendered SVG icon.
 */
const FeatureIcon3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export default FeatureIcon3;
