import { useState } from 'react';
import {
    Plus,
    Edit,
    Trash2,
    TrendingUp,
    Ticket,
    DollarSign,
    AlertCircle,
    Upload,
    X,
    ShieldCheck,
    UserPlus,
} from 'lucide-react';
import type { Event, TicketType, TicketBatch } from '../../types/Event';
import { notify } from '../../adapters/toastHotAdapter';
import { BatchManager } from '../BatchManager';
import styles from './styles.module.css';

const MOCK_ORGANIZER_EVENTS: Event[] = [
    {
        id: '1',
        title: 'Festival de Música Eletrônica 2025',
        description: 'Os maiores DJs do mundo em um único lugar.',
        date: '2025-12-15',
        time: '20:00',
        location: 'Estádio Nacional, São Paulo',
        price: 150,
        category: 'Música',
        imageUrl: '',
        availableTickets: 450,
        totalTickets: 500,
        status: 'approved',
        ticketTypes: [
            {
                id: '1',
                name: 'Pista',
                price: 150,
                availableTickets: 200,
                description: 'Acesso à área de pista',
            },
            {
                id: '2',
                name: 'Camarote',
                price: 300,
                availableTickets: 150,
                description: 'Acesso ao camarote com open bar',
            },
            {
                id: '3',
                name: 'VIP',
                price: 500,
                availableTickets: 100,
                description: 'Área VIP com acesso exclusivo aos artistas',
            },
        ],
    },
    {
        id: '2',
        title: 'Teatro: O Fantasma da Ópera',
        description: 'O clássico musical da Broadway.',
        date: '2025-11-20',
        time: '19:30',
        location: 'Teatro Municipal, Rio de Janeiro',
        price: 200,
        category: 'Teatro',
        imageUrl: '',
        availableTickets: 80,
        totalTickets: 200,
        status: 'pending',
        ticketTypes: [
            {
                id: '1',
                name: 'Balcão',
                price: 120,
                availableTickets: 30,
                description: 'Assentos no balcão superior',
            },
            {
                id: '2',
                name: 'Plateia',
                price: 200,
                availableTickets: 50,
                description: 'Assentos na plateia central',
            },
        ],
    },
];

interface EventFormData extends Omit<Event, 'id' | 'availableTickets'> {
    ticketTypes?: TicketType[];
}

