import { useTranslation } from '../../hooks/useTranslation';
import type { LegalSecurityPageContent } from '../../data/pages/legalSecurity';
import styles from './LegalOverview.module.css';

const iconPath = (fileName: string) => new URL(`../../assets/icons/${fileName}`, import.meta.url).href;

type LegalOverviewProps = {
  overview: LegalSecurityPageContent['overview'];
};

const LegalOverview = ({ overview }: LegalOverviewProps) => {
  const { t } = useTranslation();

  return (
    <section id="overview" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(overview.badgeKey)}</span>
          <h2>{t(overview.titleKey)}</h2>
          <p className={styles.lead}>{t(overview.leadKey)}</p>
        </header>

        <aside className={styles.disclaimer} data-animate role="note" aria-label={t(overview.disclaimer.titleKey)}>
          <h3>{t(overview.disclaimer.titleKey)}</h3>
          <p>{t(overview.disclaimer.textKey)}</p>
        </aside>

        <div className={styles.pillars}>
          {overview.pillars.map((pillar) => (
            <article key={pillar.id} className={styles.pillar} data-animate>
              <span className={styles.iconWrapper}>
                <img src={iconPath(pillar.icon)} alt="" aria-hidden />
              </span>
              <h3>{t(pillar.titleKey)}</h3>
              <p>{t(pillar.descriptionKey)}</p>
            </article>
          ))}
        </div>

        <div className={styles.highlights} data-animate>
          <h3>{t(overview.highlights.titleKey)}</h3>
          <ul>
            {overview.highlights.items.map((item) => (
              <li key={item}>{t(item)}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LegalOverview;
