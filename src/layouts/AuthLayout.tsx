import { useLocation, useNavigate } from 'react-router';
import PageRoutesName from '../constants/PageRoutesName';
import { Tabs } from '../components/Tabs';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    const location = useLocation();
    const navigate = useNavigate();

    // Define qual aba está ativa baseado na rota atual
    const currentTab =
        location.pathname === PageRoutesName.auth.login ? 'login' : 'register';

    // Função para trocar de aba
    const handleTabChange = (value: string) => {
        if (value === 'login') {
            navigate(PageRoutesName.auth.login);
        } else {
            navigate(PageRoutesName.auth.register);
        }
    };

    return (
        <div
            style={{
                width: '90%',
                minHeight: 'calc(100vh - 4rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem 1rem',
            }}
        >
            <div style={{ maxWidth: '45rem', width: '100%' }}>
                {/* Título e subtítulo */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1
                        style={{
                            fontSize: '1.8rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                            color: 'var(--color-gray-900)',
                        }}
                    >
                        Bem-vindo ao EventMaster
                    </h1>
                    <p
                        style={{
                            fontSize: '1.5rem',
                            color: 'var(--color-gray-600)',
                        }}
                    >
                        Entre ou crie sua conta para continuar
                    </p>
                </div>

                {/* Tabs com navegação */}
                <Tabs.Root defaultValue={currentTab}>
                    <Tabs.List>
                        <Tabs.Trigger
                            value="login"
                            onClick={() => handleTabChange('login')}
                        >
                            Entrar
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="register"
                            onClick={() => handleTabChange('register')}
                        >
                            Cadastrar
                        </Tabs.Trigger>
                    </Tabs.List>

                    {/* Conteúdo da página (formulário) */}
                    <Tabs.Content value={currentTab}>{children}</Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    );
}
