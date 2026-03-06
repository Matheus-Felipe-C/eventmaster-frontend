import { Route, Routes } from 'react-router';
import { RegisterPage } from '../../pages/RegisterPage';
import { LoginPage } from '../../pages/LoginPage';
import { ForgotPasswordPage } from '../../pages/ForgotPassword';
import { NewPasswordPage } from '../../pages/NewPassword';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { ConfigPage } from '../../pages/ConfigPage';


export function AuthRouter() {
    return (
        <Routes>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forgotPassword" element={<ForgotPasswordPage />} />
            <Route path="newPassword" element={<NewPasswordPage />} />
            <Route path="config" element={<ConfigPage />} />

            <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
    );
}
