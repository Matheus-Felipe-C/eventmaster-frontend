import type { AxiosError } from 'axios';
import ApiRoutesName from '../../constants/apiRoutesName';
import api from '../../server/api';
import { getLocalStorageToken } from '../../utils/localStorageToken';
import type { apiResponseError } from '../../server/apiResponse';

type HistoryPurchaseType = {
    data: unknown[];
};

export async function getMyPurchaseHistory() {
    try {
        const response = await api.get(ApiRoutesName.user.getPurchaseHistory, {
            headers: {
                Authorization: getLocalStorageToken(),
            },
        });

        return response.data as HistoryPurchaseType;
    } catch (err) {
        const error = err as AxiosError<apiResponseError>;
        throw error;
    }
}