export function OrganizerDashboard({
    organizationName = 'Minha Organização',
}: {
    organizationName?: string;
}) {
    const [events, setEvents] = useState<Event[]>(MOCK_ORGANIZER_EVENTS);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [currentTab, setCurrentTab] = useState('overview');
    const [managingStaffEvent, setManagingStaffEvent] = useState<Event | null>(
        null
    );

    const approvedEvents = events.filter((e) => e.status === 'approved');
    const pendingEvents = events.filter((e) => e.status === 'pending');

    const totalRevenue = approvedEvents.reduce(
        (acc, e) => acc + (e.totalTickets - e.availableTickets) * e.price,
        0
    );
    const totalTicketsSold = approvedEvents.reduce(
        (acc, e) => acc + (e.totalTickets - e.availableTickets),
        0
    );
    const totalTicketsAvailable = approvedEvents.reduce(
        (acc, e) => acc + e.totalTickets,
        0
    );
    const occupancyRate =
        totalTicketsAvailable > 0
            ? Math.round((totalTicketsSold / totalTicketsAvailable) * 100)
            : 0;

    const platformFee = totalRevenue * 0.05;
    const netRevenue = totalRevenue - platformFee;

    const handleDeleteEvent = (eventId: string) => {
        if (confirm('Tem certeza que deseja excluir este evento?')) {
            setEvents(events.filter((e) => e.id !== eventId));
        }
    };


    return (
        <div className={styles.pageContainer}>
            {/* Header do Dashboard */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.pageTitle}>
                        Dashboard do Organizador
                    </h1>
                    <p className={styles.pageSubtitle}>{organizationName}</p>
                </div>

                <button
                    className={styles.primaryButton}
                    onClick={() => setIsCreateDialogOpen(true)}
                >
                    <Plus size={20} />
                    Criar Evento
                </button>
            </div>

            {/* Alerta de Eventos Pendentes */}
            {pendingEvents.length > 0 && (
                <div className={styles.alertBox}>
                    <AlertCircle size={20} className={styles.alertIcon} />
                    <span>
                        Você tem {pendingEvents.length} evento(s) aguardando
                        aprovação dos administradores
                    </span>
                </div>
            )}

            {/* Navegação por Abas (Tabs) */}
            <div className={styles.tabsList}>
                <button
                    className={`${styles.tabTrigger} ${currentTab === 'overview' ? styles.tabActive : ''}`}
                    onClick={() => setCurrentTab('overview')}
                >
                    Visão Geral
                </button>
                <button
                    className={`${styles.tabTrigger} ${currentTab === 'approved' ? styles.tabActive : ''}`}
                    onClick={() => setCurrentTab('approved')}
                >
                    Eventos Aprovados ({approvedEvents.length})
                </button>
                <button
                    className={`${styles.tabTrigger} ${currentTab === 'pending' ? styles.tabActive : ''}`}
                    onClick={() => setCurrentTab('pending')}
                >
                    Aguardando Aprovação ({pendingEvents.length})
                </button>
            </div>

            {/* CONTEÚDO DAS ABAS */}
            <div className={styles.tabContent}>
                {/* ABA: VISÃO GERAL */}
                {currentTab === 'overview' && (
                    <div className={styles.overviewLayout}>
                        {/* Cards de Estatísticas */}
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <div className={styles.statHeader}>
                                    <span className={styles.statTitle}>
                                        Receita Total
                                    </span>
                                    <DollarSign
                                        size={20}
                                        className={styles.statIcon}
                                    />
                                </div>
                                <div className={styles.statValue}>
                                    R$ {totalRevenue.toLocaleString('pt-BR')}
                                </div>
                                <div className={styles.statSubtextSuccess}>
                                    Líquido: R${' '}
                                    {netRevenue.toLocaleString('pt-BR')}
                                </div>
                            </div>

                            <div className={styles.statCard}>
                                <div className={styles.statHeader}>
                                    <span className={styles.statTitle}>
                                        Ingressos Vendidos
                                    </span>
                                    <Ticket
                                        size={20}
                                        className={styles.statIcon}
                                    />
                                </div>
                                <div className={styles.statValue}>
                                    {totalTicketsSold}
                                </div>
                                <div className={styles.statSubtext}>
                                    de {totalTicketsAvailable} disponíveis
                                </div>
                            </div>

                            <div className={styles.statCard}>
                                <div className={styles.statHeader}>
                                    <span className={styles.statTitle}>
                                        Taxa de Ocupação
                                    </span>
                                    <TrendingUp
                                        size={20}
                                        className={styles.statIcon}
                                    />
                                </div>
                                <div className={styles.statValue}>
                                    {occupancyRate}%
                                </div>
                                <div className={styles.progressBarBg}>
                                    <div
                                        className={styles.progressBarFill}
                                        style={{
                                            width: `${occupancyRate}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className={styles.statCard}>
                                <div className={styles.statHeader}>
                                    <span className={styles.statTitle}>
                                        Taxa da Plataforma
                                    </span>
                                    <DollarSign
                                        size={20}
                                        className={styles.statIcon}
                                    />
                                </div>
                                <div className={styles.statValue}>
                                    R$ {platformFee.toLocaleString('pt-BR')}
                                </div>
                                <div className={styles.statSubtext}>
                                    5% sobre vendas
                                </div>
                            </div>
                        </div>

                        {/* Tabela de Eventos Recentes */}
                        <div className={styles.sectionCard}>
                            <h2 className={styles.sectionTitle}>
                                Eventos Recentes
                            </h2>
                            <EventsTable
                                events={events.slice(0, 5)}
                                onEdit={setEditingEvent}
                                onDelete={handleDeleteEvent}
                                onManageStaff={setManagingStaffEvent}
                            />
                        </div>
                    </div>
                )}

                {/* ABA: APROVADOS */}
                {currentTab === 'approved' && (
                    <div className={styles.sectionCard}>
                        <EventsTable
                            events={approvedEvents}
                            onEdit={setEditingEvent}
                            onDelete={handleDeleteEvent}
                            onManageStaff={setManagingStaffEvent}
                        />
                    </div>
                )}

                {/* ABA: PENDENTES */}
                {currentTab === 'pending' && (
                    <div className={styles.sectionCard}>
                        {pendingEvents.length === 0 ? (
                            <div className={styles.emptyState}>
                                Nenhum evento aguardando aprovação
                            </div>
                        ) : (
                            <EventsTable
                                events={pendingEvents}
                                onEdit={setEditingEvent}
                                onDelete={handleDeleteEvent}
                                onManageStaff={setManagingStaffEvent}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Modais de Criação e Edição */}
            {isCreateDialogOpen && (
                <Modal
                    isOpen={isCreateDialogOpen}
                    onClose={() => setIsCreateDialogOpen(false)}
                    title="Criar Novo Evento"
                    description="Seu evento será enviado para aprovação dos administradores antes de ficar visível na plataforma."
                >
                    <EventFormDialog
                        onClose={() => setIsCreateDialogOpen(false)}
                        onSave={(eventData) => {
                            const newEvent: Event = {
                                ...eventData,
                                id: Date.now().toString(),
                                availableTickets: eventData.totalTickets,
                                status: 'pending',
                            };
                            setEvents([newEvent, ...events]);
                            setIsCreateDialogOpen(false);
                        }}
                    />
                </Modal>
            )}

            {editingEvent && (
                <Modal
                    isOpen={!!editingEvent}
                    onClose={() => setEditingEvent(null)}
                    title="Editar Evento"
                    description="Suas alterações serão salvas imediatamente."
                >
                    <EventFormDialog
                        event={editingEvent}
                        onClose={() => setEditingEvent(null)}
                        onSave={(eventData) => {
                            setEvents(
                                events.map((e) =>
                                    e.id === editingEvent.id
                                        ? {
                                              ...eventData,
                                              id: e.id,
                                              availableTickets:
                                                  e.availableTickets,
                                              status: e.status,
                                          }
                                        : e
                                )
                            );
                            setEditingEvent(null);
                        }}
                    />
                </Modal>
            )}

            {/* Modal de Gerenciamento de Staff */}
            {managingStaffEvent && (
                <Modal
                    isOpen={!!managingStaffEvent}
                    onClose={() => setManagingStaffEvent(null)}
                    title={`Gerenciar Equipe: ${managingStaffEvent.title}`}
                    description="Adicione ou remova membros da equipe responsáveis pelo check-in e suporte no evento."
                >
                    <StaffManagementDialog
                        event={managingStaffEvent}
                        onClose={() => setManagingStaffEvent(null)}
                    />
                </Modal>
            )}
        </div>
    );
}

// --- Componente: Tabela de Eventos ---
function EventsTable({
    events,
    onEdit,
    onDelete,
    onManageStaff,
}: {
    events: Event[];
    onEdit: (event: Event) => void;
    onDelete: (eventId: string) => void;
    onManageStaff: (event: Event) => void;
}) {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Evento</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Vendidos / Total</th>
                        <th>Receita</th>
                        <th className={styles.textRight}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => {
                        const ticketsSold =
                            event.totalTickets - event.availableTickets;
                        const revenue = ticketsSold * event.price;

                        return (
                            <tr key={event.id}>
                                <td>
                                    <div className={styles.tableEventTitle}>
                                        {event.title}
                                    </div>
                                    <div className={styles.tableEventSub}>
                                        {event.location}
                                    </div>
                                </td>
                                <td className={styles.tableDate}>
                                    {new Date(event.date).toLocaleDateString(
                                        'pt-BR'
                                    )}
                                </td>
                                <td>
                                    <span
                                        className={`${styles.badge} ${event.status === 'approved' ? styles.badgeSuccess : styles.badgeWarning}`}
                                    >
                                        {event.status === 'approved'
                                            ? 'Aprovado'
                                            : 'Pendente'}
                                    </span>
                                </td>
                                <td className={styles.tableStats}>
                                    {ticketsSold} / {event.totalTickets}
                                </td>
                                <td className={styles.tableRevenue}>
                                    R$ {revenue.toLocaleString('pt-BR')}
                                </td>
                                <td>
                                    <div className={styles.actionButtons}>
                                        <button
                                            className={styles.iconBtn}
                                            onClick={() => onEdit(event)}
                                            title="Editar"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        {event.status === 'approved' && (
                                            <button
                                                className={styles.iconBtn}
                                                onClick={() =>
                                                    onManageStaff &&
                                                    onManageStaff(event)
                                                }
                                                title="Equipe Staff"
                                            >
                                                <ShieldCheck size={18} />
                                            </button>
                                        )}
                                        <button
                                            className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                                            onClick={() => onDelete(event.id)}
                                            title="Excluir"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

// --- Componente: Modal Customizado ---
// 👇 Adicionado as tipagens corretas (removido o type 'any')
function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    if (!isOpen) return null;
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.modalHeader}>
                    <div>
                        <h2 className={styles.modalTitle}>{title}</h2>
                        <p className={styles.modalDescription}>{description}</p>
                    </div>
                    <button className={styles.modalCloseBtn} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <div className={styles.modalBody}>{children}</div>
            </div>
        </div>
    );
}

// --- Componente: Formulário de Evento ---
// --- Componente: Formulário de Evento ---
// --- Componente: Formulário de Evento ---
function EventFormDialog({
    event,
    onClose,
    onSave,
}: {
    event?: Event;
    onClose: () => void;
    onSave: (event: EventFormData) => void;
}) {
    const [formData, setFormData] = useState<EventFormData>(
        event || {
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            price: 0,
            category: 'Música',
            imageUrl: '',
            totalTickets: 0,
            ticketTypes: [],
        }
    );

    const [ticketTypes, setTicketTypes] = useState<TicketType[]>(
        event?.ticketTypes || []
    );
    const [allowHalfPrice, setAllowHalfPrice] = useState(false);
    const [cardBannerPreview, setCardBannerPreview] = useState<string>(
        event?.imageUrl || ''
    );

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setPreview: (url: string) => void
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPreview(result);
                setFormData({ ...formData, imageUrl: result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let finalData = { ...formData };

        if (ticketTypes.length > 0) {
            const minPrice = Math.min(...ticketTypes.map((t) => t.price));
            finalData = {
                ...formData,
                price: minPrice,
                ticketTypes: ticketTypes.map((tt) => ({
                    ...tt,
                    allowHalfPrice,
                })),
            };
        }
        onSave(finalData);
    };

    const handleAddTicketType = () => {
        const newTicketType: TicketType = {
            id: Date.now().toString(),
            name: '',
            price: 0,
            availableTickets: 0,
            description: '',
            batches: [], // Inicializa com lotes vazios
        };
        setTicketTypes([...ticketTypes, newTicketType]);
    };

    // Aqui usamos 'any' no valor ou uma união de tipos para aceitar o array de lotes
    const handleTicketTypeChange = (
        id: string,
        field: keyof TicketType,
        value: string | number | boolean | TicketBatch[]
    ) => {
        setTicketTypes(
            ticketTypes.map((t) => (t.id === id ? { ...t, [field]: value } : t))
        );
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formLayout}>
            <div className={styles.inputGroupFull}>
                <label className={styles.label}>Título do Evento</label>
                <input
                    className={styles.input}
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                    required
                />
            </div>

            <div className={styles.inputGroupFull}>
                <label className={styles.label}>Descrição</label>
                <textarea
                    className={styles.textarea}
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                    rows={3}
                    required
                />
            </div>

            <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Data</label>
                    <input
                        type="date"
                        className={styles.input}
                        value={formData.date}
                        onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                        }
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Horário</label>
                    <input
                        type="time"
                        className={styles.input}
                        value={formData.time}
                        onChange={(e) =>
                            setFormData({ ...formData, time: e.target.value })
                        }
                        required
                    />
                </div>
            </div>

            <div className={styles.inputGroupFull}>
                <label className={styles.label}>Local</label>
                <input
                    className={styles.input}
                    value={formData.location}
                    onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                    }
                    required
                />
            </div>

            <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Categoria</label>
                    <select
                        className={styles.select}
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                category: e.target.value,
                            })
                        }
                    >
                        <option value="Música">Música</option>
                        <option value="Teatro">Teatro</option>
                        <option value="Esporte">Esporte</option>
                        <option value="Conferência">Conferência</option>
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Total de Ingressos</label>
                    <input
                        type="number"
                        className={styles.input}
                        value={formData.totalTickets}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                totalTickets: parseInt(e.target.value) || 0,
                            })
                        }
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Preço Base (R$)</label>
                    <input
                        type="number"
                        className={styles.input}
                        value={formData.price}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                price: parseFloat(e.target.value) || 0,
                            })
                        }
                        required
                    />
                </div>
            </div>

            <div className={styles.divider}>
                <label className={styles.labelSection}>Banner do Evento</label>
                <div className={styles.bannerGrid}>
                    <div className={styles.bannerUploadBox}>
                        {cardBannerPreview ? (
                            <div className={styles.bannerPreview}>
                                <img src={cardBannerPreview} alt="Preview" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCardBannerPreview('');
                                        setFormData({
                                            ...formData,
                                            imageUrl: '',
                                        });
                                    }}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <label className={styles.uploadLabel}>
                                <Upload size={24} />
                                <span>Upload do Banner</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className={styles.hiddenInput}
                                    onChange={(e) =>
                                        handleImageChange(
                                            e,
                                            setCardBannerPreview
                                        )
                                    }
                                />
                            </label>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.divider}>
                <div className={styles.sectionHeader}>
                    <div>
                        <label className={styles.labelSection}>
                            Tipos de Ingressos e Lotes
                        </label>
                        <p className={styles.subText}>
                            Configure as categorias (Pista, VIP) e seus
                            respectivos lotes progressivos.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleAddTicketType}
                        className={styles.secondaryButton}
                    >
                        <Plus size={16} /> Adicionar Tipo
                    </button>
                </div>

                <div className={styles.ticketTypesList}>
                    {ticketTypes.map((ticketType, index) => (
                        <div
                            key={ticketType.id}
                            className={styles.ticketTypeCard}
                        >
                            <div className={styles.ticketHeader}>
                                <span>Tipo {index + 1}</span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setTicketTypes(
                                            ticketTypes.filter(
                                                (t) => t.id !== ticketType.id
                                            )
                                        )
                                    }
                                    className={styles.textDanger}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className={styles.inputRow}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Nome</label>
                                    <input
                                        className={styles.input}
                                        value={ticketType.name}
                                        onChange={(e) =>
                                            handleTicketTypeChange(
                                                ticketType.id,
                                                'name',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Ex: Pista, VIP"
                                        required
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>
                                        Preço Inicial (R$)
                                    </label>
                                    <input
                                        type="number"
                                        className={styles.input}
                                        value={ticketType.price}
                                        onChange={(e) =>
                                            handleTicketTypeChange(
                                                ticketType.id,
                                                'price',
                                                parseFloat(e.target.value) || 0
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>
                                        Ingressos Disponíveis
                                    </label>
                                    <input
                                        type="number"
                                        className={styles.input}
                                        value={ticketType.availableTickets}
                                        onChange={(e) =>
                                            handleTicketTypeChange(
                                                ticketType.id,
                                                'availableTickets',
                                                parseInt(e.target.value) || 0
                                            )
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            {/* 👇 AQUI ESTÁ O BATCH MANAGER INSERIDO 👇 */}
                            <div
                                style={{
                                    marginTop: '1.5rem',
                                    borderTop: '1px solid #e5e7eb',
                                    paddingTop: '1rem',
                                }}
                            >
                                <BatchManager
                                    ticketTypeId={ticketType.id}
                                    batches={ticketType.batches || []}
                                    onBatchesChange={(batches) =>
                                        handleTicketTypeChange(
                                            ticketType.id,
                                            'batches',
                                            batches
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.divider}>
                <div className={styles.checkboxRow}>
                    <input
                        type="checkbox"
                        id="allowHalfPrice"
                        checked={allowHalfPrice}
                        onChange={(e) => setAllowHalfPrice(e.target.checked)}
                        className={styles.checkbox}
                    />
                    <label
                        htmlFor="allowHalfPrice"
                        className={styles.label}
                        style={{ cursor: 'pointer', margin: 0 }}
                    >
                        Permitir compra de meia-entrada (50% do valor)
                    </label>
                </div>
                <p
                    className={styles.subText}
                    style={{ marginLeft: '2rem', marginTop: '0.25rem' }}
                >
                    Estudantes, idosos e PCDs poderão comprar ingressos com
                    desconto.
                </p>
            </div>

            <div className={styles.formFooter}>
                <button
                    type="button"
                    onClick={onClose}
                    className={styles.cancelButton}
                >
                    Cancelar
                </button>
                <button type="submit" className={styles.submitButton}>
                    {event ? 'Salvar' : 'Criar Evento'}
                </button>
            </div>
        </form>
    );
}

// --- Componente: Gerenciamento de Staff ---
function StaffManagementDialog({
    event,
    onClose,
}: {
    event: Event;
    onClose: () => void;
}) {
    // Estado para controlar se estamos listando ou cadastrando
    const [view, setView] = useState<'list' | 'add'>('list');

    // Mock de staff
    const [staffList, setStaffList] = useState([
        {
            id: 's1',
            name: 'João Silva',
            email: 'joao@email.com',
            cpf: '123.456.789-00',
            tel: '(71) 98888-7777',
        },
        {
            id: 's2',
            name: 'Maria Souza',
            email: 'maria@email.com',
            cpf: '987.654.321-11',
            tel: '(71) 99999-0000',
        },
    ]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        tel: '',
        password: '',
    });

    const handleAddStaff = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock add
        const newMember = {
            id: Date.now().toString(),
            ...formData,
        };
        setStaffList([...staffList, newMember]);
        setFormData({ name: '', email: '', cpf: '', tel: '', password: '' });
        setView('list');
        notify.success('Staff cadastrado e vinculado ao evento!');
    };

    const handleRemoveStaff = (id: string) => {
        if (confirm('Deseja remover este membro da equipe do evento?')) {
            setStaffList(staffList.filter((s) => s.id !== id));
        }
    };

    return (
        <div className={styles.staffDialogLayout} data-event-id={event.id}>
            {view === 'list' ? (
                <div className={styles.staffListContainer}>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.labelSection}>
                            Membros da Equipe ({staffList.length})
                        </h3>
                        <button
                            onClick={() => setView('add')}
                            className={styles.secondaryButton}
                        >
                            <UserPlus size={18} /> Cadastrar Novo
                        </button>
                    </div>

                    {staffList.length === 0 ? (
                        <div className={styles.emptyStateSmall}>
                            Nenhum membro da equipe cadastrado para este evento.
                        </div>
                    ) : (
                        <div className={styles.staffGrid}>
                            {staffList.map((member) => (
                                <div
                                    key={member.id}
                                    className={styles.staffMemberCard}
                                >
                                    <div className={styles.staffMemberInfo}>
                                        <div className={styles.staffMemberName}>
                                            {member.name}
                                        </div>
                                        <div className={styles.staffMemberDetail}>
                                            {member.email} • {member.cpf}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleRemoveStaff(member.id)
                                        }
                                        className={styles.staffRemoveBtn}
                                        title="Remover da equipe"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className={styles.formFooter}>
                        <button
                            onClick={onClose}
                            className={styles.primaryButton}
                        >
                            Concluir
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleAddStaff} className={styles.formLayout}>
                    <div className={styles.inputGroupFull}>
                        <label className={styles.label}>Nome Completo</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>E-mail</label>
                            <input
                                type="email"
                                className={styles.input}
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Telefone</label>
                            <input
                                type="tel"
                                className={styles.input}
                                value={formData.tel}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        tel: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>CPF</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={formData.cpf}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        cpf: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Senha Temporária</label>
                            <input
                                type="password"
                                className={styles.input}
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formFooter}>
                        <button
                            type="button"
                            onClick={() => setView('list')}
                            className={styles.cancelButton}
                        >
                            Voltar para Lista
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            Cadastrar e Vincular
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
