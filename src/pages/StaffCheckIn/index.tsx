import { useState } from 'react';
import {
    QrCode,
    CheckCircle,
    XCircle,
    Users,
    Clock,
    Search,
    AlertCircle,
    ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';
import styles from './styles.module.css';

interface CheckInRecord {
    id: string;
    ticketId: string;
    buyerName: string;
    ticketType: string;
    checkInTime: string;
    staffMember: string;
    manualEntry: boolean;
}

interface EventStats {
    totalTickets: number;
    checkedIn: number;
    pending: number;
    percentageCheckedIn: number;
}

const MOCK_EVENT = {
    id: '1',
    name: 'Festival de Música Eletrônica 2025',
    date: '2025-12-15',
    location: 'Estádio Nacional, São Paulo',
    doors: '18:00',
    start: '20:00',
};

const MOCK_STATS: EventStats = {
    totalTickets: 500,
    checkedIn: 327,
    pending: 173,
    percentageCheckedIn: 65.4,
};

const MOCK_RECENT_CHECKINS: CheckInRecord[] = [
    {
        id: '1',
        ticketId: 'TKT-001234',
        buyerName: 'João Silva',
        ticketType: 'Pista',
        checkInTime: new Date().toISOString(),
        staffMember: 'Maria Santos',
        manualEntry: false,
    },
    {
        id: '2',
        ticketId: 'TKT-001235',
        buyerName: 'Ana Costa',
        ticketType: 'VIP',
        checkInTime: new Date(Date.now() - 120000).toISOString(),
        staffMember: 'Maria Santos',
        manualEntry: false,
    },
    {
        id: '3',
        ticketId: 'TKT-001236',
        buyerName: 'Carlos Oliveira',
        ticketType: 'Camarote',
        checkInTime: new Date(Date.now() - 240000).toISOString(),
        staffMember: 'Pedro Lima',
        manualEntry: true,
    },
];

export function StaffCheckIn({ onBack }: { onBack: () => void }) {
    const [qrCode, setQrCode] = useState('');
    const [stats, setStats] = useState<EventStats>(MOCK_STATS);
    const [recentCheckIns, setRecentCheckIns] = useState<CheckInRecord[]>(
        MOCK_RECENT_CHECKINS
    );
    const [isScanning, setIsScanning] = useState(false);

    // Modal state
    const [isManualModalOpen, setIsManualModalOpen] = useState(false);
    const [manualForm, setManualForm] = useState({ buyerName: '', ticketId: '' });

    const handleScanQRCode = (code: string) => {
        setIsScanning(true);

        // Simular validação
        setTimeout(() => {
            const isValid = Math.random() > 0.2; // 80% de chance de ser válido
            const wasUsed = Math.random() > 0.9; // 10% de chance de já ter sido usado

            if (wasUsed) {
                toast.error('Ingresso já utilizado!', {
                    description: 'Este ingresso já fez check-in anteriormente.',
                });
            } else if (isValid) {
                const newCheckIn: CheckInRecord = {
                    id: Date.now().toString(),
                    ticketId: code,
                    buyerName: 'Novo Participante',
                    ticketType: ['Pista', 'VIP', 'Camarote'][
                        Math.floor(Math.random() * 3)
                    ],
                    checkInTime: new Date().toISOString(),
                    staffMember: 'Maria Santos',
                    manualEntry: false,
                };

                setRecentCheckIns([newCheckIn, ...recentCheckIns]);
                setStats({
                    ...stats,
                    checkedIn: stats.checkedIn + 1,
                    pending: stats.pending - 1,
                    percentageCheckedIn:
                        ((stats.checkedIn + 1) / stats.totalTickets) * 100,
                });

                toast.success('Check-in realizado com sucesso!', {
                    description: `${newCheckIn.buyerName} - ${newCheckIn.ticketType}`,
                });
            } else {
                toast.error('QR Code inválido!', {
                    description:
                        'Este código não pertence a um ingresso válido.',
                });
            }

            setQrCode('');
            setIsScanning(false);
        }, 1000);
    };

    const handleManualEntrySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { buyerName, ticketId } = manualForm;

        if (buyerName && ticketId) {
            const newCheckIn: CheckInRecord = {
                id: Date.now().toString(),
                ticketId: ticketId,
                buyerName: buyerName,
                ticketType: 'Pista',
                checkInTime: new Date().toISOString(),
                staffMember: 'Maria Santos',
                manualEntry: true,
            };

            setRecentCheckIns([newCheckIn, ...recentCheckIns]);
            setStats({
                ...stats,
                checkedIn: stats.checkedIn + 1,
                pending: stats.pending - 1,
                percentageCheckedIn:
                    ((stats.checkedIn + 1) / stats.totalTickets) * 100,
            });

            toast.success('Entrada manual autorizada!', {
                description: `${buyerName} - Entrada liberada pela equipe`,
            });

            setIsManualModalOpen(false);
            setManualForm({ buyerName: '', ticketId: '' });
        }
    };

    return (
        <div className={styles.containerMain}>
            <div className={styles.contentWrapper}>
                <button onClick={onBack} className={styles.backButton}>
                    <ArrowLeft size={20} />
                    Voltar
                </button>

                {/* Cabeçalho do Evento */}
                <div className={styles.eventHeaderCard}>
                    <h1 className={styles.eventTitle}>{MOCK_EVENT.name}</h1>
                    <p className={styles.eventDescription}>
                        {new Date(MOCK_EVENT.date).toLocaleDateString('pt-BR')} •{' '}
                        {MOCK_EVENT.location}
                    </p>
                    <div className={styles.eventTimeInfo}>
                        <div className={styles.timeItem}>
                            <Clock size={16} />
                            Abertura: {MOCK_EVENT.doors}
                        </div>
                        <div className={styles.timeItem}>
                            Início: {MOCK_EVENT.start}
                        </div>
                    </div>
                </div>

                {/* Estatísticas em Tempo Real */}
                <div className={styles.statsGrid}>
                    <div className={styles.statsCard}>
                        <div className={styles.statsCardHeader}>
                            <span className={styles.statsCardTitle}>
                                Total de Ingressos
                            </span>
                            <Users size={16} className={styles.statsCardIconGray} />
                        </div>
                        <div className={styles.statsCardValue}>
                            {stats.totalTickets}
                        </div>
                    </div>

                    <div className={styles.statsCard}>
                        <div className={styles.statsCardHeader}>
                            <span className={styles.statsCardTitle}>
                                Check-ins Realizados
                            </span>
                            <CheckCircle size={16} className={styles.statsCardIconGreen} />
                        </div>
                        <div>
                            <div className={styles.statsCardValueGreen}>
                                {stats.checkedIn}
                            </div>
                            <p className={styles.statsCardSubtext}>
                                {stats.percentageCheckedIn.toFixed(1)}% do total
                            </p>
                        </div>
                    </div>

                    <div className={styles.statsCard}>
                        <div className={styles.statsCardHeader}>
                            <span className={styles.statsCardTitle}>Pendentes</span>
                            <Clock size={16} className={styles.statsCardIconAmber} />
                        </div>
                        <div className={styles.statsCardValueAmber}>
                            {stats.pending}
                        </div>
                    </div>

                    <div className={styles.statsCard}>
                        <div className={styles.statsCardHeader}>
                            <span className={styles.statsCardTitle}>
                                Taxa de Ocupação
                            </span>
                        </div>
                        <div>
                            <div className={styles.statsCardValue}>
                                {stats.percentageCheckedIn.toFixed(1)}%
                            </div>
                            <div className={styles.progressBarBg}>
                                <div
                                    className={styles.progressBarFill}
                                    style={{
                                        width: `${stats.percentageCheckedIn}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.mainGrid}>
                    {/* Scanner de QR Code */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>
                                <QrCode size={20} />
                                Validar QR Code
                            </h2>
                            <p className={styles.cardDescription}>
                                Escaneie ou digite o código do ingresso
                            </p>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.alertPrimary}>
                                <AlertCircle size={16} className={styles.alertIcon} />
                                <span className={styles.alertText}>
                                    Digite o código ou use um leitor de QR Code para validar
                                    os ingressos
                                </span>
                            </div>

                            <div className={styles.scannerActions}>
                                <div className={styles.inputGroup}>
                                    <input
                                        type="text"
                                        placeholder="Digite ou escaneie o código QR"
                                        className={styles.input}
                                        value={qrCode}
                                        onChange={(e) => setQrCode(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && qrCode) {
                                                handleScanQRCode(qrCode);
                                            }
                                        }}
                                        disabled={isScanning}
                                    />
                                    <button
                                        className={styles.btnPrimary}
                                        onClick={() => handleScanQRCode(qrCode)}
                                        disabled={!qrCode || isScanning}
                                    >
                                        {isScanning ? 'Validando...' : 'Validar'}
                                    </button>
                                </div>

                                <div className={styles.divider}>
                                    <span className={styles.dividerLine} />
                                    <span className={styles.dividerText}>ou</span>
                                    <span className={styles.dividerLine} />
                                </div>

                                <button
                                    className={styles.btnOutline}
                                    onClick={() => setIsManualModalOpen(true)}
                                >
                                    <AlertCircle size={16} />
                                    Autorizar Entrada Manual
                                </button>
                            </div>

                            {/* Simulador de Câmera */}
                            <div className={styles.cameraSimulator}>
                                <QrCode size={64} className={styles.cameraIcon} />
                                <p className={styles.cameraText}>
                                    Área de escaneamento do QR Code
                                </p>
                                <p className={styles.cameraSubtext}>
                                    Use a câmera do dispositivo para escanear
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Check-ins Recentes */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>
                                <CheckCircle size={20} />
                                Check-ins Recentes
                            </h2>
                            <p className={styles.cardDescription}>
                                Últimas entradas validadas
                            </p>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.recentCheckInsList}>
                                {recentCheckIns.map((checkIn) => (
                                    <div
                                        key={checkIn.id}
                                        className={styles.checkInItem}
                                    >
                                        <div className={styles.checkInDetails}>
                                            <div className={styles.checkInTitleRow}>
                                                <span className={styles.buyerName}>
                                                    {checkIn.buyerName}
                                                </span>
                                                {checkIn.manualEntry && (
                                                    <span className={styles.badgeSecondary}>
                                                        Manual
                                                    </span>
                                                )}
                                            </div>
                                            <div className={styles.checkInMeta}>
                                                {checkIn.ticketType} • {checkIn.ticketId}
                                            </div>
                                            <div className={styles.checkInTime}>
                                                {new Date(
                                                    checkIn.checkInTime
                                                ).toLocaleTimeString('pt-BR')}
                                            </div>
                                        </div>
                                        <CheckCircle
                                            size={20}
                                            className={styles.checkInIconSuccess}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buscar Ingresso Específico */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>
                            <Search size={20} />
                            Buscar Ingresso
                        </h2>
                        <p className={styles.cardDescription}>
                            Procure um ingresso específico por ID ou nome do comprador
                        </p>
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.searchGroup}>
                            <input
                                type="text"
                                placeholder="Digite o ID do ingresso ou nome do comprador"
                                className={styles.inputSearch}
                            />
                            <button className={styles.btnPrimary}>
                                <Search size={16} />
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Entrada Manual */}
            {isManualModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContainer}>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>
                                Autorizar Entrada Manual
                            </h3>
                            <button
                                className={styles.modalCloseButton}
                                onClick={() => setIsManualModalOpen(false)}
                            >
                                <XCircle size={20} />
                            </button>
                        </div>
                        <form
                            onSubmit={handleManualEntrySubmit}
                            className={styles.modalBody}
                        >
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Nome do comprador
                                </label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    value={manualForm.buyerName}
                                    onChange={(e) =>
                                        setManualForm({
                                            ...manualForm,
                                            buyerName: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    ID do ingresso
                                </label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    value={manualForm.ticketId}
                                    onChange={(e) =>
                                        setManualForm({
                                            ...manualForm,
                                            ticketId: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className={styles.modalFooter}>
                                <button
                                    type="button"
                                    className={styles.btnOutline}
                                    onClick={() => setIsManualModalOpen(false)}
                                    style={{ width: 'auto' }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className={styles.btnPrimary}
                                >
                                    Autorizar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
