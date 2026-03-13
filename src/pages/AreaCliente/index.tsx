import {
    ArrowLeft,
    Ticket,
    History,
    Filter,
    Download,
    Calendar,
    CreditCard,
    Clock,
    MapPin,
    QrCode,
} from 'lucide-react';
import { useState } from 'react';
import styles from './style.module.css';
import { useNavigate } from 'react-router';

export function AreaClientePage() {
    const [activeTab, setActiveTab] = useState<'tickets' | 'history'>(
        'history'
    );
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            {/* Botão Voltar */}
            <button onClick={() => navigate('/')} className={styles.backButton}>
                <ArrowLeft size={16} />
                Voltar
            </button>

            {/* Título */}
            <h1 className={styles.pageTitle}>Área do Cliente</h1>

            {/* Abas (Tabs) */}
            <div className={styles.tabsContainer}>
                <button
                    onClick={() => setActiveTab('tickets')}
                    className={`${styles.tab} ${activeTab === 'tickets' ? styles.activeTab : ''}`}
                >
                    <Ticket size={18} />
                    Meus Ingressos
                    <span
                        className={`${styles.badgeCount} ${activeTab === 'tickets' ? styles.badgeActive : styles.badgeInactive}`}
                    >
                        1
                    </span>
                </button>

                <button
                    onClick={() => setActiveTab('history')}
                    className={`${styles.tab} ${activeTab === 'history' ? styles.activeTab : ''}`}
                >
                    <History size={18} />
                    Histórico de Compras
                </button>
            </div>

            {/* Conteúdo da aba Histórico de Compras */}
            {activeTab === 'history' && (
                <>
                    {/* Subtítulo */}
                    <p className={styles.subtitle}>
                        Acompanhe todas as suas compras e reembolsos
                    </p>

                    {/* Seção de Filtros */}
                    <div className={styles.filtersCard}>
                        <div className={styles.filtersHeader}>
                            <Filter size={18} />
                            <strong>Filtros</strong>
                        </div>

                        <div className={styles.filtersRow}>
                            <div className={styles.inputGroup}>
                                <label>Status</label>
                                <select className={styles.selectInput}>
                                    <option>Todos</option>
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Forma de Pagamento</label>
                                <select className={styles.selectInput}>
                                    <option>Todos</option>
                                </select>
                            </div>

                            <button className={styles.exportButton}>
                                <Download size={16} />
                                Exportar
                            </button>
                        </div>
                    </div>

                    <div className={styles.historyCard}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.eventTitle}>
                                Festival de Música Eletrônica 2025
                            </h2>
                            <span className={styles.statusBadgeGreen}>
                                Confirmado
                            </span>
                        </div>

                        <div className={styles.eventInfo}>
                            <Calendar size={16} />
                            <span>14/12/2025</span>
                            <span className={styles.location}>
                                Estádio Nacional, São Paulo
                            </span>
                        </div>

                        <div className={styles.detailsGrid}>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>
                                    ID da Compra
                                </span>
                                <span className={styles.detailValue}>
                                    PUR-001
                                </span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>
                                    Data da Compra
                                </span>
                                <span className={styles.detailValue}>
                                    09/11/2025
                                </span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>
                                    Tipo de Ingresso
                                </span>
                                <span className={styles.detailValue}>
                                    Pista - Inteira
                                </span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>
                                    Quantidade
                                </span>
                                <span className={styles.detailValue}>
                                    2 ingresso(s)
                                </span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>
                                    Valor Unitário
                                </span>
                                <span className={styles.detailValue}>
                                    R$ 150,00
                                </span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>
                                    Valor Total
                                </span>
                                <span className={styles.detailValue}>
                                    R$ 300,00
                                </span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>
                                    Forma de Pagamento
                                </span>
                                <span className={styles.detailValueWithIcon}>
                                    <CreditCard size={16} /> Cartão de Crédito
                                </span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>
                                    Ingressos Utilizados
                                </span>
                                <span
                                    className={
                                        styles.detailValueWithIconWarning
                                    }
                                >
                                    <Clock size={16} /> Não utilizado
                                </span>
                            </div>
                        </div>

                        <div className={styles.cardActions}>
                            <button className={styles.outlineButton}>
                                Ver Ingressos
                            </button>
                            <button className={styles.outlineButton}>
                                <Download size={16} />
                                Baixar Comprovante
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Conteúdo da aba Meus Ingressos */}
            {activeTab === 'tickets' && (
                <div className={styles.ticketCard}>
                    {/* Cabeçalho do card */}
                    <div className={styles.ticketCardHeader}>
                        <span className={styles.statusBadgeNext}>Próximo</span>
                        <span className={styles.orderId}>Pedido #000001</span>
                    </div>

                    {/* Nome e categoria do evento */}
                    <h2 className={styles.eventTitle}>
                        Conferência Tech Brasil 2025
                    </h2>
                    <div className={styles.eventTags}>
                        <span className={styles.categoryTag}>Tecnologia</span>
                        <span className={styles.vipTag}>VIP</span>
                    </div>

                    {/* Informações: Data, Local, Ingressos */}
                    <div className={styles.ticketInfoGrid}>
                        <div className={styles.ticketInfoItem}>
                            <Calendar size={18} className={styles.infoIcon} />
                            <span className={styles.infoLabel}>Data</span>
                            <span className={styles.infoValue}>19/03/2026</span>
                            <span className={styles.infoSubValue}>09:00</span>
                        </div>

                        <div className={styles.ticketInfoItem}>
                            <MapPin size={18} className={styles.infoIcon} />
                            <span className={styles.infoLabel}>Local</span>
                            <span className={styles.infoValue}>
                                Centro de Convenções, Brasília
                            </span>
                        </div>

                        <div className={styles.ticketInfoItem}>
                            <QrCode size={18} className={styles.infoIcon} />
                            <span className={styles.infoLabel}>Ingressos</span>
                            <span className={styles.infoValue}>
                                1x Ingresso(s)
                            </span>
                            <span className={styles.infoSubValue}>
                                R$ 350,00
                            </span>
                        </div>
                    </div>

                    {/* QR Code */}
                    <div className={styles.qrCodeSection}>
                        <div className={styles.qrCodeBox}>
                            <QrCode size={64} color="#aaa" />
                        </div>
                        <div className={styles.qrCodeInfo}>
                            <strong>QR Code de Acesso</strong>
                            <p>
                                Apresente este QR Code na entrada do evento para
                                validar seu ingresso.
                            </p>
                        </div>
                    </div>

                    {/* Ações */}
                    <div className={styles.cardActions}>
                        <button className={styles.outlineButton}>
                            <Download size={16} />
                            Baixar Ingresso
                        </button>
                        <button className={styles.outlineButton}>
                            <QrCode size={16} />
                            Ver QR Code
                        </button>
                        <button className={styles.outlineButton}>
                            Ver Detalhes
                        </button>
                        <button className={styles.refundButton}>
                            Solicitar Reembolso
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
