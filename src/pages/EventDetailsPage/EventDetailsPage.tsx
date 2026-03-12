import { useNavigate } from 'react-router';
import EventDetails from './index';
// 👇 Importando as tipagens do arquivo central
import type { Event, TicketType } from '../../types/Event';
import { MOCK_EVENT } from './mockEvent'; // Garanta que MOCK_EVENT tem o formato Event
import PageRoutesName from '../../constants/PageRoutesName';

export default function EventDetailsPage() {
    const navigate = useNavigate();

    // A função que manda os dados pro checkout
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

        // Redireciona para o checkout enviando os dados no "state"
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
            event={MOCK_EVENT}
            onBuyTickets={handleBuy}
            onBack={handleBack}
        />
    );
}
