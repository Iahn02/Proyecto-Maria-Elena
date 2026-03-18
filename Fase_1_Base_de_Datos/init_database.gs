/**
 * 🎓 Proyecto Liceo María Elena - Fundación Chile
 * Fase 1: Inicialización de Base de Datos en Google Sheets
 * 
 * Este script debe ejecutarse una vez dentro de un nuevo Google Sheet para:
 * 1. Crear las 7 hojas necesarias (Egresados Práctica, Sin Práctica, Empresas, Docentes, Catálogos y Preguntas Abiertas).
 * 2. Configurar los encabezados de cada hoja basándose en los formularios definitivos.
 * 3. Aplicar estilos y formatos condicionales básicos.
 */

function inicializarBaseDeDatos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Nombres de las hojas requeridas
  const hojas = [
    "Egresados_Practica",
    "Egresados_Sin_Practica",
    "Empresas",
    "Docentes",
    "Catalogo_Especialidades",
    "Catalogo_Cohortes",
    "Preguntas_Abiertas"
  ];

  // 1. Crear o limpiar hojas
  hojas.forEach(nombreHoja => {
    let sheet = ss.getSheetByName(nombreHoja);
    if (!sheet) {
      sheet = ss.insertSheet(nombreHoja);
    } else {
      sheet.clear(); // Si existe, la limpiamos para reinicializar
    }
  });

  // 2. Configurar Encabezados por Hoja
  configurarEgresadosPractica(ss.getSheetByName("Egresados_Practica"));
  configurarEgresadosSinPractica(ss.getSheetByName("Egresados_Sin_Practica"));
  configurarEmpresas(ss.getSheetByName("Empresas"));
  configurarDocentes(ss.getSheetByName("Docentes"));
  configurarCatalogoEspecialidades(ss.getSheetByName("Catalogo_Especialidades"));
  configurarCatalogoCohortes(ss.getSheetByName("Catalogo_Cohortes"));
  configurarPreguntasAbiertas(ss.getSheetByName("Preguntas_Abiertas"));

  // 3. Eliminar la hoja "Hoja 1" por defecto si existe y tenemos más hojas
  const hojasTotales = ss.getSheets();
  if (hojasTotales.length > hojas.length) {
    const hojaPorDefecto = ss.getSheetByName("Hoja 1");
    if (hojaPorDefecto) ss.deleteSheet(hojaPorDefecto);
    const sheet1 = ss.getSheetByName("Sheet1");
    if(sheet1) ss.deleteSheet(sheet1);
  }

  SpreadsheetApp.getUi().alert('✅ Base de datos inicializada correctamente.');
}

// -------------------------------------------------------------
// FUNCIONES DE CONFIGURACIÓN POR HOJA
// -------------------------------------------------------------

