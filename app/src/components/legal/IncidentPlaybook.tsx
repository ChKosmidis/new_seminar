import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import type { LegalSecurityPageContent } from '../../data/pages/legalSecurity';
import styles from './IncidentPlaybook.module.css';

type IncidentPlaybookProps = {
  playbook: LegalSecurityPageContent['playbook'];
};

const IncidentPlaybook = ({ playbook }: IncidentPlaybookProps) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(playbook.scenarios[0]?.id ?? '');

  const current = playbook.scenarios.find((scenario) => scenario.id === active) ?? playbook.scenarios[0];

  return (
    <section id="playbook" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(playbook.badgeKey)}</span>
          <h2>{t(playbook.titleKey)}</h2>
          <p className={styles.lead}>{t(playbook.introKey)}</p>
        </header>

        <div className={styles.layout}>
          <aside className={styles.sidebar} data-animate>
            <p className={styles.label}>{t(playbook.selectLabelKey)}</p>
            <div className={styles.buttonGroup}>
              {playbook.scenarios.map((scenario) => {
                const isActive = scenario.id === current?.id;
                return (
                  <button
                    key={scenario.id}
                    type="button"
                    className={styles.scenarioButton}
                    data-active={isActive || undefined}
                    onClick={() => setActive(scenario.id)}
                  >
                    <span className={styles.scenarioTitle}>{t(scenario.titleKey)}</span>
                    <span className={styles.scenarioHint}>{t(scenario.descriptionKey)}</span>
                  </button>
                );
              })}
            </div>
            <p className={styles.helper}>{t(playbook.helperKey)}</p>
          </aside>

          {current ? (
            <article className={styles.content} data-animate>
              <header className={styles.contentHeader}>
                <h3>{t(current.titleKey)}</h3>
                <p>{t(current.descriptionKey)}</p>
              </header>
              <div className={styles.columns}>
                <div className={styles.column}>
                  <h4>{t(playbook.blocks.actionsTitleKey)}</h4>
                  <ul>
                    {current.actions.map((action) => (
                      <li key={`${current.id}-${action}`}>{t(action)}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.column}>
                  <h4>{t(playbook.blocks.commsTitleKey)}</h4>
                  <ul>
                    {current.communications.map((item) => (
                      <li key={`${current.id}-${item}`}>{t(item)}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.column}>
                  <h4>{t(playbook.blocks.supportTitleKey)}</h4>
                  <ul>
                    {current.support.map((item) => (
                      <li key={`${current.id}-${item}`}>{t(item)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default IncidentPlaybook;
