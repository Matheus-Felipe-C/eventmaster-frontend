import { useState } from 'react';
import { ArrowLeft, Info, Save } from 'lucide-react';
import { useNavigate } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';
import styles from './style.module.css';

export function AdminComissoesPage() {
    const navigate = useNavigate();
    const [comissaoState, setComissaoState] = useState({
        padrao: 5,
        categorias: {
            musica: 5,
            teatro: 4,
            esportes: 6,
            conferencias: 5,
        },
        minima: 2,
        processamento: 3.5,
    });

    return (
        <div className={styles.container}>
            <div className={styles.comissoesWrapper}>
                <button
                    className={styles.backButton}
                    onClick={() => navigate(PageRoutesName.administrador.adminDashboard)}
                >
                    <ArrowLeft size={16} />
                    Voltar ao Dashboard
                </button>

                <div className={styles.comissoesHeader}>
                    <h2 className={styles.cardTitleComissoes}>Configurar Comissões da Plataforma</h2>
                    <p className={styles.cardSubtitleComissoes}>Defina as taxas e comissões aplicadas a cada tipo de evento</p>
                </div>

                <div className={styles.alertInfo}>
                    <Info size={20} color="#1e40af" className={styles.alertIcon} />
                    <p>As alterações nas taxas de comissão serão aplicadas apenas a novos eventos criados após a data de alteração. Eventos existentes manterão as taxas originais.</p>
                </div>

                <div className={styles.comissoesSection}>
                    <h3 className={styles.sectionTitleComissao}>Taxa de Comissão Padrão</h3>
                    <p className={styles.sectionSubtitleComissao}>Taxa aplicada a todos os eventos que não possuem configuração específica</p>
                    
                    <div className={styles.rangeHeader}>
                        <span className={styles.rangeLabelMax}>Taxa Padrão (%)</span>
                        <span className={styles.rangeValue}>{comissaoState.padrao}%</span>
                    </div>
                    
                    <div className={styles.rangeWrapper}>
                        <input 
                            type="range" 
                            min="0" max="20" step="1"
                            value={comissaoState.padrao} 
                            onChange={(e) => setComissaoState({...comissaoState, padrao: Number(e.target.value)})}
                            className={styles.rangeSlider}
                            style={{
                                background: `linear-gradient(to right, #111827 ${(comissaoState.padrao / 20) * 100}%, #e5e7eb ${(comissaoState.padrao / 20) * 100}%)`
                            }}
                        />
                        <div className={styles.rangeTicks}>
                            <span>0%</span>
                            <span>20%</span>
                        </div>
                    </div>

                    <div className={styles.exampleBox}>
                        <p className={styles.exampleTitle}>Exemplo de cálculo:</p>
                        <div className={styles.exampleRow}>
                            <span>Preço do ingresso:</span>
                            <span>R$ 100.00</span>
                        </div>
                        <div className={styles.exampleRow}>
                            <span>Comissão ({comissaoState.padrao}%):</span>
                            <span>R$ {comissaoState.padrao.toFixed(2)}</span>
                        </div>
                        <div className={styles.dividerLight} />
                        <div className={styles.exampleRowStrong}>
                            <span>Organizador recebe:</span>
                            <span>R$ {(100 - comissaoState.padrao).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.comissoesSection}>
                    <h3 className={styles.sectionTitleComissao}>Comissões por Categoria de Evento</h3>
                    <p className={styles.sectionSubtitleComissao}>Configure taxas específicas para cada categoria de evento</p>

                    {[
                        { key: 'musica', label: '🎵 Eventos de Música' },
                        { key: 'teatro', label: '🎭 Eventos de Teatro' },
                        { key: 'esportes', label: '⚽ Eventos Esportivos' },
                        { key: 'conferencias', label: '💼 Conferências e Workshops' },
                    ].map(cat => (
                        <div key={cat.key} className={styles.catGroup}>
                            <div className={styles.catGroupHeader}>
                                <span className={styles.catLabel}>{cat.label}</span>
                                <div className={styles.catInputBlock}>
                                    <input 
                                        type="number"
                                        className={styles.catInput} 
                                        value={comissaoState.categorias[cat.key as keyof typeof comissaoState.categorias]} 
                                        onChange={(e) => setComissaoState({
                                            ...comissaoState, 
                                            categorias: { ...comissaoState.categorias, [cat.key]: Number(e.target.value) }
                                        })}
                                    />
                                </div>
                            </div>
                            <input 
                                type="range" 
                                min="0" max="20" step="1"
                                value={comissaoState.categorias[cat.key as keyof typeof comissaoState.categorias]} 
                                onChange={(e) => setComissaoState({
                                    ...comissaoState, 
                                    categorias: { ...comissaoState.categorias, [cat.key]: Number(e.target.value) }
                                })}
                                className={styles.rangeSlider}
                                style={{
                                    background: `linear-gradient(to right, #111827 ${(comissaoState.categorias[cat.key as keyof typeof comissaoState.categorias] / 20) * 100}%, #e5e7eb ${(comissaoState.categorias[cat.key as keyof typeof comissaoState.categorias] / 20) * 100}%)`
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div className={styles.comissoesSection}>
                    <h3 className={styles.sectionTitleComissao}>Configurações Adicionais</h3>
                    <p className={styles.sectionSubtitleComissao}>Outras taxas e configurações da plataforma</p>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Comissão Mínima (R$)</label>
                        <input 
                            type="text"
                            className={styles.formInput} 
                            value={comissaoState.minima} 
                            onChange={(e) => setComissaoState({...comissaoState, minima: Number(e.target.value.replace(',','.')) || 0})}
                        />
                        <p className={styles.formHint}>Valor mínimo de comissão cobrado por ingresso, independente da taxa percentual</p>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Taxa de Processamento de Pagamento (%)</label>
                        <input 
                            type="text"
                            className={styles.formInput} 
                            value={comissaoState.processamento.toString().replace('.', ',')} 
                            onChange={(e) => setComissaoState({...comissaoState, processamento: Number(e.target.value.replace(',','.')) || 0})}
                        />
                        <p className={styles.formHint}>Taxa adicional para cobrir custos de gateway de pagamento (cartão de crédito, PIX, etc.)</p>
                    </div>
                </div>

                <div className={styles.resumoBox}>
                    <h3 className={styles.resumoTitle}>Resumo de Taxas Totais</h3>
                    <p className={styles.resumoSubtitle}>Taxas totais aplicadas ao organizador (incluindo processamento de pagamento)</p>

                    <div className={styles.resumoRows}>
                        <div className={styles.resumoRow}>
                            <span>Comissão da Plataforma:</span>
                            <span>{comissaoState.padrao}%</span>
                        </div>
                        <div className={styles.resumoRow}>
                            <span>Taxa de Processamento:</span>
                            <span>{comissaoState.processamento}%</span>
                        </div>
                        <div className={styles.dividerBlue} />
                        <div className={styles.resumoRowTotal}>
                            <span>Taxa Total ao Organizador:</span>
                            <span>{comissaoState.padrao + comissaoState.processamento}%</span>
                        </div>
                    </div>

                    <div className={styles.resumoDetailBox}>
                        <p className={styles.resHint}>Exemplo para ingresso de R$ 100.00:</p>
                        <div className={styles.resumoRow}>
                            <span>Comissão plataforma:</span>
                            <span>R$ {comissaoState.padrao.toFixed(2)}</span>
                        </div>
                        <div className={styles.resumoRow}>
                            <span>Processamento:</span>
                            <span>R$ {comissaoState.processamento.toFixed(2)}</span>
                        </div>
                        <div className={styles.dividerLight} />
                        <div className={styles.resumoRowStrong}>
                            <span>Total de taxas:</span>
                            <span>R$ {(comissaoState.padrao + comissaoState.processamento).toFixed(2)}</span>
                        </div>
                        <div className={styles.resumoRowSuccess}>
                            <span>Organizador recebe:</span>
                            <span>R$ {(100 - (comissaoState.padrao + comissaoState.processamento)).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.actionsBar}>
                    <button className={styles.btnCancel} onClick={() => navigate(PageRoutesName.administrador.adminDashboard)}>Cancelar</button>
                    <button className={styles.btnSave}>
                        <Save size={18}/> Salvar Configurações
                    </button>
                </div>
            </div>
        </div>
    );
}
