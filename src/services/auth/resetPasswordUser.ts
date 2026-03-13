import apiRoutesName from '../../constants/apiRoutesName';
import api from '../../server/api';
import type { apiResponseError } from '../../server/apiResponse';

type resetPasswordUserProps = {
    email: string;
    token: string;
    password: string;
};

export async function resetPasswordUser(userData: resetPasswordUserProps) {
    try {
        const response = await api.post(
            apiRoutesName.auth.resetPassword,
            {
                ...userData,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response;
    } catch (err) {
        return err as apiResponseError;
    }
}
