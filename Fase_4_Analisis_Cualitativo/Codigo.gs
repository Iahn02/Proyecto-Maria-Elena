// ============================================
//  Análisis Cualitativo — Liceo María Elena
//  Google Apps Script — Servidor (Codigo.gs)
//  Fase 4 · Fundación Chile
// ============================================

// ====== CONFIGURACIÓN ======
// Pegar el ID del Google Sheets (extraer de su URL entre /d/ y /edit).
// Si se deja vacío, el script intentará usar el Spreadsheet activo
// (útil si el proyecto GAS está vinculado directamente al Sheets).
const SPREADSHEET_ID = '1JIZSccMnRHwtDl1M_-Lf1TOwFA_Hmf4nbCPHAkGa3wY';

// IMPORTANTE: los valores de `hoja` deben coincidir exactamente con el nombre
// de la pestaña (tab) en el Google Sheets. Verificar en Sheets si los nombres
// difieren de los indicados aquí.
// Los valores de `col`, `colRespondente`, `colEspecialidad` y `colCohorte`
// deben coincidir exactamente con la primera fila (encabezados) de cada hoja,
// que Google Forms genera usando el texto literal de cada pregunta.
const SHEET_CONFIG = {
  enc1: {
    hoja: 'Egresados_Practica',
    audiencia: 'egr_practica',
    encuesta: 'Enc. 1',
    colRespondente: '1. Nombre completo',
    colEspecialidad: '14b. Especialidad técnica cursada (Esto adaptará las siguientes preguntas sobre competencias técnicas)',
    colCohorte: '5. Año de egreso',
    preguntas: [
      { id: 'p1_b1', label: 'Conocimientos más útiles en práctica',  seccion: 'Sección B', col: '11. ¿Qué conocimientos o habilidades adquiridos en su formación técnica le han resultado más útiles durante su práctica profesional?'   },
      { id: 'p1_b2', label: 'Habilidades que faltaron',              seccion: 'Sección B', col: '12. ¿Qué conocimientos o habilidades considera que faltaron en su formación técnica y hubieran sido necesarios para su práctica profesional?'   },
      { id: 'p1_c1', label: 'Métodos de enseñanza efectivos',        seccion: 'Sección C', col: '14. ¿Qué métodos de enseñanza considera que fueron más efectivos para su aprendizaje técnico? (Puede seleccionar más de una)'      },
      { id: 'p1_g1', label: 'Habilidades siglo XXI más útiles',      seccion: 'Sección G', col: '19. ¿Cuáles de estas habilidades del siglo XXI le han resultado más útiles durante su práctica profesional? (Mencione hasta tres)'  },
    ],
  },
  enc2: {
    hoja: 'Egresados_Sin_Practica',
    audiencia: 'egr_sin',
    encuesta: 'Enc. 2',
    colRespondente: '1. Nombre completo',
    colEspecialidad: '4. Especialidad técnica cursada en el Liceo',
    colCohorte: '5. Año de egreso',
    preguntas: [
      { id: 'p2_e1', label: 'Orientación/apoyo que necesitó', seccion: 'Sección E', col: '15. ¿Qué tipo de orientación o apoyo hubieras necesitado al egresar?'  },
      { id: 'p2_g1', label: 'Sugerencias al liceo',           seccion: 'Sección G', col: '18. ¿Qué sugerencias le harías al liceo para mejorar el apoyo a estudiantes que no han podido hacer su práctica profesional?'  },
    ],
  },
  enc3: {
    hoja: 'Empresas',
    audiencia: 'empresas',
    encuesta: 'Enc. 3',
    colRespondente: '4. Nombre y Cargo del responsable de completar la encuesta',
    colEspecialidad: '9b. Especialidad técnica de los practicantes que evaluará a continuación:',
    colCohorte: 'Periodo de aplicación (Uso interno)',
    preguntas: [
      { id: 'p3_b1', label: 'Fortalezas de practicantes',         seccion: 'Sección B', col: '8. ¿Cuáles considera que son las principales fortalezas demostradas por los practicantes del Liceo?'                                                                         },
      { id: 'p3_b2', label: 'Debilidades/brechas de practicantes', seccion: 'Sección B', col: '9. ¿Cuáles considera que son las principales debilidades técnicas o brechas formativas con las que llegan los practicantes?'                                                  },
      { id: 'p3_d1', label: 'Habilidades S.XXI deficientes',      seccion: 'Sección D', col: '12. ¿Qué habilidades del Siglo XXI o digitales observa como deficientes y que son prioritarias hoy en día en su sector productivo?'                                           },
      { id: 'p3_i1', label: 'Tecnologías emergentes a enseñar',   seccion: 'Sección I', col: '16. [INNOVACIÓN] Dado el avance tecnológico en su sector, ¿Qué conocimientos o tecnologías emergentes considera que el liceo debería enseñar urgentemente?'                  },
      { id: 'p3_j1', label: 'Recomendaciones al liceo',           seccion: 'Sección J', col: '19. Por favor, comparta cualquier otro comentario, sugerencia o recomendación clave hacia el Liceo:'                                                                          },
    ],
  },
  enc4: {
    hoja: 'Docentes',
    audiencia: 'docentes',
    encuesta: 'Enc. 4',
    colRespondente: '1. Nombre completo',
    colEspecialidad: '2. Especialidad principal en la que imparte clases',
    colCohorte: 'Periodo de aplicación (Uso interno)',
    preguntas: [
      { id: 'p4_b1', label: 'Contenidos a incorporar en currículum',        seccion: 'Sección B', col: '7. ¿Qué temáticas, tecnologías o contenidos (que no están en el plan actual) considera que deberían incorporarse con urgencia?'      },
      { id: 'p4_b2', label: 'Contenidos obsoletos',                          seccion: 'Sección B', col: '8. ¿Qué contenidos actuales considera que están obsoletos y deberían eliminarse o reducirse del plan de estudios?'       },
      { id: 'p4_c1', label: 'Obstáculos para metodologías innovadoras',      seccion: 'Sección C', col: '11. ¿Cuáles son los principales obstáculos o restricciones que enfrenta para implementar metodologías innovadoras en su asignatura/módulo?'    },
      { id: 'p4_f1', label: 'Estrategias competencias transversales/S.XXI',  seccion: 'Sección F', col: '18. ¿Qué estrategias pedagógicas considera eficaces para el desarrollo de competencias transversales y habilidades del siglo XXI en contextos técnico-profesionales?'  },
      { id: 'p4_g1', label: 'Tecnologías/equipamiento prioritarios',         seccion: 'Sección G', col: '21. ¿Qué equipamiento o tecnologías (software/hardware) son prioritarias de incorporar urgentemente para impartir mejor su módulo?'   },
      { id: 'p4_h1', label: 'Acciones para mejorar empleabilidad',           seccion: 'Sección H', col: '24. ¿Qué acciones adicionales sugiere implementar para mejorar los niveles de empleabilidad efectiva e inserción laboral de sus egresados?'     },
      { id: 'p4_j1', label: 'Recursos/equipamiento prioritarios',            seccion: 'Sección J', col: '29. Si pudiera priorizar la adquisición o mejora de un (1) recurso en concreto para su módulo técnico, ¿Cuál sería y por qué?'      },
    ],
  },
};

