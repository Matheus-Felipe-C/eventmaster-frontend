import { useEffect } from 'react';
import { useGetMe } from '../../hooks/useGetMe';

export function ConfigPage() {
    const { data: userData } = useGetMe();

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    return <h1>Pagina de Configurações</h1>;
}
