/**
 * 🎓 Proyecto Liceo María Elena - Fundación Chile
 * Fase 2: Creación de Formularios
 * Formulario 2: Egresados SIN Práctica Profesional
 * 
 * Este script utiliza FormApp para construir de manera automática el 
 * formulario dirigido a los egresados que no realizaron su práctica profesional.
 */

function crearFormularioEgresadosSinPractica() {
  const form = FormApp.create('Liceo María Elena | Encuesta a Egresados SIN Práctica Profesional');
  form.setDescription('Objetivo: Recoger información de estudiantes egresados del Liceo Técnico Profesional que no realizaron práctica profesional, para orientar futuras acciones de apoyo en formación, empleabilidad y continuidad de estudios.\n\nTus respuestas son confidenciales y nos ayudarán a mejorar nuestros procesos.')
      .setConfirmationMessage('¡Muchas gracias por compartir tu experiencia! Tu información es muy valiosa para nosotros y nos ayudará a mejorar el apoyo a futuros estudiantes.')
      .setAllowResponseEdits(false)
      .setAcceptingResponses(true);
      
  // ***************************************************************
  // SECCIÓN A: DATOS GENERALES
  // ***************************************************************
  form.addSectionHeaderItem().setTitle('SECCIÓN A: DATOS GENERALES');
  
  form.addTextItem().setTitle('1. Nombre completo').setRequired(true);
  form.addTextItem().setTitle('2. Edad (en años)').setRequired(true);
  
  form.addMultipleChoiceItem()
      .setTitle('3. Género')
      .setChoiceValues(['Masculino', 'Femenino', 'No binario', 'Prefiero no decirlo'])
      .setRequired(true);
      
  form.addMultipleChoiceItem()
      .setTitle('4. Especialidad técnica cursada en el Liceo')
      .setChoiceValues(['Mecánica Automotriz', 'Química Industrial'])
      .showOtherOption(true)
      .setRequired(true);
      
  form.addTextItem().setTitle('5. Año de egreso').setRequired(true);

  // ***************************************************************
  // SECCIÓN B: MOTIVOS PARA NO REALIZAR PRÁCTICA PROFESIONAL
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN B: MOTIVOS PARA NO REALIZAR PRÁCTICA PROFESIONAL');
  
  form.addCheckboxItem()
      .setTitle('6. ¿Por qué motivo no realizaste tu práctica profesional? (Puedes marcar más de una opción)')
      .setChoiceValues([
        'Falta de oportunidades/lugares de práctica',
        'Motivos personales o familiares',
        'Salud',
        'Decidí trabajar directamente',
        'Decidí continuar estudios',
        'Incumplimiento de requisitos exigidos en el centro de práctica',
        'Falta de información para gestionar práctica'
      ])
      .showOtherOption(true)
      .setRequired(true);
      
  form.addMultipleChoiceItem()
      .setTitle('7. ¿Tuviste apoyo del liceo para gestionar tu práctica?')
      .setChoiceValues([
        'Sí',
        'No',
        'No lo solicité'
      ])
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN C: SITUACIÓN ACTUAL
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN C: SITUACIÓN ACTUAL');
  
  form.addMultipleChoiceItem()
      .setTitle('8. ¿Cuál es tu situación actual?')
      .setChoiceValues([
        'Buscando trabajo',
        'Trabajando en área relacionada con mi especialidad',
        'Trabajando en área no relacionada',
        'Estudiando en educación superior',
        'Trabajando y estudiando'
      ])
      .showOtherOption(true)
      .setRequired(true);
      
  form.addMultipleChoiceItem()
      .setTitle('9. ¿Cuánto tiempo ha pasado desde tu egreso sin realizar práctica profesional?')
      .setChoiceValues([
        'Menos de 3 meses',
        'Entre 3 y 6 meses',
        'Entre 6 meses y 1 año',
        'Entre 1 y 2 años',
        'Más de 2 años'
      ])
      .setRequired(true);

  const preguntaInteresPractica = form.addMultipleChoiceItem()
      .setTitle('10. ¿Tienes interés en realizar la práctica profesional en el futuro?')
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN D: PLANES FUTUROS Y DECISIONES (RAMAS)
  // ***************************************************************
  
  // Rama D1: Razones para no realizar práctica
  const secD1 = form.addPageBreakItem().setTitle('SECCIÓN D: PLANES FUTUROS Y DECISIONES (Continuación)');
  
  form.addMultipleChoiceItem()
      .setTitle('11. Si respondiste "No" o "No estoy seguro/a", ¿por qué?')
      .setChoiceValues([
        'Ya tengo empleo y no la necesito',
        'No le veo utilidad',
        'No tengo información de cómo hacerla ahora',
        'No tengo los recursos (transporte, tiempo, etc.)',
        'Perdí interés en mi especialidad'
      ])
      .showOtherOption(true)
      .setRequired(true);

  // Rama D2: Continuar estudios
  const secD2 = form.addPageBreakItem().setTitle('SECCIÓN D: PLANES FUTUROS Y DECISIONES (Estudios Superiores)');
  secD1.setGoToPage(secD2); // Conecta D1 con D2
  
  const preguntaEstudios = form.addMultipleChoiceItem()
      .setTitle('12. ¿Estás interesado/a en continuar estudios superiores?')
      .setRequired(true);

  // Rama D3: Tipos de estudios
  const secD3 = form.addPageBreakItem().setTitle('SECCIÓN D: PLANES FUTUROS Y DECISIONES (Tipo de estudios)');
  
  form.addMultipleChoiceItem()
      .setTitle('13. En caso afirmativo, ¿qué tipo de estudios te interesan?')
      .setChoiceValues([
        'Carrera técnica relacionada con mi especialidad',
        'Carrera técnica en área diferente',
        'Carrera universitaria relacionada',
        'Carrera universitaria en área diferente',
        'Curso de especialización o certificación'
      ])
      .showOtherOption(true)
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN E: ORIENTACIÓN Y APOYO
  // ***************************************************************
  const secE = form.addPageBreakItem().setTitle('SECCIÓN E: ORIENTACIÓN Y APOYO');
  
  // Configuramos el salto de D2 a E para que se salte D3 si no estudiará
  secD3.setGoToPage(secE);
  
  preguntaEstudios.setChoices([
    preguntaEstudios.createChoice('Sí, estoy cursando actualmente', secD3),
    preguntaEstudios.createChoice('Sí, planeo hacerlo próximamente', secD3),
    preguntaEstudios.createChoice('No lo tengo contemplado', secE),
    preguntaEstudios.createChoice('Aún no lo he decidido', secE)
  ]);

  // Configuramos ahora la conexión principal de C a D1 o D2
  preguntaInteresPractica.setChoices([
    preguntaInteresPractica.createChoice('Sí', secD2),                  // Salta a D2 (Estudios)
    preguntaInteresPractica.createChoice('No', secD1),                  // Va a D1 (Razones)
    preguntaInteresPractica.createChoice('No estoy seguro/a', secD1)    // Va a D1 (Razones)
  ]);

  form.addGridItem()
      .setTitle('14. Evalúa los siguientes apoyos que recibiste en el liceo:')
      .setRows([
        'Orientación vocacional',
        'Preparación para entrevistas laborales',
        'Información sobre estudios superiores',
        'Elaboración de curriculum vitae (CV)',
        'Acompañamiento en decisiones post-egreso'
      ])
      .setColumns(['Muy insatisfecho', 'Insatisfecho', 'Neutral', 'Satisfecho', 'Muy satisfecho'])
      .setRequired(true);
      
  form.addParagraphTextItem()
      .setTitle('15. ¿Qué tipo de orientación o apoyo hubieras necesitado al egresar?');

  // ***************************************************************
  // SECCIÓN F: BARRERAS Y EXPECTATIVAS
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN F: BARRERAS Y EXPECTATIVAS');
  
  form.addCheckboxItem()
      .setTitle('16. ¿Qué principales barreras has enfrentado para insertarte laboralmente o continuar estudios? (marcar todas las que correspondan)')
      .setChoiceValues([
        'Falta de recursos económicos',
        'Falta de redes o contactos',
        'Falta de información clara',
        'Baja autoestima o motivación',
        'No conozco bien mis opciones',
        'Preparación inadecuada para incorporarse al mundo laboral'
      ])
      .showOtherOption(true);
      
  form.addCheckboxItem()
      .setTitle('17. ¿Qué necesitas actualmente para avanzar en tus planes de estudio o trabajo?')
      .setChoiceValues([
        'Orientación vocacional/laboral',
        'Contacto con empresas o centros de estudio',
        'Acceso a becas o apoyos económicos',
        'Talleres prácticos o nivelación'
      ])
      .showOtherOption(true);

  // ***************************************************************
  // SECCIÓN G: COMENTARIOS FINALES
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN G: COMENTARIOS FINALES');
  
  form.addParagraphTextItem()
      .setTitle('18. ¿Qué sugerencias le harías al liceo para mejorar el apoyo a estudiantes que no han podido hacer su práctica profesional?');

  Logger.log('¡Formulario Egresados SIN Práctica actualizado con la nueva estructura!');
  Logger.log('URL de edición: ' + form.getEditUrl());
  Logger.log('URL para responder: ' + form.getPublishedUrl());
}
