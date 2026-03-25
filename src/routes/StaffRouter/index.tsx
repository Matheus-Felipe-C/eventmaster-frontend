import { Route, Routes, useNavigate } from 'react-router';
import { StaffCheckIn } from '../../pages/StaffCheckIn';
import { NotFoundPage } from '../../pages/NotFoundPage';

export function StaffRouter() {
    const navigate = useNavigate();

    return (
        <Routes>
            {/* A página principal do staff é o check-in */}
            <Route index element={<StaffCheckIn onBack={() => navigate('/')} />} />

            {/* ROTA PARA PAGINAS QUE NAO EXISTEM DENTRO DA AREA DE STAFF */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
