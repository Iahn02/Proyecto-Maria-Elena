// ============================================
//  Análisis Cualitativo — Liceo María Elena
//  Google Apps Script Web App Mockup
//  Alineado a plan_desarrollo.md (FASE 4)
// ============================================

// ==================== COLORS ====================
const C = {
    blue:       '#4285F4',
    green:      '#34A853',
    red:        '#EA4335',
    yellow:     '#FBBC05',
    purple:     '#9334E6',
    teal:       '#00897B',
    orange:     '#E37400',
    gray:       '#5F6368',
    grayLight:  '#DADCE0',
};

// ==================== MOCK DATA ====================
// 18 preguntas abiertas del plan
const PREGUNTAS = [
    { id: 'p1_b1', label: 'Conocimientos más útiles en práctica', seccion: 'Sección B', audiencia: 'egr_practica', encuesta: 'Enc. 1' },
    { id: 'p1_b2', label: 'Habilidades que faltaron', seccion: 'Sección B', audiencia: 'egr_practica', encuesta: 'Enc. 1' },
    { id: 'p1_c1', label: 'Métodos de enseñanza efectivos', seccion: 'Sección C', audiencia: 'egr_practica', encuesta: 'Enc. 1' },
    { id: 'p1_g1', label: 'Habilidades siglo XXI más útiles', seccion: 'Sección G', audiencia: 'egr_practica', encuesta: 'Enc. 1' },
    { id: 'p2_e1', label: 'Orientación/apoyo que necesitó', seccion: 'Sección E', audiencia: 'egr_sin', encuesta: 'Enc. 2' },
    { id: 'p2_g1', label: 'Sugerencias al liceo', seccion: 'Sección G', audiencia: 'egr_sin', encuesta: 'Enc. 2' },
    { id: 'p3_b1', label: 'Fortalezas de practicantes', seccion: 'Sección B', audiencia: 'empresas', encuesta: 'Enc. 3' },
    { id: 'p3_b2', label: 'Debilidades de practicantes', seccion: 'Sección B', audiencia: 'empresas', encuesta: 'Enc. 3' },
    { id: 'p3_d1', label: 'Habilidades deficientes', seccion: 'Sección D', audiencia: 'empresas', encuesta: 'Enc. 3' },
    { id: 'p3_i1', label: 'Recomendaciones a liceos', seccion: 'Sección I', audiencia: 'empresas', encuesta: 'Enc. 3' },
    { id: 'p4_b1', label: 'Contenidos a incorporar en currículum', seccion: 'Sección B', audiencia: 'docentes', encuesta: 'Enc. 4' },
    { id: 'p4_b2', label: 'Contenidos obsoletos', seccion: 'Sección B', audiencia: 'docentes', encuesta: 'Enc. 4' },
    { id: 'p4_c1', label: 'Obstáculos para metodologías innovadoras', seccion: 'Sección C', audiencia: 'docentes', encuesta: 'Enc. 4' },
    { id: 'p4_f1', label: 'Estrategias para competencias transversales', seccion: 'Sección F', audiencia: 'docentes', encuesta: 'Enc. 4' },
    { id: 'p4_f2', label: 'Estrategias para habilidades siglo XXI', seccion: 'Sección F', audiencia: 'docentes', encuesta: 'Enc. 4' },
    { id: 'p4_g1', label: 'Tecnologías a incorporar por especialidad', seccion: 'Sección G', audiencia: 'docentes', encuesta: 'Enc. 4' },
    { id: 'p4_h1', label: 'Acciones para mejorar empleabilidad', seccion: 'Sección H', audiencia: 'docentes', encuesta: 'Enc. 4' },
    { id: 'p4_j1', label: 'Recursos/equipamiento prioritarios', seccion: 'Sección J', audiencia: 'docentes', encuesta: 'Enc. 4' },
];

const AUDIENCIA_MAP = {
    'egr_practica': 'Egresados con Práctica',
    'egr_sin': 'Egresados sin Práctica',
    'empresas': 'Empresas Receptoras',
    'docentes': 'Docentes EMTP',
};

