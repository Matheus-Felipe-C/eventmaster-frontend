import { LockIcon, MailIcon, UserIcon } from 'lucide-react';
import { Form } from '../../components/Form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';

import styles from './style.module.css';
import { AuthLayout } from '../../layouts/AuthLayout';
import { notify } from '../../adapters/toastHotAdapter';
import { registerUser } from '../../services/auth/registerUser';
import { handleApiErrors } from '../../utils/handleApiErrors';
import type { AxiosError } from 'axios';
import type { apiResponseError } from '../../server/apiResponse';
import { useNavigate } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';

const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, 'É necessário digitar um nome')
            .min(2, 'Nome deve ter pelo menos 2 caracteres'),

        email: z.email('Digite um email válido').min(1, 'Email é obrigatório'),

        cpf: z
            .string()
            .min(1, 'CPF é obrigatório')
            .transform((val) => val.replace(/\D/g, '')) // Remove máscaras
            .refine((val) => val.length === 11, 'CPF deve ter 11 dígitos')
            .refine((val) => !/^(\d)\1{10}$/.test(val), 'CPF inválido'),

        tel: z
            .string()
            .min(1, 'Telefone é obrigatório')
            .transform((val) => val.replace(/\D/g, ''))
            .refine(
                (val) => val.length === 10 || val.length === 11,
                'Telefone deve ter 10 ou 11 dígitos'
            )
            .refine(
                (val) => /^[1-9]{2}9?\d{8}$/.test(val),
                'Telefone inválido'
            ),

        password: z
            .string()
            .min(8, 'A senha precisa ter no mínimo 8 dígitos')
            .max(30, 'A senha precisa ter no máximo 30 dígitos'),

        confirmPassword: z
            .string()
            .min(1, 'Você precisa digitar a senha de confirmação'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
    });

type FormFields = z.infer<typeof registerSchema>;

export function RegisterPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormFields>({
        resolver: zodResolver(registerSchema),
    });

    const navigate = useNavigate();

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!isSuccess) return;

        const timeoutId = setTimeout(() => {
            navigate(PageRoutesName.auth.login);
        }, 1500);

        return () => clearTimeout(timeoutId);
    }, [isSuccess, navigate]);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await registerUser({
                cpf: data.cpf,
                email: data.email,
                name: data.name,
                password: data.password,
                password_confirmation: data.confirmPassword,
            });

            setIsSuccess(true);
            notify.success('Sua conta foi criada com sucesso, Faça login.');
        } catch (err) {
            const error = err as AxiosError<apiResponseError>;
            console.error('Erro ao criar conta:', error);

            setIsSuccess(false);

            // Mapear erros da API para os campos do formulário
            const apiErrors = error?.response?.data?.errors;
            const fieldMap: Record<string, keyof FormFields> = {
                name: 'name',
                email: 'email',
                cpf: 'cpf',
                password: 'password',
                password_confirmation: 'confirmPassword',
            };
            handleApiErrors(apiErrors, setError, fieldMap);

            const errorMessage =
                error?.response?.data?.message ||
                'Erro ao criar conta. Tente novamente.';
            notify.error(errorMessage);
        }
    };

    return (
        <AuthLayout>
            <header></header>

            <Form>
                <Form.Header>
                    <Form.Title children={'Criar nova conta'} />
                    <Form.Subtitle
                        children={
                            'Preencha os dados abaixo para criar sua conta'
                        }
                    />
                </Form.Header>

                <Form.Content onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.group}>
                        <Form.Input
                            {...register('name')}
                            label="Nome completo"
                            type="text"
                            placeholder="Seu nome"
                            icon={<UserIcon />}
                        />
                        {errors.name?.message && (
                            <p className={styles.error}>
                                {errors.name?.message}
                            </p>
                        )}
                    </div>
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
                            {...register('cpf')}
                            label="CPF"
                            type="text"
                            placeholder="000.000.000-00"
                        />
                        {errors.cpf?.message && (
                            <p className={styles.error}>
                                {errors.cpf?.message}
                            </p>
                        )}
                    </div>
                    <div className={styles.group}>
                        <Form.Input
                            {...register('tel')}
                            label="Telefone"
                            type="tel"
                            placeholder="(00) 00000-0000"
                        />
                        {errors.tel?.message && (
                            <p className={styles.error}>
                                {errors.tel?.message}
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
                    <div className={styles.group}>
                        <Form.Input
                            {...register('confirmPassword')}
                            label="Confirmar senha"
                            type="password"
                            placeholder="Repita sua senha"
                            icon={<LockIcon />}
                        />
                        {errors.confirmPassword?.message && (
                            <p className={styles.error}>
                                {errors.confirmPassword?.message}
                            </p>
                        )}
                    </div>

                    <Form.SendButton>Criar Conta</Form.SendButton>
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
                            Conta criada com sucesso
                        </p>
                    )}
                </Form.Content>
            </Form>
        </AuthLayout>
    );
}
