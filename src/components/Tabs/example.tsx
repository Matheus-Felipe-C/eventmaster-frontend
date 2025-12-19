import { Tabs } from '../../components/Tabs';
import { Form } from '../../components/Form';
import { DefaultLayout } from '../../layouts/DefaultLayout';
import { LockIcon, MailIcon } from 'lucide-react';

export function RegisterPageExample() {
    return (
        <DefaultLayout>
            <div
                style={{
                    minHeight: 'calc(100vh - 4rem)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '3rem 1rem',
                }}
            >
                <div style={{ maxWidth: '28rem', width: '100%' }}>
                    {/* Título e subtítulo */}
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1
                            style={{
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                marginBottom: '0.5rem',
                                color: 'var(--color-gray-900)',
                            }}
                        >
                            Bem-vindo ao EventTickets
                        </h1>
                        <p
                            style={{
                                fontSize: '0.875rem',
                                color: 'var(--color-gray-600)',
                            }}
                        >
                            Entre ou crie sua conta para continuar
                        </p>
                    </div>

                    {/* Tabs */}
                    <Tabs.Root defaultValue="register">
                        <Tabs.List>
                            <Tabs.Trigger value="login">Entrar</Tabs.Trigger>
                            <Tabs.Trigger value="register">
                                Cadastrar
                            </Tabs.Trigger>
                        </Tabs.List>

                        {/* Conteúdo da aba Login */}
                        <Tabs.Content value="login">
                            <Form>
                                <Form.Header>
                                    <Form.Title>Entrar na sua conta</Form.Title>
                                    <Form.Subtitle>
                                        Digite suas credenciais para acessar
                                    </Form.Subtitle>
                                </Form.Header>

                                <Form.Content
                                    onSubmit={(e) => e.preventDefault()}
                                >
                                    <Form.Input
                                        label="E-mail"
                                        type="email"
                                        placeholder="seu@email.com"
                                        icon={<MailIcon />}
                                        required
                                    />

                                    <Form.Input
                                        label="Senha"
                                        type="password"
                                        placeholder="Digite sua senha"
                                        icon={<LockIcon />}
                                        required
                                    />

                                    <Form.SendButton>Entrar</Form.SendButton>
                                </Form.Content>
                            </Form>
                        </Tabs.Content>

                        {/* Conteúdo da aba Cadastrar */}
                        <Tabs.Content value="register">
                            <Form>
                                <Form.Header>
                                    <Form.Title>Criar nova conta</Form.Title>
                                    <Form.Subtitle>
                                        Preencha os dados abaixo para criar sua
                                        conta
                                    </Form.Subtitle>
                                </Form.Header>

                                <Form.Content
                                    onSubmit={(e) => e.preventDefault()}
                                >
                                    <Form.Input
                                        label="Nome completo"
                                        type="text"
                                        placeholder="Seu nome"
                                        required
                                    />

                                    <Form.Input
                                        label="E-mail"
                                        type="email"
                                        placeholder="seu@email.com"
                                        icon={<MailIcon />}
                                        required
                                    />

                                    <Form.Input
                                        label="Senha"
                                        type="password"
                                        placeholder="Digite sua senha"
                                        icon={<LockIcon />}
                                        minLength={6}
                                        required
                                    />

                                    <Form.SendButton>
                                        Criar Conta
                                    </Form.SendButton>
                                </Form.Content>
                            </Form>
                        </Tabs.Content>
                    </Tabs.Root>
                </div>
            </div>
        </DefaultLayout>
    );
}
