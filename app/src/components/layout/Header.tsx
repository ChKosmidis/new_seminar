import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTranslation } from "../../hooks/useTranslation";

const navItems = [
  { to: "/#hero", labelKey: "layout.nav.home" as const },
  { to: "/#program", labelKey: "layout.nav.program" as const },
  { to: "/#sections-map", labelKey: "layout.nav.sections" as const },
  { to: "/#ai-feedback", labelKey: "layout.nav.features" as const },
  { to: "/#resources", labelKey: "layout.nav.resources" as const }
];

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <header className={styles.header} data-component="site-header">
      <div className={styles.inner}>
        <Link className={styles.brand} to="/">
          <span className={styles.logo} aria-hidden>
            NGO
          </span>
          <span className={styles.brandName}>{t("layout.brand.name")}</span>
        </Link>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>
        <div className={styles.controls}>
          <div className={styles.langSwitch} role="group" aria-label="Language switcher">
            <button
              type="button"
              className={language === "ru" ? styles.active : ""}
              onClick={() => setLanguage("ru")}
            >
              {t("layout.lang.ru")}
            </button>
            <button
              type="button"
              className={language === "en" ? styles.active : ""}
              onClick={() => setLanguage("en")}
            >
              {t("layout.lang.en")}
            </button>
          </div>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t("layout.theme.light") : t("layout.theme.dark")}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
