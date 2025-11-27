import type { TranslationKey } from "../i18n/types";

const iconPath = (fileName: string) => new URL(`../../assets/icons/${fileName}`, import.meta.url).href;

export const homePage = {
  hero: {
    badgeKey: "home.hero.badge" as TranslationKey,
    titleKey: "home.hero.title" as TranslationKey,
    subtitleKey: "home.hero.subtitle" as TranslationKey,
    primaryCta: { href: "/modules/0-introduction", labelKey: "home.hero.primary" as TranslationKey },
    secondaryCta: { href: "/#program", labelKey: "home.hero.secondary" as TranslationKey },
    noteKey: "home.hero.note" as TranslationKey,
    widget: {
      titleKey: "home.hero.widget.title" as TranslationKey,
      items: [
        "home.hero.widget.item1" as TranslationKey,
        "home.hero.widget.item2" as TranslationKey,
        "home.hero.widget.item3" as TranslationKey
      ]
    },
    floating: {
      valueKey: "home.hero.floating.value" as TranslationKey,
      labelKey: "home.hero.floating.label" as TranslationKey
    }
  },
  stats: [
    { valueKey: "home.stats.stat1.value" as TranslationKey, labelKey: "home.stats.stat1.label" as TranslationKey },
    { valueKey: "home.stats.stat2.value" as TranslationKey, labelKey: "home.stats.stat2.label" as TranslationKey },
    { valueKey: "home.stats.stat4.value" as TranslationKey, labelKey: "home.stats.stat4.label" as TranslationKey }
  ],
  statsSection: {
    eyebrowKey: "home.stats.eyebrow" as TranslationKey,
    titleKey: "home.stats.title" as TranslationKey
  },
  about: {
    eyebrowKey: "home.overview.eyebrow" as TranslationKey,
    titleKey: "home.overview.title" as TranslationKey,
    textKey: "home.overview.text" as TranslationKey,
    checklist: [
      "home.overview.point1" as TranslationKey,
      "home.overview.point2" as TranslationKey,
      "home.overview.point3" as TranslationKey
    ],
    features: [
      { titleKey: "home.features.card1.title" as TranslationKey, textKey: "home.features.card1.text" as TranslationKey },
      { titleKey: "home.features.card2.title" as TranslationKey, textKey: "home.features.card2.text" as TranslationKey },
      { titleKey: "home.features.card3.title" as TranslationKey, textKey: "home.features.card3.text" as TranslationKey }
    ]
  },
  program: {
    eyebrowKey: "home.program.eyebrow" as TranslationKey,
    titleKey: "home.program.title" as TranslationKey,
    textKey: "home.program.text" as TranslationKey,
    blocks: [
      {
        titleKey: "home.program.block1.title" as TranslationKey,
        links: [
          { href: "/modules/0-introduction", labelKey: "home.program.block1.item1" as TranslationKey },
          { href: "/modules/1-community-building", labelKey: "home.program.block1.item2" as TranslationKey },
          { href: "/modules/2-internal-communications", labelKey: "home.program.block1.item3" as TranslationKey }
        ]
      },
      {
        titleKey: "home.program.block2.title" as TranslationKey,
        links: [
          { href: "/modules/3-infrastructure", labelKey: "home.program.block2.item1" as TranslationKey },
          { href: "/modules/4-legal-and-security", labelKey: "home.program.block2.item2" as TranslationKey },
          { href: "/modules/5-effectiveness-and-development", labelKey: "home.program.block2.item3" as TranslationKey }
        ]
      },
      {
        titleKey: "home.program.block3.title" as TranslationKey,
        links: [
          { href: "/modules/6-crisis-management", labelKey: "home.program.block3.item1" as TranslationKey },
          { href: "/modules/7-fundraising", labelKey: "home.program.block3.item2" as TranslationKey },
          { href: "/modules/8-cases-and-practice", labelKey: "home.program.block3.item3" as TranslationKey }
        ]
      }
    ]
  },
  sections: {
    eyebrowKey: "home.sections.eyebrow" as TranslationKey,
    titleKey: "home.sections.title" as TranslationKey,
    textKey: "home.sections.text" as TranslationKey,
    openLabelKey: "home.sections.open" as TranslationKey,
    cards: [
      {
        index: "0",
        icon: iconPath("record_voice_over.svg"),
        titleKey: "home.sections.module0.title" as TranslationKey,
        textKey: "home.sections.module0.desc" as TranslationKey,
        iconAltKey: "home.sections.module0.iconAlt" as TranslationKey,
        href: "/modules/0-introduction"
      },
      {
        index: "1",
        icon: iconPath("community.svg"),
        titleKey: "home.sections.module1.title" as TranslationKey,
        textKey: "home.sections.module1.desc" as TranslationKey,
        iconAltKey: "home.sections.module1.iconAlt" as TranslationKey,
        href: "/modules/1-community-building"
      },
      {
        index: "2",
        icon: iconPath("communication.svg"),
        titleKey: "home.sections.module2.title" as TranslationKey,
        textKey: "home.sections.module2.desc" as TranslationKey,
        iconAltKey: "home.sections.module2.iconAlt" as TranslationKey,
        href: "/modules/2-internal-communications"
      },
      {
        index: "3",
        icon: iconPath("Infrastructure.svg"),
        titleKey: "home.sections.module3.title" as TranslationKey,
        textKey: "home.sections.module3.desc" as TranslationKey,
        iconAltKey: "home.sections.module3.iconAlt" as TranslationKey,
        href: "/modules/3-infrastructure"
      },
      {
        index: "4",
        icon: iconPath("safety.svg"),
        titleKey: "home.sections.module4.title" as TranslationKey,
        textKey: "home.sections.module4.desc" as TranslationKey,
        iconAltKey: "home.sections.module4.iconAlt" as TranslationKey,
        href: "/modules/4-legal-and-security"
      },
      {
        index: "5",
        icon: iconPath("efficiency.svg"),
        titleKey: "home.sections.module5.title" as TranslationKey,
        textKey: "home.sections.module5.desc" as TranslationKey,
        iconAltKey: "home.sections.module5.iconAlt" as TranslationKey,
        href: "/modules/5-effectiveness-and-development"
      },
      {
        index: "6",
        icon: iconPath("crisis.svg"),
        titleKey: "home.sections.module6.title" as TranslationKey,
        textKey: "home.sections.module6.desc" as TranslationKey,
        iconAltKey: "home.sections.module6.iconAlt" as TranslationKey,
        href: "/modules/6-crisis-management"
      },
      {
        index: "7",
        icon: iconPath("fundraising.svg"),
        titleKey: "home.sections.module7.title" as TranslationKey,
        textKey: "home.sections.module7.desc" as TranslationKey,
        iconAltKey: "home.sections.module7.iconAlt" as TranslationKey,
        href: "/modules/7-fundraising"
      },
      {
        index: "8",
        icon: iconPath("cases.svg"),
        titleKey: "home.sections.module8.title" as TranslationKey,
        textKey: "home.sections.module8.desc" as TranslationKey,
        iconAltKey: "home.sections.module8.iconAlt" as TranslationKey,
        href: "/modules/8-cases-and-practice"
      }
    ]
  },
  feedback: {
    eyebrowKey: "home.feedback.eyebrow" as TranslationKey,
    titleKey: "home.feedback.title" as TranslationKey,
    textKey: "home.feedback.text" as TranslationKey,
    items: [
      { titleKey: "home.feedback.item1.title" as TranslationKey, textKey: "home.feedback.item1.text" as TranslationKey },
      { titleKey: "home.feedback.item2.title" as TranslationKey, textKey: "home.feedback.item2.text" as TranslationKey },
      { titleKey: "home.feedback.item3.title" as TranslationKey, textKey: "home.feedback.item3.text" as TranslationKey }
    ]
  },
  format: {
    eyebrowKey: "home.format.eyebrow" as TranslationKey,
    titleKey: "home.format.title" as TranslationKey,
    textKey: "home.format.text" as TranslationKey,
    blocks: [
      { titleKey: "home.format.block1.title" as TranslationKey, textKey: "home.format.block1.text" as TranslationKey },
      { titleKey: "home.format.block2.title" as TranslationKey, textKey: "home.format.block2.text" as TranslationKey },
      { titleKey: "home.format.block3.title" as TranslationKey, textKey: "home.format.block3.text" as TranslationKey }
    ]
  },
  resources: {
    eyebrowKey: "home.resources.eyebrow" as TranslationKey,
    titleKey: "home.resources.title" as TranslationKey,
    textKey: "home.resources.text" as TranslationKey,
    items: [
      "home.resources.item1" as TranslationKey,
      "home.resources.item2" as TranslationKey,
      "home.resources.item3" as TranslationKey
    ]
  },
  cta: {
    titleKey: "home.cta.title" as TranslationKey,
    textKey: "home.cta.text" as TranslationKey,
    button: { href: "mailto:hello@example.com", labelKey: "home.cta.button" as TranslationKey }
  },
  footer: {
    textKey: "home.footer.text" as TranslationKey,
    noteKey: "home.footer.note" as TranslationKey
  }
} as const;


