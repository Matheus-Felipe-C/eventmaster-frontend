export type RoleTypes = 'ADMIN' | 'STAFF' | 'USUARIO' | 'ORGANIZADOR';

export type User = {
    name: string;
    email: string;
    token: string;
    role: RoleTypes;
};
