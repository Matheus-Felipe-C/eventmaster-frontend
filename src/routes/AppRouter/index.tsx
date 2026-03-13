import { BrowserRouter, Route, Routes } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';
import { HomePage } from '../../pages/HomePage';
import { AuthRouter } from '../AuthRouter';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { OrganizerRouter } from '../OrganizerRouter';
import { ClientRouter } from '../ClientRouter';
import { AdminRouter } from '../AdminRouter';
import { ManageOrganizersPage } from '../../pages/ManageOrganizersPage';
import EventDetailsPage from '../../pages/EventDetailsPage/EventDetailsPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { DefaultLayout } from '../../layouts/DefaultLayout';

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/*" element={<AuthRouter />} />
                <Route element={<DefaultLayout />}>
                    <Route path={PageRoutesName.home} element={<HomePage />} />
                    <Route path="/getOrganizers" element={<ManageOrganizersPage onBack={() => window.history.back()} />} />
                    <Route path="/event-details" element={<EventDetailsPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/organizer/*" element={<OrganizerRouter />} />
                    <Route path="/admin/*" element={<AdminRouter />} />
                    <Route path="/client/*" element={<ClientRouter />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
