import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import type { LegalSecurityPageContent } from '../../data/pages/legalSecurity';
import styles from './SecurityAuditChecklist.module.css';

type SecurityAuditChecklistProps = {
  security: LegalSecurityPageContent['security'];
};

const SecurityAuditChecklist = ({ security }: SecurityAuditChecklistProps) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Set<string>>(() => new Set());

  const total = security.items.length;

  const toggle = (id: string) => {
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

  const reset = () => setSelected(new Set());

  const progress = total > 0 ? Math.round((selected.size / total) * 100) : 0;

  return (
    <section id="security" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(security.badgeKey)}</span>
          <h2>{t(security.titleKey)}</h2>
          <p className={styles.lead}>{t(security.introKey)}</p>
        </header>

        <div className={styles.grid}>
          <div className={styles.list}>
            {security.items.map((item) => {
              const isChecked = selected.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  className={styles.item}
                  data-selected={isChecked || undefined}
                  onClick={() => toggle(item.id)}
                  aria-pressed={isChecked}
                >
                  <span className={styles.checkbox} aria-hidden>
                    <svg viewBox="0 0 20 20">
                      <rect x="1" y="1" width="18" height="18" rx="5" />
                      <path d="M6 10.5l2.5 2.5L14 7" />
                    </svg>
                  </span>
                  <span className={styles.itemText}>
                    <strong>{t(item.titleKey)}</strong>
                    <span>{t(item.descriptionKey)}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <aside className={styles.summary} data-animate>
            <h3>{t(security.helperKey)}</h3>
            <p className={styles.progressLabel}>{t(security.summaryKey)}</p>
            <div className={styles.progress} role="img" aria-label={`${selected.size} / ${total}`}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }} />
              <span className={styles.progressValue}>{progress}%</span>
            </div>
            <p className={styles.helperText}>
              {selected.size} / {total}
            </p>
            <button type="button" className={styles.reset} onClick={reset}>
              {t(security.resetKey)}
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default SecurityAuditChecklist;
