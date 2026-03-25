import { useEffect, useState } from 'react';
import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    Eye,
    Mail,
    Phone,
    FileText,
    Building2,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '../../components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '../../components/ui/dialog';
import { toast } from 'sonner';
import styles from './styles.module.css';
import { useQuery } from '@tanstack/react-query';
import { getAllOrganizersRequest } from '../../services/admin/getAllOrganizersRequest';
import { useGetMe } from '../../hooks/useGetMe';
import { getLocalStorageRole } from '../../utils/localStorageRole';
import { useNavigate } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';
import { notify } from '../../adapters/toastHotAdapter';
import type { AxiosError } from 'axios';

interface SolicitacaoOrganizador {
    id: string;
    nomeOrganizacao: string;
    email: string;
    telefone: string;
    cnpj: string;
    descricao: string;
    site: string;
    endereco: string;
    dataSolicitacao: string;
    status: 'pendente' | 'aprovado' | 'rejeitado';
}
interface Organizador {
    id: string;
    nomeOrganizacao: string;
    email: string;
    telefone: string;
    cnpj: string;
    dataAprovacao: string;
    totalEventos: number;
    receitaTotal: number;
    status: 'ativo' | 'suspenso';
}

const SOLICITACOES_MOCK: SolicitacaoOrganizador[] = [
    {
        id: '1',
        nomeOrganizacao: 'Produtora ABC Eventos',
        email: 'contato@abceventos.com.br',
        telefone: '(11) 98888-8888',
        cnpj: '12.345.678/0001-90',
        descricao:
            'Produtora especializada em eventos corporativos e festivais de música eletrônica com mais de 10 anos de experiência no mercado.',
        site: 'https://www.abceventos.com.br',
        endereco: 'Av. Paulista, 1000 - São Paulo, SP',
        dataSolicitacao: '2025-11-20',
        status: 'pendente',
    },
    {
        id: '2',
        nomeOrganizacao: 'Teatro Nacional',
        email: 'admin@teatronacional.com',
        telefone: '(21) 97777-7777',
        cnpj: '98.765.432/0001-10',
        descricao:
            'Teatro com 50 anos de história, focado em espetáculos culturais e peças clássicas.',
        site: 'https://www.teatronacional.com',
        endereco: 'Centro - Rio de Janeiro, RJ',
        dataSolicitacao: '2025-11-18',
        status: 'pendente',
    },
];

const ORGANIZADORES_MOCK: Organizador[] = [
    {
        id: '1',
        nomeOrganizacao: 'Live Nation Brasil',
        email: 'contato@livenation.com.br',
        telefone: '(11) 99999-9999',
        cnpj: '11.111.111/0001-11',
        dataAprovacao: '2025-01-15',
        totalEventos: 45,
        receitaTotal: 1250000,
        status: 'ativo',
    },
    {
        id: '2',
        nomeOrganizacao: 'Rock World',
        email: 'info@rockworld.com.br',
        telefone: '(11) 98888-8888',
        cnpj: '22.222.222/0001-22',
        dataAprovacao: '2025-03-10',
        totalEventos: 28,
        receitaTotal: 850000,
        status: 'ativo',
    },
];

const Detail = ({
    label,
    value,
    className = '',
}: {
    label: string;
    value: string;
    className?: string;
}) => (
    <div className={`${styles.detailWrapper} ${className}`}>
        <label className={styles.detailLabel}>{label}</label>
        <div className={styles.detailValue}>{value}</div>
    </div>
);

