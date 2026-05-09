# 🎓 Plan de Desarrollo — Sistema de Gestión de Egresados
### Liceo María Elena · Fundación Chile
**Proveedor:** Sebastián La Rosa | **Duración:** 7 semanas (4 Mar – 21 Abr 2026)

> Este es el documento interno para la **planificación del proyecto**. Contiene cronogramas, hitos y control de entregables.
> *Para consultar la documentación técnica que explica el funcionamiento operativo del sistema y su arquitectura al cliente, referirse al archivo `documentacion_sistema.md`.*

---

## 🗓️ Cronograma por Fases

### ✅ FASE 1 — Arquitectura de Datos en Google Sheets (Semana 1)
**4 Mar – 10 Mar**

| Hoja | Datos requeridos en estructura base |
|---|---|
| `Egresados_Practica` | Respuestas encuesta egresados con práctica finalizada |
| `Egresados_Sin_Practica` | Respuestas encuesta egresados inactivos / sin práctica |
| `Empresas` | Respuestas encuesta retroalimentación centros practicantes |
| `Docentes` | Respuestas encuesta diagnóstica docentes liceo |
| `Catalogo_Especialidades` | Catálogo maestro (Mecánica Automotriz, Química Industrial, etc) |
| `Catalogo_Cohortes` | Años de egreso |
| `Preguntas_Abiertas` | Vista matriz de cruce relacional |

**Tareas de inicialización lógica:** Scripts para estructuración, validaciones relacionales de celdas cruzadas y mock de datos.
**Entregable:** Matriz de datos de Sheets implementada.

---

### 📝 FASE 2 — Implementación de los 4 Formularios (Semanas 2–3)
**11 Mar – 24 Mar**

**Hitos de Configuración Lógica a Programar (Google Forms y Triggers):**
- **Formulario 1:** Parametrizar ramas de lógica condicional (Ej: mostrar sección H solo bajo condición previa). Elaborar triggers de mensajería (alerta ofertas empleo).
- **Formulario 2:** Construcción del auto-etiquetado en hoja al ejecutar onSubmit.
- **Formulario 3:** Cruce comparativo automatizado de Empresa consultadas respecto a bases de egreso.
- **Formulario 4:** Motor procesador de puntos en matriz competencias digitales docentes.

**Entregable:** 4 Formularios interconectados por código funcionando en producción.

---

### 📊 FASE 3 — Dashboard Looker Studio (Semanas 3–5) [80%]
**18 Mar – 7 Abr**
*(Estado: Funcional, falta mejorar los diseños)*

> [!IMPORTANT]
> Este es el **primer hito de pago (50% = $1.000.000 CLP)**.

