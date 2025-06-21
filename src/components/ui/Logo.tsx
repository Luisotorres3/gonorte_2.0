/**
 * @file Logo.tsx
 * @description Defines a reusable Logo component featuring a space-themed SVG.
 * The logo links to the homepage.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * The SVG part of the Logo.
 * This can be customized or replaced with a more complex SVG or image.
 * @param {{ className?: string }} props - Component props.
 * @param {string} [props.className] - Optional CSS classes for the SVG element.
 */
const CosmoLogoSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 160 60" // Aumentado significativamente el ancho
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true" // Decorative, as the NavLink provides the label
  >
    {/* Planet Body */}
    <circle cx="30" cy="30" r="18" className="fill-primary dark:fill-primary-dark group-hover:fill-primary-dark dark:group-hover:fill-primary transition-colors" />

    {/* Planet Ring */}
    <ellipse
      cx="30"
      cy="30"
      rx="35"
      ry="12"
      className="stroke-secondary dark:stroke-secondary-dark group-hover:stroke-accent dark:group-hover:stroke-accent-dark fill-none transition-colors"
      strokeWidth="3"
      transform="rotate(-25 30 30)"
    />

    {/* Small Star */}
    <path
      d="M55 15 L53 20 L58 22 L53 24 L55 29 L57 24 L62 22 L57 20 Z"
      className="fill-accent dark:fill-accent-dark group-hover:fill-primary dark:group-hover:fill-primary-dark transition-colors"
    />

    {/* Company Name Text - "Cosmo" */}
    <text
      x="75"
      y="35"
      fontFamily="Arial, sans-serif"
      fontSize="18"
      fontWeight="bold"
      className="fill-text-default dark:fill-text-default-dark group-hover:fill-primary dark:group-hover:fill-primary-dark transition-colors"
    >
      Cosmo
    </text>
  </svg>
);

/**
 * Props for the Logo component.
 */
export interface LogoProps {
  /** Optional CSS classes to apply to the NavLink wrapper. */
  className?: string;
  /** Optional CSS classes to apply directly to the SVG logo. */
  svgClassName?: string;
}

/**
 * Logo component that displays the application's SVG logo.
 * It links to the homepage and includes an accessible label.
 *
 * @param {LogoProps} props - The component props.
 * @returns {JSX.Element} The rendered Logo component.
 */
const Logo: React.FC<LogoProps> = ({ className = '', svgClassName = 'h-8 w-auto' }) => {
  const { t } = useTranslation();

  return (
    <NavLink
      to="/"
      aria-label={t('ariaLabelGoToHome', 'Cosmo Template - Go to homepage')}
      className={`group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface dark:focus-visible:ring-offset-surface-dark rounded-sm ${className}`}
    >
      <CosmoLogoSvg className={svgClassName} />
    </NavLink>
  );
};

export default Logo;
