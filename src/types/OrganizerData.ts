export type statusOrganizerRequest = 'rejected' | 'approved' | 'pending';

export type OrganizerData = {
    id: number;
    name: string;
    cpf: string;
    email: string;
    phone_number: string;
    reason: string;
    status: statusOrganizerRequest;
    created_at: string;
    updated_at: string;
};
