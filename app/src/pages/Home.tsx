import { Link } from "react-router-dom";
import { homePage } from "../data/pages/home";
import { useTranslation } from "../hooks/useTranslation";
import styles from "./Home.module.css";

const combine = (...classes: string[]) => classes.filter(Boolean).join(" ");

const isInternalLink = (href: string) => href.startsWith("/");

const HomePage = () => {
  const { t } = useTranslation();
  const { hero, stats, statsSection, about, program, sections, feedback, format, resources, cta, footer } = homePage;

  const renderLink = (href: string, className: string | undefined, label: string) => {
    const classProp = className && className.length > 0 ? className : undefined;
    return isInternalLink(href) ? (
      <Link className={classProp} to={href}>
        {label}
      </Link>
    ) : (
      <a className={classProp} href={href}>
        {label}
      </a>
    );
  };

  return (
    <div className={styles.page}>
      <section id="hero" className={styles.hero}>
        <div className={combine(styles.container, styles.heroContainer)}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>{t(hero.badgeKey)}</span>
            <h1 className={styles.heroTitle}>{t(hero.titleKey)}</h1>
            <p className={styles.lead}>{t(hero.subtitleKey)}</p>
            <div className={styles.ctaGroup}>
              {renderLink(hero.primaryCta.href, styles.ctaPrimary, t(hero.primaryCta.labelKey))}
              {renderLink(hero.secondaryCta.href, styles.ctaSecondary, t(hero.secondaryCta.labelKey))}
            </div>
            <p className={styles.heroNote}>{t(hero.noteKey)}</p>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroWidget}>
              <h3>{t(hero.widget.titleKey)}</h3>
              <ul>
                {hero.widget.items.map((item) => (
                  <li key={item}>{t(item)}</li>
                ))}
              </ul>
            </div>
            <div className={styles.heroFloating}>
              <span>{t(hero.floating.valueKey)}</span>
              <small>{t(hero.floating.labelKey)}</small>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={combine(styles.container, styles.statsBlock)}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{t(statsSection.eyebrowKey)}</span>
            <h2 className={styles.sectionTitle}>{t(statsSection.titleKey)}</h2>
          </div>
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <article key={stat.valueKey} className={styles.statCard}>
                <strong>{t(stat.valueKey)}</strong>
                <span>{t(stat.labelKey)}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="overview" className={styles.section}>
        <div className={combine(styles.container, styles.aboutGrid)}>
          <div className={styles.aboutText}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>{t(about.eyebrowKey)}</span>
              <h2 className={styles.sectionTitle}>{t(about.titleKey)}</h2>
              <p className={styles.sectionText}>{t(about.textKey)}</p>
            </div>
            <ul className={styles.checklist}>
              {about.checklist.map((item) => (
                <li key={item}>{t(item)}</li>
              ))}
            </ul>
          </div>
          <div className={styles.featureGrid}>
            {about.features.map((feature) => (
              <article key={feature.titleKey} className={styles.featureCard}>
                <h3>{t(feature.titleKey)}</h3>
                <p className={styles.sectionText}>{t(feature.textKey)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="program" className={combine(styles.section, styles.programSection)}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{t(program.eyebrowKey)}</span>
            <h2 className={styles.sectionTitle}>{t(program.titleKey)}</h2>
            <p className={styles.sectionText}>{t(program.textKey)}</p>
          </div>
          <div className={styles.programGrid}>
            {program.blocks.map((block) => (
              <article key={block.titleKey} className={styles.programCard}>
                <h3>{t(block.titleKey)}</h3>
                <ul>
                  {block.links.map((link) => (
                    <li key={link.labelKey}>
                      {renderLink(link.href, undefined, t(link.labelKey))}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="sections-map" className={combine(styles.section, styles.sectionsMap)}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{t(sections.eyebrowKey)}</span>
            <h2 className={styles.sectionTitle}>{t(sections.titleKey)}</h2>
            <p className={styles.sectionText}>{t(sections.textKey)}</p>
          </div>
          <div className={styles.sectionsGrid}>
            {sections.cards.map((card) => {
              const body = (
                <>
                  <div className={styles.sectionCardHeader}>
                    <span className={styles.sectionIndex}>{card.index}</span>
                    <span className={styles.sectionIconWrapper}>
                      <img src={card.icon} alt={t(card.iconAltKey)} />
                    </span>
                  </div>
                  <div className={styles.sectionCardBody}>
                    <h3>{t(card.titleKey)}</h3>
                    <p className={styles.sectionText}>{t(card.textKey)}</p>
                  </div>
                  <span className={styles.sectionCardCta}>{t(sections.openLabelKey)}</span>
                </>
              );

              return isInternalLink(card.href) ? (
                <Link key={card.href} className={styles.sectionCard} to={card.href}>
                  {body}
                </Link>
              ) : (
                <a key={card.href} className={styles.sectionCard} href={card.href}>
                  {body}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="ai-feedback" className={combine(styles.section, styles.feedbackSection)}>
        <div className={combine(styles.container, styles.feedbackGrid)}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{t(feedback.eyebrowKey)}</span>
            <h2 className={styles.sectionTitle}>{t(feedback.titleKey)}</h2>
            <p className={styles.sectionText}>{t(feedback.textKey)}</p>
          </div>
          <div className={styles.feedbackItems}>
            {feedback.items.map((item) => (
              <article key={item.titleKey} className={styles.feedbackCard}>
                <h3>{t(item.titleKey)}</h3>
                <p className={styles.sectionText}>{t(item.textKey)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="format" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{t(format.eyebrowKey)}</span>
            <h2 className={styles.sectionTitle}>{t(format.titleKey)}</h2>
            <p className={styles.sectionText}>{t(format.textKey)}</p>
          </div>
          <div className={styles.formatGrid}>
            {format.blocks.map((block) => (
              <article key={block.titleKey} className={styles.formatCard}>
                <h3>{t(block.titleKey)}</h3>
                <p className={styles.sectionText}>{t(block.textKey)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="resources" className={styles.section}>
        <div className={combine(styles.container, styles.resourcesGrid)}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{t(resources.eyebrowKey)}</span>
            <h2 className={styles.sectionTitle}>{t(resources.titleKey)}</h2>
            <p className={styles.sectionText}>{t(resources.textKey)}</p>
          </div>
          <div className={styles.resourcesList}>
            {resources.items.map((item) => (
              <article key={item} className={styles.resourceCard}>
                <p>{t(item)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className={styles.ctaSection}>
        <div className={combine(styles.container, styles.ctaCard)}>
          <h2>{t(cta.titleKey)}</h2>
          <p>{t(cta.textKey)}</p>
          <a href={cta.button.href}>{t(cta.button.labelKey)}</a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>{t(footer.textKey)}</p>
          <small>{t(footer.noteKey)}</small>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;


