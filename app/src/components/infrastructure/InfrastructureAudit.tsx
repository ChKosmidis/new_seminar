import { useMemo, useState } from 'react';
import styles from './InfrastructureAudit.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { InfrastructurePageContent } from '../../data/pages/infrastructure';

type InfrastructureAuditProps = {
  audit: InfrastructurePageContent['audit'];
};

type ResultState = {
  overall: number;
  level: InfrastructurePageContent['audit']['result']['levels'][number];
  categoryScores: Record<string, number>;
};

const iconPath = (fileName: string) => new URL(`../../assets/icons/${fileName}`, import.meta.url).href;

const formatTemplate = (template: string, tokens: Record<string, string>) =>
  template.replace(/\{([^}]+)\}/g, (_, key) => tokens[key] ?? '');

const InfrastructureAudit = ({ audit }: InfrastructureAuditProps) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [result, setResult] = useState<ResultState | null>(null);

  const totals = useMemo(
    () =>
      audit.categories.reduce<Record<string, number>>((acc, category) => {
        acc[category.id] = category.items.length;
        return acc;
      }, {}),
    [audit.categories]
  );

  const toggleItem = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSubmit = () => {
    const categoryScores = audit.categories.reduce<Record<string, number>>((acc, category) => {
      const total = totals[category.id] ?? 0;
      if (total === 0) {
        acc[category.id] = 0;
        return acc;
      }

      const selectedCount = category.items.filter((item) => selected.has(item.id)).length;
      acc[category.id] = Math.round((selectedCount / total) * 100);
      return acc;
    }, {});

    const totalItems = audit.categories.reduce((sum, category) => sum + category.items.length, 0);
    const selectedCount = Array.from(selected).length;
    const overall = totalItems > 0 ? Math.round((selectedCount / totalItems) * 100) : 0;

    const level = audit.result.levels.find((item) => overall >= item.minScore) ?? audit.result.levels.at(-1)!;

    setResult({ overall, level, categoryScores });
  };

  return (
    <section id="audit" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header} data-animate>
          <span className={styles.badge}>{t(audit.badgeKey)}</span>
          <h2>{t(audit.titleKey)}</h2>
          <p className={styles.lead}>{t(audit.introKey)}</p>
          <p className={styles.helper}>{t(audit.helperKey)}</p>
        </div>

        <div className={styles.categories}>
          {audit.categories.map((category) => (
            <article key={category.id} className={styles.category} data-animate>
              <header className={styles.categoryHeader}>
                <span className={styles.iconWrapper}>
                  <img src={iconPath(category.icon)} alt="" aria-hidden />
                </span>
                <div>
                  <h3>{t(category.titleKey)}</h3>
                  {category.descriptionKey ? <p>{t(category.descriptionKey)}</p> : null}
                </div>
              </header>
              <div className={styles.itemsGrid}>
                {category.items.map((item) => {
                  const isSelected = selected.has(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={styles.item}
                      data-selected={isSelected || undefined}
                      onClick={() => toggleItem(item.id)}
                      aria-pressed={isSelected}
                    >
                      <span className={styles.checkmark} aria-hidden>
                        <svg viewBox="0 0 20 20" focusable="false" role="presentation">
                          <circle cx="10" cy="10" r="9" />
                          <path d="M6 10.5l2.5 2.5L14 7" />
                        </svg>
                      </span>
                      <span className={styles.itemLabel}>{t(item.labelKey)}</span>
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.actions} data-animate>
          <button type="button" className={styles.actionButton} onClick={handleSubmit}>
            {t(audit.actionKey)}
          </button>
        </div>

        <aside id="results" className={styles.result} data-animate>
          <div className={styles.resultHeader}>
            <h3>{t(audit.result.titleKey)}</h3>
          </div>
          {result ? (
            <div className={styles.resultBody}>
              <div className={styles.summary}>
                <p className={styles.summaryScore}>
                  {formatTemplate(t(audit.result.summaryKey), {
                    percent: String(result.overall),
                    level: t(result.level.titleKey)
                  })}
                </p>
                <p className={styles.summaryComment}>{t(result.level.descriptionKey)}</p>
              </div>
              <div className={styles.progress}>
                <h4>{t(audit.result.progressTitleKey)}</h4>
                <ul className={styles.progressList}>
                  {audit.categories.map((category) => {
                    const score = result.categoryScores[category.id] ?? 0;
                    const label = t(category.progressLabelKey ?? category.titleKey);
                    const ariaLabel = formatTemplate(t(audit.result.progressAriaKey), {
                      category: label,
                      percent: String(score)
                    });
                    return (
                      <li key={`${category.id}-progress`} className={styles.progressItem}>
                        <div className={styles.progressLabel}>{label}</div>
                        <div className={styles.progressTrack} role="progressbar" aria-label={ariaLabel} aria-valuemin={0} aria-valuemax={100} aria-valuenow={score}>
                          <span className={styles.progressFill} style={{ width: `${score}%` }} />
                          <span className={styles.progressValue}>{score}%</span>
                        </div>
                      </li>
                    );
                  })}
                  <li key="overall" className={styles.progressItem}>
                    <div className={styles.progressLabel}>{t(audit.result.overallLabelKey)}</div>
                    <div
                      className={styles.progressTrack}
                      role="progressbar"
                      aria-label={formatTemplate(t(audit.result.progressAriaKey), {
                        category: t(audit.result.overallLabelKey),
                        percent: String(result.overall)
                      })}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={result.overall}
                    >
                      <span className={styles.progressFill} style={{ width: `${result.overall}%` }} />
                      <span className={styles.progressValue}>{result.overall}%</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <p className={styles.placeholder}>{t(audit.result.defaultKey)}</p>
          )}
        </aside>
      </div>
    </section>
  );
};

export default InfrastructureAudit;
