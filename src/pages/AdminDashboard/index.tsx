import {
    Users,
    ShieldCheck,
    BookMarked,
    DollarSign,
    TrendingUp,
    Ticket,
    Settings,
    CheckCircle,
    AlertTriangle,
} from 'lucide-react';
import styles from './style.module.css';
import { useNavigate } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';

export function AdminDashboardPage() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            {/* Título */}
            <h1 className={styles.pageTitle}>
                Painel Administrativo Global - EventMaster
            </h1>
            <p className={styles.pageSubtitle}>
                Gerenciamento completo da plataforma
            </p>

            {/* Tabs (Navigation) */}
            <div className={styles.tabsContainer}>
                {(
                    [
                        { key: 'visaoGeral', label: 'Visão Geral', isCurrent: true },
                        { key: 'organizadores', label: 'Organizadores', badge: 2, isCurrent: false },
                        { key: 'aprovacoes', label: 'Aprovações', badge: 3, isCurrent: false },
                        { key: 'comissoes', label: 'Comissões', isCurrent: false },
                        { key: 'relatorios', label: 'Relatórios', isCurrent: false },
                    ] as const
                ).map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => {
                            if (tab.key === 'organizadores') navigate(PageRoutesName.administrador.getOrganizadores);
                            else if (tab.key === 'aprovacoes') navigate(PageRoutesName.administrador.approveEvents);
                            else if (tab.key === 'comissoes') navigate(PageRoutesName.administrador.adminComissoes);
                            else if (tab.key === 'relatorios') navigate(PageRoutesName.administrador.adminRelatorio);
                        }}
                        className={`${styles.tab} ${tab.isCurrent ? styles.activeTab : ''}`}
                    >
                        {tab.label}
                        {'badge' in tab && tab.badge > 0 && (
                            <span className={styles.badgeRed}>{tab.badge}</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Conteúdo da aba Visão Geral */}
            <>
                <div className={styles.accessLevelsSection}>
                    <h2 className={styles.sectionTitle}>
                        Sistema de Três Níveis de Acesso
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        A plataforma EventMaster possui três níveis distintos de
                        acesso, cada um com funcionalidades específicas
                    </p>

                    <div className={styles.cardsGrid}>
                        {/* Usuário */}
                        <div className={styles.accessCard}>
                            <div className={styles.accessCardHeader}>
                                <div className={`${styles.iconBox} ${styles.iconBoxBlue}`}>
                                    <Users size={24} color="#3b82f6" />
                                </div>
                                <span className={styles.accessCardTitle}>Usuário</span>
                            </div>
                            <p className={styles.accessCardDesc}>
                                Compra ingressos e gerencia suas reservas
                            </p>
                            <ul className={styles.featureList}>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Navegar e pesquisar eventos</li>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Comprar ingressos com cartão ou PIX</li>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Visualizar ingressos com QR code</li>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Solicitar reembolsos (7 dias antes)</li>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Solicitar cadastro como organizador</li>
                            </ul>
                        </div>

                        {/* Organizador */}
                        <div className={styles.accessCard}>
                            <div className={styles.accessCardHeader}>
                                <div className={`${styles.iconBox} ${styles.iconBoxPurple}`}>
                                    <BookMarked size={24} color="#7c3aed" />
                                </div>
                                <span className={styles.accessCardTitle}>Organizador</span>
                            </div>
                            <p className={styles.accessCardDesc}>
                                Cria e gerencia eventos na plataforma
                            </p>
                            <ul className={styles.featureList}>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Criar eventos ilimitados</li>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Dashboard com análises de vendas</li>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Gerenciar tipos de ingressos e preços</li>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Exportar lista de compradores</li>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Relatórios detalhados por evento</li>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Eventos aguardam aprovação admin</li>
                            </ul>
                        </div>

                        {/* Administrador */}
                        <div className={styles.accessCard}>
                            <div className={styles.accessCardHeader}>
                                <div className={`${styles.iconBox} ${styles.iconBoxViolet}`}>
                                    <ShieldCheck size={24} color="#8b5cf6" />
                                </div>
                                <span className={styles.accessCardTitle}>Administrador</span>
                            </div>
                            <p className={styles.accessCardDesc}>
                                Gerencia toda a plataforma e organizadores
                            </p>
                            <ul className={styles.featureList}>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Gerenciar solicitações de organizadores</li>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Aprovar/rejeitar eventos criados</li>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Configurar comissões e taxas</li>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Relatórios globais da plataforma</li>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Tratar disputas de pagamento</li>
                                <li><CheckCircle size={18} className={styles.checkIcon} /> Suspender/reativar organizadores</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.flowSection}>
                    <h2 className={styles.sectionTitleCenter}>Fluxo de Aprovação</h2>
                    <div className={styles.flowSteps}>
                        {[
                            { icon: <Users size={24} color="#3b82f6" />, bg: styles.stepBgBlue, label: 'Usuário Solicita Cadastro',},
                            { icon: <ShieldCheck size={24} color="#8b5cf6" />, bg: styles.stepBgViolet, label: 'Admin aprova Organizador',},
                            { icon: <BookMarked size={24} color="#3b82f6" />, bg: styles.stepBgBlue, label: 'Organizador cria Eventos',},
                            { icon: <ShieldCheck size={24} color="#8b5cf6" />, bg: styles.stepBgViolet, label: 'Admin aprova Eventos',},
                            { icon: <CheckCircle size={24} color="#22c55e" />, bg: styles.stepBgGreen, label: 'Evento visível para Usuários',},
                        ].map((step, i, arr) => (
                            <div key={i} className={styles.flowStepWrapper}>
                                <div className={`${styles.stepBox} ${step.bg}`}>
                                    {step.icon}
                                </div>
                                <span className={styles.stepLabel}>{step.label}</span>
                                {i < arr.length - 1 && (
                                    <span className={styles.arrow}>→</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.metricsGrid}>
                    <div className={styles.metricCard}>
                        <div className={styles.metricHeader}>
                            <span className={styles.metricLabel}>Receita Total</span>
                            <DollarSign size={22} color="#9ca3af" />
                        </div>
                        <span className={styles.metricValue}>R$ 2.450.000</span>
                        <span className={styles.metricSub}>Comissão: R$ 122.500</span>
                    </div>

                    <div className={styles.metricCard}>
                        <div className={styles.metricHeader}>
                            <span className={styles.metricLabel}>Organizadores Ativos</span>
                            <Users size={22} color="#9ca3af" />
                        </div>
                        <span className={styles.metricValue}>45</span>
                        <span className={styles.metricSubOrange}>2 solicitações pendentes</span>
                    </div>

                    <div className={styles.metricCard}>
                        <div className={styles.metricHeader}>
                            <span className={styles.metricLabel}>Total de Eventos</span>
                            <Ticket size={22} color="#9ca3af" />
                        </div>
                        <span className={styles.metricValue}>234</span>
                        <span className={styles.metricSubOrange}>2 aguardando aprovação</span>
                    </div>

                    <div className={styles.metricCard}>
                        <div className={styles.metricHeader}>
                            <span className={styles.metricLabel}>Ingressos Vendidos</span>
                            <TrendingUp size={22} color="#9ca3af" />
                        </div>
                        <span className={styles.metricValue}>87.500</span>
                        <span className={styles.metricSub}>Todas as categorias</span>
                    </div>
                </div>

                <div className={styles.quickActionsSection}>
                    <h2 className={styles.quickActionsTitle}>Ações Rápidas</h2>
                    <p className={styles.quickActionsSubtitle}>
                        Acesso rápido às funções administrativas principais
                    </p>
                    <div className={styles.quickActionsGrid}>
                        <button className={styles.quickActionCard} onClick={() => navigate(PageRoutesName.administrador.getOrganizadores)}>
                            <Users size={28} color="#374151" />
                            <span className={styles.quickActionLabel}>Gerenciar Organizadores</span>
                            <span className={styles.badgeRedSmall}>2 novos</span>
                        </button>
                        <button className={styles.quickActionCard} onClick={() => navigate(PageRoutesName.administrador.approveEvents)}>
                            <CheckCircle size={28} color="#374151" />
                            <span className={styles.quickActionLabel}>Aprovar Eventos</span>
                            <span className={styles.badgeRedSmall}>3 pendentes</span>
                        </button>
                        <button className={styles.quickActionCard} onClick={() => navigate(PageRoutesName.administrador.adminComissoes)}>
                            <Settings size={28} color="#374151" />
                            <span className={styles.quickActionLabel}>Configurar Comissões</span>
                        </button>
                        <button className={styles.quickActionCard} onClick={() => navigate(PageRoutesName.administrador.adminRelatorio)}>
                            <BookMarked size={28} color="#374151" />
                            <span className={styles.quickActionLabel}>Relatórios Globais</span>
                        </button>
                    </div>
                </div>

                <div className={styles.listSection}>
                    <h2 className={styles.listSectionTitle}>
                        <Users size={22} /> Solicitações Pendentes
                    </h2>
                    {[
                        { name: 'Produtora ABC Eventos', email: 'contato@abceventos.com.br' },
                        { name: 'Teatro Nacional', email: 'admin@teatronacional.com' },
                    ].map((item) => (
                        <div key={item.email} className={styles.listItem}>
                            <div>
                                <p className={styles.listItemName}>{item.name}</p>
                                <p className={styles.listItemSub}>{item.email}</p>
                            </div>
                            <button className={styles.analyzeButton} onClick={() => navigate(PageRoutesName.administrador.getOrganizadores)}>
                                Analisar
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.listSection}>
                    <h2 className={styles.listSectionTitle}>
                        <AlertTriangle size={22} color="#d97706" className={styles.warningIcon} />
                        Disputas de Pagamento
                    </h2>
                    <div className={styles.listItemWarning}>
                        <div>
                            <p className={styles.listItemName}>Festival de Música Eletrônica 2025</p>
                            <p className={styles.listItemSub}>João Silva - R$ 150</p>
                        </div>
                        <button className={styles.analyzeButton}>Analisar</button>
                    </div>
                </div>

                <div className={styles.listSection}>
                    <h2 className={styles.listSectionTitle}>
                        <CheckCircle size={22} /> Eventos Aguardando Aprovação
                    </h2>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>EVENTO</th>
                                <th>ORGANIZADOR</th>
                                <th>DATA</th>
                                <th>INGRESSOS</th>
                                <th>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { evento: 'Rock in Rio 2026', categoria: 'Música', organizador: 'Produtora ABC Eventos', data: '14/09/2026', ingressos: '100.000' },
                                { evento: 'Stand-up Comedy Night', categoria: 'Teatro', organizador: 'Teatro Nacional', data: '09/12/2025', ingressos: '500' },
                            ].map((row) => (
                                <tr key={row.evento}>
                                    <td>
                                        <p className={styles.tableEventName}>{row.evento}</p>
                                        <p className={styles.tableEventCat}>{row.categoria}</p>
                                    </td>
                                    <td>{row.organizador}</td>
                                    <td>{row.data}</td>
                                    <td>{row.ingressos}</td>
                                    <td>
                                        <button className={styles.analyzeButton} onClick={() => navigate(PageRoutesName.administrador.approveEvents)}>
                                            Analisar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={styles.listSection}>
                    <h2 className={styles.listSectionTitle}>
                        <TrendingUp size={22} /> Receita por Categoria
                    </h2>
                    {[
                        { label: 'Música', value: 'R$ 980.000', pct: 72, color: '#3b82f6' },
                        { label: 'Teatro', value: 'R$ 735.000', pct: 54, color: '#8b5cf6' },
                        { label: 'Esporte', value: 'R$ 490.000', pct: 36, color: '#22c55e' },
                        { label: 'Conferência', value: 'R$ 245.000', pct: 18, color: '#f59e0b' },
                    ].map((cat) => (
                        <div key={cat.label} className={styles.categoryRow}>
                            <div className={styles.categoryInfo}>
                                <span className={styles.categoryLabel}>{cat.label}</span>
                                <span className={styles.categoryValue}>{cat.value}</span>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${cat.pct}%`, backgroundColor: cat.color }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </>
        </div>
    );
}