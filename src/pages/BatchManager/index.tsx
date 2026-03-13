import { useState } from 'react';
import {
    Plus,
    Trash2,
    Clock,
    ArrowRight,
    Layers,
    TrendingUp,
} from 'lucide-react';
import type { TicketBatch } from '../../types/Event';
import styles from './styles.module.css';

interface BatchManagerProps {
    ticketTypeId: string;
    batches: TicketBatch[];
    onBatchesChange: (batches: TicketBatch[]) => void;
}

export function BatchManager({ batches, onBatchesChange }: BatchManagerProps) {
    const [expandedBatchId, setExpandedBatchId] = useState<string | null>(null);

    // Cálculos de resumo
    const totalQuantity = batches.reduce(
        (sum, b) => sum + (b.quantity || 0),
        0
    );
    const minPrice =
        batches.length > 0 ? Math.min(...batches.map((b) => b.price || 0)) : 0;
    const maxPrice =
        batches.length > 0 ? Math.max(...batches.map((b) => b.price || 0)) : 0;

    const handleAddBatch = () => {
        const newBatch: TicketBatch = {
            id: Date.now().toString(),
            name: `Lote ${batches.length + 1}`,
            price: 0,
            quantity: 0,
            availableQuantity: 0,
            startDate: '',
            endDate: '',
        };
        onBatchesChange([...batches, newBatch]);
        setExpandedBatchId(newBatch.id);
    };

    const handleRemoveBatch = (batchId: string) => {
        onBatchesChange(batches.filter((b) => b.id !== batchId));
    };

    const handleBatchChange = (
        batchId: string,
        field: keyof TicketBatch,
        value: string | number
    ) => {
        onBatchesChange(
            batches.map((b) => {
                if (b.id === batchId) {
                    const updated = { ...b, [field]: value };
                    // Sync availableQuantity with quantity when quantity changes
                    if (field === 'quantity') {
                        updated.availableQuantity = value as number;
                    }
                    return updated;
                }
                return b;
            })
        );
    };

    const toggleBatchExpansion = (batchId: string) => {
        setExpandedBatchId(expandedBatchId === batchId ? null : batchId);
    };

    return (
        <div className={styles.batchContainer}>
            <div className={styles.header}>
                <div className={styles.headerTitle}>
                    <Layers size={18} className={styles.headerIcon} />
                    <label className={styles.label}>Lotes Progressivos</label>
                </div>
                <button
                    type="button"
                    onClick={handleAddBatch}
                    className={styles.addButton}
                >
                    <Plus size={16} /> Adicionar Lote
                </button>
            </div>

            {batches.length === 0 ? (
                <div className={styles.emptyState}>
                    <Layers size={32} className={styles.emptyIcon} />
                    <p className={styles.emptyText}>
                        Nenhum lote configurado. Adicione lotes para criar uma
                        venda progressiva.
                    </p>
                    <p className={styles.emptySubText}>
                        Os lotes serão ativados automaticamente em sequência
                    </p>
                </div>
            ) : (
                <div className={styles.batchesContent}>
                    {/* Timeline Visual */}
                    <div className={styles.timelineBox}>
                        <div className={styles.timelineHeader}>
                            <div className={styles.timelineIconWrapper}>
                                <Clock size={16} />
                            </div>
                            <div>
                                <div className={styles.timelineTitle}>
                                    Linha do Tempo - Venda em Cascata
                                </div>
                                <div className={styles.timelineSub}>
                                    Progressão Automática de Lotes
                                </div>
                            </div>
                        </div>

                        <div className={styles.timelineList}>
                            {batches.map((batch, index) => (
                                <div
                                    key={batch.id}
                                    className={styles.timelineItemWrapper}
                                >
                                    <div className={styles.timelineCard}>
                                        <div className={styles.timelineBadge}>
                                            {index + 1}
                                        </div>
                                        <div className={styles.batchCardName}>
                                            {batch.name}
                                        </div>
                                        <div className={styles.batchCardPrice}>
                                            {batch.price > 0
                                                ? `R$ ${batch.price.toFixed(2)}`
                                                : 'R$ --,--'}
                                        </div>
                                        <div className={styles.batchCardQty}>
                                            {batch.quantity > 0
                                                ? `${batch.quantity} ingressos`
                                                : '-- ingressos'}
                                        </div>
                                        {batch.startDate && (
                                            <div
                                                className={styles.batchCardDate}
                                            >
                                                {new Date(
                                                    batch.startDate
                                                ).toLocaleDateString('pt-BR', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    {index < batches.length - 1 && (
                                        <div className={styles.timelineArrow}>
                                            <ArrowRight
                                                size={20}
                                                className={styles.arrowIcon}
                                            />
                                            <span className={styles.arrowText}>
                                                Auto
                                            </span>
                                            {batch.price > 0 &&
                                                batches[index + 1].price >
                                                    batch.price && (
                                                    <TrendingUp
                                                        size={14}
                                                        className={
                                                            styles.trendUpIcon
                                                        }
                                                    />
                                                )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className={styles.timelineHint}>
                            <span className={styles.hintEmoji}>💡</span>
                            <span>
                                <strong>Como funciona:</strong> Quando o Lote{' '}
                                {batches.length > 0 ? '1' : 'N'} esgotar ou
                                expirar, o Lote{' '}
                                {batches.length > 1 ? '2' : 'N+1'} é ativado
                                automaticamente. Esta progressão continua até o
                                último lote ou até a data do evento.
                            </span>
                        </div>
                    </div>

                    {/* Editores de Lotes */}
                    <div className={styles.batchEditorsList}>
                        {batches.map((batch, index) => (
                            <div key={batch.id} className={styles.editorCard}>
                                {/* Header do Editor (Clickable) */}
                                <div
                                    className={styles.editorHeader}
                                    onClick={() =>
                                        toggleBatchExpansion(batch.id)
                                    }
                                >
                                    <div className={styles.editorHeaderLeft}>
                                        <div className={styles.editorBadge}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <div className={styles.editorTitle}>
                                                {batch.name}
                                            </div>
                                            <div className={styles.editorSub}>
                                                {batch.quantity > 0 &&
                                                batch.price > 0
                                                    ? `${batch.quantity} ingressos × R$ ${batch.price.toFixed(2)}`
                                                    : 'Configure os dados do lote'}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className={styles.deleteButton}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveBatch(batch.id);
                                        }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                {/* Corpo do Editor (Formulário) */}
                                {expandedBatchId === batch.id && (
                                    <div className={styles.editorBody}>
                                        <div className={styles.inputGrid}>
                                            <div className={styles.inputGroup}>
                                                <label
                                                    htmlFor={`batch-name-${batch.id}`}
                                                    className={
                                                        styles.smallLabel
                                                    }
                                                >
                                                    Nome do Lote
                                                </label>
                                                <input
                                                    id={`batch-name-${batch.id}`}
                                                    type="text"
                                                    className={styles.input}
                                                    placeholder="ex: Lote 1, Early Bird"
                                                    value={batch.name}
                                                    onChange={(e) =>
                                                        handleBatchChange(
                                                            batch.id,
                                                            'name',
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>

                                            <div className={styles.inputGroup}>
                                                <label
                                                    htmlFor={`batch-price-${batch.id}`}
                                                    className={
                                                        styles.smallLabel
                                                    }
                                                >
                                                    Preço (R$)
                                                </label>
                                                <input
                                                    id={`batch-price-${batch.id}`}
                                                    type="number"
                                                    className={styles.input}
                                                    placeholder="150.00"
                                                    value={batch.price || ''}
                                                    onChange={(e) =>
                                                        handleBatchChange(
                                                            batch.id,
                                                            'price',
                                                            parseFloat(
                                                                e.target.value
                                                            ) || 0
                                                        )
                                                    }
                                                    required
                                                    min="0"
                                                    step="0.01"
                                                />
                                            </div>

                                            <div className={styles.inputGroup}>
                                                <label
                                                    htmlFor={`batch-quantity-${batch.id}`}
                                                    className={
                                                        styles.smallLabel
                                                    }
                                                >
                                                    Quantidade Disponível
                                                </label>
                                                <input
                                                    id={`batch-quantity-${batch.id}`}
                                                    type="number"
                                                    className={styles.input}
                                                    placeholder="100"
                                                    value={batch.quantity || ''}
                                                    onChange={(e) =>
                                                        handleBatchChange(
                                                            batch.id,
                                                            'quantity',
                                                            parseInt(
                                                                e.target.value
                                                            ) || 0
                                                        )
                                                    }
                                                    required
                                                    min="1"
                                                />
                                            </div>

                                            <div className={styles.inputGroup}>
                                                <label
                                                    htmlFor={`batch-start-${batch.id}`}
                                                    className={
                                                        styles.smallLabel
                                                    }
                                                >
                                                    Data de Início
                                                </label>
                                                <input
                                                    id={`batch-start-${batch.id}`}
                                                    type="datetime-local"
                                                    className={styles.input}
                                                    value={batch.startDate}
                                                    onChange={(e) =>
                                                        handleBatchChange(
                                                            batch.id,
                                                            'startDate',
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>

                                            <div
                                                className={`${styles.inputGroup} ${styles.colSpan2}`}
                                            >
                                                <label
                                                    htmlFor={`batch-end-${batch.id}`}
                                                    className={
                                                        styles.smallLabel
                                                    }
                                                >
                                                    Data de Fim (ou quando
                                                    esgotar)
                                                </label>
                                                <input
                                                    id={`batch-end-${batch.id}`}
                                                    type="datetime-local"
                                                    className={styles.input}
                                                    value={batch.endDate}
                                                    onChange={(e) =>
                                                        handleBatchChange(
                                                            batch.id,
                                                            'endDate',
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Dicas Contextuais */}
                                        <div className={styles.hintsArea}>
                                            <div className={styles.infoHint}>
                                                💡 <strong>Dica:</strong> O lote{' '}
                                                {index + 1}{' '}
                                                {index === 0
                                                    ? 'será o primeiro a ser vendido.'
                                                    : `será ativado automaticamente quando o Lote ${index} esgotar ou expirar.`}
                                            </div>

                                            {index > 0 &&
                                                batch.price > 0 &&
                                                batches[index - 1].price >
                                                    0 && (
                                                    <div
                                                        className={`
                          ${styles.priceHint} 
                          ${batch.price > batches[index - 1].price ? styles.priceHintSuccess : ''}
                          ${batch.price < batches[index - 1].price ? styles.priceHintWarning : ''}
                          ${batch.price === batches[index - 1].price ? styles.priceHintNeutral : ''}
                        `}
                                                    >
                                                        {batch.price >
                                                            batches[index - 1]
                                                                .price && (
                                                            <>
                                                                📈{' '}
                                                                <strong>
                                                                    Preço
                                                                    Progressivo:
                                                                </strong>{' '}
                                                                Aumento de R${' '}
                                                                {(
                                                                    batch.price -
                                                                    batches[
                                                                        index -
                                                                            1
                                                                    ].price
                                                                ).toFixed(
                                                                    2
                                                                )}{' '}
                                                                em relação ao
                                                                lote anterior
                                                            </>
                                                        )}
                                                        {batch.price <
                                                            batches[index - 1]
                                                                .price && (
                                                            <>
                                                                ⚠️{' '}
                                                                <strong>
                                                                    Atenção:
                                                                </strong>{' '}
                                                                Preço menor que
                                                                o lote anterior.
                                                                Considere usar
                                                                preços
                                                                progressivos.
                                                            </>
                                                        )}
                                                        {batch.price ===
                                                            batches[index - 1]
                                                                .price && (
                                                            <>
                                                                ➡️{' '}
                                                                <strong>
                                                                    Mesmo preço:
                                                                </strong>{' '}
                                                                Este lote tem o
                                                                mesmo valor do
                                                                anterior.
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Resumo Geral */}
                    {batches.length > 0 && (
                        <div className={styles.summaryBox}>
                            <div className={styles.summaryTitle}>
                                📊 Resumo Geral dos Lotes
                            </div>
                            <div className={styles.summaryGrid}>
                                <div className={styles.summaryItem}>
                                    <div className={styles.summaryLabel}>
                                        Total de Ingressos
                                    </div>
                                    <div className={styles.summaryValue}>
                                        {totalQuantity}
                                    </div>
                                </div>
                                <div className={styles.summaryItem}>
                                    <div className={styles.summaryLabel}>
                                        Número de Lotes
                                    </div>
                                    <div className={styles.summaryValue}>
                                        {batches.length}
                                    </div>
                                </div>
                                <div className={styles.summaryItem}>
                                    <div className={styles.summaryLabel}>
                                        Preço Mínimo
                                    </div>
                                    <div
                                        className={`${styles.summaryValue} ${styles.textGreen}`}
                                    >
                                        R$ {minPrice.toFixed(2)}
                                    </div>
                                </div>
                                <div className={styles.summaryItem}>
                                    <div className={styles.summaryLabel}>
                                        Preço Máximo
                                    </div>
                                    <div
                                        className={`${styles.summaryValue} ${styles.textRed}`}
                                    >
                                        R$ {maxPrice.toFixed(2)}
                                    </div>
                                </div>
                            </div>

                            {minPrice > 0 && maxPrice > minPrice && (
                                <div className={styles.summaryHighlight}>
                                    💰 Valorização progressiva de{' '}
                                    <strong>
                                        R$ {(maxPrice - minPrice).toFixed(2)}
                                    </strong>{' '}
                                    (
                                    {Math.round(
                                        ((maxPrice - minPrice) / minPrice) * 100
                                    )}
                                    % de aumento)
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
