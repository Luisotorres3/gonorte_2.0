/**
 * @file LegalPage.tsx
 * @description Legal notice page with localized content (ES/EN/FR).
 */
import AnimatedPage from '../components/motion/AnimatedPage';
import i18n from '../i18n/config';
import { Link } from 'react-router-dom';
import { getLocalizedRoute } from '../router/routes.config';

type Locale = 'es' | 'en' | 'fr';

interface LegalContent {
  title: string;
  intro: string;
  termsTitle: string;
  termsParagraphs: string[];
  dataTitle: string;
  dataBeforePrivacy: string;
  privacyLinkText: string;
  dataAfterPrivacy: string;
  userCommitmentsTitle: string;
  userCommitmentsParagraphs: string[];
  securityTitle: string;
  securityParagraphs: string[];
  claimsTitle: string;
  claimsParagraphs: string[];
  odrTitle: string;
  odrText: string;
  ipTitle: string;
  ipParagraphs: string[];
  externalLinksTitle: string;
  externalLinksParagraphs: string[];
  commentsTitle: string;
  commentsIntro: string;
  commentsList: string[];
  disclaimerTitle: string;
  disclaimerIntro: string;
  disclaimerList: string[];
  lawTitle: string;
  lawText: string;
  contactTitle: string;
  contactText: string;
  closing: string;
  lastUpdatedLabel: string;
}

