import { Route, Routes } from 'react-router';
import { OrganizerDashboard } from '../../pages/OrganizerDashboard';
import { NotFoundPage } from '../../pages/NotFoundPage';

export function OrganizerRouter() {
    return (
        <Routes>
            {/* Rota principal: Apenas o Dashboard */}
            <Route index element={<OrganizerDashboard />} />

            {/* ROTA PARA PAGINAS QUE NAO EXISTEM DENTRO DA AREA DE CLIENTE */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
