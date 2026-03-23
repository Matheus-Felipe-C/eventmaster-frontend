import type { UserAPIInfo } from '../services/auth/getMe';
import { setLocalStorageRole } from './localStorageRole';
import type { RoleTypes } from '../types/User';

const roleById: Record<number, RoleTypes> = {
    1: 'USUARIO',
    2: 'ADMIN',
    3: 'ORGANIZADOR',
    4: 'STAFF',
};

const roleByName: Record<string, RoleTypes> = {
    user: 'USUARIO',
    admin: 'ADMIN',
    organizer: 'ORGANIZADOR',
    staff: 'STAFF',
};

function normalizeRoleName(roleName?: string | null): RoleTypes | null {
    if (!roleName) return null;

    const normalizedRoleName = roleName.trim().toLowerCase();
    return roleByName[normalizedRoleName] ?? null;
}

export function setRoleUser(user: UserAPIInfo) {
    const roleFromName = normalizeRoleName(user.role);
    const roleFromId =
        typeof user.id_role === 'number' ? roleById[user.id_role] : null;

    const resolvedRole = roleFromName ?? roleFromId;

    if (!resolvedRole) return;

    setLocalStorageRole(resolvedRole);
}
