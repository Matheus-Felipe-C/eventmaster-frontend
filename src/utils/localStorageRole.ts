import { localStorageNameRole } from '../constants/localStorageNameRole';
import type { RoleTypes } from '../types/User';

export function setLocalStorageRole(role: RoleTypes) {
    localStorage.setItem(localStorageNameRole, role);
}

export function getLocalStorageRole() {
    const role = localStorage.getItem(localStorageNameRole);

    if (role) return role as RoleTypes;
    else return null;
}
