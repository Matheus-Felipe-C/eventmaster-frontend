import { LockIcon, MailIcon, UserIcon } from 'lucide-react';
import { Form } from '../../components/Form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './style.module.css';
import { AuthLayout } from '../../layouts/AuthLayout';

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
            .min(6, 'A senha precisa ter no mínimo 6 dígitos')
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
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        if (data.confirmPassword === data.password) {
            try {
                //BLOCO PRA CHAMADA DA API;
            } catch (error) {
                console.log(error);
            }
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
                    {isSubmitSuccessful && (
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
