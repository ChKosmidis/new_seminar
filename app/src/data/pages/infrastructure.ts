import type { TranslationKey } from '../i18n/types';

type HeroAction = {
  href: string;
  labelKey: TranslationKey;
  variant?: 'primary' | 'outline';
};

type HeroBullet = {
  icon: string;
  titleKey: TranslationKey;
  textKey: TranslationKey;
};

type HeroCard = {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  textKey: TranslationKey;
  items: ReadonlyArray<TranslationKey>;
  theme: {
    light: { background: string; border: string; shadow: string };
    dark: { background: string; border: string; shadow: string };
  };
};

type HeroContent = {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  actions: ReadonlyArray<HeroAction>;
  quickNav: ReadonlyArray<{ href: string; labelKey: TranslationKey }>;
  bullets: ReadonlyArray<HeroBullet>;
  card: HeroCard;
};

type AuditItem = {
  id: string;
  labelKey: TranslationKey;
};

type AuditCategory = {
  id: string;
  icon: string;
  titleKey: TranslationKey;
  descriptionKey?: TranslationKey;
  progressLabelKey?: TranslationKey;
  items: ReadonlyArray<AuditItem>;
};

type AuditResultLevel = {
  minScore: number;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
};

type AuditContent = {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  introKey: TranslationKey;
  helperKey: TranslationKey;
  categories: ReadonlyArray<AuditCategory>;
  actionKey: TranslationKey;
  result: {
    titleKey: TranslationKey;
    summaryKey: TranslationKey;
    progressTitleKey: TranslationKey;
    progressAriaKey: TranslationKey;
    defaultKey: TranslationKey;
    overallLabelKey: TranslationKey;
    levels: ReadonlyArray<AuditResultLevel>;
  };
};

type BrainstormField = {
  id: string;
  aspectLabelKey: TranslationKey;
  aspectPromptKey: TranslationKey;
  aspectPlaceholderKey: TranslationKey;
  actionLabelKey: TranslationKey;
  actionPlaceholderKey: TranslationKey;
};

type BrainstormContent = {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  introKey: TranslationKey;
  fields: ReadonlyArray<BrainstormField>;
  submitKey: TranslationKey;
  resetKey: TranslationKey;
  emptyErrorKey: TranslationKey;
  fallbackAspectKey: TranslationKey;
  fallbackActionKey: TranslationKey;
  resultTitleKey: TranslationKey;
  resultDefaultKey: TranslationKey;
  resultIntroKey: TranslationKey;
  resultItemKey: TranslationKey;
  resultOutroKey: TranslationKey;
  resultAdviceKey: TranslationKey;
};

export type InfrastructurePageContent = {
  hero: HeroContent;
  audit: AuditContent;
  brainstorm: BrainstormContent;
};

