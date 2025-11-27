import { useState, type ChangeEvent } from 'react';
import styles from './KpiBrainstorm.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { BrainstormResult, EffectivenessPageContent } from '../../data/pages/effectiveness';
import { extractAiText, formatTemplate } from '../../utils/ai';

type KpiBrainstormProps = {
  brainstorm: EffectivenessPageContent['brainstorm'];
  onUpdate: (result: BrainstormResult | null) => void;
};

type FormState = {
  areaId: string;
  kpi: string;
  rationale: string;
};

type FeedbackState = {
  status: 'idle' | 'loading';
  text: string;
  notice: string | null;
  error: string | null;
};

const buildInitialForm = (): FormState => ({ areaId: '', kpi: '', rationale: '' });

const KpiBrainstorm = ({ brainstorm, onUpdate }: KpiBrainstormProps) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>(() => buildInitialForm());
  const [feedback, setFeedback] = useState<FeedbackState>({ status: 'idle', text: '', notice: null, error: null });

  const apiKey = (import.meta.env.VITE_GOOGLE_AI_API_KEY ?? '').trim();
  const apiBase = import.meta.env.VITE_GOOGLE_AI_API_URL ?? brainstorm.apiBase;
  const model = import.meta.env.VITE_GOOGLE_AI_MODEL ?? brainstorm.defaultModel;

  const updateField = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [field]: value }));
    setFeedback((prev) => (prev.error ? { ...prev, error: null } : prev));
  };

  const resetForm = () => {
    setForm(buildInitialForm());
    setFeedback({ status: 'idle', text: '', notice: null, error: null });
    onUpdate(null);
  };

  const runFallback = (tokens: Record<string, string>, notice: string | null) => {
    const fallback = formatTemplate(t(brainstorm.fallbackTemplateKey), tokens);
    setFeedback({ status: 'idle', text: fallback, notice, error: null });
    onUpdate({ areaId: tokens.areaId ?? '', kpi: tokens.kpi ?? '', rationale: tokens.rationale ?? '', feedback: fallback, notice });
  };

  const handleSubmit = async () => {
    if (!form.areaId || !form.kpi.trim() || !form.rationale.trim()) {
      setFeedback((prev) => ({ ...prev, error: t(brainstorm.errorMissingKey) }));
      return;
    }

    const area = brainstorm.options.find((option) => option.id === form.areaId);
    const areaLabel = area ? t(area.labelKey) : '';
    const tokens = {
      area: areaLabel,
      areaId: form.areaId,
      kpi: form.kpi.trim(),
      rationale: form.rationale.trim()
    };

    setFeedback({ status: 'loading', text: '', notice: null, error: null });

    if (!apiKey) {
      runFallback(tokens, t(brainstorm.missingKeyKey));
      return;
    }

    try {
      const prompt = `${formatTemplate(t(brainstorm.promptTemplateKey), tokens)}\n\n${t(brainstorm.promptSystemKey)}`;
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
        setFeedback({ status: 'idle', text, notice: null, error: null });
        onUpdate({ areaId: form.areaId, kpi: tokens.kpi, rationale: tokens.rationale, feedback: text, notice: null });
        return;
      }

      runFallback(tokens, t(brainstorm.networkErrorKey));
    } catch (error) {
      runFallback(tokens, t(brainstorm.networkErrorKey));
    }
  };

  return (
    <section id="brainstorm" className={styles.section} aria-labelledby="brainstorm-title">
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(brainstorm.badgeKey)}</span>
          <h2 id="brainstorm-title">{t(brainstorm.titleKey)}</h2>
          <p className={styles.lead}>{t(brainstorm.leadKey)}</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.formCard} data-animate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="brainstorm-area">
                {t(brainstorm.areaLabelKey)}
              </label>
              <select
                id="brainstorm-area"
                className={styles.select}
                value={form.areaId}
                onChange={updateField('areaId')}
              >
                <option value="">{t(brainstorm.areaPlaceholderKey)}</option>
                {brainstorm.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {t(option.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="brainstorm-kpi">
                {t(brainstorm.kpiLabelKey)}
              </label>
              <input
                id="brainstorm-kpi"
                className={styles.input}
                type="text"
                value={form.kpi}
                placeholder={t(brainstorm.kpiPlaceholderKey)}
                onChange={updateField('kpi')}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="brainstorm-rationale">
                {t(brainstorm.rationaleLabelKey)}
              </label>
              <textarea
                id="brainstorm-rationale"
                className={styles.textarea}
                value={form.rationale}
                placeholder={t(brainstorm.rationalePlaceholderKey)}
                onChange={updateField('rationale')}
              />
            </div>

            {feedback.error ? (
              <p className={styles.notice} role="alert">
                {feedback.error}
              </p>
            ) : null}

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={handleSubmit}
                disabled={feedback.status === 'loading'}
              >
                {feedback.status === 'loading' ? t(brainstorm.resultLoadingKey) : t(brainstorm.submitKey)}
              </button>
              <button type="button" className={styles.secondaryButton} onClick={resetForm}>
                {t(brainstorm.resetKey)}
              </button>
            </div>
          </div>

          <aside className={styles.resultCard} data-animate aria-live="polite">
            <h3>{t(brainstorm.resultTitleKey)}</h3>
            <p className={styles.resultHelper}>{t(brainstorm.resultPlaceholderKey)}</p>
            {feedback.status === 'loading' ? (
              <p className={styles.placeholder}>{t(brainstorm.resultLoadingKey)}</p>
            ) : feedback.text ? (
              <p className={styles.resultBody}>{feedback.text}</p>
            ) : (
              <p className={styles.placeholder}>{t(brainstorm.resultPlaceholderKey)}</p>
            )}
            {feedback.notice ? <p className={styles.notice}>{feedback.notice}</p> : null}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default KpiBrainstorm;
