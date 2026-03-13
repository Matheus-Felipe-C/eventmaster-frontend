const PageRoutesName = {
    home: '/',
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        userConfig: '/auth/config',
        forgotPassword: '/auth/forgot-password',
        newPassword: '/auth/new-password',
    },

    cliente: {
        areaCliente: '/client/area-cliente',
        sejaOrganizador: '/client/seja-organizador',
        eventDetail: '/client/event-detail/:id',
        checkout: '/client/checkout/:id',
    },

    organizer: {
        organizerPage: '/organizer',
        dashboard: '/organizer/dashboard',
    },

    administrador: {
        getOrganizadores: '/admin/get-organizers',
        adminPanel: '/admin/panel',
        approveEvents: '/admin/approve-events',
        adminPage: '/admin',
    },
};

export default PageRoutesName;
