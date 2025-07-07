/**
 * @file Logo.tsx
 * @description Defines a reusable Logo component featuring a space-themed SVG.
 * The logo links to the homepage.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * The Gonorte Logo text.
 * @param {{ className?: string }} props - Component props.
 * @param {string} [props.className] - Optional CSS classes for the SVG element.
 */
const GonorteLogoText: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 200 50"
    xmlns="http://www.w3.org/2000/svg"
    className={`text-primary ${className}`}
    style={{ height: '2rem' }} // Adjusted for better visual consistency with previous font size
  >
    {/* Modern, sporty lines and shapes */}
    <line x1="10" y1="45" x2="190" y2="45" stroke="currentColor" strokeWidth="2" />
    <path d="M 15 10 Q 20 5, 25 10 T 35 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M 165 10 Q 170 5, 175 10 T 185 10" stroke="currentColor" strokeWidth="1.5" fill="none" />

    {/* Subtle gym element - dumbbell shape integrated into text styling or as a small icon */}
    {/* Example: Small dumbbell icon near the text. Position and size need careful tuning. */}
    <circle cx="30" cy="25" r="3" fill="currentColor" />
    <rect x="32" y="23.5" width="8" height="3" fill="currentColor" />
    <circle cx="42" cy="25" r="3" fill="currentColor" />

    <text
      x="50%"
      y="30"
      fontFamily="sans-serif"
      fontSize="24" // Adjust size as needed within the SVG coordinate system
      fontWeight="bold"
      textAnchor="middle"
      fill="currentColor"
    >
      Gonorte
    </text>
  </svg>
);

/**
 * Props for the Logo component.
 */
export interface LogoProps {
  /** Optional CSS classes to apply to the NavLink wrapper. */
  className?: string;
  /** Optional CSS classes to apply directly to the text logo. */
  textClassName?: string;
}

/**
 * Logo component that displays the application's text logo.
 * It links to the homepage and includes an accessible label.
 *
 * @param {LogoProps} props - The component props.
 * @returns {JSX.Element} The rendered Logo component.
 */
const Logo: React.FC<LogoProps> = ({ className = '', textClassName = '' }) => {
  const { t } = useTranslation();

  return (
    <NavLink
      to="/"
      aria-label={t('ariaLabelGoToHome', 'Gonorte - Go to homepage')}
      className={`group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface dark:focus-visible:ring-offset-surface-dark rounded-sm ${className}`}
    >
      <GonorteLogoText className={textClassName} />
    </NavLink>
  );
};

export default Logo;