// Mapeo de valor del select de especialidad → texto real en Sheets
const ESPECIALIDAD_MAP = {
  'mecanica': 'Mecánica Automotriz',
  'quimica':  'Química Industrial',
};


// ====== ENTRY POINTS ======

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Análisis Cualitativo — Liceo María Elena')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Helper requerido por HtmlService para <?!= include('archivo') ?>
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}


// ====== FUNCIONES PÚBLICAS (llamadas desde el cliente) ======

/**
 * Lee las 4 hojas del Sheets y devuelve todas las respuestas abiertas
 * como un array flat de objetos, una entrada por respuesta no vacía.
 */
function getRespuestasAbiertas() {
  try {
    const ss = _getSpreadsheet();
    const data = [];
    let globalId = 1;

    Object.values(SHEET_CONFIG).forEach(cfg => {
      const sheet = ss.getSheetByName(cfg.hoja);
      if (!sheet) {
        Logger.log('Hoja no encontrada: ' + cfg.hoja);
        return;
      }

      const raw = sheet.getDataRange().getValues();
      if (raw.length < 2) return; // sin datos

      const headerMap = _buildHeaderMap(raw[0]);

      const idxRes = _idx(headerMap, cfg.colRespondente);
      const idxEsp = _idx(headerMap, cfg.colEspecialidad);
      const idxCoh = _idx(headerMap, cfg.colCohorte);

      cfg.preguntas.forEach(preg => {
        const idxCol = _idx(headerMap, preg.col);
        if (idxCol === -1) {
          Logger.log('Columna no encontrada: ' + preg.col + ' en ' + cfg.hoja);
          return;
        }

        for (let r = 1; r < raw.length; r++) {
          const fila = raw[r];
          const texto = String(fila[idxCol] ?? '').trim();
          if (!texto) continue;

          data.push({
            id:           globalId++,
            id_respuesta: r,
            encuesta:     cfg.encuesta,
            audiencia:    cfg.audiencia,
            seccion:      preg.seccion,
            preguntaId:   preg.id,
            preguntaLabel: preg.label,
            especialidad: idxEsp >= 0 ? String(fila[idxEsp] ?? '').trim() : '',
            cohorte:      idxCoh >= 0 ? String(fila[idxCoh] ?? '').trim() : '',
            respondente:  idxRes >= 0 ? _primerNombre(String(fila[idxRes] ?? '')) : 'Anónimo',
            palabras:     _contarPalabras(texto),
            texto:        texto,
          });
        }
      });
    });

    return { success: true, data: data };
  } catch (err) {
    Logger.log('Error en getRespuestasAbiertas: ' + err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Genera un CSV de las respuestas que cumplan los filtros recibidos.
 * @param {Object} filtros - { audiencia, pregunta, especialidad, cohorte, search }
 */
function exportarCSV(filtros) {
  try {
    const result = getRespuestasAbiertas();
    if (!result.success) return result;

    const filtered = _aplicarFiltros(result.data, filtros);

    const encabezado = [
      'ID', 'ID_Respuesta', 'Encuesta', 'Audiencia',
      'Seccion', 'PreguntaID', 'Pregunta',
      'Especialidad', 'Cohorte', 'Respondente', 'Palabras', 'Respuesta',
    ].join(',');

    const filas = filtered.map(r => [
      r.id, r.id_respuesta, r.encuesta, r.audiencia,
      r.seccion, r.preguntaId, r.preguntaLabel,
      r.especialidad, r.cohorte, r.respondente, r.palabras, r.texto,
    ].map(_csvCell).join(','));

    return { success: true, csv: [encabezado, ...filas].join('\r\n') };
  } catch (err) {
    Logger.log('Error en exportarCSV: ' + err.message);
    return { success: false, error: err.message };
  }
}


// ====== HELPERS PRIVADOS ======

function _getSpreadsheet() {
  return SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
}

function _buildHeaderMap(headerRow) {
  const map = {};
  headerRow.forEach((h, i) => { map[String(h).trim()] = i; });
  return map;
}

function _idx(headerMap, colName) {
  return headerMap.hasOwnProperty(colName) ? headerMap[colName] : -1;
}

function _primerNombre(nombreCompleto) {
  const partes = nombreCompleto.trim().split(/\s+/);
  return partes.length >= 2 ? partes[0] + ' ' + partes[1] : partes[0] || 'Anónimo';
}

function _contarPalabras(texto) {
  return texto.split(/\s+/).filter(Boolean).length;
}

function _aplicarFiltros(data, filtros) {
  const { audiencia, pregunta, especialidad, cohorte, search } = filtros || {};
  return data.filter(r => {
    if (audiencia   && audiencia   !== 'all' && r.audiencia   !== audiencia)                           return false;
    if (pregunta    && pregunta    !== 'all' && r.preguntaId  !== pregunta)                            return false;
    if (especialidad && especialidad !== 'all') {
      const espLabel = ESPECIALIDAD_MAP[especialidad] || especialidad;
      if (r.especialidad !== espLabel)                                                                  return false;
    }
    if (cohorte     && cohorte     !== 'all' && r.cohorte     !== cohorte)                             return false;
    if (search      && !r.texto.toLowerCase().includes(search.toLowerCase()))                           return false;
    return true;
  });
}

function _csvCell(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  return (s.includes(',') || s.includes('"') || s.includes('\n'))
    ? '"' + s.replace(/"/g, '""') + '"'
    : s;
}
