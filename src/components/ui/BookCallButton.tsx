/**
 * @file BookCallButton.tsx
 * @description Reusable button that navigates to the dedicated BookCallPage
 * where Calendly's InlineWidget is embedded directly in the site.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocalizedRoute } from '../../router/routes.config';

interface BookCallButtonProps {
  label: string;
  className?: string;
  /** Optional icon rendered before the label */
  icon?: React.ReactNode;
}

const BookCallButton: React.FC<BookCallButtonProps> = ({ label, className, icon }) => {
  const { i18n } = useTranslation();

  return (
    <Link
      to={getLocalizedRoute('videoCall', i18n.language)}
      className={className}
    >
      {icon && <span className="inline-flex items-center">{icon}</span>}
      {label}
    </Link>
  );
};

export default BookCallButton;
