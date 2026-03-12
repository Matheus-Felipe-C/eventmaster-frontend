import { useQueryClient } from '@tanstack/react-query';
import { removeUserDataLocalStorage } from '../utils/removeUserData';
import { notify } from '../adapters/toastHotAdapter';
import { QueryKeysNames } from '../constants/QueryKeyNames';

export function useAuth() {
    const queryClient = useQueryClient();

    function logoutUser() {
        removeUserDataLocalStorage();
        queryClient.invalidateQueries({
            queryKey: QueryKeysNames.user.me,
        });
        notify.info('Você foi deslogado do sistema.');
    }

    //Forçar a atualização dos dados do usuario que estão armazenados no hook
    function refetchUser() {
        return queryClient.invalidateQueries({
            queryKey: QueryKeysNames.user.me,
        });
    }

    return { logoutUser, refetchUser };
}
