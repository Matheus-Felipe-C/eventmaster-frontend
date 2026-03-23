const ApiRoutesName = {
    auth: {
        getMe: '/user',
        login: '/login',
        register: '/signup',
        recoverPassword: '/recover-password',
        resetPassword: '/reset-passowrd',
    },

    events: {
        getAllEvents: '/events',
        getOneEvent: (idEvent: number) => `/events/${idEvent}`,
        create: '/events',
        update: (id: number) => `/events/${id}`,
        delete: (id: number) => `/events/${id}`,
    },

    admin: {
        promoteUserToAdmin: (userId: number) => `/admins/${userId}`,
        promoteSomeoneToUser: (userId: number) => `/users/${userId}/role`,
        promoteSomeoneToOrganizer: (userId: number) => `/users/${userId}/role`,
        promoteSomeoneToStaff: (userId: number) => `/users/${userId}/role`,
    },
};

export default ApiRoutesName;
