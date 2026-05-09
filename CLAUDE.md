# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Naturaleza del repositorio

Este repositorio NO es una aplicación con build/test/lint convencional. Es el **repositorio de entrega** del *Sistema de Seguimiento de Egresados* del Liceo María Elena (Fundación Chile), compuesto por:

- **Documentación maestra** en la raíz (`README.md`, `documentacion_sistema.md`, `plan_desarrollo.md`).
- **Artefactos por fase** en directorios `Fase_2_Formularios/` … `Fase_5_Landing_Page/`.
- **Insumos de contenido** en `Encuestas/` (textos definitivos de las 4 encuestas) y `Mockups/`.

No hay `package.json`, suite de tests, linter ni pipeline. El "deploy" de las piezas web ocurre fuera de git: pegando el HTML/JS dentro del editor de **Google Apps Script** y publicando como Web App.

## Stack real (donde corre el código)

| Capa | Tecnología | Dónde vive |
|---|---|---|
| Base de datos | Google Sheets (7 hojas relacionales) | Workspace del cliente |
| Formularios | Google Forms + Apps Script (`onSubmit` triggers) | Workspace |
| Dashboard | Looker Studio (5 páginas) | Workspace |
| Análisis cualitativo | Apps Script Web App (`doGet` + HtmlService) | `Fase_4_Analisis_Cualitativo/` |
| Landing Page | HTML/CSS estático (también desplegable como Web App) | `Fase_5_Landing_Page/` |

Los archivos `.html` de `Fase_4_*` siguen la convención de Apps Script: `index.html` (plantilla), `script.html` (lógica JS, incluido vía `<?!= include('script') ?>`), `style.html` (CSS). No se sirven como sitio estático local — están escritos para HtmlService.

## Cómo iterar localmente

- **Previsualizar mockups y landing**: abrir el `index.html` correspondiente directamente en el navegador (los mockups en `Mockups/` y `Fase_5_Landing_Page/` son HTML/CSS planos).
- **Iterar el panel cualitativo**: editar los tres `.html` de `Fase_4_Analisis_Cualitativo/` y luego pegarlos en el proyecto Apps Script para probar. La data de `script.html` está actualmente *mockeada* (constante `PREGUNTAS` y arrays in-memory) — al conectar a Sheets reales hay que reemplazar esa fuente por `google.script.run` hacia funciones server-side.
- **Encuestas**: los `.txt` en `Encuestas/Encuestas Corregidas/` son la **fuente de verdad** del contenido de los 4 Google Forms. Cualquier ajuste de wording debe hacerse ahí primero, no directo en Forms.

## Arquitectura conceptual (las 4 encuestas → 1 dashboard)

El sistema gira en torno a **4 encuestas** que escriben a **hojas separadas** de un mismo Google Sheets, cruzadas por catálogos maestros (`Catalogo_Especialidades`, `Catalogo_Cohortes`, `Catalogo_Competencias`):

1. Egresados **en** práctica (12 secciones A–L)
2. Egresados **sin** práctica (7 secciones, auto-tag `SIN_PRACTICA` en `onSubmit`)
3. Empresas receptoras (9 secciones, cruce automático con base de egresados)
4. Docentes EMTP (11 secciones)

Looker Studio consume las hojas; la Web App de análisis cualitativo consume las ~18–20 preguntas abiertas distribuidas en las 4 encuestas (ver mapeo en `Fase_4_Analisis_Cualitativo/script.html`, constante `PREGUNTAS`). La Landing Page sólo enlaza a las piezas anteriores.

Detalle por sección de cada encuesta y lógica condicional: `documentacion_sistema.md`. Cronograma, hitos de pago y pendientes: `plan_desarrollo.md`.

## Contrato de datos: Web App cualitativa ↔ GAS backend

La función `loadExternalData()` en `script.html` llama a dos funciones server-side que deben existir en el proyecto Apps Script:

**`getRespuestasAbiertas()`** — debe devolver:
```js
{ success: true, data: [ /* array de objetos con estos campos */ ] }
// o en caso de error:
{ success: false, error: "mensaje" }
```
Cada objeto del array debe tener:
```
id, id_respuesta, encuesta, audiencia, seccion,
preguntaId, preguntaLabel, especialidad, cohorte, respondente, palabras, texto
```
- `audiencia` debe ser uno de: `egr_practica`, `egr_sin`, `empresas`, `docentes`.
- `preguntaId` es el ID corto (`p1_b1`, `p2_e1`…) usado por el filtro del frontend.

**`exportarCSV(filtros)`** — recibe el objeto `filtros` con campos `audiencia`, `pregunta`, `especialidad`, `cohorte`, `search`; devuelve `{ success: true, csv: "..." }`.

## Preguntas abiertas mapeadas por encuesta

Los nombres de tab en Sheets y los encabezados de columna son los exactos del Sheets real (verificados en producción). Ver `Fase_4_Analisis_Cualitativo/Codigo.gs` para el `SHEET_CONFIG` completo.

**Enc. 1 — `Egresados_Practica`** (`egr_practica`)
| ID | Label UI | Columna real en Sheets |
|---|---|---|
| `p1_b1` | Conocimientos más útiles en práctica | `11. ¿Qué conocimientos o habilidades adquiridos en su formación técnica le han resultado más útiles durante su práctica profesional?` |
| `p1_b2` | Habilidades que faltaron | `12. ¿Qué conocimientos o habilidades considera que faltaron en su formación técnica y hubieran sido necesarios para su práctica profesional?` |
| `p1_c1` | Métodos de enseñanza efectivos | `14. ¿Qué métodos de enseñanza considera que fueron más efectivos para su aprendizaje técnico? (Puede seleccionar más de una)` |
| `p1_g1` | Habilidades siglo XXI más útiles | `19. ¿Cuáles de estas habilidades del siglo XXI le han resultado más útiles durante su práctica profesional? (Mencione hasta tres)` |
- `colRespondente`: `1. Nombre completo` · `colEspecialidad`: `14b. Especialidad técnica cursada (Esto adaptará las siguientes preguntas sobre competencias técnicas)` · `colCohorte`: `5. Año de egreso`

