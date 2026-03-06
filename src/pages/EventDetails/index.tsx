import { useState, useMemo } from 'react';
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    Plus,
    Minus,
    ShieldCheck,
    ArrowLeft,
    AlertCircle, // Ícone para o erro
} from 'lucide-react';
import type { Event, TicketType } from '../../types/Event';
import styles from './styles.module.css';
import { DefaultLayout } from '../../layouts/DefaultLayout';
import { Modal } from './Modal'; // Importando o modal que criamos

interface EventDetailsProps {
    event: Event;
    onBuyTickets: (
        event: Event,
        quantity: number,
        ticketType?: TicketType
    ) => void;
    onBack: () => void;
}

export default function EventDetails({
    event,
    onBuyTickets,
    onBack,
}: EventDetailsProps) {
    const [quantity, setQuantity] = useState(1);
    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<
        TicketType | undefined
    >(event?.ticketTypes?.[0]);

    const stats = useMemo(() => {
        if (!event) return { subtotal: 0, fee: 0, total: 0, percent: 0 };
        const basePrice = selectedTicket?.price ?? event.price;
        const subtotal = basePrice * quantity;
        const fee = subtotal * 0.1;
        const percent = (event.availableTickets / event.totalTickets) * 100;
        return { subtotal, fee, total: subtotal + fee, percent };
    }, [selectedTicket, quantity, event]);

    // Função de incremento com a lógica do Modal
    const handleIncrement = () => {
        if (quantity >= 5) {
            setIsLimitModalOpen(true);
        } else {
            setQuantity(prev => prev + 1);
        }
    };

    const handleDecrement = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    if (!event) return null;

    return (
        <DefaultLayout>
            <div className={styles.pageBackground}>
                <div className={styles.container}>
                    {/* Botão Voltar */}
                    <button onClick={onBack} className={styles.backButton}>
                        <ArrowLeft size={24} className={styles.backIcon} />
                        Voltar
                    </button>

                    <div className={styles.mainGrid}>
                        {/* --- ESQUERDA --- */}
                        <div className={styles.leftColumn}>
                            {event.imageUrl && (
                                <div className={styles.imageContainer}>
                                    <img
                                        src={event.imageUrl}
                                        className={styles.eventImage}
                                        alt={event.title}
                                    />
                                </div>
                            )}

                            <header className={styles.headerSection}>
                                <span className={styles.categoryBadge}>
                                    {event.category}
                                </span>
                                <h1 className={styles.eventTitle}>
                                    {event.title}
                                </h1>
                                <p className={styles.eventDescription}>
                                    {event.description}
                                </p>
                            </header>

                            <div className={styles.sectionCard}>
                                <h2 className={styles.sectionTitle}>
                                    Informações do Evento
                                </h2>
                                <div className={styles.infoGrid}>
                                    <div className={styles.infoItem}>
                                        <div className={styles.iconBox}>
                                            <Calendar className={styles.iconElement} />
                                        </div>
                                        <div className={styles.infoTextContainer}>
                                            <div className={styles.infoLabel}>Data</div>
                                            <div className={styles.infoValue}>
                                                {new Date(event.date).toLocaleDateString('pt-BR')}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <div className={styles.iconBox}>
                                            <Clock className={styles.iconElement} />
                                        </div>
                                        <div className={styles.infoTextContainer}>
                                            <div className={styles.infoLabel}>Horário</div>
                                            <div className={styles.infoValue}>{event.time}</div>
                                        </div>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <div className={styles.iconBox}>
                                            <MapPin className={styles.iconElement} />
                                        </div>
                                        <div className={styles.infoTextContainer}>
                                            <div className={styles.infoLabel}>Local</div>
                                            <div className={styles.infoValue}>{event.location}</div>
                                        </div>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <div className={styles.iconBox}>
                                            <Users className={styles.iconElement} />
                                        </div>
                                        <div className={styles.infoTextContainer}>
                                            <div className={styles.infoLabel}>Disponibilidade</div>
                                            <div className={styles.infoValue}>
                                                {event.availableTickets} ingressos disponíveis
                                            </div>
                                            <div className={styles.progressBackground}>
                                                <div
                                                    className={styles.progressFill}
                                                    style={{ width: `${stats.percent}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- DIREITA --- */}
                        <aside className={styles.rightColumn}>
                            <div className={styles.purchaseCard}>
                                {event.ticketTypes && event.ticketTypes.length > 0 && (
                                    <div className={styles.ticketSelection}>
                                        <label className={styles.inputLabel}>Tipo de Ingresso</label>
                                        <div className={styles.radioGroup}>
                                            {event.ticketTypes.map((t) => {
                                                const isSelected = selectedTicket?.id === t.id;
                                                return (
                                                    <div
                                                        key={t.id}
                                                        className={`${styles.radioBox} ${isSelected ? styles.radioBoxSelected : ''}`}
                                                        onClick={() => setSelectedTicket(t)}
                                                    >
                                                        <div className={styles.radioBoxContent}>
                                                            <div className={styles.radioBoxTitle}>{t.name}</div>
                                                            <div className={styles.radioBoxDesc}>{t.description}</div>
                                                        </div>
                                                        <div className={styles.radioBoxPrice}>
                                                            R$ {t.price.toFixed(2)}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                <div className={styles.checkoutSection}>
                                    <div>
                                        <label className={styles.inputLabel}>Quantidade</label>
                                        <div className={styles.quantityControls}>
                                            <button
                                                className={styles.quantityBtn}
                                                onClick={handleDecrement}
                                            >
                                                <Minus size={24} />
                                            </button>
                                            <span className={styles.quantityValue}>{quantity}</span>
                                            <button
                                                className={styles.quantityBtn}
                                                onClick={handleIncrement}
                                            >
                                                <Plus size={24} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.summaryBox}>
                                        <div className={styles.summaryRow}>
                                            <span>Subtotal</span>
                                            <span>R$ {stats.subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className={styles.summaryRow}>
                                            <span>Taxa de serviço</span>
                                            <span>R$ {stats.fee.toFixed(2)}</span>
                                        </div>
                                        <div className={styles.grandTotalRow}>
                                            <span>Total</span>
                                            <span>R$ {stats.total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button
                                        className={styles.buyButton}
                                        onClick={() => onBuyTickets(event, quantity, selectedTicket)}
                                        disabled={event.availableTickets === 0}
                                    >
                                        {event.availableTickets === 0 ? 'Esgotado' : 'Comprar Ingressos'}
                                    </button>

                                    <div className={styles.securitySeal}>
                                        <ShieldCheck size={24} className={styles.securityIcon} />
                                        <span>Compra Segura</span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            {/* Modal de Alerta de Limite */}
            <Modal
                isOpen={isLimitModalOpen}
                onClose={() => setIsLimitModalOpen(false)}
                title="Limite Excedido"
            >
                <AlertCircle size={48} className={styles.modalErrorIcon} />
                <p style={{ color: '#4b5563', lineHeight: '1.5', fontSize: '1.8rem' }}>
                    Só é possível selecionar até <strong>5 ingressos por CPF</strong> para este evento.
                </p>
            </Modal>
        </DefaultLayout>
    );
}