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
        getOrganizadores: '/admin/getorganizers',
        adminDashboard: '/admin/dashboard',
        adminRelatorio: '/admin/relatorio',
        adminComissoes: '/admin/comissoes',
        approveEvents: '/admin/approveEvents',
        adminPage: '/admin',
        organizerGetOrganizers: '/organizer/get-organizers',
    },
};

export default PageRoutesName;
