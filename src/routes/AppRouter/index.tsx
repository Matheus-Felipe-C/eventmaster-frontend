import { BrowserRouter, Route, Routes } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';
import { HomePage } from '../../pages/HomePage';
import { AuthRouter } from '../AuthRouter';
import { NotFoundPage } from '../../pages/NotFoundPage';

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={PageRoutesName.home}
                    element={<HomePage />}
                ></Route>

                <Route path="/auth/*" element={<AuthRouter />}></Route>

                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
