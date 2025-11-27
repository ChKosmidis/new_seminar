import { useMemo, useState, type ChangeEvent } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import type { TranslationKey } from '../../data/i18n/types';
import type { LegalSecurityPageContent } from '../../data/pages/legalSecurity';
import styles from './ThreatResponsePlanner.module.css';
import { extractAiText, formatTemplate } from '../../utils/ai';

type ThreatResponsePlannerProps = {
  planner: LegalSecurityPageContent['planner'];
};

type PlannerFieldId = LegalSecurityPageContent['planner']['form']['fields'][number]['id'];
type PlannerFormState = Record<PlannerFieldId, string>;

type FeedbackState = { type: 'error' | 'notice'; message: string } | null;

const buildInitialFormState = (fields: LegalSecurityPageContent['planner']['form']['fields']): PlannerFormState => {
  return fields.reduce<PlannerFormState>((acc, field) => {
    acc[field.id] = '';
    return acc;
  }, { responsible: '', actions: '', internal: '', external: '' });
};

const ThreatResponsePlanner = ({ planner }: ThreatResponsePlannerProps) => {
  const { t } = useTranslation();
  const [selectedThreat, setSelectedThreat] = useState('');
  const [form, setForm] = useState<PlannerFormState>(() => buildInitialFormState(planner.form.fields));
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [result, setResult] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const apiKey = (import.meta.env.VITE_GOOGLE_AI_API_KEY ?? '').trim();
  const apiBase = import.meta.env.VITE_GOOGLE_AI_API_URL ?? planner.apiBase;
  const model = import.meta.env.VITE_GOOGLE_AI_MODEL ?? planner.defaultModel;

  const currentThreat = useMemo(
    () => planner.threats.find((threat) => threat.id === selectedThreat) ?? null,
    [planner.threats, selectedThreat]
  );

  const handleFieldChange = (id: PlannerFieldId) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setFeedback((prev) => (prev?.type === 'error' ? null : prev));
  };

const handleThreatChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedThreat(event.target.value);
    setFeedback(null);
  };

  const resetForm = () => {
    setForm(buildInitialFormState(planner.form.fields));
    setSelectedThreat('');
    setStatus('idle');
    setResult('');
    setFeedback(null);
  };

  const runFallback = (tokens: Record<string, string>, messageKey?: TranslationKey) => {
    const fallback = formatTemplate(t(planner.result.fallbackKey), tokens);
    setResult(fallback);
    setStatus('success');
    if (messageKey) {
      setFeedback({ type: 'notice', message: t(messageKey) });
    }
  };

  const handleSubmit = async () => {
    if (!currentThreat) {
      setFeedback({ type: 'error', message: t(planner.messages.missingThreatKey) });
      return;
    }

    const missing = planner.form.fields.filter((field) => !form[field.id].trim());
    if (missing.length > 0) {
      setFeedback({ type: 'error', message: t(planner.messages.missingFieldsKey) });
      return;
    }

    setStatus('loading');
    setResult('');
    setFeedback(null);

    const tokens = {
      threat: t(currentThreat.labelKey),
      threatDescription: t(currentThreat.promptKey),
      responsible: form.responsible.trim(),
      actions: form.actions.trim(),
      internal: form.internal.trim(),
      external: form.external.trim()
    };

    if (!apiKey) {
      runFallback(tokens, planner.messages.missingKeyKey);
      return;
    }

    try {
      const prompt = `${formatTemplate(t(planner.promptTemplateKey), tokens)}\n\n${t(planner.promptToneKey)}`;
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
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const payload = await response.json();
      const text = extractAiText(payload);
      if (text) {
        setResult(text);
        setStatus('success');
        return;
      }

      runFallback(tokens, planner.messages.networkErrorKey);
    } catch (error) {
      runFallback(tokens, planner.messages.networkErrorKey);
    }
  };

  const currentNotice = feedback ? (
    <p
      className={feedback.type === 'error' ? styles.errorMessage : styles.noticeMessage}
      role={feedback.type === 'error' ? 'alert' : 'status'}
    >
      {feedback.message}
    </p>
  ) : null;

  const resultContent = (() => {
    if (status === 'loading') {
      return <p className={styles.placeholder}>{t(planner.result.loadingKey)}</p>;
    }

    if (status === 'idle' || !result) {
      return <p className={styles.placeholder}>{t(planner.result.placeholderKey)}</p>;
    }

    return (
      <div className={styles.resultBody}>
        <p>{result}</p>
      </div>
    );
  })();

  return (
    <section id="ai-planner" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(planner.badgeKey)}</span>
          <h2>{t(planner.titleKey)}</h2>
          <p className={styles.lead}>{t(planner.introKey)}</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.formCard} data-animate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="threat-select">
                {t(planner.threatLabelKey)}
              </label>
              <select
                id="threat-select"
                className={styles.select}
                value={selectedThreat}
                onChange={handleThreatChange}
              >
                <option value="">{t(planner.threatPlaceholderKey)}</option>
                {planner.threats.map((threat) => (
                  <option key={threat.id} value={threat.id}>
                    {t(threat.labelKey)}
                  </option>
                ))}
              </select>
              {currentThreat ? (
                <p className={styles.hint}>{t(currentThreat.descriptionKey)}</p>
              ) : (
                <p className={styles.hint}>{t(planner.helperKey)}</p>
              )}
            </div>

            {planner.form.fields.map((field) => {
              const inputId = `planner-${field.id}`;
              const value = form[field.id];
              return (
                <div key={field.id} className={styles.field}>
                  <label className={styles.label} htmlFor={inputId}>
                    {t(field.labelKey)}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={inputId}
                      className={`${styles.input} ${styles.textarea}`}
                      value={value}
                      onChange={handleFieldChange(field.id)}
                      placeholder={t(field.placeholderKey)}
                      rows={5}
                    />
                  ) : (
                    <input
                      id={inputId}
                      className={styles.input}
                      type="text"
                      value={value}
                      placeholder={t(field.placeholderKey)}
                      onChange={handleFieldChange(field.id)}
                    />
                  )}
                </div>
              );
            })}

            {currentNotice}

            <div className={styles.actions}>
              <button type="button" className={styles.primaryButton} onClick={handleSubmit}>
                {t(planner.form.submitKey)}
              </button>
              <button type="button" className={styles.secondaryButton} onClick={resetForm}>
                {t(planner.form.resetKey)}
              </button>
            </div>
          </div>

          <aside className={styles.resultCard} data-animate aria-live="polite">
            <h3>{t(planner.result.titleKey)}</h3>
            <p className={styles.resultHelper}>{t(planner.result.helperKey)}</p>
            {resultContent}
            <p className={styles.disclaimer}>{t(planner.result.disclaimerKey)}</p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ThreatResponsePlanner;
