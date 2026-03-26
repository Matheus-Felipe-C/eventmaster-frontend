import { type AxiosError } from 'axios';
import type { apiResponseError } from '../../server/apiResponse';
import api from '../../server/api';
import ApiRoutesName from '../../constants/apiRoutesName';
import { getLocalStorageToken } from '../../utils/localStorageToken';
import { removeUserDataLocalStorage } from '../../utils/removeUserData';

export async function deleteMyUserAccount() {
    try {
        const response = await api.delete(ApiRoutesName.user.deleteMyAccount, {
            headers: {
                Authorization: getLocalStorageToken(),
            },
        });
        if (response.status >= 200 && response.status < 300) {
            removeUserDataLocalStorage();
            return response.data?.message as string;
        }
    } catch (err) {
        const error = err as AxiosError<apiResponseError>;

        throw error;
    }
}
