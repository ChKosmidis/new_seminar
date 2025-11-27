import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import styles from './ConceptBuilder.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../contexts/LanguageContext';
import { introInteractiveLocales } from '../../data/pages/introInteractive';
import type { TranslationKey } from '../../data/i18n/types';
import type { ConceptType } from '../../data/pages/introInteractive';

const TYPE_OPTIONS: Array<{ value: ConceptType; labelKey: TranslationKey }> = [
  { value: 'direct_action', labelKey: 'intro.interactive.type.direct' },
  { value: 'networking', labelKey: 'intro.interactive.type.networking' },
  { value: 'hybrid', labelKey: 'intro.interactive.type.hybrid' }
];

const formatTemplate = (template: string, tokens: Record<string, string>) =>
  template.replace(/\{([^}]+)\}/g, (_, key) => tokens[key] ?? '');

type ConceptState = {
  problem: string;
  type: ConceptType;
  justification: string;
};

type ConceptFormState = {
  problem: string;
  type: ConceptType | '';
  justification: string;
};

const INITIAL_FORM_STATE: ConceptFormState = {
  problem: '',
  type: '',
  justification: ''
};

const ConceptBuilder = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const locale = introInteractiveLocales[language];

  const [form, setForm] = useState<ConceptFormState>(INITIAL_FORM_STATE);
  const [concept, setConcept] = useState<ConceptState | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle');
  const [warning, setWarning] = useState<string | null>(null);

  useEffect(() => {
    setCopyState('idle');
  }, [language]);

  const typeLabel = concept ? locale.concept.typeLabels[concept.type] : '';

  const conceptSummary = useMemo(() => {
    if (!concept) {
      return null;
    }

    return {
      items: [
        { label: t('intro.interactive.result.problem'), value: concept.problem },
        { label: t('intro.interactive.result.type'), value: locale.concept.typeLabels[concept.type] },
        { label: t('intro.interactive.result.justification'), value: concept.justification }
      ],
      focus: locale.concept.typeFocus[concept.type]
    };
  }, [concept, locale.concept.typeFocus, locale.concept.typeLabels, t]);

  const feedbackItems = useMemo(() => {
    if (!concept) {
      return null;
    }

    return {
      intro: locale.feedback.intro,
      bullets: [
        formatTemplate(locale.feedback.structure, { typeLabel }),
        formatTemplate(locale.feedback.justification, { justificationText: concept.justification }),
        locale.feedback.risks
      ],
      prompts: locale.concept.prompts,
      closing: locale.feedback.closing,
      nextStepsLabel: locale.feedback.nextSteps
    };
  }, [concept, locale.concept.prompts, locale.feedback, typeLabel]);

  const handleChange = (field: 'problem' | 'type' | 'justification') => (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    if (!form.problem.trim() || !form.type || !form.justification.trim()) {
      setWarning(locale.concept.emptyFields);
      setConcept(null);
      return;
    }

    setWarning(null);
    setConcept({
      problem: form.problem.trim(),
      type: form.type as ConceptType,
      justification: form.justification.trim()
    });
    setCopyState('idle');
  };

  const handleReset = () => {
    setForm(INITIAL_FORM_STATE);
    setConcept(null);
    setCopyState('idle');
    setWarning(null);
  };

  const handleCopy = async () => {
    if (!concept) {
      return;
    }

    const payload = formatTemplate(locale.concept.copyTemplate, {
      problem: concept.problem,
      typeLabel: locale.concept.typeLabels[concept.type],
      justification: concept.justification
    });

    try {
      await navigator.clipboard.writeText(payload);
      setCopyState('success');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch (error) {
      setCopyState('error');
      setTimeout(() => setCopyState('idle'), 2000);
    }
  };

  const currentCopyLabel = copyState === 'success'
    ? locale.concept.copySuccess
    : copyState === 'error'
      ? locale.concept.copyError
      : t('intro.interactive.copy');

  return (
    <section id="interactive" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.badge}>{t('intro.interactive.badge')}</span>
          <h2>{t('intro.interactive.title')}</h2>
          <p className={styles.lead}>{t('intro.interactive.lead')}</p>
        </div>
        <div className={styles.columns}>
          <div className={styles.card}>
            <form className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="intro-problem">
                  {t('intro.interactive.problem.label')}
                </label>
                <textarea
                  id="intro-problem"
                  className={`${styles.textarea} ${styles.input}`}
                  value={form.problem}
                  onChange={handleChange('problem')}
                  placeholder={t('intro.interactive.problem.placeholder')}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="intro-type">
                  {t('intro.interactive.type.label')}
                </label>
                <select
                  id="intro-type"
                  className={styles.select}
                  value={form.type}
                  onChange={handleChange('type')}
                >
                  <option value="">{t('intro.interactive.type.placeholder')}</option>
                  {TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {t(option.labelKey)}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="intro-justification">
                  {t('intro.interactive.justification.label')}
                </label>
                <textarea
                  id="intro-justification"
                  className={`${styles.textarea} ${styles.input}`}
                  value={form.justification}
                  onChange={handleChange('justification')}
                  placeholder={t('intro.interactive.justification.placeholder')}
                />
              </div>
              {warning ? <div className={styles.warning}>{warning}</div> : null}
              <div className={styles.actions}>
                <button type="button" className={styles.buttonPrimary} onClick={handleGenerate}>
                  {t('intro.interactive.generate')}
                </button>
                <button type="button" className={styles.buttonSecondary} onClick={handleReset}>
                  {t('intro.interactive.reset')}
                </button>
                <button
                  type="button"
                  className={`${styles.buttonGhost} ${
                    copyState === 'success'
                      ? styles.copyStateSuccess
                      : copyState === 'error'
                      ? styles.copyStateError
                      : ''
                  }`}
                  onClick={handleCopy}
                  disabled={!concept}
                >
                  {currentCopyLabel}
                </button>
              </div>
            </form>
          </div>

          <div className={styles.card}>
            <div className={styles.resultCard}>
              <div className={styles.infoTag}>{concept ? locale.concept.typeLabels[concept.type] : t('intro.interactive.feedback.placeholder')}</div>
              {conceptSummary ? (
                <ul className={styles.resultList}>
                  {conceptSummary.items.map((item) => (
                    <li key={item.label}>
                      <strong>{item.label}</strong>
                      <div>{item.value}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.placeholder}>{t('intro.interactive.feedback.placeholder')}</p>
              )}
              {conceptSummary ? <p className={styles.lead}>{conceptSummary.focus}</p> : null}
            </div>
            <div className={styles.feedbackCard}>
              {feedbackItems ? (
                <>
                  <span className={styles.infoTag}>{feedbackItems.intro}</span>
                  <ul className={styles.resultList}>
                    {feedbackItems.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {feedbackItems.prompts.length ? (
                    <>
                      <strong>{feedbackItems.nextStepsLabel}</strong>
                      <ul className={styles.promptList}>
                        {feedbackItems.prompts.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                  <p>{feedbackItems.closing}</p>
                </>
              ) : (
                <p className={styles.placeholder}>{t('intro.interactive.feedback.placeholder')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConceptBuilder;
