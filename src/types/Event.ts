// 1. Adicione a interface do Lote (Batch)
export interface TicketBatch {
    id: string;
    name: string;
    price: number;
    quantity: number;
    availableQuantity: number;
    startDate: string;
    endDate: string;
}

// 2. Atualize o TicketType para incluir os batches
export interface TicketType {
    id: string;
    name: string;
    price: number;
    availableTickets: number;
    description?: string;
    allowHalfPrice?: boolean;
    batches?: TicketBatch[]; // 👈 ESSA É A LINHA QUE FALTAVA!
}

// 3. A interface Event continua igual
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
    status?: 'approved' | 'pending';
    visible?: boolean;
}
