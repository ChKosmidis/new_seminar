import Hero from '../components/hero/Hero';
import { ModuleCard } from '../components/cards/ModuleCard';
import { introPage } from '../data/pages/intro';
import { useTranslation } from '../hooks/useTranslation';
import ConceptBuilder from '../components/intro/ConceptBuilder';
import IntroQuiz from '../components/intro/IntroQuiz';
import styles from './Intro.module.css';

const iconPath = (fileName: string) => new URL(`../assets/icons/${fileName}`, import.meta.url).href;

const nextModules = [
  {
    href: '/modules/1-community-building',
    icon: iconPath('community.svg'),
    titleKey: 'home.sections.module1.title',
    descKey: 'home.sections.module1.desc',
    altKey: 'home.sections.module1.iconAlt'
  },
  {
    href: '/modules/2-internal-communications',
    icon: iconPath('communication.svg'),
    titleKey: 'home.sections.module2.title',
    descKey: 'home.sections.module2.desc',
    altKey: 'home.sections.module2.iconAlt'
  },
  {
    href: '/modules/3-infrastructure',
    icon: iconPath('Infrastructure.svg'),
    titleKey: 'home.sections.module3.title',
    descKey: 'home.sections.module3.desc',
    altKey: 'home.sections.module3.iconAlt'
  }
] as const;

const IntroPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <Hero {...introPage.hero} />
      <section className={styles.section} id="overview">
        <div className={styles.container}>
          <div className={styles.sectionList}>
            {introPage.sections.map((section) => (
              <section key={section.id} id={section.id} className={styles.sectionItem}>
                <ModuleCard
                  icon={iconPath(section.icon)}
                  iconAltKey={section.iconAltKey}
                  badgeKey={section.badgeKey}
                  titleKey={section.titleKey}
                >
                  {section.paragraphs.map((paragraphKey) => (
                    <p key={paragraphKey}>{t(paragraphKey)}</p>
                  ))}
                  {section.htmlKey ? (
                    <div dangerouslySetInnerHTML={{ __html: t(section.htmlKey) }} />
                  ) : null}
                </ModuleCard>
              </section>
            ))}
          </div>
        </div>
      </section>

      <ConceptBuilder />
      <IntroQuiz />

      <section id="modules" className={styles.section}>
        <div className={styles.container}>
          <article className={styles.nextModulesCard}>
            <div className={styles.nextModulesHeader}>
              <span className={styles.nextBadge}>{t('intro.modules.badge')}</span>
              <h2>{t('intro.modules.title')}</h2>
              <p className={styles.nextLead}>{t('home.sections.text')}</p>
            </div>
            <div className={styles.linksGrid}>
              {nextModules.map((module) => (
                <a key={module.href} className={styles.linkCard} href={module.href}>
                  <div className={styles.iconWrap}>
                    <img src={module.icon} alt={t(module.altKey)} />
                  </div>
                  <div className={styles.linkBody}>
                    <h3>{t(module.titleKey)}</h3>
                    <p className={styles.linkDescription}>{t(module.descKey)}</p>
                  </div>
                  <span className={styles.linkCta}>{t('intro.modules.open')}</span>
                </a>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default IntroPage;
