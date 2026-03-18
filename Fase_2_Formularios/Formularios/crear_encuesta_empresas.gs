/**
 * 🎓 Proyecto Liceo María Elena - Fundación Chile
 * Fase 2: Creación de Formularios
 * Formulario 3: Empresas Receptoras
 * 
 * Este script utiliza FormApp para construir de manera automática el 
 * formulario dirigido a las Empresas Receptoras, según la estructura definida
 * en el plan_desarrollo.md (9 Secciones: A a la I).
 */

function crearFormularioEmpresas() {
  // 1. Crear el formulario
  const form = FormApp.create('Liceo María Elena | Encuesta a Empresas Receptoras');
  form.setDescription('Objetivo: Recoger información valiosa de las empresas y organizaciones que reciben a estudiantes en práctica profesional del Liceo Técnico Profesional, con el fin de fortalecer la vinculación entre el mundo educativo y laboral.\n\nSus respuestas son confidenciales e invaluables para nuestra mejora continua.')
      .setConfirmationMessage('¡Muchas gracias por su valiosa retroalimentación! Su opinión nos permite continuar mejorando la formación de los futuros técnicos.')
      .setAllowResponseEdits(false)
      .setAcceptingResponses(true);
      
  // ***************************************************************
  // SECCIÓN A: REGISTRO Y DATOS DE LA EMPRESA
  // ***************************************************************
  form.addSectionHeaderItem().setTitle('SECCIÓN A: REGISTRO Y DATOS DE LA EMPRESA');
  
  form.addTextItem().setTitle('1. Nombre de la Empresa o Institución').setRequired(true);
  
  form.addMultipleChoiceItem()
      .setTitle('2. Sector económico / Rubro de la empresa')
      .setChoiceValues([
        'Automotriz / Mecánica', 
        'Química / Laboratorio / Minería', 
        'Servicios', 
        'Comercio', 
        'Tecnología e Informática', 
        'Otro'
      ])
      .setRequired(true);
      
  form.addMultipleChoiceItem()
      .setTitle('3. Tamaño de la empresa (según número de trabajadores)')
      .setChoiceValues([
        'Microempresa (1 a 9)', 
        'Pequeña empresa (10 a 49)', 
        'Mediana empresa (50 a 199)', 
        'Gran empresa (200 o más)'
      ])
      .setRequired(true);
      
  form.addTextItem().setTitle('4. Nombre y Cargo del responsable de completar la encuesta').setRequired(true);
  
  form.addTextItem().setTitle('5. Número estimado de practicantes del Liceo María Elena recibidos en el último año').setRequired(true);

  // ***************************************************************
  // SECCIÓN B: PERTINENCIA CURRICULAR
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN B: PERTINENCIA DE LA FORMACIÓN Y DESEMPEÑO ESTUDIANTIL');
  
  form.addScaleItem()
      .setTitle('6. ¿Cómo evalúa el nivel general de preparación teórica con el que llegan los alumnos en práctica del Liceo?')
      .setBounds(1, 5)
      .setLabels('Muy deficiente', 'Excelente')
      .setRequired(true);
      
  form.addScaleItem()
      .setTitle('7. ¿Cómo evalúa la alineación entre la formación que reciben los alumnos y las necesidades y tareas reales de su empresa?')
      .setBounds(1, 5)
      .setLabels('Poca alineación', 'Totalmente alineados')
      .setRequired(true);
      
  form.addParagraphTextItem()
      .setTitle('8. ¿Cuáles considera que son las principales fortalezas demostradas por los practicantes del Liceo?');
      
  form.addParagraphTextItem()
      .setTitle('9. ¿Cuáles considera que son las principales debilidades técnicas o brechas formativas con las que llegan los practicantes?');

  // PREGUNTA CONDICIONAL (SALTO DE PÁGINA)
  const preguntaEspecialidadEmpresa = form.addMultipleChoiceItem()
      .setTitle('9b. Especialidad técnica de los practicantes que evaluará a continuación:')
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN C: COMPETENCIAS TÉCNICAS (BIFURCACIONES)
  // ***************************************************************
  
  // --- Rama Mecánica ---
  const secCMecanica = form.addPageBreakItem().setTitle('SECCIÓN C: COMPETENCIAS TÉCNICAS - MECÁNICA AUTOMOTRIZ');
  
  form.addGridItem()
      .setTitle('10a. Evalúe el nivel de desempeño de los estudiantes de Mecánica en las siguientes competencias técnicas:')
      .setRows([
        'Diagnóstico de motores y sistemas automotrices',
        'Manejo de instrumental y equipamiento de taller mecánico',
        'Capacidad para interpretar manuales y planos de la marca',
        'Aplicación de normativas de seguridad e higiene mecánica',
        'Resolución de fallas y anomalías mecánicas/eléctricas'
      ])
      .setColumns(['1 (Muy deficiente)', '2 (Deficiente)', '3 (Regular)', '4 (Bueno)', '5 (Excelente)'])
      .setRequired(true);

  // --- Rama Química ---
  const secCQuimica = form.addPageBreakItem().setTitle('SECCIÓN C: COMPETENCIAS TÉCNICAS - QUÍMICA INDUSTRIAL');

  form.addGridItem()
      .setTitle('10b. Evalúe el nivel de desempeño de los estudiantes de Química en las siguientes competencias técnicas:')
      .setRows([
        'Técnicas de muestreo y análisis de laboratorio',
        'Manejo seguro de reactivos químicos e instrumentación analítica',
        'Lectura de protocolos e interpretación de resultados de ensayos',
        'Control estricto de calidad en procesos industriales',
        'Aplicación de normas ambientales y bioseguridad'
      ])
      .setColumns(['1 (Muy deficiente)', '2 (Deficiente)', '3 (Regular)', '4 (Bueno)', '5 (Excelente)'])
      .setRequired(true);

  // ***************************************************************
  // SECCIÓN D: COMPETENCIAS DIGITALES Y HABILIDADES SIGLO XXI
  // ***************************************************************
  const secD = form.addPageBreakItem().setTitle('SECCIÓN D: COMPETENCIAS DIGITALES Y HABILIDADES DEL SIGLO XXI');
  
  // Configuración de saltos
  secCMecanica.setGoToPage(secD);
  
  preguntaEspecialidadEmpresa.setChoices([
    preguntaEspecialidadEmpresa.createChoice('Mecánica Automotriz', secCMecanica),
    preguntaEspecialidadEmpresa.createChoice('Química Industrial', secCQuimica),
    preguntaEspecialidadEmpresa.createChoice('Mezcla de ambas especialidades', secD)
  ]);
  
  form.addGridItem()
      .setTitle('11. Evalúe el desempeño de los practicantes en las siguientes competencias transversales y digitales:')
      .setRows([
        'Manejo de software y herramientas ofimáticas básicas',
        'Responsabilidad social y compromiso laboral',
        'Disposición para el aprendizaje continuo',
        'Capacidad de trabajo en equipo',
        'Comunicación asertiva con pares y superiores',
        'Autonomía e iniciativa'
      ])
      .setColumns(['1 (Muy deficiente)', '2 (Deficiente)', '3 (Regular)', '4 (Bueno)', '5 (Excelente)'])
      .setRequired(true);
      
  form.addParagraphTextItem()
      .setTitle('12. ¿Qué habilidades del Siglo XXI o digitales observa como deficientes y que son prioritarias hoy en día en su sector productivo?');

  // ***************************************************************
  // SECCIÓN E: VÍNCULO INSTITUCIONAL
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN E: VINCULACIÓN INSTITUCIONAL CON EL LICEO');
  
  form.addCheckboxItem()
      .setTitle('13. ¿A través de qué actividades le gustaría o suele colaborar con el liceo? (Seleccione todas las que apliquen)')
      .setChoiceValues([
        'Recibir estudiantes en Práctica Profesional',
        'Charlas o visitas guiadas a la empresa',
        'Participación en ferias vocacionales o seminarios',
        'Asesoría técnica en actualización de mallas curriculares (Consejo Asesor Empresarial)',
        'Donación de equipamiento o insumos',
        'Ninguna otra, además de las prácticas'
      ])
      .showOtherOption(true);

  // ***************************************************************
  // SECCIÓN F: INSERCIÓN LABORAL
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIÓN F: INSERCIÓN LABORAL Y CONTRATACIÓN');
  
  form.addMultipleChoiceItem()
      .setTitle('14. ¿Su empresa fomenta la contratación posterior a la práctica de estos egresados?')
      .setChoiceValues(['Sí, es frecuente', 'Solo en ocasiones, cuando hay vacantes', 'No, habitualmente no lo hacemos', 'Depende netamente del desempeño del practicante'])
      .setRequired(true);

  form.addCheckboxItem()
      .setTitle('15. ¿Cuáles son los principales factores de selección al momento de concretar una contratación? (Seleccione hasta 3)')
      .setChoiceValues([
        'Puntualidad e interés demostrado en la práctica',
        'Conocimientos técnicos sólidos',
        'Capacidad de trabajo en equipo',
        'Resolución rápida de problemas',
        'Respeto y buenas relaciones interpersonales',
        'Nivel formativo y prestigio del Liceo de procedencia'
      ])
      .showOtherOption(true)
      .setRequired(true);

  // ***************************************************************
  // SECCIONES G, H, I: INNOVACIÓN, EQUIDAD Y SATISFACCIÓN (Resumen)
  // ***************************************************************
  form.addPageBreakItem().setTitle('SECCIONES G, H, I: INNOVACIÓN, INCLUSIÓN Y SATISFACCIÓN GLOBAL');
  
  form.addParagraphTextItem()
      .setTitle('16. [INNOVACIÓN] Dado el avance tecnológico en su sector, ¿Qué conocimientos o tecnologías emergentes considera que el liceo debería enseñar urgentemente?');

  form.addMultipleChoiceItem()
      .setTitle('17. [EQUIDAD] ¿Su empresa cuenta con políticas de inclusión o equidad de género en cargos técnicos operativos?')
      .setChoiceValues([
        'Sí, y las aplicamos activamente',
        'Las tenemos definidas pero estamos en proceso de implementación',
        'No contamos con políticas definidas al respecto',
        'Desconoce'
      ])
      .setRequired(true);

  form.addScaleItem()
      .setTitle('18. [SATISFACCIÓN] ¿Recomendaría a otras empresas recibir practicantes del Liceo María Elena? (NPS)')
      .setBounds(0, 10)
      .setLabels('Nada probable', 'Muy probable')
      .setRequired(true);
      
  form.addParagraphTextItem()
      .setTitle('19. Por favor, comparta cualquier otro comentario, sugerencia o recomendación clave hacia el Liceo:');

  Logger.log('¡Formulario Empresas Receptoras creado con éxito!');
  Logger.log('URL de edición: ' + form.getEditUrl());
  Logger.log('URL para responder: ' + form.getPublishedUrl());
}
