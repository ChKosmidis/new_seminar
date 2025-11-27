import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import styles from './CommunityTools.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { CommunityPageContent } from '../../data/pages/community';

const formatTemplate = (template: string, tokens: Record<string, string>) =>
  template.replace(/\{([^}]+)\}/g, (_, key) => tokens[key] ?? '');

type CommunityToolsProps = {
  tools: CommunityPageContent['tools'];
};

const CommunityTools = ({ tools }: CommunityToolsProps) => {
  const { t } = useTranslation();
  type ToolFormState = { tool: string; purpose: string };

  const initialFormState: ToolFormState = { tool: '', purpose: '' };

  const [activeId, setActiveId] = useState<string>(tools.items[0]?.id ?? '');
  const [form, setForm] = useState<ToolFormState>(initialFormState);
  const [advice, setAdvice] = useState<string>('');
  const [error, setError] = useState<string>('');

  const activeTool = useMemo(
    () => tools.items.find((item) => item.id === activeId) ?? tools.items[0],
    [activeId, tools.items]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.tool.trim() || !form.purpose.trim()) {
      setError(t(tools.formErrorKey));
      setAdvice('');
      return;
    }

    setError('');
    const normalized = `${form.tool} ${form.purpose}`.toLowerCase();
    const suggestion = tools.suggestions.find((item) =>
      item.keywords.some((keyword) => normalized.includes(keyword.toLowerCase()))
    );

    if (suggestion) {
      setAdvice(t(suggestion.adviceKey));
      return;
    }

    const template = t(tools.responseTemplateKey);
    if (template === tools.responseTemplateKey) {
      setAdvice(t(tools.responseFallbackKey));
      return;
    }

    const filled = formatTemplate(template, {
      toolName: form.tool.trim(),
      toolPurpose: form.purpose.trim()
    });
    setAdvice(filled);
    setForm(initialFormState);
  };

  return (
    <section id="tools" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{t(tools.badgeKey)}</span>
          <h2>{t(tools.titleKey)}</h2>
          <p className={styles.lead}>{t(tools.introKey)}</p>
        </div>
        <div className={styles.layout}>
          <div className={styles.list}>
            {tools.items.map((item) => {
              const isActive = item.id === activeTool?.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.item} ${isActive ? styles.active : ''}`}
                  onClick={() => setActiveId(item.id)}
                  aria-pressed={isActive}
                >
                  <span className={styles.itemTitle}>{t(item.labelKey)}</span>
                  <span className={styles.itemDescription}>{t(item.descriptionKey)}</span>
                </button>
              );
            })}
          </div>
          <aside className={styles.panel}>
            <div className={styles.panelInner}>
              <h3>{t(tools.panelTitleKey)}</h3>
              {activeTool ? (
                <div className={styles.panelBody} dangerouslySetInnerHTML={{ __html: t(activeTool.detailsKey) }} />
              ) : (
                <p>{t(tools.panelEmptyKey)}</p>
              )}
            </div>
          </aside>
        </div>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h3>{t(tools.formTitleKey)}</h3>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="tool-name">
              {t(tools.formToolLabelKey)}
              <input
                id="tool-name"
                className={styles.input}
                value={form.tool}
                onChange={(event) => setForm((prev) => ({ ...prev, tool: event.target.value }))}
                placeholder={t(tools.formToolPlaceholderKey)}
              />
            </label>
            <label className={styles.label} htmlFor="tool-purpose">
              {t(tools.formPurposeLabelKey)}
              <textarea
                id="tool-purpose"
                className={`${styles.input} ${styles.textarea}`}
                value={form.purpose}
                onChange={(event) => setForm((prev) => ({ ...prev, purpose: event.target.value }))}
                placeholder={t(tools.formPurposePlaceholderKey)}
              />
            </label>
            {error ? <div className={styles.error}>{error}</div> : null}
            <button type="submit" className={styles.submit}>
              {t(tools.formSubmitKey)}
            </button>
          </form>
          <div className={styles.adviceBox}>
            <h4>{t(tools.responseTitleKey)}</h4>
            <p>{advice || t(tools.responseDefaultKey)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityTools;