const ESPECIALIDADES = ['Mecánica Automotriz', 'Química Industrial'];
const COHORTES = ['2022', '2023', '2024'];

// Mock responses
const NOMBRES_EGR = ['Juan Pérez', 'María González', 'Carlos Rojas', 'Valentina Muñoz', 'Diego Soto', 'Camila Tapia', 'Andrés Reyes', 'Javiera López', 'Felipe Castro', 'Constanza Díaz', 'Matías Araya', 'Francisca Vera', 'Sebastián Morales', 'Catalina Fuentes', 'Tomás Herrera'];
const NOMBRES_EMP = ['AutoMotriz Chile SpA', 'Industria Química del Norte', 'Taller Mecánico El Motor', 'LabChem Soluciones', 'ServAuto Profesional', 'QuímicaPro Ltda.', 'Automotores del Valle', 'Reactivos Industriales SA'];
const NOMBRES_DOC = ['Prof. Ana Martínez', 'Prof. Roberto Espinoza', 'Prof. Sandra Opazo', 'Prof. Jorge Villalobos', 'Prof. Marcela Bravo', 'Prof. Héctor Paredes', 'Prof. Lorena Cifuentes'];

const RESPUESTAS_MOCK = {
    'p1_b1': [
        'Los conocimientos de diagnóstico automotriz fueron fundamentales en mi práctica. El manejo de escáner OBD-II y la interpretación de códigos de falla me permitieron resolver problemas reales desde el primer día.',
        'Lo más útil fue la formación en análisis químico, especialmente el manejo de cromatografía y espectrofotometría. En la empresa me asignaron directamente al laboratorio de control de calidad.',
        'Las clases de soldadura y armado de motores fueron lo que más apliqué. También los conocimientos de seguridad industrial fueron muy valorados en el taller.',
        'El laboratorio de química analítica y el manejo de soluciones me prepararon muy bien. Lo que aprendimos sobre normativa medioambiental también fue muy relevante.',
        'Los conocimientos de electricidad automotriz y sistemas de inyección fueron los que más usé. El profesor Espinoza nos preparó muy bien en esos temas.',
    ],
    'p1_b2': [
        'Me faltó formación en vehículos eléctricos e híbridos. En la empresa ya están llegando muchos y no sabía cómo abordarlos. También me faltó inglés técnico para leer manuales.',
        'Faltó más práctica con equipos industriales de última generación. El laboratorio del liceo tiene equipos antiguos que no se usan en la industria actual.',
        'Necesité más conocimientos de electrónica moderna y programación de ECU. La tecnología avanza muy rápido y lo que aprendimos ya está desactualizado.',
        'Me faltó manejo de software de gestión de laboratorio (LIMS) que usan todas las empresas grandes. También manejo de Excel avanzado para análisis de datos.',
    ],
    'p1_c1': [
        'Las clases prácticas en el taller fueron lo mejor. Cuando el profesor nos dejaba trabajar con autos reales aprendíamos mucho más que con la teoría. Los proyectos grupales también ayudaron bastante.',
        'Los laboratorios prácticos eran excelentes. Cuando podíamos hacer experimentos reales y no solo ver presentaciones, la diferencia en aprendizaje era enorme.',
        'El método de aprender haciendo fue lo más efectivo. Las pasantías cortas que organizaron antes de la práctica formal nos dieron mucha confianza.',
    ],
    'p1_g1': [
        'El trabajo en equipo fue la habilidad más importante. En el taller siempre trabajamos con otros mecánicos y hay que coordinarse bien. También la resolución de problemas, porque cada auto tiene una falla distinta.',
        'El pensamiento crítico y la capacidad de análisis fueron fundamentales para mi trabajo en el laboratorio. También la comunicación, porque hay que explicar resultados complejos de forma simple.',
    ],
    'p2_e1': [
        'Necesité más orientación sobre opciones de práctica. Nadie me explicó bien cómo buscar empresa y cuando me quise inscribir ya no quedaban cupos.',
        'Me hubiera gustado que el liceo tuviera un programa de apoyo para quienes no encontramos práctica. Me sentí muy solo en el proceso.',
        'Necesitaba apoyo económico para movilización. Las empresas que ofrecían práctica estaban lejos y no tenía cómo llegar. También necesitaba orientación vocacional.',
    ],
    'p2_g1': [
        'Sugiero que el liceo tenga convenios con más empresas para asegurar cupos de práctica para todos. También sería bueno tener un portal donde se publiquen las ofertas.',
        'Deberían hacer ferias de empresas en el liceo, como hacen en otros establecimientos. Así los estudiantes pueden conocer las opciones antes de egresar.',
        'Sería muy útil que hubiera apoyo psicológico para quienes no logramos hacer la práctica. Es muy frustrante y afecta la autoestima.',
    ],
    'p3_b1': [
        'Los practicantes del Liceo María Elena llegan con buena formación técnica base. Son responsables y puntuales, lo que es difícil de encontrar. Tienen buena disposición a aprender.',
        'Destacamos la formación en seguridad industrial y el manejo de protocolos de laboratorio. Los egresados del liceo siguen bien las normas de seguridad.',
        'La actitud de los practicantes es excelente. Llegan con ganas de aprender y se adaptan rápido al equipo. La formación en trabajo en equipo se nota.',
    ],
    'p3_b2': [
        'Les falta autonomía para tomar decisiones. Siempre esperan que se les diga qué hacer. También necesitan mejorar la comunicación escrita, especialmente en informes técnicos.',
        'La principal debilidad es la falta de manejo de software especializado. En diagnóstico automotriz se usa mucho software que no conocen. También les cuesta el inglés técnico.',
        'Les falta capacidad de resolver problemas complejos sin supervisión. La formación es buena en lo básico pero se quedan cortos en situaciones no estándar.',
    ],
    'p3_d1': [
        'Manejo de tecnología digital aplicada al rubro. Los egresados no manejan bien las herramientas de diagnóstico computarizado ni los sistemas de gestión de mantenimiento.',
        'Competencias blandas como la comunicación efectiva con clientes y la gestión del tiempo. También les falta pensamiento crítico para analizar resultados anómalos.',
    ],
    'p3_i1': [
        'Recomendamos actualizar los equipos del taller mecánico. Los alumnos llegan sabiendo trabajar con herramientas antiguas pero la industria ya migró a tecnología de punta.',
        'Sería muy beneficioso que los profesores hicieran pasantías en la industria para actualizar sus conocimientos. La brecha entre lo que enseñan y lo que usamos es grande.',
        'Sugerimos incorporar más horas de práctica con software especializado del rubro. También más formación en habilidades blandas y comunicación profesional.',
    ],
    'p4_b1': [
        'Es urgente incorporar contenidos sobre vehículos eléctricos e híbridos. La industria automotriz está cambiando rápidamente y nuestros egresados no están preparados.',
        'Hay que actualizar los contenidos de análisis instrumental. La cromatografía HPLC y la espectroscopia de masas son estándar en la industria y no lo estamos enseñando.',
        'Se debería incorporar formación en inteligencia artificial aplicada al rubro. Los sistemas de diagnóstico ya usan IA y nuestros alumnos deben conocerla.',
        'Contenidos de sustentabilidad y economía circular son cada vez más relevantes. Las empresas los piden y no los estamos formando en eso.',
    ],
    'p4_b2': [
        'Los contenidos de carburación están obsoletos. Ningún vehículo nuevo usa carburador. Ese tiempo debería usarse para enseñar inyección electrónica moderna.',
        'La calibración manual de instrumentos analíticos ya casi no se usa. Todo es digital y automatizado. Deberíamos reemplazar esas horas con manejo de software.',
        'Los módulos de mecánica diesel convencional ocupan demasiadas horas. Los motores modernos son mucho más electrónicos y eso no lo cubrimos bien.',
    ],
    'p4_c1': [
        'El principal obstáculo es la falta de equipamiento actualizado. No podemos enseñar diagnóstico computarizado si no tenemos escáneres modernos.',
        'La carga horaria no permite innovar. Estamos tan apretados con el currículum obligatorio que no queda tiempo para proyectos innovadores o metodologías activas.',
        'Falta capacitación docente en metodologías innovadoras. Muchos colegas llevan años enseñando de la misma forma y no hay incentivos para cambiar.',
    ],
    'p4_f1': [
        'Usamos proyectos integradores donde los alumnos deben trabajar en equipo para resolver un problema real. Esto desarrolla comunicación, colaboración y resolución de conflictos.',
        'Implementamos una metodología de "taller simulado" donde rotamos roles (líder, operador, inspector de calidad) para que desarrollen diferentes competencias transversales.',
    ],
    'p4_f2': [
        'Para el pensamiento crítico usamos casos de estudio reales de fallas mecánicas/químicas. Los alumnos deben analizar la información y proponer soluciones.',
        'La creatividad la trabajamos con desafíos de innovación donde deben mejorar un proceso o diseñar una solución con recursos limitados. Funciona muy bien.',
    ],
    'p4_g1': [
        'Para Mecánica: escáneres OBD-II de última generación, software de diagnóstico Mitchell y equipos de medición electrónica. Para Química: HPLC básico y software de análisis como ChromLab.',
        'Se necesita implementar simuladores digitales de procesos industriales. Existen opciones gratuitas y de bajo costo que podríamos adoptar inmediatamente.',
        'Incorporar tablets o notebooks para trabajo en terreno. Los técnicos modernos usan dispositivos móviles para diagnóstico y registro, y nuestros alumnos no lo practican.',
    ],
    'p4_h1': [
        'Fortalecer el vínculo con las empresas receptoras. Necesitamos más convenios y que las empresas participen en la formación, no solo en la práctica.',
        'Crear un programa de seguimiento de egresados que genere datos para mejorar la formación. Este proyecto es un buen paso en esa dirección.',
        'Organizar ferias de empleo semestrales con empresas del rubro. También sería útil un portal web donde egresados y empresas puedan conectarse.',
    ],
    'p4_j1': [
        'Lo más urgente es renovar los equipos del taller de mecánica. Los elevadores tienen más de 15 años y los multímetros fallan constantemente. Necesitamos osciloscopios automotrices.',
        'El laboratorio de química necesita campanas de extracción nuevas y reactivos de calidad. También necesitamos balanzas analíticas calibradas y un espectrofotómetro moderno.',
        'Inversión en infraestructura digital: red WiFi estable, computadores para el taller con software de diagnóstico, y una impresora 3D para prototipado.',
    ],
};

