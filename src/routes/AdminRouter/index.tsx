import { Route, Routes } from 'react-router';
import { AdminPanelPage } from '../../pages/AdminPanel';
import { ApproveEventsPage } from '../../pages/ApproveEvents';
import { ManageOrganizersPage } from '../../pages/ManageOrganizersPage';
import { NotFoundPage } from '../../pages/NotFoundPage';

export function AdminRouter() {
    return (
        <Routes>
            <Route index element={<AdminPanelPage />} />
            <Route index path="panel" element={<AdminPanelPage />} />
            <Route path="approve-events" element={<ApproveEventsPage />} />
            {/* ROTA PARA MANIPULAR OS ORGANIZADORES */}
            <Route
                path="get-organizers"
                element={
                    <ManageOrganizersPage
                        onBack={() => window.history.back()}
                    />
                }
            />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
