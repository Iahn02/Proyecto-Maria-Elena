/**
 * 🎓 Proyecto Liceo María Elena - Fundación Chile
 * Fase 2: Creación de Formularios
 * Formulario 2: Egresados SIN Práctica Profesional
 * 
 * Este script utiliza FormApp para construir de manera automática el 
 * formulario dirigido a los egresados que no realizaron su práctica profesional.
 * Estructura definida en el plan_desarrollo.md (7 Secciones: A a la G).
 */

function crearFormularioEgresadosSinPractica() {
  // 1. Crear el formulario
  const form = FormApp.create('Liceo María Elena | Encuesta a Egresados SIN Práctica Profesional');
  form.setDescription('Objetivo: Entender las razones, barreras y la situación actual de los estudiantes egresados del Liceo Técnico Profesional que no lograron realizar o finalizar su práctica profesional.\n\nQueremos apoyarte. Tus respuestas son confidenciales y nos ayudarán a mejorar nuestros procesos de acompañamiento.')
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
      .setChoiceValues(['Mecánica Automotriz', 'Química Industrial', 'Otra'])
      .setRequired(true);
      
  form.addTextItem().setTitle('5. Año de egreso de 4to Medio').setRequired(true);

  // ***************************************************************
  // SECCIÓN B: MOTIVOS DE NO REALIZACIÓN
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN B: MOTIVOS POR LOS CUALES NO REALIZÓ LA PRÁCTICA');
  
  form.addCheckboxItem()
      .setTitle('6. ¿Cuáles fueron las razones principales por las que no realizaste o no finalizaste tu práctica profesional? (Puedes seleccionar más de una)')
      .setChoiceValues([
        'Falta de cupos o centros de práctica disponibles',
        'Incompatibilidad de horarios por trabajo u otra actividad',
        'Decidí estudiar una carrera en Educación Superior inmediatamente',
        'Problemas económicos o falta de recursos para traslados/alimentación',
        'Problemas familiares o de salud',
        'No recibí suficiente orientación o apoyo del Liceo para encontrar un cupo',
        'Pérdida de interés en la especialidad estudiada'
      ])
      .showOtherOption(true)
      .setRequired(true);
      
  form.addMultipleChoiceItem()
      .setTitle('7. ¿Sientes que el Liceo te brindó el apoyo necesario para encontrar tu práctica?')
      .setChoiceValues([
        'Sí, recibí mucho apoyo',
        'Sí, pero no fue suficiente',
        'No, no recibí apoyo',
        'No solicité apoyo al Liceo'
      ])
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN C: SITUACIÓN ACTUAL
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN C: SITUACIÓN ACTUAL');
  
  form.addMultipleChoiceItem()
      .setTitle('8. ¿Cuál es tu situación laboral y/o de estudios actualmente?')
      .setChoiceValues([
        'Trabajando en algo relacionado con mi especialidad',
        'Trabajando en algo NO relacionado con mi especialidad',
        'Estudiando en la Educación Superior',
        'Estudiando y trabajando simultáneamente',
        'Buscando empleo activamente (Cesante)',
        'No estoy trabajando ni estudiando por ahora'
      ])
      .setRequired(true);
      
  form.addTextItem().setTitle('9. ¿Cuánto tiempo ha pasado desde que egresaste y quedaste en pausa con tu práctica? (Ej: "6 meses", "2 años")');

  // PREGUNTA DE BIFURCACIÓN (Final de Sección C)
  const preguntaInteres = form.addMultipleChoiceItem()
      .setTitle('10. ¿Tienes interés en realizar tu práctica profesional para obtener tu título técnico en el futuro cercano?')
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN D: PLANES FUTUROS Y LÓGICA CONDICIONAL
  // ***************************************************************
  const paginaVincularPractica = form.addPageBreakItem().setTitle('SECCIÓN D: PLANES FUTUROS E INTERÉS EN RETOMAR LA PRÁCTICA');
  
  form.addParagraphTextItem()
      .setTitle('10b. ¿En qué áreas o tipo de empresa te interesaría realizar la práctica?')
      .setRequired(false);

  // ***************************************************************
  // SECCIÓN E: ORIENTACIÓN Y APOYO
  // ***************************************************************
  const secE = form.addPageBreakItem().setTitle('SECCIÓN E: ORIENTACIÓN Y SERVICIOS DEL LICEO');
  
  // Asignamos saltos: Después de D, la página fluye normal a E
  paginaVincularPractica.setGoToPage(secE);

  preguntaInteres.setChoices([
    preguntaInteres.createChoice('Sí, me interesa y me gustaría recibir orientación para lograrlo', paginaVincularPractica),
    preguntaInteres.createChoice('Tal vez, pero me resulta complicado por mi situación actual', paginaVincularPractica),
    preguntaInteres.createChoice('No, he decidido no titularme como técnico', secE)
  ]);
  
  form.addGridItem()
      .setTitle('11. Por favor, evalúa de 1 a 5 cómo percibiste los siguientes servicios de apoyo y orientación en el Liceo:')
      .setRows([
        'Información entregada sobre centros de práctica',
        'Acompañamiento del profesor tutor o encargado de prácticas',
        'Preparación para enfrentar entrevistas laborales',
        'Orientación vocacional general en el liceo',
        'Atención a consultas administrativas sobre titulaciones'
      ])
      .setColumns(['1 (Muy deficiente)', '2 (Deficiente)', '3 (Regular)', '4 (Bueno)', '5 (Excelente)'])
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN F: BARRERAS
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN F: BARRERAS Y LIMITACIONES');
  
  form.addCheckboxItem()
      .setTitle('12. ¿Qué barreras o dificultades actuales te impiden realizar la práctica profesional? (Selecciona todas las que apliquen)')
      .setChoiceValues([
        'Falta de recursos económicos',
        'Falta de redes de contacto o empresas conocidas',
        'Desconocimiento de los trámites o procesos',
        'Falta de tiempo por responsabilidades personales/laborales',
        'Desmotivación o falta de confianza en mis habilidades',
        'No existen opciones de práctica en mi comuna/localidad'
      ])
      .showOtherOption(true);
      
  form.addParagraphTextItem()
      .setTitle('13. ¿Qué tipo de apoyo específico necesitarías del Liceo u otra institución para lograr finalizar este proceso?');

  // ***************************************************************
  // SECCIÓN G: COMENTARIOS Y SUGERENCIAS
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN G: COMENTARIOS Y SUGERENCIAS FINALES');
  
  form.addParagraphTextItem()
      .setTitle('14. Finalmente, ¿qué consejo o sugerencia le darías al Liceo para mejorar el acompañamiento de los estudiantes que están por egresar para que no queden sin su práctica?');

  Logger.log('¡Formulario Egresados SIN Práctica creado con éxito!');
  Logger.log('URL de edición: ' + form.getEditUrl());
  Logger.log('URL para responder: ' + form.getPublishedUrl());
}
