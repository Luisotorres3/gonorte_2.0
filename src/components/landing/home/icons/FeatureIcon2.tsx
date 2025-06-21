/**
 * @file FeatureIcon2.tsx
 * @description A placeholder icon for a feature.
 */
import React from 'react';

/**
 * Placeholder feature icon (e.g., a shield or abstract shape).
 * @param {React.SVGProps<SVGSVGElement>} props SVG properties.
 * @returns {JSX.Element} The rendered SVG icon.
 */
const FeatureIcon2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default FeatureIcon2;
