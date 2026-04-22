/**
 * 🎓 Proyecto Liceo María Elena - Fundación Chile
 * Fase 4: Interfaz Web de Análisis Cualitativo
 * 
 * Controlador de Google Apps Script (Web App)
 */

function doGet(e) {
  // Retorna la vista index.html y setea el título
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Análisis Cualitativo · Liceo María Elena')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Función auxiliar para incluir archivos HTML/CSS/JS dentro del index principal
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Construye un mapa { ID_Respuesta → { especialidad, cohorte } } a partir de
 * una hoja de respondentes. Detecta las columnas por nombre (case-insensitive)
 * para ser resiliente ante reordenamientos de columnas en la hoja.
 *
 * @param {Spreadsheet} ss         - Spreadsheet activo
 * @param {string}      sheetName  - Nombre de la hoja a leer
 * @returns {Object} Mapa de lookup, o {} si la hoja no existe
 */
function buildRespondenteLookup(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return {};

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return {};

  const headers = data[0].map(h => h.toString().toLowerCase().trim());

  // Busca la columna cuyo header contiene la palabra clave
  function colIndex(keyword) {
    return headers.findIndex(h => h.includes(keyword));
  }

  const idCol           = colIndex('id_respuesta');
  const especialidadCol = colIndex('especialidad');
  // La cohorte puede estar como "Anio_Egreso" o "Año_Egreso" o "Cohorte"
  const cohorteCol      = colIndex('anio_egreso') !== -1
                            ? colIndex('anio_egreso')
                            : colIndex('año_egreso') !== -1
                              ? colIndex('año_egreso')
                              : colIndex('cohorte');

  // Sin columna de ID no podemos cruzar datos
  if (idCol === -1) return {};

  const lookup = {};
  data.slice(1).forEach(row => {
    const key = row[idCol] ? row[idCol].toString().trim() : null;
    if (!key) return;
    lookup[key] = {
      especialidad: especialidadCol !== -1 && row[especialidadCol]
                      ? row[especialidadCol].toString().trim()
                      : 'No definida',
      cohorte:      cohorteCol !== -1 && row[cohorteCol]
                      ? row[cohorteCol].toString().trim()
                      : 'No definida'
    };
  });

  return lookup;
}

/**
 * Mapeo de código de audiencia → nombre de hoja de respondentes
 */
const AUDIENCIA_SHEET_MAP = {
  'egr_practica': 'Egresados_Practica',
  'egr_sin':      'Egresados_Sin_Practica',
  'empresas':     'Empresas',
  'docentes':     'Docentes'
};

/**
 * Obtiene todas las respuestas abiertas de la hoja "Preguntas_Abiertas"
 * y complementa especialidad y cohorte cruzando el ID_Respuesta contra
 * las hojas de respondentes correspondientes.
 */
function getRespuestasAbiertas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetAbiertas = ss.getSheetByName('Preguntas_Abiertas');

  if (!sheetAbiertas) {
    return { success: false, error: 'No se encontró la hoja Preguntas_Abiertas' };
  }

  const dataAbiertas = sheetAbiertas.getDataRange().getValues();
  if (dataAbiertas.length <= 1) {
    return { success: true, data: [] };
  }

  // Construir lookups una sola vez (una lectura por hoja)
  const lookups = {};
  Object.entries(AUDIENCIA_SHEET_MAP).forEach(([codigo, nombre]) => {
    lookups[codigo] = buildRespondenteLookup(ss, nombre);
  });

  const rows = dataAbiertas.slice(1);

  const results = rows.map((row, index) => {
    const audiencia   = extraerAudienciaDeFuente(row[1]);
    const idResp      = row[0] ? row[0].toString().trim() : '';
    const lookup      = lookups[audiencia] || {};
    const meta        = lookup[idResp] || { especialidad: 'No definida', cohorte: 'No definida' };

    const preguntaLabel = row[3] ? row[3].toString() : '';
    return {
      id:            index + 1,
      id_respuesta:  idResp,
      audiencia:     audiencia,
      encuesta:      row[1],
      seccion:       row[2],
      preguntaLabel: preguntaLabel,
      preguntaId:    mapPreguntaToId(preguntaLabel, audiencia),
      texto:         row[4],
      palabras:      row[4] ? row[4].toString().split(/\s+/).length : 0,
      especialidad:  meta.especialidad,
      cohorte:       meta.cohorte,
      respondente:   'Anónimo (' + idResp + ')'
    };
  });

  return { success: true, data: results };
}

/**
 * Exporta a CSV las respuestas que coincidan con los filtros activos.
 * Reutiliza getRespuestasAbiertas() para no duplicar la lógica de cruce de datos.
 *
 * @param {Object} filtros  - { audiencia, pregunta, especialidad, cohorte, search }
 * @returns {{ success, csv, count } | { success, error }}
 */