// Generate flat response list
let allResponses = [];
let idCounter = 1;
PREGUNTAS.forEach(p => {
    const textos = RESPUESTAS_MOCK[p.id] || [];
    textos.forEach(texto => {
        let nombreRespondente, especialidad, cohorte;

        if (p.audiencia === 'egr_practica' || p.audiencia === 'egr_sin') {
            nombreRespondente = NOMBRES_EGR[Math.floor(Math.random() * NOMBRES_EGR.length)];
            especialidad = ESPECIALIDADES[Math.floor(Math.random() * 2)];
            cohorte = COHORTES[Math.floor(Math.random() * COHORTES.length)];
        } else if (p.audiencia === 'empresas') {
            nombreRespondente = NOMBRES_EMP[Math.floor(Math.random() * NOMBRES_EMP.length)];
            especialidad = ESPECIALIDADES[Math.floor(Math.random() * 2)];
            cohorte = COHORTES[Math.floor(Math.random() * COHORTES.length)];
        } else {
            nombreRespondente = NOMBRES_DOC[Math.floor(Math.random() * NOMBRES_DOC.length)];
            especialidad = ESPECIALIDADES[Math.floor(Math.random() * 2)];
            cohorte = '—';
        }

        allResponses.push({
            id: idCounter++,
            respondente: nombreRespondente,
            audiencia: p.audiencia,
            audienciaLabel: AUDIENCIA_MAP[p.audiencia],
            encuesta: p.encuesta,
            preguntaId: p.id,
            preguntaLabel: p.label,
            seccion: p.seccion,
            especialidad: especialidad,
            cohorte: cohorte,
            texto: texto,
            palabras: texto.split(/\s+/).length,
        });
    });
});

