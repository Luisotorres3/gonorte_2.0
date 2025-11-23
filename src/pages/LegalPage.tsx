/**
 * @file LegalPage.tsx
 * @description Defines the Legal Information page, displaying Terms of Use and Privacy Policy.
 * Content is placeholder text, with internationalized headings.
 */
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

      <section className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-radius-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-2">Términos de Uso</h2>
        <p>En este espacio, el USUARIO podrá encontrar toda la información relativa a los términos y condiciones legales que definen las relaciones entre los usuarios y nosotros como responsables de esta web. Como usuario, es importante que conozcas estos términos antes de continuar tu navegación.</p>
        <p className="mt-2">Carmen María González Ortega, como responsable de esta web, asume el compromiso de procesar la información de nuestros usuarios y clientes con plenas garantías y cumplir con los requisitos nacionales y europeos que regulan la recopilación y uso de los datos personales de nuestros usuarios. Esta web, por tanto, cumple rigurosamente con el RGPD (REGLAMENTO (UE) 2016/679 de protección de datos) y la LSSI-CE (Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico).</p>
        <p className="mt-2">Las presentes Condiciones Generales regulan el uso (incluyendo el mero acceso) de las páginas de la web, integrantes del sitio web https://gonorte.com de Carmen María González Ortega, incluidos los contenidos y servicios puestos a disposición en ellas. Toda persona que acceda a la web acepta someterse a las Condiciones Generales vigentes en cada momento del portal.</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">DATOS PERSONALES QUE RECABAMOS Y CÓMO LO HACEMOS</h3>
        <p>
          Leer{' '}
          <a
            href="/#/privacidad"
            rel="noopener noreferrer"
            className="text-primary underline font-semibold"
          >
            Política de Privacidad
          </a>
        </p>
        <p>En Gonorte, la privacidad de nuestros usuarios es prioritaria. Los datos personales que nos facilites serán tratados con la máxima confidencialidad y conforme a la normativa vigente. Solo se recabarán los datos estrictamente necesarios para la prestación de los servicios y nunca serán cedidos a terceros sin tu consentimiento, salvo obligación legal.</p>
        <p>Los datos personales recogidos podrán ser utilizados para gestionar tu registro, responder a tus consultas, enviarte información relevante sobre nuestros servicios y cumplir con obligaciones legales. Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición enviando un correo a <a href="mailto:gonorte.biomechanics@gmail.com" className="text-primary underline">gonorte.biomechanics@gmail.com</a>.</p>
        <p>Para más información sobre el tratamiento de tus datos, consulta esta sección o escríbenos a nuestro correo de contacto.</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">COMPROMISOS Y OBLIGACIONES DE LOS USUARIOS</h3>
        <p>El Usuario queda informado y acepta que el acceso a la presente web no supone, en modo alguno, el inicio de una relación contractual con Carmen María González Ortega. De esta forma, el usuario se compromete a utilizar el sitio web, sus servicios y contenidos sin contravenir la legislación vigente, la buena fe y el orden público.</p>
        <p>Queda prohibido el uso de la web con fines ilícitos o lesivos, o que puedan causar perjuicio o impedir el normal funcionamiento del sitio web. Respecto a los contenidos de esta web, se prohíbe su reproducción, distribución o modificación, total o parcial, sin la autorización explícita de sus legítimos titulares. Cualquier vulneración de los derechos del prestador o de los titulares de los contenidos, o su utilización con fines comerciales o publicitarios, queda expresamente prohibida.</p>
        <p>En la utilización de la web, el Usuario se compromete a no llevar a cabo ninguna conducta que pueda dañar la imagen, los intereses o los derechos de Carmen María González Ortega o de terceros, o que pueda dañar, inutilizar o sobrecargar el portal, o impedir su uso normal.</p>
        <p>El Usuario debe ser consciente de que las medidas de seguridad en Internet no son completamente fiables y que, por tanto, Carmen María González Ortega no puede garantizar la inexistencia de virus u otros elementos que puedan producir alteraciones en los sistemas informáticos (software y hardware) del usuario o en sus documentos electrónicos.</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">MEDIDAS DE SEGURIDAD</h3>
        <p>Los datos personales comunicados por el usuario a https://gonorte.com pueden ser almacenados en bases de datos automatizadas o no, cuya titularidad corresponde en exclusiva a https://gonorte.com, asumiendo todas las medidas técnicas, organizativas y de seguridad que garantizan la confidencialidad, integridad y calidad de la información, conforme a la normativa vigente en protección de datos.</p>
        <p>La comunicación entre usuarios y https://gonorte.com utiliza un canal seguro cifrado mediante protocolos https, garantizando la confidencialidad de los datos de los usuarios.</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">RECLAMACIONES</h3>
        <p>Carmen María González Ortega informa que existen hojas de reclamación a disposición de usuarios y clientes. El Usuario podrá realizar reclamaciones solicitando la hoja de reclamación o remitiendo un correo electrónico a <a href="mailto:contacto@gonorte.com" className="text-primary underline">contacto@gonorte.com</a>, indicando su nombre y apellidos, el servicio adquirido y los motivos de su reclamación.</p>
        <p>Para notificar una reclamación, puede hacerlo también mediante correo electrónico a <a href="mailto:gonorte.biomechanics@gmail.com" className="text-primary underline">gonorte.biomechanics@gmail.com</a>, indicando:</p>
        <ul className="list-disc ml-6">
          <li>Servicio/producto</li>
          <li>Fecha de adquisición</li>
          <li>Nombre y apellidos</li>
          <li>Domicilio</li>
          <li>Fecha</li>
          <li>Motivo de la reclamación</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">PLATAFORMA DE RESOLUCIÓN DE CONFLICTO</h3>
        <p>Como usuario, puedes también utilizar la plataforma de resolución de litigios de la Comisión Europea: <a href="http://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary underline">http://ec.europa.eu/consumers/odr/</a></p>

        <h3 className="text-xl font-semibold mt-6 mb-2">DERECHOS DE PROPIEDAD INTELECTUAL E INDUSTRIAL</h3>
        <p>Según los artículos 8 y 32.1.2 de la Ley de Propiedad Intelectual, queda prohibida la reproducción, distribución y comunicación pública de los contenidos de esta web sin autorización de Carmen María González Ortega. El usuario se compromete a respetar los derechos de propiedad intelectual e industrial.</p>
        <p>El usuario conoce y acepta que la totalidad del sitio web —textos, software, contenidos, podcasts, fotografías, material audiovisual y gráficos— está protegida por derechos de autor, marcas y propiedad industrial, conforme a los tratados internacionales y la legislación española.</p>
        <p>Si considera que se ha producido una violación de sus derechos de propiedad intelectual, deberá notificarlo a Carmen María González Ortega indicando:</p>
        <ul className="list-disc ml-6">
          <li>Datos personales del solicitante</li>
          <li>Representación, en su caso</li>
          <li>Contenidos protegidos y ubicación</li>
          <li>Acreditación de los derechos alegados</li>
          <li>Declaración de veracidad</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">ENLACES EXTERNOS</h3>
        <p>En el portal https://gonorte.com pueden existir enlaces a sitios web de terceros. El único fin de los enlaces es facilitar el acceso al usuario. No nos hacemos responsables de los contenidos o resultados derivados del uso de tales enlaces.</p>
        <p>Algunos enlaces pueden recopilar datos de navegación y generar perfiles. Esta información se recoge de forma anónima y el usuario no es identificado. Se recomienda revisar las políticas de privacidad de los sitios de destino.</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">POLÍTICA DE COMENTARIOS</h3>
        <p>En zonas de la web donde se permiten comentarios, no se admitirán:</p>
        <ul className="list-disc ml-6">
          <li>Contenidos no relacionados con la temática</li>
          <li>Difamaciones, agravios, insultos o ataques personales</li>
          <li>Contenido engañoso o falso</li>
          <li>Información personal sin consentimiento</li>
          <li>Comentarios promocionales o spam</li>
          <li>Comentarios anónimos o múltiples con distintos alias</li>
          <li>Comentarios que busquen forzar un debate</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">EXCLUSIÓN DE GARANTÍAS Y RESPONSABILIDAD</h3>
        <p>El prestador no ofrece garantías ni se hace responsable de:</p>
        <ul className="list-disc ml-6">
          <li>Disponibilidad o funcionamiento de la web y sus servicios</li>
          <li>Existencia de virus o software malicioso</li>
          <li>Uso ilícito, negligente o contrario a estas condiciones</li>
          <li>Calidad o utilidad de servicios prestados por terceros</li>
          <li>Daños derivados del uso ilegal o indebido de la web</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">LEY APLICABLE Y JURISDICCIÓN</h3>
        <p>Las relaciones entre Carmen María González Ortega y los usuarios de https://gonorte.com están sometidas a la legislación española y a los tribunales de la misma</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">CONTACTO</h3>
        <p>Para dudas o comentarios sobre estas condiciones legales, puedes escribir a <a href="mailto:gonorte.biomechanics@gmail.com" className="text-primary underline">gonorte.biomechanics@gmail.com</a>.</p>
        <p className="mt-8">De parte del equipo de Gonorte Biomechanics, muchas gracias por dedicar tu tiempo a leer este Aviso Legal.</p>
      </section>
    </AnimatedPage>
  );
};

export default LegalPage;
