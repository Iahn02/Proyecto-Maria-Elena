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

### 📊 FASE 3 — Dashboard Looker Studio (Semanas 3–5)
**18 Mar – 7 Abr**

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

### 🌐 FASE 4 — Interfaz Web de Análisis Cualitativo (Semanas 5–6)
**1 Abr – 14 Abr**

**Tareas por Completar:**
- Emplazar *Apps Script Web App* en Google.
- Crear endpoints `doGet()` y funciones puente con API Html Service.
- UI/UX HTML y CSS responsive, y motores de paginación JavaScript.

**Entregable:** Portal Web analítico privado habilitado.

---

### 🚀 FASE 5 — Landing Page y Actas de Revisión (Semana 6-7)
**8 Abr – 14 Abr**

**Tareas por Completar:**
- **Landing Page Centralizada:** Desarrollo del frontend del portal general que alojará los links a todas las demás herramientas ya hechas.
- **Actas de Seguimiento:** Conformar estructura relacional estándar (Fecha, Participantes, Conclusión).

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

- [ ] Fase 1: Google Sheets con 7 hojas y estructura relacional listas (S1)
- [ ] Fase 2: Formulario 1: Egresados en Práctica — 12 secciones con lógica condicional (S2-S3)
- [ ] Fase 2: Formulario 2: Egresados sin Práctica — 7 secciones programadas (S2-S3)
- [ ] Fase 2: Formulario 3: Empresas Receptoras — 9 secciones lógicas (S2-S3)
- [ ] Fase 2: Formulario 4: Docentes EMTP — 11 secciones parametrizadas (S3)
- [ ] Fase 3: Dashboard Looker Studio — 5 páginas de reporte integradas 🔴 *Hito de Pago* (S3-S5)
- [ ] Fase 4: Interfaz web corporativa de análisis cualitativo (S5-S6)
- [ ] Fase 5: Landing Page centralizadora montada en Apps Script (S6-S7)
- [ ] Fase 5: Espacio logueador de Actas de Revisión configurado (S6-S7)
- [ ] Fase 6: Cierre, Documentación terminada, y Manual para usuarios (S7)

---

## ⚠️ Puntos Pendientes del Proyecto

| Item de Trabajo | Detalle del Pendiente | Responsable Asignado |
|---|---|---|
| **Estandarización de Competencias Técnicas** | Es mandatorio que completen en la hoja de control `Catalogo_Competencias` las competencias reales aplicables a la matriz de las variantes *Mecánica Automotriz* y *Química Industrial*. Todo el código que se implementará condicionalmente las requiere cargadas primero. | Coordinador Fundación Chile |

---

*Proyecto: Liceo María Elena | Inicio: 4 de Marzo 2026 | Término: 21 de Abril 2026*
