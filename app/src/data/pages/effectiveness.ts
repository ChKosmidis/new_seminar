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

export type SmartIndicator = {
  id: string;
  labelKey: TranslationKey;
};

export type SmartGoal = {
  id: string;
  titleKey: TranslationKey;
  indicators: ReadonlyArray<SmartIndicator>;
};

export type SmartCategory = {
  id: string;
  titleKey: TranslationKey;
  goals: ReadonlyArray<SmartGoal>;
};

type WorksheetContent = {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  introKey: TranslationKey;
  categories: ReadonlyArray<SmartCategory>;
  ui: {
    categoryLabel: TranslationKey;
    goalLabel: TranslationKey;
    indicatorLabel: TranslationKey;
    smartLabel: TranslationKey;
    smart: {
      specific: { label: TranslationKey; placeholder: TranslationKey };
      measurable: { label: TranslationKey; placeholder: TranslationKey };
      achievable: { label: TranslationKey; placeholder: TranslationKey };
      relevant: { label: TranslationKey; placeholder: TranslationKey };
      timebound: { label: TranslationKey; placeholder: TranslationKey };
    };
  };
  ai: {
    buttonKey: TranslationKey;
    loadingKey: TranslationKey;
    placeholderKey: TranslationKey;
    titleKey: TranslationKey;
    missingSelectionKey: TranslationKey;
    missingKeyKey: TranslationKey;
    networkErrorKey: TranslationKey;
    fallbackTemplateKey: TranslationKey;
    promptSystemKey: TranslationKey;
    promptTemplateKey: TranslationKey;
    apiBase: string;
    defaultModel: string;
  };
};

type PdcaStep = {
  id: string;
  icon: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  exampleKey: TranslationKey;
};

type PdcaContent = {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  introKey: TranslationKey;
  steps: ReadonlyArray<PdcaStep>;
};

type BrainstormOption = {
  id: string;
  labelKey: TranslationKey;
};

type BrainstormContent = {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  leadKey: TranslationKey;
  areaLabelKey: TranslationKey;
  areaPlaceholderKey: TranslationKey;
  options: ReadonlyArray<BrainstormOption>;
  kpiLabelKey: TranslationKey;
  kpiPlaceholderKey: TranslationKey;
  rationaleLabelKey: TranslationKey;
  rationalePlaceholderKey: TranslationKey;
  submitKey: TranslationKey;
  resetKey: TranslationKey;
  errorMissingKey: TranslationKey;
  missingKeyKey: TranslationKey;
  networkErrorKey: TranslationKey;
  resultTitleKey: TranslationKey;
  resultPlaceholderKey: TranslationKey;
  resultLoadingKey: TranslationKey;
  fallbackTemplateKey: TranslationKey;
  promptSystemKey: TranslationKey;
  promptTemplateKey: TranslationKey;
  apiBase: string;
  defaultModel: string;
};

type ExportContent = {
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  buttonKey: TranslationKey;
  statusPreparingKey: TranslationKey;
  statusErrorKey: TranslationKey;
  statusSuccessKey: TranslationKey;
  pdf: {
    titleKey: TranslationKey;
    worksheetSectionKey: TranslationKey;
    pdcaSectionKey: TranslationKey;
    brainstormSectionKey: TranslationKey;
    parameterKey: TranslationKey;
    valueKey: TranslationKey;
    aiWorksheetTitleKey: TranslationKey;
    aiBrainstormTitleKey: TranslationKey;
  };
};

export type WorksheetSelection = {
  categoryId?: string;
  goalId?: string;
  indicatorId?: string;
  smart?: {
    s: string;
    m: string;
    a: string;
    r: string;
    t: string;
  };
  aiFeedback?: string;
  aiNotice?: string | null;
};

export type BrainstormResult = {
  areaId: string;
  kpi: string;
  rationale: string;
  feedback?: string;
  notice?: string | null;
};

export type EffectivenessPageContent = {
  hero: HeroContent;
  worksheet: WorksheetContent;
  pdca: PdcaContent;
  brainstorm: BrainstormContent;
  export: ExportContent;
};

