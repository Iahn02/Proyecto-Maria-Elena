// ============================================
//  Portal Central — Liceo María Elena
//  Google Apps Script — Servidor (Codigo.gs)
//  Fase 5 · Fundación Chile
// ============================================

// ====== CONFIGURACIÓN ======
// ID del Google Sheets del proyecto (extraer de la URL entre /d/ y /edit).
// Si se deja vacío, el script usa el Spreadsheet activo.
const SPREADSHEET_ID = '';

// Nombre de la hoja donde se almacenan las actas.
const HOJA_ACTAS = 'Actas';

// Encabezados que se crearán automáticamente si la hoja está vacía.
const ENCABEZADOS_ACTAS = [
    'Fecha', 'Tipo', 'Asistentes', 'Temas', 'Acuerdos',
    'Responsable', 'Estado', 'URL_Minuta', 'Timestamp_Registro',
];


// ====== ENTRY POINTS ======

function doGet(e) {
    return HtmlService.createHtmlOutputFromFile('index')
        .setTitle('Portal · Sistema de Seguimiento de Egresados — Liceo María Elena')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


// ====== FUNCIONES PÚBLICAS ======

/**
 * Devuelve las últimas N actas registradas, ordenadas por fecha desc.
 * @param {number} n - Cantidad máxima de actas a devolver (por defecto 10).
 * @returns {Object[]} Array de objetos acta.
 */
function getActasRecientes(n) {
    try {
        const sheet = _getHojaActas();
        const raw   = sheet.getDataRange().getValues();
        if (raw.length < 2) return [];

        const headers   = raw[0].map(h => String(h).trim());
        const idxFecha  = headers.indexOf('Fecha');
        const idxTipo   = headers.indexOf('Tipo');
        const idxAsist  = headers.indexOf('Asistentes');
        const idxTemas  = headers.indexOf('Temas');
        const idxAcuer  = headers.indexOf('Acuerdos');
        const idxResp   = headers.indexOf('Responsable');
        const idxEst    = headers.indexOf('Estado');
        const idxUrl    = headers.indexOf('URL_Minuta');

        const filas = raw.slice(1).filter(f => f[idxFecha]);

        // Ordenar por fecha desc
        filas.sort((a, b) => {
            const da = new Date(a[idxFecha]);
            const db = new Date(b[idxFecha]);
            return db - da;
        });

        const limite = Math.min(n || 10, filas.length);
        return filas.slice(0, limite).map(f => ({
            fecha:       _formatFecha(f[idxFecha]),
            tipo:        String(f[idxTipo]  || ''),
            asistentes:  String(f[idxAsist] || ''),
            temas:       String(f[idxTemas] || ''),
            acuerdos:    String(f[idxAcuer] || ''),
            responsable: String(f[idxResp]  || ''),
            estado:      String(f[idxEst]   || 'Abierta'),
            url_minuta:  String(f[idxUrl]   || ''),
        }));
    } catch (err) {
        Logger.log('Error en getActasRecientes: ' + err.message);
        throw err;
    }
}

/**
 * Agrega una nueva acta al Sheets.
 * @param {Object} data - Campos del acta (ver ENCABEZADOS_ACTAS).
 */
function registrarActa(data) {
    try {
        _validarActa(data);
        const sheet = _getHojaActas();
        sheet.appendRow([
            data.fecha,
            data.tipo,
            data.asistentes,
            data.temas,
            data.acuerdos    || '',
            data.responsable,
            data.estado      || 'Abierta',
            data.url_minuta  || '',
            new Date(),
        ]);
    } catch (err) {
        Logger.log('Error en registrarActa: ' + err.message);
        throw err;
    }
}


// ====== HELPERS PRIVADOS ======

function _getSpreadsheet() {
    return SPREADSHEET_ID
        ? SpreadsheetApp.openById(SPREADSHEET_ID)
        : SpreadsheetApp.getActiveSpreadsheet();
}

function _getHojaActas() {
    const ss    = _getSpreadsheet();
    let   sheet = ss.getSheetByName(HOJA_ACTAS);

    // Crear la hoja con encabezados si no existe
    if (!sheet) {
        sheet = ss.insertSheet(HOJA_ACTAS);
        const row = sheet.getRange(1, 1, 1, ENCABEZADOS_ACTAS.length);
        row.setValues([ENCABEZADOS_ACTAS]);
        row.setFontWeight('bold');
        row.setBackground('#e8f0fe');
        sheet.setFrozenRows(1);
        sheet.setColumnWidth(1, 100);   // Fecha
        sheet.setColumnWidth(2, 110);   // Tipo
        sheet.setColumnWidth(3, 200);   // Asistentes
        sheet.setColumnWidth(4, 280);   // Temas
        sheet.setColumnWidth(5, 280);   // Acuerdos
        sheet.setColumnWidth(6, 130);   // Responsable
        sheet.setColumnWidth(7, 90);    // Estado
        sheet.setColumnWidth(8, 240);   // URL_Minuta
        sheet.setColumnWidth(9, 160);   // Timestamp_Registro
    }
    return sheet;
}

function _validarActa(data) {
    const requeridos = ['fecha', 'tipo', 'asistentes', 'temas', 'responsable'];
    requeridos.forEach(campo => {
        if (!data[campo] || !String(data[campo]).trim()) {
            throw new Error('Campo obligatorio faltante: ' + campo);
        }
    });
    const tiposValidos = ['Coordinación', 'Revisión', 'Seguimiento', 'Emergente'];
    if (!tiposValidos.includes(data.tipo)) {
        throw new Error('Tipo de acta no válido: ' + data.tipo);
    }
}

function _formatFecha(valor) {
    if (!valor) return '';
    const d = valor instanceof Date ? valor : new Date(valor);
    if (isNaN(d)) return String(valor);
    return Utilities.formatDate(d, Session.getScriptTimeZone(), 'yyyy-MM-dd');
}
