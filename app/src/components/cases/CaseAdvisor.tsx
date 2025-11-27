import { useState, type ChangeEvent } from 'react';
import styles from './CaseAdvisor.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import { extractAiText, formatTemplate } from '../../utils/ai';
import type { CaseStudy, CasesPageContent } from '../../data/pages/cases';
import type { TranslationKey } from '../../data/i18n/types';

type CaseAdvisorProps = {
  advisor: CasesPageContent['advisor'];
  cases: ReadonlyArray<CaseStudy>;
  onResultChange?: (snapshot: { description: string; result: string; notice: string | null }) => void;
};

const CaseAdvisor = ({ advisor, cases, onResultChange }: CaseAdvisorProps) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [result, setResult] = useState('');
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiKey = (import.meta.env.VITE_GOOGLE_AI_API_KEY ?? '').trim();
  const apiBase = import.meta.env.VITE_GOOGLE_AI_API_URL ?? advisor.prompt.apiBase;
  const model = import.meta.env.VITE_GOOGLE_AI_MODEL ?? advisor.prompt.defaultModel;

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
    if (error) {
      setError(null);
    }
  };

  const buildCaseSummary = () =>
    cases
      .map((item) => `- ${item.title}: ${item.description}\n  Теги: ${item.tags.join(', ')}`)
      .join('\n\n');

  const buildFallbackText = (input: string) => {
    const normalized = input.toLocaleLowerCase('ru');
    const scored = cases
      .map((item) => {
        const score = item.keywords.reduce((acc, keyword) => (normalized.includes(keyword) ? acc + 1 : acc), 0);
        return { item, score };
      })
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return a.item.title.localeCompare(b.item.title, 'ru');
      });

    const relevant = scored.filter((entry) => entry.score > 0).slice(0, 3);
    const selected = (relevant.length > 0 ? relevant : scored.slice(0, 3)).map((entry) => entry.item);

    const intro = t(advisor.fallback.introKey);
    const body = selected.map((item) =>
      formatTemplate(t(advisor.fallback.caseTemplateKey), {
        title: item.title,
        description: item.description,
        aspects: item.aspects.slice(0, 2).join('; ')
      })
    );
    const outro = t(advisor.fallback.outroKey);

    return [intro, ...body, outro].filter(Boolean).join('\n\n').trim();
  };

  const updateSnapshot = (payload: { description: string; result: string; notice: string | null }) => {
    onResultChange?.(payload);
  };

  const runFallback = (messageKey: TranslationKey) => {
    const trimmed = description.trim();
    const fallbackText = buildFallbackText(trimmed);
    const noticeText = `${t(messageKey)} ${t(advisor.messages.fallbackNoticeKey)}`.trim();
    setStatus('success');
    setResult(fallbackText);
    setNotice(noticeText);
    updateSnapshot({ description: trimmed, result: fallbackText, notice: noticeText });
  };

  const handleSubmit = async () => {
    const trimmed = description.trim();

    if (!trimmed) {
      setError(t(advisor.messages.emptyKey));
      return;
    }

    setStatus('loading');
    setResult('');
    setNotice(null);
    setError(null);
    updateSnapshot({ description: trimmed, result: '', notice: null });

    const prompt = `${t(advisor.prompt.systemKey)}\n\n${formatTemplate(t(advisor.prompt.templateKey), {
      description: trimmed,
      summaryIntro: t(advisor.prompt.summaryIntroKey),
      casesSummary: buildCaseSummary()
    })}\n\n${t(advisor.prompt.toneKey)}`;

    if (!apiKey) {
      runFallback(advisor.messages.missingKey);
      return;
    }

    try {
      const response = await fetch(`${apiBase}${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const payload = await response.json();
      const text = extractAiText(payload);

      if (text) {
        setStatus('success');
        setResult(text);
        setNotice(null);
        updateSnapshot({ description: trimmed, result: text, notice: null });
        return;
      }

      runFallback(advisor.messages.networkKey);
    } catch (error) {
      runFallback(advisor.messages.networkKey);
    }
  };

  const resultBody = (() => {
    if (status === 'loading') {
      return <p className={styles.placeholder}>{t(advisor.resultLoadingKey)}</p>;
    }

    if (status === 'idle' || !result) {
      return <p className={styles.placeholder}>{t(advisor.resultPlaceholderKey)}</p>;
    }

    return result.split(/\n{2,}/).map((block, index) => (
      <p key={index} className={styles.resultParagraph}>
        {block}
      </p>
    ));
  })();

  return (
    <section id="advisor" className={styles.section} aria-labelledby="cases-advisor-title">
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(advisor.badgeKey)}</span>
          <h2 id="cases-advisor-title">{t(advisor.titleKey)}</h2>
          <p className={styles.lead}>{t(advisor.descriptionKey)}</p>
          <p className={styles.helper}>{t(advisor.helperKey)}</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.formCard} data-animate>
            <label htmlFor="cases-advisor-description" className={styles.label}>
              {t(advisor.fieldLabelKey)}
            </label>
            <textarea
              id="cases-advisor-description"
              className={styles.textarea}
              value={description}
              onChange={handleDescriptionChange}
              placeholder={t(advisor.fieldPlaceholderKey)}
            />
            <button
              type="button"
              className={styles.button}
              onClick={handleSubmit}
              disabled={status === 'loading'}
              aria-busy={status === 'loading'}
            >
              {t(advisor.buttonKey)}
            </button>
            {error ? (
              <p className={styles.error} role="alert">
                {error}
              </p>
            ) : null}
            {notice ? (
              <p className={styles.notice} role="status">
                {notice}
              </p>
            ) : null}
          </div>

          <aside className={styles.resultCard} data-animate>
            <h3>{t(advisor.resultTitleKey)}</h3>
            <div
              className={styles.resultBody}
              role="status"
              aria-live="polite"
              aria-atomic="true"
              aria-busy={status === 'loading'}
            >
              {resultBody}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CaseAdvisor;
