import type { AxiosError } from 'axios';
import type { apiResponse, apiResponseError } from '../../server/apiResponse';
import api from '../../server/api';
import ApiRoutesName from '../../constants/apiRoutesName';
import { getLocalStorageToken } from '../../utils/localStorageToken';
import { unknown } from 'zod';

type CreateNewStaffDTO = {
    name: string;
    email: string;
    cpf: string;
    password: string;
};

export async function createNewStaff(newStaff: CreateNewStaffDTO) {
    try {
        const response = await api.post(ApiRoutesName.admin.createNewStaff, {
            ...newStaff,

            headers: {
                Authorization: getLocalStorageToken(),
            },
        });

        return response.data as apiResponse;
    } catch (err) {
        const error = err as AxiosError<apiResponseError>;
        throw error;
    }
}
