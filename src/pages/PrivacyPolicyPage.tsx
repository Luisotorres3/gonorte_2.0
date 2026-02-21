import AnimatedPage from '../components/motion/AnimatedPage';

const PrivacyPolicyPage: React.FC = () => (
  <AnimatedPage className="container mx-auto px-space-md py-12">
    <header className="text-center mb-10 sm:mb-14">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-4">
        Política de Privacidad
      </h1>
      <p className="text-base sm:text-lg max-w-2xl mx-auto text-fg-muted">Última actualización: 9 de julio de 2025</p>
    </header>

    <section className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-radius-lg shadow-md mt-8">
      <p>En Gonorte, la privacidad de nuestros usuarios es prioritaria. Los datos personales que nos facilites serán tratados con la máxima confidencialidad y conforme a la normativa vigente. Solo se recabarán los datos estrictamente necesarios para la prestación de los servicios y nunca serán cedidos a terceros sin tu consentimiento, salvo obligación legal.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Responsable del Tratamiento</h2>
      <p>Carmen María González Ortega<br/>Email: <a href="mailto:gonorte.biomechanics@gmail.com" className="text-primary underline">gonorte.biomechanics@gmail.com</a></p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Finalidad del Tratamiento</h2>
      <p>Los datos personales recogidos podrán ser utilizados para gestionar tu registro, responder a tus consultas, enviarte información relevante sobre nuestros servicios y cumplir con obligaciones legales.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Legitimación</h2>
      <p>La base legal para el tratamiento de tus datos es el consentimiento, la ejecución de un contrato y el cumplimiento de obligaciones legales.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Conservación de los Datos</h2>
      <p>Los datos personales proporcionados se conservarán mientras se mantenga la relación comercial o durante los años necesarios para cumplir con las obligaciones legales.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Destinatarios</h2>
      <p>No se cederán datos a terceros salvo obligación legal.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Derechos del Usuario</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Acceso: Saber qué datos tuyos tratamos.</li>
        <li>Rectificación: Solicitar la modificación de tus datos si son inexactos.</li>
        <li>Cancelación: Solicitar la eliminación de tus datos.</li>
        <li>Oposición: Oponerte a que tratemos tus datos.</li>
        <li>Limitación: Solicitar la limitación del tratamiento de tus datos.</li>
        <li>Portabilidad: Solicitar la portabilidad de tus datos a otro responsable.</li>
      </ul>
      <p>Puedes ejercer estos derechos enviando un correo a <a href="mailto:gonorte.biomechanics@gmail.com" className="text-primary underline">gonorte.biomechanics@gmail.com</a>.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Medidas de Seguridad</h2>
      <p>Gonorte ha adoptado todas las medidas técnicas y organizativas necesarias para garantizar la seguridad e integridad de los datos personales que trate, así como para evitar su pérdida, alteración y/o acceso por parte de terceros no autorizados.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Cambios en la Política de Privacidad</h2>
      <p>Gonorte se reserva el derecho a modificar la presente política para adaptarla a novedades legislativas o jurisprudenciales, así como a prácticas de la industria. En dichos supuestos, se anunciarán en esta página los cambios introducidos con razonable antelación a su puesta en práctica.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Contacto</h2>
      <p>Para cualquier duda o consulta sobre esta política de privacidad, puedes escribir a <a href="mailto:gonorte.biomechanics@gmail.com" className="text-primary underline">gonorte.biomechanics@gmail.com</a>.</p>
    </section>
  </AnimatedPage>
);

export default PrivacyPolicyPage; 