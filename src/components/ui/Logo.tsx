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
 * @param {string} [props.className] - Optional CSS classes for the span element.
 */
const GonorteLogoText: React.FC<{ className?: string }> = ({ className }) => (
  <span
    style={{ fontSize: '2rem', fontWeight: 'bold' }}
    className={`text-primary-DEFAULT dark:text-primary-dark ${className}`}
  >
    Gonorte
  </span>
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
