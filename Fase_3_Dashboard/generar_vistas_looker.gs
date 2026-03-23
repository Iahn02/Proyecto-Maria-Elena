/**
 * 🎓 Proyecto Liceo María Elena - Fundación Chile
 * Fase 3: Generación de Vistas (SQL-like) para Looker Studio
 * 
 * UPDATE FINAL: Mapeo exacto Columna a Columna basándose en las matrices reales (Grid Items)
 * y columnas consolidadas de respuestas generadas nativamente por Google Forms.
 */

function generarVistasParaLookerStudio() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const vistas = [
    {
      nombre: "LS_Vista_VisionGeneral",
      origen: "Egresados_Practica",
      sql: "SELECT E, S, D, C, BC, BG, BH, BI, BL WHERE A IS NOT NULL LABEL E 'Año Egreso', S 'Especialidad', D 'Género', C 'Edad', BC 'Situación Actual', BG 'Satisfacción Formación', BH 'Preparación Práctica', BI 'Apoyo Liceo', BL 'Recomienda Especialidad'"
    },
    {
      nombre: "LS_Vista_Trayectorias",
      origen: "Egresados_Practica",
      sql: "SELECT E, S, BE, BF WHERE A IS NOT NULL LABEL E 'Año Egreso', S 'Especialidad', BE 'Estudios Superiores', BF 'Convalidó Asignaturas'"
    },
    {
      nombre: "LS_Vista_InsercionLaboral",
      origen: "Egresados_Practica",
      sql: "SELECT E, S, BB, BC, BD WHERE A IS NOT NULL LABEL E 'Año Egreso', S 'Especialidad', BB 'Oferta Práctica', BC 'Situación Laboral', BD 'Tiempo Primer Empleo'"
    },
    {
      nombre: "LS_Vista_Empresas_KPI",
      origen: "Empresas",
      sql: "SELECT B, C, D, K, AG, AH, AK WHERE A IS NOT NULL LABEL B 'Nombre Empresa', C 'Sector', D 'Tamaño', K 'Especialidad', AG 'Contrató Egresados', AH 'Factores Contratación', AK 'Recomendación Institución'"
    },
    {
      nombre: "LS_Vista_Demografia_Equidad",
      origen: "Egresados_Practica",
      sql: "SELECT E, S, D, C, BR, BT WHERE A IS NOT NULL LABEL E 'Año Egreso', S 'Especialidad', D 'Género', C 'Edad', BR 'Barreras Percibidas', BT 'Sugerencias Inclusión'"
    }
  ];

  const delimitador = getDelimitadorRegional(ss);

  vistas.forEach(vista => {
    let sheet = ss.getSheetByName(vista.nombre);
    if (!sheet) {
      sheet = ss.insertSheet(vista.nombre);
    } else {
      sheet.clear();
    }
    
    sheet.setTabColor("#4285F4");

    const hojaOrigen = ss.getSheetByName(vista.origen);
    if (hojaOrigen) {
      const letraCol = getLetraColumna(hojaOrigen.getMaxColumns());
      const rangoFormula = `${vista.origen}!A:${letraCol}`;
      const querySeguro = vista.sql.replace(/"/g, "'");
      
      sheet.getRange("A1").setValue(`=QUERY(${rangoFormula}${delimitador} "${querySeguro}"${delimitador} 1)`);
    } else {
      sheet.getRange("A1").setValue(`ERROR: Hoja de origen no encontrada (${vista.origen}).`);
    }
  });

  // Limpiar hoja de prueba temporal si aún existe
  const tempSheet = ss.getSheetByName("TempTest_Delimitador");
  if(tempSheet) ss.deleteSheet(tempSheet);

  console.log("✅ Vistas recalibradas a la matriz nativa de Forms y generadas con éxito.");
}

function getDelimitadorRegional(ss) {
  try {
    let sheetTest = ss.getSheetByName("TempTest_Delimitador");
    if (!sheetTest) {
        sheetTest = ss.insertSheet("TempTest_Delimitador");
    }
    sheetTest.getRange("A1").setFormula("=SUM(1, 2)");
    const formulaLocal = sheetTest.getRange("A1").getFormulaLocal();
    return formulaLocal.includes(";") ? ";" : ",";
  } catch (e) {
    return ";"; 
  }
}

function getLetraColumna(columna) {
  let temp, letra = '';
  while (columna > 0) {
    temp = (columna - 1) % 26;
    letra = String.fromCharCode(temp + 65) + letra;
    columna = (columna - temp - 1) / 26;
  }
  return letra;
}
