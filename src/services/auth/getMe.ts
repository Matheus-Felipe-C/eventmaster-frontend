import type { AxiosError } from 'axios';
import { getLocalStorageToken } from '../../utils/localStorageToken';
import api from '../../server/api';
import apiRoutesName from '../../constants/apiRoutesName';

import { z } from 'zod';

export const userInfoSchema = z.object({
    id: z.number(),
    id_role: z.number(),
    name: z.string(),
    cpf: z.string(),
    email: z.string().email(),
});

export type UserInfo = z.infer<typeof userInfoSchema>;
export async function getMe() {
    try {
        const response = await api.get(apiRoutesName.auth.getMe, {
            headers: {
                Authorization: getLocalStorageToken(),
            },
        });
        console.log('GET ME :', response.data);

        // Valida a resposta
        const validatedData = userInfoSchema.parse(response.data);

        return validatedData;
    } catch (error) {
        throw error as AxiosError;
    }
}
