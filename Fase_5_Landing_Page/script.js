// ============================================
//  Dashboard Looker Studio — Liceo María Elena
//  Seguimiento de Egresados EMTP
//  Mockup alineado a plan_desarrollo.md
// ============================================

// Chart instances registry
const charts = {};

// Shared color palette (Google-inspired)
const COLORS = {
    blue:       '#4285F4',
    blueBg:     'rgba(66,133,244,0.12)',
    green:      '#34A853',
    greenBg:    'rgba(52,168,83,0.12)',
    red:        '#EA4335',
    redBg:      'rgba(234,67,53,0.12)',
    yellow:     '#FBBC05',
    yellowBg:   'rgba(251,188,5,0.12)',
    purple:     '#9334E6',
    purpleBg:   'rgba(147,52,230,0.12)',
    teal:       '#00897B',
    tealBg:     'rgba(0,137,123,0.12)',
    orange:     '#E37400',
    orangeBg:   'rgba(227,116,0,0.12)',
    gray:       '#5F6368',
    grayLight:  '#DADCE0',
    grayBg:     '#F8F9FA',
};

const PALETTE = [COLORS.blue, COLORS.green, COLORS.red, COLORS.yellow, COLORS.purple, COLORS.teal, COLORS.orange, '#E91E63', '#00BCD4', '#8BC34A'];

// ==================== CHART DEFAULTS ====================
Chart.defaults.font.family = "'Inter', 'Google Sans', 'Roboto', system-ui, sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#5F6368';
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.pointStyleWidth = 10;
Chart.defaults.plugins.legend.labels.padding = 16;

// ==================== UTILITIES ====================
function initChart(id, config) {
    if (charts[id]) charts[id].destroy();
    const el = document.getElementById(id);
    if (!el) return;
    const ctx = el.getContext('2d');
    charts[id] = new Chart(ctx, config);
}

// ==================== NAVIGATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderActivePage();
});

function initNavigation() {
    const tabs = document.querySelectorAll('.page-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const pageId = tab.dataset.page;
            document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
            const target = document.getElementById('page-' + pageId);
            if (target) target.classList.add('active');
            renderActivePage();
        });
    });

    document.querySelectorAll('.filter-group select').forEach(sel => {
        sel.addEventListener('change', () => {
            updateFilterCount();
            renderActivePage();
        });
    });
}

function updateFilterCount() {
    const filters = document.querySelectorAll('.filter-group select');
    let count = 0;
    filters.forEach(f => { if (f.value !== 'all' && f.value !== '2024') count++; });
    const el = document.getElementById('filterCount');
    el.querySelector('span').textContent = count > 0 ? `${count} filtro(s) aplicado(s)` : 'Sin filtros aplicados';
}

function getActivePage() {
    const active = document.querySelector('.page-tab.active');
    return active ? active.dataset.page : 'overview';
}

function renderActivePage() {
    const page = getActivePage();
    switch(page) {
        case 'overview': renderOverview(); break;
        case 'trayectorias': renderTrayectorias(); break;
        case 'insercion': renderInsercion(); break;
        case 'cohorte': renderCohorte(); break;
        case 'demograficos': renderDemograficos(); break;
    }
}

