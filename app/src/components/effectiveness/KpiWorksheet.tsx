import { useState, useEffect } from 'react';
import styles from './KpiWorksheet.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { EffectivenessPageContent, WorksheetSelection } from '../../data/pages/effectiveness';
import { formatTemplate, extractAiText } from '../../utils/ai';

type KpiWorksheetProps = {
  worksheet: EffectivenessPageContent['worksheet'];
  onAreaUpdate: (areaId: string, selection: WorksheetSelection) => void;
};

type SmartFields = {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timebound: string;
};

const initialSmart: SmartFields = {
  specific: '',
  measurable: '',
  achievable: '',
  relevant: '',
  timebound: ''
};

const KpiWorksheet = ({ worksheet, onAreaUpdate }: KpiWorksheetProps) => {
  const { t } = useTranslation();
  
  // State
  const [activeCategory, setActiveCategory] = useState<string>(worksheet.categories[0]?.id ?? '');
  const [selection, setSelection] = useState<WorksheetSelection>({});
  const [smart, setSmart] = useState<SmartFields>(initialSmart);
  
  const [aiStatus, setAiStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  const apiKey = (import.meta.env.VITE_GOOGLE_AI_API_KEY ?? '').trim();
  const apiBase = import.meta.env.VITE_GOOGLE_AI_API_URL ?? worksheet.ai.apiBase;
  const model = import.meta.env.VITE_GOOGLE_AI_MODEL ?? worksheet.ai.defaultModel;

  const currentCategory = worksheet.categories.find(c => c.id === activeCategory);
  const currentGoal = currentCategory?.goals.find(g => g.id === selection.goalId);

  // Auto-fill S and M when selection changes
  useEffect(() => {
    if (selection.goalId && currentCategory) {
      const goal = currentCategory.goals.find(g => g.id === selection.goalId);
      if (goal) {
         setSmart(prev => ({ ...prev, specific: t(goal.titleKey) }));
         
         if (selection.indicatorId) {
           const ind = goal.indicators.find(i => i.id === selection.indicatorId);
           if (ind) {
             setSmart(prev => ({ ...prev, measurable: t(ind.labelKey) }));
           }
         } else {
            setSmart(prev => ({ ...prev, measurable: '' }));
         }
      }
    }
  }, [selection.goalId, selection.indicatorId, currentCategory, t]);

  // Propagate updates to parent
  useEffect(() => {
    if (activeCategory) {
      onAreaUpdate(activeCategory, {
        categoryId: activeCategory,
        ...selection,
        smart: {
            s: smart.specific,
            m: smart.measurable,
            a: smart.achievable,
            r: smart.relevant,
            t: smart.timebound
        },
        aiFeedback: aiFeedback ?? undefined
      });
    }
  }, [activeCategory, selection, smart, aiFeedback, onAreaUpdate]);

  const handleGoalSelect = (goalId: string) => {
    setSelection({ goalId, indicatorId: undefined });
    setAiFeedback(null);
    setAiStatus('idle');
  };

  const handleIndicatorSelect = (indicatorId: string) => {
    setSelection(prev => ({ ...prev, indicatorId }));
    setAiFeedback(null);
    setAiStatus('idle');
  };

  const handleSmartChange = (field: keyof SmartFields, value: string) => {
    setSmart(prev => ({ ...prev, [field]: value }));
  };

  const handleAiSubmit = async () => {
    if (!smart.specific || !smart.measurable || !smart.achievable || !smart.relevant || !smart.timebound) {
      setAiStatus('error');
      setAiFeedback(t(worksheet.ai.missingSelectionKey));
      return;
    }

    setAiStatus('loading');
    setAiFeedback(null);

    const tokens = {
      category: currentCategory ? t(currentCategory.titleKey) : '',
      goal: smart.specific,
      indicator: smart.measurable,
      target: smart.achievable,
      time: smart.timebound
    };

    const fallback = formatTemplate(t(worksheet.ai.fallbackTemplateKey), { ...tokens, kpi: smart.measurable });

    if (!apiKey) {
      setAiStatus('success');
      setAiFeedback(`${t(worksheet.ai.missingKeyKey)}\n\n${fallback}`);
      return;
    }

    try {
      const prompt = `${formatTemplate(t(worksheet.ai.promptTemplateKey), tokens)}\n\n${t(worksheet.ai.promptSystemKey)}`;
      
      const response = await fetch(`${apiBase}${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) throw new Error('AI Request failed');

      const data = await response.json();
      const text = extractAiText(data);
      
      if (text) {
        setAiStatus('success');
        setAiFeedback(text);
      } else {
        throw new Error('No text in response');
      }

    } catch (e) {
      setAiStatus('error');
      setAiFeedback(`${t(worksheet.ai.networkErrorKey)}\n\n${fallback}`);
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

        <div className={styles.builder}>
          {/* Sidebar: Categories */}
          <aside className={styles.categories} role="tablist" aria-label="KPI Categories">
            <h3 className="visually-hidden">{t(worksheet.ui.categoryLabel)}</h3>
            {worksheet.categories.map(cat => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={styles.categoryButton}
                data-active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{t(cat.titleKey)}</span>
                {activeCategory === cat.id && <span>&rarr;</span>}
              </button>
            ))}
          </aside>

          {/* Main Workspace */}
          <div className={styles.workspace} role="tabpanel">
            
            {/* Step 2 & 3: Goal & Indicator */}
            <section className={styles.panel} data-animate>
              <div>
                <div className={styles.panelHeader}>
                  <span className={styles.stepNumber}>2</span>
                  <h3 className={styles.panelTitle}>{t(worksheet.ui.goalLabel)}</h3>
                </div>
                
                <div className={styles.goalsGrid}>
                  {currentCategory?.goals.map(goal => (
                    <button
                      key={goal.id}
                      className={styles.goalCard}
                      data-selected={selection.goalId === goal.id}
                      onClick={() => handleGoalSelect(goal.id)}
                    >
                      <span className={styles.goalTitle}>{t(goal.titleKey)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {currentGoal && (
                <div>
                  <div className={styles.panelHeader}>
                    <span className={styles.stepNumber}>3</span>
                    <h3 className={styles.panelTitle}>{t(worksheet.ui.indicatorLabel)}</h3>
                  </div>
                  <div className={styles.indicatorsList}>
                    {currentGoal.indicators.map(ind => (
                      <button
                        key={ind.id}
                        className={styles.indicatorChip}
                        data-selected={selection.indicatorId === ind.id}
                        onClick={() => handleIndicatorSelect(ind.id)}
                      >
                        {t(ind.labelKey)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Step 4: SMART Form */}
            <section className={styles.panel} data-animate>
               <div className={styles.panelHeader}>
                  <span className={styles.stepNumber}>4</span>
                  <h3 className={styles.panelTitle}>{t(worksheet.ui.smartLabel)}</h3>
               </div>

               <div className={styles.smartGrid}>
                 <div className={styles.smartField}>
                   <label className={styles.smartLabel}>{t(worksheet.ui.smart.specific.label)}</label>
                   <input 
                      className={styles.smartInput} 
                      value={smart.specific} 
                      onChange={(e) => handleSmartChange('specific', e.target.value)}
                      placeholder={t(worksheet.ui.smart.specific.placeholder)}
                   />
                 </div>
                 <div className={styles.smartField}>
                   <label className={styles.smartLabel}>{t(worksheet.ui.smart.measurable.label)}</label>
                   <input 
                      className={styles.smartInput} 
                      value={smart.measurable} 
                      onChange={(e) => handleSmartChange('measurable', e.target.value)}
                      placeholder={t(worksheet.ui.smart.measurable.placeholder)}
                   />
                 </div>
                 <div className={styles.smartField}>
                   <label className={styles.smartLabel}>{t(worksheet.ui.smart.achievable.label)}</label>
                   <input 
                      className={styles.smartInput} 
                      value={smart.achievable} 
                      onChange={(e) => handleSmartChange('achievable', e.target.value)}
                      placeholder={t(worksheet.ui.smart.achievable.placeholder)}
                   />
                 </div>
                 <div className={styles.smartField}>
                   <label className={styles.smartLabel}>{t(worksheet.ui.smart.relevant.label)}</label>
                   <input 
                      className={styles.smartInput} 
                      value={smart.relevant} 
                      onChange={(e) => handleSmartChange('relevant', e.target.value)}
                      placeholder={t(worksheet.ui.smart.relevant.placeholder)}
                   />
                 </div>
                 <div className={styles.smartField}>
                   <label className={styles.smartLabel}>{t(worksheet.ui.smart.timebound.label)}</label>
                   <input 
                      className={styles.smartInput} 
                      value={smart.timebound} 
                      onChange={(e) => handleSmartChange('timebound', e.target.value)}
                      placeholder={t(worksheet.ui.smart.timebound.placeholder)}
                   />
                 </div>
               </div>

               <div className={styles.actions}>
                 <button 
                    className={styles.aiButton} 
                    onClick={handleAiSubmit}
                    disabled={aiStatus === 'loading'}
                 >
                    {aiStatus === 'loading' ? '🤖 ...' : t(worksheet.ai.buttonKey)}
                 </button>
               </div>

               {aiFeedback && (
                 <div className={styles.feedback} aria-live="polite">
                    <div className={styles.feedbackHeader}>
                      <span>✨ {t(worksheet.ai.titleKey)}</span>
                    </div>
                    <p className={styles.feedbackContent}>{aiFeedback}</p>
                 </div>
               )}
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KpiWorksheet;