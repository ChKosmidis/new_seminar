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

type AdvisorMethod = {
  value: string;
  labelKey: TranslationKey;
  promptKey: TranslationKey;
};

type AdvisorContent = {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  leadKey: TranslationKey;
  helperKey: TranslationKey;
  form: {
    ideaLabelKey: TranslationKey;
    ideaPlaceholderKey: TranslationKey;
    teamLabelKey: TranslationKey;
    teamPlaceholderKey: TranslationKey;
    methodLabelKey: TranslationKey;
    methodPlaceholderKey: TranslationKey;
    amountLabelKey: TranslationKey;
    amountPlaceholderKey: TranslationKey;
    submitKey: TranslationKey;
    resetKey: TranslationKey;
    methods: ReadonlyArray<AdvisorMethod>;
  };
  defaults: {
    teamKey: TranslationKey;
    amountKey: TranslationKey;
  };
  messages: {
    missingFieldsKey: TranslationKey;
    missingKeyKey: TranslationKey;
    networkErrorKey: TranslationKey;
    fallbackNoticeKey: TranslationKey;
  };
  prompt: {
    systemKey: TranslationKey;
    templateKey: TranslationKey;
    toneKey: TranslationKey;
    apiBase: string;
    defaultModel: string;
  };
  result: {
    titleKey: TranslationKey;
    placeholderKey: TranslationKey;
    loadingKey: TranslationKey;
    fallbackTemplateKey: TranslationKey;
    teamFormatKey: TranslationKey;
    amountFormatKey: TranslationKey;
  };
};

type StrategyBlock = {
  id: string;
  icon: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  items: ReadonlyArray<TranslationKey>;
};

type StrategiesContent = {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  introKey: TranslationKey;
  blocks: ReadonlyArray<StrategyBlock>;
};

type ContextTab = {
  id: string;
  labelKey: TranslationKey;
  titleKey: TranslationKey;
  items: ReadonlyArray<TranslationKey>;
};

type ContextsContent = {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  tabs: ReadonlyArray<ContextTab>;
};

type ResourceCategory = {
  id: string;
  icon: string;
  titleKey: TranslationKey;
  items: ReadonlyArray<TranslationKey>;
};

type ResourcesContent = {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  categories: ReadonlyArray<ResourceCategory>;
};

export type FundraisingPageContent = {
  hero: HeroContent;
  advisor: AdvisorContent;
  strategies: StrategiesContent;
  contexts: ContextsContent;
  resources: ResourcesContent;
};

const iconPath = (fileName: string) => new URL(`../../assets/icons/${fileName}`, import.meta.url).href;

