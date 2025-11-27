import { useMemo, useState } from 'react';
import styles from './CommunityBenefits.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { CommunityPageContent } from '../../data/pages/community';

type CommunityBenefitsProps = {
  benefits: CommunityPageContent['benefits'];
};

const iconPath = (fileName: string) => new URL(`../../assets/icons/${fileName}`, import.meta.url).href;

const CommunityBenefits = ({ benefits }: CommunityBenefitsProps) => {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string>(benefits.items[0]?.id ?? '');

  const activeItem = useMemo(
    () => benefits.items.find((item) => item.id === activeId) ?? benefits.items[0],
    [activeId, benefits.items]
  );

  return (
    <section id="benefits" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{t(benefits.badgeKey)}</span>
          <h2>{t(benefits.titleKey)}</h2>
          <p className={styles.lead}>{t(benefits.introKey)}</p>
        </div>
        <div className={styles.layout}>
          <div className={styles.grid}>
            {benefits.items.map((item) => {
              const isActive = item.id === activeItem?.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  className={`${styles.card} ${isActive ? styles.active : ''}`}
                  onClick={() => setActiveId(item.id)}
                  aria-pressed={isActive}
                >
                  <span className={styles.iconWrapper}>
                    <img src={iconPath(item.icon)} alt="" aria-hidden />
                  </span>
                  <div className={styles.cardBody}>
                    <h3>{t(item.titleKey)}</h3>
                    <p>{t(item.summaryKey)}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <aside className={styles.panel}>
            <div className={styles.panelInner}>
              <h3>{t(benefits.panelTitleKey)}</h3>
              {activeItem ? <p>{t(activeItem.detailKey)}</p> : <p>{t(benefits.panelEmptyKey)}</p>}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CommunityBenefits;