**Enc. 2 — `Egresados_Sin_Practica`** (`egr_sin`)
| ID | Label UI | Columna real en Sheets |
|---|---|---|
| `p2_e1` | Orientación/apoyo que necesitó | `15. ¿Qué tipo de orientación o apoyo hubieras necesitado al egresar?` |
| `p2_g1` | Sugerencias al liceo | `18. ¿Qué sugerencias le harías al liceo para mejorar el apoyo a estudiantes que no han podido hacer su práctica profesional?` |
- `colRespondente`: `1. Nombre completo` · `colEspecialidad`: `4. Especialidad técnica cursada en el Liceo` · `colCohorte`: `5. Año de egreso`

**Enc. 3 — `Empresas`** (`empresas`)
| ID | Label UI | Columna real en Sheets |
|---|---|---|
| `p3_b1` | Fortalezas de practicantes | `8. ¿Cuáles considera que son las principales fortalezas demostradas por los practicantes del Liceo?` |
| `p3_b2` | Debilidades/brechas de practicantes | `9. ¿Cuáles considera que son las principales debilidades técnicas o brechas formativas con las que llegan los practicantes?` |
| `p3_d1` | Habilidades S.XXI deficientes | `12. ¿Qué habilidades del Siglo XXI o digitales observa como deficientes y que son prioritarias hoy en día en su sector productivo?` |
| `p3_i1` | Tecnologías emergentes a enseñar | `16. [INNOVACIÓN] Dado el avance tecnológico en su sector, ¿Qué conocimientos o tecnologías emergentes considera que el liceo debería enseñar urgentemente?` |
| `p3_j1` | Recomendaciones al liceo | `19. Por favor, comparta cualquier otro comentario, sugerencia o recomendación clave hacia el Liceo:` |
- `colRespondente`: `4. Nombre y Cargo del responsable de completar la encuesta` · `colEspecialidad`: `9b. Especialidad técnica de los practicantes que evaluará a continuación:` · `colCohorte`: `Periodo de aplicación (Uso interno)`

**Enc. 4 — `Docentes`** (`docentes`)
| ID | Label UI | Columna real en Sheets |
|---|---|---|
| `p4_b1` | Contenidos a incorporar en currículum | `7. ¿Qué temáticas, tecnologías o contenidos (que no están en el plan actual) considera que deberían incorporarse con urgencia?` |
| `p4_b2` | Contenidos obsoletos | `8. ¿Qué contenidos actuales considera que están obsoletos y deberían eliminarse o reducirse del plan de estudios?` |
| `p4_c1` | Obstáculos para metodologías innovadoras | `11. ¿Cuáles son los principales obstáculos o restricciones que enfrenta para implementar metodologías innovadoras en su asignatura/módulo?` |
| `p4_f1` | Estrategias competencias transversales/S.XXI | `18. ¿Qué estrategias pedagógicas considera eficaces para el desarrollo de competencias transversales y habilidades del siglo XXI en contextos técnico-profesionales?` |
| `p4_g1` | Tecnologías/equipamiento prioritarios | `21. ¿Qué equipamiento o tecnologías (software/hardware) son prioritarias de incorporar urgentemente para impartir mejor su módulo?` |
| `p4_h1` | Acciones para mejorar empleabilidad | `24. ¿Qué acciones adicionales sugiere implementar para mejorar los niveles de empleabilidad efectiva e inserción laboral de sus egresados?` |
| `p4_j1` | Recursos/equipamiento prioritarios | `29. Si pudiera priorizar la adquisición o mejora de un (1) recurso en concreto para su módulo técnico, ¿Cuál sería y por qué?` |
- `colRespondente`: `1. Nombre completo` · `colEspecialidad`: `2. Especialidad principal en la que imparte clases` · `colCohorte`: `Periodo de aplicación (Uso interno)`

## Vistas de Looker Studio (hojas `LS_`)

El dashboard consume hojas con prefijo `LS_` generadas por la función `generarVistasParaLookerStudio()` en `Fase_3_Dashboard/generar_vistas_looker.gs`. Las 5 vistas son:

| Hoja `LS_` | Página Looker |
|---|---|
| `LS_Vista_VisionGeneral` | Pág. 1 — Visión General |
| `LS_Vista_InsercionLaboral` | Pág. 2 — Inserción Laboral |
| `LS_Vista_Trayectorias` | Pág. 3 — Trayectorias Educacionales |
| `LS_Vista_Empresas_KPI` | Pág. 4 — Centros de Práctica |
| `LS_Vista_Demografia_Equidad` | Pág. 5 — Demográficos y Equidad |

Ver instrucciones de configuración completas en `Fase_3_Dashboard/Guia_Looker_Studio.md`.

## Restricciones del dominio a respetar

- Las matrices de **competencias técnicas** (Sección D de Enc. 1, Sección C de Enc. 3) son **condicionales por especialidad** y dependen de que `Catalogo_Competencias` esté poblado por el Coordinador Fundación Chile (pendiente declarado en `plan_desarrollo.md`). No hardcodear competencias.
- Las preguntas abiertas no deben mezclarse con la reportería cuantitativa de Looker — esa separación es **intencional** y motiva la existencia de la Web App de Fase 4.
- Acceso a la Web App cualitativa va por Identidad Google nativa (no implementar auth propio).
