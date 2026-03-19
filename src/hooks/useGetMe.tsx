import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { getMe } from '../services/auth/getMe';
import { getLocalStorageToken } from '../utils/localStorageToken';

export function useGetMe() {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => await getMe(),
        staleTime: 1000 * 60 * 5, // 5 minutos
        enabled: !!getLocalStorageToken(),
        retry: (failureCount, error) => {
            const status = (error as AxiosError).response?.status;

            if (status === 401 || status === 403) {
                return false;
            }

            return failureCount < 2;
        },
    });
}
