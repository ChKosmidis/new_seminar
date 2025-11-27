import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import type { TranslationKey } from '../../data/i18n/types';
import type { LegalSecurityPageContent } from '../../data/pages/legalSecurity';
import styles from './LegalRisks.module.css';

const iconPath = (fileName: string) => new URL(`../../assets/icons/${fileName}`, import.meta.url).href;

type LegalRisksProps = {
  risks: LegalSecurityPageContent['risks'];
};

const LegalRisks = ({ risks }: LegalRisksProps) => {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="risks" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(risks.badgeKey)}</span>
          <h2>{t(risks.titleKey)}</h2>
          <p className={styles.lead}>{t(risks.introKey)}</p>
        </header>

        <div className={styles.accordion}>
          {risks.items.map((item) => {
            const isOpen = item.id === openId;
            const panelId = `${item.id}-panel`;
            const triggerId = `${item.id}-trigger`;
            return (
              <article
                key={item.id}
                className={styles.item}
                data-animate
                data-open={isOpen || undefined}
              >
                <button
                  id={triggerId}
                  type="button"
                  className={styles.trigger}
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className={styles.iconWrapper} aria-hidden>
                    <img src={iconPath(item.icon)} alt="" aria-hidden />
                  </span>
                  <span className={styles.triggerText}>{t(item.titleKey)}</span>
                  <span className={styles.chevron} aria-hidden>
                    <svg viewBox="0 0 20 20">
                      <path d="M5 8l5 5 5-5" />
                    </svg>
                  </span>
                </button>
                <div
                  id={panelId}
                  className={styles.panel}
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!isOpen}
                >
                  <p className={styles.description}>{t(item.descriptionKey)}</p>
                  <h4>{t('legal.risks.mitigation' as TranslationKey)}</h4>
                  <ul>
                    {item.mitigations.map((mitigation) => (
                      <li key={`${item.id}-${mitigation}`}>{t(mitigation)}</li>
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

export default LegalRisks;