**Tareas por Completar:**
- Vincular las vistas SQL-like del sheet pre-limpiado a fuentes Looker Studio.
- Maquetar Reporte Visión General (KPI's de Satisfacción, Empleabilidad global).
- Maquetar Reporte Trayectorias Educacionales.
- Maquetar Reporte Inserción Laboral.
- Maquetar Comparativas por Cohorte Estudiantil.
- Maquetar Panel Demográfico y Variables de Equidad Socioeconómicas.

**Entregable:** Reporte de Dashboard multi-página en su link productivo final.

---

### ✅ FASE 4 — Interfaz Web de Análisis Cualitativo (Semanas 5–6)
**1 Abr – 14 Abr** · *Código completo — pendiente de deploy*

**Archivos entregados en `Fase_4_Analisis_Cualitativo/`:**
| Archivo | Contenido | Estado |
|---|---|---|
| `index.html` | Template HtmlService (`<?!= include() ?>`) con HTML completo | ✅ Listo |
| `style.html` | CSS responsivo completo embebido en `<style>` | ✅ Listo |
| `script.html` | Lógica JS cliente: filtros, tabla paginada, panel detalle, exportar CSV | ✅ Listo |
| `Codigo.gs` | `doGet`, `include`, `getRespuestasAbiertas`, `exportarCSV` | ✅ Listo |

**Pendiente de deploy (acción requerida):**
1. Crear proyecto Apps Script (desde Sheets: `Extensiones > Apps Script`).
2. Pegar `Codigo.gs` y los tres `.html` en el editor.
3. Completar `SPREADSHEET_ID` en `Codigo.gs` con el ID del Sheets del proyecto.
4. Ajustar los nombres de hoja (`hoja:`) y columnas (`col:`) en `SHEET_CONFIG` para que coincidan con los encabezados reales del Sheets.
5. `Implementar > Nueva implementación > Aplicación web` — acceso al dominio de la organización.
6. Copiar la URL resultante y pegarla en `LINKS.cualitativo` del Portal (Fase 5).

**Entregable:** Portal Web analítico privado habilitado.

---

### ✅ FASE 5 — Landing Page y Actas de Revisión (Semana 6–7)
**8 Abr – 14 Abr** · *Código completo — pendiente de deploy y configuración de links*

**Archivos entregados en `Fase_5_Landing_Page/`:**
| Archivo | Contenido | Estado |
|---|---|---|
| `index.html` | Portal Central completo (CSS embebido, auto-contenido; funciona estático y en GAS) | ✅ Listo |
| `Codigo.gs` | `doGet`, `getActasRecientes`, `registrarActa` (crea hoja Actas automáticamente) | ✅ Listo |
| `style.css` | Solo referencia — el CSS real está embebido en `index.html` | ✅ Listo |

**Funcionalidades implementadas:**
- Indicadores de estado del sistema (verde = link activo, amarillo = pendiente).
- 4 cards de encuestas con acceso directo por audiencia.
- 2 cards de herramientas (Looker Studio + Análisis Cualitativo).
- Sistema de Actas: tabla dinámica en modo GAS, modal "Nueva Acta" con validación, fallback a link Sheets en modo estático.

**Pendiente de deploy (acción requerida):**
1. Crear proyecto Apps Script independiente (o añadir al mismo proyecto GAS del sistema).
2. Pegar `Codigo.gs` e `index.html` en el editor.
3. Completar `SPREADSHEET_ID` en `Codigo.gs`.
4. `Implementar > Nueva implementación > Aplicación web`.
5. **Configurar links** en el objeto `LINKS` dentro de `index.html` (bloque claramente marcado):

```js
const LINKS = {
    enc1_practica:  '',   // ← URL Google Form Enc. 1
    enc2_sin:       '',   // ← URL Google Form Enc. 2
    enc3_empresas:  '',   // ← URL Google Form Enc. 3
    enc4_docentes:  '',   // ← URL Google Form Enc. 4
    looker:         '',   // ← URL Looker Studio (solo lectura)
    cualitativo:    '',   // ← URL Web App Fase 4
    actas_sheets:   '',   // ← URL Google Sheets del proyecto
};
```

**Entregable:** Landing Page central funcionando junto con el libro logueador de Actas operante.

---

### 📚 FASE 6 — Documentación y Cierre (Semana 7)
**15 Abr – 21 Abr**

**Tareas por Completar:**
- Crear documentación manual de uso corporativo completo (`documentacion_sistema.md`).
- Grabar inducción en video-tutorial para traspadarlo a los mandantes técnicos del liceo o de la fundación.
- Ceremonia virtual de cierre y transferencia final de propiedad.

**Entregable:** Código completo + accesos a plataformas directas y todo el contenido educacional.

---

## 💰 Hitos de Pago

| Hito | Entregable | Pago |
|---|---|---|
| **Hito 1** — Fin Semana 5 | Dashboard Looker Studio (5 páginas) | $1.000.000 CLP (50%) |
| **Hito 2** — 21 Abril | Sistema completo + interfaz web + documentación | $1.000.000 CLP (50%) |

---

## 📦 Checklist de Entregables

### Código / Artefactos
- [x] Fase 1: Google Sheets con 7 hojas y estructura relacional listas (S1)
- [x] Fase 2: Formulario 1 — Egresados en Práctica, 12 secciones con lógica condicional (S2-S3)
- [x] Fase 2: Formulario 2 — Egresados sin Práctica, 7 secciones programadas (S2-S3)
- [x] Fase 2: Formulario 3 — Empresas Receptoras, 9 secciones lógicas (S2-S3)
- [x] Fase 2: Formulario 4 — Docentes EMTP, 11 secciones parametrizadas (S3)
- [x] Fase 4: Código completo de la Web App de análisis cualitativo (`index.html`, `style.html`, `script.html`, `Codigo.gs`)
- [x] Fase 5: Código completo del Portal Central + Sistema de Actas (`index.html`, `Codigo.gs`)

### Deploy / Integración en producción
- [ ] Fase 3 [80%]: Dashboard Looker Studio — 5 páginas integradas y diseño finalizado 🔴 *Hito de Pago 1*
- [x] Fase 4: Deploy de la Web App cualitativa en Google Apps Script — `https://script.google.com/macros/s/AKfycbxxGOGB_YPP3CZuvgvU_NvNP1vxuZT6Wgj-wrf4vaUp_1QNG3kdaEfcin0dvMMP79ibZw/exec`
- [x] Fase 4: Corrección de nombres de hojas y columnas en `SHEET_CONFIG` — dashboard carga respuestas correctamente
- [x] Fase 5: Deploy del Portal Central como Web App — `https://script.google.com/macros/s/AKfycbyhDsEsAJgt0tmpdS9PXK2YcUlCFFK8Brh8ZOKBxl7BGzqaj2cqSI2aJn17B_hCLS1D/exec`
- [x] Fase 5: Configurar el objeto `LINKS` en `index.html` con todas las URLs de producción
- [x] Fase 5: Verificar que la hoja `Actas` se crea correctamente al primer uso ✅
- [x] Fase 5: Corrección de icono `fa-wpforms` → `fa-clipboard-list` en Portal Central

### Cierre
- [ ] Fase 6: Documentación de manual de uso corporativo terminada
- [ ] Fase 6: Grabación de video-tutorial de inducción
- [ ] Fase 6: Ceremonia de cierre y transferencia de propiedad

---

## ⚠️ Puntos Pendientes del Proyecto

| Item | Detalle | Responsable |
|---|---|---|
| **Catálogo de Competencias Técnicas** | Poblar `Catalogo_Competencias` con las competencias reales de *Mecánica Automotriz* y *Química Industrial*. Bloqueante para la Sección D de Enc. 1 y Sección C de Enc. 3. | Coordinador Fundación Chile |
| ~~**Deploy Fase 4**~~ | ✅ Deployado — Web App activa. | ~~Desarrollador~~ |
| ~~**Deploy Fase 5**~~ | ✅ Deployado — Portal Central activo. | ~~Desarrollador~~ |
| ~~**Links de producción**~~ | ✅ Todos los 7 links configurados en `LINKS` (4 Forms + Looker + Cualitativo + Sheets). | ~~Desarrollador~~ |
| **Diseño final Looker Studio** | Pulir maquetación de las 5 páginas del dashboard (Hito de Pago 1 bloqueado hasta aquí). | Desarrollador |

---

*Proyecto: Liceo María Elena | Inicio: 4 de Marzo 2026 | Término: 21 de Abril 2026*
