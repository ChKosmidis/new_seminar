import { useTranslation } from "../../hooks/useTranslation";
import type { CrisisManagementPageContent } from "../../data/pages/crisisManagement";
import styles from "./CrisisCaseStudies.module.css";

type CrisisCaseStudiesProps = {
  cases: CrisisManagementPageContent["cases"];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const CrisisCaseStudies = ({ cases, selectedId, onSelect }: CrisisCaseStudiesProps) => {
  const { t } = useTranslation();

  const scenario = cases.scenarios.find((item) => item.id === selectedId) ?? null;

  return (
    <section id="cases" className={styles.section} aria-labelledby="cases-title">
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(cases.badgeKey)}</span>
          <h2 id="cases-title">{t(cases.titleKey)}</h2>
          <p className={styles.lead}>{t(cases.leadKey)}</p>
          <p className={styles.helper}>{t(cases.helperKey)}</p>
        </header>

        <div className={styles.tiles}>
          {cases.tiles.map((tile) => (
            <button
              key={tile.id}
              type="button"
              className={styles.tile}
              data-active={tile.id === selectedId}
              onClick={() => onSelect(tile.id)}
              data-animate
            >
              <span className={styles.iconWrapper} aria-hidden>
                <img src={tile.icon} alt="" />
              </span>
              <span className={styles.tileTitle}>{t(tile.titleKey)}</span>
              <span className={styles.tileText}>{t(tile.descriptionKey)}</span>
            </button>
          ))}
        </div>

        <div className={styles.detailCard} data-animate>
          {scenario ? (
            <>
              <h3 className={styles.detailTitle}>{t(scenario.titleKey)}</h3>
              <p className={styles.detailSection}>{t(scenario.crisisKey)}</p>
              <div className={styles.detailSection}>
                <strong>{t(scenario.actionsTitleKey)}</strong>
                <ul className={styles.detailList}>
                  {scenario.actions.map((action) => (
                    <li key={action}>{t(action)}</li>
                  ))}
                </ul>
              </div>
              <p className={styles.detailSection}>{t(scenario.outcomeKey)}</p>
            </>
          ) : (
            <p className={styles.placeholder}>{t(cases.placeholderKey)}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CrisisCaseStudies;
