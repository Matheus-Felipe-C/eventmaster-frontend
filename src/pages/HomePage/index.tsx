import { useState, useEffect } from 'react';
import { getLocalStorageRole } from '../../utils/localStorageRole';
import {
    Calendar,
    MapPin,
    Users,
    Search,
    LayoutGrid,
    Ticket,
    DollarSign,
    TrendingUp,
    Zap,
    Check,
    Filter,
    ChevronDown,
    Music,
    Palette,
    Mic2,
    Trophy,
    Utensils,
} from 'lucide-react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';
import { useGetMe } from '../../hooks/useGetMe';

// Importação do MOCK_EVENTS vindo do caminho solicitado
import { MOCK_EVENTS } from '../../mocks/events';
import { useQuery } from '@tanstack/react-query';
import { getAllEvents } from '../../services/events/getAllEvents';

const CATEGORIES = [
    { id: 'musica', label: 'Música', icon: Music },
    { id: 'teatro', label: 'Teatro', icon: Palette },
    { id: 'comedia', label: 'Comédia', icon: Mic2 },
    { id: 'tecnologia', label: 'Tecnologia', icon: Zap },
    { id: 'esportes', label: 'Esportes', icon: Trophy },
    { id: 'gastronomia', label: 'Gastronomia', icon: Utensils },
];

