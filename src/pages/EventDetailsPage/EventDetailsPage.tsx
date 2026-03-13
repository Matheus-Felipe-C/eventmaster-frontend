import { useNavigate, useParams } from 'react-router';
import EventDetails from './index';
import type { Event, TicketType } from '../../types/Event';
import PageRoutesName from '../../constants/PageRoutesName';

// Importando o MOCK centralizado
import { MOCK_EVENTS } from '../../mocks/events'; 

export default function EventDetailsPage() {
    const navigate = useNavigate();
    
    // 1. Pegamos o ID diretamente da URL (definido como :id no seu roteador)
    const { id } = useParams();

    // 2. Procuramos o evento correspondente dentro do seu arquivo de mocks
    // Convertemos o id para string para garantir a comparação correta
    const event = MOCK_EVENTS.find((e) => String(e.id) === String(id));

    const handleBuy = (
        selectedEvent: Event,
        quantity: number,
        ticketType?: TicketType
    ) => {
        const cartData = {
            event: {
                title: selectedEvent.title,
                price: selectedEvent.price,
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
            PageRoutesName.cliente.checkout.replace(':id', String(selectedEvent.id)),
            {
                state: { cart: [cartData] },
                replace: false,
            }
        );
    };

    const handleBack = () => {
        navigate(PageRoutesName.home);
    };

    // 3. Caso o ID na URL seja inválido ou o evento não exista no mock
    if (!event) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Evento não encontrado</h2>
                <button onClick={handleBack}>Voltar para Home</button>
            </div>
        );
    }

    return (
        <EventDetails
            event={event}
            onBuyTickets={handleBuy}
            onBack={handleBack}
        />
    );
}