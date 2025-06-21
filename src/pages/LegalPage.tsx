/**
 * @file LegalPage.tsx
 * @description Defines the Legal Information page, displaying Terms of Use and Privacy Policy.
 * Content is placeholder text, with internationalized headings.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedPage from '../components/motion/AnimatedPage';
import i18n from '../i18n/config';

/**
 * LegalPage component displays legal documents like Terms of Use and Privacy Policy.
 * Uses placeholder text for the main content of these documents.
 * @returns {JSX.Element} The rendered LegalPage.
 */
const LegalPage: React.FC = () => {
  const { t } = useTranslation();
  const lastUpdatedDate = new Date().toLocaleDateString(i18n.language, { // Use i18n language for date format
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const loremIpsumParagraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const shortLorem = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";

  return (
    <AnimatedPage className="container mx-auto px-space-md py-12">
      <header className="text-center mb-space-lg">
        <h1 className="text-4xl font-bold text-primary dark:text-primary-dark">
          {t('legalPageTitle', 'Legal Information')}
        </h1>
        <p className="text-sm text-text-muted mt-space-xs">
          {t('lastUpdated', 'Last Updated')}: {lastUpdatedDate}
        </p>
      </header>

      <div className="max-w-prose mx-auto space-y-space-xl">
        <section aria-labelledby="terms-of-use-heading">
          <h2 id="terms-of-use-heading" className="text-2xl md:text-3xl font-semibold text-text-default dark:text-text-default-dark mb-space-md">
            {t('termsOfUseTitle', 'Terms of Use')}
          </h2>
          <div className="space-y-space-md text-text-muted dark:text-text-muted-dark text-base leading-relaxed">
            <p>{loremIpsumParagraph}</p>
            <p>{shortLorem}</p>
            <p>{loremIpsumParagraph}</p>
          </div>
        </section>

        <section aria-labelledby="privacy-policy-heading">
          <h2 id="privacy-policy-heading" className="text-2xl md:text-3xl font-semibold text-text-default dark:text-text-default-dark mb-space-md">
            {t('privacyPolicyTitle', 'Privacy Policy')}
          </h2>
          <div className="space-y-space-md text-text-muted dark:text-text-muted-dark text-base leading-relaxed">
            <p>{loremIpsumParagraph}</p>
            <p>{loremIpsumParagraph}</p>
            <p>{shortLorem}</p>
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
};

export default LegalPage;
