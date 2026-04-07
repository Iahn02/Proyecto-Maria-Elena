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
 * Obtiene todas las respuestas abiertas de la hoja "Preguntas_Abiertas"
 * y complementa con datos básicos del respondente usando el ID_Respuesta.
 */
function getRespuestasAbiertas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetAbiertas = ss.getSheetByName('Preguntas_Abiertas');
  
  if (!sheetAbiertas) {
    return { success: false, error: 'No se encontró la hoja Preguntas_Abiertas' };
  }
  
  const dataAbiertas = sheetAbiertas.getDataRange().getValues();
  if (dataAbiertas.length <= 1) {
    return { success: true, data: [] }; // Vacío
  }
  
  const headers = dataAbiertas[0];
  const rows = dataAbiertas.slice(1);
  
  // Transformar a objeto
  const results = rows.map((row, index) => {
    return {
      id: index + 1, // ID interno para UI
      id_respuesta: row[0],
      audiencia: extraerAudienciaDeFuente(row[1]),
      encuesta: row[1],
      seccion: row[2],
      preguntaLabel: row[3],
      texto: row[4],
      palabras: row[4] ? row[4].toString().split(/\s+/).length : 0,
      // Metadata adicional que se podría enriquecer cruzando datos
      especialidad: "No definida",
      cohorte: "No definida",
      respondente: "Anónimo (" + row[0] + ")"
    };
  });
  
  return { success: true, data: results };
}

/**
 * Mapeo rápido de encuesta a código de audiencia UI
 */
function extraerAudienciaDeFuente(fuenteEncuesta) {
  if (!fuenteEncuesta) return 'egr_practica'; // default
  
  const f = fuenteEncuesta.toLowerCase();
  if (f.includes('egresados con práctica') || f.includes('enc. 1')) return 'egr_practica';
  if (f.includes('egresados sin práctica') || f.includes('enc. 2')) return 'egr_sin';
  if (f.includes('empresas') || f.includes('enc. 3')) return 'empresas';
  if (f.includes('docentes') || f.includes('enc. 4')) return 'docentes';
  
  return 'egr_practica';
}