export function ManageOrganizersPage({ onBack }: { onBack: () => void }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (getLocalStorageRole() !== 'ADMIN') {
            notify.error('Você não tem acesso a pagina de Administrador.');
            navigate(PageRoutesName.home);
        }
    }, []);

    const { data: user } = useGetMe();

    const { data: allOrganizers } = useQuery({
        queryKey: ['organizersRequest'],
        queryFn: getAllOrganizersRequest,
        enabled: () => user?.role !== 'admin',
        retry: (failureCount, error) => {
            const status = (error as AxiosError).response?.status;

            if (status === 401 || status === 403) {
                return false;
            }

            return failureCount < 2;
        },
    });

    useEffect(() => {}, [allOrganizers]);

    const [solicitacoes, setSolicitacoes] =
        useState<SolicitacaoOrganizador[]>(SOLICITACOES_MOCK);
    const [organizadores, setOrganizadores] =
        useState<Organizador[]>(ORGANIZADORES_MOCK);
    const [solicitacaoSelecionada, setSolicitacaoSelecionada] =
        useState<SolicitacaoOrganizador | null>(null);
    const [abaAtual, setAbaAtual] = useState('pendentes');

    const pendentes = solicitacoes.filter((s) => s.status === 'pendente');
    const historico = solicitacoes.filter((s) => s.status !== 'pendente');

    const aoAprovar = (id: string) => {
        const item = solicitacoes.find((s) => s.id === id);
        if (!item) return;
        setSolicitacoes((p) =>
            p.map((s) => (s.id === id ? { ...s, status: 'aprovado' } : s))
        );
        setOrganizadores((p) => [
            {
                id: crypto.randomUUID(),
                nomeOrganizacao: item.nomeOrganizacao,
                email: item.email,
                telefone: item.telefone,
                cnpj: item.cnpj,
                dataAprovacao: new Date().toISOString().split('T')[0],
                totalEventos: 0,
                receitaTotal: 0,
                status: 'ativo',
            },
            ...p,
        ]);
        setSolicitacaoSelecionada(null);
        toast.success(`${item.nomeOrganizacao} foi aprovado!`);
    };

    const aoRejeitar = (id: string) => {
        const item = solicitacoes.find((s) => s.id === id);
        if (!item) return;
        setSolicitacoes((p) =>
            p.map((s) => (s.id === id ? { ...s, status: 'rejeitado' } : s))
        );
        setSolicitacaoSelecionada(null);
        toast.info(`Solicitação de ${item.nomeOrganizacao} rejeitada.`);
    };

    const toggleStatus = (id: string, isAtivo: boolean) => {
        if (isAtivo && !confirm('Deseja suspender este organizador?')) return;
        setOrganizadores((p) =>
            p.map((o) =>
                o.id === id
                    ? { ...o, status: isAtivo ? 'suspenso' : 'ativo' }
                    : o
            )
        );
        toast[isAtivo ? 'info' : 'success'](
            isAtivo ? 'Organizador suspenso.' : 'Organizador reativado.'
        );
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.headerSection}>
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        className={styles.backButton}
                    >
                        <ArrowLeft className={styles.backIcon} /> Voltar ao
                        Dashboard
                    </Button>
                    <h1 className={styles.pageTitle}>
                        Gerenciar Organizadores
                    </h1>
                    <p className={styles.pageSubtitle}>
                        Aprovar solicitações e gerenciar organizadores ativos
                    </p>
                </div>

                <Tabs value={abaAtual} onValueChange={setAbaAtual}>
                    <TabsList className={styles.tabsList}>
                        <TabsTrigger
                            value="pendentes"
                            className={styles.tabTriggerScaled}
                        >
                            Solicitações ({pendentes.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="ativos"
                            className={styles.tabTriggerScaled}
                        >
                            Organizadores Ativos (
                            {
                                organizadores.filter(
                                    (o) => o.status === 'ativo'
                                ).length
                            }
                            )
                        </TabsTrigger>
                        <TabsTrigger
                            value="historico"
                            className={styles.tabTriggerScaled}
                        >
                            Histórico
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pendentes">
                        <div className={styles.gridContainer}>
                            {pendentes.map((s) => (
                                <Card key={s.id} className={styles.cardHover}>
                                    <CardHeader>
                                        <div className={styles.cardHeaderFlex}>
                                            <div>
                                                <CardTitle
                                                    className={styles.cardTitle}
                                                >
                                                    <Building2
                                                        className={
                                                            styles.iconSize5
                                                        }
                                                    />{' '}
                                                    {s.nomeOrganizacao}
                                                </CardTitle>
                                                <CardDescription
                                                    className={styles.cardDesc}
                                                >
                                                    Solicitado em{' '}
                                                    {new Date(
                                                        s.dataSolicitacao
                                                    ).toLocaleDateString(
                                                        'pt-BR'
                                                    )}
                                                </CardDescription>
                                            </div>
                                            <Badge variant="secondary">
                                                Pendente
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent
                                        className={styles.cardContentSpace}
                                    >
                                        <div className={styles.infoList}>
                                            <div className={styles.infoItem}>
                                                <Mail
                                                    className={styles.iconSize4}
                                                />{' '}
                                                {s.email}
                                            </div>
                                            <div className={styles.infoItem}>
                                                <Phone
                                                    className={styles.iconSize4}
                                                />{' '}
                                                {s.telefone}
                                            </div>
                                            <div className={styles.infoItem}>
                                                <FileText
                                                    className={styles.iconSize4}
                                                />{' '}
                                                CNPJ: {s.cnpj}
                                            </div>
                                        </div>
                                        <div className={styles.actionButtons}>
                                            <Button
                                                variant="outline"
                                                className={styles.flex1}
                                                onClick={() =>
                                                    setSolicitacaoSelecionada(s)
                                                }
                                            >
                                                <Eye
                                                    className={styles.iconSmall}
                                                />{' '}
                                                Ver Detalhes
                                            </Button>
                                            <Button
                                                variant="default"
                                                className={`${styles.flex1} ${styles.btnApprove}`}
                                                onClick={() => aoAprovar(s.id)}
                                            >
                                                <CheckCircle
                                                    className={styles.iconSmall}
                                                />{' '}
                                                Aprovar
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                className={styles.flex1}
                                                style={{
                                                    flex: '0.2',
                                                    padding: '1.5rem',
                                                }}
                                                onClick={() => aoRejeitar(s.id)}
                                            >
                                                <XCircle
                                                    className={styles.iconSize4}
                                                />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="ativos">
                        <Card className={styles.tableCard}>
                            <CardContent className={styles.tableCardContent}>
                                <div className={styles.tableWrapper}>
                                    <table className={styles.dataTable}>
                                        <thead className={styles.tableHead}>
                                            <tr>
                                                <th className={styles.thStyle}>
                                                    Organização
                                                </th>
                                                <th className={styles.thStyle}>
                                                    Contato
                                                </th>
                                                <th className={styles.thStyle}>
                                                    Dados de Operação
                                                </th>
                                                <th className={styles.thStyle}>
                                                    Status
                                                </th>
                                                <th
                                                    className={`${styles.thStyle} ${styles.thRight}`}
                                                >
                                                    Ações
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className={styles.tableBody}>
                                            {organizadores.map((org) => {
                                                const isAtivo =
                                                    org.status === 'ativo';
                                                return (
                                                    <tr
                                                        key={org.id}
                                                        className={`${styles.trBase} ${isAtivo ? styles.trAtivo : styles.trSuspenso}`}
                                                    >
                                                        <td
                                                            className={
                                                                styles.tdStyle
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.flexColGap1
                                                                }
                                                            >
                                                                <span
                                                                    className={
                                                                        styles.orgName
                                                                    }
                                                                >
                                                                    {
                                                                        org.nomeOrganizacao
                                                                    }
                                                                </span>
                                                                <span
                                                                    className={
                                                                        styles.cnpjBadge
                                                                    }
                                                                >
                                                                    <FileText
                                                                        className={
                                                                            styles.iconTiny
                                                                        }
                                                                    />{' '}
                                                                    {org.cnpj}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td
                                                            className={`${styles.tdStyle} ${styles.contactCell}`}
                                                        >
                                                            <div
                                                                className={
                                                                    styles.flexColGap1
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        styles.infoItem
                                                                    }
                                                                >
                                                                    <Mail
                                                                        className={
                                                                            styles.iconGray
                                                                        }
                                                                    />{' '}
                                                                    <span>
                                                                        {
                                                                            org.email
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    className={
                                                                        styles.infoItem
                                                                    }
                                                                >
                                                                    <Phone
                                                                        className={
                                                                            styles.iconGray
                                                                        }
                                                                    />{' '}
                                                                    <span
                                                                        className={
                                                                            styles.textSmGray
                                                                        }
                                                                    >
                                                                        {
                                                                            org.telefone
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td
                                                            className={
                                                                styles.tdStyle
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.flexColGap1
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        styles.dateText
                                                                    }
                                                                >
                                                                    Aprovado em:{' '}
                                                                    <span
                                                                        className={
                                                                            styles.dateHighlight
                                                                        }
                                                                    >
                                                                        {new Date(
                                                                            org.dataAprovacao
                                                                        ).toLocaleDateString(
                                                                            'pt-BR'
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    className={
                                                                        styles.statsFlex
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            styles.statBlock
                                                                        }
                                                                    >
                                                                        <span
                                                                            className={
                                                                                styles.statLabel
                                                                            }
                                                                        >
                                                                            Eventos
                                                                        </span>
                                                                        <span
                                                                            className={
                                                                                styles.statValueBlue
                                                                            }
                                                                        >
                                                                            {
                                                                                org.totalEventos
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div
                                                                        className={`${styles.statBlock} ${styles.statBorderLeft}`}
                                                                    >
                                                                        <span
                                                                            className={
                                                                                styles.statLabel
                                                                            }
                                                                        >
                                                                            Receita
                                                                        </span>
                                                                        <span
                                                                            className={
                                                                                styles.statValueGreen
                                                                            }
                                                                        >
                                                                            R${' '}
                                                                            {org.receitaTotal.toLocaleString(
                                                                                'pt-BR'
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td
                                                            className={
                                                                styles.tdStyle
                                                            }
                                                        >
                                                            <Badge
                                                                className={`${styles.statusBadge} ${isAtivo ? styles.badgeAtivo : styles.badgeSuspenso}`}
                                                            >
                                                                {isAtivo
                                                                    ? 'Ativo'
                                                                    : 'Suspenso'}
                                                            </Badge>
                                                        </td>
                                                        <td
                                                            className={`${styles.tdStyle} ${styles.tdRight}`}
                                                        >
                                                            <Button
                                                                variant={
                                                                    isAtivo
                                                                        ? 'outline'
                                                                        : 'default'
                                                                }
                                                                onClick={() =>
                                                                    toggleStatus(
                                                                        org.id,
                                                                        isAtivo
                                                                    )
                                                                }
                                                                className={`${styles.btnAction} ${isAtivo ? styles.btnSuspend : styles.btnReactivate}`}
                                                                style={{
                                                                    padding:
                                                                        '0.75rem 1.5rem',
                                                                    fontSize:
                                                                        '1.125rem',
                                                                }}
                                                            >
                                                                {isAtivo
                                                                    ? 'Suspender Conta'
                                                                    : 'Reativar Conta'}
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="historico">
                        <div className={styles.gridContainer}>
                            {historico.map((s) => (
                                <Card key={s.id}>
                                    <CardHeader
                                        className={styles.historicoHeader}
                                    >
                                        <div className={styles.cardHeaderFlex}>
                                            <CardTitle
                                                className={
                                                    styles.historicoTitle
                                                }
                                            >
                                                {s.nomeOrganizacao}
                                            </CardTitle>
                                            <Badge
                                                variant={
                                                    s.status === 'aprovado'
                                                        ? 'default'
                                                        : 'destructive'
                                                }
                                            >
                                                {s.status === 'aprovado'
                                                    ? 'Aprovado'
                                                    : 'Rejeitado'}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent
                                        className={styles.historicoGrid}
                                    >
                                        <div>
                                            <span
                                                className={
                                                    styles.historicoLabel
                                                }
                                            >
                                                Email:
                                            </span>{' '}
                                            {s.email}
                                        </div>
                                        <div>
                                            <span
                                                className={
                                                    styles.historicoLabel
                                                }
                                            >
                                                Telefone:
                                            </span>{' '}
                                            {s.telefone}
                                        </div>
                                        <div>
                                            <span
                                                className={
                                                    styles.historicoLabel
                                                }
                                            >
                                                CNPJ:
                                            </span>{' '}
                                            {s.cnpj}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {solicitacaoSelecionada && (
                    <Dialog
                        open={!!solicitacaoSelecionada}
                        onOpenChange={() => setSolicitacaoSelecionada(null)}
                    >
                        <DialogContent className={styles.dialogContent}>
                            <DialogHeader className={styles.dialogHeader}>
                                <DialogTitle className={styles.dialogTitle}>
                                    Detalhes da Solicitação
                                </DialogTitle>
                                <DialogDescription
                                    className={styles.dialogDesc}
                                >
                                    Informações completas da organização
                                </DialogDescription>
                            </DialogHeader>

                            <div className={styles.dialogBody}>
                                <div className={styles.dialogGrid}>
                                    <div
                                        className={`${styles.colSpan2} ${styles.dialogOrgName}`}
                                    >
                                        {solicitacaoSelecionada.nomeOrganizacao}
                                    </div>

                                    <Detail
                                        label="Email"
                                        value={solicitacaoSelecionada.email}
                                    />
                                    <Detail
                                        label="Telefone"
                                        value={solicitacaoSelecionada.telefone}
                                    />
                                    <Detail
                                        label="CNPJ"
                                        value={solicitacaoSelecionada.cnpj}
                                    />
                                    <Detail
                                        label="Data do Pedido"
                                        value={new Date(
                                            solicitacaoSelecionada.dataSolicitacao
                                        ).toLocaleDateString('pt-BR')}
                                    />

                                    {solicitacaoSelecionada.site && (
                                        <div
                                            className={`${styles.colSpan2} ${styles.linkContainer}`}
                                        >
                                            <label
                                                className={styles.detailLabel}
                                            >
                                                Site
                                            </label>
                                            <a
                                                href={
                                                    solicitacaoSelecionada.site
                                                }
                                                className={styles.siteLink}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {solicitacaoSelecionada.site}
                                            </a>
                                        </div>
                                    )}

                                    {solicitacaoSelecionada.endereco && (
                                        <Detail
                                            label="Endereço"
                                            value={
                                                solicitacaoSelecionada.endereco
                                            }
                                            className={styles.colSpan2}
                                        />
                                    )}

                                    <div
                                        className={`${styles.colSpan2} ${styles.descContainer}`}
                                    >
                                        <label className={styles.detailLabel}>
                                            Descrição
                                        </label>
                                        <div className={styles.descBox}>
                                            <p className={styles.descText}>
                                                {
                                                    solicitacaoSelecionada.descricao
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.dialogFooter}>
                                    <Button
                                        variant="outline"
                                        className={styles.btnLarge}
                                        onClick={() =>
                                            setSolicitacaoSelecionada(null)
                                        }
                                    >
                                        Fechar
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className={styles.btnLargeDest}
                                        onClick={() =>
                                            aoRejeitar(
                                                solicitacaoSelecionada.id
                                            )
                                        }
                                    >
                                        Rejeitar
                                    </Button>
                                    <Button
                                        className={styles.btnLargeConfirm}
                                        onClick={() =>
                                            aoAprovar(solicitacaoSelecionada.id)
                                        }
                                    >
                                        Aprovar Agora
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </>
    );
}
