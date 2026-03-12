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
} from 'lucide-react';
import type { Event, TicketType } from '../../types/Event';
import styles from './styles.module.css'; // Importação do CSS Module

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

    if (!event) return null;

    return (
        <div className={styles.pageBackground}>
            <div className={styles.container}>
                {/* Botão Voltar */}
                <button onClick={onBack} className={styles.backButton}>
                    <ArrowLeft size={24} className={styles.backIcon} />
                    Voltar
                </button>

                <div className={styles.mainGrid}>
                    {/* --- ESQUERDA (Detalhes do Evento) --- */}
                    <div className={styles.leftColumn}>
                        {/* Imagem do Evento */}
                        {event.imageUrl && (
                            <div className={styles.imageContainer}>
                                <img
                                    src={event.imageUrl}
                                    className={styles.eventImage}
                                    alt={event.title}
                                />
                            </div>
                        )}

                        {/* Cabeçalho: Título e Categoria */}
                        <header className={styles.headerSection}>
                            <span className={styles.categoryBadge}>
                                {event.category}
                            </span>
                            <h1 className={styles.eventTitle}>{event.title}</h1>
                            <p className={styles.eventDescription}>
                                {event.description}
                            </p>
                        </header>

                        {/* Card: Informações do Evento */}
                        <div className={styles.sectionCard}>
                            <h2 className={styles.sectionTitle}>
                                Informações do Evento
                            </h2>

                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <div className={styles.iconBox}>
                                        <Calendar
                                            className={styles.iconElement}
                                        />
                                    </div>
                                    <div className={styles.infoTextContainer}>
                                        <div className={styles.infoLabel}>
                                            Data
                                        </div>
                                        <div className={styles.infoValue}>
                                            {new Date(
                                                event.date
                                            ).toLocaleDateString('pt-BR')}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.iconBox}>
                                        <Clock className={styles.iconElement} />
                                    </div>
                                    <div className={styles.infoTextContainer}>
                                        <div className={styles.infoLabel}>
                                            Horário
                                        </div>
                                        <div className={styles.infoValue}>
                                            {event.time}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.iconBox}>
                                        <MapPin
                                            className={styles.iconElement}
                                        />
                                    </div>
                                    <div className={styles.infoTextContainer}>
                                        <div className={styles.infoLabel}>
                                            Local
                                        </div>
                                        <div className={styles.infoValue}>
                                            {event.location}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.iconBox}>
                                        <Users className={styles.iconElement} />
                                    </div>
                                    <div className={styles.infoTextContainer}>
                                        <div className={styles.infoLabel}>
                                            Disponibilidade
                                        </div>
                                        <div className={styles.infoValue}>
                                            {event.availableTickets} ingressos
                                            disponíveis
                                        </div>

                                        {/* Barra de Progresso */}
                                        <div
                                            className={
                                                styles.progressBackground
                                            }
                                        >
                                            <div
                                                className={styles.progressFill}
                                                style={{
                                                    width: `${stats.percent}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card: Sobre o Evento */}
                        <div className={styles.sectionCard}>
                            <h2 className={styles.sectionTitle}>
                                Sobre o Evento
                            </h2>
                            <p className={styles.aboutText}>
                                Experiência completa com infraestrutura de ponta
                                e segurança reforçada.
                            </p>
                            <div className={styles.aboutDetailsList}>
                                <p>
                                    <span className={styles.aboutLabel}>
                                        Classificação:
                                    </span>{' '}
                                    Livre para todos os públicos
                                </p>
                                <p>
                                    <span className={styles.aboutLabel}>
                                        Entrada:
                                    </span>{' '}
                                    Documento com foto e ingresso digital ou
                                    impresso.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- DIREITA (Painel de Compra / Checkout Box) --- */}
                    <aside className={styles.rightColumn}>
                        <div className={styles.purchaseCard}>
                            {/* Seleção de Tipo de Ingresso */}
                            {event.ticketTypes &&
                                event.ticketTypes.length > 0 && (
                                    <div className={styles.ticketSelection}>
                                        <label className={styles.inputLabel}>
                                            Tipo de Ingresso
                                        </label>

                                        <div className={styles.radioGroup}>
                                            {event.ticketTypes.map((t) => {
                                                const isSelected =
                                                    selectedTicket?.id === t.id;

                                                return (
                                                    <div
                                                        key={t.id}
                                                        className={`${styles.radioBox} ${isSelected ? styles.radioBoxSelected : ''}`}
                                                        onClick={() =>
                                                            setSelectedTicket(t)
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.radioBoxContent
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.radioBoxTitle
                                                                }
                                                            >
                                                                {t.name}
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.radioBoxDesc
                                                                }
                                                            >
                                                                {t.description}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.radioBoxPrice
                                                            }
                                                        >
                                                            R${' '}
                                                            {t.price.toFixed(2)}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                            {/* Seletor de Quantidade e Totais */}
                            <div className={styles.checkoutSection}>
                                <div>
                                    <label className={styles.inputLabel}>
                                        Quantidade
                                    </label>
                                    <div className={styles.quantityControls}>
                                        <button
                                            className={styles.quantityBtn}
                                            onClick={() =>
                                                setQuantity(
                                                    Math.max(1, quantity - 1)
                                                )
                                            }
                                        >
                                            <Minus size={24} />
                                        </button>
                                        <span className={styles.quantityValue}>
                                            {quantity}
                                        </span>
                                        <button
                                            className={styles.quantityBtn}
                                            onClick={() =>
                                                setQuantity(
                                                    Math.min(10, quantity + 1)
                                                )
                                            }
                                        >
                                            <Plus size={24} />
                                        </button>
                                    </div>
                                </div>

                                {/* Resumo de Valores */}
                                <div className={styles.summaryBox}>
                                    <div className={styles.summaryRow}>
                                        <span>Subtotal</span>
                                        <span>
                                            R$ {stats.subtotal.toFixed(2)}
                                        </span>
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

                                {/* Botão Principal de Ação */}
                                <button
                                    className={styles.buyButton}
                                    onClick={() =>
                                        onBuyTickets(
                                            event,
                                            quantity,
                                            selectedTicket
                                        )
                                    }
                                    disabled={event.availableTickets === 0}
                                >
                                    {event.availableTickets === 0
                                        ? 'Esgotado'
                                        : 'Comprar Ingressos'}
                                </button>

                                {/* Selo de Segurança */}
                                <div className={styles.securitySeal}>
                                    <ShieldCheck
                                        size={24}
                                        className={styles.securityIcon}
                                    />
                                    <span>Compra Segura</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
