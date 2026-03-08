# 🎓 Plan de Desarrollo — Sistema de Gestión de Egresados
### Liceo María Elena · Fundación Chile
**Proveedor:** Sebastián La Rosa | **Duración:** 7 semanas (4 Mar – 21 Abr 2026)

---

## 🧱 Stack Tecnológico

| Capa | Tecnología | Rol |
|---|---|---|
| **Base de datos** | Google Sheets | Almacenamiento estructurado relacional |
| **Formularios** | Google Forms + Apps Script | 4 encuestas con validaciones y lógica |
| **Automatización** | Google Apps Script | Triggers, procesamiento y categorización |
| **BI / Dashboard** | Looker Studio | Visualización (5 páginas) |
| **Frontend Web** | HTML/CSS/JS + Apps Script Web App | Análisis cualitativo de respuestas abiertas |

---

## 📋 Las 4 Encuestas del Sistema

| # | Encuesta | Audiencia | Secciones | Preguntas abiertas |
|---|---|---|---|---|
| 1 | Egresados **en** Práctica Profesional | Egresados haciendo práctica | A–L (12 secciones) | ~12 |
| 2 | Egresados **sin** Práctica Profesional | Egresados que no la realizaron | A–G (7 secciones) | ~3 |
| 3 | Empresas Receptoras | Supervisores en empresas | A–I (9 secciones) | ~12 |
| 4 | Docentes EMTP | Profesores del liceo | Por definir | — |

### Encuesta 1 — Egresados en Práctica (12 secciones)
| Sección | Contenido | Tipo Apps Script |
|---|---|---|
| A — Registro | Nombre, edad, género, especialidad, empresa práctica | Validación campos obligatorios |
| B — Pertinencia curricular | Relación formación ↔ práctica (escala 1–5) + 2 abiertas | Trigger onSubmit |
| C — Calidad enseñanza | Rating metodologías (5 aspectos) + 1 abierta | — |
| D — Competencias técnicas | Matriz 5×5 por especialidad (personalizable) | Lógica condicional por especialidad |
| E — Competencias transversales | Trabajo equipo, comunicación, resolución problemas… | — |
| F — Competencias digitales | Software, ofimática, ciberseguridad… (escala 1–5) | — |
| G — Habilidades siglo XXI | 8 habilidades (pensamiento crítico, creatividad…) | 3 preguntas abiertas |
| H — Inserción laboral | Oferta laboral, situación actual, tiempo para empleo | Lógica condicional |
| I — Articulación superior | ¿Estudia en ES? Convalidaciones | Lógica condicional |
| J — Satisfacción | Rating 5 aspectos + recomendación (NPS) | — |
| K — Infraestructura | Talleres, equipamiento, tecnología (escala 5 aspectos) | — |
| L — Equidad e inclusión | Barreras (múltiple opción) + 2 abiertas | — |

### Encuesta 2 — Egresados sin Práctica (7 secciones)
| Sección | Contenido | Tipo Apps Script |
|---|---|---|
| A — Datos generales | Nombre, edad, género, especialidad, año egreso | Validación |
| B — Motivos | ¿Por qué no realizó práctica? (múltiple) + apoyo del liceo | — |
| C — Situación actual | Empleo, estudios, tiempo sin práctica | — |
| D — Planes futuros | ¿Interés en práctica/estudios superiores? | Lógica condicional |
| E — Orientación y apoyo | Rating 5 servicios del liceo | — |
| F — Barreras | Económicas, redes, información… + qué necesitan | — |
| G — Comentarios | 1 pregunta abierta de sugerencias | — |

### Encuesta 3 — Empresas Receptoras (9 secciones)
| Sección | Contenido | Tipo Apps Script |
|---|---|---|
| A — Registro | Nombre empresa, sector, tamaño, nº practicantes | Validación |
| B — Pertinencia | Alineación formación ↔ necesidades empresa | — |
| C — Competencias técnicas | Matriz 5×5 por especialidad (personalizable) | Lógica por especialidad |
| D — Competencias digitales | 6 dimensiones digitales + habilidades siglo XXI | — |
| E — Vínculo institucional | Tipo colaboración con liceos (múltiple) | — |
| F — Inserción laboral | ¿Contratan egresados? Factores de selección | — |
| G — Innovación | Preparación para cambios tecnológicos | — |
| H — Equidad | Políticas inclusión, barreras observadas | — |
| I — Satisfacción | NPS + 2 preguntas abiertas de retroalimentación | — |

