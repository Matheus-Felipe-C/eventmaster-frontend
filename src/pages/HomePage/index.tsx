import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import styles from './styles.module.css';
import { getLocalStorageRole } from '../../utils/localStorageRole';
import { useNavigate } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';
import { useEffect } from 'react';
import { useGetMe } from '../../hooks/useGetMe';

// Importação do MOCK_EVENTS vindo do caminho solicitado
import { MOCK_EVENTS } from '../../mocks/events';

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