const LEGAL_CONTENT: Record<Locale, LegalContent> = {
  es: {
    title: 'Aviso Legal',
    intro:
      'En esta sección encontrarás los términos y condiciones que regulan el uso del sitio web de Gonorte.',
    termsTitle: 'Términos de Uso',
    termsParagraphs: [
      'El acceso y uso de esta web atribuye la condición de usuario e implica la aceptación de las condiciones vigentes en cada momento.',
      'La titular se compromete a tratar la información con diligencia y conforme a la normativa aplicable (RGPD, LOPDGDD y LSSI-CE).'
    ],
    dataTitle: 'Datos Personales que Recabamos y Cómo lo Hacemos',
    dataBeforePrivacy: 'Puedes consultar la',
    privacyLinkText: 'Política de Privacidad',
    dataAfterPrivacy:
      'para conocer en detalle las finalidades, bases legales y derechos. Solo solicitamos datos necesarios para atender consultas, gestionar servicios y cumplir obligaciones legales.',
    userCommitmentsTitle: 'Compromisos y Obligaciones de los Usuarios',
    userCommitmentsParagraphs: [
      'El usuario se compromete a utilizar la web conforme a la ley, la buena fe y el orden público.',
      'Queda prohibido el uso del sitio con fines ilícitos, lesivos o que impidan su normal funcionamiento.',
      'No está permitida la reproducción, distribución o modificación de contenidos sin autorización expresa de la titular.'
    ],
    securityTitle: 'Medidas de Seguridad',
    securityParagraphs: [
      'Se aplican medidas técnicas y organizativas adecuadas para proteger la información personal frente a pérdida, alteración o acceso no autorizado.',
      'Las comunicaciones con la web se realizan mediante canales cifrados (HTTPS) siempre que técnicamente sea posible.'
    ],
    claimsTitle: 'Reclamaciones',
    claimsParagraphs: [
      'Puedes remitir reclamaciones por correo electrónico a gonorte.biomechanics@gmail.com indicando nombre, apellidos, servicio y motivo de la reclamación.',
      'Se atenderán conforme a la normativa aplicable en materia de consumo y prestación de servicios.'
    ],
    odrTitle: 'Plataforma de Resolución de Conflictos',
    odrText:
      'También puedes utilizar la plataforma de resolución de litigios de la Comisión Europea: http://ec.europa.eu/consumers/odr/',
    ipTitle: 'Derechos de Propiedad Intelectual e Industrial',
    ipParagraphs: [
      'Los contenidos de esta web están protegidos por derechos de propiedad intelectual e industrial.',
      'Queda prohibida su explotación total o parcial sin autorización expresa de la titular.'
    ],
    externalLinksTitle: 'Enlaces Externos',
    externalLinksParagraphs: [
      'La web puede contener enlaces a sitios de terceros con fines informativos.',
      'No nos responsabilizamos de los contenidos, políticas o prácticas de privacidad de dichos sitios.'
    ],
    commentsTitle: 'Política de Comentarios',
    commentsIntro: 'No se admitirán comentarios con:',
    commentsList: [
      'Contenido ofensivo, difamatorio o discriminatorio.',
      'Datos personales de terceros sin consentimiento.',
      'Publicidad, spam o contenido engañoso.'
    ],
    disclaimerTitle: 'Exclusión de Garantías y Responsabilidad',
    disclaimerIntro: 'La titular no garantiza de forma absoluta:',
    disclaimerList: [
      'La disponibilidad ininterrumpida del sitio.',
      'La ausencia total de virus u otros elementos dañinos.',
      'La inexistencia de incidencias derivadas de terceros o del uso indebido por parte del usuario.'
    ],
    lawTitle: 'Ley Aplicable y Jurisdicción',
    lawText:
      'Las relaciones entre Gonorte y las personas usuarias se rigen por la legislación española, sometiéndose a los juzgados y tribunales que correspondan legalmente.',
    contactTitle: 'Contacto',
    contactText:
      'Para dudas o comentarios sobre este aviso legal, puedes escribir a gonorte.biomechanics@gmail.com.',
    closing: 'Gracias por leer este Aviso Legal.',
    lastUpdatedLabel: 'Última actualización'
  },
  en: {
    title: 'Legal Notice',
    intro: 'This section contains the terms and conditions that govern the use of the Gonorte website.',
    termsTitle: 'Terms of Use',
    termsParagraphs: [
      'Accessing and using this website grants user status and implies acceptance of the conditions in force at any given time.',
      'The owner undertakes to process information diligently and in accordance with applicable regulations (GDPR and eCommerce rules).'
    ],
    dataTitle: 'Personal Data We Collect and How We Do It',
    dataBeforePrivacy: 'Please read our',
    privacyLinkText: 'Privacy Policy',
    dataAfterPrivacy:
      'for detailed information about purposes, legal basis, and user rights. We only request data required to answer inquiries, manage services, and comply with legal obligations.',
    userCommitmentsTitle: 'User Commitments and Obligations',
    userCommitmentsParagraphs: [
      'Users must use the website in accordance with law, good faith, and public order.',
      'Using this website for unlawful or harmful purposes is strictly prohibited.',
      'Reproduction, distribution, or modification of website content without express authorization is not allowed.'
    ],
    securityTitle: 'Security Measures',
    securityParagraphs: [
      'Appropriate technical and organizational safeguards are applied to protect personal information from loss, alteration, or unauthorized access.',
      'Communications with the website are made through encrypted channels (HTTPS) whenever technically possible.'
    ],
    claimsTitle: 'Complaints',
    claimsParagraphs: [
      'You may send complaints by email to gonorte.biomechanics@gmail.com indicating your full name, service, and reason for complaint.',
      'Complaints are handled according to applicable consumer and service regulations.'
    ],
    odrTitle: 'Dispute Resolution Platform',
    odrText:
      'You can also use the European Commission online dispute resolution platform: http://ec.europa.eu/consumers/odr/',
    ipTitle: 'Intellectual and Industrial Property Rights',
    ipParagraphs: [
      'Website content is protected by intellectual and industrial property rights.',
      'Any full or partial exploitation without express authorization from the owner is prohibited.'
    ],
    externalLinksTitle: 'External Links',
    externalLinksParagraphs: [
      'The website may include links to third-party websites for informational purposes.',
      'We are not responsible for the content, privacy policies, or practices of those websites.'
    ],
    commentsTitle: 'Comment Policy',
    commentsIntro: 'Comments with the following will not be accepted:',
    commentsList: [
      'Offensive, defamatory, or discriminatory content.',
      'Personal data of third parties without consent.',
      'Advertising, spam, or misleading content.'
    ],
    disclaimerTitle: 'Disclaimer of Warranties and Liability',
    disclaimerIntro: 'The owner does not fully guarantee:',
    disclaimerList: [
      'Uninterrupted website availability.',
      'Complete absence of viruses or harmful elements.',
      'Absence of incidents caused by third parties or improper user behavior.'
    ],
    lawTitle: 'Applicable Law and Jurisdiction',
    lawText:
      'The relationship between Gonorte and website users is governed by Spanish law and subject to the legally competent courts and tribunals.',
    contactTitle: 'Contact',
    contactText: 'For questions about this legal notice, please write to gonorte.biomechanics@gmail.com.',
    closing: 'Thank you for reading this Legal Notice.',
    lastUpdatedLabel: 'Last updated'
  },
  fr: {
    title: 'Mentions Légales',
    intro:
      'Cette section contient les conditions générales qui régissent l’utilisation du site web de Gonorte.',
    termsTitle: 'Conditions d’Utilisation',
    termsParagraphs: [
      'L’accès et l’utilisation de ce site confèrent la qualité d’utilisateur et impliquent l’acceptation des conditions en vigueur.',
      'La responsable s’engage à traiter les informations avec diligence et conformément à la réglementation applicable (RGPD et règles du commerce électronique).'
    ],
    dataTitle: 'Données Personnelles Collectées et Modalités',
    dataBeforePrivacy: 'Veuillez consulter notre',
    privacyLinkText: 'Politique de Confidentialité',
    dataAfterPrivacy:
      'pour connaître en détail les finalités, bases juridiques et droits. Nous ne demandons que les données nécessaires pour répondre aux demandes, gérer les services et respecter les obligations légales.',
    userCommitmentsTitle: 'Engagements et Obligations des Utilisateurs',
    userCommitmentsParagraphs: [
      'L’utilisateur s’engage à utiliser le site conformément à la loi, à la bonne foi et à l’ordre public.',
      'Toute utilisation illicite ou préjudiciable du site est strictement interdite.',
      'La reproduction, distribution ou modification des contenus sans autorisation expresse est interdite.'
    ],
    securityTitle: 'Mesures de Sécurité',
    securityParagraphs: [
      'Des mesures techniques et organisationnelles appropriées sont appliquées afin de protéger les données personnelles contre la perte, l’altération ou l’accès non autorisé.',
      'Les communications avec le site sont effectuées via des canaux chiffrés (HTTPS) lorsque cela est techniquement possible.'
    ],
    claimsTitle: 'Réclamations',
    claimsParagraphs: [
      'Vous pouvez envoyer une réclamation par email à gonorte.biomechanics@gmail.com en indiquant nom, prénom, service et motif.',
      'Les réclamations sont traitées conformément à la réglementation applicable en matière de consommation et de services.'
    ],
    odrTitle: 'Plateforme de Résolution des Litiges',
    odrText:
      'Vous pouvez également utiliser la plateforme de résolution des litiges de la Commission européenne : http://ec.europa.eu/consumers/odr/',
    ipTitle: 'Droits de Propriété Intellectuelle et Industrielle',
    ipParagraphs: [
      'Les contenus du site sont protégés par des droits de propriété intellectuelle et industrielle.',
      'Toute exploitation totale ou partielle sans autorisation expresse de la responsable est interdite.'
    ],
    externalLinksTitle: 'Liens Externes',
    externalLinksParagraphs: [
      'Le site peut contenir des liens vers des sites tiers à des fins informatives.',
      'Nous ne sommes pas responsables du contenu, des politiques de confidentialité ou des pratiques de ces sites.'
    ],
    commentsTitle: 'Politique de Commentaires',
    commentsIntro: 'Les commentaires suivants ne sont pas autorisés :',
    commentsList: [
      'Contenu offensant, diffamatoire ou discriminatoire.',
      'Données personnelles de tiers sans consentement.',
      'Publicité, spam ou contenu trompeur.'
    ],
    disclaimerTitle: 'Exclusion de Garanties et de Responsabilité',
    disclaimerIntro: 'La responsable ne garantit pas totalement :',
    disclaimerList: [
      'La disponibilité ininterrompue du site.',
      'L’absence totale de virus ou d’éléments nuisibles.',
      'L’absence d’incidents causés par des tiers ou un usage inapproprié de l’utilisateur.'
    ],
    lawTitle: 'Droit Applicable et Juridiction',
    lawText:
      'Les relations entre Gonorte et les utilisateurs du site sont régies par le droit espagnol et soumises aux juridictions légalement compétentes.',
    contactTitle: 'Contact',
    contactText:
      'Pour toute question concernant ces mentions légales, vous pouvez écrire à gonorte.biomechanics@gmail.com.',
    closing: 'Merci d’avoir lu ces Mentions Légales.',
    lastUpdatedLabel: 'Dernière mise à jour'
  }
};

