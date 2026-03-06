const PageRoutesName = {
    home: '/',
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        userConfig: '/auth/config',
        forgotPassword: '/auth/forgotPassword',
        newPassword: '/auth/newPassword',
    },

    cliente: {
        areaCliente: '/client/areaCliente',
        sejaOrganizador: '/client/sejaOrganizador',
        eventDetail: '/client/eventDetail/:id',
        checkout: '/client/checkout/:id',
    },

    organizador: {},

    administrador: {
        getOrganizadores: '/getOrganizers',
        adminPanel: '/admin/panel',
        approveEvents: '/admin/approveEvents',
    },
};

export default PageRoutesName;
