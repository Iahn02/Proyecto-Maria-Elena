# 🎓 Documentación del Sistema — Gestión de Egresados
### Liceo María Elena · Fundación Chile

Esta documentación describe la arquitectura y el funcionamiento detallado del Sistema de Seguimiento de Egresados entregado al cliente (Fundación Chile).

---

## 🧱 Stack Tecnológico

| Capa | Tecnología | Rol |
|---|---|---|
| **Base de datos** | Google Sheets | Almacenamiento estructurado relacional |
| **Formularios** | Google Forms + Apps Script | 4 encuestas con validaciones y lógica |
| **Automatización** | Google Apps Script | Triggers, procesamiento y categorización |
| **BI / Dashboard** | Looker Studio | Visualización y reportes (5 páginas) |
| **Frontend Web** | HTML/CSS/JS + Apps Script Web App | Plataforma de análisis cualitativo de respuestas abiertas |
| **Landing Page** | Apps Script Web App | Portal centralizado para conectar encuestas, sistema y dashboard |
| **Gestión** | Google Docs/Sheets | Herramienta de registro de actas de revisión |

---

## 📋 Las 4 Encuestas del Sistema

| # | Encuesta | Audiencia | Secciones | Preguntas abiertas |
|---|---|---|---|---|
| 1 | Egresados **en** Práctica Profesional | Egresados haciendo práctica | A–L (12 secciones) | ~12 |
| 2 | Egresados **sin** Práctica Profesional | Egresados que no la realizaron | A–G (7 secciones) | ~3 |
| 3 | Empresas Receptoras | Supervisores en empresas | A–I (9 secciones) | ~12 |
| 4 | Docentes EMTP | Profesores del liceo | A-K (11 secciones) | ~12 |

### Encuesta 1 — Egresados en Práctica (12 secciones)
| Sección | Contenido | Lógica y Automatización |
|---|---|---|
| A — Registro | Nombre, edad, género, especialidad, empresa práctica | Validación de campos y obligatoriedad |
| B — Pertinencia curricular | Relación formación ↔ práctica + preguntas abiertas | — |
| C — Calidad enseñanza | Rating metodologías (5 aspectos) | — |
| D — Competencias técnicas | Matriz 5×5 sobre competencias técnicas | Condicional según especialidad seleccionada |
| E — Competencias transversales | Evaluación de trabajo en equipo, resolución, etc. | — |
| F — Competencias digitales | Escalado de ofimática, software, ciberseguridad | — |
| G — Habilidades siglo XXI | Pensamiento crítico, creatividad (8 aspectos) | — |
| H — Inserción laboral | Situación actual de empleo, estimaciones e ingresos | Condicionales automáticos sobre situación laboral |
| I — Articulación superior | Convalidaciones y continuidad de estudios | Condicional automático |
| J — Satisfacción | NPS y aspectos destacables del liceo | Sistema de cálculo de NPS |
| K — Infraestructura | Calificación a talleres, tecnologías | — |
| L — Equidad e inclusión | Medición de barreras y apoyo formativo | — |

### Encuesta 2 — Egresados sin Práctica (7 secciones)
| Sección | Contenido | Lógica y Automatización |
|---|---|---|
| A — Datos generales | Nombre, edad, género, especialidad y egreso | — |
| B — Motivos | Razones de no práctica y apoyo | Taggeado automático "SIN_PRACTICA" |
| C — Situación actual | Situación laboral o formativa del excluido | — |
| D — Planes futuros | Proyecciones a corto y mediano plazo | Condicionales mostrar/ocultar |
| E — Orientación y apoyo | Evaluación a orientadores y equipo liceo | — |
| F — Barreras | Obstáculos de comunicación, redes e ingresos | — |
| G — Comentarios | Feedback directo al equipo directivo | — |

### Encuesta 3 — Empresas Receptoras (9 secciones)
| Sección | Contenido | Lógica y Automatización |
|---|---|---|
| A — Registro | Identificación empresa y roles | Validación de tamaño empresa |
| B — Pertinencia | Match entre formación técnica y necesidades | — |
| C — Competencias técnicas | Evaluación directa del practicante en terreno | Condicional por especialidad escogida |
| D — Competencias digitales | Dimensiones técnicas de TIC's en el trabajo | — |
| E — Vínculo institucional | Profundidad de la relación Liceo ↔ Empresa | — |
| F — Inserción laboral | Tipos de contratación sobre egresados | Cruce de datos empresa/practicante |
| G — Innovación | Resiliencia ante cambios y modernización | — |
| H — Equidad | Políticas de inclusión adoptadas por empresa | — |
| I — Satisfacción | NPS de recomendación corporativa y sugerencias | — |

