import type { TranslationKey } from '../i18n/types';

type CommunityBenefit = {
  id: string;
  titleKey: TranslationKey;
  summaryKey: TranslationKey;
  detailKey: TranslationKey;
  icon: string;
};

type CommunityLadderStep = {
  id: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  actionsKey: TranslationKey;
  icon: string;
};

type CommunityStory = {
  id: string;
  icon: string;
  iconAltKey: TranslationKey;
  titleKey: TranslationKey;
  textKey: TranslationKey;
  exampleKey: TranslationKey;
};

type CommunityTool = {
  id: string;
  labelKey: TranslationKey;
  descriptionKey: TranslationKey;
  detailsKey: TranslationKey;
};

type ToolSuggestion = {
  id: string;
  keywords: readonly string[];
  adviceKey: TranslationKey;
};

type CommunityCase = {
  id: string;
  titleKey: TranslationKey;
  countryKey: TranslationKey;
  tags: readonly TranslationKey[];
  summaryKey: TranslationKey;
  highlightsKey: TranslationKey;
  link?: {
    href: string;
    labelKey: TranslationKey;
  };
  noteKey?: TranslationKey;
};

export const communityPage = {
  hero: {
    badgeKey: 'community.hero.badge' as TranslationKey,
    titleKey: 'community.hero.title' as TranslationKey,
    subtitleKey: 'community.hero.subtitle' as TranslationKey,
    actions: [
      { href: '#benefits', labelKey: 'community.hero.primary' as TranslationKey, variant: 'primary' as const },
      { href: '#tools', labelKey: 'community.hero.secondary' as TranslationKey, variant: 'outline' as const }
    ],
    quickNav: [
      { href: '#benefits', labelKey: 'community.quick.benefits' as TranslationKey },
      { href: '#ladder', labelKey: 'community.quick.ladder' as TranslationKey },
      { href: '#stories', labelKey: 'community.quick.stories' as TranslationKey },
      { href: '#tools', labelKey: 'community.quick.tools' as TranslationKey },
      { href: '#cases', labelKey: 'community.quick.cases' as TranslationKey }
    ],
    bullets: [
      {
        icon: '🧩',
        titleKey: 'community.hero.point1.title' as TranslationKey,
        textKey: 'community.hero.point1.text' as TranslationKey
      },
      {
        icon: '🤝',
        titleKey: 'community.hero.point2.title' as TranslationKey,
        textKey: 'community.hero.point2.text' as TranslationKey
      }
    ],
    card: {
      badgeKey: 'community.hero.card.badge' as TranslationKey,
      titleKey: 'community.hero.card.title' as TranslationKey,
      textKey: 'community.hero.card.text' as TranslationKey,
      items: [
        'community.hero.card.item1' as TranslationKey,
        'community.hero.card.item2' as TranslationKey,
        'community.hero.card.item3' as TranslationKey
      ],
      theme: {
        light: {
          background: '#ffffff',
          border: 'rgba(15, 23, 42, 0.08)',
          shadow: 'var(--shadow-soft-light)'
        },
        dark: {
          background: 'rgba(15, 23, 42, 0.9)',
          border: 'rgba(129, 140, 248, 0.28)',
          shadow: '0 34px 60px rgba(2, 6, 23, 0.65)'
        }
      }
    }
  },
  benefits: {
    badgeKey: 'community.benefits.badge' as TranslationKey,
    titleKey: 'community.benefits.title' as TranslationKey,
    introKey: 'community.benefits.intro' as TranslationKey,
    panelTitleKey: 'community.benefits.panel.title' as TranslationKey,
    panelEmptyKey: 'community.benefits.panel.empty' as TranslationKey,
    items: [
      {
        id: 'support',
        titleKey: 'community.benefits.items.support.title' as TranslationKey,
        summaryKey: 'community.benefits.items.support.summary' as TranslationKey,
        detailKey: 'community.benefits.items.support.detail' as TranslationKey,
        icon: 'interactivity.svg'
      },
      {
        id: 'trust',
        titleKey: 'community.benefits.items.trust.title' as TranslationKey,
        summaryKey: 'community.benefits.items.trust.summary' as TranslationKey,
        detailKey: 'community.benefits.items.trust.detail' as TranslationKey,
        icon: 'community.svg'
      },
      {
        id: 'coCreation',
        titleKey: 'community.benefits.items.coCreation.title' as TranslationKey,
        summaryKey: 'community.benefits.items.coCreation.summary' as TranslationKey,
        detailKey: 'community.benefits.items.coCreation.detail' as TranslationKey,
        icon: 'practical.svg'
      }
    ] as const satisfies ReadonlyArray<CommunityBenefit>
  },
  ladder: {
    badgeKey: 'community.ladder.badge' as TranslationKey,
    titleKey: 'community.ladder.title' as TranslationKey,
    introKey: 'community.ladder.intro' as TranslationKey,
    highlightKey: 'community.ladder.highlight' as TranslationKey,
    panelTitleKey: 'community.ladder.panel.title' as TranslationKey,
    panelEmptyKey: 'community.ladder.panel.empty' as TranslationKey,
    steps: [
      {
        id: 'awareness',
        titleKey: 'community.ladder.steps.awareness.title' as TranslationKey,
        descriptionKey: 'community.ladder.steps.awareness.description' as TranslationKey,
        actionsKey: 'community.ladder.steps.awareness.actions' as TranslationKey,
        icon: 'visibility.svg'
      },
      {
        id: 'micro',
        titleKey: 'community.ladder.steps.micro.title' as TranslationKey,
        descriptionKey: 'community.ladder.steps.micro.description' as TranslationKey,
        actionsKey: 'community.ladder.steps.micro.actions' as TranslationKey,
        icon: 'thumb_up.svg'
      },
      {
        id: 'online',
        titleKey: 'community.ladder.steps.online.title' as TranslationKey,
        descriptionKey: 'community.ladder.steps.online.description' as TranslationKey,
        actionsKey: 'community.ladder.steps.online.actions' as TranslationKey,
        icon: 'campaign.svg'
      },
      {
        id: 'volunteer',
        titleKey: 'community.ladder.steps.volunteer.title' as TranslationKey,
        descriptionKey: 'community.ladder.steps.volunteer.description' as TranslationKey,
        actionsKey: 'community.ladder.steps.volunteer.actions' as TranslationKey,
        icon: 'volunteer_activism.svg'
      },
      {
        id: 'donor',
        titleKey: 'community.ladder.steps.donor.title' as TranslationKey,
        descriptionKey: 'community.ladder.steps.donor.description' as TranslationKey,
        actionsKey: 'community.ladder.steps.donor.actions' as TranslationKey,
        icon: 'paid.svg'
      },
      {
        id: 'coreVolunteer',
        titleKey: 'community.ladder.steps.coreVolunteer.title' as TranslationKey,
        descriptionKey: 'community.ladder.steps.coreVolunteer.description' as TranslationKey,
        actionsKey: 'community.ladder.steps.coreVolunteer.actions' as TranslationKey,
        icon: 'groups.svg'
      },
      {
        id: 'sustainedDonor',
        titleKey: 'community.ladder.steps.sustainedDonor.title' as TranslationKey,
        descriptionKey: 'community.ladder.steps.sustainedDonor.description' as TranslationKey,
        actionsKey: 'community.ladder.steps.sustainedDonor.actions' as TranslationKey,
        icon: 'monetization_on.svg'
      },
      {
        id: 'ambassador',
        titleKey: 'community.ladder.steps.ambassador.title' as TranslationKey,
        descriptionKey: 'community.ladder.steps.ambassador.description' as TranslationKey,
        actionsKey: 'community.ladder.steps.ambassador.actions' as TranslationKey,
        icon: 'record_voice_over.svg'
      }
    ] as const satisfies ReadonlyArray<CommunityLadderStep>
  },
  stories: {
    badgeKey: 'community.stories.badge' as TranslationKey,
    titleKey: 'community.stories.title' as TranslationKey,
    introKey: 'community.stories.intro' as TranslationKey,
    outroKey: 'community.stories.outro' as TranslationKey,
    items: [
      {
        id: 'beneficiaries',
        icon: 'rights.svg',
        iconAltKey: 'community.stories.items.beneficiaries.iconAlt' as TranslationKey,
        titleKey: 'community.stories.items.beneficiaries.title' as TranslationKey,
        textKey: 'community.stories.items.beneficiaries.text' as TranslationKey,
        exampleKey: 'community.stories.items.beneficiaries.example' as TranslationKey
      },
      {
        id: 'impact',
        icon: 'efficiency.svg',
        iconAltKey: 'community.stories.items.impact.iconAlt' as TranslationKey,
        titleKey: 'community.stories.items.impact.title' as TranslationKey,
        textKey: 'community.stories.items.impact.text' as TranslationKey,
        exampleKey: 'community.stories.items.impact.example' as TranslationKey
      },
      {
        id: 'volunteers',
        icon: 'community.svg',
        iconAltKey: 'community.stories.items.volunteers.iconAlt' as TranslationKey,
        titleKey: 'community.stories.items.volunteers.title' as TranslationKey,
        textKey: 'community.stories.items.volunteers.text' as TranslationKey,
        exampleKey: 'community.stories.items.volunteers.example' as TranslationKey
      },
      {
        id: 'organisation',
        icon: 'introngo.svg',
        iconAltKey: 'community.stories.items.organisation.iconAlt' as TranslationKey,
        titleKey: 'community.stories.items.organisation.title' as TranslationKey,
        textKey: 'community.stories.items.organisation.text' as TranslationKey,
        exampleKey: 'community.stories.items.organisation.example' as TranslationKey
      }
    ] as const satisfies ReadonlyArray<CommunityStory>
  },
  tools: {
    badgeKey: 'community.tools.badge' as TranslationKey,
    titleKey: 'community.tools.title' as TranslationKey,
    introKey: 'community.tools.intro' as TranslationKey,
    panelTitleKey: 'community.tools.panel.title' as TranslationKey,
    panelEmptyKey: 'community.tools.panel.empty' as TranslationKey,
    formTitleKey: 'community.tools.form.title' as TranslationKey,
    formToolLabelKey: 'community.tools.form.toolLabel' as TranslationKey,
    formToolPlaceholderKey: 'community.tools.form.toolPlaceholder' as TranslationKey,
    formPurposeLabelKey: 'community.tools.form.purposeLabel' as TranslationKey,
    formPurposePlaceholderKey: 'community.tools.form.purposePlaceholder' as TranslationKey,
    formSubmitKey: 'community.tools.form.submit' as TranslationKey,
    formErrorKey: 'community.tools.form.error' as TranslationKey,
    responseTitleKey: 'community.tools.response.title' as TranslationKey,
    responseDefaultKey: 'community.tools.response.default' as TranslationKey,
    responseTemplateKey: 'community.tools.response.template' as TranslationKey,
    responseFallbackKey: 'community.tools.response.fallback' as TranslationKey,
    items: [
      {
        id: 'social',
        labelKey: 'community.tools.items.social.label' as TranslationKey,
        descriptionKey: 'community.tools.items.social.description' as TranslationKey,
        detailsKey: 'community.tools.items.social.details' as TranslationKey
      },
      {
        id: 'email',
        labelKey: 'community.tools.items.email.label' as TranslationKey,
        descriptionKey: 'community.tools.items.email.description' as TranslationKey,
        detailsKey: 'community.tools.items.email.details' as TranslationKey
      },
      {
        id: 'forms',
        labelKey: 'community.tools.items.forms.label' as TranslationKey,
        descriptionKey: 'community.tools.items.forms.description' as TranslationKey,
        detailsKey: 'community.tools.items.forms.details' as TranslationKey
      },
      {
        id: 'crm',
        labelKey: 'community.tools.items.crm.label' as TranslationKey,
        descriptionKey: 'community.tools.items.crm.description' as TranslationKey,
        detailsKey: 'community.tools.items.crm.details' as TranslationKey
      },
      {
        id: 'events',
        labelKey: 'community.tools.items.events.label' as TranslationKey,
        descriptionKey: 'community.tools.items.events.description' as TranslationKey,
        detailsKey: 'community.tools.items.events.details' as TranslationKey
      },
      {
        id: 'website',
        labelKey: 'community.tools.items.website.label' as TranslationKey,
        descriptionKey: 'community.tools.items.website.description' as TranslationKey,
        detailsKey: 'community.tools.items.website.details' as TranslationKey
      }
    ] as const satisfies ReadonlyArray<CommunityTool>,
    suggestions: [
      {
        id: 'community.tools.suggestions.social',
        keywords: ['vk', 'telegram', 'instagram', 'соц', 'community'],
        adviceKey: 'community.tools.suggestions.social' as TranslationKey
      },
      {
        id: 'community.tools.suggestions.email',
        keywords: ['email', 'почт', 'рассыл', 'mailchimp', 'sendpulse'],
        adviceKey: 'community.tools.suggestions.email' as TranslationKey
      },
      {
        id: 'community.tools.suggestions.forms',
        keywords: ['форма', 'form', 'опрос', 'question', 'survey', 'anket'],
        adviceKey: 'community.tools.suggestions.forms' as TranslationKey
      },
      {
        id: 'community.tools.suggestions.crm',
        keywords: ['crm', 'airtable', 'база', 'контакт', 'notion', 'trello'],
        adviceKey: 'community.tools.suggestions.crm' as TranslationKey
      },
      {
        id: 'community.tools.suggestions.events',
        keywords: ['zoom', 'meet', 'webinar', 'jitsi', 'встреч'],
        adviceKey: 'community.tools.suggestions.events' as TranslationKey
      },
      {
        id: 'community.tools.suggestions.website',
        keywords: ['сайт', 'site', 'ленд', 'landing', 'tilda', 'wordpress'],
        adviceKey: 'community.tools.suggestions.website' as TranslationKey
      }
    ] as const satisfies ReadonlyArray<ToolSuggestion>
  },
  cases: {
    badgeKey: 'community.cases.badge' as TranslationKey,
    titleKey: 'community.cases.title' as TranslationKey,
    introKey: 'community.cases.intro' as TranslationKey,
    items: [
      {
        id: 'kpp',
        titleKey: 'community.cases.kpp.title' as TranslationKey,
        countryKey: 'community.cases.kpp.country' as TranslationKey,
        tags: [
          'community.cases.tags.pressure' as TranslationKey,
          'community.cases.tags.relocation' as TranslationKey,
          'community.cases.tags.resilience' as TranslationKey
        ],
        summaryKey: 'community.cases.kpp.summary' as TranslationKey,
        highlightsKey: 'community.cases.kpp.highlights' as TranslationKey,
        link: {
          href: 'https://pytkam.net/',
          labelKey: 'community.cases.kpp.link' as TranslationKey
        },
        noteKey: 'community.cases.kpp.note' as TranslationKey
      },
      {
        id: 'ovd',
        titleKey: 'community.cases.ovd.title' as TranslationKey,
        countryKey: 'community.cases.ovd.country' as TranslationKey,
        tags: [
          'community.cases.tags.pressure' as TranslationKey,
          'community.cases.tags.blocked' as TranslationKey,
          'community.cases.tags.resilience' as TranslationKey
        ],
        summaryKey: 'community.cases.ovd.summary' as TranslationKey,
        highlightsKey: 'community.cases.ovd.highlights' as TranslationKey,
        link: {
          href: 'https://ovd.info/',
          labelKey: 'community.cases.ovd.link' as TranslationKey
        },
        noteKey: 'community.cases.ovd.note' as TranslationKey
      }
    ] as const satisfies ReadonlyArray<CommunityCase>,
    noteKey: 'community.cases.note' as TranslationKey
  }
} as const;

export type CommunityPageContent = typeof communityPage;
