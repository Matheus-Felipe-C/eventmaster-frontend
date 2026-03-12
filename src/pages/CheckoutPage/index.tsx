import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, Lock, ShieldCheck, Ticket } from 'lucide-react';
import type { Event, TicketType } from '../../types/Event';

// 👇 Importação do CSS Module
import styles from './styles.module.css';

type EventSummary = Pick<Event, 'title' | 'price'>;
type TicketSummary = Pick<TicketType, 'name' | 'price'>;

export interface CartItem {
    event: EventSummary;
    quantity: number;
    ticketType?: TicketSummary;
}

interface CheckoutProps {
    cart?: CartItem[];
    onComplete?: () => void;
    onBack?: () => void;
}

export function CheckoutPage({
    cart: defaultCart = [
        {
            event: { title: 'Evento Exemplo', price: 0 },
            quantity: 0,
            ticketType: { name: 'Nenhum selecionado', price: 0 },
        },
    ],
    onComplete = () => alert('Compra simulada com sucesso!'),
    onBack,
}: CheckoutProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const activeCart: CartItem[] = location.state?.cart || defaultCart;

    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const subtotal = activeCart.reduce((acc, item) => {
        const price = item.ticketType
            ? item.ticketType.price
            : item.event.price;
        return acc + price * item.quantity;
    }, 0);

    const serviceFee = subtotal * 0.1;
    const total = subtotal + serviceFee;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete();
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleInternalBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    return (
        <div className={styles.pageBackground}>
            <div className={styles.container}>
                {/* Botão Voltar */}
                <button
                    onClick={handleInternalBack}
                    className={styles.backButton}
                >
                    <ArrowLeft className={styles.backIcon} />
                    Voltar
                </button>

                <h1 className={styles.pageTitle}>Finalizar Compra</h1>

                <div className={styles.mainGrid}>
                    {/* COLUNA ESQUERDA (Formulário) */}
                    <div className={styles.leftColumn}>
                        <form
                            onSubmit={handleSubmit}
                            className={styles.formContainer}
                        >
                            {/* 1. Informações Pessoais */}
                            <div className={styles.card}>
                                <h2 className={styles.cardTitle}>
                                    1. Informações Pessoais
                                </h2>

                                <div className={styles.inputGroup}>
                                    <div className={styles.inputFieldFull}>
                                        <label className={styles.label}>
                                            Nome Completo
                                        </label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            required
                                            value={formData.name}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'name',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Nome impresso no documento"
                                        />
                                    </div>

                                    <div className={styles.inputField}>
                                        <label className={styles.label}>
                                            E-mail
                                        </label>
                                        <input
                                            type="email"
                                            className={styles.input}
                                            required
                                            value={formData.email}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'email',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="seu@email.com"
                                        />
                                    </div>

                                    <div className={styles.inputField}>
                                        <label className={styles.label}>
                                            CPF
                                        </label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            required
                                            value={formData.cpf}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'cpf',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="000.000.000-00"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 2. Método de Pagamento */}
                            <div className={styles.card}>
                                <h2 className={styles.cardTitle}>
                                    2. Método de Pagamento
                                </h2>

                                <div className={styles.radioGrid}>
                                    {/* Opção Crédito */}
                                    <div
                                        className={`${styles.radioBox} ${paymentMethod === 'credit' ? styles.radioBoxSelected : ''}`}
                                        onClick={() =>
                                            setPaymentMethod('credit')
                                        }
                                    >
                                        <CreditCard
                                            className={`${styles.paymentIcon} ${paymentMethod === 'credit' ? styles.paymentIconSelected : ''}`}
                                        />
                                        <span className={styles.radioBoxText}>
                                            Cartão de Crédito
                                        </span>
                                    </div>

                                    {/* Opção PIX */}
                                    <div
                                        className={`${styles.radioBox} ${paymentMethod === 'pix' ? styles.radioBoxSelected : ''}`}
                                        onClick={() => setPaymentMethod('pix')}
                                    >
                                        <span className={styles.pixText}>
                                            PIX
                                        </span>
                                        <span className={styles.radioBoxText}>
                                            Transferência rápida
                                        </span>
                                    </div>
                                </div>

                                {/* Campos do Cartão */}
                                {paymentMethod === 'credit' && (
                                    <div className={styles.cardDetailsSection}>
                                        <div className={styles.inputFieldFull}>
                                            <label className={styles.label}>
                                                Número do Cartão
                                            </label>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                required
                                                value={formData.cardNumber}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'cardNumber',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="0000 0000 0000 0000"
                                            />
                                        </div>
                                        <div className={styles.inputRow}>
                                            <div className={styles.inputField}>
                                                <label className={styles.label}>
                                                    Validade
                                                </label>
                                                <input
                                                    type="text"
                                                    className={styles.input}
                                                    required
                                                    value={formData.expiryDate}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'expiryDate',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="MM/AA"
                                                />
                                            </div>
                                            <div className={styles.inputField}>
                                                <label className={styles.label}>
                                                    CVV
                                                </label>
                                                <input
                                                    type="text"
                                                    className={styles.input}
                                                    required
                                                    value={formData.cvv}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'cvv',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="123"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Aviso PIX */}
                                {paymentMethod === 'pix' && (
                                    <div className={styles.pixAlert}>
                                        <p className={styles.pixAlertTitle}>
                                            Pagamento via PIX
                                        </p>
                                        <p className={styles.pixAlertDesc}>
                                            O código será gerado após a
                                            confirmação.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* COLUNA DIREITA (Resumo do Pedido) */}
                    <aside className={styles.rightColumn}>
                        <div className={styles.summaryCard}>
                            <h2 className={styles.summaryTitle}>
                                Resumo do Pedido
                            </h2>

                            <div className={styles.cartItemsContainer}>
                                {activeCart.map((item, index) => (
                                    <div
                                        key={index}
                                        className={styles.cartItemBox}
                                    >
                                        <div
                                            className={
                                                styles.cartItemIconWrapper
                                            }
                                        >
                                            <Ticket
                                                className={styles.cartItemIcon}
                                            />
                                        </div>
                                        <div className={styles.cartItemInfo}>
                                            <div
                                                className={styles.cartItemTitle}
                                            >
                                                {item.event.title}
                                            </div>
                                            <div
                                                className={styles.cartItemType}
                                            >
                                                {item.ticketType?.name ||
                                                    'Ingresso Comum'}
                                            </div>
                                            <div
                                                className={styles.cartItemPrice}
                                            >
                                                {item.quantity}x R${' '}
                                                {(
                                                    item.ticketType?.price ??
                                                    item.event.price
                                                ).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.totalsContainer}>
                                <div className={styles.totalRow}>
                                    <span>Subtotal</span>
                                    <span>R$ {subtotal.toFixed(2)}</span>
                                </div>
                                <div className={styles.totalRow}>
                                    <span>Taxas</span>
                                    <span>R$ {serviceFee.toFixed(2)}</span>
                                </div>
                                <div className={styles.grandTotalRow}>
                                    <span>Total</span>
                                    <span>R$ {total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className={styles.submitButton}
                            >
                                Confirmar e Pagar
                            </button>

                            <div className={styles.securitySection}>
                                <div className={styles.securityHighlight}>
                                    <ShieldCheck
                                        className={styles.shieldIcon}
                                    />
                                    Checkout 100% Seguro
                                </div>
                                <div className={styles.securitySubtext}>
                                    <Lock className={styles.lockIcon} />
                                    Criptografia de ponta (SSL)
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
