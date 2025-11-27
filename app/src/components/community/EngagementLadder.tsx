import { useState } from 'react';
import styles from './EngagementLadder.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { CommunityPageContent } from '../../data/pages/community';

type EngagementLadderProps = {
  ladder: CommunityPageContent['ladder'];
};

const iconPath = (fileName: string) => new URL(`../../assets/icons/${fileName}`, import.meta.url).href;

const EngagementLadder = ({ ladder }: EngagementLadderProps) => {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string>(ladder.steps[0]?.id ?? '');
  const activeStep = ladder.steps.find((step) => step.id === activeId) ?? ladder.steps[0];

  return (
    <section id="ladder" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{t(ladder.badgeKey)}</span>
          <h2>{t(ladder.titleKey)}</h2>
          <p className={styles.lead}>{t(ladder.introKey)}</p>
          <div className={styles.highlight}>
            <span>{t(ladder.highlightKey)}</span>
          </div>
        </div>
        <div className={styles.layout}>
          <div className={styles.steps}>
            {ladder.steps.map((step, index) => {
              const isActive = step.id === activeStep?.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  className={`${styles.step} ${isActive ? styles.active : ''}`}
                  onClick={() => setActiveId(step.id)}
                  aria-pressed={isActive}
                >
                  <span className={styles.stepIndex}>{index + 1}</span>
                  <span className={styles.stepBody}>
                    <span className={styles.stepTitle}>{t(step.titleKey)}</span>
                    <span className={styles.stepHint}>{t(step.descriptionKey)}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <aside className={styles.panel}>
            {activeStep ? (
              <div className={styles.panelInner}>
                <div className={styles.panelHeader}>
                  <span className={styles.panelIcon}>
                    <img src={iconPath(activeStep.icon)} alt="" aria-hidden />
                  </span>
                  <div>
                    <h3>{t(activeStep.titleKey)}</h3>
                    <p>{t(activeStep.descriptionKey)}</p>
                  </div>
                </div>
                <div className={styles.panelActions}>
                  <h4>{t(ladder.panelTitleKey)}</h4>
                  <div dangerouslySetInnerHTML={{ __html: t(activeStep.actionsKey) }} />
                </div>
              </div>
            ) : (
              <div className={styles.panelInner}>
                <p>{t(ladder.panelEmptyKey)}</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default EngagementLadder;
