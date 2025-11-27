import type { TranslationKey } from '../i18n/types';

type ImpactStep = {
  id: string;
  icon: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
};

type CultureSignal = {
  id: string;
  icon: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
};

type VolunteerTip = {
  id: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
};

type ToolCategory = {
  id: string;
  icon: string;
  titleKey: TranslationKey;
  summaryKey: TranslationKey;
  recommendationTitleKey: TranslationKey;
  recommendations: ReadonlyArray<TranslationKey>;
};

type DiagnosticItem = {
  id: string;
  problemKey: TranslationKey;
  hintKey: TranslationKey;
  solutionTitleKey: TranslationKey;
  solutions: ReadonlyArray<TranslationKey>;
};

type FeedbackPrinciple = {
  id: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
};

type ImprovementField = {
  id: string;
  toolLabelKey: TranslationKey;
  toolPlaceholderKey: TranslationKey;
  reasonPlaceholderKey: TranslationKey;
};

export const internalCommunicationsPage = {
  hero: {
    badgeKey: 'communications.hero.badge' as TranslationKey,
    titleKey: 'communications.hero.title' as TranslationKey,
    subtitleKey: 'communications.hero.subtitle' as TranslationKey,
    actions: [
      { href: '#overview', labelKey: 'communications.hero.primary' as TranslationKey, variant: 'primary' as const },
      { href: '#tools', labelKey: 'communications.hero.secondary' as TranslationKey, variant: 'outline' as const }
    ],
    quickNav: [
      { href: '#overview', labelKey: 'communications.quick.overview' as TranslationKey },
      { href: '#culture', labelKey: 'communications.quick.culture' as TranslationKey },
      { href: '#volunteers', labelKey: 'communications.quick.volunteers' as TranslationKey },
      { href: '#tools', labelKey: 'communications.quick.tools' as TranslationKey },
      { href: '#diagnostics', labelKey: 'communications.quick.diagnostics' as TranslationKey },
      { href: '#improvement', labelKey: 'communications.quick.improvement' as TranslationKey }
    ],
    bullets: [
      {
        icon: '🧭',
        titleKey: 'communications.hero.point1.title' as TranslationKey,
        textKey: 'communications.hero.point1.text' as TranslationKey
      },
      {
        icon: '🤲',
        titleKey: 'communications.hero.point2.title' as TranslationKey,
        textKey: 'communications.hero.point2.text' as TranslationKey
      }
    ],
    card: {
      badgeKey: 'communications.hero.card.badge' as TranslationKey,
      titleKey: 'communications.hero.card.title' as TranslationKey,
      textKey: 'communications.hero.card.text' as TranslationKey,
      items: [
        'communications.hero.card.item1' as TranslationKey,
        'communications.hero.card.item2' as TranslationKey,
        'communications.hero.card.item3' as TranslationKey
      ],
      theme: {
        light: {
          background: '#ffffff',
          border: 'rgba(15, 23, 42, 0.08)',
          shadow: 'var(--shadow-soft-light)'
        },
        dark: {
          background: 'rgba(15, 23, 42, 0.88)',
          border: 'rgba(45, 212, 191, 0.32)',
          shadow: '0 36px 70px rgba(2, 6, 23, 0.7)'
        }
      }
    }
  },
  overview: {
    impact: {
      badgeKey: 'communications.overview.badge' as TranslationKey,
      titleKey: 'communications.overview.title' as TranslationKey,
      introKey: 'communications.overview.intro' as TranslationKey,
      steps: [
        {
          id: 'mission',
          icon: 'introngo.svg',
          titleKey: 'communications.overview.steps.mission.title' as TranslationKey,
          descriptionKey: 'communications.overview.steps.mission.description' as TranslationKey
        },
        {
          id: 'team',
          icon: 'community.svg',
          titleKey: 'communications.overview.steps.team.title' as TranslationKey,
          descriptionKey: 'communications.overview.steps.team.description' as TranslationKey
        },
        {
          id: 'motivation',
          icon: 'interactivity.svg',
          titleKey: 'communications.overview.steps.motivation.title' as TranslationKey,
          descriptionKey: 'communications.overview.steps.motivation.description' as TranslationKey
        },
        {
          id: 'results',
          icon: 'cases.svg',
          titleKey: 'communications.overview.steps.results.title' as TranslationKey,
          descriptionKey: 'communications.overview.steps.results.description' as TranslationKey
        }
      ] as const satisfies ReadonlyArray<ImpactStep>
    },
    culture: {
      titleKey: 'communications.culture.title' as TranslationKey,
      introKey: 'communications.culture.intro' as TranslationKey,
      values: [
        {
          id: 'trust',
          icon: 'safety.svg',
          titleKey: 'communications.culture.values.trust.title' as TranslationKey,
          descriptionKey: 'communications.culture.values.trust.description' as TranslationKey
        },
        {
          id: 'openness',
          icon: 'communication.svg',
          titleKey: 'communications.culture.values.openness.title' as TranslationKey,
          descriptionKey: 'communications.culture.values.openness.description' as TranslationKey
        },
        {
          id: 'support',
          icon: 'community.svg',
          titleKey: 'communications.culture.values.support.title' as TranslationKey,
          descriptionKey: 'communications.culture.values.support.description' as TranslationKey
        },
        {
          id: 'transparency',
          icon: 'visibility.svg',
          titleKey: 'communications.culture.values.transparency.title' as TranslationKey,
          descriptionKey: 'communications.culture.values.transparency.description' as TranslationKey
        }
      ] as const satisfies ReadonlyArray<CultureSignal>
    },
    volunteers: {
      titleKey: 'communications.volunteers.title' as TranslationKey,
      introKey: 'communications.volunteers.intro' as TranslationKey,
      tips: [
        {
          id: 'expectations',
          titleKey: 'communications.volunteers.tips.expectations.title' as TranslationKey,
          descriptionKey: 'communications.volunteers.tips.expectations.description' as TranslationKey
        },
        {
          id: 'feedback',
          titleKey: 'communications.volunteers.tips.feedback.title' as TranslationKey,
          descriptionKey: 'communications.volunteers.tips.feedback.description' as TranslationKey
        },
        {
          id: 'channels',
          titleKey: 'communications.volunteers.tips.channels.title' as TranslationKey,
          descriptionKey: 'communications.volunteers.tips.channels.description' as TranslationKey
        },
        {
          id: 'recognition',
          titleKey: 'communications.volunteers.tips.recognition.title' as TranslationKey,
          descriptionKey: 'communications.volunteers.tips.recognition.description' as TranslationKey
        },
        {
          id: 'support',
          titleKey: 'communications.volunteers.tips.support.title' as TranslationKey,
          descriptionKey: 'communications.volunteers.tips.support.description' as TranslationKey
        }
      ] as const satisfies ReadonlyArray<VolunteerTip>
    }
  },
  tools: {
    badgeKey: 'communications.tools.badge' as TranslationKey,
    titleKey: 'communications.tools.title' as TranslationKey,
    introKey: 'communications.tools.intro' as TranslationKey,
    categories: [
      {
        id: 'messengers',
        icon: 'safety.svg',
        titleKey: 'communications.tools.categories.messengers.title' as TranslationKey,
        summaryKey: 'communications.tools.categories.messengers.summary' as TranslationKey,
        recommendationTitleKey: 'communications.tools.recommendationsTitle' as TranslationKey,
        recommendations: [
          'communications.tools.categories.messengers.items.signal' as TranslationKey,
          'communications.tools.categories.messengers.items.element' as TranslationKey,
          'communications.tools.categories.messengers.items.telegram' as TranslationKey
        ]
      },
      {
        id: 'tasks',
        icon: 'cases.svg',
        titleKey: 'communications.tools.categories.tasks.title' as TranslationKey,
        summaryKey: 'communications.tools.categories.tasks.summary' as TranslationKey,
        recommendationTitleKey: 'communications.tools.recommendationsTitle' as TranslationKey,
        recommendations: [
          'communications.tools.categories.tasks.items.trello' as TranslationKey,
          'communications.tools.categories.tasks.items.asana' as TranslationKey,
          'communications.tools.categories.tasks.items.notion' as TranslationKey
        ]
      },
      {
        id: 'cloud',
        icon: 'Infrastructure.svg',
        titleKey: 'communications.tools.categories.cloud.title' as TranslationKey,
        summaryKey: 'communications.tools.categories.cloud.summary' as TranslationKey,
        recommendationTitleKey: 'communications.tools.recommendationsTitle' as TranslationKey,
        recommendations: [
          'communications.tools.categories.cloud.items.nextcloud' as TranslationKey,
          'communications.tools.categories.cloud.items.cryptpad' as TranslationKey,
          'communications.tools.categories.cloud.items.jitsi' as TranslationKey,
          'communications.tools.categories.cloud.items.google' as TranslationKey
        ]
      },
      {
        id: 'knowledge',
        icon: 'efficiency.svg',
        titleKey: 'communications.tools.categories.knowledge.title' as TranslationKey,
        summaryKey: 'communications.tools.categories.knowledge.summary' as TranslationKey,
        recommendationTitleKey: 'communications.tools.recommendationsTitle' as TranslationKey,
        recommendations: [
          'communications.tools.categories.knowledge.items.notion' as TranslationKey,
          'communications.tools.categories.knowledge.items.docs' as TranslationKey,
          'communications.tools.categories.knowledge.items.confluence' as TranslationKey
        ]
      }
    ] as const satisfies ReadonlyArray<ToolCategory>
  },
  diagnostics: {
    badgeKey: 'communications.diagnostics.badge' as TranslationKey,
    titleKey: 'communications.diagnostics.title' as TranslationKey,
    introKey: 'communications.diagnostics.intro' as TranslationKey,
    items: [
      {
        id: 'overload',
        problemKey: 'communications.diagnostics.items.overload.problem' as TranslationKey,
        hintKey: 'communications.diagnostics.items.overload.hint' as TranslationKey,
        solutionTitleKey: 'communications.diagnostics.solutionTitle' as TranslationKey,
        solutions: [
          'communications.diagnostics.items.overload.solutions.one' as TranslationKey,
          'communications.diagnostics.items.overload.solutions.two' as TranslationKey,
          'communications.diagnostics.items.overload.solutions.three' as TranslationKey
        ]
      },
      {
        id: 'distortion',
        problemKey: 'communications.diagnostics.items.distortion.problem' as TranslationKey,
        hintKey: 'communications.diagnostics.items.distortion.hint' as TranslationKey,
        solutionTitleKey: 'communications.diagnostics.solutionTitle' as TranslationKey,
        solutions: [
          'communications.diagnostics.items.distortion.solutions.one' as TranslationKey,
          'communications.diagnostics.items.distortion.solutions.two' as TranslationKey,
          'communications.diagnostics.items.distortion.solutions.three' as TranslationKey
        ]
      },
      {
        id: 'feedback',
        problemKey: 'communications.diagnostics.items.feedback.problem' as TranslationKey,
        hintKey: 'communications.diagnostics.items.feedback.hint' as TranslationKey,
        solutionTitleKey: 'communications.diagnostics.solutionTitle' as TranslationKey,
        solutions: [
          'communications.diagnostics.items.feedback.solutions.one' as TranslationKey,
          'communications.diagnostics.items.feedback.solutions.two' as TranslationKey,
          'communications.diagnostics.items.feedback.solutions.three' as TranslationKey
        ]
      },
      {
        id: 'engagement',
        problemKey: 'communications.diagnostics.items.engagement.problem' as TranslationKey,
        hintKey: 'communications.diagnostics.items.engagement.hint' as TranslationKey,
        solutionTitleKey: 'communications.diagnostics.solutionTitle' as TranslationKey,
        solutions: [
          'communications.diagnostics.items.engagement.solutions.one' as TranslationKey,
          'communications.diagnostics.items.engagement.solutions.two' as TranslationKey,
          'communications.diagnostics.items.engagement.solutions.three' as TranslationKey
        ]
      }
    ] as const satisfies ReadonlyArray<DiagnosticItem>
  },
  feedback: {
    titleKey: 'communications.feedback.title' as TranslationKey,
    introKey: 'communications.feedback.intro' as TranslationKey,
    principles: [
      {
        id: 'specificity',
        titleKey: 'communications.feedback.principles.specificity.title' as TranslationKey,
        descriptionKey: 'communications.feedback.principles.specificity.description' as TranslationKey
      },
      {
        id: 'timeliness',
        titleKey: 'communications.feedback.principles.timeliness.title' as TranslationKey,
        descriptionKey: 'communications.feedback.principles.timeliness.description' as TranslationKey
      },
      {
        id: 'balance',
        titleKey: 'communications.feedback.principles.balance.title' as TranslationKey,
        descriptionKey: 'communications.feedback.principles.balance.description' as TranslationKey
      },
      {
        id: 'behavior',
        titleKey: 'communications.feedback.principles.behavior.title' as TranslationKey,
        descriptionKey: 'communications.feedback.principles.behavior.description' as TranslationKey
      },
      {
        id: 'support',
        titleKey: 'communications.feedback.principles.support.title' as TranslationKey,
        descriptionKey: 'communications.feedback.principles.support.description' as TranslationKey
      }
    ] as const satisfies ReadonlyArray<FeedbackPrinciple>
  },
  improvement: {
    badgeKey: 'communications.improvement.badge' as TranslationKey,
    titleKey: 'communications.improvement.title' as TranslationKey,
    introKey: 'communications.improvement.intro' as TranslationKey,
    reasonLabelKey: 'communications.improvement.reasonLabel' as TranslationKey,
    fields: [
      {
        id: 'first',
        toolLabelKey: 'communications.improvement.fields.first.toolLabel' as TranslationKey,
        toolPlaceholderKey: 'communications.improvement.fields.first.toolPlaceholder' as TranslationKey,
        reasonPlaceholderKey: 'communications.improvement.fields.first.reasonPlaceholder' as TranslationKey
      },
      {
        id: 'second',
        toolLabelKey: 'communications.improvement.fields.second.toolLabel' as TranslationKey,
        toolPlaceholderKey: 'communications.improvement.fields.second.toolPlaceholder' as TranslationKey,
        reasonPlaceholderKey: 'communications.improvement.fields.second.reasonPlaceholder' as TranslationKey
      },
      {
        id: 'third',
        toolLabelKey: 'communications.improvement.fields.third.toolLabel' as TranslationKey,
        toolPlaceholderKey: 'communications.improvement.fields.third.toolPlaceholder' as TranslationKey,
        reasonPlaceholderKey: 'communications.improvement.fields.third.reasonPlaceholder' as TranslationKey
      }
    ] as const satisfies ReadonlyArray<ImprovementField>,
    submitKey: 'communications.improvement.submit' as TranslationKey,
    resetKey: 'communications.improvement.reset' as TranslationKey,
    errorKey: 'communications.improvement.error' as TranslationKey,
    resultTitleKey: 'communications.improvement.result.title' as TranslationKey,
    resultDefaultKey: 'communications.improvement.result.default' as TranslationKey,
    resultIntroKey: 'communications.improvement.result.intro' as TranslationKey,
    resultItemKey: 'communications.improvement.result.item' as TranslationKey,
    resultOutroKey: 'communications.improvement.result.outro' as TranslationKey
  }
} as const;

export type InternalCommunicationsPageContent = typeof internalCommunicationsPage;
