/**
 * 🎓 Proyecto Liceo María Elena - Fundación Chile
 * Fase 1: Base de Datos
 * Script: crear_empty_docentes.gs
 *
 * Crea o recrea la hoja Empty_Docentes con la estructura actualizada,
 * compatible con el formulario generado por crear_encuesta_docentes.gs
 * (30 preguntas, 51 columnas en hoja Docentes → A hasta AY).
 *
 * La hoja Empty_Docentes es una vista normalizada que:
 * - Agrega ID_Respuesta automático (número de fila)
 * - Renombra las columnas con nombres cortos para análisis
 * - Lee en tiempo real desde la hoja "Docentes" (respuestas del Forms)
 *
 * INSTRUCCIONES:
 * 1. Abrir el Google Sheets "Base de Datos María Elena"
 * 2. Ir a Extensiones > Apps Script
 * 3. Pegar este script y ejecutar crearHojaEmptyDocentes()
 */

function crearHojaEmptyDocentes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const NOMBRE_HOJA = 'Empty_Docentes';
  const HOJA_FUENTE = 'Docentes';

  // Verificar que existe la hoja fuente
  if (!ss.getSheetByName(HOJA_FUENTE)) {
    SpreadsheetApp.getUi().alert(
      '❌ Error: No se encontró la hoja "' + HOJA_FUENTE + '".\n' +
      'Asegúrese de que el formulario de Docentes esté vinculado al Sheets.'
    );
    return;
  }

  // Eliminar hoja existente si existe
  let hoja = ss.getSheetByName(NOMBRE_HOJA);
  if (hoja) {
    ss.deleteSheet(hoja);
  }

  // Crear nueva hoja al final
  hoja = ss.insertSheet(NOMBRE_HOJA);

  // ---------------------------------------------------------------
  // ENCABEZADOS — 52 columnas
  // Mapeo 1:1 con la salida de la ARRAYFORMULA:
  // {Docentes!A \ FILA()-1 \ Docentes!B:AY}
  // ---------------------------------------------------------------
  const encabezados = [
    // ── Meta ──────────────────────────────────────────────
    'Timestamp',                          // A → Marca temporal
    'ID_Respuesta',                       // Generado: FILA()-1

    // ── Sección A: Registro ───────────────────────────────
    'Periodo_Aplicacion',                 // B → Uso interno
    'Nombre_Completo',                    // C → P1
    'Especialidad_Imparte',               // D → P2
    'Años_Exp_Docente',                   // E → P3
    'Formacion_Pedagogica',               // F → P4

    // ── Sección B: Pertinencia Curricular ─────────────────
    'Nivel_Actualizacion_Curriculum',     // G → P5 (escala 1-5)
    'Frecuencia_Actualizacion_Curriculum',// H → P6
    'Contenidos_A_Incorporar_Abierta',    // I → P7
    'Contenidos_Obsoletos_Abierta',       // J → P8

    // ── Sección C: Metodologías ───────────────────────────
    'Metodologias_Frecuentes',            // K → P9 (checkbox múltiple)
    'Frecuencia_Nuevas_Metodologias',     // L → P10
    'Obstaculos_Innovacion_Abierta',      // M → P11

    // ── Sección D: Articulación ES ────────────────────────
    'Conoce_Opciones_ES',                 // N → P12 (escala 1-5)
    'Acciones_Formativas_ES',             // O → P13 (checkbox múltiple)
    'Apoyo_Transicion_ES_Abierta',        // P → P14

    // ── Sección E: Vínculo Sector Productivo ──────────────
    'Mantiene_Contacto_Empresas',         // Q → P15
    'Acciones_Vinculacion_Abierta',       // R → P16

    // ── Sección F: Competencias / Habilidades Siglo XXI ──
    'Logro_PensamientoCritico',           // S → P17 [Pensamiento Crítico]
    'Logro_Creatividad',                  // T → P17 [Creatividad e Innovación]
    'Logro_Comunicacion',                 // U → P17 [Comunicación Efectiva]
    'Logro_Colaboracion',                 // V → P17 [Colaboración y Trabajo en Equipo]
    'Logro_Adaptabilidad',                // W → P17 [Adaptabilidad y Flexibilidad]
    'Logro_Responsabilidad',              // X → P17 [Responsabilidad y Disposición a aprender]
    'Estrategias_Competencias_Abierta',   // Y → P18

    // ── Sección G: Competencias Digitales Docentes ────────
    'Autoevaluacion_UsoSoftware',         // Z  → P19 [Software específico]
    'Autoevaluacion_Ofimatica',           // AA → P19 [Ofimática]
    'Autoevaluacion_BusquedaInfo',        // AB → P19 [Búsqueda y gestión de info]
    'Autoevaluacion_ComunicacionDig',     // AC → P19 [Comunicación digital]
    'Autoevaluacion_SeguridadInfo',       // AD → P19 [Seguridad de la información]
    'Autoevaluacion_CreacionContenidos',  // AE → P19 [Creación de contenidos digitales]
    'Capacitacion_Reciente_TIC',          // AF → P20
    'Tecnologias_A_Incorporar_Abierta',   // AG → P21

    // ── Sección H: Inserción Laboral ─────────────────────
    'Realiza_Seguimiento_Laboral',        // AH → P22
    'Porcentaje_Insercion_Estimado',      // AI → P23
    'Acciones_Empleabilidad_Abierta',     // AJ → P24

    // ── Sección I: Orientación Vocacional ─────────────────
    'Participa_Orientacion_Vocacional',   // AK → P25
    'Estrategias_Dificultades_Abierta',   // AL → P26
    'Tipo_Apoyo_Practica_Abierta',        // AM → P27

    // ── Sección J: Infraestructura ────────────────────────
    'Calif_Talleres',                     // AN → P28 [Talleres y laboratorios]
    'Calif_Equipamiento',                 // AO → P28 [Herramientas y maquinarias]
    'Calif_Materiales',                   // AP → P28 [Materiales fungibles]
    'Calif_Biblioteca',                   // AQ → P28 [Biblioteca / centro de recursos]
    'Calif_TICs',                         // AR → P28 [Conectividad y tecnología en salas]
    'Recursos_Prioritarios_Abierta',      // AS → P29

    // ── Sección K: Gestión Institucional ─────────────────
    'Apoyo_Directivo',                    // AT → P30 [Liderazgo directivo/UTP]
    'Apoyo_Recursos',                     // AU → P30 [Asignación de recursos]
    'Apoyo_GestionAdmin',                 // AV → P30 [Gestión administrativa]
    'Apoyo_TiempoPlanificacion',          // AW → P30 [Tiempos no lectivos]
    'Apoyo_ComunicacionInterna',          // AX → P30 [Comunicación interna]
    'Apoyo_Perfeccionamiento',            // AY → P30 [Sistemas de perfeccionamiento]
  ];

  // ---------------------------------------------------------------
  // 1. Escribir encabezados en Fila 1
  // ---------------------------------------------------------------
  hoja.getRange(1, 1, 1, encabezados.length).setValues([encabezados]);

  // Estilo encabezado
  const rngHeader = hoja.getRange(1, 1, 1, encabezados.length);
  rngHeader
    .setBackground('#0F9D58')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setWrap(true);

  hoja.setFrozenRows(1);
  hoja.setRowHeight(1, 60);

  // ---------------------------------------------------------------
  // 2. Insertar ARRAYFORMULA en A2
  // Lee desde Docentes!A3:AY, genera ID y normaliza columnas.
  // setFormulaLocal() acepta sintaxis en español (SI, \, ;).
  // ---------------------------------------------------------------
  const formula =
    '=ARRAYFORMULA(SI(' + HOJA_FUENTE + '!A3:A=""; ""; ' +
    '{' + HOJA_FUENTE + '!A3:A \\ ' +
    'FILA(' + HOJA_FUENTE + '!A3:A)-1 \\ ' +
    HOJA_FUENTE + '!B3:AY}))';

  hoja.getRange('A2').setFormulaLocal(formula);

  // ---------------------------------------------------------------
  // 3. Formato condicional: alternar color filas de datos
  // ---------------------------------------------------------------
  const rngDatos = hoja.getRange('A2:AZ');
  const reglaImpar = SpreadsheetApp.newConditionalFormatRule()
    .whenFormula('=Y(MOD(FILA();2)=0;A2<>"")')
    .setBackground('#F0F9F4')
    .setRanges([rngDatos])
    .build();
  hoja.setConditionalFormatRules([reglaImpar]);

  // ---------------------------------------------------------------
  // 4. Ajustar columnas
  // ---------------------------------------------------------------
  hoja.autoResizeColumns(1, encabezados.length);

  // ---------------------------------------------------------------
  // Log final
  // ---------------------------------------------------------------
  Logger.log('✅ Hoja "' + NOMBRE_HOJA + '" creada con éxito.');
  Logger.log('Total columnas: ' + encabezados.length);
  Logger.log('Fórmula insertada en A2: ' + formula);

  SpreadsheetApp.getUi().alert(
    '✅ Hoja "' + NOMBRE_HOJA + '" creada correctamente.\n' +
    'Columnas: ' + encabezados.length + '\n' +
    'Leyendo datos desde: "' + HOJA_FUENTE + '"'
  );
}
