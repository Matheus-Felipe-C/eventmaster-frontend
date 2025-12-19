import { Route } from 'react-router';
import { RegisterPage } from '../../pages/RegisterPage';
import { Routes } from 'react-router';
import { LoginPage } from '../../pages/LoginPage';
import { NotFoundPage } from '../../pages/NotFoundPage';

export function AuthRouter() {
    return (
        <Routes>
            <Route path="register" element={<RegisterPage />}></Route>
            <Route path="login" element={<LoginPage />}></Route>
            <Route path="login" element={<LoginPage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
    );
}