// ==================== STATE ====================
let filteredResponses = [...allResponses];
let currentPage = 1;
const perPage = 10;
let selectedResponse = null;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    updateKPIs();
    applyFilters();
    renderTable();
    renderPagination();
    initListeners();
});

// ==================== LISTENERS ====================
function initListeners() {
    // Filter changes
    document.querySelectorAll('.gas-filter-chip select').forEach(sel => {
        sel.addEventListener('change', () => {
            currentPage = 1;
            applyFilters();
            renderTable();
            renderPagination();
            updateFilterStatus();
        });
    });

    // Search
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentPage = 1;
            applyFilters();
            renderTable();
            renderPagination();
            updateFilterStatus();
        }, 300);
    });

    // Refresh button animation
    document.getElementById('btnRefresh').addEventListener('click', () => {
        const btn = document.getElementById('btnRefresh');
        btn.querySelector('i').style.animation = 'spin 0.6s linear';
        setTimeout(() => btn.querySelector('i').style.animation = '', 600);
    });

    // Export button
    document.getElementById('btnExport').addEventListener('click', () => {
        alert('En producción, esto exportaría las respuestas filtradas a un archivo CSV descargable.');
    });
}

// ==================== FILTER LOGIC ====================
function applyFilters() {
    const audiencia = document.getElementById('filterAudiencia').value;
    const pregunta = document.getElementById('filterPregunta').value;
    const especialidad = document.getElementById('filterEspecialidad').value;
    const cohorte = document.getElementById('filterCohorte').value;
    const search = document.getElementById('searchInput').value.toLowerCase().trim();

    filteredResponses = allResponses.filter(r => {
        if (audiencia !== 'all' && r.audiencia !== audiencia) return false;
        if (pregunta !== 'all' && r.preguntaId !== pregunta) return false;
        if (especialidad !== 'all') {
            const espMap = { 'mecanica': 'Mecánica Automotriz', 'quimica': 'Química Industrial' };
            if (r.especialidad !== espMap[especialidad]) return false;
        }
        if (cohorte !== 'all' && r.cohorte !== cohorte) return false;
        if (search && !r.texto.toLowerCase().includes(search)) return false;
        return true;
    });
}

