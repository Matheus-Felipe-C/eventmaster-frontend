import { LockIcon, MailIcon } from 'lucide-react';
import { Form } from '../../components/Form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './style.module.css';
import { AuthLayout } from '../../layouts/AuthLayout';
import { notify } from '../../adapters/toastHotAdapter';
import { useNavigate } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';
import { loginUser } from '../../services/auth/loginUser';
import type { AxiosError } from 'axios';
import type { apiResponseError } from '../../server/apiResponse';
import { handleApiErrors } from '../../utils/handleApiErrors';
import { useState } from 'react';
import { getMe } from '../../services/auth/getMe';

const loginSchema = z.object({
    email: z.email('Digite um email válido').min(1, 'Email é obrigatório'),

    password: z
        .string()
        .min(8, 'A senha precisa ter no mínimo 8 dígitos')
        .max(30, 'A senha precisa ter no máximo 30 dígitos'),
});

type LoginFields = z.infer<typeof loginSchema>;

export function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginFields>({
        resolver: zodResolver(loginSchema),
    });

    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit: SubmitHandler<LoginFields> = async (data) => {
        try {
            await loginUser({
                email: data.email,
                password: data.password,
            });

            // Busca informações do usuário e salva o role antes de navegar
            await getMe();

            setIsSuccess(true);
            notify.success('Login realizado com sucesso.');
            navigate(PageRoutesName.home);
        } catch (err) {
            const error = err as AxiosError<apiResponseError>;
            setIsSuccess(false);

            // Mapear erros da API para os campos do formulário
            const apiErrors = error.response?.data?.errors;
            const fieldMap: Record<string, keyof LoginFields> = {
                email: 'email',
                password: 'password',
            };
            handleApiErrors(apiErrors, setError, fieldMap);

            const errorMessage =
                error.response?.data.message || 'Erro ao fazer login.';
            notify.error(errorMessage);
        }
    };

    return (
        <AuthLayout>
            <Form>
                <Form.Header>
                    <Form.Title children={'Entrar na sua conta'} />
                    <Form.Subtitle
                        children={
                            'Digite suas credenciais para acessar sua conta'
                        }
                    />
                </Form.Header>

                <Form.Content onSubmit={handleSubmit(onSubmit)}>
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
                        />
                        {errors.password?.message && (
                            <p className={styles.error}>
                                {errors.password?.message}
                            </p>
                        )}
                        <button
                            type="button"
                            className={styles.forgotPasswordButton}
                            onClick={() =>
                                navigate(PageRoutesName.auth.forgotPassword)
                            }
                        >
                            Esqueci minha senha
                        </button>
                    </div>

                    <Form.SendButton>Entrar</Form.SendButton>
                    {errors.root?.message && (
                        <p className={styles.error}>{errors.root?.message}</p>
                    )}
                    {isSuccess && (
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
