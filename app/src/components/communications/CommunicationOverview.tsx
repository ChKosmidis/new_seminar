import { useState } from 'react';
import styles from './CommunicationOverview.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { InternalCommunicationsPageContent } from '../../data/pages/internalCommunications';

type CommunicationOverviewProps = {
  overview: InternalCommunicationsPageContent['overview'];
};

const iconPath = (fileName: string) => new URL(`../../assets/icons/${fileName}`, import.meta.url).href;

const CommunicationOverview = ({ overview }: CommunicationOverviewProps) => {
  const { t } = useTranslation();
  const [openCultureId, setOpenCultureId] = useState<string>(overview.culture.values[0]?.id ?? '');

  return (
    <section id="overview" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.impact} data-animate>
          <span className={styles.badge}>{t(overview.impact.badgeKey)}</span>
          <h2>{t(overview.impact.titleKey)}</h2>
          <p className={styles.intro}>{t(overview.impact.introKey)}</p>
          <div className={styles.steps}>
            {overview.impact.steps.map((step) => (
              <article key={step.id} className={styles.stepCard}>
                <div className={styles.stepIcon}>
                  <img src={iconPath(step.icon)} alt="" aria-hidden />
                </div>
                <h3>{t(step.titleKey)}</h3>
                <p>{t(step.descriptionKey)}</p>
              </article>
            ))}
          </div>
        </div>

        <div id="culture" className={styles.culture} data-animate>
          <div className={styles.cultureHeader}>
            <h3>{t(overview.culture.titleKey)}</h3>
            <p>{t(overview.culture.introKey)}</p>
          </div>
          <div className={styles.cultureGrid}>
            {overview.culture.values.map((value) => {
              const isOpen = openCultureId === value.id;
              return (
                <button
                  key={value.id}
                  type="button"
                  className={`${styles.cultureCard} ${isOpen ? styles.cultureCardOpen : ''}`}
                  onClick={() => setOpenCultureId((prev) => (prev === value.id ? '' : value.id))}
                  aria-expanded={isOpen}
                >
                  <div className={styles.cultureTitle}>
                    <span className={styles.cultureIcon}>
                      <img src={iconPath(value.icon)} alt="" aria-hidden />
                    </span>
                    <span>{t(value.titleKey)}</span>
                  </div>
                  <p className={styles.cultureDescription}>{t(value.descriptionKey)}</p>
                </button>
              );
            })}
          </div>
        </div>
        <div id="volunteers" className={styles.volunteers} data-animate>
          <div className={styles.volunteerHeader}>
            <h3>{t(overview.volunteers.titleKey)}</h3>
            <p>{t(overview.volunteers.introKey)}</p>
          </div>
          <div className={styles.volunteerList}>
            {overview.volunteers.tips.map((tip) => (
              <article key={tip.id} className={styles.volunteerItem}>
                <h4>{t(tip.titleKey)}</h4>
                <p>{t(tip.descriptionKey)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunicationOverview;