### Encuesta 4 — Docentes EMTP (11 secciones)
| Sección | Contenido | Tipo Apps Script |
|---|---|---|
| A — Registro | Nombre, especialidad, años experiencia, formación pedagógica | Validación |
| B — Pertinencia curricular | Rating actualización curricular + frecuencia actualización + 2 abiertas | Trigger onSubmit |
| C — Metodologías | Metodologías usadas (múltiple), frecuencia actualización + 1 abierta | — |
| D — Articulación superior | Conocimiento ES, contacto instituciones, acciones preparación + 1 abierta | — |
| E — Vínculo empresas | Frecuencia contacto, tipo actividades, actualización en sector + 1 abierta | — |
| F — Competencias y siglo XXI | Rating logro alumnos (7 competencias) + habilidades siglo XXI (8) + 5 abiertas | Más preguntas abiertas del sistema |
| G — Competencias digitales | Autoevaluación digital docente (6 dims) + capacitación recibida + 1 abierta | — |
| H — Inserción laboral | ¿Hace seguimiento egresados? Estimación % inserción + 1 abierta | — |
| I — Orientación vocacional | Participación orientación, estrategias dificultades, apoyos en práctica | — |
| J — Infraestructura | Rating recursos/equipamiento (5 aspectos) + 1 abierta | — |
| K — Gestión institucional | Evalúa apoyo institucional, calidad procesos (escala 1–5) | — |

---

## 🗓️ Cronograma por Fases

### ✅ FASE 1 — Arquitectura de Datos en Google Sheets (Semana 1)
**4 Mar – 10 Mar**

| Hoja | Datos que almacena |
|---|---|
| `Egresados_Practica` | Respuestas encuesta 1 (secciones A–L) |
| `Egresados_Sin_Practica` | Respuestas encuesta 2 (secciones A–G) |
| `Empresas` | Respuestas encuesta 3 (secciones A–I) |
| `Docentes` | Respuestas encuesta 4 (secciones A–K) |
| `Catalogo_Especialidades` | Mecánica Automotriz, Química Industrial + competencias por especialidad |
| `Catalogo_Cohortes` | Años de egreso y generaciones |
| `Preguntas_Abiertas` | Vista consolidada (~20 preguntas abiertas de las 4 encuestas) |

**Apps Script de inicialización:** crea toda la estructura, encabezados, validaciones de celda y datos de prueba realistas.

**Entregable:** Google Sheets con 7 hojas, estructura relacional lista (ID_Egresado como clave primaria)

---

### 📝 FASE 2 — Implementación de los 4 Formularios (Semanas 2–3)
**11 Mar – 24 Mar**

#### Formulario 1: Egresados en Práctica (prioritario — más complejo)
- **Apps Script:** Lógica condicional secciones D/E/F según especialidad seleccionada
- **Apps Script:** Categorización automática de situación laboral al enviar
- **Apps Script:** Alerta a coordinador si egresado recibió oferta laboral
- Pregunta NPS en sección J generada automáticamente

#### Formulario 2: Egresados sin Práctica
- **Apps Script:** Mostrar/ocultar sección D según respuesta de interés
- **Apps Script:** Tag automático "SIN_PRACTICA" al guardar en Sheets

#### Formulario 3: Empresas Receptoras
- **Apps Script:** Personalización de competencias técnicas (sección C) según especialidad informada
- **Apps Script:** Trigger que cruza datos empresa con egresados al enviar

#### Formulario 4: Docentes EMTP (11 secciones, ~42 preguntas)
- **Apps Script:** Autoevaluación de competencias digitales docente (sección G) se procesa y genera puntaje automático
- **Apps Script:** Trigger que cruza estimación de inserción laboral del docente (sección H) con datos reales de egresados en Sheets
- **Apps Script:** Tag por especialidad para filtrado en dashboard

**Entregable:** 4 Google Forms completamente funcionales, todos conectados a Sheets con triggers activos

---

### 📊 FASE 3 — Dashboard Looker Studio (Semanas 3–5)
**18 Mar – 7 Abr**

> [!IMPORTANT]
> Este es el **primer hito de pago (50% = $1.000.000 CLP)**.

#### Página 1: Visión General
- Total egresados encuestados (por tipo: con práctica / sin práctica)
- Tasa de inserción laboral y continuidad estudios
- NPS promedio de satisfacción con el liceo
- Distribución por especialidad y cohorte

#### Página 2: Trayectorias Educativas
- % que continúa en ES (universitaria vs técnica)
- Tasa de convalidaciones logradas
- Carreras más elegidas post-egreso
- Filtros: especialidad, año egreso, cohorte

#### Página 3: Inserción Laboral
- Tasa de empleo formal vs informal
- % que fue contratado por empresa de práctica
- Tiempo promedio en encontrar empleo
- Vista empresas: satisfacción y NPS de supervisores

#### Página 4: Análisis por Cohorte
- Comparativa de competencias técnicas y transversales entre generaciones
- Evolución de habilidades siglo XXI por año
- Brechas detectadas por especialidad (Mecánica vs Química)

