import { LockIcon, MailIcon, UserIcon } from 'lucide-react';
import { Form } from '../../components/Form';

/**
 * Exemplo de uso do componente Form com Compound Component Pattern
 *
 * Este componente demonstra como usar o Form genérico criado.
 *
 * Estrutura:
 * - Form.Root: Container principal do formulário
 * - Form.Title: Título do formulário
 * - Form.Subtitle: Subtítulo/descrição do formulário
 * - Form.Content: Container do conteúdo (recebe onSubmit e outros props de form)
 * - Form.Input: Input com label integrado (aceita prop 'icon' para adicionar ícone)
 * - Form.SendButton: Botão de envio
 */
export function RegisterForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Lógica de envio do formulário
        console.log('Form submitted!');
    };

    return (
        <Form>
            <Form.Header>
                <Form.Title>Criar nova conta</Form.Title>
                <Form.Subtitle>
                    Preencha os dados abaixo para criar sua conta
                </Form.Subtitle>
            </Form.Header>

            <Form.Content onSubmit={handleSubmit}>
                <Form.Input
                    label="Nome completo"
                    type="text"
                    placeholder="Seu nome"
                    icon={<UserIcon />}
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
                    label="CPF"
                    type="text"
                    placeholder="000.000.000-00"
                />

                <Form.Input
                    label="Telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                />

                <Form.Input
                    label="Senha"
                    type="password"
                    placeholder="••••••••"
                    icon={<LockIcon />}
                    minLength={6}
                    required
                />

                <Form.Input
                    label="Confirmar senha"
                    type="password"
                    placeholder="••••••••"
                    icon={<LockIcon />}
                    required
                />

                <Form.SendButton>Criar Conta</Form.SendButton>
            </Form.Content>
        </Form>
    );
}
