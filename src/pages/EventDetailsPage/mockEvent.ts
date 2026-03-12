import type { Event } from '../../types/Event'; // 👈 Importação corrigida!

export const MOCK_EVENT: Event = {
    id: '1',
    title: 'Festival de Música Eletrônica 2025',
    date: '2025-12-14',
    time: '20:00',
    location: 'Estádio Nacional, São Paulo',
    price: 150.0,
    description:
        'Os maiores DJs do mundo em um único lugar. Uma experiência inesquecível com o melhor da música eletrônica.',
    availableTickets: 100,
    totalTickets: 500,
    category: 'Música',
    imageUrl:
        'https://blog.sympla.com.br/wp-content/uploads/2022/06/como-organizar-uma-festa-show-1024x630-1-1-1-1-1-2.jpg',
    ticketTypes: [
        {
            id: 'pista',
            name: 'Pista',
            price: 150.0,
            availableTickets: 200,
            description: 'Acesso à área de pista',
            allowHalfPrice: true,
        },
        {
            id: 'camarote',
            name: 'Camarote',
            price: 300.0,
            availableTickets: 150,
            description: 'Acesso ao camarote com open bar',
            allowHalfPrice: false,
        },
        {
            id: 'vip',
            name: 'VIP',
            price: 500.0,
            availableTickets: 100,
            description: 'Área VIP com acesso exclusivo aos artistas',
            allowHalfPrice: false,
        },
    ],
};
