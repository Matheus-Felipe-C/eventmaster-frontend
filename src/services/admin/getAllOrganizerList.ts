import type { AxiosError } from 'axios';
import ApiRoutesName from '../../constants/apiRoutesName';
import api from '../../server/api';
import { getLocalStorageToken } from '../../utils/localStorageToken';
import type { apiResponseError } from '../../server/apiResponse';

type ActiveOrganizerType = {
    id: 5;
    name: string;
    email: string;
    email_verified_at: null;
    created_at: string;
    updated_at: string;
    id_role: 4;
    cpf: string;
    phone_number: string;
    reason: string;
    role: {
        id: 4;
        name: string;
        created_at: string;
        updated_at: string;
    };
};

export type allActiveOrganizerRequest = {
    data: ActiveOrganizerType[];
    total: number;
};

export async function getAllActiveOrganizerList() {
    try {
        const response = await api.get(ApiRoutesName.admin.getAllOrganizers, {
            headers: { Authorization: getLocalStorageToken() },
        });

        return response.data as allActiveOrganizerRequest;
    } catch (err) {
        const error = err as AxiosError<apiResponseError>;
        throw error;
    }
}
