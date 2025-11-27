import { useMemo, useState, type ChangeEvent } from 'react';
import styles from './FundraisingIdeaForm.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import { extractAiText, formatTemplate } from '../../utils/ai';
import type { FundraisingPageContent } from '../../data/pages/fundraising';
import type { TranslationKey } from '../../data/i18n/types';

type FundraisingIdeaFormProps = {
  advisor: FundraisingPageContent['advisor'];
};

type FormState = {
  idea: string;
  team: string;
  method: string;
  amount: string;
};

type FeedbackState = { type: 'error' | 'notice'; message: string } | null;

const initialFormState: FormState = {
  idea: '',
  team: '',
  method: '',
  amount: ''
};

const splitResult = (text: string) => text.split(/\n{2,}/).filter(Boolean);

const FundraisingIdeaForm = ({ advisor }: FundraisingIdeaFormProps) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [result, setResult] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const apiKey = (import.meta.env.VITE_GOOGLE_AI_API_KEY ?? '').trim();
  const apiBase = import.meta.env.VITE_GOOGLE_AI_API_URL ?? advisor.prompt.apiBase;
  const model = import.meta.env.VITE_GOOGLE_AI_MODEL ?? advisor.prompt.defaultModel;

  const selectedMethod = useMemo(
    () => advisor.form.methods.find((method) => method.value === form.method) ?? null,
    [advisor.form.methods, form.method]
  );

  const handleInputChange = (field: keyof FormState) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setFeedback((prev) => (prev?.type === 'error' ? null : prev));
  };

  const handleReset = () => {
    setForm(initialFormState);
    setStatus('idle');
    setResult('');
    setFeedback(null);
  };

  const formatTeam = () => {
    const value = form.team.trim();
    if (!value) {
      return t(advisor.defaults.teamKey);
    }
    return formatTemplate(t(advisor.result.teamFormatKey), { count: value });
  };

  const formatAmount = () => {
    const value = form.amount.trim();
    if (!value) {
      return t(advisor.defaults.amountKey);
    }
    return formatTemplate(t(advisor.result.amountFormatKey), { amount: value });
  };

  const runFallback = (tokens: Record<string, string>, messageKey?: TranslationKey) => {
    const fallback = formatTemplate(t(advisor.result.fallbackTemplateKey), tokens);
    setResult(fallback);
    setStatus('success');
    setFeedback({ type: 'notice', message: t(messageKey ?? advisor.messages.fallbackNoticeKey) });
  };

  const handleSubmit = async () => {
    const trimmedIdea = form.idea.trim();
    const trimmedAmount = form.amount.trim();

    if (!trimmedIdea || !selectedMethod || !trimmedAmount) {
      setFeedback({ type: 'error', message: t(advisor.messages.missingFieldsKey) });
      return;
    }

    setStatus('loading');
    setResult('');
    setFeedback(null);

    const tokens = {
      idea: trimmedIdea,
      method: t(selectedMethod.labelKey),
      methodPrompt: t(selectedMethod.promptKey),
      team: formatTeam(),
      amount: formatAmount()
    };

    if (!apiKey) {
      runFallback(tokens, advisor.messages.missingKeyKey);
      return;
    }

    try {
      const prompt = `${t(advisor.prompt.systemKey)}\n\n${formatTemplate(t(advisor.prompt.templateKey), tokens)}\n\n${t(advisor.prompt.toneKey)}`;
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

      runFallback(tokens, advisor.messages.networkErrorKey);
    } catch (error) {
      runFallback(tokens, advisor.messages.networkErrorKey);
    }
  };

  const resultBody = (() => {
    if (status === 'loading') {
      return <p className={styles.placeholder}>{t(advisor.result.loadingKey)}</p>;
    }

    if (status === 'idle' || !result) {
      return <p className={styles.placeholder}>{t(advisor.result.placeholderKey)}</p>;
    }

    return (
      <div className={styles.resultBody}>
        {splitResult(result).map((block, index) => (
          <p key={index}>{block}</p>
        ))}
      </div>
    );
  })();

  return (
    <section id="ai-advisor" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(advisor.badgeKey)}</span>
          <h2>{t(advisor.titleKey)}</h2>
          <p className={styles.lead}>{t(advisor.leadKey)}</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.formCard} data-animate>
            <div className={styles.field}>
              <label htmlFor="fundraising-idea" className={styles.label}>
                {t(advisor.form.ideaLabelKey)}
              </label>
              <textarea
                id="fundraising-idea"
                className={`${styles.input} ${styles.textarea}`}
                value={form.idea}
                onChange={handleInputChange('idea')}
                placeholder={t(advisor.form.ideaPlaceholderKey)}
              />
            </div>

            <div className={styles.twoColumn}>
              <div className={styles.field}>
                <label htmlFor="fundraising-team" className={styles.label}>
                  {t(advisor.form.teamLabelKey)}
                </label>
                <input
                  id="fundraising-team"
                  className={styles.input}
                  type="number"
                  min={1}
                  value={form.team}
                  onChange={handleInputChange('team')}
                  placeholder={t(advisor.form.teamPlaceholderKey)}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="fundraising-amount" className={styles.label}>
                  {t(advisor.form.amountLabelKey)}
                </label>
                <input
                  id="fundraising-amount"
                  className={styles.input}
                  type="number"
                  min={100}
                  step={50}
                  value={form.amount}
                  onChange={handleInputChange('amount')}
                  placeholder={t(advisor.form.amountPlaceholderKey)}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="fundraising-method" className={styles.label}>
                {t(advisor.form.methodLabelKey)}
              </label>
              <select
                id="fundraising-method"
                className={styles.select}
                value={form.method}
                onChange={handleInputChange('method')}
              >
                <option value="">{t(advisor.form.methodPlaceholderKey)}</option>
                {advisor.form.methods.map((option) => (
                  <option key={option.value} value={option.value}>
                    {t(option.labelKey)}
                  </option>
                ))}
              </select>
              <p className={styles.hint}>
                {selectedMethod ? t(selectedMethod.promptKey) : t(advisor.helperKey)}
              </p>
            </div>

            {feedback ? (
              <p
                className={feedback.type === 'error' ? styles.errorMessage : styles.noticeMessage}
                role={feedback.type === 'error' ? 'alert' : 'status'}
              >
                {feedback.message}
              </p>
            ) : null}

            <div className={styles.actions}>
              <button type="button" className={styles.primaryButton} onClick={handleSubmit}>
                {t(advisor.form.submitKey)}
              </button>
              <button type="button" className={styles.secondaryButton} onClick={handleReset}>
                {t(advisor.form.resetKey)}
              </button>
            </div>
          </div>

          <aside className={styles.resultCard} data-animate>
            <h3>{t(advisor.result.titleKey)}</h3>
            {resultBody}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default FundraisingIdeaForm;