function aplicarEstilosEncabezado(sheet) {
  const rangoEncabezado = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  rangoEncabezado.setBackground("#0F9D58"); // Verde corporativo Google/Sheets
  rangoEncabezado.setFontColor("white");
  rangoEncabezado.setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function configurarEgresadosPractica(sheet) {
  const encabezados = [
    // Meta
    "Timestamp", "ID_Respuesta", 
    // A. Registro
    "Nombre_Completo", "Edad", "Genero", "Especialidad", "Anio_Egreso", "Empresa_Practica", "Cargo_Funciones", "Duracion_Meses", "Como_Consiguio_Practica",
    // B. Pertinencia
    "Relacion_Formacion_Practica", "Conocimientos_Mas_Utiles_Abierta", "Conocimientos_Faltantes_Abierta",
    // C. Calidad Enseñanza
    "Claridad_Explicaciones", "Equilibrio_Teoria_Practica", "Actualizacion_Contenidos", "Metodologias_Enseñanza", "Sistemas_Evaluacion", "Metodos_Mas_Efectivos",
    // D. Competencias Técnicas (Mecánica y Química separadas por bifurcación)
    "Comp_Tecnica_Mecanica_1", "Comp_Tecnica_Mecanica_2", "Comp_Tecnica_Mecanica_3", "Comp_Tecnica_Mecanica_4", "Comp_Tecnica_Mecanica_5",
    "Comp_Tecnica_Quimica_1", "Comp_Tecnica_Quimica_2", "Comp_Tecnica_Quimica_3", "Comp_Tecnica_Quimica_4", "Comp_Tecnica_Quimica_5",
    // E. Competencias Transversales
    "Trabajo_Equipo", "Comunicacion_Efectiva", "Resolucion_Problemas", "Iniciativa_Autonomia", "Liderazgo",
    // F. Competencias Digitales
    "Uso_Software_Especifico", "Herramientas_Ofimaticas", "Busqueda_Gestion_Info", "Comunicacion_Digital", "Seguridad_Informatica",
    // F. Habilidades Siglo XXI
    "Pensamiento_Critico", "Creatividad_Innovacion", "Alfabetizacion_Informacional", "Colaboracion_Redes", "Ciudadania_Digital", "Aprendizaje_Autonomo", "Flexibilidad_Adaptabilidad", "Habilidades_Interculturales", "Habilidades_Mas_Utiles_Abierta", "Habilidades_Faltantes_Abierta", "Fomento_Habilidades_Abierta", "Herramientas_Tecnologicas_Faltantes_Abierta",
    // G. Inserción Laboral
    "Oferta_Laboral_Practica", "Acepto_Oferta", "Situacion_Actual", "Encontro_Empleo_Formal", "Tiempo_Primer_Empleo", "Tiempo_Buscando_Empleo",
    // H. Articulación ES
    "Planes_Estudios_Superiores", "Tipo_Estudios_Superiores", "Convalido_Asignaturas",
    // I. Satisfacción
    "Satisfaccion_Formacion", "Satisfaccion_Preparacion_Practica", "Satisfaccion_Apoyo_Liceo", "Satisfaccion_Experiencia_General", "Satisfaccion_Perspectivas_Laborales", "Recomienda_Especialidad", "Aspectos_A_Mejorar_Abierta",
    // J. Orientación
    "Evaluacion_Orientacion_Vocacional", "Evaluacion_Prep_Entrevistas", "Evaluacion_Elaboracion_CV", "Evaluacion_Info_Continuidad", "Evaluacion_Acompañamiento", "Otros_Apoyos_Necesarios_Abierta",
    // K. Infraestructura
    "Evaluacion_Talleres", "Evaluacion_Equipamiento", "Evaluacion_Materiales", "Evaluacion_Biblioteca", "Evaluacion_Recursos_Tecnologicos", "Recursos_Indispensables_Abierta",
    // L. Equidad e Inclusión
    "Barreras_Percibidas", "Detalle_Barreras_Abierta", "Medidas_Inclusion_Liceo",
    // Control Interno
    "Estado_Procesamiento"
  ];
  sheet.appendRow(encabezados);
  aplicarEstilosEncabezado(sheet);
}

function configurarEgresadosSinPractica(sheet) {
  const encabezados = [
    // Meta
    "Timestamp", "ID_Respuesta",
    // A. Generales
    "Nombre_Completo", "Edad", "Genero", "Especialidad", "Anio_Egreso",
    // B. Motivos
    "Motivos_No_Practica", "Tuvo_Apoyo_Liceo",
    // C. Situación Actual
    "Situacion_Actual", "Tiempo_Desde_Egreso",
    // D. Planes futuros
    "Interes_Realizar_Practica_Futuro", "Motivo_No_Interes_Practica", "Interes_Continuar_Estudios", "Tipo_Estudios_Interes",
    // E. Orientación 
    "Evaluacion_Orientacion_Vocacional", "Evaluacion_Prep_Entrevistas", "Evaluacion_Info_Estudios_Sup", "Evaluacion_Elaboracion_CV", "Evaluacion_Acompañamiento", "Apoyo_Necesitado_Abierta",
    // F. Barreras
    "Barreras_Enfrentadas", "Necesidad_Actual_Para_Avanzar",
    // G. Comentarios
    "Sugerencias_Liceo_Abierta",
    // Control
    "Estado_Procesamiento"
  ];
  sheet.appendRow(encabezados);
  aplicarEstilosEncabezado(sheet);
}

function configurarEmpresas(sheet) {
  const encabezados = [
    // Meta
    "Timestamp", "ID_Respuesta",
    // A. Registro
    "Nombre_Empresa", "Sector_Productivo", "Tamanio_Empresa", "Cargo_Responde", "Num_Practicantes_2Anios", "Especialidades_Recibidas",
    // B. Pertinencia
    "Nivel_Alineacion", "Fortalezas_Observadas_Abierta", "Debilidades_Observadas_Abierta",
    // C. Competencias Técnicas (Mecánica y Química separadas por bifurcación)
    "Comp_Tecnica_Mecanica_1", "Comp_Tecnica_Mecanica_2", "Comp_Tecnica_Mecanica_3", "Comp_Tecnica_Mecanica_4", "Comp_Tecnica_Mecanica_5",
    "Comp_Tecnica_Quimica_1", "Comp_Tecnica_Quimica_2", "Comp_Tecnica_Quimica_3", "Comp_Tecnica_Quimica_4", "Comp_Tecnica_Quimica_5",
    // C. Competencias Transversales
    "Trabajo_Equipo", "Comunicacion_Efectiva", "Resolucion_Problemas", "Iniciativa_Autonomia", "Adaptabilidad_Cambio", "Puntualidad_Responsabilidad",
    // D. Competencias Digitales
    "Uso_Software_Especifico", "Herramientas_Ofimaticas", "Busqueda_Gestion_Info", "Comunicacion_Digital", "Seguridad_Informatica", "Comp_Digitales_Especificas", "Competencias_Digitales_Fundamentales_Abierta",
    // D. Habilidades SXXI
    "Pensamiento_Critico", "Creatividad_Innovacion", "Alfabetizacion_Informacional", "Colaboracion_Redes", "Comunicacion_Multimodal", "Aprendizaje_Autonomo", "Flexibilidad_Adaptabilidad", "Iniciativa_Autodireccion", "Habilidades_Interculturales", "Recomendaciones_Liceos_Abierta",
    // E. Vinculo Institucional
    "Mantiene_Colaboracion", "Tipo_Colaboracion", "Calidad_Comunicacion_Liceos", "Acciones_Fortalecer_Vinculo_Abierta",
    // F. Inserción Laboral
    "Contratado_Egresados_Ultimos_2_Años", "Factores_Contratacion", "Caracteristicas_Incrementarian_Contratacion_Abierta",
    // G. Innovación
    "Aspectos_A_Actualizar_Futuro_Abierta",
    // H. Equidad
    "Implementa_Politicas_Inclusion", "Tipo_Politicas_Inclusivas_Abierta", "Barreras_Grupos_Especificos_Abierta",
    // I. Satisfacción
    "Nivel_Satisfaccion_General", "Recomendaria_Especialidades", "Mejora_Principal_Formacion_Abierta", "Dispuesto_Participar_Mas_Abierta"
  ];
  sheet.appendRow(encabezados);
  aplicarEstilosEncabezado(sheet);
}

function configurarDocentes(sheet) {
  const encabezados = [
    // Meta
    "Timestamp", "ID_Respuesta",
    // A. Registro
    "Nombre_Completo", "Especialidad_Imparte", "Años_Exp_Docente", "Años_Exp_SectorProductivo", "Formacion_Pedagogica",
    // B. Pertinencia
    "Nivel_Actualizacion_Curriculum", "Frecuencia_Participacion_Revision", "Contenidos_A_Incorporar_Abierta", "Contenidos_Obsoletos_Abierta",
    // C. Metodologías
    "Uso_Clase_Expositiva", "Uso_Demo_Practica", "Uso_ABP_Proyectos", "Uso_ABP_Problemas", "Uso_Simulacion", "Uso_Estudio_Casos", "Uso_Trabajo_Equipo", "Uso_TIC", "Uso_Otros", "Incorporado_Nueva_Metodologia", "Equilibrio_Teoria_Practica", "Contextualizacion_Aprendizajes", "Fomento_Pensamiento_Critico", "Evaluacion_Competencias_Practicas", "Adaptacion_Estilos_Aprendizaje", "Obstaculos_Innovacion_Abierta",
    // D. Articulación
    "Conoce_Opciones_ES", "Mantiene_Contacto_ES", "Acciones_Preparacion_ES", "Obstaculos_Articulacion_ES_Abierta",
    // E. Vinculo Sector Productivo
    "Mantiene_Contacto_Empresas", "Actividades_Con_Empresas", "Actualizacion_Sector_Productivo", "Obstaculos_Vinculo_Empresas_Abierta",
    // F. Competencias Transversales
    "Estrategias_Desarrollo_Competencias_Abierta", "Logro_Competencias_Tecnicas", "Logro_Trabajo_Equipo", "Logro_Comunicacion", "Logro_Resolucion_Problemas", "Logro_Iniciativa", "Logro_Adaptabilidad", "Logro_Puntualidad", "Importancia_Habilidades_PensamientoCrit", "Importancia_Habilidades_Creatividad", "Importancia_Habilidades_AlfDigital", "Importancia_Habilidades_Colaboracion", "Importancia_Habilidades_ComMultimodal", "Importancia_Habilidades_AprendizajeAutonomo", "Importancia_Habilidades_Flexibilidad", "Importancia_Habilidades_Interculturales", "Curriculum_Favorece_Desarrollo", "Competencias_Dificiles_Abierta",
    // G. Competencias Digitales
    "Autoevaluacion_UsoSoftware", "Autoevaluacion_Ofimatica", "Autoevaluacion_BusquedaInfo", "Autoevaluacion_ComunicacionDig", "Autoevaluacion_SeguridadInfo", "Autoevaluacion_CompSectoriales", "Capacitacion_Reciente_TIC", "Tecnologias_A_Incorporar_Abierta",
    // H. Inserción
    "Realiza_Seguimiento_Laboral", "Procentaje_Insercion_Estimado", "Acciones_Empleabilidad_Abierta",
    // I. Orientación
    "Participa_Orientacion_Vocacional", "Estrategias_Dificultades_Aprendizaje_Abierta", "Tipo_Apoyo_Practica_Requerido",
    // J. Infraestructura
    "Calif_Talleres", "Calif_Equipamiento", "Calif_Materiales", "Calif_Biblioteca", "Calif_TICs", "Recursos_Prioritarios_Abierta",
    // K. Gestión Inst.
    "Apoyo_Recursos", "Apoyo_TiempoPlanificacion", "Apoyo_Directivo", "Apoyo_Capacitaciones", "Apoyo_GestionAdmin", "Apoyo_ComunicacionInterna", "Participa_Aseguramiento_Calidad"
  ];
  sheet.appendRow(encabezados);
  aplicarEstilosEncabezado(sheet);
}

function configurarCatalogoEspecialidades(sheet) {
  const encabezados = [
    "ID_Especialidad", "Nombre_Especialidad", "Competencia_Tecnica_1", "Competencia_Tecnica_2", "Competencia_Tecnica_3", "Competencia_Tecnica_4", "Competencia_Tecnica_5"
  ];
  sheet.appendRow(encabezados);
  
  // Datos iniciales
  sheet.appendRow(["ESP_01", "Mecánica Automotriz", "PENDIENTE", "PENDIENTE", "PENDIENTE", "PENDIENTE", "PENDIENTE"]);
  sheet.appendRow(["ESP_02", "Química Industrial", "PENDIENTE", "PENDIENTE", "PENDIENTE", "PENDIENTE", "PENDIENTE"]);
  
  aplicarEstilosEncabezado(sheet);
  sheet.autoResizeColumns(1, encabezados.length);
}

function configurarCatalogoCohortes(sheet) {
  const encabezados = ["Anio_Egreso", "Generacion"];
  sheet.appendRow(encabezados);
  sheet.appendRow(["2025", "Generación 2025"]);
  sheet.appendRow(["2024", "Generación 2024"]);
  sheet.appendRow(["2023", "Generación 2023"]);
  aplicarEstilosEncabezado(sheet);
}

function configurarPreguntasAbiertas(sheet) {
  const encabezados = [
    "ID_Respuesta", "Fuente_Encuesta", "Seccion", "Pregunta_Texto", "Respuesta_Texto", "Analisis_Sentimiento", "Tags"
  ];
  sheet.appendRow(encabezados);
  aplicarEstilosEncabezado(sheet);
}
