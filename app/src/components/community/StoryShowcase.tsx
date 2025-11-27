import styles from './StoryShowcase.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { CommunityPageContent } from '../../data/pages/community';

const iconPath = (fileName: string) => new URL(`../../assets/icons/${fileName}`, import.meta.url).href;

type StoryShowcaseProps = {
  stories: CommunityPageContent['stories'];
};

const StoryShowcase = ({ stories }: StoryShowcaseProps) => {
  const { t } = useTranslation();

  return (
    <section id="stories" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{t(stories.badgeKey)}</span>
          <h2>{t(stories.titleKey)}</h2>
          <p className={styles.lead}>{t(stories.introKey)}</p>
        </div>
        <div className={styles.grid}>
          {stories.items.map((story) => (
            <article key={story.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.iconWrapper}>
                  <img src={iconPath(story.icon)} alt={t(story.iconAltKey)} />
                </span>
                <div className={styles.titles}>
                  <h3>{t(story.titleKey)}</h3>
                  <p>{t(story.textKey)}</p>
                </div>
              </div>
              <div className={styles.example}>
                <p>{t(story.exampleKey)}</p>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.outro}>{t(stories.outroKey)}</p>
      </div>
    </section>
  );
};

export default StoryShowcase;
