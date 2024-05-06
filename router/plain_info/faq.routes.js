const questions = [
    {
      question: '¿Cuál es el propósito de esta plataforma?',
      reply: 'Esta plataforma tiene como objetivo recolectar información de los egresados (ex-estudiantes) de nuestra institución, con el fin de mantenernos actualizados sobre su trayectoria académica y profesional después de graduarse. Esto nos ayudará a fortalecer los vínculos con nuestros antiguos alumnos y a mejorar nuestros programas educativos basados en sus experiencias y retroalimentación.'
    },
    {
      question: '¿Quién puede registrarse en esta plataforma?',
      reply: 'Cualquier persona que haya sido estudiante y se haya graduado de nuestra institución puede registrarse en esta plataforma de egresados.'
    },
    {
      question: '¿Qué tipo de información se solicita a los egresados?',
      reply: 'Se solicita información como el año de graduación, el programa o carrera que estudiaron, si están realizando estudios de posgrado, títulos o certificaciones obtenidas, experiencia laboral actual y pasada, habilidades adquiridas durante sus estudios que han sido útiles en su carrera profesional, entre otros detalles relevantes.'
    },
    {
      question: '¿Cómo puedo crear una cuenta en la plataforma?',
      reply: 'Para crear una cuenta, simplemente dirígete a la sección de "Registro" en el sitio web y completa el formulario con tus datos personales y académicos. Una vez que envíes el formulario, recibirás un correo electrónico para verificar tu cuenta.'
    },
    {
      question: '¿Es obligatorio completar todos los campos de información?',
      reply: 'No, no es obligatorio completar todos los campos de información. Sin embargo, mientras más detalles proporciones, mejor podremos conocer tu trayectoria y experiencias para mejorar nuestros programas educativos.'
    },
    {
      question: '¿Puedo actualizar mi información en la plataforma después del registro inicial?',
      reply: 'Sí, podrás acceder a tu cuenta en cualquier momento para actualizar tu información, como nuevos estudios realizados, cambios de empleo, logros profesionales, etc.'
    },
    {
      question: '¿Cómo se protege mi privacidad y datos personales?',
      reply: 'Tomamos muy en serio la protección de tu privacidad y datos personales. Toda la información que compartas en esta plataforma se mantendrá confidencial y solo será utilizada para los fines establecidos por nuestra institución. No compartiremos tus datos con terceros sin tu consentimiento.'
    },
    {
      question: '¿La información que proporciono será visible públicamente?',
      reply: 'No, la información que proporciones no será visible públicamente. Solo el personal autorizado de nuestra institución tendrá acceso a ella con fines estadísticos y de mejora de nuestros programas.'
    },
    {
      question: '¿Existe algún beneficio por registrarme en la plataforma?',
      reply: 'Sí, al registrarte en esta plataforma, tendrás la oportunidad de mantenerte conectado con tu alma mater, recibir noticias e invitaciones a eventos especiales para egresados, así como acceder a oportunidades de desarrollo profesional y networking.'
    },
    {
      question: '¿Cómo se utilizará la información recolectada de los egresados?',
      reply: 'La información recolectada se utilizará para realizar estudios estadísticos sobre la trayectoria de nuestros egresados, identificar áreas de mejora en nuestros programas educativos y servicios de apoyo estudiantil, y fortalecer los vínculos entre la institución y sus antiguos alumnos.'
    },
    {
      question: '¿Puedo eliminar mi cuenta de la plataforma si lo deseo?',
      reply: 'Sí, puedes eliminar tu cuenta de la plataforma en cualquier momento si así lo deseas. Simplemente envía una solicitud a nuestro equipo de soporte y ellos se encargarán de eliminar tu información de nuestros registros.'
    },
    {
      question: '¿A quién puedo contactar si tengo más preguntas o problemas con la plataforma?',
      reply: 'Si tienes más preguntas o enfrentas algún problema con la plataforma, puedes contactar a nuestro equipo de soporte a través del correo electrónico [dirección de correo electrónico] o del número de teléfono [número de teléfono]. Estaremos encantados de asistirte.'
    }
  ];

const faq = (req, res) => {
    res.json({
        questions: questions,
        success: true
    });
}

module.exports = faq;