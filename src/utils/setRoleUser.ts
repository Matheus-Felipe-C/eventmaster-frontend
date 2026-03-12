import type { UserAPIInfo } from '../services/auth/getMe';
import { setLocalStorageRole } from './localStorageRole';

export function setRoleUser(user: UserAPIInfo) {
    //TODO - TROCAR CODIGO PARA QUANDO A API ESTIVER RETORNANDO AS ROLES CERTA
    if (user.role_name == undefined) {
        switch (user.id_role) {
            case 1:
                setLocalStorageRole('USUARIO');
                break;
            case 2:
                setLocalStorageRole('ADMIN');
                break;
            case 3:
                setLocalStorageRole('ORGANIZADOR');
                break;
            case 4:
                setLocalStorageRole('STAFF');
                break;

            default:
                break;
        }
    }
}
