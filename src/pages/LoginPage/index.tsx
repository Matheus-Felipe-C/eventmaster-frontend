import { LockIcon, MailIcon } from 'lucide-react';
import { Form } from '../../components/Form';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './style.module.css';
import { AuthLayout } from '../../layouts/AuthLayout';

const registerSchema = z.object({
    email: z.email('Digite um email válido').min(1, 'Email é obrigatório'),

    password: z
        .string()
        .min(6, 'A senha precisa ter no mínimo 6 dígitos')
        .max(30, 'A senha precisa ter no máximo 30 dígitos'),
});

export function LoginPage() {
    const {
        register,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    return (
        <AuthLayout>
            <header></header>

            <Form>
                <Form.Header>
                    <Form.Title children={'Entrar na sua conta'} />
                    <Form.Subtitle
                        children={
                            'Digite suas credenciais para acessar sua conta'
                        }
                    />
                </Form.Header>

                <Form.Content>
                    <div className={styles.group}>
                        <Form.Input
                            {...register('email')}
                            label="E-mail"
                            type="email"
                            placeholder="seu@email.com"
                            icon={<MailIcon />}
                        />
                        {errors.email?.message && (
                            <p className={styles.error}>
                                {errors.email?.message}
                            </p>
                        )}
                    </div>

                    <div className={styles.group}>
                        <Form.Input
                            {...register('password')}
                            label="Senha"
                            type="password"
                            placeholder="Digite sua senha"
                            icon={<LockIcon />}
                            minLength={6}
                        />
                        {errors.password?.message && (
                            <p className={styles.error}>
                                {errors.password?.message}
                            </p>
                        )}
                    </div>

                    <Form.SendButton>Entrar</Form.SendButton>
                    {errors.root?.message && (
                        <p className={styles.error}>{errors.root?.message}</p>
                    )}
                    {isSubmitSuccessful && (
                        <p
                            style={{
                                color: 'var(--color-green-600)',
                                fontSize: 14,
                                textAlign: 'center',
                            }}
                        >
                            Login realizado com sucesso
                        </p>
                    )}
                </Form.Content>
            </Form>
        </AuthLayout>
    );
}
