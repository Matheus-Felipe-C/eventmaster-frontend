import { LockIcon } from 'lucide-react';
import { Form } from '../../components/Form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './style.module.css';
import { notify } from '../../adapters/toastHotAdapter';
import { useNavigate } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';

const newPasswordSchema = z
    .object({
        password: z
            .string()
            .min(6, 'A senha precisa ter no mínimo 6 caracteres')
            .max(30, 'A senha precisa ter no máximo 30 caracteres'),
        confirmPassword: z
            .string()
            .min(1, 'A confirmação de senha é obrigatória'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
    });

type NewPasswordFields = z.infer<typeof newPasswordSchema>;

export function NewPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewPasswordFields>({
        resolver: zodResolver(newPasswordSchema),
    });

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<NewPasswordFields> = async (data) => {
        // TODO: chamada à API para salvar a nova senha
        console.log(data);
        notify.success('Senha redefinida com sucesso!');
        navigate(PageRoutesName.auth.login);
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.cardWrapper}>
                <button
                    className={styles.backButton}
                    onClick={() => navigate(-1)}
                    type="button"
                >
                    ← Voltar
                </button>
                <Form>
                    <Form.Header>
                        <Form.Title children="Redefinição de Senha" />
                    </Form.Header>

                    <Form.Content onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.group}>
                            <Form.Input
                                {...register('password')}
                                label="Nova Senha"
                                type="password"
                                placeholder="••••••••"
                                icon={<LockIcon />}
                            />
                            {errors.password?.message && (
                                <p className={styles.error}>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className={styles.group}>
                            <Form.Input
                                {...register('confirmPassword')}
                                label="Confirmar a nova Senha"
                                type="password"
                                placeholder="••••••••"
                                icon={<LockIcon />}
                            />
                            {errors.confirmPassword?.message && (
                                <p className={styles.error}>
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <Form.SendButton>Confirmar</Form.SendButton>
                    </Form.Content>
                </Form>
            </div>
        </div>
    );
}
