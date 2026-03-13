import { getLocalStorageRole } from './localStorageRole';

export type UserRoleTextInformation =
    | 'Administrador'
    | 'Organizador'
    | 'Staff/Check-In'
    | 'Usuário'
    | 'Usuário deslogado';

export function getUserRoleTextInformation(): UserRoleTextInformation {
    let textCorresponding: null | UserRoleTextInformation = null;

    switch (getLocalStorageRole()) {
        case 'ADMIN':
            textCorresponding = 'Administrador';
            break;
        case 'ORGANIZADOR':
            textCorresponding = 'Organizador';
            break;
        case 'STAFF':
            textCorresponding = 'Staff/Check-In';
            break;
        case 'USUARIO':
            textCorresponding = 'Usuário';

            break;

        default:
            break;
    }

    if (!textCorresponding) {
        return 'Usuário deslogado';
    } else {
        return textCorresponding;
    }
}
