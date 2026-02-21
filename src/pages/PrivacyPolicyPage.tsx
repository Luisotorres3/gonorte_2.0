import { useTranslation } from 'react-i18next';
import AnimatedPage from '../components/motion/AnimatedPage';

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useTranslation();

  const purposeItems = t('privacyPage.purposeItems', { returnObjects: true, defaultValue: [] }) as string[];
  const legalBasisItems = t('privacyPage.legalBasisItems', { returnObjects: true, defaultValue: [] }) as string[];
  const rightsItems = t('privacyPage.rightsItems', { returnObjects: true, defaultValue: [] }) as string[];

  return (
    <AnimatedPage className="container mx-auto px-space-md py-12">
      <header className="text-center mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          {t('privacyPage.title', 'Política de Privacidad')}
        </h1>
        <p className="text-base sm:text-lg max-w-2xl mx-auto text-fg-muted">
          {t('privacyPage.lastUpdated', 'Última actualización: 21 de febrero de 2026')}
        </p>
      </header>

      <section className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-radius-lg shadow-md mt-8">
        <p>{t('privacyPage.intro')}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">{t('privacyPage.controllerTitle')}</h2>
        <p>
          Carmen María González Ortega
          <br />
          {t('privacyPage.controllerLabel')}{' '}
          <a href="mailto:gonorte.biomechanics@gmail.com" className="text-primary underline">gonorte.biomechanics@gmail.com</a>
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">{t('privacyPage.dataTitle')}</h2>
        <p>{t('privacyPage.dataText')}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">{t('privacyPage.purposeTitle')}</h2>
        <ul className="list-disc ml-6 mb-4">
          {purposeItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">{t('privacyPage.legalBasisTitle')}</h2>
        <ul className="list-disc ml-6 mb-4">
          {legalBasisItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{t('privacyPage.legalBasisNote')}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">{t('privacyPage.retentionTitle')}</h2>
        <p>{t('privacyPage.retentionText')}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">{t('privacyPage.recipientsTitle')}</h2>
        <p>{t('privacyPage.recipientsText')}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">{t('privacyPage.transfersTitle')}</h2>
        <p>{t('privacyPage.transfersText')}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">{t('privacyPage.rightsTitle')}</h2>
        <ul className="list-disc ml-6 mb-4">
          {rightsItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{t('privacyPage.rightsText')}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">{t('privacyPage.marketingTitle')}</h2>
        <p>{t('privacyPage.marketingText')}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">{t('privacyPage.cookiesTitle')}</h2>
        <p>{t('privacyPage.cookiesText')}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">{t('privacyPage.securityTitle')}</h2>
        <p>{t('privacyPage.securityText')}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">{t('privacyPage.changesTitle')}</h2>
        <p>{t('privacyPage.changesText')}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">{t('privacyPage.contactTitle')}</h2>
        <p>
          {t('privacyPage.contactText')}{' '}
          <a href="mailto:gonorte.biomechanics@gmail.com" className="text-primary underline">gonorte.biomechanics@gmail.com</a>
          .
        </p>
      </section>
    </AnimatedPage>
  );
};

export default PrivacyPolicyPage;
