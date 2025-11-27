import { useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import type {
  CrisisChecklistItemId,
  CrisisManagementPageContent,
  CrisisChecklistCustomItem
} from "../../data/pages/crisisManagement";
import styles from "./CrisisChecklist.module.css";

type CrisisChecklistProps = {
  checklist: CrisisManagementPageContent["checklist"];
  checkedDefault: Record<CrisisChecklistItemId, boolean>;
  onToggleDefault: (id: CrisisChecklistItemId) => void;
  customItems: ReadonlyArray<CrisisChecklistCustomItem>;
  onAddCustom: (text: string) => void;
  onToggleCustom: (id: string) => void;
  onRemoveCustom: (id: string) => void;
};

const CrisisChecklist = ({
  checklist,
  checkedDefault,
  onToggleDefault,
  customItems,
  onAddCustom,
  onToggleCustom,
  onRemoveCustom
}: CrisisChecklistProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError(t(checklist.emptyNoticeKey));
      return;
    }
    onAddCustom(trimmed);
    setValue("");
    setError("");
  };

  return (
    <section id="checklist" className={styles.section} aria-labelledby="checklist-title">
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <span className={styles.badge}>{t(checklist.badgeKey)}</span>
          <h2 id="checklist-title">{t(checklist.titleKey)}</h2>
          <p className={styles.lead}>{t(checklist.leadKey)}</p>
        </header>

        <ul className={styles.list}>
          {checklist.items.map((item) => {
            const checked = Boolean(checkedDefault[item.id]);
            return (
              <li key={item.id} data-animate>
                <button
                  type="button"
                  className={styles.item}
                  data-checked={checked}
                  onClick={() => onToggleDefault(item.id)}
                >
                  <span className={styles.icon} aria-hidden>
                    <img src={item.icon} alt="" />
                  </span>
                  <span className={styles.itemContent}>
                    <span className={styles.itemTitle}>{t(item.titleKey)}</span>
                    <span className={styles.itemText}>{t(item.descriptionKey)}</span>
                  </span>
                </button>
              </li>
            );
          })}

          {customItems.map((item) => (
            <li key={item.id} data-animate>
              <button
                type="button"
                className={styles.item}
                data-checked={item.checked}
                onClick={() => onToggleCustom(item.id)}
                onDoubleClick={() => onRemoveCustom(item.id)}
                title={t(checklist.customHintKey)}
              >
                <span className={styles.icon} aria-hidden>
                  <img src={checklist.items[0]?.icon ?? ""} alt="" />
                </span>
                <span className={styles.itemContent}>
                  <span className={styles.itemTitle}>{item.text}</span>
                  <span className={styles.itemText}>{t(checklist.customHintKey)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <form className={styles.form} onSubmit={handleSubmit} data-animate>
          <input
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              if (error) {
                setError("");
              }
            }}
            type="text"
            className={styles.input}
            placeholder={t(checklist.addPlaceholderKey)}
            aria-label={t(checklist.addPlaceholderKey)}
          />
          <button type="submit" className={styles.button}>
            {t(checklist.addButtonKey)}
          </button>
        </form>
        {error ? <p className={styles.error}>{error}</p> : null}
        <p className={styles.helper}>{t(checklist.helperKey)}</p>
      </div>
    </section>
  );
};

export default CrisisChecklist;
