
import { useState } from 'react';
import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    Eye,
    Calendar,
    MapPin,
    Ticket,
    DollarSign,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { notify } from '../../adapters/toastHotAdapter';
import PageRoutesName from '../../constants/PageRoutesName';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '../../components/ui/dialog';
import styles from './style.module.css';

interface Evento {
    id: string;
    nome: string;
    categoria: string;
    descricao: string;
    data: string;
    hora: string;
    local: string;
    organizador: string;
    ingressos: number;
    preco: number;
    status: 'pendente' | 'aprovado' | 'rejeitado';
}

const EVENTOS_MOCK: Evento[] = [
    {
        id: '1',
        nome: 'Rock in Rio 2026',
        categoria: 'Música',
        descricao: 'O maior festival de música do Brasil retorna com atrações internacionais e nacionais de peso.',
        data: '14/09/2026',
        hora: '14:00',
        local: 'Cidade do Rock - Rio de Janeiro, RJ',
        organizador: 'Produtora ABC Eventos',
        ingressos: 100000,
        preco: 450,
        status: 'pendente',
    },
    {
        id: '2',
        nome: 'Stand-up Comedy Night',
        categoria: 'Teatro',
        descricao: 'Uma noite de humor com os melhores comediantes do Brasil.',
        data: '09/12/2025',
        hora: '20:00',
        local: 'Teatro Municipal - São Paulo, SP',
        organizador: 'Teatro Nacional',
        ingressos: 500,
        preco: 80,
        status: 'pendente',
    },
    {
        id: '3',
        nome: 'Conferência Tech Brasil 2026',
        categoria: 'Conferência',
        descricao: 'A maior conferência de tecnologia do país com palestrantes de empresas como Google, Amazon e Microsoft.',
        data: '19/03/2026',
        hora: '09:00',
        local: 'Centro de Convenções - Brasília, DF',
        organizador: 'Tech Events Brasil',
        ingressos: 5000,
        preco: 350,
        status: 'pendente',
    },
];

