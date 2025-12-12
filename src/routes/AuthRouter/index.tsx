import { Route } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';
import { RegisterPage } from '../../pages/RegisterPage';
import { Routes } from 'react-router';

export function AuthRouter() {
    return (
        <Routes>
            <Route
                path={PageRoutesName.auth.register}
                element={<RegisterPage />}
            ></Route>
            <Route path={PageRoutesName.auth.login} element></Route>
        </Routes>
    );
}
