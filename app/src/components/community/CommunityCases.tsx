import styles from './CommunityCases.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { CommunityPageContent } from '../../data/pages/community';

const iconPath = new URL('../../assets/icons/cases.svg', import.meta.url).href;

const CommunityCases = ({ cases }: { cases: CommunityPageContent['cases'] }) => {
  const { t } = useTranslation();

  return (
    <section id="cases" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{t(cases.badgeKey)}</span>
          <h2>{t(cases.titleKey)}</h2>
          <p className={styles.lead}>{t(cases.introKey)}</p>
        </div>
        <div className={styles.grid}>
          {cases.items.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.iconWrapper}>
                  <img src={iconPath} alt="" aria-hidden />
                </span>
                <div>
                  <h3>{t(item.titleKey)}</h3>
                  <p className={styles.meta}>
                    <span>{t(item.countryKey)}</span>
                    {item.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {t(tag)}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <p className={styles.summary}>{t(item.summaryKey)}</p>
              <div className={styles.highlights} dangerouslySetInnerHTML={{ __html: t(item.highlightsKey) }} />
              {item.link ? (
                <a className={styles.link} href={item.link.href} target="_blank" rel="noreferrer">
                  {t(item.link.labelKey)}
                </a>
              ) : null}
              {item.noteKey ? <p className={styles.note}>{t(item.noteKey)}</p> : null}
            </article>
          ))}
        </div>
        {cases.noteKey ? <div className={styles.footnote}>{t(cases.noteKey)}</div> : null}
      </div>
    </section>
  );
};

export default CommunityCases;
