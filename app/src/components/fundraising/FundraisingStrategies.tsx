import styles from './FundraisingStrategies.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { FundraisingPageContent } from '../../data/pages/fundraising';

type FundraisingStrategiesProps = {
  strategies: FundraisingPageContent['strategies'];
};

const FundraisingStrategies = ({ strategies }: FundraisingStrategiesProps) => {
  const { t } = useTranslation();

  return (
    <section id="strategies" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(strategies.badgeKey)}</span>
          <h2>{t(strategies.titleKey)}</h2>
          <p className={styles.lead}>{t(strategies.introKey)}</p>
        </header>

        <div className={styles.grid}>
          {strategies.blocks.map((block) => (
            <article key={block.id} className={styles.card} data-animate>
              <span className={styles.iconWrapper}>
                <img src={block.icon} alt="" aria-hidden />
              </span>
              <h3>{t(block.titleKey)}</h3>
              <p className={styles.description}>{t(block.descriptionKey)}</p>
              <ul>
                {block.items.map((item) => (
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

export default FundraisingStrategies;
