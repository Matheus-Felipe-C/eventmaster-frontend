import { Route, Routes } from 'react-router';
import { AdminDashboardPage } from '../../pages/AdminDashboard';
import { ApproveEventsPage } from '../../pages/ApproveEvents';
import { AdminRelatorioPage } from '../../pages/AdminRelatorio';
import { AdminComissoesPage } from '../../pages/AdminComissoes';
import { ManageOrganizersPage } from '../../pages/ManageOrganizersPage';
import { GlobalReports } from '../../pages/GlobalReports';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { ManageCommissions } from '../../pages/ManageCommissions';

export function AdminRouter() {
    return (
        <Routes>
            <Route
                path="getorganizers"
                element={
                    <ManageOrganizersPage
                        onBack={() => window.history.back()}
                    />
                }
            />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="approveEvents" element={<ApproveEventsPage />} />
            <Route path="comissoes" element={<AdminComissoesPage />} />
            <Route path="relatorio" element={<AdminRelatorioPage />} />
            <Route index element={<AdminDashboardPage />} />
            <Route path="panel" element={<AdminDashboardPage />} />
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
            {/* ROTA PARA CONFIGURAR AS COMISSÕES */}
            <Route
                path="manage-commissions"
                element={
                    <ManageCommissions onBack={() => window.history.back()} />
                }
            />
            <Route
                path="global-reports"
                element={<GlobalReports onBack={() => window.history.back()} />}
            />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
