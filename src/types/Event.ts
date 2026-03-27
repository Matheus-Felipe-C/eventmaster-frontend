export interface TicketBatch {
    id: string;
    name: string;
    price: number;
    quantity: number;
    availableQuantity: number;
    startDate: string;
    endDate: string;
}

export interface TicketType {
    id: string;
    name: string;
    price: number;
    availableTickets: number;
    description?: string;
    allowHalfPrice?: boolean;
    batches?: TicketBatch[];
}

export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    price: number;
    description: string;
    availableTickets: number;
    totalTickets: number;
    category: string;
    imageUrl?: string;
    ticketTypes?: TicketType[];
    status?: 'approved' | 'pending' | 'rejected' | 'aprovado' | 'pendente' | 'rejeitado';
    visible?: boolean;
}