// ============================================================
//  PAGE 1: VISIÓN GENERAL
// ============================================================
function renderOverview() {
    // — Chart: Egresados por cohorte y tipo
    initChart('chart-overview-trend', {
        type: 'bar',
        data: {
            labels: ['2022', '2023', '2024', '2025 (parcial)'],
            datasets: [
                {
                    label: 'Egresados con Práctica',
                    data: [68, 74, 82, 45],
                    backgroundColor: COLORS.blue,
                    borderRadius: 4,
                    order: 2,
                    barPercentage: 0.6
                },
                {
                    label: 'Egresados sin Práctica',
                    data: [22, 28, 45, 18],
                    backgroundColor: COLORS.orange,
                    borderRadius: 4,
                    order: 2,
                    barPercentage: 0.6
                },
                {
                    label: 'Empresas Encuestadas',
                    data: [12, 15, 18, 8],
                    type: 'line',
                    borderColor: COLORS.green,
                    backgroundColor: 'transparent',
                    borderWidth: 2.5,
                    pointRadius: 4,
                    pointBackgroundColor: COLORS.green,
                    tension: 0.3,
                    yAxisID: 'y1',
                    order: 1
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: { legend: { position: 'top' } },
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'N° Egresados' }, grid: { color: '#f1f3f4' } },
                y1: { position: 'right', beginAtZero: true, max: 30, title: { display: true, text: 'N° Empresas' }, grid: { display: false } },
                x: { grid: { display: false } }
            }
        }
    });

    // — Chart: Distribución por especialidad
    initChart('chart-overview-especialidad', {
        type: 'doughnut',
        data: {
            labels: ['Mecánica Automotriz', 'Química Industrial'],
            datasets: [{
                data: [58, 42],
                backgroundColor: [COLORS.blue, COLORS.purple],
                borderWidth: 0,
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: { position: 'right', labels: { font: { size: 12 } } }
            }
        }
    });

    // — Chart: Situación actual
    initChart('chart-overview-situacion', {
        type: 'doughnut',
        data: {
            labels: ['Empleado formal', 'Empleado informal', 'Estudiando ES', 'Emp. formal + Estudio', 'Desempleado buscando', 'No busca empleo'],
            datasets: [{
                data: [38, 14, 22, 10, 10, 6],
                backgroundColor: [COLORS.blue, COLORS.teal, COLORS.green, COLORS.purple, COLORS.red, COLORS.grayLight],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            cutout: '60%',
            plugins: { legend: { position: 'bottom', labels: { font: { size: 10 }, padding: 10 } } }
        }
    });

    // — Chart: NPS Egresados
    initChart('chart-overview-satisfaccion', {
        type: 'bar',
        data: {
            labels: ['Promotores (9-10)', 'Pasivos (7-8)', 'Detractores (0-6)'],
            datasets: [{
                data: [48, 28, 24],
                backgroundColor: [COLORS.green, COLORS.yellow, COLORS.red],
                borderRadius: 4,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: { title: { display: true, text: '% de egresados' }, grid: { color: '#f1f3f4' } },
                y: { grid: { display: false } }
            }
        }
    });

    // — Chart: NPS Empresas
    initChart('chart-overview-nps-empresas', {
        type: 'bar',
        data: {
            labels: ['Promotores (9-10)', 'Pasivos (7-8)', 'Detractores (0-6)'],
            datasets: [{
                data: [61, 22, 17],
                backgroundColor: [COLORS.green, COLORS.yellow, COLORS.red],
                borderRadius: 4,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: { title: { display: true, text: '% de supervisores' }, grid: { color: '#f1f3f4' } },
                y: { grid: { display: false } }
            }
        }
    });

    // — Table: Resumen por especialidad
    const resumen = [
        { esp: 'Mecánica Automotriz', egrP: 48, egrS: 26, emp: 10, insercion: '72.1%', continuidad: '28.4%', nps: '+38' },
        { esp: 'Química Industrial', egrP: 34, egrS: 19, emp: 8, insercion: '63.2%', continuidad: '38.1%', nps: '+48' },
    ];

    const tbody = document.getElementById('tbody-overview');
    tbody.innerHTML = resumen.map(c => {
        return `<tr>
            <td><strong>${c.esp}</strong></td>
            <td>${c.egrP}</td>
            <td>${c.egrS}</td>
            <td>${c.emp}</td>
            <td><span class="inline-bar" style="width:${parseFloat(c.insercion) * 0.9}px"></span>${c.insercion}</td>
            <td>${c.continuidad}</td>
            <td>${c.nps}</td>
        </tr>`;
    }).join('');
}

// ============================================================
//  PAGE 2: TRAYECTORIAS EDUCATIVAS
// ============================================================
function renderTrayectorias() {
    // — Stacked bar: Tipo de ES por especialidad
    initChart('chart-tray-tipo', {
        type: 'bar',
        data: {
            labels: ['Mecánica Automotriz', 'Química Industrial'],
            datasets: [
                { label: 'Universidad', data: [10, 18], backgroundColor: COLORS.blue, borderRadius: 2 },
                { label: 'IP', data: [15, 12], backgroundColor: COLORS.green, borderRadius: 2 },
                { label: 'CFT', data: [8, 5], backgroundColor: COLORS.purple, borderRadius: 2 },
                { label: 'No estudia', data: [67, 65], backgroundColor: COLORS.grayLight, borderRadius: 2 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
                x: { stacked: true, grid: { display: false } },
                y: { stacked: true, max: 100, title: { display: true, text: '% de egresados' }, grid: { color: '#f1f3f4' } }
            },
            plugins: { legend: { position: 'top' }, tooltip: { mode: 'index' } }
        }
    });

    // — Doughnut: Continuidad ES (universitaria vs técnica)
    initChart('chart-tray-nivel', {
        type: 'doughnut',
        data: {
            labels: ['Universitaria', 'IP / CFT', 'No continúa'],
            datasets: [{
                data: [12.8, 19.7, 67.5],
                backgroundColor: [COLORS.blue, COLORS.green, COLORS.grayLight],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            cutout: '65%',
            plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } } }
        }
    });

    // — Horizontal bar: Carreras más elegidas
    initChart('chart-tray-carreras', {
        type: 'bar',
        data: {
            labels: ['Ing. Mecánica', 'Técnico en Mantenimiento', 'Ing. Química', 'Técnico Automotriz', 'Ing. Industrial', 'Técnico en Control Calidad', 'Prevención de Riesgos', 'Otros'],
            datasets: [{
                data: [18, 15, 14, 12, 10, 8, 7, 16],
                backgroundColor: [COLORS.blue, COLORS.green, COLORS.purple, COLORS.teal, COLORS.orange, COLORS.yellow, '#E91E63', COLORS.grayLight],
                borderRadius: 4,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: { title: { display: true, text: '% de egresados que estudian' }, grid: { color: '#f1f3f4' } },
                y: { grid: { display: false } }
            }
        }
    });

    // — Line: Tasa de convalidaciones por cohorte
    initChart('chart-tray-convalidacion', {
        type: 'line',
        data: {
            labels: ['2022', '2023', '2024'],
            datasets: [
                {
                    label: '% Convalidación lograda',
                    data: [48, 56, 64.3],
                    borderColor: COLORS.blue,
                    backgroundColor: 'rgba(66,133,244,0.08)',
                    fill: true,
                    borderWidth: 2.5,
                    tension: 0.35,
                    pointRadius: 5,
                    pointBackgroundColor: COLORS.blue
                },
                {
                    label: '% Que solicitó convalidación',
                    data: [28, 32, 42],
                    borderColor: COLORS.green,
                    backgroundColor: 'transparent',
                    borderWidth: 2.5,
                    tension: 0.35,
                    pointRadius: 5,
                    pointBackgroundColor: COLORS.green
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: {
                y: { title: { display: true, text: '%' }, grid: { color: '#f1f3f4' }, min: 0, max: 100 },
                x: { grid: { display: false } }
            }
        }
    });
}

// ============================================================
//  PAGE 3: INSERCIÓN LABORAL
// ============================================================
function renderInsercion() {
    // — Doughnut: Empleo formal vs informal
    initChart('chart-ins-formalidad', {
        type: 'doughnut',
        data: {
            labels: ['Empleo formal (contrato)', 'Empleo informal', 'Independiente', 'Desempleado'],
            datasets: [{
                data: [52, 16, 12, 20],
                backgroundColor: [COLORS.blue, COLORS.teal, COLORS.purple, COLORS.red],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            cutout: '60%',
            plugins: { legend: { position: 'bottom', labels: { font: { size: 10 }, padding: 10 } } }
        }
    });

    // — Bar: % contratado por empresa de práctica
    initChart('chart-ins-contratacion', {
        type: 'bar',
        data: {
            labels: ['Mecánica Automotriz', 'Química Industrial'],
            datasets: [
                {
                    label: 'Contratado por empresa de práctica',
                    data: [42, 33],
                    backgroundColor: COLORS.green,
                    borderRadius: 4,
                    barPercentage: 0.6
                },
                {
                    label: 'Empleado en otra empresa',
                    data: [30, 28],
                    backgroundColor: COLORS.blue,
                    borderRadius: 4,
                    barPercentage: 0.6
                },
                {
                    label: 'Sin empleo / estudiando',
                    data: [28, 39],
                    backgroundColor: COLORS.grayLight,
                    borderRadius: 4,
                    barPercentage: 0.6
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
                x: { stacked: true, grid: { display: false } },
                y: { stacked: true, max: 100, title: { display: true, text: '% egresados con práctica' }, grid: { color: '#f1f3f4' } }
            },
            plugins: { legend: { position: 'top' } }
        }
    });

    // — Bar: Tiempo al primer empleo
    initChart('chart-ins-tiempo', {
        type: 'bar',
        data: {
            labels: ['< 1 mes', '1–2 meses', '2–3 meses', '3–6 meses', '> 6 meses'],
            datasets: [{
                data: [28, 32, 18, 14, 8],
                backgroundColor: [COLORS.green, COLORS.blue, COLORS.teal, COLORS.orange, COLORS.red],
                borderRadius: 4,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { title: { display: true, text: '% de egresados empleados' }, grid: { color: '#f1f3f4' } },
                x: { grid: { display: false } }
            }
        }
    });

    // — Radar: Satisfacción empresas por dimensión
    initChart('chart-ins-satisfaccion-emp', {
        type: 'radar',
        data: {
            labels: ['Competencias técnicas', 'Responsabilidad', 'Trabajo en equipo', 'Comunicación', 'Resolución de problemas', 'Competencias digitales'],
            datasets: [
                {
                    label: 'Mecánica Automotriz',
                    data: [4.2, 4.5, 4.3, 3.8, 4.0, 3.5],
                    backgroundColor: 'rgba(66,133,244,0.15)',
                    borderColor: COLORS.blue,
                    pointBackgroundColor: COLORS.blue,
                    borderWidth: 2
                },
                {
                    label: 'Química Industrial',
                    data: [4.0, 4.3, 4.1, 4.2, 3.8, 4.0],
                    backgroundColor: 'rgba(147,52,230,0.15)',
                    borderColor: COLORS.purple,
                    pointBackgroundColor: COLORS.purple,
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: '#f1f3f4' },
                    grid: { color: '#f1f3f4' },
                    suggestedMin: 0, suggestedMax: 5,
                    pointLabels: { font: { size: 11 } }
                }
            },
            plugins: { legend: { position: 'top' } }
        }
    });

    // — Horizontal bar: Factores de selección
    initChart('chart-ins-factores', {
        type: 'bar',
        data: {
            labels: ['Responsabilidad', 'Competencia técnica', 'Actitud proactiva', 'Puntualidad', 'Trabajo en equipo', 'Adaptabilidad'],
            datasets: [{
                data: [85, 78, 72, 68, 65, 58],
                backgroundColor: [COLORS.blue, COLORS.green, COLORS.purple, COLORS.teal, COLORS.orange, COLORS.yellow],
                borderRadius: 4,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: { title: { display: true, text: '% empresas que lo mencionan' }, grid: { color: '#f1f3f4' } },
                y: { grid: { display: false } }
            }
        }
    });
}

// ============================================================
//  PAGE 4: ANÁLISIS POR COHORTE
// ============================================================
function renderCohorte() {
    const cohortes = ['2022', '2023', '2024'];

    // — Grouped bar: Competencias técnicas por cohorte
    initChart('chart-coh-tecnicas', {
        type: 'bar',
        data: {
            labels: cohortes,
            datasets: [
                {
                    label: 'Mecánica Automotriz',
                    data: [3.6, 3.8, 4.1],
                    backgroundColor: COLORS.blue,
                    borderRadius: 4,
                    barPercentage: 0.6
                },
                {
                    label: 'Química Industrial',
                    data: [3.4, 3.7, 3.9],
                    backgroundColor: COLORS.purple,
                    borderRadius: 4,
                    barPercentage: 0.6
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: {
                y: { min: 1, max: 5, title: { display: true, text: 'Promedio (1–5)' }, grid: { color: '#f1f3f4' } },
                x: { grid: { display: false } }
            }
        }
    });

    // — Bar: Competencias transversales por cohorte
    initChart('chart-coh-transversales', {
        type: 'bar',
        data: {
            labels: cohortes,
            datasets: [{
                label: 'Promedio Competencias Transversales',
                data: [3.5, 3.8, 4.1],
                backgroundColor: cohortes.map((_, i) => i === 2 ? COLORS.green : COLORS.blue),
                borderRadius: 4,
                barPercentage: 0.65
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { min: 1, max: 5, title: { display: true, text: 'Puntuación (1–5)' }, grid: { color: '#f1f3f4' } },
                x: { grid: { display: false } }
            }
        }
    });

    // — Radar: Habilidades siglo XXI por generación
    initChart('chart-coh-siglo21', {
        type: 'radar',
        data: {
            labels: ['Pensamiento crítico', 'Creatividad', 'Comunicación', 'Colaboración', 'Resolución problemas', 'Ciudadanía digital', 'Aprendizaje autónomo', 'Liderazgo'],
            datasets: [
                {
                    label: 'Cohorte 2022',
                    data: [3.2, 3.0, 3.5, 3.8, 3.4, 2.8, 3.1, 2.9],
                    backgroundColor: 'rgba(218,220,224,0.15)',
                    borderColor: COLORS.grayLight,
                    borderDash: [5, 5],
                    borderWidth: 2,
                    pointRadius: 3,
                    pointBackgroundColor: COLORS.gray
                },
                {
                    label: 'Cohorte 2023',
                    data: [3.5, 3.3, 3.7, 4.0, 3.6, 3.2, 3.4, 3.2],
                    backgroundColor: 'rgba(52,168,83,0.1)',
                    borderColor: COLORS.green,
                    borderWidth: 2,
                    pointRadius: 3,
                    pointBackgroundColor: COLORS.green
                },
                {
                    label: 'Cohorte 2024',
                    data: [3.8, 3.5, 4.0, 4.3, 3.9, 3.6, 3.7, 3.5],
                    backgroundColor: 'rgba(66,133,244,0.15)',
                    borderColor: COLORS.blue,
                    borderWidth: 2.5,
                    pointRadius: 4,
                    pointBackgroundColor: COLORS.blue
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: '#f1f3f4' },
                    grid: { color: '#f1f3f4' },
                    suggestedMin: 0, suggestedMax: 5,
                    pointLabels: { font: { size: 10 } }
                }
            },
            plugins: { legend: { position: 'top' } }
        }
    });

    // — Grouped bar: Brechas Mecánica vs Química
    initChart('chart-coh-brechas', {
        type: 'bar',
        data: {
            labels: ['Comp. Técnicas', 'Comp. Transversales', 'Comp. Digitales', 'Hab. Siglo XXI', 'Satisfacción (NPS)', 'Inserción Laboral'],
            datasets: [
                {
                    label: 'Mecánica Automotriz',
                    data: [4.1, 4.0, 3.5, 3.7, 3.8, 4.2],
                    backgroundColor: COLORS.blue,
                    borderRadius: 4,
                    barPercentage: 0.6
                },
                {
                    label: 'Química Industrial',
                    data: [3.9, 4.2, 4.0, 3.8, 4.1, 3.6],
                    backgroundColor: COLORS.purple,
                    borderRadius: 4,
                    barPercentage: 0.6
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: {
                y: { min: 1, max: 5, title: { display: true, text: 'Promedio (1–5)' }, grid: { color: '#f1f3f4' } },
                x: { grid: { display: false } }
            }
        }
    });
}

// ============================================================
//  PAGE 5: DATOS DEMOGRÁFICOS Y EQUIDAD
// ============================================================
function renderDemograficos() {
    // — Stacked bar: Género por especialidad
    initChart('chart-demo-genero', {
        type: 'bar',
        data: {
            labels: ['Mecánica Automotriz', 'Química Industrial'],
            datasets: [
                { label: 'Masculino', data: [88, 48], backgroundColor: COLORS.blue, borderRadius: 2 },
                { label: 'Femenino', data: [10, 48], backgroundColor: COLORS.purple, borderRadius: 2 },
                { label: 'Otro / No dice', data: [2, 4], backgroundColor: COLORS.grayLight, borderRadius: 2 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
                x: { stacked: true, grid: { display: false } },
                y: { stacked: true, max: 100, title: { display: true, text: '%' }, grid: { color: '#f1f3f4' } }
            },
            plugins: { legend: { position: 'top' } }
        }
    });

    // — Bar: Rango etario
    initChart('chart-demo-edad', {
        type: 'bar',
        data: {
            labels: ['17-18', '19-20', '21-22', '23-25', '26+'],
            datasets: [{
                data: [35, 38, 18, 6, 3],
                backgroundColor: COLORS.blue,
                borderRadius: 4,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { title: { display: true, text: '% de egresados' }, grid: { color: '#f1f3f4' } },
                x: { grid: { display: false }, title: { display: true, text: 'Rango de edad' } }
            }
        }
    });

    // — Horizontal bar: Barreras reportadas
    initChart('chart-demo-barreras', {
        type: 'bar',
        data: {
            labels: ['Económicas', 'Falta de información', 'Transporte / distancia', 'Falta de redes', 'Discriminación', 'Discapacidad', 'Otra'],
            datasets: [{
                data: [52, 28, 22, 18, 8, 5, 12],
                backgroundColor: [COLORS.red, COLORS.orange, COLORS.yellow, COLORS.blue, COLORS.purple, COLORS.teal, COLORS.grayLight],
                borderRadius: 4,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: { title: { display: true, text: '% de quienes reportaron barreras' }, grid: { color: '#f1f3f4' } },
                y: { grid: { display: false } }
            }
        }
    });

    // — Stacked bar: Análisis de inclusión - grupos con dificultades
    initChart('chart-demo-inclusion', {
        type: 'bar',
        data: {
            labels: ['Mujeres en Mecánica', 'Egresados rurales', 'NSE bajo', 'Primera gen. ES', 'Situación discapacidad', 'Egresados extranjeros'],
            datasets: [
                {
                    label: '% Reportó dificultades',
                    data: [62, 48, 55, 42, 78, 38],
                    backgroundColor: COLORS.red,
                    borderRadius: 4,
                    barPercentage: 0.6
                },
                {
                    label: '% Superó dificultades',
                    data: [45, 35, 38, 30, 52, 28],
                    backgroundColor: COLORS.green,
                    borderRadius: 4,
                    barPercentage: 0.6
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { position: 'top' } },
            scales: {
                x: { title: { display: true, text: '% del grupo' }, grid: { color: '#f1f3f4' } },
                y: { grid: { display: false } }
            }
        }
    });

    // — Bar: Distribución por cohorte
    initChart('chart-demo-cohorte', {
        type: 'bar',
        data: {
            labels: ['2022', '2023', '2024', '2025'],
            datasets: [{
                data: [90, 102, 127, 63],
                backgroundColor: [COLORS.grayLight, COLORS.blue, COLORS.green, COLORS.orange],
                borderRadius: 4,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { title: { display: true, text: 'N° egresados' }, grid: { color: '#f1f3f4' } },
                x: { grid: { display: false }, title: { display: true, text: 'Cohorte de egreso' } }
            }
        }
    });
}
