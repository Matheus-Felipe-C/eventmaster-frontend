import { Route, Routes } from 'react-router';
import { ManageOrganizers } from '../../pages/ManageOrganizers';
import { AdminPanelPage } from '../../pages/AdminPanel';
import { ApproveEventsPage } from '../../pages/ApproveEvents';

export function AdminRouter() {
    return (
        <Routes>
            {/* ROTA PARA MANIPULAR OS ORGANIZADORES */}
            <Route path="getOrganizers"element={<ManageOrganizers onBack={() => window.history.back()} />}></Route>
            <Route path="panel" element={<AdminPanelPage />} />
            <Route path="approveEvents" element={<ApproveEventsPage />} />
        </Routes>
    );
}