function updateFilterStatus() {
    const el = document.getElementById('filterStatus');
    const total = filteredResponses.length;
    const allTotal = allResponses.length;
    if (total === allTotal) {
        el.querySelector('span').textContent = `${allTotal} respuestas cargadas · 18 preguntas abiertas`;
    } else {
        el.querySelector('span').textContent = `${total} de ${allTotal} respuestas (filtrado)`;
    }
}

// ==================== KPIs ====================
function updateKPIs() {
    document.getElementById('kpiTotalResp').textContent = allResponses.length.toLocaleString();
    document.getElementById('kpiEnc1').textContent = allResponses.filter(r => r.audiencia === 'egr_practica').length;
    document.getElementById('kpiEnc2').textContent = allResponses.filter(r => r.audiencia === 'egr_sin').length;
    document.getElementById('kpiEnc3').textContent = allResponses.filter(r => r.audiencia === 'empresas').length;
    document.getElementById('kpiEnc4').textContent = allResponses.filter(r => r.audiencia === 'docentes').length;
}

// ==================== TABLE ====================
function renderTable() {
    const tbody = document.getElementById('respBody');
    const start = (currentPage - 1) * perPage;
    const end = Math.min(start + perPage, filteredResponses.length);
    const page = filteredResponses.slice(start, end);

    if (page.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="no-results">
            <i class="fas fa-search"></i> No se encontraron respuestas con los filtros actuales.
        </td></tr>`;
    } else {
        tbody.innerHTML = page.map(r => {
            const excerpt = r.texto.length > 120 ? r.texto.substring(0, 120) + '…' : r.texto;
            const isSelected = selectedResponse && selectedResponse.id === r.id;
            return `<tr class="resp-row ${isSelected ? 'selected' : ''}" data-id="${r.id}" onclick="selectResponse(${r.id})">
                <td class="td-id">${r.id}</td>
                <td class="td-audiencia"><span class="badge badge-${r.audiencia}">${r.encuesta}</span></td>
                <td class="td-pregunta" title="${r.preguntaLabel}">${r.preguntaLabel}</td>
                <td class="td-especialidad">${r.especialidad}</td>
                <td class="td-cohorte">${r.cohorte}</td>
                <td class="td-respuesta">${highlightSearch(excerpt)}</td>
            </tr>`;
        }).join('');
    }

    // Update counter
    const label = document.getElementById('respCountLabel');
    if (filteredResponses.length > 0) {
        label.textContent = `Mostrando ${start + 1}–${end} de ${filteredResponses.length}`;
    } else {
        label.textContent = '0 resultados';
    }
}

function highlightSearch(text) {
    const search = document.getElementById('searchInput').value.trim();
    if (!search) return text;
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// ==================== DETAIL ====================
function selectResponse(id) {
    selectedResponse = allResponses.find(r => r.id === id);
    if (!selectedResponse) return;

    // Highlight row
    document.querySelectorAll('.resp-row').forEach(row => row.classList.remove('selected'));
    const row = document.querySelector(`.resp-row[data-id="${id}"]`);
    if (row) row.classList.add('selected');

    // Update detail panel
    const r = selectedResponse;
    document.getElementById('responseDetail').innerHTML = `
        <div class="detail-grid">
            <div class="detail-item">
                <span class="detail-label">Respondente</span>
                <span class="detail-value">${r.respondente}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Audiencia</span>
                <span class="detail-value"><span class="badge badge-${r.audiencia}">${r.audienciaLabel}</span></span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Encuesta</span>
                <span class="detail-value">${r.encuesta} — ${r.seccion}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Pregunta</span>
                <span class="detail-value">${r.preguntaLabel}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Especialidad</span>
                <span class="detail-value">${r.especialidad}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Cohorte</span>
                <span class="detail-value">${r.cohorte}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Extensión</span>
                <span class="detail-value">${r.palabras} palabras</span>
            </div>
        </div>
    `;

    document.getElementById('fullResponse').innerHTML = `
        <div class="full-response-text">
            <blockquote>${highlightSearch(r.texto)}</blockquote>
        </div>
    `;
}

// Make selectResponse globally accessible
window.selectResponse = selectResponse;

// ==================== PAGINATION ====================
function renderPagination() {
    const totalPages = Math.ceil(filteredResponses.length / perPage);
    const container = document.getElementById('pagination');

    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let html = '';

    // Prev button
    html += `<button class="pag-btn ${currentPage === 1 ? 'disabled' : ''}" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
        <i class="fas fa-chevron-left"></i>
    </button>`;

    // Page numbers
    const maxVisible = 7;
    let startP = Math.max(1, currentPage - 3);
    let endP = Math.min(totalPages, startP + maxVisible - 1);
    if (endP - startP < maxVisible - 1) startP = Math.max(1, endP - maxVisible + 1);

    if (startP > 1) {
        html += `<button class="pag-btn" onclick="goToPage(1)">1</button>`;
        if (startP > 2) html += `<span class="pag-ellipsis">…</span>`;
    }

    for (let i = startP; i <= endP; i++) {
        html += `<button class="pag-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }

    if (endP < totalPages) {
        if (endP < totalPages - 1) html += `<span class="pag-ellipsis">…</span>`;
        html += `<button class="pag-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`;
    }

    // Next button
    html += `<button class="pag-btn ${currentPage === totalPages ? 'disabled' : ''}" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
        <i class="fas fa-chevron-right"></i>
    </button>`;

    container.innerHTML = html;
}

function goToPage(page) {
    const totalPages = Math.ceil(filteredResponses.length / perPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderTable();
    renderPagination();
    // Scroll table to top
    document.querySelector('.table-wrapper').scrollTop = 0;
}

// Make goToPage globally accessible
window.goToPage = goToPage;

// ==================== SPIN ANIMATION ====================
const style = document.createElement('style');
style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(style);