export function ApproveEventsPage() {
    const [eventos, setEventos] = useState<Evento[]>(EVENTOS_MOCK);
    const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(
        null
    );
    const navigate = useNavigate();

    const pendentes = eventos.filter((e) => e.status === 'pendente');
    const aprovados = eventos.filter((e) => e.status === 'aprovado');
    const rejeitados = eventos.filter((e) => e.status === 'rejeitado');

    const aoAprovar = (id: string) => {
        const evento = eventos.find((e) => e.id === id);
        if (!evento) return;
        setEventos((p) => p.map((e) => e.id === id ? { ...e, status: 'aprovado' } : e));
        notify.success(`"${evento.nome}" aprovado com sucesso!`);
    };

    const aoRejeitar = (id: string) => {
        const evento = eventos.find((e) => e.id === id);
        if (!evento) return;
        setEventos((p) => p.map((e) => e.id === id ? { ...e, status: 'rejeitado' } : e));
        notify.error(`"${evento.nome}" foi rejeitado.`);
    };

    const receitaEstimada = (ingressos: number, preco: number) =>
        (ingressos * preco).toLocaleString('pt-BR');

    return (
        <div className={styles.container}>
                {/* Voltar */}
                <button
                    className={styles.backButton}
                    onClick={() =>
                        navigate(PageRoutesName.administrador.adminDashboard)
                    }
                >
                    <ArrowLeft size={20} />
                    Voltar ao Dashboard
                </button>

                {/* Título */}
                <h1 className={styles.pageTitle}>Gerenciar Aprovações de Eventos</h1>
                <p className={styles.pageSubtitle}>
                    Analisar e aprovar eventos submetidos pelos organizadores
                </p>

                {/* Cards de métricas */}
                <div className={styles.metricsGrid}>
                    <div className={styles.metricCard}>
                        <div className={styles.metricHeader}>
                            <span className={styles.metricLabel}>
                                Aguardando Análise
                            </span>
                            <Eye size={20} color="#9ca3af" />
                        </div>
                        <span className={styles.metricValue}>
                            {pendentes.length}
                        </span>
                    </div>

                    <div className={styles.metricCard}>
                        <div className={styles.metricHeader}>
                            <span className={styles.metricLabel}>Aprovados</span>
                            <CheckCircle size={20} color="#16a34a" />
                        </div>
                        <span
                            className={`${styles.metricValue} ${styles.metricGreen}`}
                        >
                            {aprovados.length}
                        </span>
                    </div>

                    <div className={styles.metricCard}>
                        <div className={styles.metricHeader}>
                            <span className={styles.metricLabel}>
                                Rejeitados
                            </span>
                            <XCircle size={20} color="#dc2626" />
                        </div>
                        <span
                            className={`${styles.metricValue} ${styles.metricRed}`}
                        >
                            {rejeitados.length}
                        </span>
                    </div>
                </div>

                {/* Lista de eventos pendentes */}
                <div className={styles.listSection}>
                    <h2 className={styles.listTitle}>Eventos Pendentes de Aprovação</h2>
                    <p className={styles.listSubtitle}>
                        Revise os detalhes e aprove ou rejeite os eventos submetidos
                    </p>

                    <div className={styles.eventosList}>
                        {pendentes.length === 0 && (
                            <p className={styles.emptyMessage}>
                                Nenhum evento aguardando aprovação.
                            </p>
                        )}
                        {pendentes.map((evento) => (
                            <div key={evento.id} className={styles.eventoCard}>
                                {/* Nome e categoria */}
                                <div className={styles.eventoHeader}>
                                    <span className={styles.eventoNome}>{evento.nome}</span>
                                    <span className={styles.categoriaBadge}>
                                        {evento.categoria}
                                    </span>
                                </div>

                                {/* Descrição */}
                                <p className={styles.eventoDesc}>
                                    {evento.descricao}
                                </p>

                                {/* Data e local */}
                                <div className={styles.eventoMeta}>
                                    <div className={styles.metaItem}>
                                        <Calendar size={18} color="#6b7280" />
                                        <span>
                                            {evento.data} às {evento.hora}
                                        </span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <MapPin size={18} color="#6b7280" />
                                        <span>{evento.local}</span>
                                    </div>
                                </div>

                                {/* Grid de infos */}
                                <div className={styles.eventoInfoGrid}>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Organizador</span>
                                        <span className={styles.infoValue}>{evento.organizador}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>
                                            Ingressos
                                        </span>
                                        <span className={styles.infoValue}>
                                            <Ticket size={18} />{' '}
                                            {evento.ingressos.toLocaleString(
                                                'pt-BR'
                                            )}
                                        </span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>
                                            Preço
                                        </span>
                                        <span className={styles.infoValue}>
                                            <DollarSign size={18} /> R${' '}
                                            {evento.preco}
                                        </span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Receita Estimada</span>
                                        <span className={`${styles.infoValue} ${styles.receitaValue}`}>
                                            R$ {receitaEstimada(evento.ingressos, evento.preco)}
                                        </span>
                                    </div>
                                </div>

                                {/* Ações */}
                                <div className={styles.eventoActions}>
                                    <button
                                        className={styles.btnDetalhes}
                                        onClick={() =>
                                            setEventoSelecionado(evento)
                                        }
                                    >
                                        <Eye size={18} /> Ver Detalhes
                                    </button>
                                    <button
                                        className={styles.btnRejeitar}
                                        onClick={() => aoRejeitar(evento.id)}
                                    >
                                        <XCircle size={18} /> Rejeitar
                                    </button>
                                    <button
                                        className={styles.btnAprovar}
                                        onClick={() => aoAprovar(evento.id)}
                                    >
                                        <CheckCircle size={18} /> Aprovar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal de Detalhes */}
                <Dialog
                    open={!!eventoSelecionado}
                    onOpenChange={() => setEventoSelecionado(null)}
                >
                    <DialogContent className={styles.dialogContent}>
                        <DialogHeader>
                            <DialogTitle className={styles.dialogTitle}>
                                Detalhes do Evento
                            </DialogTitle>
                            <DialogDescription className={styles.dialogDesc}>
                                Informações completas para aprovação
                            </DialogDescription>
                        </DialogHeader>

                        {eventoSelecionado && (
                            <div className={styles.dialogBody}>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>Nome</span>
                                    <span className={styles.detailValue}>
                                        {eventoSelecionado.nome}
                                    </span>
                                </div>

                                <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>
                                        Descrição
                                    </span>
                                    <div className={styles.descBox}>
                                        <p className={styles.descText}>
                                            {eventoSelecionado.descricao}
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.dialogGrid}>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>
                                            Organizador
                                        </span>
                                        <span className={styles.detailValue}>
                                            {eventoSelecionado.organizador}
                                        </span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>
                                            Local
                                        </span>
                                        <span className={styles.detailValue}>
                                            {eventoSelecionado.local}
                                        </span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>
                                            Data e Hora
                                        </span>
                                        <span className={styles.detailValue}>
                                            {eventoSelecionado.data} às{' '}
                                            {eventoSelecionado.hora}
                                        </span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>
                                            Preço
                                        </span>
                                        <span className={styles.detailValue}>
                                            R$ {eventoSelecionado.preco}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.dialogFooter}>
                                    <DialogClose asChild>
                                        <button
                                            className={styles.dialogBtnClose}
                                            onClick={() =>
                                                setEventoSelecionado(null)
                                            }
                                        >
                                            Fechar
                                        </button>
                                    </DialogClose>
                                    <button
                                        className={styles.btnRejeitar}
                                        onClick={() => {
                                            aoRejeitar(eventoSelecionado.id);
                                            setEventoSelecionado(null);
                                        }}
                                    >
                                        <XCircle size={18} /> Rejeitar
                                    </button>
                                    <button
                                        className={styles.btnAprovar}
                                        onClick={() => {
                                            aoAprovar(eventoSelecionado.id);
                                            setEventoSelecionado(null);
                                        }}
                                    >
                                        <CheckCircle size={18} /> Aprovar
                                    </button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
    );
}