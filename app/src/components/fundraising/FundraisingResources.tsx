import styles from './FundraisingResources.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { FundraisingPageContent } from '../../data/pages/fundraising';

type FundraisingResourcesProps = {
  resources: FundraisingPageContent['resources'];
};

const FundraisingResources = ({ resources }: FundraisingResourcesProps) => {
  const { t } = useTranslation();

  return (
    <section id="resources" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(resources.badgeKey)}</span>
          <h2>{t(resources.titleKey)}</h2>
        </header>

        <div className={styles.grid}>
          {resources.categories.map((category) => (
            <article key={category.id} className={styles.card} data-animate>
              <div className={styles.cardHeader}>
                <span className={styles.iconWrapper}>
                  <img src={category.icon} alt="" aria-hidden />
                </span>
                <h3>{t(category.titleKey)}</h3>
              </div>
              <ul>
                {category.items.map((item) => (
                  <li key={item} dangerouslySetInnerHTML={{ __html: t(item) }} />
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundraisingResources;
