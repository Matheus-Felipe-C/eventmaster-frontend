import { useState } from 'react';
import {
    ArrowLeft,
    Download,
    TrendingUp,
    DollarSign,
    Users,
    Ticket,
} from 'lucide-react';
import { toast } from 'sonner';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);
import styles from './styles.module.css';

const REVENUE_DATA = [
    { month: 'Jan', revenue: 145000, commission: 7250, tickets: 3200 },
    { month: 'Fev', revenue: 168000, commission: 8400, tickets: 3800 },
    { month: 'Mar', revenue: 195000, commission: 9750, tickets: 4300 },
    { month: 'Abr', revenue: 220000, commission: 11000, tickets: 4900 },
    { month: 'Mai', revenue: 185000, commission: 9250, tickets: 4100 },
    { month: 'Jun', revenue: 210000, commission: 10500, tickets: 4700 },
    { month: 'Jul', revenue: 250000, commission: 12500, tickets: 5500 },
    { month: 'Ago', revenue: 235000, commission: 11750, tickets: 5200 },
    { month: 'Set', revenue: 198000, commission: 9900, tickets: 4400 },
    { month: 'Out', revenue: 223000, commission: 11150, tickets: 4950 },
    { month: 'Nov', revenue: 267000, commission: 13350, tickets: 5900 },
];

const CATEGORY_DATA = [
    { name: 'Música', value: 980000, color: '#3b82f6' },
    { name: 'Teatro', value: 735000, color: '#8b5cf6' },
    { name: 'Esporte', value: 490000, color: '#10b981' },
    { name: 'Conferência', value: 245000, color: '#f59e0b' },
];

const ORGANIZER_PERFORMANCE = [
    {
        name: 'Live Nation Brasil',
        events: 45,
        revenue: 1250000,
        tickets: 32500,
    },
    { name: 'Rock World', events: 28, revenue: 850000, tickets: 21000 },
    { name: 'Teatro Nacional', events: 35, revenue: 675000, tickets: 18500 },
    { name: 'Sports Events BR', events: 22, revenue: 540000, tickets: 14200 },
    { name: 'Tech Conferences', events: 18, revenue: 380000, tickets: 9800 },
];

const TOP_EVENTS = [
    {
        name: 'Rock in Rio 2025',
        tickets: 85000,
        revenue: 38250000,
        organizer: 'Live Nation Brasil',
    },
    {
        name: 'Festival Eletrônica SP',
        tickets: 45000,
        revenue: 6750000,
        organizer: 'Rock World',
    },
    {
        name: 'Jogos Pan-Americanos',
        tickets: 120000,
        revenue: 12000000,
        organizer: 'Sports Events BR',
    },
    {
        name: 'Tech Summit 2025',
        tickets: 5000,
        revenue: 1750000,
        organizer: 'Tech Conferences',
    },
    {
        name: 'Musical da Broadway',
        tickets: 15000,
        revenue: 3000000,
        organizer: 'Teatro Nacional',
    },
];

