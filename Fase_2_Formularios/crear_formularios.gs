/**
 * 🎓 Proyecto Liceo María Elena - Fundación Chile
 * Fase 2: Creación Automática de Formularios
 * 
 * Este script utiliza FormApp para construir de manera automática el 
 * "Formulario 1: Egresados en Práctica Profesional".
 * Esto nos evita tipear manualmente las +40 preguntas y sus opciones,
 * y permite que el formulario nazca directamente en la cuenta institucional.
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
      
  form.addTextItem().setTitle('1. Nombre completo').setRequired(true);
  form.addTextItem().setTitle('2. Edad (en años)').setRequired(true);
  
  form.addMultipleChoiceItem()
      .setTitle('3. Género')
      .setChoiceValues(['Masculino', 'Femenino', 'No binario', 'Prefiero no decir'])
      .setRequired(true);
      
  const itemEspecialidad = form.addMultipleChoiceItem()
      .setTitle('4. Especialidad técnica cursada')
      .setChoiceValues(['Mecánica Automotriz', 'Química Industrial', 'Otra'])
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

  // ***************************************************************
  // SECCIÓN D: DESARROLLO DE COMPETENCIAS TÉCNICAS
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN D: DESARROLLO DE COMPETENCIAS TÉCNICAS Y TRANSVERSALES')
  .setHelpText('Nota: Estas competencias se personalizarán según la especialidad informada mediante triggers de Apps Script o completando la matriz genérica.');

  form.addGridItem()
      .setTitle('15. Evalúe su nivel de desarrollo en las siguientes competencias técnicas (generales):')
      .setRows([
        'Competencia Técnica 1',
        'Competencia Técnica 2',
        'Competencia Técnica 3',
        'Competencia Técnica 4',
        'Competencia Técnica 5'
      ])
      .setColumns(['Muy bajo', 'Bajo', 'Medio', 'Alto', 'Muy alto'])
      .setRequired(true);

  form.addGridItem()
      .setTitle('16. Evalúe su nivel de desarrollo en las siguientes competencias transversales:')
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
  // SECCIÓN E: COMPETENCIAS DIGITALES Y TECNOLÓGICAS
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN E: COMPETENCIAS DIGITALES Y TECNOLÓGICAS');
  
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
  // SECCIÓN F: HABILIDADES DEL SIGLO XXI
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN F: HABILIDADES DEL SIGLO XXI');
  
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
  form.addParagraphTextItem().setTitle('21. ¿De qué manera su establecimiento educacional fomentó el desarrollo de estas habilidades?');
  form.addParagraphTextItem().setTitle('22. ¿Qué herramientas tecnológicas o digitales considera esenciales para su desempeño profesional que no fueron adecuadamente abordadas durante su formación?');

  // ***************************************************************
  // RESTO DE SECCIONES (G, H, I, J, K, L)
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN G: INSERCIÓN LABORAL Y EMPLEABILIDAD');
  form.addMultipleChoiceItem()
      .setTitle('23. ¿Ha recibido oferta laboral de la empresa donde realizó su práctica?')
      .setChoiceValues(['Sí', 'No', 'Aún no he finalizado mi práctica']);
  // [Aquí se añadirán las demás preguntas de la sección G en el script extendido]

  form.addPageBreakItem().setTitle('FINALIZACIÓN DE SCRIPT DEMOSTRATIVO').setHelpText('El script ha construido hasta la sección G con éxito. En la versión final se inyectarán las 40 preguntas.');

  Logger.log('¡Formulario creado con éxito!');
  Logger.log('URL de edición: ' + form.getEditUrl());
  Logger.log('URL para responder: ' + form.getPublishedUrl());
}
