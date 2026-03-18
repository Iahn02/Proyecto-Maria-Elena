# 🎓 Sistema de Gestión de Egresados - Liceo María Elena

Repositorio central para el desarrollo e implementación del **Sistema de Seguimiento de Egresados** para el Liceo María Elena (Fundación Chile).

## 📌 Estado Actual del Proyecto
- **Fase:** Planificación Completada / Inicio de Desarrollo.
- **Hito Reciente:** Las 4 encuestas del sistema han sido **corregidas y validadadas** de manera definitiva.
- **Siguiente Paso:** Implementación de la Fase 1 (Arquitectura de Datos en Google Sheets) y codificación de *Apps Script* para base de datos.

## 🧱 Arquitectura y Stack Tecnológico
El sistema está construido íntegramente sobre el ecosistema de Google Workspace, minimizando costos de licencia y maximizando la mantenibilidad:

- **Base de Datos:** Google Sheets (Relacional y automatizado).
- **Recolección de Datos:** Google Forms (4 encuestas principales).
- **Lógica y Automatización:** Google Apps Script (Triggers, condicionales, envíos de emails).
- **Visualización (BI):** Looker Studio (Dashboard interactivo de 5 páginas).
- **Análisis Cualitativo:** Web App (HTML/CSS/JS) montada sobre Apps Script para analizar preguntas abiertas.
- **Portal Central (Landing Page):** Web App en Apps Script que conecta todo el sistema.

## 📋 Las 4 Encuestas Centrales (Versiones Finales)
1. **Egresados en Práctica Profesional** (12 secciones)
2. **Egresados sin Práctica Profesional** (7 secciones)
3. **Empresas Receptoras** (9 secciones)
4. **Docentes EMTP** (11 secciones)

## 🚀 Nuevos Requerimientos Integrados
- **Landing Page Centralizada:** Interfaz única (estilo portal web) que contendrá botones de acceso a los distintos módulos del sistema (Encuestas, Dashboard, Panel de Análisis Cualitativo).
- **Actas de Revisión:** Espacio dedicado y estructurado para registrar la fecha, participantes y conclusión de cada revisión de avances del proyecto.

## 🗓️ Cronograma General
* La planificación detallada y fechas de entrega se encuentran en el archivo `plan_desarrollo.md`.
* Duración total estimada: 7 semanas (Marzo - Abril 2026).

---
*Desarrollado para Fundación Chile.*