export function GlobalReports({ onBack }: { onBack: () => void }) {
    const [selectedPeriod, setSelectedPeriod] = useState('year');
    const [currentTab, setCurrentTab] = useState('overview');

    const handleExport = (reportType: string) => {
        toast.success(`Relatório de ${reportType} exportado com sucesso!`);
    };

    const totalRevenue = REVENUE_DATA.reduce(
        (acc, item) => acc + item.revenue,
        0
    );
    const totalCommission = REVENUE_DATA.reduce(
        (acc, item) => acc + item.commission,
        0
    );
    const totalTickets = REVENUE_DATA.reduce(
        (acc, item) => acc + item.tickets,
        0
    );
    const avgTicketPrice = totalRevenue / totalTickets;

    return (
        <div className={styles.container}>
            {/* Header Manual */}
            <div className={styles.headerSection}>
                <button onClick={onBack} className={styles.backButton}>
                    <ArrowLeft size={24} />
                    Voltar ao Dashboard
                </button>
                <div className={styles.headerFlex}>
                    <div>
                        <h1 className={styles.pageTitle}>Relatórios Globais</h1>
                        <p className={styles.pageSubtitle}>
                            Análises e insights de toda a plataforma
                        </p>
                    </div>
                    <div className={styles.controlsGroup}>
                        <select
                            className={styles.selectInput}
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                        >
                            <option value="month">Último Mês</option>
                            <option value="quarter">Último Trimestre</option>
                            <option value="year">Último Ano</option>
                            <option value="all">Todo Período</option>
                        </select>
                        <button
                            className={styles.btnOutline}
                            onClick={() => handleExport('completo')}
                        >
                            <Download size={20} /> Exportar PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Navegação Manual (Tabs) */}
            <nav className={styles.tabsList}>
                {['overview', 'revenue', 'organizers', 'events'].map((tab) => (
                    <button
                        key={tab}
                        className={`${styles.tabTrigger} ${currentTab === tab ? styles.tabActive : ''}`}
                        onClick={() => setCurrentTab(tab)}
                    >
                        {tab === 'overview' && (
                            <TrendingUp
                                size={16}
                                style={{ marginRight: '0.8rem' }}
                            />
                        )}
                        {tab === 'revenue' && (
                            <DollarSign
                                size={16}
                                style={{ marginRight: '0.8rem' }}
                            />
                        )}
                        {tab === 'organizers' && (
                            <Users
                                size={16}
                                style={{ marginRight: '0.8rem' }}
                            />
                        )}
                        {tab === 'events' && (
                            <Ticket
                                size={16}
                                style={{ marginRight: '0.8rem' }}
                            />
                        )}
                        {tab === 'overview'
                            ? 'Visão Geral'
                            : tab === 'revenue'
                              ? 'Receita'
                              : tab === 'organizers'
                                ? 'Organizadores'
                                : 'Eventos'}
                    </button>
                ))}
            </nav>

            {currentTab === 'overview' && (
                <div className={styles.tabsContent}>
                    {/* KPIs Principais */}
                    <div className={styles.kpiGrid}>
                        <div className={styles.kpiCard}>
                            <div className={styles.kpiHeader}>
                                <span className={styles.kpiTitle}>
                                    Receita Total
                                </span>
                                <DollarSign
                                    size={20}
                                    className={styles.kpiIcon}
                                />
                            </div>
                            <div className={styles.kpiContent}>
                                <div className={styles.kpiValue}>
                                    R$ {totalRevenue.toLocaleString('pt-BR')}
                                </div>
                                <p className={styles.kpiGreenSubtext}>
                                    +18.2% vs período anterior
                                </p>
                            </div>
                        </div>

                        <div className={styles.kpiCard}>
                            <div className={styles.kpiHeader}>
                                <span className={styles.kpiTitle}>
                                    Comissões
                                </span>
                                <TrendingUp
                                    size={20}
                                    className={styles.kpiIcon}
                                />
                            </div>
                            <div className={styles.kpiContent}>
                                <div className={styles.kpiValue}>
                                    R$ {totalCommission.toLocaleString('pt-BR')}
                                </div>
                                <p className={styles.kpiSubtext}>
                                    {(
                                        (totalCommission / totalRevenue) *
                                        100
                                    ).toFixed(1)}
                                    % do total
                                </p>
                            </div>
                        </div>

                        <div className={styles.kpiCard}>
                            <div className={styles.kpiHeader}>
                                <span className={styles.kpiTitle}>
                                    Ingressos Vendidos
                                </span>
                                <Ticket size={20} className={styles.kpiIcon} />
                            </div>
                            <div className={styles.kpiContent}>
                                <div className={styles.kpiValue}>
                                    {totalTickets.toLocaleString('pt-BR')}
                                </div>
                                <p className={styles.kpiGreenSubtext}>
                                    +12.5% vs período anterior
                                </p>
                            </div>
                        </div>

                        <div className={styles.kpiCard}>
                            <div className={styles.kpiHeader}>
                                <span className={styles.kpiTitle}>
                                    Ticket Médio
                                </span>
                                <Users size={20} className={styles.kpiIcon} />
                            </div>
                            <div className={styles.kpiContent}>
                                <div className={styles.kpiValue}>
                                    R$ {avgTicketPrice.toFixed(2)}
                                </div>
                                <p className={styles.kpiSubtext}>
                                    Todas as categorias
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>
                                Evolução da Receita e Comissões
                            </h3>
                            <p className={styles.cardDescription}>
                                Últimos 11 meses
                            </p>
                        </div>
                        <div className={styles.cardContent}>
                            <div style={{ width: '100%', height: 450 }}>
                                <Line
                                    data={{
                                        labels: REVENUE_DATA.map(
                                            (d) => d.month
                                        ),
                                        datasets: [
                                            {
                                                label: 'Receita Total',
                                                data: REVENUE_DATA.map(
                                                    (d) => d.revenue
                                                ),
                                                borderColor: '#3b82f6',
                                                backgroundColor:
                                                    'rgba(59, 130, 246, 0.5)',
                                                tension: 0.4,
                                                borderWidth: 3,
                                            },
                                            {
                                                label: 'Comissões',
                                                data: REVENUE_DATA.map(
                                                    (d) => d.commission
                                                ),
                                                borderColor: '#10b981',
                                                backgroundColor:
                                                    'rgba(16, 185, 129, 0.5)',
                                                tension: 0.4,
                                                borderWidth: 3,
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            tooltip: {
                                                callbacks: {
                                                    label: function (context) {
                                                        let label =
                                                            context.dataset
                                                                .label || '';
                                                        if (label)
                                                            label += ': ';
                                                        label +=
                                                            'R$ ' +
                                                            Number(
                                                                context.parsed.y
                                                            ).toLocaleString(
                                                                'pt-BR'
                                                            );
                                                        return label;
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.chartsGrid}>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>
                                    Receita por Categoria
                                </h3>
                            </div>
                            <div className={styles.cardContent}>
                                <div style={{ width: '100%', height: 350 }}>
                                    <Pie
                                        data={{
                                            labels: CATEGORY_DATA.map(
                                                (d) => d.name
                                            ),
                                            datasets: [
                                                {
                                                    data: CATEGORY_DATA.map(
                                                        (d) => d.value
                                                    ),
                                                    backgroundColor:
                                                        CATEGORY_DATA.map(
                                                            (d) => d.color
                                                        ),
                                                    borderWidth: 1,
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: { labels: { font: { size: 14 } } },
                                                tooltip: {
                                                    callbacks: {
                                                        label: function (
                                                            context
                                                        ) {
                                                            let label =
                                                                context.label ||
                                                                '';
                                                            if (label)
                                                                label += ': ';
                                                            label +=
                                                                'R$ ' +
                                                                Number(
                                                                    context.raw
                                                                ).toLocaleString(
                                                                    'pt-BR'
                                                                );
                                                            return label;
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>
                                    Ingressos Vendidos por Mês
                                </h3>
                            </div>
                            <div className={styles.cardContent}>
                                <div style={{ width: '100%', height: 350 }}>
                                    <Bar
                                        data={{
                                            labels: REVENUE_DATA.map(
                                                (d) => d.month
                                            ),
                                            datasets: [
                                                {
                                                    label: 'Ingressos',
                                                    data: REVENUE_DATA.map(
                                                        (d) => d.tickets
                                                    ),
                                                    backgroundColor: '#3b82f6',
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            scales: {
                                                x: { ticks: { font: { size: 14 } } },
                                                y: { ticks: { font: { size: 14 } } }
                                            },
                                            plugins: {
                                                legend: { labels: { font: { size: 14 } } },
                                                tooltip: {
                                                    callbacks: {
                                                        label: function (
                                                            context
                                                        ) {
                                                            return (
                                                                context.dataset
                                                                    .label +
                                                                ': ' +
                                                                Number(
                                                                    context.raw
                                                                ).toLocaleString(
                                                                    'pt-BR'
                                                                )
                                                            );
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {currentTab === 'revenue' && (
                <div className={styles.tabsContent}>
                    <div className={styles.chartsGridMulti}>
                        <div className={`${styles.card} ${styles.lgColSpan2}`}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>
                                    Receita Mensal Detalhada
                                </h3>
                                <p className={styles.cardDescription}>
                                    Receita bruta vs comissões da plataforma
                                </p>
                            </div>
                            <div className={styles.cardContent}>
                                <div style={{ width: '100%', height: 450 }}>
                                    <Bar
                                        data={{
                                            labels: REVENUE_DATA.map(
                                                (d) => d.month
                                            ),
                                            datasets: [
                                                {
                                                    label: 'Receita Total',
                                                    data: REVENUE_DATA.map(
                                                        (d) => d.revenue
                                                    ),
                                                    backgroundColor: '#3b82f6',
                                                },
                                                {
                                                    label: 'Comissões',
                                                    data: REVENUE_DATA.map(
                                                        (d) => d.commission
                                                    ),
                                                    backgroundColor: '#10b981',
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                tooltip: {
                                                    callbacks: {
                                                        label: function (
                                                            context
                                                        ) {
                                                            let label =
                                                                context.dataset
                                                                    .label ||
                                                                '';
                                                            if (label)
                                                                label += ': ';
                                                            label +=
                                                                'R$ ' +
                                                                Number(
                                                                    context.raw
                                                                ).toLocaleString(
                                                                    'pt-BR'
                                                                );
                                                            return label;
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>
                                    Métricas de Receita
                                </h3>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.metricsColumn}>
                                    <div className={styles.metricItem}>
                                        <div className={styles.metricLabel}>
                                            Receita Bruta
                                        </div>
                                        <div className={styles.metricValue}>
                                            R${' '}
                                            {totalRevenue.toLocaleString(
                                                'pt-BR'
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.metricItem}>
                                        <div className={styles.metricLabel}>
                                            Comissões Totais
                                        </div>
                                        <div
                                            className={styles.metricValueGreen}
                                        >
                                            R${' '}
                                            {totalCommission.toLocaleString(
                                                'pt-BR'
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.metricItem}>
                                        <div className={styles.metricLabel}>
                                            Receita Organizadores
                                        </div>
                                        <div className={styles.metricValue}>
                                            R${' '}
                                            {(
                                                totalRevenue - totalCommission
                                            ).toLocaleString('pt-BR')}
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.metricItem} ${styles.dividerTop}`}
                                    >
                                        <div className={styles.metricLabel}>
                                            Taxa Média
                                        </div>
                                        <div
                                            className={styles.metricValueSmall}
                                        >
                                            {(
                                                (totalCommission /
                                                    totalRevenue) *
                                                100
                                            ).toFixed(2)}
                                            %
                                        </div>
                                    </div>
                                    <button
                                        className={styles.btnPrimaryFull}
                                        onClick={() => handleExport('receita')}
                                    >
                                        <Download size={20} /> Exportar
                                        Relatório
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>
                                Receita por Categoria
                            </h3>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.categoryList}>
                                {CATEGORY_DATA.map((category) => (
                                    <div
                                        key={category.name}
                                        className={styles.categoryRow}
                                    >
                                        <div className={styles.categoryTextRow}>
                                            <span>{category.name}</span>
                                            <span>
                                                R${' '}
                                                {category.value.toLocaleString(
                                                    'pt-BR'
                                                )}
                                            </span>
                                        </div>
                                        <div className={styles.progressBarBg}>
                                            <div
                                                className={
                                                    styles.progressBarFill
                                                }
                                                style={{
                                                    width: `${
                                                        (category.value /
                                                            CATEGORY_DATA.reduce(
                                                                (acc, c) =>
                                                                    acc +
                                                                    c.value,
                                                                0
                                                            )) *
                                                        100
                                                    }%`,
                                                    backgroundColor:
                                                        category.color,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {currentTab === 'organizers' && (
                <div className={styles.tabsContent}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.headerFlex}>
                                <div>
                                    <h3 className={styles.cardTitle}>
                                        Performance dos Organizadores
                                    </h3>
                                    <p className={styles.cardDescription}>
                                        Top 5 organizadores por receita
                                    </p>
                                </div>
                                <button
                                    className={styles.btnOutline}
                                    onClick={() =>
                                        handleExport('organizadores')
                                    }
                                >
                                    <Download size={20} /> Exportar
                                </button>
                            </div>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.tableWrapper}>
                                <table className={styles.dataTable}>
                                    <thead className={styles.tableHead}>
                                        <tr>
                                            <th className={styles.thStyle}>
                                                Organizador
                                            </th>
                                            <th className={styles.thStyle}>
                                                Eventos
                                            </th>
                                            <th className={styles.thStyle}>
                                                Ingressos
                                            </th>
                                            <th className={styles.thStyle}>
                                                Receita
                                            </th>
                                            <th className={styles.thStyle}>
                                                Comissão (5%)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ORGANIZER_PERFORMANCE.map(
                                            (org, index) => (
                                                <tr
                                                    key={org.name}
                                                    className={styles.trHover}
                                                >
                                                    <td
                                                        className={
                                                            styles.tdStyle
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.orgCell
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.indexBadgeBlue
                                                                }
                                                            >
                                                                {index + 1}
                                                            </div>
                                                            <span
                                                                className={
                                                                    styles.orgName
                                                                }
                                                            >
                                                                {org.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className={
                                                            styles.tdStyle
                                                        }
                                                    >
                                                        {org.events}
                                                    </td>
                                                    <td
                                                        className={
                                                            styles.tdStyle
                                                        }
                                                    >
                                                        {org.tickets.toLocaleString(
                                                            'pt-BR'
                                                        )}
                                                    </td>
                                                    <td
                                                        className={
                                                            styles.tdStyle
                                                        }
                                                    >
                                                        R${' '}
                                                        {org.revenue.toLocaleString(
                                                            'pt-BR'
                                                        )}
                                                    </td>
                                                    <td
                                                        className={`${styles.tdStyle} ${styles.textGreen}`}
                                                    >
                                                        R${' '}
                                                        {(
                                                            org.revenue * 0.05
                                                        ).toLocaleString(
                                                            'pt-BR'
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>
                                Comparativo de Performance
                            </h3>
                        </div>
                        <div className={styles.cardContent}>
                            <div style={{ width: '100%', height: 400 }}>
                                <Bar
                                    data={{
                                        labels: ORGANIZER_PERFORMANCE.map(
                                            (d) => d.name
                                        ),
                                        datasets: [
                                            {
                                                label: 'Eventos',
                                                data: ORGANIZER_PERFORMANCE.map(
                                                    (d) => d.events
                                                ),
                                                backgroundColor: '#3b82f6',
                                            },
                                            {
                                                label: 'Ingressos (÷100)',
                                                data: ORGANIZER_PERFORMANCE.map(
                                                    (d) => d.tickets
                                                ),
                                                backgroundColor: '#10b981',
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            tooltip: {
                                                callbacks: {
                                                    label: function (context) {
                                                        return (
                                                            context.dataset
                                                                .label +
                                                            ': ' +
                                                            Number(
                                                                context.raw
                                                            ).toLocaleString(
                                                                'pt-BR'
                                                            )
                                                        );
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {currentTab === 'events' && (
                <div className={styles.tabsContent}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.headerFlex}>
                                <div>
                                    <h3 className={styles.cardTitle}>
                                        Top Eventos por Receita
                                    </h3>
                                    <p className={styles.cardDescription}>
                                        Eventos com maior faturamento
                                    </p>
                                </div>
                                <button
                                    className={styles.btnOutline}
                                    onClick={() => handleExport('eventos')}
                                >
                                    <Download size={20} /> Exportar
                                </button>
                            </div>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.tableWrapper}>
                                <table className={styles.dataTable}>
                                    <thead className={styles.tableHead}>
                                        <tr>
                                            <th className={styles.thStyle}>
                                                Evento
                                            </th>
                                            <th className={styles.thStyle}>
                                                Organizador
                                            </th>
                                            <th className={styles.thStyle}>
                                                Ingressos
                                            </th>
                                            <th className={styles.thStyle}>
                                                Receita
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {TOP_EVENTS.map((event, index) => (
                                            <tr
                                                key={event.name}
                                                className={styles.trHover}
                                            >
                                                <td className={styles.tdStyle}>
                                                    <div
                                                        className={
                                                            styles.orgCell
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.indexBadgeAmber
                                                            }
                                                        >
                                                            {index + 1}
                                                        </div>
                                                        <span
                                                            className={
                                                                styles.orgName
                                                            }
                                                        >
                                                            {event.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td
                                                    className={`${styles.tdStyle} ${styles.textGray}`}
                                                >
                                                    {event.organizer}
                                                </td>
                                                <td className={styles.tdStyle}>
                                                    {event.tickets.toLocaleString(
                                                        'pt-BR'
                                                    )}
                                                </td>
                                                <td className={styles.tdStyle}>
                                                    R${' '}
                                                    {event.revenue.toLocaleString(
                                                        'pt-BR'
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className={styles.chartsGrid}>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>
                                    Eventos por Categoria
                                </h3>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.eventCountList}>
                                    <div
                                        className={`${styles.eventCountItem} ${styles.bgBlue}`}
                                    >
                                        <span className={styles.colorBlue}>
                                            🎵 Música
                                        </span>
                                        <span className={styles.colorBlue}>
                                            89 eventos
                                        </span>
                                    </div>
                                    <div
                                        className={`${styles.eventCountItem} ${styles.bgPurple}`}
                                    >
                                        <span className={styles.colorPurple}>
                                            🎭 Teatro
                                        </span>
                                        <span className={styles.colorPurple}>
                                            64 eventos
                                        </span>
                                    </div>
                                    <div
                                        className={`${styles.eventCountItem} ${styles.bgGreen}`}
                                    >
                                        <span className={styles.colorGreen}>
                                            ⚽ Esporte
                                        </span>
                                        <span className={styles.colorGreen}>
                                            45 eventos
                                        </span>
                                    </div>
                                    <div
                                        className={`${styles.eventCountItem} ${styles.bgAmber}`}
                                    >
                                        <span className={styles.colorAmber}>
                                            💼 Conferência
                                        </span>
                                        <span className={styles.colorAmber}>
                                            36 eventos
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>
                                    Taxa de Ocupação Média
                                </h3>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.categoryList}>
                                    <div className={styles.categoryRow}>
                                        <div className={styles.categoryTextRow}>
                                            <span>Música</span>
                                            <span>78%</span>
                                        </div>
                                        <div className={styles.progressBarBg}>
                                            <div
                                                className={
                                                    styles.progressBarFill
                                                }
                                                style={{
                                                    width: '78%',
                                                    backgroundColor: '#2563eb',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.categoryRow}>
                                        <div className={styles.categoryTextRow}>
                                            <span>Teatro</span>
                                            <span>85%</span>
                                        </div>
                                        <div className={styles.progressBarBg}>
                                            <div
                                                className={
                                                    styles.progressBarFill
                                                }
                                                style={{
                                                    width: '85%',
                                                    backgroundColor: '#9333ea',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.categoryRow}>
                                        <div className={styles.categoryTextRow}>
                                            <span>Esporte</span>
                                            <span>92%</span>
                                        </div>
                                        <div className={styles.progressBarBg}>
                                            <div
                                                className={
                                                    styles.progressBarFill
                                                }
                                                style={{
                                                    width: '92%',
                                                    backgroundColor: '#16a34a',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.categoryRow}>
                                        <div className={styles.categoryTextRow}>
                                            <span>Conferência</span>
                                            <span>68%</span>
                                        </div>
                                        <div className={styles.progressBarBg}>
                                            <div
                                                className={
                                                    styles.progressBarFill
                                                }
                                                style={{
                                                    width: '68%',
                                                    backgroundColor: '#d97706',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