#### Página 5: Datos Demográficos y Equidad
- Distribución por género y especialidad
- Barreras reportadas (encuesta tipo L / sección equidad)
- Análisis de inclusión: grupos que reportaron dificultades

**Entregable:** Dashboard Looker Studio publicado (5 páginas, acceso compartido con cliente)

---

### 🌐 FASE 4 — Interfaz Web de Análisis Cualitativo (Semanas 5–6)
**1 Abr – 14 Abr**

La interfaz web mostrará y permitirá revisar **todas las respuestas abiertas** de las encuestas:

| Pregunta abierta | Encuesta origen |
|---|---|
| Conocimientos más útiles en práctica | Enc. 1 — Sección B |
| Habilidades que faltaron | Enc. 1 — Sección B |
| Métodos de enseñanza efectivos | Enc. 1 — Sección C |
| Habilidades siglo XXI más útiles | Enc. 1 — Sección G |
| Orientación/apoyo que necesitó | Enc. 2 — Sección E |
| Sugerencias al liceo | Enc. 2 — Sección G |
| Fortalezas de practicantes (empresas) | Enc. 3 — Sección B |
| Debilidades de practicantes (empresas) | Enc. 3 — Sección B |
| Habilidades deficientes (empresas) | Enc. 3 — Sección D |
| Recomendaciones a liceos (empresas) | Enc. 3 — Sección I |
| Contenidos a incorporar en currículum | Enc. 4 — Sección B |
| Contenidos obsoletos | Enc. 4 — Sección B |
| Obstáculos para metodologías innovadoras | Enc. 4 — Sección C |
| Estrategias para competencias transversales | Enc. 4 — Sección F |
| Estrategias para habilidades siglo XXI | Enc. 4 — Sección F |
| Tecnologías a incorporar por especialidad | Enc. 4 — Sección G |
| Acciones para mejorar empleabilidad | Enc. 4 — Sección H |
| Recursos/equipamiento prioritarios | Enc. 4 — Sección J |

**Funcionalidades:**
- Autenticación Google (solo equipo Fundación Chile)
- Tabla paginada filtrable por: audiencia, encuesta, sección, especialidad, cohorte
- Vista de detalle de respuesta completa del respondente
- Buscador por palabra clave en texto libre
- Diseño responsive (escritorio y tablet)

**Stack:** HTML/CSS/JS + Apps Script Web App como backend
**Hosting:** Apps Script Web App (sin costo)

**Entregable:** URL de interfaz web funcional con acceso autenticado

---

### 📚 FASE 5 — Documentación y Cierre (Semana 7)
**15 Abr – 21 Abr**

| Documento | Contenido |
|---|---|
| Documentación técnica | Estructura Sheets, scripts, triggers, instrucciones de mantenimiento |
| Manual de usuario | Guía para el equipo Fundación Chile |
| Video tutorial | Grabación 5–10 min del sistema completo |
| Sesión de traspaso | Reunión de cierre con el cliente |

**Entregable:** Pack completo de documentación + sistema en producción

---

## 💰 Hitos de Pago

| Hito | Entregable | Pago |
|---|---|---|
| **Hito 1** — Fin Semana 5 | Dashboard Looker Studio (5 páginas) | $1.000.000 CLP (50%) |
| **Hito 2** — 21 Abril | Sistema completo + interfaz web + documentación | $1.000.000 CLP (50%) |

---

## 📦 Checklist de Entregables

- [ ] Google Sheets con 7 hojas y estructura relacional (S1)
- [ ] Formulario 1: Egresados en Práctica — 12 secciones con lógica (S2–S3)
- [ ] Formulario 2: Egresados sin Práctica — 7 secciones (S2–S3)
- [ ] Formulario 3: Empresas Receptoras — 9 secciones (S2–S3)
- [ ] Formulario 4: Docentes EMTP — 11 secciones (S3)
- [ ] Dashboard Looker Studio — 5 páginas 🔴 *Hito 50%* (S3–S5)
- [ ] Interfaz web de análisis cualitativo (~18 preguntas abiertas) (S5–S6)
- [ ] Documentación técnica + Manual de usuario (S7)

---

## ⚠️ Punto Pendiente

| Item | Detalle | Responsable |
|---|---|---|
| **Competencias técnicas** | Secciones D de encuestas 1, 3 y 4 tienen celdas genéricas. Llenar hoja `Catalogo_Competencias` en Sheets con las competencias reales de Mecánica Automotriz y Química Industrial | Coordinador Fundación Chile |

---

*Proyecto: Liceo María Elena | Inicio: 4 de Marzo 2026 | Término: 21 de Abril 2026*
