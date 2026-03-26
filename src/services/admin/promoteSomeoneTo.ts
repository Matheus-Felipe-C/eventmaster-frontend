import type { AxiosResponse } from 'axios';
import ApiRoutesName from '../../constants/apiRoutesName';
import api from '../../server/api';
import type { apiResponse, apiResponseError } from '../../server/apiResponse';
import { getLocalStorageToken } from '../../utils/localStorageToken';

// SIMULATE REQUEST BY REST CLIENT

// ### Promover um determinado usuario (1 - Teste) para 'usuario'
// PATCH {{baseUrl}}/users/1/role
// Content-Type: application/json
// Authorization: Bearer {{adminUser.response.body.token}}

// {
//   "role": "user"
// }

export async function promoteSomeoneToUser(userId: number) {
    try {
        const { data } = await api.patch(
            ApiRoutesName.admin.promoteSomeoneToUser(userId),
            {
                role: 'user',
            },
            {
                headers: {
                    Authorization: getLocalStorageToken(),
                },
            }
        );

        return data as apiResponse;
    } catch (error) {
        throw error as apiResponseError;
    }
}

export async function promoteSomeoneToOrganizer(userId: number) {
    try {
        const { data } = await api.patch(
            ApiRoutesName.admin.promoteSomeoneToOrganizer(userId),
            {
                role: 'organizer',
            },
            {
                headers: {
                    Authorization: getLocalStorageToken(),
                },
            }
        );
        return data.message as AxiosResponse<apiResponse>;
    } catch (error) {
        throw error as apiResponseError;
    }
}

export async function promoteSomeoneToStaff(userId: number) {
    try {
        const { data } = await api.patch(
            ApiRoutesName.admin.promoteSomeoneToStaff(userId),
            {
                role: 'staff',
            },
            {
                headers: {
                    Authorization: getLocalStorageToken(),
                },
            }
        );
        return data.message as AxiosResponse<apiResponse>;
    } catch (error) {
        throw error as apiResponseError;
    }
}
