import apiRoutesName from '../../constants/apiRoutesName';
import api from '../../server/api';
import type { apiResponseError } from '../../server/apiResponse';

type RegisterUserProps = {
    name: string;
    cpf: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export async function registerUser(userData: RegisterUserProps) {
    try {
        const response = await api.post(
            apiRoutesName.auth.register,
            {
                ...userData,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.error('Erro no registro:', err);
        throw err as apiResponseError;
    }
}
