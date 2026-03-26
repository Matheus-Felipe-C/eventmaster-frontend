import { useEffect, useState } from 'react';
import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    Eye,
    Mail,
    Phone,
    Building2,
    IdCardIcon,
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
import styles from './styles.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllOrganizersRequest } from '../../services/admin/getAllOrganizersRequest';
import { approveRequestForOrganizer } from '../../services/admin/approveRequestForOrganizer';
import { rejectRequestForOrganizer } from '../../services/admin/rejectRequestForOrganizer';
import { useGetMe } from '../../hooks/useGetMe';
import { getLocalStorageRole } from '../../utils/localStorageRole';
import { useNavigate } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';
import { notify } from '../../adapters/toastHotAdapter';
import type { AxiosError } from 'axios';
import type { OrganizerData } from '../../types/OrganizerData';
import { filterOrganizersByStatus } from '../../utils/filterOrganizerByStatus';
import { promoteSomeoneToUser } from '../../services/admin/promoteSomeoneTo';
import type { apiResponseError } from '../../server/apiResponse';

const Detail = ({
    label,
    value,
    className = '',
}: {
    label: string;
    value: string | undefined | null;
    className?: string;
}) => {
    if (!value) return null;
    return (
        <div className={`${styles.detailWrapper} ${className}`}>
            <label className={styles.detailLabel}>{label}</label>
            <div className={styles.detailValue}>{value}</div>
        </div>
    );
};

