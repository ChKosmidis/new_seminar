import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import type {
  CrisisManagementPageContent,
  CrisisPlanFieldId,
  CrisisPlanSnapshot
} from "../../data/pages/crisisManagement";
import styles from "./CrisisPlan.module.css";
import { extractAiText, formatTemplate } from "../../utils/ai";

type CrisisPlanProps = {
  plan: CrisisManagementPageContent["plan"];
  onSnapshot?: (snapshot: CrisisPlanSnapshot) => void;
};

type FieldState = Record<CrisisPlanFieldId, string>;

type AiStatus = "idle" | "loading" | "success";

const buildInitialState = (fields: CrisisManagementPageContent["plan"]["fields"]): FieldState => {
  return fields.reduce<FieldState>((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {
    situation: "",
    triggers: "",
    responsibles: "",
    actions: "",
    internal: "",
    external: "",
    resources: "",
    lessons: ""
  });
};

const CrisisPlan = ({ plan, onSnapshot }: CrisisPlanProps) => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const [fields, setFields] = useState<FieldState>(() => buildInitialState(plan.fields));
  const [aiStatus, setAiStatus] = useState<AiStatus>("idle");
  const [aiResult, setAiResult] = useState("");
  const [notice, setNotice] = useState("");

  const apiKey = (import.meta.env.VITE_GOOGLE_AI_API_KEY ?? "").trim();
  const apiBase = import.meta.env.VITE_GOOGLE_AI_API_URL ?? "https://generativelanguage.googleapis.com/v1beta/models/";
  const model = import.meta.env.VITE_GOOGLE_AI_MODEL ?? "gemma-3n-e4b-it";

  const emptyValue = useMemo(() => t(plan.ai.prompt.emptyValueKey), [plan.ai.prompt.emptyValueKey, t]);

  useEffect(() => {
    onSnapshot?.({ fields, aiFeedback: aiResult, aiNotice: notice });
  }, [fields, aiResult, notice, onSnapshot]);

  const handleFieldChange = (id: CrisisPlanFieldId) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setFields((prev) => ({ ...prev, [id]: value }));
  };

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const handleAiRequest = async () => {
    const hasContent = Object.values(fields).some((value) => value.trim().length > 0);
    if (!hasContent) {
      setNotice(t(plan.ai.messages.emptyKey));
      setAiStatus("idle");
      return;
    }

    const tokens: Record<string, string> = {};
    for (const field of plan.fields) {
      const value = fields[field.id].trim();
      tokens[field.id] = value || emptyValue;
    }

    const fallback = formatTemplate(t(plan.ai.result.fallbackKey), tokens);

    if (!apiKey) {
      setAiResult(fallback);
      setNotice(t(plan.ai.messages.missingKeyKey));
      setAiStatus("success");
      return;
    }

    setAiStatus("loading");
    setNotice("");
    setAiResult("");

    try {
      const prompt = `${t(plan.ai.prompt.systemKey)}\n\n${formatTemplate(t(plan.ai.prompt.templateKey), tokens)}\n\n${t(plan.ai.prompt.toneKey)}`;
      const response = await fetch(`${apiBase}${model}:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
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
        setAiResult(text);
        setAiStatus("success");
        return;
      }

      setAiResult(fallback);
      setNotice(t(plan.ai.messages.networkErrorKey));
      setAiStatus("success");
    } catch (error) {
      setAiResult(fallback);
      setNotice(t(plan.ai.messages.networkErrorKey));
      setAiStatus("success");
    }
  };

  const resultContent = (() => {
    if (aiStatus === "loading") {
      return <p className={styles.placeholder}>{t(plan.ai.result.loadingKey)}</p>;
    }

    if (!aiResult) {
      return <p className={styles.placeholder}>{t(plan.ai.result.placeholderKey)}</p>;
    }

    return (
      <div className={styles.resultBody}>
        {aiResult.split(/\n+/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    );
  })();

  return (
    <section id="plan" className={styles.section} aria-labelledby="plan-title">
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(plan.badgeKey)}</span>
          <h2 id="plan-title">{t(plan.titleKey)}</h2>
          <p className={styles.lead}>{t(plan.leadKey)}</p>
          <button
            type="button"
            className={styles.toggleButton}
            onClick={toggleCollapse}
            aria-expanded={!collapsed}
          >
            {collapsed ? t(plan.toggle.showKey) : t(plan.toggle.hideKey)}
          </button>
          <p className={styles.helper}>{t(plan.helperKey)}</p>
        </header>

        {!collapsed ? (
          <div className={styles.layout}>
            <div className={styles.formCard} data-animate>
              {plan.fields.map((field) => {
                const inputId = `crisis-plan-${field.id}`;
                const commonProps = {
                  id: inputId,
                  value: fields[field.id],
                  onChange: handleFieldChange(field.id),
                  placeholder: t(field.placeholderKey)
                };

                return (
                  <div key={field.id} className={styles.field}>
                    <label className={styles.label} htmlFor={inputId}>
                      {t(field.labelKey)}
                    </label>
                    {field.type === "text" ? (
                      <input {...commonProps} type="text" className={styles.input} />
                    ) : (
                      <textarea
                        {...commonProps}
                        className={styles.textarea}
                        rows={field.rows ?? 3}
                      />
                    )}
                  </div>
                );
              })}

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={handleAiRequest}
                  disabled={aiStatus === "loading"}
                >
                  {t(plan.ai.buttonKey)}
                </button>
                <span className={styles.helper}>{t(plan.ai.helperKey)}</span>
              </div>

              {notice ? <p className={styles.notice}>{notice}</p> : null}
            </div>

            <aside className={styles.resultCard} data-animate>
              <h3 className={styles.resultTitle}>{t(plan.ai.result.titleKey)}</h3>
              {resultContent}
              <p className={styles.disclaimer}>{t(plan.ai.result.disclaimerKey)}</p>
            </aside>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CrisisPlan;
