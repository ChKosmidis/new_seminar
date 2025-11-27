import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import styles from './InfrastructureBrainstorm.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { InfrastructurePageContent } from '../../data/pages/infrastructure';

type InfrastructureBrainstormProps = {
  brainstorm: InfrastructurePageContent['brainstorm'];
};

type BrainstormEntry = {
  aspect: string;
  action: string;
};

const formatTemplate = (template: string, tokens: Record<string, string>) =>
  template.replace(/\{([^}]+)\}/g, (_, key) => tokens[key] ?? '');

const InfrastructureBrainstorm = ({ brainstorm }: InfrastructureBrainstormProps) => {
  const { t } = useTranslation();

  const initialEntries = useMemo(
    () => brainstorm.fields.map(() => ({ aspect: '', action: '' })),
    [brainstorm.fields]
  );

  const [entries, setEntries] = useState<BrainstormEntry[]>(initialEntries);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ intro: string; items: string[]; outro: string; advice: string } | null>(null);

  const handleChange = (index: number, field: keyof BrainstormEntry, value: string) => {
    setEntries((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = entries.map((entry) => ({
      aspect: entry.aspect.trim(),
      action: entry.action.trim()
    }));

    const hasContent = trimmed.some((entry) => entry.aspect || entry.action);

    if (!hasContent) {
      setResult(null);
      setError(t(brainstorm.emptyErrorKey));
      return;
    }

    setError('');

    const items = trimmed
      .map((entry, index) => {
        if (!entry.aspect && !entry.action) {
          return null;
        }

        const aspect = entry.aspect || t(brainstorm.fallbackAspectKey);
        const action = entry.action || t(brainstorm.fallbackActionKey);

        return formatTemplate(t(brainstorm.resultItemKey), {
          index: String(index + 1),
          aspect,
          action
        });
      })
      .filter((item): item is string => Boolean(item));

    setResult({
      intro: t(brainstorm.resultIntroKey),
      items,
      outro: t(brainstorm.resultOutroKey),
      advice: t(brainstorm.resultAdviceKey)
    });
  };

  const handleReset = () => {
    setEntries(initialEntries);
    setError('');
    setResult(null);
  };

  return (
    <section id="brainstorm" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(brainstorm.badgeKey)}</span>
          <h2>{t(brainstorm.titleKey)}</h2>
          <p className={styles.lead}>{t(brainstorm.introKey)}</p>
        </header>

        <div className={styles.layout}>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            data-animate
          >
            {brainstorm.fields.map((field, index) => (
              <fieldset key={field.id} className={styles.fieldset}>
                <legend>{t(field.aspectLabelKey)}</legend>
                <label className={styles.label}>
                  <span>{t(field.aspectPromptKey)}</span>
                  <input
                    type="text"
                    value={entries[index]?.aspect ?? ''}
                    onChange={(event) => handleChange(index, 'aspect', event.target.value)}
                    placeholder={t(field.aspectPlaceholderKey)}
                  />
                </label>
                <label className={styles.label}>
                  <span>{t(field.actionLabelKey)}</span>
                  <textarea
                    value={entries[index]?.action ?? ''}
                    onChange={(event) => handleChange(index, 'action', event.target.value)}
                    placeholder={t(field.actionPlaceholderKey)}
                    rows={3}
                  />
                </label>
              </fieldset>
            ))}

            {error ? <div className={styles.error}>{error}</div> : null}

            <div className={styles.actions}>
              <button type="submit" className={styles.primaryButton}>
                {t(brainstorm.submitKey)}
              </button>
              <button type="button" className={styles.secondaryButton} onClick={handleReset}>
                {t(brainstorm.resetKey)}
              </button>
            </div>
          </form>

          <aside className={styles.result} data-animate>
            <h3>{t(brainstorm.resultTitleKey)}</h3>
            {result ? (
              <div className={styles.resultBody}>
                <p>{result.intro}</p>
                <ul>
                  {result.items.map((item, index) => (
                    <li key={`${item}-${index}`}>{item}</li>
                  ))}
                </ul>
                <p>{result.outro}</p>
                <p className={styles.resultAdvice}>{result.advice}</p>
              </div>
            ) : (
              <p className={styles.placeholder}>{t(brainstorm.resultDefaultKey)}</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureBrainstorm;
