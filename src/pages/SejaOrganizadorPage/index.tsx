import { useState } from 'react';
import { Building2, Mail, Phone, FileText, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

import styles from './style.module.css';
import { useNavigate } from 'react-router';

export function SejaOrganizadorPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        organizationName: '',
        email: '',
        phone: '',
        cnpj: '',
        description: '',
        website: '',
        address: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validação básica
        if (
            !formData.organizationName ||
            !formData.email ||
            !formData.phone ||
            !formData.cnpj
        ) {
            toast.error('Preencha todos os campos obrigatórios');
            return;
        }

        toast.success(
            'Solicitação enviada com sucesso! Aguarde a análise dos administradores.'
        );

        // Reseta o formulário
        setFormData({
            organizationName: '',
            email: '',
            phone: '',
            cnpj: '',
            description: '',
            website: '',
            address: '',
        });

        setTimeout(() => {
            navigate(-1);
        }, 2000);
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentWrapper}>
                <button
                    onClick={() => navigate(-1)}
                    className={styles.ghostButton}
                >
                    <ArrowLeft size={16} />
                    Voltar
                </button>

                {/* ... (todo o resto do seu formulário continua exatamente igual) ... */}

                <div className={styles.card}>
                    {/* Apenas copiando o começo para você se achar, mantenha o resto do HTML igualzinho */}
                    <div className={styles.cardHeader}>
                        <h1 className={styles.cardTitle}>
                            <Building2 size={24} className={styles.titleIcon} />
                            Solicitação de Cadastro como Organizador
                        </h1>
                        <p className={styles.cardDescription}>
                            Preencha os dados da sua organização para solicitar
                            acesso como organizador de eventos. Nossa equipe irá
                            analisar sua solicitação em até 48 horas.
                        </p>
                    </div>

                    <div className={styles.cardContent}>
                        <form onSubmit={handleSubmit} className={styles.form}>
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
                                        id="organizationName"
                                        className={styles.input}
                                        value={formData.organizationName}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                organizationName:
                                                    e.target.value,
                                            })
                                        }
                                        placeholder="Ex: Produtora ABC Eventos"
                                        required
                                    />
                                </div>

                                {/* CNPJ */}
                                <div className={styles.inputGroup}>
                                    <label
                                        htmlFor="cnpj"
                                        className={styles.label}
                                    >
                                        CNPJ *
                                    </label>
                                    <input
                                        id="cnpj"
                                        className={styles.input}
                                        value={formData.cnpj}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                cnpj: e.target.value,
                                            })
                                        }
                                        placeholder="00.000.000/0000-00"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className={styles.inputGroup}>
                                    <label
                                        htmlFor="email"
                                        className={styles.label}
                                    >
                                        <Mail size={16} />
                                        Email Corporativo *
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        className={styles.input}
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder="contato@empresa.com.br"
                                        required
                                    />
                                </div>

                                {/* Telefone */}
                                <div className={styles.inputGroup}>
                                    <label
                                        htmlFor="phone"
                                        className={styles.label}
                                    >
                                        <Phone size={16} />
                                        Telefone *
                                    </label>
                                    <input
                                        id="phone"
                                        className={styles.input}
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                phone: e.target.value,
                                            })
                                        }
                                        placeholder="(11) 98888-8888"
                                        required
                                    />
                                </div>

                                {/* Website */}
                                <div className={styles.inputGroup}>
                                    <label
                                        htmlFor="website"
                                        className={styles.label}
                                    >
                                        Website (opcional)
                                    </label>
                                    <input
                                        id="website"
                                        className={styles.input}
                                        value={formData.website}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                website: e.target.value,
                                            })
                                        }
                                        placeholder="https://www.seusite.com.br"
                                    />
                                </div>

                                {/* Endereço */}
                                <div className={styles.inputGroup}>
                                    <label
                                        htmlFor="address"
                                        className={styles.label}
                                    >
                                        Endereço
                                    </label>
                                    <input
                                        id="address"
                                        className={styles.input}
                                        value={formData.address}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                address: e.target.value,
                                            })
                                        }
                                        placeholder="Rua, número, cidade - UF"
                                    />
                                </div>
                            </div>

                            {/* Descrição (Ocupa linha inteira) */}
                            <div className={styles.inputGroup}>
                                <label
                                    htmlFor="description"
                                    className={styles.label}
                                >
                                    <FileText size={16} />
                                    Descrição da Organização
                                </label>
                                <textarea
                                    id="description"
                                    className={styles.textarea}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    placeholder="Conte-nos sobre sua empresa, tipos de eventos que organiza, experiência no mercado, etc."
                                    rows={5}
                                />
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
                                    type="button"
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
