import { Building2, Mail, Phone, FileText, ArrowLeft } from 'lucide-react';

import { useNavigate } from 'react-router';
import z from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import type { apiResponseError } from '../../server/apiResponse';
import { handleApiErrors } from '../../utils/handleApiErrors';
import { requestToBecomeAnOrganizer } from '../../services/user/requestToBecomeAnOrganizer';
import { notify } from '../../adapters/toastHotAdapter';

import styles from './style.module.css';

const formOrganizerSchema = z.object({
    name: z
        .string('Você deve digitar um nome válido.')
        .min(5, 'Nome muito curto.'),
    email: z.email('Você deve digitar um email válido.'),
    phone_number: z.string().min(11, 'Digite um número valido, inclua o DDD.'),
    cpf: z
        .string()
        .min(1, 'CPF é obrigatório.')
        .transform((val) => val.replace(/\D/g, '')) // Remove máscaras
        .refine((val) => val.length === 11, 'CPF deve ter 11 dígitos.')
        .refine((val) => !/^(\d)\1{10}$/.test(val), 'CPF inválido.'),
    reason: z.string().min(10, 'Informe um motivo para se tornar organizador.'),
});

type FormFields = z.infer<typeof formOrganizerSchema>;

export function SejaOrganizadorPage() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormFields>({
        resolver: zodResolver(formOrganizerSchema),
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await requestToBecomeAnOrganizer({
                name: data.name,
                cpf: data.cpf,
                email: data.email,
                phone_number: data.phone_number,
                reason: data.reason,
            });

            notify.success(
                'Sua solicitação foi enviada com sucesso, Em algumas horas algum administrador deve lhe aprovar.'
            );

            setTimeout(() => {
                navigate(-1);
            }, 2000);
        } catch (err) {
            const error = err as AxiosError<apiResponseError>;
            console.error('Erro ao criar conta:', error);

            // Mapear erros da API para os campos do formulário

            const apiErrors = error?.response?.data?.errors;
            const fieldMap: Record<string, keyof FormFields> = {
                name: 'name',
                email: 'email',
                cpf: 'cpf',
                phone_number: 'phone_number',
                reason: 'reason',
            };
            handleApiErrors(apiErrors, setError, fieldMap);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentWrapper}>
                <button
                    onClick={() => navigate(-1)}
                    className={styles.backButton}
                >
                    <ArrowLeft size={18} />
                    Voltar
                </button>

                {/* ... (todo o resto do seu formulário continua exatamente igual) ... */}

                <div className={styles.card}>
                    {/* Apenas copiando o começo para você se achar, mantenha o resto do HTML igualzinho */}
                    <div className={styles.cardHeader}>
                        <h1 className={styles.cardTitle}>
                            <Building2 size={28} className={styles.titleIcon} />
                            Solicitação de Cadastro como Organizador
                        </h1>
                        <p className={styles.cardDescription}>
                            Preencha os dados da sua organização para solicitar
                            acesso como organizador de eventos. Nossa equipe irá
                            analisar sua solicitação em até 48 horas.
                        </p>
                    </div>

                    <div className={styles.cardContent}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={styles.form}
                        >
                            <div className={styles.formGrid}>
                                {/* Nome da Organização */}
                                <div className={styles.inputGroup}>
                                    <label
                                        htmlFor="organizationName"
                                        className={styles.label}
                                    >
                                        Nome da Organização *
                                    </label>
                                    <input
                                        {...register('name')}
                                        id="organizationName"
                                        className={styles.input}
                                        placeholder="Ex: Produtora ABC Eventos"
                                    />
                                    {errors.name?.message && (
                                        <p className={styles.error}>
                                            {errors.name?.message}
                                        </p>
                                    )}
                                </div>

                                {/* CNPJ */}
                                <div className={styles.inputGroup}>
                                    <label
                                        htmlFor="cpf"
                                        className={styles.label}
                                    >
                                        CPF *
                                    </label>
                                    <input
                                        {...register('cpf')}
                                        id="cpf"
                                        className={styles.input}
                                        placeholder="00.000.000/0000-00"
                                    />
                                    {errors.cpf?.message && (
                                        <p className={styles.error}>
                                            {errors.cpf?.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className={styles.inputGroup}>
                                    <label
                                        htmlFor="email"
                                        className={styles.label}
                                    >
                                        <Mail size={18} />
                                        Email Corporativo *
                                    </label>
                                    <input
                                        {...register('email')}
                                        id="email"
                                        type="email"
                                        className={styles.input}
                                        placeholder="contato@empresa.com.br"
                                    />
                                    {errors.email?.message && (
                                        <p className={styles.error}>
                                            {errors.email?.message}
                                        </p>
                                    )}
                                </div>

                                {/* Telefone */}
                                <div className={styles.inputGroup}>
                                    <label
                                        htmlFor="phone"
                                        className={styles.label}
                                    >
                                        <Phone size={18} />
                                        Telefone *
                                    </label>
                                    <input
                                        {...register('phone_number')}
                                        id="phone"
                                        className={styles.input}
                                        placeholder="(11) 98888-8888"
                                    />
                                    {errors.phone_number?.message && (
                                        <p className={styles.error}>
                                            {errors.phone_number?.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Descrição (Ocupa linha inteira) */}
                            <div className={styles.inputGroup}>
                                <label
                                    htmlFor="description"
                                    className={styles.label}
                                >
                                    <FileText size={18} />
                                    Descrição da Organização *
                                </label>
                                <textarea
                                    {...register('reason')}
                                    id="description"
                                    className={styles.textarea}
                                    placeholder="Conte-nos sobre seus motivos para se tornar organizador, tipos de eventos que organiza, experiência no mercado, etc."
                                    rows={5}
                                />
                                {errors.reason?.message && (
                                    <p className={styles.error}>
                                        {errors.reason?.message}
                                    </p>
                                )}
                            </div>

                            {/* Caixa de Benefícios */}
                            <div className={styles.benefitsBox}>
                                <h3 className={styles.benefitsTitle}>
                                    Benefícios como Organizador
                                </h3>
                                <ul className={styles.benefitsList}>
                                    <li>
                                        ✓ Criação e gerenciamento ilimitado de
                                        eventos
                                    </li>
                                    <li>
                                        ✓ Dashboard com análises detalhadas de
                                        vendas
                                    </li>
                                    <li>
                                        ✓ Exportação de lista de compradores
                                    </li>
                                    <li>
                                        ✓ Relatórios de receita e ocupação em
                                        tempo real
                                    </li>
                                    <li>
                                        ✓ Controle de tipos de ingressos e
                                        preços
                                    </li>
                                    <li>✓ Suporte prioritário da plataforma</li>
                                </ul>
                            </div>

                            {/* Botões de Ação */}
                            <div className={styles.actionButtons}>
                                <button
                                    type="reset"
                                    className={styles.outlineButton}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className={styles.primaryButton}
                                >
                                    Enviar Solicitação
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
