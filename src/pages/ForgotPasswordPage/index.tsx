import { MailIcon } from 'lucide-react';
import { Form } from '../../components/Form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './style.module.css';
import { notify } from '../../adapters/toastHotAdapter';
import { useNavigate } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';

const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, 'O e-mail é obrigatório')
        .email('Informe um e-mail válido'),
});

type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFields>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<ForgotPasswordFields> = async (data) => {
        // TODO: chamada à API para enviar e-mail de recuperação
        console.log(data);
        notify.success('E-mail de recuperação enviado!');
        navigate(PageRoutesName.auth.newPassword);
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
                        <Form.Title children="Recuperar Senha" />
                        <Form.Subtitle children="Informe seu e-mail para receber o link de recuperação." />
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
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <Form.SendButton>
                            Enviar link de recuperação
                        </Form.SendButton>
                    </Form.Content>
                </Form>
            </div>
        </div>
    );
}
