const ApiRoutesName = {
    auth: {
        getMe: '/user',
        login: '/login',
        register: '/signup',
        recoverPassword: '/recover-password',
        resetPassword: '/reset-passowrd',
    },

    user: {
        becomeAnOrganizer: '/organizer-requests',
        deleteMyAccount: '/user',
    },

    events: {
        getAllEvents: '/events',
        getOneEvent: (idEvent: number) => `/events/${idEvent}`,
        create: '/events',
        update: (id: number) => `/events/${id}`,
        delete: (id: number) => `/events/${id}`,
    },

    admin: {
        getAllOrganizersRequest: '/organizer-requests',
        approveRequestOrganizer: (idOrganizer: number) =>
            `/organizer-requests/${idOrganizer}/approve`,
        rejectRequestOrganizer: (idOrganizer: number) =>
            `/organizer-requests/${idOrganizer}/reject`,
        createNewOrganizerUser: '/organizers',
        getAllOrganizers: '/organizers',
        getOneOrganizer: (organizerId: number) => `/organizers/${organizerId}`,
        promoteUserToAdmin: (userId: number) => `/admins/${userId}`,
        promoteSomeoneToUser: (userId: number) => `/users/${userId}/role`,
        promoteSomeoneToOrganizer: (userId: number) => `/users/${userId}/role`,
        promoteSomeoneToStaff: (userId: number) => `/users/${userId}/role`,
    },

    organizer: {},
};

export default ApiRoutesName;