### Encuesta 4 — Docentes EMTP (11 secciones)
| Sección | Contenido | Lógica y Automatización |
|---|---|---|
| A — Registro | Trayectoria, especialidad, formación | Validación |
| B — Pertinencia curricular | Actualización, mallas técnicas | — |
| C — Metodologías | Modos de enseñanza activa e innovación | — |
| D — Articulación superior | Contactos institucionales externos | — |
| E — Vínculo empresas | Contacto industrial directo y actualizaciones | — |
| F — Competencias y siglo XXI| Evaluación de logro del alumnado EMTP | Integración de datos para métricas globales |
| G — Competencias digitales | Alfabetización y TIC's en docencia | Análisis autoevaluativo (Puntaje propio) |
| H — Inserción laboral | Estadísticas u observaciones sobre sus pupilos | Cruce entre opinión docente e inserción real |
| I — Orientación vocacional | Apoyos activos a la orientación temprana | — |
| J — Infraestructura | Opinión de talleres y espacios de aprendizaje| — |
| K — Gestión institucional | Crítica a políticas institucionales y directivas | Criterio de filtro para el dashboard |

---

## 📊 Dashboard Interactivo (Looker Studio)

El visualizador principal convierte todo el almacén de datos (Google Sheets) en un panel de 5 pantallas interactivas orientadas a la toma de decisión:

1. **Visión General:** Sumario global de estudiantes, NPS (Net Promoter Score) de satisfacción institucional y tasas de inserción base por especialidades.
2. **Trayectorias Educativas:** Análisis de la relación estudios técnicos vs. educación superior, las convalidaciones por institución y opciones de carreras preferidas.
3. **Inserción Laboral:** Estadísticas de empleabilidad (formal/informal), tiempos para ser contratados, tasas de empresas practicantes que absorben talento y métricas de supervisores directos.
4. **Análisis por Cohorte:** Evaluación granular donde se analiza la evolución de la calidad formativa por año de egreso y de acuerdo al crecimiento de la especialidad correspondiente.
5. **Datos Demográficos y Equidad:** Entorno sociocultural, género por especialidad, barreras monetarias o de red reportadas y políticas activas de inclusión.

---

## 🌐 Interfaz Web de Análisis Cualitativo

Es un microservicio montado sobre Apps Script Web App que responde a la necesidad de no perder el *feedback textual* directo.

- **Centralización Total:** Agrupa la lectura de unas ~20 preguntas abiertas distribuidas sobre las 4 encuestas para no mezclarlas con la reportería dura de Looker Studio.
- **Motores de Búsqueda:** Utiliza un buscador de Keywords libre. Además cuenta con filtrado rápido por (Módulo de la encuesta, tipo de actor respondiendo y la cohorte analizada).
- **Seguridad y Acceso:** Utiliza de forma nativa la Identidad de Google para validar al personal y bloquear accesos ajenos a los autorizados.
- **Layout Frontend:** Tabla paginada de fácil lectura y análisis uno a uno, compatible tanto en pantallas de escritorio como de tableta táctil.

---

## 🚀 Portal Central (Landing Page) y Sistema de Actas

1. **Landing Page Única**
Una página web ligera e institucional que funciona a modo de "Lobby de Entrada" o directorio.
- **Acceso Directo:** Tiene botones de hipervínculo enrutados a cada uno de los 4 formularios en producción. 
- **Accesos Módulos Analíticos:** Redirige tanto al *Dashboard de Looker Studio* como a la *Interfaz de Análisis Cualitativo* desde un mismo lugar.

2. **Sistema Integrado de Actas**
Espacio estructurado directamente dentro del sistema integral para gestionar y registrar el control de reuniones con directivos y agentes involucrados en la evolución y mejora constante del establecimiento. Proporciona trazabilidad total a los avances del proyecto y acuerdos.

---
*Fin del documento de arquitectura y funcionamiento del Sistema de Gestión de Egresados.*
