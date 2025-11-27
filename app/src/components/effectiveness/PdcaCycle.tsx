import { useState } from 'react';
import styles from './PdcaCycle.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { EffectivenessPageContent } from '../../data/pages/effectiveness';

const iconPath = (fileName: string) => new URL(`../../assets/icons/${fileName}`, import.meta.url).href;

type PdcaCycleProps = {
  pdca: EffectivenessPageContent['pdca'];
};

const PdcaCycle = ({ pdca }: PdcaCycleProps) => {
  const { t } = useTranslation();
  const [openSteps, setOpenSteps] = useState<Set<string>>(() => {
    const initial = pdca.steps[0]?.id;
    return initial ? new Set([initial]) : new Set();
  });

  const toggle = (id: string) => {
    setOpenSteps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="pdca" className={styles.section} aria-labelledby="pdca-title">
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(pdca.badgeKey)}</span>
          <h2 id="pdca-title">{t(pdca.titleKey)}</h2>
          <p className={styles.lead}>{t(pdca.introKey)}</p>
        </header>

        <div className={styles.steps}>
          {pdca.steps.map((step) => {
            const isOpen = openSteps.has(step.id);
            return (
              <article
                key={step.id}
                className={styles.step}
                data-open={isOpen || undefined}
                onClick={() => toggle(step.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggle(step.id);
                  }
                }}
              >
                <div className={styles.titleRow}>
                  <span className={styles.icon} aria-hidden>
                    <img src={iconPath(step.icon)} alt="" />
                  </span>
                  <h3>{t(step.titleKey)}</h3>
                </div>
                <p className={styles.summary}>{t(step.descriptionKey)}</p>
                {isOpen ? (
                  <div className={styles.details}>
                    <p className={styles.example}>{t(step.exampleKey)}</p>
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

export default PdcaCycle;
