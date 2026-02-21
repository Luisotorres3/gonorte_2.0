/**
 * @file Logo.tsx
 * @description Defines a reusable image Logo component.
 * The logo links to the homepage. Now supports internationalized routes.
 */
import { MouseEvent } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocalizedRoute } from '../../router/routes.config';

/**
 * Props for the Logo component.
 */
export interface LogoProps {
  /** Optional CSS classes to apply to the NavLink wrapper. */
  className?: string;
  /** Optional CSS classes to apply directly to the image logo. */
  textClassName?: string;
  /** Optional logo source for light mode. */
  lightLogoSrc?: string;
  /** Optional logo source for dark mode. */
  darkLogoSrc?: string;
}

/**
 * Logo component that displays the application's image logo.
 * It links to the homepage and includes an accessible label.
 *
 * @param {LogoProps} props - The component props.
 * @returns {JSX.Element} The rendered Logo component.
 */
const Logo = ({
  className = '',
  textClassName = '',
  lightLogoSrc,
  darkLogoSrc,
}: LogoProps) => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const currentLang = i18n.language || 'es';
  const homeRoute = getLocalizedRoute('home', currentLang);
  const logoClassName = textClassName || 'h-12 lg:h-14 w-auto';
  const assetBase = import.meta.env.BASE_URL;
  const lightSrc = lightLogoSrc ?? `${assetBase}logos/logo_negro_solotexto.png`;
  const darkSrc = darkLogoSrc ?? `${assetBase}logos/logo_blanco_solotexto.png`;

  const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (normalizePath(pathname) === normalizePath(homeRoute)) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <NavLink
      to={getLocalizedRoute('home', currentLang)}
      onClick={handleLogoClick}
      aria-label={t('ariaLabelGoToHome', 'Gonorte - Go to homepage')}
      className={`group inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface dark:focus-visible:ring-offset-surface-dark rounded-sm ${className}`}
    >
      <img
        src={lightSrc}
        alt={t('ariaLabelGoToHome', 'Gonorte - Go to homepage')}
        className={`${logoClassName} block dark:hidden`}
      />
      <img
        src={darkSrc}
        alt={t('ariaLabelGoToHome', 'Gonorte - Go to homepage')}
        className={`${logoClassName} hidden dark:block`}
      />
    </NavLink>
  );
};

export default Logo;
