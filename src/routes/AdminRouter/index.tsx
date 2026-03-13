import { Route, Routes } from 'react-router';
import { AdminPanelPage } from '../../pages/AdminPanel';
import { ApproveEventsPage } from '../../pages/ApproveEvents';
import { ManageOrganizersPage } from '../../pages/ManageOrganizersPage';
import { NotFoundPage } from '../../pages/NotFoundPage';

export function AdminRouter() {
    return (
        <Routes>
            {/* ROTA PARA MANIPULAR OS ORGANIZADORES */}
            <Route path="getOrganizers" element={<ManageOrganizersPage onBack={() => window.history.back()} />}></Route>
            <Route path="panel" element={<AdminPanelPage />} />
            <Route path="approveEvents" element={<ApproveEventsPage />} />
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
