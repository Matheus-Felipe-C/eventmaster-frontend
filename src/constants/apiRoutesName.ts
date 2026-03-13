const apiRoutesName = {
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
};

export default apiRoutesName;
