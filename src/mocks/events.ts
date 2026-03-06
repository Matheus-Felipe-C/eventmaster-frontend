import type { Event } from '../types/Event';

export const MOCK_EVENTS: Event[] = [
    {
        id: '1',
        title: 'Festival de Música Eletrônica 2025',
        description:
            'Os maiores DJs do mundo em um único lugar. Uma experiência inesquecível.',
        date: '2025-12-15',
        time: '20:00',
        location: 'Estádio Nacional, São Paulo',
        price: 150,
        category: 'Música',
        imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80',
        availableTickets: 800,
        totalTickets: 1000,
    },
];