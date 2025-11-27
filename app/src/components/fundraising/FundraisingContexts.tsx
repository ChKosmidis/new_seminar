import { useState } from 'react';
import styles from './FundraisingContexts.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { FundraisingPageContent } from '../../data/pages/fundraising';

type FundraisingContextsProps = {
  contexts: FundraisingPageContent['contexts'];
};

const FundraisingContexts = ({ contexts }: FundraisingContextsProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(() => contexts.tabs[0]?.id ?? '');

  const current = contexts.tabs.find((tab) => tab.id === activeTab) ?? contexts.tabs[0];

  return (
    <section id="contexts" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(contexts.badgeKey)}</span>
          <h2>{t(contexts.titleKey)}</h2>
        </header>

        <div className={styles.tabs} role="tablist" aria-label={t(contexts.titleKey)}>
          {contexts.tabs.map((tab) => {
            const isActive = tab.id === current?.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={isActive ? styles.tabActive : styles.tab}
                role="tab"
                aria-selected={isActive}
                aria-controls={`fundraising-${tab.id}`}
                id={`fundraising-${tab.id}-tab`}
                onClick={() => setActiveTab(tab.id)}
              >
                {t(tab.labelKey)}
              </button>
            );
          })}
        </div>

        {current ? (
          <article
            className={styles.panel}
            role="tabpanel"
            id={`fundraising-${current.id}`}
            aria-labelledby={`fundraising-${current.id}-tab`}
            data-animate
          >
            <h3>{t(current.titleKey)}</h3>
            <ul>
              {current.items.map((item) => (
                <li key={item} dangerouslySetInnerHTML={{ __html: t(item) }} />
              ))}
            </ul>
          </article>
        ) : null}
      </div>
    </section>
  );
};

export default FundraisingContexts;
