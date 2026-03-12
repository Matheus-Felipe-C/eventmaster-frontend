import { Route, Routes } from 'react-router';
import { RegisterPage } from '../../pages/RegisterPage';
import { LoginPage } from '../../pages/LoginPage';
import { NewPasswordPage } from '../../pages/NewPasswordPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { ConfigPage } from '../../pages/ConfigPage';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage';

export function AuthRouter() {
    return (
        <Routes>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="new-password" element={<NewPasswordPage />} />
            <Route path="config" element={<ConfigPage />} />

            <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
    );
}
