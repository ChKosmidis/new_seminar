import { Link } from "react-router-dom";
import styles from "./SectionsStrip.module.css";
import { modules } from "../../data/modules";
import { useTranslation } from "../../hooks/useTranslation";

const SectionsStrip = () => {
  const { t } = useTranslation();

  const scroll = (direction: "prev" | "next") => {
    const strip = document.querySelector<HTMLDivElement>('[data-sections-strip]');
    if (!strip) return;
    const delta = direction === "next" ? strip.clientWidth * 0.8 : -strip.clientWidth * 0.8;
    strip.scrollBy({ left: delta, behavior: "smooth" });
  };

  const isInternal = (href: string) => href.startsWith("/");

  return (
    <div className={styles.shell} data-animate>
      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        onClick={() => scroll("prev")}
        aria-label={t("moduleStrip.prev")}
      >
        <span aria-hidden>{"<"}</span>
      </button>
      <div className={styles.strip} data-sections-strip>
        {modules.map((module) =>
          isInternal(module.href) ? (
            <Link key={module.id} className={styles.link} to={module.href}>
              <span className={styles.index}>{module.id}</span>
              <span>{t(module.labelKey)}</span>
            </Link>
          ) : (
            <a key={module.id} className={styles.link} href={module.href} aria-disabled={module.href === "#"}>
              <span className={styles.index}>{module.id}</span>
              <span>{t(module.labelKey)}</span>
            </a>
          )
        )}
      </div>
      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        onClick={() => scroll("next")}
        aria-label={t("moduleStrip.next")}
      >
        <span aria-hidden>{">"}</span>
      </button>
    </div>
  );
};

export default SectionsStrip;
