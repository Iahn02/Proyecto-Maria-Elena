/**
 * 🎓 Proyecto Liceo María Elena - Fundación Chile
 * Fase 2: Creación de Formularios
 * Formulario 4: Docentes EMTP
 * 
 * Este script utiliza FormApp para construir de manera automática el 
 * formulario dirigido a los docentes, según la estructura definida
 * en el plan_desarrollo.md (11 Secciones: A a la K).
 */

function crearFormularioDocentes() {
  // 1. Crear el formulario
  const form = FormApp.create('Liceo María Elena | Encuesta Docentes EMTP');
  form.setDescription('Objetivo: Recoger la percepción y evaluación de los docentes sobre el proceso formativo, pertinencia curricular, metodologías y vinculación con el medio en el Liceo María Elena.\n\nTus respuestas son confidenciales y fundamentales para la toma de decisiones institucionales y la mejora continua.')
      .setConfirmationMessage('¡Muchas gracias por su participación! Su visión y experiencia docente son claves para fortalecer la formación técnica de nuestros estudiantes.')
      .setAllowResponseEdits(false)
      .setAcceptingResponses(true);
      
  // ***************************************************************
  // SECCIÓN A: REGISTRO DATOS GENERALES
  // ***************************************************************
  form.addSectionHeaderItem().setTitle('SECCIÓN A: REGISTRO Y DATOS GENERALES');
  
  form.addTextItem().setTitle('1. Nombre completo').setRequired(true);
  
  form.addMultipleChoiceItem()
      .setTitle('2. Especialidad principal en la que imparte clases')
      .setChoiceValues([
        'Mecánica Automotriz', 
        'Química Industrial', 
        'Módulos de Formación General (Lenguaje, Matemática, etc.)', 
        'Otra'
      ])
      .setRequired(true);
      
  form.addMultipleChoiceItem()
      .setTitle('3. Años de experiencia docente (en total)')
      .setChoiceValues([
        'Menos de 2 años', 
        'Entre 2 y 5 años', 
        'Entre 6 y 10 años', 
        'Más de 10 años'
      ])
      .setRequired(true);
      
  form.addMultipleChoiceItem()
      .setTitle('4. ¿Cuenta con formación pedagógica?')
      .setChoiceValues([
        'Sí, título de Profesor/Pedagogía', 
        'Sí, programa de prosecución de estudios/diplomado en pedagogía', 
        'No, solo título técnico o profesional', 
        'Actualmente en formación pedagógica'
      ])
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN B: PERTINENCIA CURRICULAR
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN B: PERTINENCIA CURRICULAR');
  
  form.addScaleItem()
      .setTitle('5. ¿Cómo califica la actualización del currículum actual respecto a las exigencias tecnológicas y productivas de la industria?')
      .setBounds(1, 5)
      .setLabels('Muy desactualizado', 'Totalmente actualizado')
      .setRequired(true);
      
  form.addMultipleChoiceItem()
      .setTitle('6. ¿Con qué frecuencia considera que debe actualizarse el currículum de su especialidad?')
      .setChoiceValues([
        'Anualmente', 
        'Cada 2 años', 
        'Cada 3 a 5 años', 
        'Ocasionalmente'
      ])
      .setRequired(true);
      
  form.addParagraphTextItem()
      .setTitle('7. ¿Qué temáticas, tecnologías o contenidos (que no están en el plan actual) considera que deberían incorporarse con urgencia?');
      
  form.addParagraphTextItem()
      .setTitle('8. ¿Qué contenidos actuales considera que están obsoletos y deberían eliminarse o reducirse del plan de estudios?');

  // ***************************************************************
  // SECCIÓN C: METODOLOGÍAS
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN C: METODOLOGÍAS DE ENSEÑANZA Y APRENDIZAJE');
  
  form.addCheckboxItem()
      .setTitle('9. ¿Qué metodologías utiliza con mayor frecuencia en sus clases? (Seleccione todas las que correspondan)')
      .setChoiceValues([
        'Clases expositivas',
        'Aprendizaje Basado en Proyectos (ABP)',
        'Resolución de problemas / Estudio de casos',
        'Demostraciones prácticas o simulaciones',
        'Trabajo colaborativo en grupos',
        'Salidas a terreno o visitas de especialistas'
      ])
      .showOtherOption(true)
      .setRequired(true);
      
  form.addMultipleChoiceItem()
      .setTitle('10. ¿Con qué frecuencia integra nuevas metodologías o tecnologías en su práctica pedagógica?')
      .setChoiceValues(['Constantemente', 'Frecuentemente', 'Ocasionalmente', 'Rara vez', 'Nunca'])
      .setRequired(true);
      
  form.addParagraphTextItem()
      .setTitle('11. ¿Cuáles son los principales obstáculos o restricciones que enfrenta para implementar metodologías innovadoras en su asignatura/módulo?');

  // ***************************************************************
  // SECCIÓN D: ARTICULACIÓN SUPERIOR
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN D: ARTICULACIÓN CON EDUCACIÓN SUPERIOR');
  
  form.addScaleItem()
      .setTitle('12. ¿Cuál es su nivel de conocimiento sobre la oferta y requisitos de instituciones de Educación Superior en el área que imparte?')
      .setBounds(1, 5)
      .setLabels('Ninguno', 'Alto conocimiento')
      .setRequired(true);
      
  form.addCheckboxItem()
      .setTitle('13. ¿Qué acciones formativas realiza para preparar a los estudiantes hacia la Educación Superior?')
      .setChoiceValues([
        'Informar sobre carreras y mallas curriculares afines',
        'Orientar en procesos de becas o beneficios',
        'Elevar la exigencia acercándola a estándares de educación superior',
        'Promover el estudio autónomo y la investigación',
        'Incentivar visitas a CFT, IP o Universidades',
        'Ninguna en particular'
      ])
      .showOtherOption(true);
      
  form.addParagraphTextItem()
      .setTitle('14. ¿Cómo cree que el liceo podría apoyar mejor la transición de los estudiantes de su especialidad hacia la Educación Superior?');

  // ***************************************************************
  // SECCIÓN E: VÍNCULO EMPRESAS
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN E: VÍNCULO CON EL SECTOR PRODUCTIVO');
  
  form.addMultipleChoiceItem()
      .setTitle('15. ¿Mantiene contacto con profesionales o representantes de empresas relacionadas con su especialidad?')
      .setChoiceValues(['Sí, frecuentemente', 'Sí, algunas veces al año', 'Rara vez', 'Nunca'])
      .setRequired(true);
      
  form.addParagraphTextItem()
      .setTitle('16. ¿Qué acciones de vinculación sugeriría implementar con urgencia en el liceo para acercar la formación al mundo laboral real?');

  // ***************************************************************
  // SECCIÓN F: COMPETENCIAS Y SIGLO XXI
  // ***************************************************************
  // Por brevedad y ejemplo, agregamos una representación de esta sección.
  form.addPageBreakItem().setTitle('SECCIÓN F: COMPETENCIAS TÉCNICAS Y HABILIDADES DEL SIGLO XXI');
  
  form.addGridItem()
      .setTitle('17. Según su percepción, ¿Qué nivel de logro alcanzan sus estudiantes al egresar en las siguientes Habilidades del Siglo XXI?')
      .setRows([
        'Pensamiento Crítico y Resolución de Problemas',
        'Creatividad e Innovación',
        'Comunicación Efectiva',
        'Colaboración y Trabajo en Equipo',
        'Adaptabilidad y Flexibilidad',
        'Responsabilidad y Disposición a aprender'
      ])
      .setColumns(['Muy Bajo', 'Bajo', 'Medio', 'Alto', 'Muy Alto'])
      .setRequired(true);
      
  form.addParagraphTextItem().setTitle('18. ¿Qué estrategias pedagógicas considera eficaces para el desarrollo de competencias transversales y habilidades del siglo XXI en contextos técnico-profesionales?');

  // ***************************************************************
  // SECCIÓN G: COMPETENCIAS DIGITALES DOCENTES
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN G: COMPETENCIAS DIGITALES PROPIAS');

  form.addGridItem()
      .setTitle('19. Evalúe su nivel de dominio y aplicación en las siguientes dimensiones de sus Competencias Digitales Docentes:')
      .setRows([
        'Uso de software e instrumental digital específico de su especialidad',
        'Manejo de herramientas ofimáticas (Word, Excel, nubes, etc.)',
        'Búsqueda y gestión de información digital y fuentes confiables',
        'Comunicación digital y trabajo colaborativo online',
        'Seguridad de la información y ciudadanía digital',
        'Creación y adaptación de contenidos digitales para sus clases'
      ])
      .setColumns(['1 (Incipiente)', '2 (Básico)', '3 (Intermedio)', '4 (Avanzado)', '5 (Experto)'])
      .setRequired(true);

  form.addMultipleChoiceItem()
      .setTitle('20. ¿Ha recibido capacitación reciente sobre el uso de Tecnologías de la Información (TIC) en los últimos 2 años?')
      .setChoiceValues(['Sí, brindada por el liceo', 'Sí, por cuenta propia', 'No he recibido capacitación'])
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle('21. ¿Qué equipamiento o tecnologías (software/hardware) son prioritarias de incorporar urgentemente para impartir mejor su módulo?');

  // ***************************************************************
  // SECCIÓN H: INSERCIÓN LABORAL (VISIÓN DOCENTE)
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN H: INSERCIÓN LABORAL Y SEGUIMIENTO SECTORIAL');

  form.addMultipleChoiceItem()
      .setTitle('22. ¿Realiza usted algún tipo de seguimiento a los titulados o estudiantes en práctica que formó?')
      .setChoiceValues([
        'Sí, de manera sistemática y estructurada',
        'Sí, de manera informal (contacto por RRSS o WhatsApp)',
        'Rara vez, solo me entero por terceros',
        'No, no hago seguimiento'
      ])
      .setRequired(true);

  form.addTextItem()
      .setTitle('23. Basado en su experiencia, estime qué porcentaje (%) aproximado de sus estudiantes logra insertarse laboralmente con éxito en su área técnica en su primer año de egreso:')
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle('24. ¿Qué acciones adicionales sugiere implementar para mejorar los niveles de empleabilidad efectiva e inserción laboral de sus egresados?');

  // ***************************************************************
  // SECCIÓN I: ORIENTACIÓN VOCACIONAL
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN I: ORIENTACIÓN VOCACIONAL Y APOYO AL ESTUDIANTE');

  form.addMultipleChoiceItem()
      .setTitle('25. ¿Cuál es su grado de participación en el proceso de Orientación Vocacional de los estudiantes de su especialidad?')
      .setChoiceValues(['Participación Alta (Soy profesor guía/Jefe de Especialidad)', 'Participación Media', 'Participación Baja', 'Nula participación'])
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle('26. ¿Qué estrategias utiliza cuando detecta dificultades severas de aprendizaje en estudiantes de cuarto medio orientados a procesos prácticos?');

  form.addParagraphTextItem()
      .setTitle('27. Frente al inicio de las prácticas profesionales, ¿Qué tipo de apoyo o preparación adicional cree que los estudiantes requieren reforzar desde el liceo?');

  // ***************************************************************
  // SECCIÓN J: INFRAESTRUCTURA
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN J: INFRAESTRUCTURA Y RECURSOS DIDÁCTICOS');

  form.addGridItem()
      .setTitle('28. Evalúe de 1 a 5 la calidad y disponibilidad de los siguientes recursos para su enseñanza:')
      .setRows([
        'Estado de equipamiento en talleres y laboratorios',
        'Disponibilidad de herramientas y maquinarias vigentes',
        'Disposición de materiales fungibles e insumos de práctica',
        'Calidad de recursos de la biblioteca o centro de recursos',
        'Conectividad de red e implementación de tecnología en salas'
      ])
      .setColumns(['1 (Muy deficiente)', '2 (Deficiente)', '3 (Regular)', '4 (Bueno)', '5 (Excelente)'])
      .setRequired(true);
      
  form.addParagraphTextItem()
      .setTitle('29. Si pudiera priorizar la adquisición o mejora de un (1) recurso en concreto para su módulo técnico, ¿Cuál sería y por qué?');

  // ***************************************************************
  // SECCIÓN K: GESTIÓN INSTITUCIONAL
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN K: GESTIÓN INSTITUCIONAL Y APOYO DIRECTIVO');

  form.addGridItem()
      .setTitle('30. Evalúe su nivel de satisfacción con los siguientes procesos de gestión institucional de 1 a 5:')
      .setRows([
        'Claridad, apoyo y liderazgo del equipo directivo/UTP',
        'Apoyo en la asignación de recursos materiales para sus clases',
        'Gestión en tiempos idóneos de requerimientos administrativos',
        'Resguardo de los tiempos no lectivos (planificación y evaluación)',
        'Calidad de los canales de comunicación interna (docentes/directivos)',
        'Sistemas de perfeccionamiento y formación continua docente'
      ])
      .setColumns(['1 (Muy insatisfecho)', '2 (Insatisfecho)', '3 (Neutral)', '4 (Satisfecho)', '5 (Muy Satisfecho)'])
      .setRequired(true);

  Logger.log('¡Formulario Docentes creado con éxito!');
  Logger.log('URL de edición: ' + form.getEditUrl());
  Logger.log('URL para responder: ' + form.getPublishedUrl());
}
