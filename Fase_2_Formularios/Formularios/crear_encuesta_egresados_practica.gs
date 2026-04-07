/**
 * 🎓 Proyecto Liceo María Elena - Fundación Chile
 * Fase 2: Creación de Formularios
 * Formulario 1: Egresados EN Práctica Profesional
 * 
 * Este script utiliza FormApp para construir de manera automática el 
 * formulario dirigido a los estudiantes en práctica. Contiene las 12 secciones (A-L).
 */

function crearFormularioEgresadosPractica() {
  // 1. Crear el formulario
  const form = FormApp.create('Liceo María Elena | Encuesta a Egresados EN Práctica Profesional');
  form.setDescription('Objetivo: Recoger información sobre la experiencia de los estudiantes egresados del Liceo Técnico Profesional durante su práctica profesional, para orientar futuras decisiones de mejora educativa.\n\nTus respuestas son confidenciales y fundamentales para mejorar nuestra formación técnica.')
      .setConfirmationMessage('¡Muchas gracias por tu tiempo y aportes! Tus respuestas nos ayudarán enormemente a mejorar el Liceo María Elena.')
      .setAllowResponseEdits(false)
      .setAcceptingResponses(true);
      
  // ***************************************************************
  // SECCIÓN A: DATOS DE REGISTRO
  // ***************************************************************
  form.addSectionHeaderItem()
      .setTitle('SECCIÓN A: DATOS DE REGISTRO');
      
  form.addMultipleChoiceItem()
      .setTitle('Periodo de aplicación (Uso interno)')
      .setChoiceValues([
        'Piloto 2025',
        'Semestre 1 - 2026',
        'Semestre 2 - 2026',
        'Semestre 1 - 2027'
      ])
      .setRequired(true);

  form.addTextItem().setTitle('1. Nombre completo').setRequired(true);
  form.addTextItem().setTitle('2. Edad (en años)').setRequired(true);
  
  form.addMultipleChoiceItem()
      .setTitle('3. Género')
      .setChoiceValues(['Masculino', 'Femenino', 'No binario', 'Prefiero no decirlo'])
      .setRequired(true);
      
  form.addTextItem().setTitle('5. Año de egreso').setRequired(true);
  form.addTextItem().setTitle('6. Empresa donde realiza o realizó su práctica profesional').setRequired(true);
  form.addTextItem().setTitle('7. Cargo o funciones durante la práctica').setRequired(true);
  form.addTextItem().setTitle('8. Duración de la práctica (en meses)').setRequired(true);
  
  form.addMultipleChoiceItem()
      .setTitle('9. ¿Cómo conseguiste tu lugar de práctica?')
      .setChoiceValues(['Gestionado por el liceo', 'Contacto personal/familiar', 'Búsqueda propia'])
      .showOtherOption(true)
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN B: PERTINENCIA Y ACTUALIZACIÓN CURRICULAR
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN B: PERTINENCIA Y ACTUALIZACIÓN CURRICULAR');
  
  form.addScaleItem()
      .setTitle('10. Evalúa el nivel de relación entre lo aprendido en tu formación técnica y las actividades realizadas en tu práctica profesional:')
      .setBounds(1, 5)
      .setLabels('Ninguna relación', 'Relación total')
      .setRequired(true);
      
  form.addParagraphTextItem()
      .setTitle('11. ¿Qué conocimientos o habilidades adquiridos en su formación técnica le han resultado más útiles durante su práctica profesional?');
      
  form.addParagraphTextItem()
      .setTitle('12. ¿Qué conocimientos o habilidades considera que faltaron en su formación técnica y hubieran sido necesarios para su práctica profesional?');

  // ***************************************************************
  // SECCIÓN C: CALIDAD DE LA ENSEÑANZA Y METODOLOGÍAS
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN C: CALIDAD DE LA ENSEÑANZA Y METODOLOGÍAS PEDAGÓGICAS');
  
  form.addGridItem()
      .setTitle('13. Califique los siguientes aspectos de la formación recibida:')
      .setRows([
        'Claridad de las explicaciones de los profesores',
        'Equilibrio entre teoría y práctica',
        'Actualización de los contenidos enseñados',
        'Metodologías de enseñanza utilizadas',
        'Sistemas de evaluación aplicados'
      ])
      .setColumns(['Muy deficiente', 'Deficiente', 'Regular', 'Bueno', 'Excelente'])
      .setRequired(true);
      
  form.addCheckboxItem()
      .setTitle('14. ¿Qué métodos de enseñanza considera que fueron más efectivos para su aprendizaje técnico? (Puede seleccionar más de una)')
      .setChoiceValues([
        'Clase expositiva',
        'Demostración práctica',
        'Aprendizaje basado en proyectos (ABP)',
        'Simulación',
        'Aprendizaje colaborativo / trabajo en equipo',
        'Estudio de casos',
        'Uso de plataformas digitales / recursos en línea'
      ])
      .showOtherOption(true);

  // PREGUNTA CONDICIONAL (SALTO DE PÁGINA)
  const preguntaEspecialidad = form.addMultipleChoiceItem()
      .setTitle('14b. Especialidad técnica cursada (Esto adaptará las siguientes preguntas sobre competencias técnicas)')
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN D: DESARROLLO DE COMPETENCIAS TÉCNICAS (BIFURCACIONES)
  // ***************************************************************
  
  // --- Rama Mecánica ---
  const secDMecanica = form.addPageBreakItem().setTitle('SECCIÓN D: COMPETENCIAS TÉCNICAS - MECÁNICA AUTOMOTRIZ')
  .setHelpText('Matriz específica para desempeños de Mecánica.');

  form.addGridItem()
      .setTitle('15a. Evalúe su nivel de desarrollo en las siguientes competencias técnicas abordadas en el liceo:')
      .setRows([
        'Mantenimiento Preventivo y Correctivo: Realizar cambios de aceite, filtros, fluidos, correas y bujías, junto con revisiones de niveles (refrigerante, aceite).',
        'Diagnóstico y Reparación de Motores: Diagnosticar fallas en motores de combustión interna, realizar afinamientos y reparaciones menores/medias.',
        'Sistemas de Suspensión, Dirección y Frenos: Desarmar, reparar y ajustar sistemas de frenos (discos/tambores), direcciones hidráulicas y componentes de suspensión.',
        'Electricidad y Electrónica Básica: Comprobar estado de baterías, componentes eléctricos, iluminación y diagnóstico básico con escáner y multímetro.',
        'Sistemas de Transmisión: Mantenimiento y reparación de transmisiones manuales y componentes de transmisión automática.',
        'Uso de Herramientas e Instrumentos: Operación precisa de herramientas manuales, torquímetros, instrumentos de medición y equipos de taller.',
        'Interpretación Técnica: Lectura de manuales de fabricante, diagramas eléctricos y técnicos para identificar componentes.'
      ])
      .setColumns(['Muy bajo', 'Bajo', 'Medio', 'Alto', 'Muy alto'])
      .setRequired(true);

  // --- Rama Química ---
  const secDQuimica = form.addPageBreakItem().setTitle('SECCIÓN D: COMPETENCIAS TÉCNICAS - QUÍMICA INDUSTRIAL')
  .setHelpText('Matriz específica para desempeños de Química.');

  form.addGridItem()
      .setTitle('15b. Evalúe su nivel de desarrollo en las siguientes competencias técnicas abordadas en el liceo:')
      .setRows([
        'Análisis Químico-Instrumental: Ejecución de técnicas cualitativas y cuantitativas (titulación, gravimetría) y operación de equipos analíticos para control de calidad.',
        'Manejo de Materiales y Reactivos: Preparación de soluciones valoradas, reactivos, y manejo preciso del material de vidrio.',
        'Seguridad y Normativa: Aplicación estricta de Buenas Prácticas de Laboratorio (BPL), normas de seguridad, manejo de hojas de seguridad (SDS) y prevención de riesgos.',
        'Control de Procesos: Muestreo de materias primas y análisis en proceso de productos.',
        'Gestión de Datos: Registro de resultados, interpretación analítica y uso de software básico de laboratorio.',
        'Mantenimiento Rutinario: Calibración y limpieza de instrumentos de medición.'
      ])
      .setColumns(['Muy bajo', 'Bajo', 'Medio', 'Alto', 'Muy alto'])
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN E: COMPETENCIAS TRANSVERSALES (CONVERGENCIA)
  // ***************************************************************
  const secE = form.addPageBreakItem().setTitle('SECCIÓN E: COMPETENCIAS TRANSVERSALES');
  
  // Establecemos que, al terminar Mecánica, salte a la Sección E.
  // Quimica salta automáticamente a la E por ser la página siguiente.
  secDMecanica.setGoToPage(secE);
  
  // Configuramos las opciones de la pregunta condicional para que deriven a la sección correcta
  preguntaEspecialidad.setChoices([
    preguntaEspecialidad.createChoice('Mecánica Automotriz', secDMecanica),
    preguntaEspecialidad.createChoice('Química Industrial', secDQuimica),
    preguntaEspecialidad.createChoice('Otra', secE) // Salta directo a las transversales
  ]);

  form.addGridItem()
      .setTitle('16. Evalúe su nivel de desarrollo en las siguientes competencias transversales y socioemocionales:')
      .setRows([
        'Trabajo en equipo',
        'Comunicación efectiva',
        'Resolución de problemas',
        'Iniciativa y autonomía',
        'Liderazgo'
      ])
      .setColumns(['Muy bajo', 'Bajo', 'Medio', 'Alto', 'Muy alto'])
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN F: COMPETENCIAS DIGITALES Y TECNOLÓGICAS
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN F: COMPETENCIAS DIGITALES Y TECNOLÓGICAS');
  
  form.addGridItem()
      .setTitle('17. Evalúe su nivel de dominio en las siguientes competencias digitales:')
      .setRows([
        'Uso de software específico de su especialidad',
        'Manejo de herramientas ofimáticas (Word, Excel, etc.)',
        'Búsqueda y gestión de información digital',
        'Comunicación digital profesional',
        'Seguridad informática básica'
      ])
      .setColumns(['Muy bajo', 'Bajo', 'Medio', 'Alto', 'Muy alto'])
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN G: HABILIDADES DEL SIGLO XXI
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN G: HABILIDADES DEL SIGLO XXI');
  
  form.addGridItem()
      .setTitle('18. Evalúe en qué medida su formación contribuyó al desarrollo de las siguientes habilidades:')
      .setRows([
        'Pensamiento crítico',
        'Creatividad e innovación',
        'Alfabetización informacional (búsqueda/evaluación)',
        'Colaboración y trabajo en redes',
        'Ciudadanía digital (uso ético/responsable)',
        'Aprendizaje autónomo',
        'Flexibilidad y adaptabilidad',
        'Habilidades interculturales'
      ])
      .setColumns(['1 (Muy poco)', '2 (Poco)', '3 (Moderado)', '4 (Bastante)', '5 (Mucho)'])
      .setRequired(true);
      
  form.addParagraphTextItem().setTitle('19. ¿Cuáles de estas habilidades del siglo XXI le han resultado más útiles durante su práctica profesional? (Mencione hasta tres)');
  form.addParagraphTextItem().setTitle('20. ¿Qué habilidades del siglo XXI considera que no fueron suficientemente desarrolladas durante su formación y son necesarias en el mundo laboral actual?');
  form.addParagraphTextItem().setTitle('21. ¿De qué manera su liceo fomentó el desarrollo de estas habilidades?');

  // ***************************************************************
  // SECCIÓN H: INSERCIÓN LABORAL
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN H: INSERCIÓN LABORAL');
  
  form.addMultipleChoiceItem()
      .setTitle('22. ¿Recibió oferta laboral de la empresa donde realizó su práctica?')
      .setChoiceValues(['Sí', 'No', 'Aún no he finalizado mi práctica'])
      .setRequired(true);

  form.addMultipleChoiceItem()
      .setTitle('23. Su situación laboral actual es:')
      .setChoiceValues([
        'Trabajo formalmente en el área de mi especialidad',
        'Trabajo en un área distinta a mi especialidad',
        'Desempleado / buscando empleo',
        'Estudio netamente, sin trabajar'
      ])
      .setRequired(true);
      
  form.addTextItem().setTitle('24. ¿Cuánto tiempo se demoró en encontrar un primer empleo? (Ej: 2 meses, Inmediato, etc.)').setRequired(true);

  // ***************************************************************
  // SECCIÓN I: ARTICULACIÓN SUPERIOR
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN I: ARTICULACIÓN SUPERIOR');

  form.addMultipleChoiceItem()
      .setTitle('25. ¿Actualmente estudia en la Educación Superior?')
      .setChoiceValues([
        'Sí, una carrera relacionada a mi especialidad',
        'Sí, en un área distinta a mi especialidad',
        'No'
      ])
      .setRequired(true);
      
  form.addMultipleChoiceItem()
      .setTitle('26. ¿Tuvo opción a convalidaciones o paso liberado por egresar de la EMTP?')
      .setChoiceValues([
        'Sí, reconocieron varios de mis módulos',
        'Sí, pero el proceso fue muy burocrático',
        'No me permitieron convalidar',
        'No aplica, no estudio o estudio otra área'
      ])
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN J: SATISFACCIÓN GLOBAL
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN J: SATISFACCIÓN GLOBAL');

  form.addGridItem()
      .setTitle('27. Califique su satisfacción con respecto a:')
      .setRows([
        'Calidad general de la enseñanza técnica',
        'Relevancia del título obtenido para el mercado',
        'Apoyo del liceo durante su práctica profesional',
        'Instalaciones para actividades formativas',
        'Cuerpo docente especializado'
      ])
      .setColumns(['Muy Insatisfecho', 'Insatisfecho', 'Neutral', 'Satisfecho', 'Muy Satisfecho'])
      .setRequired(true);
      
  form.addScaleItem()
      .setTitle('28. ¿Qué tan probable es que recomiende a un familiar o amigo estudiar una especialidad técnica en el Liceo María Elena? (NPS)')
      .setBounds(0, 10)
      .setLabels('Nada probable', 'Muy probable')
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN K: INFRAESTRUCTURA Y EQUIPAMIENTO
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN K: INFRAESTRUCTURA Y EQUIPAMIENTO');

  form.addGridItem()
      .setTitle('29. Califique la calidad de la infraestructura de su escuela en relación con su especialidad:')
      .setRows([
        'Estado general de los talleres/laboratorios',
        'Disponibilidad de herramientas e instrumentos',
        'Modernidad tecnológica del equipamiento',
        'Implementos de seguridad (EPP, señalética)',
        'Espacios de biblioteca o computación de apoyo'
      ])
      .setColumns(['1 (Muy deficiente)', '2 (Deficiente)', '3 (Regular)', '4 (Bueno)', '5 (Excelente)'])
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN L: EQUIDAD E INCLUSIÓN
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN L: EQUIDAD E INCLUSIÓN');

  form.addCheckboxItem()
      .setTitle('30. ¿Enfrentó barreras o discriminación durante su formación o práctica que considere relevantes? (Seleccione)')
      .setChoiceValues([
        'Barreras económicas fuertes',
        'Discriminación de género en el área técnica',
        'Discriminación por discapacidad',
        'Bullying o maltrato de compañeros/supervisores',
        'No enfrenté barreras significativas'
      ])
      .showOtherOption(true)
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle('31. (Opcional) Si enfrentó barreras durante su práctica, por favor detalle brevemente la situación y cómo el liceo o empresa la abordó:');

  form.addParagraphTextItem()
      .setTitle('32. ¿Qué tipos de apoyo extra en temas de inclusión cree que el liceo debería implementar para futuros estudiantes?');

  Logger.log('¡Formulario Egresados EN Práctica creado con éxito (Completo Sec A - L)!');
  Logger.log('URL de edición: ' + form.getEditUrl());
  Logger.log('URL para responder: ' + form.getPublishedUrl());
}
