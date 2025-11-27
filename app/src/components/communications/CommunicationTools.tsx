import { useState } from 'react';
import styles from './CommunicationTools.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { InternalCommunicationsPageContent } from '../../data/pages/internalCommunications';

type CommunicationToolsProps = {
  tools: InternalCommunicationsPageContent['tools'];
};

const iconPath = (fileName: string) => new URL(`../../assets/icons/${fileName}`, import.meta.url).href;

const ToggleChevron = ({ isOpen }: { isOpen: boolean }) => (
  <span className={styles.toggleIcon} data-open={isOpen} aria-hidden="true">
    <svg viewBox="0 0 24 24" focusable="false" role="presentation">
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  </span>
);

const CommunicationTools = ({ tools }: CommunicationToolsProps) => {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState<string>(tools.categories[0]?.id ?? '');

  return (
    <section id="tools" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header} data-animate>
          <span className={styles.badge}>{t(tools.badgeKey)}</span>
          <h2>{t(tools.titleKey)}</h2>
          <p>{t(tools.introKey)}</p>
        </div>
        <div className={styles.grid}>
          {tools.categories.map((category) => {
            const isOpen = openId === category.id;
            return (
              <article key={category.id} className={`${styles.card} ${isOpen ? styles.cardOpen : ''}`} data-animate>
                <button
                  type="button"
                  className={styles.cardToggle}
                  onClick={() => setOpenId((prev) => (prev === category.id ? '' : category.id))}
                  aria-expanded={isOpen}
                >
                  <div className={styles.cardHeader}>
                    <span className={styles.iconWrapper}>
                      <img src={iconPath(category.icon)} alt="" aria-hidden />
                    </span>
                    <div>
                      <h3>{t(category.titleKey)}</h3>
                      <p>{t(category.summaryKey)}</p>
                    </div>
                  </div>
                  <ToggleChevron isOpen={isOpen} />
                </button>
                <div className={styles.cardBody} data-open={isOpen}>
                  <h4>{t(category.recommendationTitleKey)}</h4>
                  <ul>
                    {category.recommendations.map((item) => (
                      <li key={item}>
                        <span
                          dangerouslySetInnerHTML={{ __html: t(item) }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommunicationTools;
