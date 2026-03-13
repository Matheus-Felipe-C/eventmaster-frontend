import apiRoutesName from '../../constants/apiRoutesName';
import api from '../../server/api';
import type { apiResponseError } from '../../server/apiResponse';

type recoverPasswordUserProps = {
    email: string;
};

export async function recoverPasswordUser(userData: recoverPasswordUserProps) {
    try {
        const response = await api.post(
            apiRoutesName.auth.recoverPassword,
            {
                ...userData,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response);
        return response;
    } catch (err) {
        return err as apiResponseError;
    }
}
