import type { AxiosError } from 'axios';
import { getLocalStorageToken } from '../../utils/localStorageToken';
import api from '../../server/api';
import ApiRoutesName from '../../constants/apiRoutesName';

import { z } from 'zod';
import { setRoleUser } from '../../utils/setRoleUser';
import { type ApiRolesType } from '../../constants/ApiRolesType';
import { removeUserDataLocalStorage } from '../../utils/removeUserData';

export const userInfoSchema = z.object({
    id: z.number(),
    id_role: z.number().optional(),
    role: z.custom<ApiRolesType>().optional(),
    name: z.string(),
    cpf: z.string(),
    email: z.email(),
});

export type UserAPIInfo = z.infer<typeof userInfoSchema>;
export async function getMe() {
    try {
        const response = await api.get(ApiRoutesName.auth.getMe, {
            headers: {
                Authorization: getLocalStorageToken(),
            },
        });

        const validatedData = userInfoSchema.parse(response.data);

        setRoleUser(validatedData);

        return validatedData;
    } catch (error) {
        const axiosError = error as AxiosError;

        // Se o token estiver inválido/expirado, limpa os dados locais para evitar sessão fantasma.
        if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
            removeUserDataLocalStorage();
        }

        throw axiosError;
    }
}