export const infrastructurePage: InfrastructurePageContent = {
  hero: {
    badgeKey: 'infrastructure.hero.badge' as TranslationKey,
    titleKey: 'infrastructure.hero.title' as TranslationKey,
    subtitleKey: 'infrastructure.hero.subtitle' as TranslationKey,
    actions: [
      { href: '#audit', labelKey: 'infrastructure.hero.primary' as TranslationKey, variant: 'primary' },
      { href: '#brainstorm', labelKey: 'infrastructure.hero.secondary' as TranslationKey, variant: 'outline' }
    ] satisfies ReadonlyArray<HeroAction>,
    quickNav: [
      { href: '#audit', labelKey: 'infrastructure.quick.audit' as TranslationKey },
      { href: '#results', labelKey: 'infrastructure.quick.results' as TranslationKey },
      { href: '#brainstorm', labelKey: 'infrastructure.quick.brainstorm' as TranslationKey }
    ],
    bullets: [
      {
        icon: '🧭',
        titleKey: 'infrastructure.hero.point1.title' as TranslationKey,
        textKey: 'infrastructure.hero.point1.text' as TranslationKey
      },
      {
        icon: '🛡️',
        titleKey: 'infrastructure.hero.point2.title' as TranslationKey,
        textKey: 'infrastructure.hero.point2.text' as TranslationKey
      }
    ],
    card: {
      badgeKey: 'infrastructure.hero.card.badge' as TranslationKey,
      titleKey: 'infrastructure.hero.card.title' as TranslationKey,
      textKey: 'infrastructure.hero.card.text' as TranslationKey,
      items: [
        'infrastructure.hero.card.item1' as TranslationKey,
        'infrastructure.hero.card.item2' as TranslationKey,
        'infrastructure.hero.card.item3' as TranslationKey
      ],
      theme: {
        light: {
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(56, 189, 248, 0.12))',
          border: 'rgba(37, 99, 235, 0.18)',
          shadow: '0 28px 60px rgba(37, 99, 235, 0.22)'
        },
        dark: {
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.18), rgba(56, 189, 248, 0.22))',
          border: 'rgba(96, 165, 250, 0.45)',
          shadow: '0 36px 72px rgba(8, 47, 73, 0.65)'
        }
      }
    }
  },
  audit: {
    badgeKey: 'infrastructure.audit.badge' as TranslationKey,
    titleKey: 'infrastructure.audit.title' as TranslationKey,
    introKey: 'infrastructure.audit.intro' as TranslationKey,
    helperKey: 'infrastructure.audit.helper' as TranslationKey,
    categories: [
      {
        id: 'tech',
        icon: 'low_budget.svg',
        titleKey: 'infrastructure.audit.categories.tech.title' as TranslationKey,
        descriptionKey: 'infrastructure.audit.categories.tech.description' as TranslationKey,
        progressLabelKey: 'infrastructure.audit.categories.tech.progress' as TranslationKey,
        items: [
          { id: 'site_sections', labelKey: 'infrastructure.audit.categories.tech.items.site_sections' as TranslationKey },
          { id: 'site_security', labelKey: 'infrastructure.audit.categories.tech.items.site_security' as TranslationKey },
          { id: 'site_ddos', labelKey: 'infrastructure.audit.categories.tech.items.site_ddos' as TranslationKey },
          { id: 'site_mobile', labelKey: 'infrastructure.audit.categories.tech.items.site_mobile' as TranslationKey },
          { id: 'site_accessibility', labelKey: 'infrastructure.audit.categories.tech.items.site_accessibility' as TranslationKey },
          { id: 'crm_has', labelKey: 'infrastructure.audit.categories.tech.items.crm_has' as TranslationKey },
          { id: 'crm_integration', labelKey: 'infrastructure.audit.categories.tech.items.crm_integration' as TranslationKey },
          { id: 'crm_roles', labelKey: 'infrastructure.audit.categories.tech.items.crm_roles' as TranslationKey },
          { id: 'online_platforms', labelKey: 'infrastructure.audit.categories.tech.items.online_platforms' as TranslationKey },
          { id: 'online_recordings', labelKey: 'infrastructure.audit.categories.tech.items.online_recordings' as TranslationKey },
          { id: 'cloud_secure', labelKey: 'infrastructure.audit.categories.tech.items.cloud_secure' as TranslationKey },
          { id: 'cloud_access', labelKey: 'infrastructure.audit.categories.tech.items.cloud_access' as TranslationKey }
        ]
      },
      {
        id: 'finance',
        icon: 'rights.svg',
        titleKey: 'infrastructure.audit.categories.finance.title' as TranslationKey,
        descriptionKey: 'infrastructure.audit.categories.finance.description' as TranslationKey,
        progressLabelKey: 'infrastructure.audit.categories.finance.progress' as TranslationKey,
        items: [
          { id: 'bank_account', labelKey: 'infrastructure.audit.categories.finance.items.bank_account' as TranslationKey },
          { id: 'bank_multisig', labelKey: 'infrastructure.audit.categories.finance.items.bank_multisig' as TranslationKey },
          { id: 'donation_systems', labelKey: 'infrastructure.audit.categories.finance.items.donation_systems' as TranslationKey },
          { id: 'donation_recurring', labelKey: 'infrastructure.audit.categories.finance.items.donation_recurring' as TranslationKey },
          { id: 'finance_transparency', labelKey: 'infrastructure.audit.categories.finance.items.finance_transparency' as TranslationKey },
          { id: 'finance_audit', labelKey: 'infrastructure.audit.categories.finance.items.finance_audit' as TranslationKey }
        ]
      },
      {
        id: 'cyber',
        icon: 'safety.svg',
        titleKey: 'infrastructure.audit.categories.cyber.title' as TranslationKey,
        descriptionKey: 'infrastructure.audit.categories.cyber.description' as TranslationKey,
        progressLabelKey: 'infrastructure.audit.categories.cyber.progress' as TranslationKey,
        items: [
          { id: 'password_policy', labelKey: 'infrastructure.audit.categories.cyber.items.password_policy' as TranslationKey },
          { id: 'password_rotation', labelKey: 'infrastructure.audit.categories.cyber.items.password_rotation' as TranslationKey },
          { id: 'phishing_awareness', labelKey: 'infrastructure.audit.categories.cyber.items.phishing_awareness' as TranslationKey },
          { id: 'phishing_simulation', labelKey: 'infrastructure.audit.categories.cyber.items.phishing_simulation' as TranslationKey },
          { id: 'backup_policy', labelKey: 'infrastructure.audit.categories.cyber.items.backup_policy' as TranslationKey },
          { id: 'backup_geo', labelKey: 'infrastructure.audit.categories.cyber.items.backup_geo' as TranslationKey }
        ]
      }
    ],
    actionKey: 'infrastructure.audit.action' as TranslationKey,
    result: {
      titleKey: 'infrastructure.audit.result.title' as TranslationKey,
      summaryKey: 'infrastructure.audit.result.summary' as TranslationKey,
      progressTitleKey: 'infrastructure.audit.result.progressTitle' as TranslationKey,
      progressAriaKey: 'infrastructure.audit.result.progressAria' as TranslationKey,
      defaultKey: 'infrastructure.audit.result.default' as TranslationKey,
      overallLabelKey: 'infrastructure.audit.result.overall' as TranslationKey,
      levels: [
        {
          minScore: 90,
          titleKey: 'infrastructure.audit.result.level.excellent.title' as TranslationKey,
          descriptionKey: 'infrastructure.audit.result.level.excellent.description' as TranslationKey
        },
        {
          minScore: 70,
          titleKey: 'infrastructure.audit.result.level.good.title' as TranslationKey,
          descriptionKey: 'infrastructure.audit.result.level.good.description' as TranslationKey
        },
        {
          minScore: 40,
          titleKey: 'infrastructure.audit.result.level.medium.title' as TranslationKey,
          descriptionKey: 'infrastructure.audit.result.level.medium.description' as TranslationKey
        },
        {
          minScore: 0,
          titleKey: 'infrastructure.audit.result.level.low.title' as TranslationKey,
          descriptionKey: 'infrastructure.audit.result.level.low.description' as TranslationKey
        }
      ]
    }
  },
  brainstorm: {
    badgeKey: 'infrastructure.brainstorm.badge' as TranslationKey,
    titleKey: 'infrastructure.brainstorm.title' as TranslationKey,
    introKey: 'infrastructure.brainstorm.intro' as TranslationKey,
    fields: [
      {
        id: 'field-1',
        aspectLabelKey: 'infrastructure.brainstorm.fields.first.label' as TranslationKey,
        aspectPromptKey: 'infrastructure.brainstorm.fields.first.aspectPrompt' as TranslationKey,
        aspectPlaceholderKey: 'infrastructure.brainstorm.fields.first.aspectPlaceholder' as TranslationKey,
        actionLabelKey: 'infrastructure.brainstorm.fields.first.actionLabel' as TranslationKey,
        actionPlaceholderKey: 'infrastructure.brainstorm.fields.first.actionPlaceholder' as TranslationKey
      },
      {
        id: 'field-2',
        aspectLabelKey: 'infrastructure.brainstorm.fields.second.label' as TranslationKey,
        aspectPromptKey: 'infrastructure.brainstorm.fields.second.aspectPrompt' as TranslationKey,
        aspectPlaceholderKey: 'infrastructure.brainstorm.fields.second.aspectPlaceholder' as TranslationKey,
        actionLabelKey: 'infrastructure.brainstorm.fields.second.actionLabel' as TranslationKey,
        actionPlaceholderKey: 'infrastructure.brainstorm.fields.second.actionPlaceholder' as TranslationKey
      },
      {
        id: 'field-3',
        aspectLabelKey: 'infrastructure.brainstorm.fields.third.label' as TranslationKey,
        aspectPromptKey: 'infrastructure.brainstorm.fields.third.aspectPrompt' as TranslationKey,
        aspectPlaceholderKey: 'infrastructure.brainstorm.fields.third.aspectPlaceholder' as TranslationKey,
        actionLabelKey: 'infrastructure.brainstorm.fields.third.actionLabel' as TranslationKey,
        actionPlaceholderKey: 'infrastructure.brainstorm.fields.third.actionPlaceholder' as TranslationKey
      }
    ],
    submitKey: 'infrastructure.brainstorm.submit' as TranslationKey,
    resetKey: 'infrastructure.brainstorm.reset' as TranslationKey,
    emptyErrorKey: 'infrastructure.brainstorm.error.empty' as TranslationKey,
    fallbackAspectKey: 'infrastructure.brainstorm.result.fallbackAspect' as TranslationKey,
    fallbackActionKey: 'infrastructure.brainstorm.result.fallbackAction' as TranslationKey,
    resultTitleKey: 'infrastructure.brainstorm.result.title' as TranslationKey,
    resultDefaultKey: 'infrastructure.brainstorm.result.default' as TranslationKey,
    resultIntroKey: 'infrastructure.brainstorm.result.intro' as TranslationKey,
    resultItemKey: 'infrastructure.brainstorm.result.item' as TranslationKey,
    resultOutroKey: 'infrastructure.brainstorm.result.outro' as TranslationKey,
    resultAdviceKey: 'infrastructure.brainstorm.result.advice' as TranslationKey
  }
};
