import { useNavigate, useLocation } from 'react-router';
import EventDetails from './index';
import type { Event, TicketType } from '../../types/Event';
import PageRoutesName from '../../constants/PageRoutesName';

// 👇 Importando o MOCK centralizado
import { MOCK_EVENTS } from '../../mocks/events'; 

export default function EventDetailsPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // Se vier vazio pelo state, pegamos o primeiro evento do MOCK para não quebrar a tela
    const event: Event = location.state?.event ?? MOCK_EVENTS[0];

    const handleBuy = (
        event: Event,
        quantity: number,
        ticketType?: TicketType
    ) => {
        const cartData = {
            event: {
                title: event.title,
                price: event.price,
            },
            quantity: quantity,
            ticketType: ticketType
                ? {
                      name: ticketType.name,
                      price: ticketType.price,
                  }
                : undefined,
        };

        navigate(
            PageRoutesName.cliente.checkout.replace(':id', String(event.id)),
            {
                state: { cart: [cartData] },
                replace: false,
            }
        );
    };

    const handleBack = () => {
        navigate(PageRoutesName.home);
    };

    return (
        <EventDetails
            event={event}
            onBuyTickets={handleBuy}
            onBack={handleBack}
        />
    );
}