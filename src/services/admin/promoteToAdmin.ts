import type { AxiosResponse } from 'axios';
import ApiRoutesName from '../../constants/apiRoutesName';
import api from '../../server/api';
import type { apiResponse, apiResponseError } from '../../server/apiResponse';
import { getLocalStorageToken } from '../../utils/localStorageToken';

/* SIMULATE REQUEST BY REST CLIENT

### Promover um determinado usuario (5 - Antônio) para admin
PATCH {{baseUrl}}/admins/5
Authorization: Bearer {{adminUser.response.body.token}}

*/
export async function promoteToAdmin(userId: number) {
    try {
        const response = await api.patch(
            ApiRoutesName.admin.promoteUserToAdmin(userId),
            {},
            {
                headers: {
                    Authorization: getLocalStorageToken(),
                },
            }
        );

        return response.data.message as AxiosResponse<apiResponse>;
    } catch (error) {
        throw error as apiResponseError;
    }
}