export function ManageOrganizersPage({ onBack }: { onBack: () => void }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (getLocalStorageRole() !== 'ADMIN') {
            notify.error('Você não tem acesso a pagina de Administrador.');
            navigate(PageRoutesName.home);
        }
    }, [navigate]);

    const { data: user } = useGetMe();

    const { data: allOrganizers } = useQuery({
        queryKey: ['organizersRequest'],
        queryFn: getAllOrganizersRequest,
        enabled: user?.role === 'admin',
        retry: (failureCount, error) => {
            const status = (error as AxiosError).response?.status;
            if (status === 401 || status === 403) {
                return false;
            }
            return failureCount < 2;
        },
    });

    const [solicitacaoSelecionada, setSolicitacaoSelecionada] =
        useState<OrganizerData | null>(null);
    const [abaAtual, setAbaAtual] = useState('pendentes');

    const organizersList = allOrganizers?.data || [];

    const pendentes = filterOrganizersByStatus(organizersList, 'pending');
    const ativos = filterOrganizersByStatus(organizersList, 'approved');
    const historyOrganizers = organizersList.filter(
        (org) => org.status === 'approved' || org.status === 'rejected'
    );

    const approveMutation = useMutation({
        mutationFn: (id: number) => approveRequestForOrganizer(id),
        onSuccess: (data) => {
            notify.success(
                data?.message || 'Organizador aprovado com sucesso!'
            );
            queryClient.invalidateQueries({ queryKey: ['organizersRequest'] });
            setSolicitacaoSelecionada(null);
        },
        onError: () => {
            notify.error('Erro ao aprovar organizador.');
        },
    });

    const rejectMutation = useMutation({
        mutationFn: (id: number) => rejectRequestForOrganizer(id),
        onSuccess: (message) => {
            notify.info(
                typeof message === 'string' ? message : 'Solicitação rejeitada.'
            );
            queryClient.invalidateQueries({ queryKey: ['organizersRequest'] });
            setSolicitacaoSelecionada(null);
        },
        onError: () => {
            notify.error('Erro ao rejeitar organizador.');
        },
    });

    const aoAprovar = (id: number) => {
        approveMutation.mutate(id);
    };

          <TabsContent value="pendentes">
            <div className={styles.gridContainer}>
              {pendentes.map((s) => (
                <Card key={s.id} className={styles.cardHover}>
                  <CardHeader>
                    <div className={styles.cardHeaderFlex}>
                      <div>
                        <CardTitle className={styles.cardTitle}>
                          <div className={`${styles.iconBox} ${styles.iconBoxBlue}`}>
                            <Building2 size={24} />
                          </div>
                          {s.nomeOrganizacao}
                        </CardTitle>
                        <CardDescription className={styles.cardDesc}>
                          Solicitado em {new Date(s.dataSolicitacao).toLocaleDateString('pt-BR')}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className={styles.statusBadge}>Pendente</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className={styles.cardContentSpace}>
                    <div className={styles.infoList}>
                      <div className={styles.infoItem}><Mail size={18} className={styles.iconGray} /> {s.email}</div>
                      <div className={styles.infoItem}><Phone size={18} className={styles.iconGray} /> {s.telefone}</div>
                      <div className={styles.infoItem}><FileText size={18} className={styles.iconGray} /> CNPJ: {s.cnpj}</div>
                    </div>
                    <div className={styles.actionButtons}>
                      <Button variant="outline" className={styles.flex1} onClick={() => setSolicitacaoSelecionada(s)}>
                        <Eye size={20} className={styles.iconSmall} /> Ver Detalhes
                      </Button>
                      <Button variant="default" className={`${styles.flex1} ${styles.btnApprove}`} onClick={() => aoAprovar(s.id)}>
                        <CheckCircle size={20} className={styles.iconSmall} /> Aprovar
                      </Button>
                      <Button variant="destructive" className={styles.btnReject} onClick={() => aoRejeitar(s.id)}>
                        <XCircle size={20} />
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
                        <th className={styles.thStyle}>Organização</th>
                        <th className={styles.thStyle}>Contato</th>
                        <th className={styles.thStyle}>Dados de Operação</th>
                        <th className={styles.thStyle}>Status</th>
                        <th className={`${styles.thStyle} ${styles.thRight}`}>Ações</th>
                      </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                      {organizadores.map((org) => {
                        const isAtivo = org.status === 'ativo';
                        return (
                          <tr key={org.id} className={`${styles.trBase} ${isAtivo ? styles.trAtivo : styles.trSuspenso}`}>
                            <td className={styles.tdStyle}>
                              <div className={styles.flexColGap1}>
                                <span className={styles.orgName}>{org.nomeOrganizacao}</span>
                                <span className={styles.cnpjBadge}>
                                  <FileText className={styles.iconTiny} /> {org.cnpj}
                                </span>
                              </div>
                            </td>
                            <td className={`${styles.tdStyle} ${styles.contactCell}`}>
                              <div className={styles.flexColGap1}>
                                <div className={styles.infoItem}><Mail size={18} className={styles.iconGray} /> <span>{org.email}</span></div>
                                <div className={styles.infoItem}><Phone size={18} className={styles.iconGray} /> <span className={styles.textSmGray}>{org.telefone}</span></div>
                              </div>
                            </td>
                            <td className={styles.tdStyle}>
                              <div className={styles.flexColGap1}>
                                <div className={styles.dateText}>
                                  Aprovado em: <span className={styles.dateHighlight}>{new Date(org.dataAprovacao).toLocaleDateString('pt-BR')}</span>
                                </div>
                                <div className={styles.statsFlex}>
                                  <div className={styles.statBlock}>
                                    <span className={styles.statLabel}>Eventos</span>
                                    <span className={styles.statValueBlue}>{org.totalEventos}</span>
                                  </div>
                                  <div className={`${styles.statBlock} ${styles.statBorderLeft}`}>
                                    <span className={styles.statLabel}>Receita</span>
                                    <span className={styles.statValueGreen}>R$ {org.receitaTotal.toLocaleString('pt-BR')}</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className={styles.tdStyle}>
                              <Badge className={`${styles.statusBadge} ${isAtivo ? styles.badgeAtivo : styles.badgeSuspenso}`}>
                                {isAtivo ? 'Ativo' : 'Suspenso'}
                              </Badge>
                            </td>
                            <td className={`${styles.tdStyle} ${styles.tdRight}`}>
                              <Button 
                                variant={isAtivo ? 'outline' : 'default'} 
                                onClick={() => toggleStatus(org.id, isAtivo)} 
                                className={`${styles.btnAction} ${isAtivo ? styles.btnSuspend : styles.btnReactivate}`}
                              >
                                {isAtivo ? 'Suspender Conta' : 'Reativar Conta'}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
    const aoRejeitar = (id: number) => {
        rejectMutation.mutate(id);
    };

    const toggleStatus = async (id: number, /*organizer: OrganizerData*/) => {
        try {
            const response = await promoteSomeoneToUser(id);

            if (typeof response.message === 'string') {
                notify.success(
                    response.message || 'Organizador suspenso com sucesso!'
                );
            }
        } catch (err) {
            const error = err as AxiosError<apiResponseError>;
            console.log(error.message);
            notify.error(error.message || 'Erro ao tentar suspender o usuario');
        }
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
                            Organizadores Ativos ({ativos.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="historico"
                            className={styles.tabTriggerScaled}
                        >
                            Histórico ({historyOrganizers.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pendentes">
                        <div className={styles.gridContainer}>
                            {pendentes.map((requestedOrganizer) => (
                                <Card
                                    key={requestedOrganizer.id}
                                    className={styles.cardHover}
                                >
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
                                                    {requestedOrganizer.name}
                                                </CardTitle>
                                                <CardDescription
                                                    className={styles.cardDesc}
                                                >
                                                    Solicitado em{' '}
                                                    {new Date(
                                                        requestedOrganizer.created_at
                                                    ).toLocaleDateString(
                                                        'pt-BR'
                                                    )}
                                                </CardDescription>
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className={`${styles.cardBadge} ${styles.badgePendente}`}
                                            >
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
                                                {requestedOrganizer.email}
                                            </div>
                                            <div className={styles.infoItem}>
                                                <Phone
                                                    className={styles.iconSize4}
                                                />{' '}
                                                {
                                                    requestedOrganizer.phone_number
                                                }
                                            </div>
                                            <div className={styles.infoItem}>
                                                <IdCardIcon
                                                    className={styles.iconTiny}
                                                />{' '}
                                                CPF: {requestedOrganizer.cpf}
                                            </div>
                                        </div>
                                        <div className={styles.actionButtons}>
                                            <Button
                                                variant="outline"
                                                className={styles.flex1}
                                                onClick={() =>
                                                    setSolicitacaoSelecionada(
                                                        requestedOrganizer
                                                    )
                                                }
                                            >
                                                <Eye
                                                    className={styles.iconSmall}
                                                />{' '}
                                                Ver Detalhes
                                            </Button>
                                            <Button
                                                variant="default"
                                                disabled={
                                                    approveMutation.isPending
                                                }
                                                className={`${styles.flex1} ${styles.btnApprove}`}
                                                onClick={() =>
                                                    aoAprovar(
                                                        requestedOrganizer.id
                                                    )
                                                }
                                            >
                                                <CheckCircle
                                                    className={styles.iconSmall}
                                                />{' '}
                                                Aprovar
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                disabled={
                                                    rejectMutation.isPending
                                                }
                                                className={styles.flex1}
                                                style={{
                                                    flex: '0.2',
                                                    padding: '1.5rem',
                                                }}
                                                onClick={() =>
                                                    aoRejeitar(
                                                        requestedOrganizer.id
                                                    )
                                                }
                                            >
                                                <XCircle
                                                    className={styles.iconSmall}
                                                />
                                                Reprovar
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
                                                    Data de Aprovação
                                                </th>
                                                <th className={styles.thStyle}>
                                                    Eventos
                                                </th>
                                                <th className={styles.thStyle}>
                                                    Receita
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
                                            {ativos.map((org) => {
                                                const isAtivo = true;
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
                                                                    {org.name}
                                                                </span>
                                                                <span
                                                                    className={
                                                                        styles.cnpjBadge
                                                                    }
                                                                >
                                                                    <IdCardIcon
                                                                        className={
                                                                            styles.iconTiny
                                                                        }
                                                                    />{' '}
                                                                    {org.cpf}
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
                                                                            org.phone_number
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
                                                                    {new Date(
                                                                        org.updated_at
                                                                    ).toLocaleDateString(
                                                                        'pt-BR'
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td
                                                            className={
                                                                styles.tdStyle
                                                            }
                                                        >
                                                            0
                                                        </td>
                                                        <td
                                                            className={
                                                                styles.tdStyle
                                                            }
                                                        >
                                                            R$ 0
                                                        </td>
                                                        <td
                                                            className={
                                                                styles.tdStyle
                                                            }
                                                        >
                                                            <Badge
                                                                className={`${styles.statusBadge} ${isAtivo ? styles.badgeAtivo : styles.badgeSuspenso}`}
                                                            >
                                                                Ativo
                                                            </Badge>
                                                        </td>
                                                        <td
                                                            className={`${styles.tdStyle} ${styles.tdRight}`}
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                onClick={() =>
                                                                    toggleStatus(
                                                                        org.id,
                                                                        //org
                                                                    )
                                                                }
                                                                className={`${styles.btnAction} ${isAtivo ? styles.btnSuspend : styles.btnReactivate}`}
                                                                style={{
                                                                    padding:
                                                                        '0.75rem 1.5rem',
                                                                    fontSize:
                                                                        '1.125rem',
                                                                    cursor: 'pointer',
                                                                }}
                                                            >
                                                                Suspender
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
                            {historyOrganizers.map((organizer) => (
                                <Card key={organizer.id}>
                                    <CardHeader
                                        className={styles.historicoHeader}
                                    >
                                        <div className={styles.cardHeaderFlex}>
                                            <CardTitle
                                                className={
                                                    styles.historicoTitle
                                                }
                                            >
                                                {organizer.name}
                                            </CardTitle>
                                            <Badge
                                                variant={
                                                    organizer.status ===
                                                    'approved'
                                                        ? 'default'
                                                        : 'destructive'
                                                }
                                                className={styles.cardBadge}
                                            >
                                                {organizer.status === 'approved'
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
                                            {organizer.email}
                                        </div>
                                        <div>
                                            <span
                                                className={
                                                    styles.historicoLabel
                                                }
                                            >
                                                Telefone:
                                            </span>{' '}
                                            {organizer.phone_number}
                                        </div>
                                        <div>
                                            <span
                                                className={
                                                    styles.historicoLabel
                                                }
                                            >
                                                CPF:
                                            </span>{' '}
                                            {organizer.cpf}
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
                                        {solicitacaoSelecionada.name}
                                    </div>

                   <div className={`${styles.colSpan2} ${styles.descContainer}`}>
                    <label className={styles.detailLabel}>Descrição da Organização</label>
                    <div className={styles.descBox}>
                      <p className={styles.descText}>{solicitacaoSelecionada.descricao}</p>
                    </div>
                  </div>
                </div>
                                    <Detail
                                        label="Email"
                                        value={solicitacaoSelecionada.email}
                                    />
                                    <Detail
                                        label="Telefone"
                                        value={
                                            solicitacaoSelecionada.phone_number
                                        }
                                    />
                                    <Detail
                                        label="Data do Pedido"
                                        value={new Date(
                                            solicitacaoSelecionada.created_at
                                        ).toLocaleDateString('pt-BR')}
                                    />
                                    <Detail
                                        label="CPF"
                                        value={solicitacaoSelecionada.cpf}
                                    />

                                    <div
                                        className={`${styles.colSpan2} ${styles.descContainer}`}
                                    >
                                        <label className={styles.detailLabel}>
                                            Motivo
                                        </label>
                                        <div className={styles.descBox}>
                                            <p className={styles.descText}>
                                                {solicitacaoSelecionada.reason}
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
                                        disabled={rejectMutation.isPending}
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
                                        disabled={approveMutation.isPending}
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
