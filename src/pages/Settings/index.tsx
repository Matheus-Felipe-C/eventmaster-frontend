import { useState } from 'react';
import {
    User,
    Bell,
    CreditCard,
    Palette,
    Globe,
    Shield,
    X,
    Plus,
    Trash2,
    Check,
} from 'lucide-react';
import styles from './styles.module.css';

interface SettingsProps {
    onBack: () => void;
    userEmail?: string;
    onLogout?: () => void;
}

export function Settings({ onBack, userEmail, onLogout }: SettingsProps) {
    const [currentTab, setCurrentTab] = useState('profile');

    const [profile, setProfile] = useState({
        name: 'João Silva',
        email: userEmail || 'joao.silva@email.com',
        phone: '+55 11 98765-4321',
        bio: 'Apaixonado por eventos de música e tecnologia.',
        avatar: null as string | null,
    });
    const [cards, setCards] = useState([
        { id: 1, number: '4242', expires: '12/2025', brand: 'Visa' }
    ]);
    const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
    const [newCard, setNewCard] = useState({ number: '', expires: '', name: '', cvv: '' });
    const [favoriteCategories, setFavoriteCategories] = useState([
        'Música', 'Teatro', 'Comédia'
    ]);

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        eventReminders: true,
        promotions: true,
        newsletter: false,
    });

    const [preferences, setPreferences] = useState({
        language: 'pt-BR',
        timezone: 'America/Sao_Paulo',
        currency: 'BRL',
        theme: 'light',
    });

    const [security, setSecurity] = useState({
        twoFactorAuth: false,
        loginAlerts: true,
        sessionTimeout: '30',
    });

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Perfil atualizado com sucesso!');
    };

    const handleSaveNotifications = () => {
        alert('Preferências de notificação atualizadas!');
    };

    const handleSavePreferences = () => {
        alert('Preferências gerais atualizadas!');
    };

    const handleSaveSecurity = () => {
        alert('Configurações de segurança atualizadas!');
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({ ...profile, avatar: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddCard = (e: React.FormEvent) => {
        e.preventDefault();
        const last4 = newCard.number.slice(-4);
        setCards([...cards, { 
            id: Date.now(), 
            number: last4 || '0000', 
            expires: newCard.expires, 
            brand: 'Mastercard' 
        }]);
        setIsAddCardModalOpen(false);
        setNewCard({ number: '', expires: '', name: '', cvv: '' });
    };

    const handleRemoveCard = (id: number) => {
        setCards(cards.filter(card => card.id !== id));
    };

    const toggleCategory = (category: string) => {
        setFavoriteCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category) 
                : [...prev, category]
        );
    };

    const renderToggle = (
        label: string,
        description: string,
        checked: boolean,
        onChange: (checked: boolean) => void
    ) => (
        <div className={styles.toggleRow}>
            <div className={styles.toggleInfo}>
                <label className={styles.toggleLabel}>{label}</label>
                <p className={styles.toggleDesc}>{description}</p>
            </div>
            <label className={styles.switch}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className={styles.slider}></span>
            </label>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.btnGhost} onClick={onBack}>
                    ← Voltar ao Início
                </button>
                <h1 className={styles.pageTitle}>Configurações</h1>
                <p className={styles.pageDescription}>
                    Gerencie suas preferências e configurações da conta
                </p>
            </div>

            <div className={styles.tabsContainer}>
                <div className={styles.tabsList}>
                    <button
                        className={`${styles.tabTrigger} ${currentTab === 'profile' ? styles.tabActive : ''}`}
                        onClick={() => setCurrentTab('profile')}
                    >
                        <User size={24} />
                        <span className={styles.tabText}>Meu Perfil</span>
                    </button>
                    <button
                        className={`${styles.tabTrigger} ${currentTab === 'notifications' ? styles.tabActive : ''}`}
                        onClick={() => setCurrentTab('notifications')}
                    >
                        <Bell size={24} />
                        <span className={styles.tabText}>Notificações</span>
                    </button>
                    <button
                        className={`${styles.tabTrigger} ${currentTab === 'preferences' ? styles.tabActive : ''}`}
                        onClick={() => setCurrentTab('preferences')}
                    >
                        <Palette size={24} />
                        <span className={styles.tabText}>Preferências</span>
                    </button>
                    <button
                        className={`${styles.tabTrigger} ${currentTab === 'security' ? styles.tabActive : ''}`}
                        onClick={() => setCurrentTab('security')}
                    >
                        <Shield size={24} />
                        <span className={styles.tabText}>Segurança</span>
                    </button>
                </div>

                {currentTab === 'profile' && (
                    <div className={styles.tabContent}>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>
                                    Informações Pessoais
                                </h3>
                                <p className={styles.cardDescription}>
                                    Atualize suas informações pessoais e de
                                    contato
                                </p>
                            </div>
                            <div className={styles.cardContent}>
                                <form
                                    onSubmit={handleSaveProfile}
                                    className={styles.formSpace}
                                >
                                    <div className={styles.avatarSection}>
                                        <div className={styles.avatarCircle}>
                                            {profile.avatar ? (
                                                <img src={profile.avatar} alt="Avatar" className={styles.avatarImg} />
                                            ) : (
                                                <User size={64} />
                                            )}
                                        </div>
                                        <div className={styles.avatarInfo}>
                                            <input
                                                type="file"
                                                id="avatar-upload"
                                                hidden
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                            />
                                            <button
                                                type="button"
                                                className={styles.btnOutlineSm}
                                                onClick={() => document.getElementById('avatar-upload')?.click()}
                                            >
                                                Alterar foto
                                            </button>
                                            <p className={styles.smallDesc}>
                                                JPG, GIF ou PNG. Máximo de 1MB.
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.separator} />

                                    <div className={styles.grid2}>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="name">
                                                Nome completo
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                className={styles.input}
                                                value={profile.name}
                                                onChange={(e) =>
                                                    setProfile({
                                                        ...profile,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className={styles.inputGroup}>
                                            <label htmlFor="email">
                                                E-mail
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                className={styles.input}
                                                value={profile.email}
                                                onChange={(e) =>
                                                    setProfile({
                                                        ...profile,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className={styles.inputGroup}>
                                            <label htmlFor="phone">
                                                Telefone
                                            </label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                className={styles.input}
                                                value={profile.phone}
                                                onChange={(e) =>
                                                    setProfile({
                                                        ...profile,
                                                        phone: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="bio">Biografia</label>
                                        <textarea
                                            id="bio"
                                            className={styles.textarea}
                                            value={profile.bio}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    bio: e.target.value,
                                                })
                                            }
                                            rows={3}
                                        />
                                        <p className={styles.smallDesc}>
                                            Breve descrição sobre você
                                        </p>
                                    </div>

                                    <div className={styles.actionsRight}>
                                        <button
                                            type="button"
                                            className={styles.btnOutline}
                                            onClick={onBack}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className={styles.btnPrimary}
                                        >
                                            Salvar alterações
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>
                                    Cartões Salvos
                                </h3>
                                <p className={styles.cardDescription}>
                                    Gerencie seus métodos de pagamento
                                </p>
                            </div>
                            <div className={styles.cardContent}>
                                {cards.map(card => (
                                    <div key={card.id} className={styles.savedCard}>
                                        <div className={styles.savedCardInfo}>
                                            <CreditCard
                                                size={32}
                                                className={styles.cardIcon}
                                            />
                                            <div>
                                                <div className={styles.cardNumber}>
                                                    •••• •••• •••• {card.number}
                                                </div>
                                                <div className={styles.cardExpires}>
                                                    Expira em {card.expires}
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            className={styles.btnGhostSm}
                                            onClick={() => handleRemoveCard(card.id)}
                                        >
                                            <Trash2 size={16} />
                                            Remover
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    className={styles.btnOutlineFull}
                                    onClick={() => setIsAddCardModalOpen(true)}
                                >
                                    <Plus size={18} />
                                    Adicionar novo cartão
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {currentTab === 'notifications' && (
                    <div className={styles.tabContent}>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>
                                    Preferências de Notificação
                                </h3>
                                <p className={styles.cardDescription}>
                                    Escolha como você quer receber notificações
                                </p>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.formSpace}>
                                    {renderToggle(
                                        'Notificações por e-mail',
                                        'Receba atualizações e confirmações por e-mail',
                                        notifications.emailNotifications,
                                        (checked) =>
                                            setNotifications({
                                                ...notifications,
                                                emailNotifications: checked,
                                            })
                                    )}
                                    <div className={styles.separator} />
                                    {renderToggle(
                                        'Notificações push',
                                        'Receba notificações push no navegador',
                                        notifications.pushNotifications,
                                        (checked) =>
                                            setNotifications({
                                                ...notifications,
                                                pushNotifications: checked,
                                            })
                                    )}
                                    <div className={styles.separator} />
                                    {renderToggle(
                                        'Notificações por SMS',
                                        'Receba lembretes importantes via SMS',
                                        notifications.smsNotifications,
                                        (checked) =>
                                            setNotifications({
                                                ...notifications,
                                                smsNotifications: checked,
                                            })
                                    )}
                                    <div className={styles.separator} />
                                    {renderToggle(
                                        'Lembretes de eventos',
                                        'Receba lembretes antes dos eventos',
                                        notifications.eventReminders,
                                        (checked) =>
                                            setNotifications({
                                                ...notifications,
                                                eventReminders: checked,
                                            })
                                    )}
                                    <div className={styles.separator} />
                                    {renderToggle(
                                        'Promoções e ofertas',
                                        'Receba ofertas especiais e descontos',
                                        notifications.promotions,
                                        (checked) =>
                                            setNotifications({
                                                ...notifications,
                                                promotions: checked,
                                            })
                                    )}
                                    <div className={styles.separator} />
                                    {renderToggle(
                                        'Newsletter',
                                        'Receba nossa newsletter mensal',
                                        notifications.newsletter,
                                        (checked) =>
                                            setNotifications({
                                                ...notifications,
                                                newsletter: checked,
                                            })
                                    )}
                                </div>

                                <div className={styles.actionsRight}>
                                    <button
                                        className={styles.btnPrimary}
                                        onClick={handleSaveNotifications}
                                    >
                                        Salvar preferências
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentTab === 'preferences' && (
                    <div className={styles.tabContent}>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>
                                    Preferências Gerais
                                </h3>
                                <p className={styles.cardDescription}>
                                    Personalize sua experiência no site
                                </p>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.grid2}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="language">
                                            <Globe
                                                size={16}
                                                className={styles.inlineIcon}
                                            />
                                            Idioma
                                        </label>
                                        <select
                                            id="language"
                                            className={styles.select}
                                            value={preferences.language}
                                            onChange={(e) =>
                                                setPreferences({
                                                    ...preferences,
                                                    language: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="pt-BR">
                                                Português (Brasil)
                                            </option>
                                            <option value="en-US">
                                                English (US)
                                            </option>
                                            <option value="es-ES">
                                                Español
                                            </option>
                                            <option value="fr-FR">
                                                Français
                                            </option>
                                        </select>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="timezone">
                                            Fuso horário
                                        </label>
                                        <select
                                            id="timezone"
                                            className={styles.select}
                                            value={preferences.timezone}
                                            onChange={(e) =>
                                                setPreferences({
                                                    ...preferences,
                                                    timezone: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="America/Sao_Paulo">
                                                São Paulo (BRT)
                                            </option>
                                            <option value="America/New_York">
                                                New York (EST)
                                            </option>
                                            <option value="Europe/London">
                                                London (GMT)
                                            </option>
                                            <option value="Asia/Tokyo">
                                                Tokyo (JST)
                                            </option>
                                        </select>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="currency">Moeda</label>
                                        <select
                                            id="currency"
                                            className={styles.select}
                                            value={preferences.currency}
                                            onChange={(e) =>
                                                setPreferences({
                                                    ...preferences,
                                                    currency: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="BRL">
                                                Real (R$)
                                            </option>
                                            <option value="USD">
                                                Dólar ($)
                                            </option>
                                            <option value="EUR">
                                                Euro (€)
                                            </option>
                                            <option value="GBP">
                                                Libra (£)
                                            </option>
                                        </select>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="theme">Tema</label>
                                        <select
                                            id="theme"
                                            className={styles.select}
                                            value={preferences.theme}
                                            onChange={(e) =>
                                                setPreferences({
                                                    ...preferences,
                                                    theme: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="light">Claro</option>
                                            <option value="dark">Escuro</option>
                                            <option value="auto">
                                                Automático
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.separator} />

                                <div className={styles.inputGroup}>
                                    <h3 className={styles.sectionTitle}>
                                        Categorias favoritas
                                    </h3>
                                    <div className={styles.tagList}>
                                        {[
                                            'Música',
                                            'Teatro',
                                            'Comédia',
                                            'Tecnologia',
                                            'Dança',
                                            'Esportes',
                                            'Gastronomia',
                                            'Artes',
                                        ].map((category) => (
                                            <button
                                                key={category}
                                                className={`${styles.tagBtn} ${favoriteCategories.includes(category) ? styles.tagActive : ''}`}
                                                onClick={() => toggleCategory(category)}
                                            >
                                                {category}
                                                {favoriteCategories.includes(category) && <Check size={14} className={styles.tagCheck} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.actionsRight}>
                                    <button
                                        className={styles.btnPrimary}
                                        onClick={handleSavePreferences}
                                    >
                                        Salvar preferências
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentTab === 'security' && (
                    <div className={styles.tabContent}>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>
                                    Segurança da Conta
                                </h3>
                                <p className={styles.cardDescription}>
                                    Gerencie as configurações de segurança da
                                    sua conta
                                </p>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.inputGroup}>
                                    <h3 className={styles.sectionTitle}>
                                        Alterar senha
                                    </h3>
                                    <div className={styles.formSpace}>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="current-password">
                                                Senha atual
                                            </label>
                                            <input
                                                id="current-password"
                                                type="password"
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="new-password">
                                                Nova senha
                                            </label>
                                            <input
                                                id="new-password"
                                                type="password"
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="confirm-password">
                                                Confirmar nova senha
                                            </label>
                                            <input
                                                id="confirm-password"
                                                type="password"
                                                className={styles.input}
                                            />
                                        </div>
                                        <button className={styles.btnOutline}>
                                            Alterar senha
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.separator} />

                                <div className={styles.formSpace}>
                                    {renderToggle(
                                        'Autenticação de dois fatores',
                                        'Adicione uma camada extra de segurança',
                                        security.twoFactorAuth,
                                        (checked) =>
                                            setSecurity({
                                                ...security,
                                                twoFactorAuth: checked,
                                            })
                                    )}

                                    <div className={styles.separator} />

                                    {renderToggle(
                                        'Alertas de login',
                                        'Receba alertas quando houver login de novos dispositivos',
                                        security.loginAlerts,
                                        (checked) =>
                                            setSecurity({
                                                ...security,
                                                loginAlerts: checked,
                                            })
                                    )}

                                    <div className={styles.separator} />

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="session-timeout">
                                            Tempo de sessão (minutos)
                                        </label>
                                        <select
                                            id="session-timeout"
                                            className={styles.select}
                                            value={security.sessionTimeout}
                                            onChange={(e) =>
                                                setSecurity({
                                                    ...security,
                                                    sessionTimeout:
                                                        e.target.value,
                                                })
                                            }
                                        >
                                            <option value="15">
                                                15 minutos
                                            </option>
                                            <option value="30">
                                                30 minutos
                                            </option>
                                            <option value="60">1 hora</option>
                                            <option value="120">2 horas</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.separator} />

                                <div className={styles.inputGroup}>
                                    <h3 className={styles.sectionTitle}>
                                        Sessões ativas
                                    </h3>
                                    <div className={styles.formSpace}>
                                        <div className={styles.savedCard}>
                                            <div>
                                                <div
                                                    className={styles.cardTitle}
                                                >
                                                    Chrome - Windows
                                                </div>
                                                <div
                                                    className={styles.smallDesc}
                                                >
                                                    São Paulo, Brasil • Agora
                                                </div>
                                            </div>
                                            <div className={styles.badgeGreen}>
                                                Atual
                                            </div>
                                        </div>
                                        <div className={styles.savedCard}>
                                            <div>
                                                <div
                                                    className={styles.cardTitle}
                                                >
                                                    Safari - iPhone
                                                </div>
                                                <div
                                                    className={styles.smallDesc}
                                                >
                                                    São Paulo, Brasil • 2 horas
                                                    atrás
                                                </div>
                                            </div>
                                            <button
                                                className={styles.btnGhostSm}
                                            >
                                                Encerrar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.actionsRight}>
                                    <button
                                        className={styles.btnPrimary}
                                        onClick={handleSaveSecurity}
                                    >
                                        Salvar configurações
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.cardDanger}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitleDanger}>
                                    Zona de Perigo
                                </h3>
                                <p className={styles.cardDescriptionDanger}>
                                    Ações irreversíveis relacionadas à sua conta
                                </p>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.dangerRow}>
                                    <div>
                                        <h4 className={styles.sectionTitle}>
                                            Desativar conta
                                        </h4>
                                        <p className={styles.smallDesc}>
                                            Sua conta será desativada
                                            temporariamente
                                        </p>
                                    </div>
                                    <button className={styles.btnOutline}>
                                        Desativar
                                    </button>
                                </div>
                                <div className={styles.separatorDanger} />
                                <div className={styles.dangerRow}>
                                    <div>
                                        <h4 className={styles.sectionTitle}>
                                            Excluir conta
                                        </h4>
                                        <p className={styles.smallDesc}>
                                            Excluir permanentemente sua conta e
                                            todos os dados
                                        </p>
                                    </div>
                                    <button
                                        className={styles.btnDestructive}
                                        onClick={onLogout}
                                    >
                                        Excluir conta
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {isAddCardModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h3>Novo Cartão</h3>
                            <button onClick={() => setIsAddCardModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddCard} className={styles.formSpace}>
                            <div className={styles.inputGroup}>
                                <label>Nome no cartão</label>
                                <input 
                                    type="text" 
                                    required 
                                    placeholder="Ex: JOAO SILVA"
                                    className={styles.input}
                                    value={newCard.name}
                                    onChange={e => setNewCard({...newCard, name: e.target.value})}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Número do cartão</label>
                                <input 
                                    type="text" 
                                    required 
                                    placeholder="0000 0000 0000 0000"
                                    className={styles.input}
                                    value={newCard.number}
                                    onChange={e => setNewCard({...newCard, number: e.target.value})}
                                />
                            </div>
                            <div className={styles.grid2}>
                                <div className={styles.inputGroup}>
                                    <label>Validade</label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="MM/AA"
                                        className={styles.input}
                                        value={newCard.expires}
                                        onChange={e => setNewCard({...newCard, expires: e.target.value})}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>CVV</label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="000"
                                        className={styles.input}
                                        value={newCard.cvv}
                                        onChange={e => setNewCard({...newCard, cvv: e.target.value})}
                                    />
                                </div>
                            </div>
                            <button type="submit" className={styles.btnPrimaryFull}>
                                Adicionar Cartão
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
