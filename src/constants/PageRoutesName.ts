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
        staffCheckIn: '/organizer/checkin',
    },

    staff: {
        dashboard: '/staff',
    },

    administrador: {
        getOrganizadores: '/admin/get-organizers',
        adminDashboard: '/admin/dashboard',
        adminRelatorio: '/admin/relatorio',
        adminComissoes: '/admin/comissoes',
        approveEvents: '/admin/approve-events',
        adminPanel: '/admin/panel',
        manageCommissions: '/admin/manage-commissions',
        globalReports: '/admin/global-reports',
        adminPage: '/admin',
    },
};

export default PageRoutesName;
