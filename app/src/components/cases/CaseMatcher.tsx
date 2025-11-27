import { useEffect, useMemo, useState, type ReactNode } from 'react';
import styles from './CaseMatcher.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { CaseStudy, CasesPageContent } from '../../data/pages/cases';

type CaseMatcherProps = {
  matcher: CasesPageContent['matcher'];
  onSelectionChange?: (selection: {
    interests: ReadonlyArray<string>;
    conditions: ReadonlyArray<string>;
    cases: ReadonlyArray<CaseStudy>;
  }) => void;
};

const sortByAlphabet = (values: Iterable<string>) =>
  Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'ru'));

const CaseMatcher = ({ matcher, onSelectionChange }: CaseMatcherProps) => {
  const { t } = useTranslation();
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(() => new Set());
  const [selectedConditions, setSelectedConditions] = useState<Set<string>>(() => new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [visibleCases, setVisibleCases] = useState<ReadonlyArray<CaseStudy>>(() => []);

  const conditionSet = useMemo(() => new Set(matcher.conditionTags), [matcher.conditionTags]);

  const interestOptions = useMemo(
    () =>
      sortByAlphabet(
        matcher.cases.flatMap((item) => item.tags.filter((tag) => !conditionSet.has(tag)))
      ),
    [matcher.cases, conditionSet]
  );

  const conditionOptions = useMemo(
    () => sortByAlphabet(matcher.cases.flatMap((item) => item.tags.filter((tag) => conditionSet.has(tag)))),
    [matcher.cases, conditionSet]
  );

  const toggleOption = (value: string, type: 'interest' | 'condition') => () => {
    const setter = type === 'interest' ? setSelectedInterests : setSelectedConditions;
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  const matchedCases = useMemo(() => {
    if (selectedInterests.size === 0 && selectedConditions.size === 0) {
      return [] as ReadonlyArray<CaseStudy>;
    }

    return matcher.cases.filter((item) => {
      const hasInterest = selectedInterests.size === 0 || item.tags.some((tag) => selectedInterests.has(tag));
      const hasCondition =
        selectedConditions.size === 0 || item.tags.some((tag) => selectedConditions.has(tag));

      if (selectedInterests.size > 0 && selectedConditions.size > 0) {
        return hasInterest && hasCondition;
      }

      return hasInterest || hasCondition;
    });
  }, [matcher.cases, selectedConditions, selectedInterests]);

  useEffect(() => {
    if (isSubmitted) {
      setVisibleCases(matchedCases);
    }
  }, [isSubmitted, matchedCases]);

  useEffect(() => {
    if (!onSelectionChange) {
      return;
    }

    if (!isSubmitted) {
      onSelectionChange({ interests: [], conditions: [], cases: [] });
      return;
    }

    onSelectionChange({
      interests: Array.from(selectedInterests),
      conditions: Array.from(selectedConditions),
      cases: visibleCases
    });
  }, [isSubmitted, onSelectionChange, selectedConditions, selectedInterests, visibleCases]);

  const handleSubmit = () => {
    setIsSubmitted(true);
    setVisibleCases(matchedCases);
  };

  const hasFilters = selectedInterests.size > 0 || selectedConditions.size > 0;
  const showNoSelection = isSubmitted && !hasFilters;
  const showNoMatches = isSubmitted && hasFilters && visibleCases.length === 0;

  let resultContent: ReactNode = null;

  if (!isSubmitted) {
    resultContent = <p className={styles.placeholder}>{t(matcher.noSelectionKey)}</p>;
  } else if (showNoSelection) {
    resultContent = <p className={styles.message}>{t(matcher.noSelectionKey)}</p>;
  } else if (showNoMatches) {
    resultContent = <p className={styles.message}>{t(matcher.emptyKey)}</p>;
  } else if (visibleCases.length > 0) {
    resultContent = (
      <div className={styles.grid}>
        {visibleCases.map((item) => (
          <article key={item.id} className={styles.card} style={{ ['--case-color' as string]: item.color }}>
            <header className={styles.cardHeader}>
              <h4>{item.title}</h4>
              <div className={styles.tags}>
                {item.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </header>
            <p className={styles.description}>{item.description}</p>
            <div className={styles.aspects}>
              <strong>{t(matcher.aspectsTitleKey)}</strong>
              <ul>
                {item.aspects.map((aspect) => (
                  <li key={aspect}>{aspect}</li>
                ))}
              </ul>
            </div>
            {item.link ? (
              <p className={styles.linkWrapper}>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {t(matcher.linkLabelKey)}
                </a>
              </p>
            ) : null}
            {item.disclaimer ? <p className={styles.disclaimer}>{item.disclaimer}</p> : null}
          </article>
        ))}
      </div>
    );
  } else {
    resultContent = <p className={styles.placeholder}>{t(matcher.noSelectionKey)}</p>;
  }

  return (
    <section id="matcher" className={styles.section} aria-labelledby="cases-matcher-title">
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(matcher.badgeKey)}</span>
          <h2 id="cases-matcher-title">{t(matcher.titleKey)}</h2>
          <p className={styles.subtitle}>{t(matcher.subtitleKey)}</p>
          <p className={styles.helper}>{t(matcher.helperKey)}</p>
        </header>

        <div className={styles.filters}>
          <div className={styles.group} data-animate>
            <h3>{t(matcher.interestsTitleKey)}</h3>
            <div className={styles.tiles}>
              {interestOptions.map((option) => {
                const active = selectedInterests.has(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={toggleOption(option, 'interest')}
                    className={`${styles.tile} ${active ? styles.tileActive : ''}`}
                    aria-pressed={active}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.group} data-animate>
            <h3>{t(matcher.conditionsTitleKey)}</h3>
            <div className={styles.tiles}>
              {conditionOptions.map((option) => {
                const active = selectedConditions.has(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={toggleOption(option, 'condition')}
                    className={`${styles.tile} ${active ? styles.tileActive : ''}`}
                    aria-pressed={active}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.actions} data-animate>
          <button type="button" className={styles.submit} onClick={handleSubmit}>
            {t(matcher.actionKey)}
          </button>
        </div>

        <div className={styles.results} data-animate>
          <h3>{t(matcher.resultTitleKey)}</h3>
          <div className={styles.resultContent} role="status" aria-live="polite" aria-atomic="true">
            {resultContent}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseMatcher;
