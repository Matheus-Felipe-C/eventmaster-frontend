import type { AxiosError } from 'axios';
import { getLocalStorageToken } from '../../utils/localStorageToken';
import api from '../../server/api';
import apiRoutesName from '../../constants/apiRoutesName';

import { z } from 'zod';
import { setRoleUser } from '../../utils/setRoleUser';

export const userInfoSchema = z.object({
    id: z.number(),
    id_role: z.number().optional(),
    role_name: z.string().optional(),
    name: z.string(),
    cpf: z.string(),
    email: z.email(),
});

export type UserAPIInfo = z.infer<typeof userInfoSchema>;
export async function getMe() {
    try {
        const response = await api.get(apiRoutesName.auth.getMe, {
            headers: {
                Authorization: getLocalStorageToken(),
            },
        });

        // Valida a resposta
        const validatedData = userInfoSchema.parse(response.data);

        setRoleUser(response.data);

        return validatedData;
    } catch (error) {
        throw error as AxiosError;
    }
}
