import type { AxiosError } from 'axios';
import type { apiResponseError } from '../../server/apiResponse';
import api from '../../server/api';
import ApiRoutesName from '../../constants/apiRoutesName';
import { getLocalStorageToken } from '../../utils/localStorageToken';
import type { Staff } from '../../types/Staff';

type AllStaffsData = {
    data: Staff[];
    total?: number;
};

export async function getAllStaffs() {
    try {
        const { data } = await api.get(ApiRoutesName.admin.getAllStaffs, {
            headers: {
                Authorization: getLocalStorageToken(),
            },
        });
        return data as AllStaffsData;
    } catch (error) {
        const err = error as AxiosError<apiResponseError>;
        throw err;
    }
}
