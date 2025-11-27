import styles from './ModuleCard.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { TranslationKey } from '../../data/i18n/types';
import type { ReactNode } from 'react';

type ModuleCardProps = {
  icon: string;
  iconAltKey: TranslationKey;
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  children?: ReactNode;
};

export const ModuleCard = ({ icon, iconAltKey, badgeKey, titleKey, children }: ModuleCardProps) => {
  const { t } = useTranslation();
  return (
    <article className={styles.card} data-animate>
      {icon ? (
        <div className={styles.iconWrap}>
          <img className={styles.icon} src={icon} alt={t(iconAltKey)} loading="lazy" />
        </div>
      ) : null}
      <span className={styles.badge}>{t(badgeKey)}</span>
      <h2>{t(titleKey)}</h2>
      {children}
    </article>
  );
};

export type { ModuleCardProps };
