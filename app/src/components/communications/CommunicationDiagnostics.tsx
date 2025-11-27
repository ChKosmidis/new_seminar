import { useState } from 'react';
import styles from './CommunicationDiagnostics.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { InternalCommunicationsPageContent } from '../../data/pages/internalCommunications';

type CommunicationDiagnosticsProps = {
  diagnostics: InternalCommunicationsPageContent['diagnostics'];
  feedback: InternalCommunicationsPageContent['feedback'];
};

const ToggleChevron = ({ isOpen }: { isOpen: boolean }) => (
  <span className={styles.toggleIcon} data-open={isOpen} aria-hidden="true">
    <svg viewBox="0 0 24 24" focusable="false" role="presentation">
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  </span>
);

const CommunicationDiagnostics = ({ diagnostics, feedback }: CommunicationDiagnosticsProps) => {
  const { t } = useTranslation();
  const [openCards, setOpenCards] = useState<readonly string[]>([]);

  const handleToggle = (id: string) => {
    setOpenCards((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <section id="diagnostics" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header} data-animate>
          <span className={styles.badge}>{t(diagnostics.badgeKey)}</span>
          <h2>{t(diagnostics.titleKey)}</h2>
          <p>{t(diagnostics.introKey)}</p>
        </div>
        <div className={styles.grid}>
          {diagnostics.items.map((item) => {
            const isOpen = openCards.includes(item.id);
            return (
              <article key={item.id} className={`${styles.card} ${isOpen ? styles.cardOpen : ''}`} data-animate>
                <button
                  type="button"
                  className={styles.cardButton}
                  onClick={() => handleToggle(item.id)}
                  aria-expanded={isOpen}
                >
                  <div className={styles.cardFront}>
                    <h3>{t(item.problemKey)}</h3>
                    <p>{t(item.hintKey)}</p>
                  </div>
                  <ToggleChevron isOpen={isOpen} />
                </button>
                <div className={styles.cardBack} data-open={isOpen}>
                  <h4>{t(item.solutionTitleKey)}</h4>
                  <ul>
                    {item.solutions.map((solution) => (
                      <li key={solution}>{t(solution)}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.feedback} data-animate>
          <div className={styles.feedbackHeader}>
            <h3>{t(feedback.titleKey)}</h3>
            <p>{t(feedback.introKey)}</p>
          </div>
          <div className={styles.feedbackGrid}>
            {feedback.principles.map((principle) => (
              <article key={principle.id} className={styles.feedbackCard}>
                <h4>{t(principle.titleKey)}</h4>
                <p>{t(principle.descriptionKey)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunicationDiagnostics;
