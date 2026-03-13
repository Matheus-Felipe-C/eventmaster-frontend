import { Route, Routes } from 'react-router';
import { SejaOrganizadorPage } from '../../pages/SejaOrganizadorPage';
import { AreaClientePage } from '../../pages/AreaCliente';
import EventDetailsPage from '../../pages/EventDetailsPage/EventDetailsPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { NotFoundPage } from '../../pages/NotFoundPage';

export function ClientRouter() {
    return (
        <Routes>
            {/* AREA COMUM DO CLIENTE */}
            <Route path="area-cliente" element={<AreaClientePage />}></Route>

            <Route path="event-detail/:id" element={<EventDetailsPage />} />
            <Route path="checkout/:id" element={<CheckoutPage />} />

            {/* ROTA PARA SE TORNAR UM ORGANIZADOR */}
            <Route path="seja-organizador" element={<SejaOrganizadorPage />} />

            {/* ROTA PARA PAGINAS QUE NAO EXISTEM DENTRO DA AREA DE CLIENTE */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