export function HomePage() {
    const userRole = getLocalStorageRole();
    const navigate = useNavigate();

    const { data: eventsRequest } = useQuery({
        queryKey: ['eventsHome'],
        queryFn: getAllEvents,
        refetchInterval: 1000 * 60 * 3, // 3 minutos,
        retry: 7,
    });

    const { data: userData } = useGetMe();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showCategories, setShowCategories] = useState(false);

    const toggleCategory = (id: string) => {
        setSelectedCategories((prev: string[]) =>
            prev.includes(id)
                ? prev.filter((c: string) => c !== id)
                : [...prev, id]
        );
    };

    useEffect(() => {
        console.log(userData);
    }, [userData]);
    useEffect(() => {
        console.log(eventsRequest);
    }, [eventsRequest]);

    const filteredEvents = MOCK_EVENTS.filter((event) => {
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(
                event.category
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
            );
        const matchesStatus = event.status === 'aprovado';
        return matchesCategory && matchesStatus;
    });

    return (
        <div className={styles.containerMain}>
            <header className={styles.header}>
                <div className={styles.titleSection}>
                    <h1 className={styles.pageTitle}>
                        {userRole === 'ADMIN'
                            ? 'Gerenciar Eventos'
                            : 'Descubra Eventos Incríveis'}
                    </h1>
                    <p className={styles.pageSubtitle}>
                        {userRole === 'ADMIN'
                            ? 'Visualize e gerencie todos os eventos da plataforma'
                            : 'Encontre os melhores shows, teatro, esportes e muito mais'}
                    </p>
                </div>

                <div className={styles.filterSection}>
                    <div className={styles.filterTop}>
                        <div className={styles.searchWrapper}>
                            <Search className={styles.searchIcon} size={20} />
                            <input
                                type="text"
                                placeholder="Buscar eventos..."
                                className={styles.searchInput}
                            />
                        </div>
                        <div
                            className={`${styles.categoryFilter} ${showCategories ? styles.activeFilter : ''}`}
                            onClick={() => setShowCategories(!showCategories)}
                        >
                            <Filter className={styles.filterIcon} size={18} />
                            <span>
                                Categorias{' '}
                                {selectedCategories.length > 0 &&
                                    `(${selectedCategories.length})`}
                            </span>
                            <ChevronDown
                                size={16}
                                className={`${styles.chevron} ${showCategories ? styles.chevronUp : ''}`}
                            />
                        </div>
                    </div>

                    {showCategories && (
                        <div className={styles.categoriesContainer}>
                            <button
                                className={`${styles.categoryChip} ${selectedCategories.length === 0 ? styles.chipActive : ''}`}
                                onClick={() => setSelectedCategories([])}
                            >
                                Todas
                            </button>
                            {CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                const isActive = selectedCategories.includes(
                                    cat.id
                                );
                                return (
                                    <button
                                        key={cat.id}
                                        className={`${styles.categoryChip} ${isActive ? styles.chipActive : ''}`}
                                        onClick={() => toggleCategory(cat.id)}
                                    >
                                        <Icon size={16} />
                                        {cat.label}
                                        {isActive && (
                                            <Check
                                                size={14}
                                                className={styles.checkIcon}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {userRole === 'ADMIN' && (
                    <div className={styles.statsGrid}>
                        <div className={styles.statsCard}>
                            <div className={styles.statsInfo}>
                                <span className={styles.statsLabel}>
                                    Total de Eventos
                                </span>
                                <span className={styles.statsValue}>6</span>
                            </div>
                            <div className={styles.statsIconWrapper}>
                                <LayoutGrid size={24} />
                            </div>
                        </div>

                        <div className={styles.statsCard}>
                            <div className={styles.statsInfo}>
                                <span className={styles.statsLabel}>
                                    Ingressos Vendidos
                                </span>
                                <span className={styles.statsValue}>530</span>
                            </div>
                            <div className={styles.statsIconWrapper}>
                                <Ticket size={24} />
                            </div>
                        </div>

                        <div className={styles.statsCard}>
                            <div className={styles.statsInfo}>
                                <span className={styles.statsLabel}>
                                    Receita Total
                                </span>
                                <span className={styles.statsValue}>
                                    R$ 88.700
                                </span>
                            </div>
                            <div className={styles.statsIconWrapper}>
                                <DollarSign size={24} />
                            </div>
                        </div>

                        <div className={styles.statsCard}>
                            <div className={styles.statsInfo}>
                                <span className={styles.statsLabel}>
                                    Taxa de Ocupação
                                </span>
                                <span className={styles.statsValue}>23%</span>
                            </div>
                            <div className={styles.statsIconWrapper}>
                                <TrendingUp size={24} />
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <div className={styles.eventsGrid}>
                {filteredEvents.map((event) => (
                    <div
                        className={styles.card}
                        key={event.id}
                        onClick={() => {
                            //navigate(PageRoutesName.)
                        }}
                    >
                        <div className={styles.imageWrapper}>
                            <img
                                src={`https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80`}
                                alt={event.title}
                                className={styles.image}
                            />
                            <div className={styles.badgeCategory}>
                                {event.category}
                            </div>
                        </div>

                        <div className={styles.content}>
                            <h3 className={styles.title}>{event.title}</h3>

                            <p className={styles.description}>
                                {event.description}
                            </p>

                            <div className={styles.infoList}>
                                <div className={styles.infoItem}>
                                    <Calendar className={styles.infoIcon} />
                                    <span>
                                        {new Date(
                                            event.date
                                        ).toLocaleDateString('pt-BR')}{' '}
                                        às {event.time}
                                    </span>
                                </div>

                                <div className={styles.infoItem}>
                                    <MapPin className={styles.infoIcon} />
                                    <span className={styles.infoLocation}>
                                        {event.location}
                                    </span>
                                </div>

                                {userRole === 'ADMIN' && (
                                    <div className={styles.infoItem}>
                                        <Users className={styles.infoIcon} />
                                        <span>
                                            {event.totalTickets -
                                                event.availableTickets}{' '}
                                            / {event.totalTickets} vendidos
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className={styles.footer}>
                                <div>
                                    <div className={styles.priceLabel}>
                                        A partir de
                                    </div>
                                    <div className={styles.priceValue}>
                                        R$ {event.price}
                                    </div>
                                </div>

                                <button
                                    className={styles.detailsButton}
                                    onClick={() => {
                                        if (userRole === 'ADMIN') {
                                            navigate(
                                                `${PageRoutesName.administrador.approveEvents}?id=${event.id}`
                                            );
                                        } else {
                                            navigate(
                                                PageRoutesName.cliente.eventDetail.replace(
                                                    ':id',
                                                    String(event.id)
                                                )
                                            );
                                        }
                                    }}
                                >
                                    {userRole === 'ADMIN'
                                        ? 'Gerenciar'
                                        : 'Ver Detalhes'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
