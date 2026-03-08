import { useQuery } from '@tanstack/react-query';
import { getMe } from '../services/auth/getMe';
import { getLocalStorageToken } from '../utils/localStorageToken';

export function useGetMe() {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => await getMe(),
        staleTime: 1000 * 60 * 5, // 5 minutos
        enabled: !!getLocalStorageToken(),
    });
}
