import { useMemo, useState } from 'react';
import styles from './CommunicationImprovement.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { InternalCommunicationsPageContent } from '../../data/pages/internalCommunications';

const formatTemplate = (template: string, tokens: Record<string, string>) =>
  template.replace(/\{([^}]+)\}/g, (_, key) => tokens[key] ?? '');

type CommunicationImprovementProps = {
  improvement: InternalCommunicationsPageContent['improvement'];
};

type ImprovementIdea = {
  tool: string;
  reason: string;
};

const CommunicationImprovement = ({ improvement }: CommunicationImprovementProps) => {
  const { t } = useTranslation();

  const initialIdeas: ImprovementIdea[] = useMemo(
    () => improvement.fields.map(() => ({ tool: '', reason: '' })),
    [improvement.fields]
  );

  const [ideas, setIdeas] = useState<ImprovementIdea[]>(initialIdeas);
  const [result, setResult] = useState<ImprovementIdea[] | null>(null);
  const [error, setError] = useState<string>('');

  const handleChange = (index: number, field: keyof ImprovementIdea, value: string) => {
    setIdeas((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSubmit = () => {
    const trimmed = ideas.map((item) => ({ tool: item.tool.trim(), reason: item.reason.trim() }));
    const isComplete = trimmed.every((item) => item.tool && item.reason);

    if (!isComplete) {
      setError(t(improvement.errorKey));
      setResult(null);
      return;
    }

    setError('');
    setResult(trimmed);
  };

  const handleReset = () => {
    setIdeas(initialIdeas);
    setResult(null);
    setError('');
  };

  const renderedResult = useMemo(() => {
    if (!result) {
      return null;
    }

    const template = t(improvement.resultItemKey);
    const items = result.map((item, index) =>
      template === improvement.resultItemKey
        ? `${item.tool} — ${item.reason}`
        : formatTemplate(template, {
            index: String(index + 1),
            tool: item.tool,
            reason: item.reason
          })
    );

    return {
      intro: t(improvement.resultIntroKey),
      outro: t(improvement.resultOutroKey),
      items
    };
  }, [improvement.resultIntroKey, improvement.resultItemKey, improvement.resultOutroKey, result, t]);

  return (
    <section id="improvement" className={styles.section}>
      <div className={styles.container} data-animate>
        <span className={styles.badge}>{t(improvement.badgeKey)}</span>
        <h2>{t(improvement.titleKey)}</h2>
        <p className={styles.intro}>{t(improvement.introKey)}</p>

        <div className={styles.formGrid}>
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            {improvement.fields.map((field, index) => (
              <fieldset key={field.id} className={styles.fieldset}>
                <legend>{t(field.toolLabelKey)}</legend>
                <input
                  className={styles.input}
                  value={ideas[index]?.tool ?? ''}
                  onChange={(event) => handleChange(index, 'tool', event.target.value)}
                  placeholder={t(field.toolPlaceholderKey)}
                  type="text"
                />
                <label className={styles.reasonLabel}>
                  {t(improvement.reasonLabelKey)}
                  <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    value={ideas[index]?.reason ?? ''}
                    onChange={(event) => handleChange(index, 'reason', event.target.value)}
                    placeholder={t(field.reasonPlaceholderKey)}
                    rows={3}
                  />
                </label>
              </fieldset>
            ))}
            {error ? <div className={styles.error}>{error}</div> : null}
            <div className={styles.actions}>
              <button type="submit" className={styles.primaryButton}>
                {t(improvement.submitKey)}
              </button>
              <button type="button" className={styles.secondaryButton} onClick={handleReset}>
                {t(improvement.resetKey)}
              </button>
            </div>
          </form>

          <aside className={styles.resultBox}>
            <h3>{t(improvement.resultTitleKey)}</h3>
            {renderedResult ? (
              <div className={styles.resultContent}>
                <p>{renderedResult.intro}</p>
                <ul>
                  {renderedResult.items.map((item, index) => (
                    <li key={`${item}-${index}`}>{item}</li>
                  ))}
                </ul>
                <p>{renderedResult.outro}</p>
              </div>
            ) : (
              <p className={styles.placeholder}>{t(improvement.resultDefaultKey)}</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CommunicationImprovement;