export const effectivenessPage: EffectivenessPageContent = {
  hero: {
    badgeKey: 'effectiveness.hero.badge' as TranslationKey,
    titleKey: 'effectiveness.hero.title' as TranslationKey,
    subtitleKey: 'effectiveness.hero.subtitle' as TranslationKey,
    actions: [
      { href: '#worksheet', labelKey: 'effectiveness.hero.primary' as TranslationKey, variant: 'primary' },
      { href: '#export', labelKey: 'effectiveness.hero.secondary' as TranslationKey, variant: 'outline' }
    ],
    quickNav: [
      { href: '#worksheet', labelKey: 'effectiveness.quick.worksheet' as TranslationKey },
      { href: '#pdca', labelKey: 'effectiveness.quick.pdca' as TranslationKey },
      { href: '#brainstorm', labelKey: 'effectiveness.quick.brainstorm' as TranslationKey },
      { href: '#export', labelKey: 'effectiveness.quick.export' as TranslationKey }
    ],
    bullets: [
      {
        icon: '🎯',
        titleKey: 'effectiveness.hero.point1.title' as TranslationKey,
        textKey: 'effectiveness.hero.point1.text' as TranslationKey
      },
      {
        icon: '📈',
        titleKey: 'effectiveness.hero.point2.title' as TranslationKey,
        textKey: 'effectiveness.hero.point2.text' as TranslationKey
      }
    ],
    card: {
      badgeKey: 'effectiveness.hero.card.badge' as TranslationKey,
      titleKey: 'effectiveness.hero.card.title' as TranslationKey,
      textKey: 'effectiveness.hero.card.text' as TranslationKey,
      items: [
        'effectiveness.hero.card.item1' as TranslationKey,
        'effectiveness.hero.card.item2' as TranslationKey,
        'effectiveness.hero.card.item3' as TranslationKey
      ],
      theme: {
        light: {
          background: 'linear-gradient(135deg, rgba(253, 126, 20, 0.12), rgba(255, 193, 7, 0.16))',
          border: 'rgba(253, 126, 20, 0.2)',
          shadow: '0 32px 60px rgba(253, 126, 20, 0.28)'
        },
        dark: {
          background: 'linear-gradient(135deg, rgba(253, 126, 20, 0.22), rgba(255, 193, 7, 0.24))',
          border: 'rgba(255, 193, 7, 0.45)',
          shadow: '0 36px 72px rgba(120, 53, 15, 0.65)'
        }
      }
    }
  },
  worksheet: {
    badgeKey: 'effectiveness.kpi.badge' as TranslationKey,
    titleKey: 'effectiveness.kpi.title' as TranslationKey,
    introKey: 'effectiveness.kpi.intro' as TranslationKey,
    ui: {
      categoryLabel: 'effectiveness.kpi.builder.category' as TranslationKey,
      goalLabel: 'effectiveness.kpi.builder.goal' as TranslationKey,
      indicatorLabel: 'effectiveness.kpi.builder.indicator' as TranslationKey,
      smartLabel: 'effectiveness.kpi.builder.smart' as TranslationKey,
      smart: {
        specific: { label: 'effectiveness.kpi.smart.specific.label' as TranslationKey, placeholder: 'effectiveness.kpi.smart.specific.placeholder' as TranslationKey },
        measurable: { label: 'effectiveness.kpi.smart.measurable.label' as TranslationKey, placeholder: 'effectiveness.kpi.smart.measurable.placeholder' as TranslationKey },
        achievable: { label: 'effectiveness.kpi.smart.achievable.label' as TranslationKey, placeholder: 'effectiveness.kpi.smart.achievable.placeholder' as TranslationKey },
        relevant: { label: 'effectiveness.kpi.smart.relevant.label' as TranslationKey, placeholder: 'effectiveness.kpi.smart.relevant.placeholder' as TranslationKey },
        timebound: { label: 'effectiveness.kpi.smart.timebound.label' as TranslationKey, placeholder: 'effectiveness.kpi.smart.timebound.placeholder' as TranslationKey }
      }
    },
    categories: [
      {
        id: 'fundraising',
        titleKey: 'effectiveness.kpi.categories.fundraising.title' as TranslationKey,
        goals: [
          {
            id: 'grants',
            titleKey: 'effectiveness.kpi.categories.fundraising.goals.grants.title' as TranslationKey,
            indicators: [
              { id: 'win_rate', labelKey: 'effectiveness.kpi.categories.fundraising.goals.grants.kpi.win_rate' as TranslationKey },
              { id: 'volume', labelKey: 'effectiveness.kpi.categories.fundraising.goals.grants.kpi.volume' as TranslationKey }
            ]
          },
          {
            id: 'individual',
            titleKey: 'effectiveness.kpi.categories.fundraising.goals.individual.title' as TranslationKey,
            indicators: [
              { id: 'recurring', labelKey: 'effectiveness.kpi.categories.fundraising.goals.individual.kpi.recurring' as TranslationKey },
              { id: 'avg_donation', labelKey: 'effectiveness.kpi.categories.fundraising.goals.individual.kpi.avg_donation' as TranslationKey }
            ]
          },
          {
            id: 'diversify',
            titleKey: 'effectiveness.kpi.categories.fundraising.goals.diversify.title' as TranslationKey,
            indicators: [
               { id: 'sources_count', labelKey: 'effectiveness.kpi.categories.fundraising.goals.diversify.kpi.sources' as TranslationKey },
               { id: 'resilience', labelKey: 'effectiveness.kpi.categories.fundraising.goals.diversify.kpi.resilience' as TranslationKey }
            ]
          }
        ]
      },
      {
        id: 'communications',
        titleKey: 'effectiveness.kpi.categories.communications.title' as TranslationKey,
        goals: [
          {
            id: 'social',
            titleKey: 'effectiveness.kpi.categories.communications.goals.social.title' as TranslationKey,
            indicators: [
              { id: 'engagement', labelKey: 'effectiveness.kpi.categories.communications.goals.social.kpi.engagement' as TranslationKey },
              { id: 'reach', labelKey: 'effectiveness.kpi.categories.communications.goals.social.kpi.reach' as TranslationKey }
            ]
          },
          {
            id: 'pr',
            titleKey: 'effectiveness.kpi.categories.communications.goals.pr.title' as TranslationKey,
            indicators: [
              { id: 'mentions', labelKey: 'effectiveness.kpi.categories.communications.goals.pr.kpi.mentions' as TranslationKey },
              { id: 'sentiment', labelKey: 'effectiveness.kpi.categories.communications.goals.pr.kpi.sentiment' as TranslationKey }
            ]
          }
        ]
      },
      {
        id: 'team',
        titleKey: 'effectiveness.kpi.categories.team.title' as TranslationKey,
        goals: [
          {
            id: 'retention',
            titleKey: 'effectiveness.kpi.categories.team.goals.retention.title' as TranslationKey,
            indicators: [
              { id: 'turnover', labelKey: 'effectiveness.kpi.categories.team.goals.retention.kpi.turnover' as TranslationKey },
              { id: 'satisfaction', labelKey: 'effectiveness.kpi.categories.team.goals.retention.kpi.satisfaction' as TranslationKey }
            ]
          }
        ]
      },
      {
        id: 'community',
        titleKey: 'effectiveness.kpi.categories.community.title' as TranslationKey,
        goals: [
          {
            id: 'engagement',
            titleKey: 'effectiveness.kpi.categories.community.goals.engagement.title' as TranslationKey,
            indicators: [
              { id: 'active_members', labelKey: 'effectiveness.kpi.categories.community.goals.engagement.kpi.active' as TranslationKey },
              { id: 'trust', labelKey: 'effectiveness.kpi.categories.community.goals.engagement.kpi.trust' as TranslationKey },
              { id: 'volunteer_hours', labelKey: 'effectiveness.kpi.categories.community.goals.engagement.kpi.hours' as TranslationKey }
            ]
          }
        ]
      },
      {
        id: 'operations',
        titleKey: 'effectiveness.kpi.categories.operations.title' as TranslationKey,
        goals: [
           {
             id: 'efficiency',
             titleKey: 'effectiveness.kpi.categories.operations.goals.efficiency.title' as TranslationKey,
             indicators: [
               { id: 'admin_cost', labelKey: 'effectiveness.kpi.categories.operations.goals.efficiency.kpi.admin' as TranslationKey },
               { id: 'automation', labelKey: 'effectiveness.kpi.categories.operations.goals.efficiency.kpi.automation' as TranslationKey }
             ]
           }
        ]
      },
      {
        id: 'advocacy',
        titleKey: 'effectiveness.kpi.categories.advocacy.title' as TranslationKey,
        goals: [
          {
            id: 'policy',
            titleKey: 'effectiveness.kpi.categories.advocacy.goals.policy.title' as TranslationKey,
            indicators: [
              { id: 'impact_score', labelKey: 'effectiveness.kpi.categories.advocacy.goals.policy.kpi.impact' as TranslationKey },
              { id: 'stakeholder_feedback', labelKey: 'effectiveness.kpi.categories.advocacy.goals.policy.kpi.feedback' as TranslationKey }
            ]
          },
          {
            id: 'awareness',
            titleKey: 'effectiveness.kpi.categories.advocacy.goals.awareness.title' as TranslationKey,
            indicators: [
              { id: 'petition_signatures', labelKey: 'effectiveness.kpi.categories.advocacy.goals.awareness.kpi.signatures' as TranslationKey }
            ]
          }
        ]
      }
    ],
    ai: {
      buttonKey: 'effectiveness.kpi.ai.button' as TranslationKey,
      loadingKey: 'effectiveness.kpi.ai.loading' as TranslationKey,
      placeholderKey: 'effectiveness.kpi.ai.placeholder' as TranslationKey,
      titleKey: 'effectiveness.kpi.ai.title' as TranslationKey,
      missingSelectionKey: 'effectiveness.kpi.ai.missingSelection' as TranslationKey,
      missingKeyKey: 'effectiveness.kpi.ai.missingKey' as TranslationKey,
      networkErrorKey: 'effectiveness.kpi.ai.networkError' as TranslationKey,
      fallbackTemplateKey: 'effectiveness.kpi.ai.fallback' as TranslationKey,
      promptSystemKey: 'effectiveness.kpi.ai.prompt.system' as TranslationKey,
      promptTemplateKey: 'effectiveness.kpi.ai.prompt.template' as TranslationKey,
      apiBase: 'https://generativelanguage.googleapis.com/v1beta/models/',
      defaultModel: 'gemma-3n-e4b-it'
    }
  },
  pdca: {
    badgeKey: 'effectiveness.pdca.badge' as TranslationKey,
    titleKey: 'effectiveness.pdca.title' as TranslationKey,
    introKey: 'effectiveness.pdca.intro' as TranslationKey,
    steps: [
      {
        id: 'plan',
        icon: 'introngo.svg',
        titleKey: 'effectiveness.pdca.plan.title' as TranslationKey,
        descriptionKey: 'effectiveness.pdca.plan.description' as TranslationKey,
        exampleKey: 'effectiveness.pdca.plan.example' as TranslationKey
      },
      {
        id: 'do',
        icon: 'low_budget.svg',
        titleKey: 'effectiveness.pdca.do.title' as TranslationKey,
        descriptionKey: 'effectiveness.pdca.do.description' as TranslationKey,
        exampleKey: 'effectiveness.pdca.do.example' as TranslationKey
      },
      {
        id: 'check',
        icon: 'efficiency.svg',
        titleKey: 'effectiveness.pdca.check.title' as TranslationKey,
        descriptionKey: 'effectiveness.pdca.check.description' as TranslationKey,
        exampleKey: 'effectiveness.pdca.check.example' as TranslationKey
      },
      {
        id: 'act',
        icon: 'community.svg',
        titleKey: 'effectiveness.pdca.act.title' as TranslationKey,
        descriptionKey: 'effectiveness.pdca.act.description' as TranslationKey,
        exampleKey: 'effectiveness.pdca.act.example' as TranslationKey
      }
    ]
  },
  brainstorm: {
    badgeKey: 'effectiveness.brainstorm.badge' as TranslationKey,
    titleKey: 'effectiveness.brainstorm.title' as TranslationKey,
    leadKey: 'effectiveness.brainstorm.lead' as TranslationKey,
    areaLabelKey: 'effectiveness.brainstorm.area.label' as TranslationKey,
    areaPlaceholderKey: 'effectiveness.brainstorm.area.placeholder' as TranslationKey,
    options: [
      { id: 'community', labelKey: 'effectiveness.brainstorm.options.community' as TranslationKey },
      { id: 'communications', labelKey: 'effectiveness.brainstorm.options.communications' as TranslationKey },
      { id: 'infrastructure', labelKey: 'effectiveness.brainstorm.options.infrastructure' as TranslationKey },
      { id: 'security', labelKey: 'effectiveness.brainstorm.options.security' as TranslationKey },
      { id: 'advocacy', labelKey: 'effectiveness.brainstorm.options.advocacy' as TranslationKey }
    ],
    kpiLabelKey: 'effectiveness.brainstorm.kpi.label' as TranslationKey,
    kpiPlaceholderKey: 'effectiveness.brainstorm.kpi.placeholder' as TranslationKey,
    rationaleLabelKey: 'effectiveness.brainstorm.rationale.label' as TranslationKey,
    rationalePlaceholderKey: 'effectiveness.brainstorm.rationale.placeholder' as TranslationKey,
    submitKey: 'effectiveness.brainstorm.submit' as TranslationKey,
    resetKey: 'effectiveness.brainstorm.reset' as TranslationKey,
    errorMissingKey: 'effectiveness.brainstorm.error.missing' as TranslationKey,
    missingKeyKey: 'effectiveness.brainstorm.notice.missingKey' as TranslationKey,
    networkErrorKey: 'effectiveness.brainstorm.notice.network' as TranslationKey,
    resultTitleKey: 'effectiveness.brainstorm.result.title' as TranslationKey,
    resultPlaceholderKey: 'effectiveness.brainstorm.result.placeholder' as TranslationKey,
    resultLoadingKey: 'effectiveness.brainstorm.result.loading' as TranslationKey,
    fallbackTemplateKey: 'effectiveness.brainstorm.result.fallback' as TranslationKey,
    promptSystemKey: 'effectiveness.brainstorm.prompt.system' as TranslationKey,
    promptTemplateKey: 'effectiveness.brainstorm.prompt.template' as TranslationKey,
    apiBase: 'https://generativelanguage.googleapis.com/v1beta/models/',
    defaultModel: 'gemma-3n-e4b-it'
  },
  export: {
    titleKey: 'effectiveness.export.title' as TranslationKey,
    descriptionKey: 'effectiveness.export.description' as TranslationKey,
    buttonKey: 'effectiveness.export.button' as TranslationKey,
    statusPreparingKey: 'effectiveness.export.status.preparing' as TranslationKey,
    statusErrorKey: 'effectiveness.export.status.error' as TranslationKey,
    statusSuccessKey: 'effectiveness.export.status.success' as TranslationKey,
    pdf: {
      titleKey: 'effectiveness.pdf.title' as TranslationKey,
      worksheetSectionKey: 'effectiveness.pdf.section.worksheet' as TranslationKey,
      pdcaSectionKey: 'effectiveness.pdf.section.pdca' as TranslationKey,
      brainstormSectionKey: 'effectiveness.pdf.section.brainstorm' as TranslationKey,
      parameterKey: 'effectiveness.pdf.table.parameter' as TranslationKey,
      valueKey: 'effectiveness.pdf.table.value' as TranslationKey,
      aiWorksheetTitleKey: 'effectiveness.pdf.ai.worksheet' as TranslationKey,
      aiBrainstormTitleKey: 'effectiveness.pdf.ai.brainstorm' as TranslationKey
    }
  }
};