export const fundraisingPage: FundraisingPageContent = {
  hero: {
    badgeKey: 'fundraising.hero.badge' as TranslationKey,
    titleKey: 'fundraising.hero.title' as TranslationKey,
    subtitleKey: 'fundraising.hero.subtitle' as TranslationKey,
    actions: [
      { href: '#ai-advisor', labelKey: 'fundraising.hero.primary' as TranslationKey, variant: 'primary' },
      { href: '#resources', labelKey: 'fundraising.hero.secondary' as TranslationKey, variant: 'outline' }
    ] satisfies ReadonlyArray<HeroAction>,
    quickNav: [
      { href: '#ai-advisor', labelKey: 'fundraising.quick.ai' as TranslationKey },
      { href: '#strategies', labelKey: 'fundraising.quick.strategies' as TranslationKey },
      { href: '#contexts', labelKey: 'fundraising.quick.contexts' as TranslationKey },
      { href: '#resources', labelKey: 'fundraising.quick.resources' as TranslationKey }
    ],
    bullets: [
      {
        icon: '🤖',
        titleKey: 'fundraising.hero.point1.title' as TranslationKey,
        textKey: 'fundraising.hero.point1.text' as TranslationKey
      },
      {
        icon: '🤝',
        titleKey: 'fundraising.hero.point2.title' as TranslationKey,
        textKey: 'fundraising.hero.point2.text' as TranslationKey
      }
    ],
    card: {
      badgeKey: 'fundraising.hero.card.badge' as TranslationKey,
      titleKey: 'fundraising.hero.card.title' as TranslationKey,
      textKey: 'fundraising.hero.card.text' as TranslationKey,
      items: [
        'fundraising.hero.card.item1' as TranslationKey,
        'fundraising.hero.card.item2' as TranslationKey,
        'fundraising.hero.card.item3' as TranslationKey
      ],
      theme: {
        light: {
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.12), rgba(16, 185, 129, 0.14))',
          border: 'rgba(16, 185, 129, 0.24)',
          shadow: '0 28px 56px rgba(16, 185, 129, 0.22)'
        },
        dark: {
          background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.3), rgba(5, 122, 85, 0.32))',
          border: 'rgba(74, 222, 128, 0.38)',
          shadow: '0 36px 72px rgba(4, 47, 46, 0.7)'
        }
      }
    }
  },
  advisor: {
    badgeKey: 'fundraising.ai.badge' as TranslationKey,
    titleKey: 'fundraising.ai.title' as TranslationKey,
    leadKey: 'fundraising.ai.lead' as TranslationKey,
    helperKey: 'fundraising.ai.helper' as TranslationKey,
    form: {
      ideaLabelKey: 'fundraising.ai.idea.label' as TranslationKey,
      ideaPlaceholderKey: 'fundraising.ai.idea.placeholder' as TranslationKey,
      teamLabelKey: 'fundraising.ai.team.label' as TranslationKey,
      teamPlaceholderKey: 'fundraising.ai.team.placeholder' as TranslationKey,
      methodLabelKey: 'fundraising.ai.method.label' as TranslationKey,
      methodPlaceholderKey: 'fundraising.ai.method.placeholder' as TranslationKey,
      amountLabelKey: 'fundraising.ai.amount.label' as TranslationKey,
      amountPlaceholderKey: 'fundraising.ai.amount.placeholder' as TranslationKey,
      submitKey: 'fundraising.ai.submit' as TranslationKey,
      resetKey: 'fundraising.ai.reset' as TranslationKey,
      methods: [
        { value: 'grants_international', labelKey: 'fundraising.ai.methods.grants_international.label' as TranslationKey, promptKey: 'fundraising.ai.methods.grants_international.prompt' as TranslationKey },
        { value: 'grants_local', labelKey: 'fundraising.ai.methods.grants_local.label' as TranslationKey, promptKey: 'fundraising.ai.methods.grants_local.prompt' as TranslationKey },
        { value: 'corporate_international', labelKey: 'fundraising.ai.methods.corporate_international.label' as TranslationKey, promptKey: 'fundraising.ai.methods.corporate_international.prompt' as TranslationKey },
        { value: 'corporate_local', labelKey: 'fundraising.ai.methods.corporate_local.label' as TranslationKey, promptKey: 'fundraising.ai.methods.corporate_local.prompt' as TranslationKey },
        { value: 'crowdfunding_global', labelKey: 'fundraising.ai.methods.crowdfunding_global.label' as TranslationKey, promptKey: 'fundraising.ai.methods.crowdfunding_global.prompt' as TranslationKey },
        { value: 'crowdfunding_local', labelKey: 'fundraising.ai.methods.crowdfunding_local.label' as TranslationKey, promptKey: 'fundraising.ai.methods.crowdfunding_local.prompt' as TranslationKey },
        { value: 'diaspora_donations', labelKey: 'fundraising.ai.methods.diaspora_donations.label' as TranslationKey, promptKey: 'fundraising.ai.methods.diaspora_donations.prompt' as TranslationKey },
        { value: 'individual_donations_global', labelKey: 'fundraising.ai.methods.individual_donations_global.label' as TranslationKey, promptKey: 'fundraising.ai.methods.individual_donations_global.prompt' as TranslationKey },
        { value: 'individual_donations_local', labelKey: 'fundraising.ai.methods.individual_donations_local.label' as TranslationKey, promptKey: 'fundraising.ai.methods.individual_donations_local.prompt' as TranslationKey },
        { value: 'major_donors', labelKey: 'fundraising.ai.methods.major_donors.label' as TranslationKey, promptKey: 'fundraising.ai.methods.major_donors.prompt' as TranslationKey },
        { value: 'events', labelKey: 'fundraising.ai.methods.events.label' as TranslationKey, promptKey: 'fundraising.ai.methods.events.prompt' as TranslationKey },
        { value: 'social_entrepreneurship', labelKey: 'fundraising.ai.methods.social_entrepreneurship.label' as TranslationKey, promptKey: 'fundraising.ai.methods.social_entrepreneurship.prompt' as TranslationKey },
        { value: 'other', labelKey: 'fundraising.ai.methods.other.label' as TranslationKey, promptKey: 'fundraising.ai.methods.other.prompt' as TranslationKey }
      ]
    },
    defaults: {
      teamKey: 'fundraising.ai.defaults.team' as TranslationKey,
      amountKey: 'fundraising.ai.defaults.amount' as TranslationKey
    },
    messages: {
      missingFieldsKey: 'fundraising.ai.error.missingFields' as TranslationKey,
      missingKeyKey: 'fundraising.ai.error.missingKey' as TranslationKey,
      networkErrorKey: 'fundraising.ai.error.network' as TranslationKey,
      fallbackNoticeKey: 'fundraising.ai.notice.fallback' as TranslationKey
    },
    prompt: {
      systemKey: 'fundraising.ai.prompt.system' as TranslationKey,
      templateKey: 'fundraising.ai.prompt.template' as TranslationKey,
      toneKey: 'fundraising.ai.prompt.tone' as TranslationKey,
      apiBase: 'https://generativelanguage.googleapis.com/v1beta/models/',
      defaultModel: 'gemma-3n-e4b-it'
    },
    result: {
      titleKey: 'fundraising.ai.result.title' as TranslationKey,
      placeholderKey: 'fundraising.ai.result.placeholder' as TranslationKey,
      loadingKey: 'fundraising.ai.result.loading' as TranslationKey,
      fallbackTemplateKey: 'fundraising.ai.fallback' as TranslationKey,
      teamFormatKey: 'fundraising.ai.team.formatted' as TranslationKey,
      amountFormatKey: 'fundraising.ai.amount.formatted' as TranslationKey
    }
  },
  strategies: {
    badgeKey: 'fundraising.strategies.badge' as TranslationKey,
    titleKey: 'fundraising.strategies.title' as TranslationKey,
    introKey: 'fundraising.strategies.intro' as TranslationKey,
    blocks: [
      {
        id: 'diversification',
        icon: iconPath('fundraising.svg'),
        titleKey: 'fundraising.strategies.diversification.title' as TranslationKey,
        descriptionKey: 'fundraising.strategies.diversification.description' as TranslationKey,
        items: [
          'fundraising.strategies.diversification.point1' as TranslationKey,
          'fundraising.strategies.diversification.point2' as TranslationKey
        ]
      },
      {
        id: 'grants',
        icon: iconPath('paid.svg'),
        titleKey: 'fundraising.strategies.grants.title' as TranslationKey,
        descriptionKey: 'fundraising.strategies.grants.description' as TranslationKey,
        items: [
          'fundraising.strategies.grants.point1' as TranslationKey,
          'fundraising.strategies.grants.point2' as TranslationKey,
          'fundraising.strategies.grants.point3' as TranslationKey
        ]
      },
      {
        id: 'crowdfunding',
        icon: iconPath('campaign.svg'),
        titleKey: 'fundraising.strategies.crowdfunding.title' as TranslationKey,
        descriptionKey: 'fundraising.strategies.crowdfunding.description' as TranslationKey,
        items: [
          'fundraising.strategies.crowdfunding.point1' as TranslationKey,
          'fundraising.strategies.crowdfunding.point2' as TranslationKey
        ]
      },
      {
        id: 'donations',
        icon: iconPath('volunteer_activism.svg'),
        titleKey: 'fundraising.strategies.donations.title' as TranslationKey,
        descriptionKey: 'fundraising.strategies.donations.description' as TranslationKey,
        items: [
          'fundraising.strategies.donations.point1' as TranslationKey,
          'fundraising.strategies.donations.point2' as TranslationKey,
          'fundraising.strategies.donations.point3' as TranslationKey
        ]
      }
    ]
  },
  contexts: {
    badgeKey: 'fundraising.contexts.badge' as TranslationKey,
    titleKey: 'fundraising.contexts.title' as TranslationKey,
    tabs: [
      {
        id: 'russia',
        labelKey: 'fundraising.contexts.russia.label' as TranslationKey,
        titleKey: 'fundraising.contexts.russia.title' as TranslationKey,
        items: [
          'fundraising.contexts.russia.item1' as TranslationKey,
          'fundraising.contexts.russia.item2' as TranslationKey,
          'fundraising.contexts.russia.item3' as TranslationKey,
          'fundraising.contexts.russia.item4' as TranslationKey,
          'fundraising.contexts.russia.item5' as TranslationKey,
          'fundraising.contexts.russia.item6' as TranslationKey
        ]
      },
      {
        id: 'exile',
        labelKey: 'fundraising.contexts.exile.label' as TranslationKey,
        titleKey: 'fundraising.contexts.exile.title' as TranslationKey,
        items: [
          'fundraising.contexts.exile.item1' as TranslationKey,
          'fundraising.contexts.exile.item2' as TranslationKey,
          'fundraising.contexts.exile.item3' as TranslationKey,
          'fundraising.contexts.exile.item4' as TranslationKey,
          'fundraising.contexts.exile.item5' as TranslationKey,
          'fundraising.contexts.exile.item6' as TranslationKey,
          'fundraising.contexts.exile.item7' as TranslationKey
        ]
      }
    ]
  },
  resources: {
    badgeKey: 'fundraising.resources.badge' as TranslationKey,
    titleKey: 'fundraising.resources.title' as TranslationKey,
    categories: [
      {
        id: 'grants',
        icon: iconPath('paid.svg'),
        titleKey: 'fundraising.resources.grants.title' as TranslationKey,
        items: [
          'fundraising.resources.grants.item1' as TranslationKey,
          'fundraising.resources.grants.item2' as TranslationKey,
          'fundraising.resources.grants.item3' as TranslationKey,
          'fundraising.resources.grants.item4' as TranslationKey,
          'fundraising.resources.grants.item5' as TranslationKey
        ]
      },
      {
        id: 'crowdfunding',
        icon: iconPath('campaign.svg'),
        titleKey: 'fundraising.resources.crowdfunding.title' as TranslationKey,
        items: [
          'fundraising.resources.crowdfunding.item1' as TranslationKey,
          'fundraising.resources.crowdfunding.item2' as TranslationKey,
          'fundraising.resources.crowdfunding.item3' as TranslationKey,
          'fundraising.resources.crowdfunding.item4' as TranslationKey,
          'fundraising.resources.crowdfunding.item5' as TranslationKey
        ]
      },
      {
        id: 'tools',
        icon: iconPath('Infrastructure.svg'),
        titleKey: 'fundraising.resources.tools.title' as TranslationKey,
        items: [
          'fundraising.resources.tools.item1' as TranslationKey,
          'fundraising.resources.tools.item2' as TranslationKey,
          'fundraising.resources.tools.item3' as TranslationKey
        ]
      },
      {
        id: 'support',
        icon: iconPath('cases.svg'),
        titleKey: 'fundraising.resources.support.title' as TranslationKey,
        items: [
          'fundraising.resources.support.item1' as TranslationKey,
          'fundraising.resources.support.item2' as TranslationKey,
          'fundraising.resources.support.item3' as TranslationKey,
          'fundraising.resources.support.item4' as TranslationKey
        ]
      }
    ]
  }
};
