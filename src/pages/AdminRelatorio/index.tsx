import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, DollarSign, TrendingUp, Ticket, Users, Download, ChevronDown } from 'lucide-react';
import PageRoutesName from '../../constants/PageRoutesName';
import styles from './style.module.css';

export function AdminRelatorioPage() {
    const navigate = useNavigate();
    const [activePill, setActivePill] = useState('Visão Geral');

    const pills = ['Visão Geral', 'Receita', 'Organizadores', 'Eventos'];

    const receitaPoints = [
        { month: 'Jan', value: 140000, y: 150 },
        { month: 'Fev', value: 160000, y: 128 },
        { month: 'Mar', value: 190000, y: 96 },
        { month: 'Abr', value: 220000, y: 64 },
        { month: 'Mai', value: 185000, y: 101 },
        { month: 'Jun', value: 210000, y: 75 },
        { month: 'Jul', value: 250000, y: 32 },
        { month: 'Ago', value: 240000, y: 42 },
        { month: 'Set', value: 195000, y: 91 },
        { month: 'Out', value: 220000, y: 64 },
        { month: 'Nov', value: 270000, y: 10 },
    ];

    const comissoesPoints = [
        { month: 'Jan', value: 7000, y: 290 },
        { month: 'Fev', value: 8000, y: 288 },
        { month: 'Mar', value: 9500, y: 286 },
        { month: 'Abr', value: 11000, y: 284 },
        { month: 'Mai', value: 9250, y: 287 },
        { month: 'Jun', value: 10500, y: 285 },
        { month: 'Jul', value: 12500, y: 282 },
        { month: 'Ago', value: 12000, y: 283 },
        { month: 'Set', value: 9750, y: 286 },
        { month: 'Out', value: 11000, y: 284 },
        { month: 'Nov', value: 13500, y: 280 },
    ];

    const barPoints = [
        { month: 'Jan', val: 3200 },
        { month: 'Fev', val: 3800 },
        { month: 'Mar', val: 4300 },
        { month: 'Abr', val: 4900, hover: true },
        { month: 'Mai', val: 4000 },
        { month: 'Jun', val: 4700 },
        { month: 'Jul', val: 5500 },
        { month: 'Ago', val: 5200 },
        { month: 'Set', val: 4400 },
        { month: 'Out', val: 5000 },
        { month: 'Nov', val: 6000 },
    ];

    return (
        <div className={styles.container}>
            <button 
                className={styles.backButton}
                onClick={() => navigate(PageRoutesName.administrador.adminDashboard)}
            >
                <ArrowLeft size={16} />
                Voltar ao Dashboard
            </button>

            <div className={styles.headerRow}>
                <div>
                    <h1 className={styles.pageTitle}>Relatórios Globais</h1>
                    <p className={styles.pageSubtitle}>Análises e insights de toda a plataforma</p>
                </div>
                <div className={styles.headerActions}>
                    <div className={styles.dropdown}>
                        Último Ano <ChevronDown size={14} />
                    </div>
                    <button className={styles.exportBtn}>
                        <Download size={16} /> Exportar PDF
                    </button>
                </div>
            </div>

            <div className={styles.pillsRow}>
                {pills.map(p => (
                    <button 
                        key={p} 
                        className={`${styles.pill} ${activePill === p ? styles.activePill : ''}`}
                        onClick={() => setActivePill(p)}
                    >
                        {p}
                    </button>
                ))}
            </div>

            <div className={styles.metricsGrid}>
                {/* Receita Total */}
                <div className={styles.metricCard}>
                    <div className={styles.cardHeader}>
                        <span>Receita Total</span>
                        <DollarSign size={18} color="#9ca3af" />
                    </div>
                    <div className={styles.cardValue}>R$ 2.296.000</div>
                    <div className={styles.cardTrendSuccess}>+18.2% vs período anterior</div>
                </div>

                {/* Comissões */}
                <div className={styles.metricCard}>
                    <div className={styles.cardHeader}>
                        <span>Comissões</span>
                        <TrendingUp size={18} color="#9ca3af" />
                    </div>
                    <div className={styles.cardValue}>R$ 114.800</div>
                    <div className={styles.cardTrendSub}>5.0% do total</div>
                </div>

                {/* Ingressos */}
                <div className={styles.metricCard}>
                    <div className={styles.cardHeader}>
                        <span>Ingressos Vendidos</span>
                        <Ticket size={18} color="#9ca3af" />
                    </div>
                    <div className={styles.cardValue}>50.950</div>
                </div>

                {/* Ticket Médio */}
                <div className={styles.metricCard}>
                    <div className={styles.cardHeader}>
                        <span>Ticket Médio</span>
                        <Users size={18} color="#9ca3af" />
                    </div>
                    <div className={styles.cardValue}>R$ 45.06</div>
                </div>
            </div>

            {/* Evolução Line Chart */}
            <div className={styles.chartCard}>
                <div className={styles.chartCardHeader}>
                    <h3 className={styles.chartTitle}>Evolução da Receita e Comissões</h3>
                    <p className={styles.chartSubtitle}>Últimos 11 meses</p>
                </div>
                
                <div className={styles.lineChartArea}>
                    <div className={styles.yAxisLabels}>
                        <span>280000</span>
                        <span>210000</span>
                        <span>140000</span>
                        <span>70000</span>
                        <span>0</span>
                    </div>
                    
                    <div className={styles.svgWrapper}>
                        {/* Grid lines */}
                        <div className={styles.gridLines}>
                            <div className={styles.gridLineH} style={{top: '0%'}}></div>
                            <div className={styles.gridLineH} style={{top: '25%'}}></div>
                            <div className={styles.gridLineH} style={{top: '50%'}}></div>
                            <div className={styles.gridLineH} style={{top: '75%'}}></div>
                            <div className={styles.gridLineH} style={{top: '100%'}}></div>

                            {receitaPoints.map((_, i) => (
                                <div key={i} className={styles.gridLineV} style={{left: `${(i/10)*100}%`}}></div>
                            ))}
                        </div>

                        <svg className={styles.svgChart} viewBox="0 0 1000 300" preserveAspectRatio="none">
                            {/* Receita Line */}
                            <polyline 
                                fill="none" 
                                stroke="#3b82f6" 
                                strokeWidth="3" 
                                points={receitaPoints.map((p, i) => `${(i/10)*1000},${p.y}`).join(' ')} 
                            />
                            {receitaPoints.map((p, i) => (
                                <circle key={`r-${i}`} cx={(i/10)*1000} cy={p.y} r="5" fill="white" stroke="#3b82f6" strokeWidth="2" />
                            ))}

                            {/* Comissoes Line */}
                            <polyline 
                                fill="none" 
                                stroke="#10b981" 
                                strokeWidth="3" 
                                points={comissoesPoints.map((p, i) => `${(i/10)*1000},${p.y}`).join(' ')} 
                            />
                            {comissoesPoints.map((p, i) => (
                                <circle key={`c-${i}`} cx={(i/10)*1000} cy={p.y} r="5" fill="white" stroke="#10b981" strokeWidth="2" />
                            ))}
                        </svg>

                        {/* Hover Tooltip (Mocked statically on Mai as per screenshot) */}
                        <div className={styles.tooltipBox}>
                            <p className={styles.tooltipTitle}>Mai</p>
                            <p className={styles.tooltipRowBlue}>Receita Total : R$ 185.000</p>
                            <p className={styles.tooltipRowGreen}>Comissões : R$ 9.250</p>
                        </div>

                        <div className={styles.xAxisLabels}>
                            {receitaPoints.map((p, i) => (
                                <span key={i} style={{left: `calc(${(i/10)*100}% - 15px)`}}>{p.month}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.chartLegend}>
                    <span className={styles.legendItem}><div className={styles.legendColor} style={{backgroundColor: '#3b82f6'}}></div> Receita Total</span>
                    <span className={styles.legendItem}><div className={styles.legendColor} style={{background: 'transparent', border: '2px solid #10b981', borderRadius: '50%'}}></div> Comissões</span>
                </div>
            </div>

            {/* Categoria Pie Chart */}
            <div className={styles.chartCard}>
                <div className={styles.chartCardHeader}>
                    <h3 className={styles.chartTitle}>Receita por Categoria</h3>
                </div>

                <div className={styles.pieArea}>
                    <div className={styles.pieWrapper}>
                        <div className={styles.pieSlices}></div>
                        
                        {/* Labels positioned around pie */}
                        <div className={styles.pieLabel} style={{top: '-15%', left: '55%', color: '#3b82f6'}}>Música 40%</div>
                        <div className={styles.pieLabel} style={{top: '60%', left: '-25%', color: '#8b5cf6'}}>Teatro 30%</div>
                        <div className={styles.pieLabel} style={{bottom: '-15%', left: '45%', color: '#10b981'}}>Esporte 20%</div>
                        <div className={styles.pieLabel} style={{top: '40%', right: '-35%', color: '#f59e0b'}}>Conferência 10%</div>
                        
                        {/* Tooltip on Musica */}
                        <div className={styles.pieTooltip}>
                            Música : R$ 980.000
                        </div>
                    </div>
                </div>
            </div>

            {/* Bars Chart */}
            <div className={styles.chartCard}>
                <div className={styles.chartCardHeader}>
                    <h3 className={styles.chartTitle}>Ingressos Vendidos por Mês</h3>
                </div>
                
                <div className={styles.barChartArea}>
                    <div className={styles.yAxisLabelsBars}>
                        <span>6000</span>
                        <span>4500</span>
                        <span>3000</span>
                        <span>1500</span>
                        <span>0</span>
                    </div>

                    <div className={styles.barsWrapper}>
                        {/* Grid lines */}
                        <div className={styles.gridLines}>
                            <div className={styles.gridLineH} style={{top: '0%'}}></div>
                            <div className={styles.gridLineH} style={{top: '25%'}}></div>
                            <div className={styles.gridLineH} style={{top: '50%'}}></div>
                            <div className={styles.gridLineH} style={{top: '75%'}}></div>
                            <div className={styles.gridLineH} style={{top: '100%'}}></div>
                        </div>

                        <div className={styles.barsContainer}>
                            {barPoints.map((b, i) => (
                                <div key={i} className={styles.barCol}>
                                    {b.hover && (
                                        <>
                                            <div className={styles.barHoverBg}></div>
                                            <div className={styles.barTooltip}>
                                                <p className={styles.ttTitle}>{b.month}</p>
                                                <p className={styles.ttValue}>Ingressos : {b.val}</p>
                                            </div>
                                        </>
                                    )}
                                    <div className={styles.barFill} style={{height: `${(b.val / 6000) * 100}%`}}></div>
                                    <span className={styles.barMonth}>{b.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
