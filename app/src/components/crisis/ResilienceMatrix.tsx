import { useTranslation } from "../../hooks/useTranslation";
import type { CrisisManagementPageContent } from "../../data/pages/crisisManagement";
import styles from "./ResilienceMatrix.module.css";

const ResilienceMatrix = ({ resilience }: { resilience: CrisisManagementPageContent["resilience"] }) => {
  const { t } = useTranslation();

  return (
    <section id="resilience" className={styles.section} aria-labelledby="resilience-title">
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(resilience.badgeKey)}</span>
          <h2 id="resilience-title">{t(resilience.titleKey)}</h2>
          <p className={styles.lead}>{t(resilience.leadKey)}</p>
        </header>

        <div className={styles.grid}>
          {resilience.pillars.map((pillar) => (
            <article key={pillar.id} className={styles.pillar} data-animate>
              <span className={styles.iconWrapper} aria-hidden>
                <img src={pillar.icon} alt="" />
              </span>
              <h3 className={styles.title}>{t(pillar.titleKey)}</h3>
              <p className={styles.text}>{t(pillar.descriptionKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResilienceMatrix;
