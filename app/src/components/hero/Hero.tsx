import styles from './Hero.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { TranslationKey } from '../../data/i18n/types';

type HeroAction = {
  href: string;
  labelKey: TranslationKey;
  variant?: 'primary' | 'outline';
};

type HeroBullet = {
  icon: string;
  titleKey: TranslationKey;
  textKey: TranslationKey;
};

type HeroCard = {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  textKey: TranslationKey;
  items: ReadonlyArray<TranslationKey>;
  theme?: {
    light: { background: string; border: string; shadow: string };
    dark: { background: string; border: string; shadow: string };
  };
};

type HeroProps = {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  actions: ReadonlyArray<HeroAction>;
  quickNav: ReadonlyArray<{ href: string; labelKey: TranslationKey }>;
  bullets: ReadonlyArray<HeroBullet>;
  card: HeroCard;
};

const Hero = ({ badgeKey, titleKey, subtitleKey, actions, quickNav, bullets, card }: HeroProps) => {
  const { t } = useTranslation();

  const cardStyle = card.theme
    ? {
        ['--hero-card-bg-light' as string]: card.theme.light.background,
        ['--hero-card-border-light' as string]: card.theme.light.border,
        ['--hero-card-shadow-light' as string]: card.theme.light.shadow,
        ['--hero-card-bg-dark' as string]: card.theme.dark.background,
        ['--hero-card-border-dark' as string]: card.theme.dark.border,
        ['--hero-card-shadow-dark' as string]: card.theme.dark.shadow
      }
    : undefined;

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content} data-animate>
          <span className={styles.badge}>{t(badgeKey)}</span>
          <h1>{t(titleKey)}</h1>
          <p className={styles.subtitle}>{t(subtitleKey)}</p>
          <div className={styles.actions}>
            {actions.map((action) => (
              <a
                key={action.labelKey}
                className={action.variant === 'outline' ? styles.actionOutline : styles.actionPrimary}
                href={action.href}
              >
                {t(action.labelKey)}
              </a>
            ))}
          </div>
          <nav className={styles.quickNav} aria-label="Hero quick navigation">
            {quickNav.map((item) => (
              <a key={item.labelKey} href={item.href}>
                {t(item.labelKey)}
              </a>
            ))}
          </nav>
          <div className={styles.bullets}>
            {bullets.map((bullet) => (
              <div key={bullet.titleKey} className={styles.bullet} data-animate>
                <span className={styles.bulletIcon}>{bullet.icon}</span>
                <div>
                  <strong>{t(bullet.titleKey)}</strong>
                  <p>{t(bullet.textKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className={styles.card} style={cardStyle} data-animate>
          <span className={styles.cardBadge}>{t(card.badgeKey)}</span>
          <h2>{t(card.titleKey)}</h2>
          <p>{t(card.textKey)}</p>
          <ul>
            {card.items.map((item) => (
              <li key={item}>{t(item)}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
