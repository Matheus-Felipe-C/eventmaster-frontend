import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import styles from './styles.module.css';
import { getLocalStorageRole } from '../../utils/localStorageRole';
import type { Event } from '../../types/Event';
import { useNavigate } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';
import { useEffect } from 'react';
import { useGetMe } from '../../hooks/useGetMe';

const MOCK_EVENTS: Event[] = [
    {
        id: '1',
        title: 'Festival de Música Eletrônica 2025',
        description:
            'Os maiores DJs do mundo em um único lugar. Uma experiência inesquecível com o melhor da música eletrônica.',
        date: '2025-12-15',
        time: '20:00',
        location: 'Estádio Nacional, São Paulo',
        price: 150,
        category: 'Música',
        imageUrl: 'music festival concert', // 👈 CORRIGIDO AQUI
        availableTickets: 450,
        totalTickets: 500,
    },
    {
        id: '2',
        title: 'Teatro: O Fantasma da Ópera',
        description:
            'O clássico musical da Broadway chega ao Brasil com elenco internacional.',
        date: '2025-11-20',
        time: '19:30',
        location: 'Teatro Municipal, Rio de Janeiro',
        price: 120,
        category: 'Teatro',
        imageUrl: 'theater stage performance', // 👈 CORRIGIDO AQUI
        availableTickets: 80,
        totalTickets: 200,
    },
    {
        id: '3',
        title: 'Stand-Up Comedy Night',
        description:
            'Uma noite de muito humor com os melhores comediantes do país.',
        date: '2025-11-25',
        time: '21:00',
        location: 'Arena Comedy Club, Curitiba',
        price: 80,
        category: 'Comédia',
        imageUrl: 'comedy show audience', // 👈 CORRIGIDO AQUI
        availableTickets: 120,
        totalTickets: 150,
    },
    {
        id: '4',
        title: 'Conferência Tech Innovation 2025',
        description:
            'Os maiores nomes da tecnologia compartilhando insights sobre IA, blockchain e o futuro digital.',
        date: '2025-12-01',
        time: '09:00',
        location: 'Centro de Convenções, Brasília',
        price: 350,
        category: 'Tecnologia',
        imageUrl: 'technology conference people', // 👈 CORRIGIDO AQUI
        availableTickets: 200,
        totalTickets: 300,
    },
    {
        id: '5',
        title: 'Show Rock Nacional',
        description:
            'As melhores bandas de rock brasileiro em um festival épico.',
        date: '2025-12-10',
        time: '18:00',
        location: 'Parque Municipal, Belo Horizonte',
        price: 120,
        category: 'Música',
        imageUrl: 'rock concert crowd', // 👈 CORRIGIDO AQUI
        availableTickets: 800,
        totalTickets: 1000,
    },
];
export function HomePage() {
    const userRole = getLocalStorageRole();
    const navigate = useNavigate();

    const { data: userData } = useGetMe();

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    return (
        <div className={styles.containerMain}>
            <div className={styles.eventsGrid}>
                {MOCK_EVENTS.map((event) => (
                    <div
                        className={styles.card}
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

                            {/* {isAlmostSoldOut && (
                        <Badge
                            variant="destructive"
                            className={styles.badgeWarning}
                        >
                            Últimos Ingressos!
                        </Badge>
                    )} */}
                        </div>

                        <div className={styles.content}>
                            <h3 className={styles.title}>{event.title}</h3>

                            <p className={styles.description}>
                                {event.description}
                            </p>

                            <div className={styles.infoList}>
                                <div className={styles.infoItem}>
                                    <CalendarIcon className={styles.infoIcon} />
                                    <span>
                                        {new Date(
                                            event.date
                                        ).toLocaleDateString('pt-BR')}{' '}
                                        às {event.time}
                                    </span>
                                </div>

                                <div className={styles.infoItem}>
                                    <MapPinIcon className={styles.infoIcon} />
                                    <span className={styles.infoLocation}>
                                        {event.location}
                                    </span>
                                </div>

                                {userRole === 'ADMIN' && (
                                    <div className={styles.infoItem}>
                                        <UsersIcon
                                            className={styles.infoIcon}
                                        />
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
                                    onClick={() =>
                                        navigate(
                                            PageRoutesName.cliente.eventDetail.replace(
                                                ':id',
                                                String(event.id)
                                            )
                                        )
                                    }
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
