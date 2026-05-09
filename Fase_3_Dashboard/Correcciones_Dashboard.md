# Correcciones Dashboard Looker Studio

Listado consolidado de observaciones a corregir antes de la entrega final del *Sistema de Seguimiento de Egresados* — Liceo María Elena.

---

## Página 1 — Visión General

- [ ] **NPS**: aclarar el concepto (qué mide) y la fórmula de puntuación utilizada (escala, agrupación promotores/pasivos/detractores, fórmula `% Promotores − % Detractores`). Agregar nota explicativa visible en el dashboard.

---

## Página 2 — Trayectorias Educacionales

- [ ] **Tipos de educación superior por especialidad**: el gráfico no corresponde a la información que se proporciona en la encuesta. Revisar fuente de datos y rehacer con los campos correctos de la encuesta de egresados.
- [ ] **Carreras más elegidas post-egreso**: el gráfico no corresponde a la información que se proporciona. Revisar de qué pregunta de la encuesta se está alimentando y corregir mapeo o reemplazar por la visualización correcta.

---

## Página 3 — Inserción Laboral

- [ ] **Empleo formal**: aclarar el indicador. Debería mostrarse simplemente como **"Empleo"** (no "empleo formal"), ya que la encuesta no distingue formalidad. Ajustar etiqueta del KPI y de la leyenda.
- [ ] **Contratado por empresa de práctica**: aclarar el cálculo. Mirando la encuesta el porcentaje real es bastante menor. Documentar **sobre qué pregunta** y con qué filtro se calcula este indicador, y validar que el resultado sea correcto.
- [ ] **Competencias para cada especialidad**: hacer codificación o síntesis de las respuestas enviadas. Las categorías ya están definidas en la encuesta — usar esas categorías como agrupación en lugar de mostrar respuestas crudas.

---

## Página 4 — Análisis por Cohorte

- [ ] **Gráfico 2**: no presenta segmentación por especialidad. Agregar dimensión de especialidad (filtro o serie) para que sea consistente con el resto de la página.
- [ ] **Escalas de gráficos inconsistentes**: un gráfico está en escala 1–5 y otro en escala 1–10. Unificar las escalas (o normalizar a una escala común) y dejar la convención explícita en el eje.

---

## Página 5 — Demográficos y Equidad

- [ ] **Brechas de inclusión**: el gráfico actual muestra género, no brechas. Además ese gráfico de género **ya aparece en la parte superior de la página** (duplicado). Reemplazar por una visualización real de brechas (por ejemplo: brecha por género × inserción laboral, brecha por especialidad × continuidad educativa, brecha por situación socioeconómica, etc.).
- [ ] **Rango etario de egresados**: el gráfico muestra edades simples, no rangos. Agruparlas en rangos etarios (ej. 18–20, 21–23, 24–26, 27+) y rehacer el gráfico como distribución por rango.

---

## Resumen de impacto por hoja `LS_`

| Página Looker | Hoja `LS_` afectada | Tipo de corrección |
|---|---|---|
| Visión General | `LS_Vista_VisionGeneral` | Documentación (NPS) |
| Trayectorias | `LS_Vista_Trayectorias` | Mapeo de datos (2 gráficos) |
| Inserción Laboral | `LS_Vista_InsercionLaboral` | Etiquetas + cálculo + codificación |
| Análisis por Cohorte | (revisar hoja correspondiente) | Segmentación + escalas |
| Demografía y Equidad | `LS_Vista_Demografia_Equidad` | Reemplazo de gráfico + agrupación en rangos |

> Las correcciones de **mapeo de datos** (Trayectorias, Inserción Laboral) probablemente requieren ajustes en `Fase_3_Dashboard/generar_vistas_looker.gs`. Las correcciones de **visualización** (escalas, etiquetas, agrupaciones) se hacen directamente en Looker Studio.
