import { useState } from 'react';
import styles from './IntroQuiz.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  introInteractiveLocales,
  introQuizBlueprint,
  type QuizOptionId,
  type QuizQuestionId
} from '../../data/pages/introInteractive';

const formatTemplate = (template: string, tokens: Record<string, string>) =>
  template.replace(/\{([^}]+)\}/g, (_, key) => tokens[key] ?? '');

const createInitialAnswers = () => {
  const record: Record<QuizQuestionId, QuizOptionId | ''> = Object.create(null);
  introQuizBlueprint.forEach((question) => {
    record[question.id] = '';
  });
  return record;
};

const IntroQuiz = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const locale = introInteractiveLocales[language];

    const [answers, setAnswers] = useState<Record<QuizQuestionId, QuizOptionId | ''>>(createInitialAnswers());
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [result, setResult] = useState<{ score: number; incorrect: number; percentage: number } | null>(null);

  const handleOptionChange = (questionId: QuizQuestionId, optionId: QuizOptionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleReset = () => {
    setAnswers(createInitialAnswers());
    setResult(null);
    setValidationMessage(null);
  };

  const handleSubmit = () => {
    const unanswered = introQuizBlueprint.find((question) => !answers[question.id]);
    if (unanswered) {
      setValidationMessage(locale.quiz.validation);
      return;
    }

    let correct = 0;
    introQuizBlueprint.forEach((question) => {
      const selected = answers[question.id];
      const option = question.options.find((item) => item.id === selected);
      if ((option as { correct?: boolean } | undefined)?.correct) {
        correct += 1;
      }
    });

    const total = introQuizBlueprint.length;
    const percentage = Math.round((correct / total) * 100);
    setResult({ score: correct, incorrect: total - correct, percentage });
    setValidationMessage(null);
  };

  const resultText = result
    ? formatTemplate(locale.quiz.resultTemplate, {
        score: result.score.toString(),
        total: introQuizBlueprint.length.toString(),
        percentage: result.percentage.toString()
      })
    : '';

  return (
    <section id="quiz" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.badge}>{t('intro.quiz.badge')}</span>
          <h2>{t('intro.quiz.title')}</h2>
          <p className={styles.lead}>{t('intro.quiz.lead')}</p>
        </div>
        <div className={styles.quizCard}>
          <div className={styles.questionList}>
            {introQuizBlueprint.map((question) => {
              const questionData = locale.quiz.questions[question.id];
              return (
                <fieldset key={question.id} className={styles.fieldset}>
                  <legend className={styles.legend}>{questionData.question}</legend>
                  <div className={styles.options}>
                    {question.options.map((option) => (
                      <label key={option.id} className={styles.option}>
                        <input
                          type="radio"
                          className={styles.radio}
                          name={question.id}
                          value={option.id}
                          checked={answers[question.id] === option.id}
                          onChange={() => handleOptionChange(question.id, option.id)}
                        />
                        <span className={styles.optionLabel}>{questionData.options[option.id] ?? option.id}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              );
            })}
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.submitButton} onClick={handleSubmit}>
              {t('intro.quiz.submit')}
            </button>
            <button type="button" className={styles.resetButton} onClick={handleReset}>
              {t('intro.quiz.reset')}
            </button>
          </div>
          {validationMessage ? <p className={styles.validation}>{validationMessage}</p> : null}
          {result ? (
            <div className={styles.resultCard}>
              <div className={styles.resultHeadline}>{resultText}</div>
              <div className={styles.resultBar}>
                <div className={styles.resultFill} style={{ width: `${result.percentage}%` }} />
              </div>
              <div className={styles.resultLegend}>
                <span className={styles.legendItem}>
                  <span className={`${styles.legendBullet} ${styles.legendBulletPositive}`} />
                  {locale.quiz.labels[0]} — {result.score}
                </span>
                <span className={styles.legendItem}>
                  <span className={`${styles.legendBullet} ${styles.legendBulletNegative}`} />
                  {locale.quiz.labels[1]} — {result.incorrect}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default IntroQuiz;
