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

type WorksheetExample = {
  id: string;
  goalKey: TranslationKey;
  kpiKey: TranslationKey;
  measureKey: TranslationKey;
};

type WorksheetArea = {
  id: string;
  icon: string;
  titleKey: TranslationKey;
  examples: ReadonlyArray<WorksheetExample>;
};

type WorksheetContent = {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  introKey: TranslationKey;
  columns: {
    goalKey: TranslationKey;
    kpiKey: TranslationKey;
    measureKey: TranslationKey;
  };
  areas: ReadonlyArray<WorksheetArea>;
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
  goalKey?: TranslationKey;
  kpiKey?: TranslationKey;
  measureKey?: TranslationKey;
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
    columns: {
      goalKey: 'effectiveness.kpi.column.goal' as TranslationKey,
      kpiKey: 'effectiveness.kpi.column.kpi' as TranslationKey,
      measureKey: 'effectiveness.kpi.column.measure' as TranslationKey
    },
    areas: [
      {
        id: 'community',
        icon: 'community.svg',
        titleKey: 'effectiveness.kpi.areas.community.title' as TranslationKey,
        examples: [
          {
            id: 'community-growth',
            goalKey: 'effectiveness.kpi.areas.community.examples.0.goal' as TranslationKey,
            kpiKey: 'effectiveness.kpi.areas.community.examples.0.kpi' as TranslationKey,
            measureKey: 'effectiveness.kpi.areas.community.examples.0.measure' as TranslationKey
          },
          {
            id: 'community-engagement',
            goalKey: 'effectiveness.kpi.areas.community.examples.1.goal' as TranslationKey,
            kpiKey: 'effectiveness.kpi.areas.community.examples.1.kpi' as TranslationKey,
            measureKey: 'effectiveness.kpi.areas.community.examples.1.measure' as TranslationKey
          },
          {
            id: 'community-volunteers',
            goalKey: 'effectiveness.kpi.areas.community.examples.2.goal' as TranslationKey,
            kpiKey: 'effectiveness.kpi.areas.community.examples.2.kpi' as TranslationKey,
            measureKey: 'effectiveness.kpi.areas.community.examples.2.measure' as TranslationKey
          }
        ]
      },
      {
        id: 'communications',
        icon: 'communication.svg',
        titleKey: 'effectiveness.kpi.areas.communications.title' as TranslationKey,
        examples: [
          {
            id: 'communications-awareness',
            goalKey: 'effectiveness.kpi.areas.communications.examples.0.goal' as TranslationKey,
            kpiKey: 'effectiveness.kpi.areas.communications.examples.0.kpi' as TranslationKey,
            measureKey: 'effectiveness.kpi.areas.communications.examples.0.measure' as TranslationKey
          },
          {
            id: 'communications-meetings',
            goalKey: 'effectiveness.kpi.areas.communications.examples.1.goal' as TranslationKey,
            kpiKey: 'effectiveness.kpi.areas.communications.examples.1.kpi' as TranslationKey,
            measureKey: 'effectiveness.kpi.areas.communications.examples.1.measure' as TranslationKey
          }
        ]
      },
      {
        id: 'infrastructure',
        icon: 'Infrastructure.svg',
        titleKey: 'effectiveness.kpi.areas.infrastructure.title' as TranslationKey,
        examples: [
          {
            id: 'infrastructure-uptime',
            goalKey: 'effectiveness.kpi.areas.infrastructure.examples.0.goal' as TranslationKey,
            kpiKey: 'effectiveness.kpi.areas.infrastructure.examples.0.kpi' as TranslationKey,
            measureKey: 'effectiveness.kpi.areas.infrastructure.examples.0.measure' as TranslationKey
          },
          {
            id: 'infrastructure-crm',
            goalKey: 'effectiveness.kpi.areas.infrastructure.examples.1.goal' as TranslationKey,
            kpiKey: 'effectiveness.kpi.areas.infrastructure.examples.1.kpi' as TranslationKey,
            measureKey: 'effectiveness.kpi.areas.infrastructure.examples.1.measure' as TranslationKey
          }
        ]
      },
      {
        id: 'security',
        icon: 'safety.svg',
        titleKey: 'effectiveness.kpi.areas.security.title' as TranslationKey,
        examples: [
          {
            id: 'security-literacy',
            goalKey: 'effectiveness.kpi.areas.security.examples.0.goal' as TranslationKey,
            kpiKey: 'effectiveness.kpi.areas.security.examples.0.kpi' as TranslationKey,
            measureKey: 'effectiveness.kpi.areas.security.examples.0.measure' as TranslationKey
          },
          {
            id: 'security-backups',
            goalKey: 'effectiveness.kpi.areas.security.examples.1.goal' as TranslationKey,
            kpiKey: 'effectiveness.kpi.areas.security.examples.1.kpi' as TranslationKey,
            measureKey: 'effectiveness.kpi.areas.security.examples.1.measure' as TranslationKey
          }
        ]
      },
      {
        id: 'advocacy',
        icon: 'rights.svg',
        titleKey: 'effectiveness.kpi.areas.advocacy.title' as TranslationKey,
        examples: [
          {
            id: 'advocacy-support',
            goalKey: 'effectiveness.kpi.areas.advocacy.examples.0.goal' as TranslationKey,
            kpiKey: 'effectiveness.kpi.areas.advocacy.examples.0.kpi' as TranslationKey,
            measureKey: 'effectiveness.kpi.areas.advocacy.examples.0.measure' as TranslationKey
          },
          {
            id: 'advocacy-awareness',
            goalKey: 'effectiveness.kpi.areas.advocacy.examples.1.goal' as TranslationKey,
            kpiKey: 'effectiveness.kpi.areas.advocacy.examples.1.kpi' as TranslationKey,
            measureKey: 'effectiveness.kpi.areas.advocacy.examples.1.measure' as TranslationKey
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
