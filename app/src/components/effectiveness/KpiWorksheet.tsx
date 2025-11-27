import { useState } from 'react';
import styles from './KpiWorksheet.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { EffectivenessPageContent, WorksheetSelection } from '../../data/pages/effectiveness';
import { formatTemplate, extractAiText } from '../../utils/ai';
import type { TranslationKey } from '../../data/i18n/types';

type KpiWorksheetProps = {
  worksheet: EffectivenessPageContent['worksheet'];
  onAreaUpdate: (areaId: string, selection: WorksheetSelection) => void;
};

type AreaState = {
  selection: WorksheetSelection;
  status: 'idle' | 'ready' | 'loading';
  feedback: string;
  notice: string | null;
};

type SelectionField = 'goalKey' | 'kpiKey' | 'measureKey';

const iconPath = (fileName: string) => new URL(`../../assets/icons/${fileName}`, import.meta.url).href;

const buildInitialState = (areas: EffectivenessPageContent['worksheet']['areas']) => {
  return areas.reduce<Record<string, AreaState>>((acc, area) => {
    acc[area.id] = { selection: {}, status: 'idle', feedback: '', notice: null };
    return acc;
  }, {});
};

const KpiWorksheet = ({ worksheet, onAreaUpdate }: KpiWorksheetProps) => {
  const { t } = useTranslation();
  const [openAreas, setOpenAreas] = useState<Set<string>>(() => {
    const initial = worksheet.areas[0]?.id;
    return initial ? new Set([initial]) : new Set();
  });
  const [areasState, setAreasState] = useState<Record<string, AreaState>>(() => buildInitialState(worksheet.areas));

  const apiKey = (import.meta.env.VITE_GOOGLE_AI_API_KEY ?? '').trim();
  const apiBase = import.meta.env.VITE_GOOGLE_AI_API_URL ?? worksheet.ai.apiBase;
  const model = import.meta.env.VITE_GOOGLE_AI_MODEL ?? worksheet.ai.defaultModel;

  const toggleArea = (id: string) => {
    setOpenAreas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const updateSelection = (areaId: string, field: SelectionField, value: TranslationKey) => {
    setAreasState((prev) => {
      const area = prev[areaId] ?? { selection: {}, status: 'idle', feedback: '', notice: null };
      const nextSelection: WorksheetSelection = {
        ...area.selection,
        [field]: value,
        aiFeedback: undefined,
        aiNotice: null
      };
      const isComplete = Boolean(nextSelection.goalKey && nextSelection.kpiKey && nextSelection.measureKey);
      const nextState: AreaState = {
        selection: nextSelection,
        status: isComplete && area.status !== 'loading' ? 'ready' : 'idle',
        feedback: '',
        notice: null
      };
      onAreaUpdate(areaId, nextSelection);
      return { ...prev, [areaId]: nextState };
    });
  };

  const handleSubmit = async (areaId: string) => {
    const area = worksheet.areas.find((item) => item.id === areaId);
    const current = areasState[areaId];
    if (!area || !current) return;

    const { selection } = current;
    if (!selection.goalKey || !selection.kpiKey || !selection.measureKey) {
      setAreasState((prev) => ({
        ...prev,
        [areaId]: {
          ...prev[areaId],
          status: 'idle',
          notice: t(worksheet.ai.missingSelectionKey),
          feedback: ''
        }
      }));
      return;
    }

    setAreasState((prev) => ({
      ...prev,
      [areaId]: { ...prev[areaId], status: 'loading', feedback: '', notice: null }
    }));

    const tokens = {
      area: t(area.titleKey),
      goal: t(selection.goalKey),
      kpi: t(selection.kpiKey),
      measure: t(selection.measureKey)
    };

    const applyResult = (feedback: string, notice: string | null) => {
      setAreasState((prev) => {
        const currentSelection = prev[areaId]?.selection ?? selection;
        onAreaUpdate(areaId, { ...currentSelection, aiFeedback: feedback, aiNotice: notice });
        return {
          ...prev,
          [areaId]: {
            selection: currentSelection,
            status: 'ready',
            feedback,
            notice
          }
        };
      });
    };

    if (!apiKey) {
      const fallback = formatTemplate(t(worksheet.ai.fallbackTemplateKey), tokens);
      applyResult(fallback, t(worksheet.ai.missingKeyKey));
      return;
    }

    try {
      const prompt = `${formatTemplate(t(worksheet.ai.promptTemplateKey), tokens)}\n\n${t(worksheet.ai.promptSystemKey)}`;
      const response = await fetch(`${apiBase}${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: { temperature: 0.5, maxOutputTokens: 400 }
        })
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const payload = await response.json();
      const text = extractAiText(payload);
      if (text) {
        applyResult(text, null);
        return;
      }

      const fallback = formatTemplate(t(worksheet.ai.fallbackTemplateKey), tokens);
      applyResult(fallback, t(worksheet.ai.networkErrorKey));
    } catch (error) {
      const fallback = formatTemplate(t(worksheet.ai.fallbackTemplateKey), tokens);
      applyResult(fallback, t(worksheet.ai.networkErrorKey));
    }
  };

  return (
    <section id="worksheet" className={styles.section} aria-labelledby="worksheet-title">
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(worksheet.badgeKey)}</span>
          <h2 id="worksheet-title">{t(worksheet.titleKey)}</h2>
          <p className={styles.lead}>{t(worksheet.introKey)}</p>
        </header>

        <div className={styles.areas}>
          {worksheet.areas.map((area) => {
            const state = areasState[area.id];
            const selection = state?.selection ?? {};
            const isOpen = openAreas.has(area.id);
            const isLoading = state?.status === 'loading';
            const isComplete = Boolean(selection.goalKey && selection.kpiKey && selection.measureKey);
            const showButton = isComplete || state?.feedback;

            return (
              <article key={area.id} className={styles.areaCard} data-open={isOpen || undefined} data-animate>
                <button type="button" className={styles.areaHeader} onClick={() => toggleArea(area.id)}>
                  <span className={styles.areaInfo}>
                    <span className={styles.iconWrapper} aria-hidden>
                      <img src={iconPath(area.icon)} alt="" />
                    </span>
                    <span className={styles.areaTitle}>{t(area.titleKey)}</span>
                  </span>
                  <span className={styles.toggle} aria-hidden>
                    <svg viewBox="0 0 24 24" width="20" height="20" focusable="false" role="presentation">
                      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                {isOpen ? (
                  <div className={styles.content}>
                    <div className={styles.tableWrapper}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th scope="col">{t(worksheet.columns.goalKey)}</th>
                            <th scope="col">{t(worksheet.columns.kpiKey)}</th>
                            <th scope="col">{t(worksheet.columns.measureKey)}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {area.examples.map((example) => (
                            <tr key={example.id}>
                              {(['goalKey', 'kpiKey', 'measureKey'] as SelectionField[]).map((field) => {
                                const cellKey = example[field];
                                const isSelected = selection[field] === cellKey;
                                return (
                                  <td key={`${example.id}-${field}`}>
                                    <button
                                      type="button"
                                      className={styles.choiceButton}
                                      data-selected={isSelected || undefined}
                                      onClick={() => updateSelection(area.id, field, cellKey)}
                                    >
                                      {t(cellKey)}
                                    </button>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {showButton ? (
                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={styles.actionButton}
                          onClick={() => handleSubmit(area.id)}
                          disabled={!isComplete || isLoading}
                        >
                          {isLoading ? t(worksheet.ai.loadingKey) : t(worksheet.ai.buttonKey)}
                        </button>
                      </div>
                    ) : null}

                    {state?.feedback ? (
                      <div className={styles.feedback} aria-live="polite">
                        <p className={styles.feedbackTitle}>{t(worksheet.ai.titleKey)}</p>
                        {state.notice ? <p className={styles.feedbackNotice}>{state.notice}</p> : null}
                        <p className={styles.feedbackBody}>{state.feedback}</p>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KpiWorksheet;