function exportarCSV(filtros) {
  const resp = getRespuestasAbiertas();
  if (!resp.success) return { success: false, error: resp.error };

  const espMap = {
    'mecanica': 'Mecánica Automotriz',
    'quimica':  'Química Industrial'
  };

  let data = resp.data;

  if (filtros.audiencia    && filtros.audiencia    !== 'all') {
    data = data.filter(r => r.audiencia    === filtros.audiencia);
  }
  if (filtros.pregunta     && filtros.pregunta     !== 'all') {
    data = data.filter(r => r.preguntaLabel === filtros.pregunta);
  }
  if (filtros.especialidad && filtros.especialidad !== 'all') {
    const espVal = espMap[filtros.especialidad];
    if (espVal) data = data.filter(r => r.especialidad === espVal);
  }
  if (filtros.cohorte      && filtros.cohorte      !== 'all') {
    data = data.filter(r => r.cohorte      === filtros.cohorte);
  }
  if (filtros.search && filtros.search.trim()) {
    const q = filtros.search.toLowerCase().trim();
    data = data.filter(r => r.texto && r.texto.toLowerCase().includes(q));
  }

  // ── Construcción del CSV (RFC 4180) ──────────────────────────────────────
  function cell(val) {
    if (val === null || val === undefined) return '';
    const s = val.toString();
    // Escapar si contiene coma, comilla doble o salto de línea
    return (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r'))
      ? '"' + s.replace(/"/g, '""') + '"'
      : s;
  }

  const HEADERS = [
    'ID', 'ID_Respuesta', 'Encuesta', 'Audiencia',
    'Seccion', 'Pregunta', 'Especialidad', 'Cohorte',
    'Respondente', 'Palabras', 'Respuesta'
  ];

  const lines = [HEADERS.join(',')];
  data.forEach(r => {
    lines.push([
      r.id, r.id_respuesta, r.encuesta, r.audiencia,
      r.seccion, r.preguntaLabel, r.especialidad, r.cohorte,
      r.respondente, r.palabras, r.texto
    ].map(cell).join(','));
  });

  return { success: true, csv: lines.join('\r\n'), count: data.length };
}

/**
 * Mapea el texto de una pregunta abierta al ID canónico usado por la UI.
 * Usa palabras clave normalizadas; retorna null si no hay coincidencia.
 */
function mapPreguntaToId(preguntaTexto, audiencia) {
  if (!preguntaTexto || !audiencia) return null;
  const t = preguntaTexto.toString().toLowerCase();

  switch (audiencia) {
    case 'egr_practica':
      if (t.includes('conocimientos') && (t.includes('útil') || t.includes('util')))          return 'p1_b1';
      if (t.includes('faltaron') || t.includes('faltantes') || t.includes('habilidades que')) return 'p1_b2';
      if (t.includes('método') || t.includes('metodo') || t.includes('efectivo'))             return 'p1_c1';
      if (t.includes('siglo xxi') || (t.includes('habilidades') && t.includes('útil')))       return 'p1_g1';
      break;

    case 'egr_sin':
      if (t.includes('orientación') || t.includes('orientacion') || t.includes('apoyo'))      return 'p2_e1';
      if (t.includes('sugerencia') || t.includes('comentario') || t.includes('mejorar'))      return 'p2_g1';
      break;

    case 'empresas':
      if (t.includes('fortaleza'))                                                             return 'p3_b1';
      if (t.includes('debilidad'))                                                             return 'p3_b2';
      if (t.includes('deficiente') || t.includes('fundamental'))                              return 'p3_d1';
      if (t.includes('recomendaci'))                                                           return 'p3_i1';
      break;

    case 'docentes':
      if (t.includes('obsoleto'))                                                              return 'p4_b2';
      if (t.includes('incorporar') && (t.includes('currículo') || t.includes('curriculo') || t.includes('curriculum'))) return 'p4_b1';
      if (t.includes('obstáculo') || t.includes('obstaculo') || t.includes('innovadora'))     return 'p4_c1';
      if (t.includes('estrategia') && t.includes('siglo'))                                    return 'p4_f2';
      if (t.includes('estrategia') && t.includes('competencia'))                              return 'p4_f1';
      if (t.includes('tecnolog') && t.includes('especialidad'))                               return 'p4_g1';
      if (t.includes('empleabilidad') || (t.includes('inserci') && t.includes('laboral')))    return 'p4_h1';
      if (t.includes('recurso') || t.includes('equipamiento') || t.includes('prioritario'))   return 'p4_j1';
      break;
  }

  return null;
}

/**
 * Mapeo de texto de fuente a código de audiencia UI.
 * Cubre variantes de nombre: nombre largo, enc. N, enc_N, nombre de hoja.
 */
function extraerAudienciaDeFuente(fuenteEncuesta) {
  if (!fuenteEncuesta) return 'egr_practica';

  const f = fuenteEncuesta.toString().toLowerCase();
  if (f.includes('egresados con práctica') || f.includes('enc. 1') || f.includes('enc_1') || f === 'egresados_practica') return 'egr_practica';
  if (f.includes('egresados sin práctica') || f.includes('enc. 2') || f.includes('enc_2') || f === 'egresados_sin_practica') return 'egr_sin';
  if (f.includes('empresa')               || f.includes('enc. 3') || f.includes('enc_3')) return 'empresas';
  if (f.includes('docente')               || f.includes('enc. 4') || f.includes('enc_4')) return 'docentes';

  return 'egr_practica';
}
