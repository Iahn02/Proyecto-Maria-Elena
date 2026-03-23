# 📊 Guía de Maquetación: Dashboard Looker Studio (Fase 3)

### Liceo María Elena · Fundación Chile

> **Objetivo:** Este documento detalla la estructura y los pasos exactos para configurar el dashboard de Looker Studio de 5 páginas. Este es el primer **Hito de Pago ($1.000.000 CLP)**, por lo que su acabado debe ser profesional y responsivo.

---

## ⚙️ Paso 1: Preparación de Datos (Vistas SQL-like)

Looker Studio consume mejor datos pre-limpios.

1. Abre el Google Sheet principal del sistema.
2. Abre el editor de **Apps Script** (`Extensiones > Apps Script`).
3. Pega el código del archivo anexo en esta carpeta `generar_vistas_looker.gs`.
4. Ejecuta la función `generarVistasParaLookerStudio()`.
5. Verás en tu Google Sheet que se agregaron hojas con prefijo **`LS_`** color azul. Estas serán nuestras **Fuentes de Datos**.

## 🔌 Paso 2: Conexión Inicial en Looker Studio

1. Entra a [Looker Studio](https://lookerstudio.google.com/).
2. Crea un **Informe Vacío**.
3. Selecciona **Google Sheets** como conector.
4. Selecciona el archivo del proyecto "Liceo María Elena" y elige la hoja **`LS_Vista_VisionGeneral`**.
5. Habilita "Usar la primera fila como encabezados".

---

## 📐 Paso 3: Maquetación y Distribución de las 5 Páginas

### 📄 Página 1: Visión General (Panel Ejecutivo)

**Fuente:** `LS_Vista_VisionGeneral` e `LS_Vista_Empresas_KPI` (Blended Data o añadiendo fuente extra).

- **Tarjetas de Gráfico (Scorecards):**
  - Total Egresados (Recuento).
  - $\%$ de Inserción Laboral actual.
  - Nivel de Satisfacción Promedio de la Formación recibida (Numérico 1 al 5).
- **Gráfico Principal (Anillo):** Distribución demográfica o estado ocupacional actual.
- **Gráfico de Barras Afiladas (Categoría vs Métrica):** Satisfacción por Especialidad.

### 📄 Página 2: Inserción Laboral y Empleabilidad

**Fuente:** `LS_Vista_InsercionLaboral`.

- **Filtros Globales superiores:** Especialidad y Año de Egreso.
- **Gráfico de Barras 100% Apiladas:** Proporción de Egresados que Recibieron o Aceptaron una oferta post-práctica.
- **Gráfico de Embudo (Funnel):** "Tiempo Primer Empleo" vs "Tiempo Buscando" (Tops).
- **Tabla Detallada:** Muestra los roles desempeñados, con formato condicional si es empleo formal.

### 📄 Página 3: Trayectorias Educacionales

**Fuente:** `LS_Vista_Trayectorias`

- **Tarjetas (Scorecards):** Tasa de egresados que deciden continuar estudios técnicos/universitarios.
- **Gráfico Circular / Donut:** Tipos de instituciones que escogen (CFT, Universidad, IP).
- **Gráfico de Barras Horizontales:** Volumen total de estudiantes que lograron convalidar ramos vs los que no, dividido por especialidad de origen (Mecánica vs Química).

### 📄 Página 4: Evaluación Centros de Práctica y Red de Empresas

**Fuente:** `LS_Vista_Empresas_KPI`

- **Medidor Angular (Gauge):** Nivel de Recomendación General de las Empresas para la Institución.
- **Tabla Estilizada (Paginada):** Lista de empresas clave, tamaño, si contrataron egresados o no, y factores determinantes para contratar.
- **Gráfico de Arbol (Treemap):** Representación del tamaño de los sectores productivos de las empresas con las que el Instituto se vincula.

### 📄 Página 5: Panel Demográfico y Variables de Equidad

**Fuente:** `LS_Vista_Demografia_Equidad`

- **Filtros Globales:** Sexo, Año Egreso.
- **Gráfico Segmentado de Dispersión:** Correlaciona el Género con "Barreras Percibidas".
- **Gráfico de Barras Agrupadas:** Representación de cuáles barreras son las más prevalentes para Hombres y Mujeres de cada una de las Especialidades y qué tan útiles fueron las medidas de inclusión desarrolladas por el Liceo.
- **Nube de Palabras / Tabla de Nube:** Principales "Barreras Percibidas".

---

## 🎨 Recomendaciones UI / UX (Requisito Estético)

Dado que Looker Studio permite un control total del diseño, se **recomienda imperativamente** mantener:

1. **Paleta Corporativa:** Utiliza la gama cromática del Liceo o de la Fundación Chile (Azules institucionales, Naranjas cálidos para alertas, Grises oscuros para fondos/paneles estilo Dark-Mode si es requerido, o Limpio Minimalista Corporativo).
2. **Interactividad:** Activa las opciones "Selección Cruzada" (Cross-filtering) en todos los gráficos interactivos, para que darle clic a una especialidad filtre automáticamente toda la página.
3. **Imágenes:** Carga el **Logo del Liceo María Elena y Fundación Chile** en el encabezado de las 5 páginas como elemento persistente (`Componente > Imagen`).

---

> **Siguiente Paso:** Al terminar el dashboard funcional, se comparte el Link modo `Solo Lectura` para incrustarlo posteriormente en la Landing Page (Fase 5) o entregarlo al cliente para el Hito de Facturación.