const LegalPage: React.FC = () => {
  const currentLang = (['es', 'en', 'fr'].includes(i18n.language) ? i18n.language : 'es') as Locale;
  const copy = LEGAL_CONTENT[currentLang];

  const lastUpdatedDate = new Date().toLocaleDateString(currentLang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <AnimatedPage className="container mx-auto px-space-md py-12">
      <header className="text-center mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          {copy.title}
        </h1>
        <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'hsl(var(--color-fg-muted))' }}>
          {copy.lastUpdatedLabel}: {lastUpdatedDate}
        </p>
      </header>

      <section className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-radius-lg shadow-md mt-8 space-y-4">
        <p>{copy.intro}</p>

        <h2 className="text-2xl font-semibold mb-2">{copy.termsTitle}</h2>
        {copy.termsParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <h3 className="text-xl font-semibold mt-6 mb-2">{copy.dataTitle}</h3>
        <p>
          {copy.dataBeforePrivacy}{' '}
          <Link to={getLocalizedRoute('privacy', currentLang)} className="text-primary underline font-semibold">
            {copy.privacyLinkText}
          </Link>{' '}
          {copy.dataAfterPrivacy}
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">{copy.userCommitmentsTitle}</h3>
        {copy.userCommitmentsParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <h3 className="text-xl font-semibold mt-6 mb-2">{copy.securityTitle}</h3>
        {copy.securityParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <h3 className="text-xl font-semibold mt-6 mb-2">{copy.claimsTitle}</h3>
        {copy.claimsParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <h3 className="text-xl font-semibold mt-6 mb-2">{copy.odrTitle}</h3>
        <p>
          {copy.odrText.split('http://ec.europa.eu/consumers/odr/')[0]}
          <a href="http://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
            http://ec.europa.eu/consumers/odr/
          </a>
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">{copy.ipTitle}</h3>
        {copy.ipParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <h3 className="text-xl font-semibold mt-6 mb-2">{copy.externalLinksTitle}</h3>
        {copy.externalLinksParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <h3 className="text-xl font-semibold mt-6 mb-2">{copy.commentsTitle}</h3>
        <p>{copy.commentsIntro}</p>
        <ul className="list-disc ml-6">
          {copy.commentsList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">{copy.disclaimerTitle}</h3>
        <p>{copy.disclaimerIntro}</p>
        <ul className="list-disc ml-6">
          {copy.disclaimerList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">{copy.lawTitle}</h3>
        <p>{copy.lawText}</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">{copy.contactTitle}</h3>
        <p>
          {copy.contactText}{' '}
          <a href="mailto:gonorte.biomechanics@gmail.com" className="text-primary underline">
            gonorte.biomechanics@gmail.com
          </a>
          .
        </p>

        <p className="mt-8">{copy.closing}</p>
      </section>
    </AnimatedPage>
  );
};

export default LegalPage;
