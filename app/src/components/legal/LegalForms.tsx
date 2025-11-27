import { useTranslation } from '../../hooks/useTranslation';
import type { TranslationKey } from '../../data/i18n/types';
import type { LegalSecurityPageContent } from '../../data/pages/legalSecurity';
import styles from './LegalForms.module.css';

const iconPath = (fileName: string) => new URL(`../../assets/icons/${fileName}`, import.meta.url).href;

type LegalFormsProps = {
  forms: LegalSecurityPageContent['forms'];
};

const LegalForms = ({ forms }: LegalFormsProps) => {
  const { t } = useTranslation();

  return (
    <section id="forms" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(forms.badgeKey)}</span>
          <h2>{t(forms.titleKey)}</h2>
          <p className={styles.lead}>{t(forms.introKey)}</p>
        </header>

        <div className={styles.grid}>
          {forms.forms.map((form) => (
            <article key={form.id} className={styles.card} data-animate>
              <span className={styles.iconWrapper}>
                <img src={iconPath(form.icon)} alt="" aria-hidden />
              </span>
              <div className={styles.cardBody}>
                <h3>{t(form.titleKey)}</h3>
                <p className={styles.summary}>{t(form.summaryKey)}</p>
                <div className={styles.listSection}>
                  <h4>{t('legal.forms.highlights' as TranslationKey)}</h4>
                  <ul>
                    {form.highlights.map((item) => (
                      <li key={`${form.id}-${item}`}>{t(item)}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.listSection}>
                  <h4>{t('legal.forms.cautions' as TranslationKey)}</h4>
                  <ul>
                    {form.cautions.map((item) => (
                      <li key={`${form.id}-${item}`}>{t(item)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className={styles.note} data-animate role="note">
          <h3>{t(forms.note.titleKey)}</h3>
          <p>{t(forms.note.textKey)}</p>
        </aside>
      </div>
    </section>
  );
};

export default LegalForms;
