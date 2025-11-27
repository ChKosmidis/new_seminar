import type { TranslationKey } from '../i18n/types';

export type LegalSecurityPageContent = {
  hero: {
    badgeKey: TranslationKey;
    titleKey: TranslationKey;
    subtitleKey: TranslationKey;
    actions: ReadonlyArray<{ href: string; labelKey: TranslationKey; variant?: 'primary' | 'outline' }>;
    quickNav: ReadonlyArray<{ href: string; labelKey: TranslationKey }>;
    bullets: ReadonlyArray<{ icon: string; titleKey: TranslationKey; textKey: TranslationKey }>;
    card: {
      badgeKey: TranslationKey;
      titleKey: TranslationKey;
      textKey: TranslationKey;
      items: ReadonlyArray<TranslationKey>;
      theme: {
        light: { background: string; border: string; shadow: string };
        dark: { background: string; border: string; shadow: string };
      };
    };
  };
  overview: {
    badgeKey: TranslationKey;
    titleKey: TranslationKey;
    leadKey: TranslationKey;
    disclaimer: { titleKey: TranslationKey; textKey: TranslationKey };
    pillars: ReadonlyArray<{
      id: string;
      icon: string;
      titleKey: TranslationKey;
      descriptionKey: TranslationKey;
    }>;
    highlights: { titleKey: TranslationKey; items: ReadonlyArray<TranslationKey> };
  };
  forms: {
    badgeKey: TranslationKey;
    titleKey: TranslationKey;
    introKey: TranslationKey;
    forms: ReadonlyArray<{
      id: string;
      icon: string;
      titleKey: TranslationKey;
      summaryKey: TranslationKey;
      highlights: ReadonlyArray<TranslationKey>;
      cautions: ReadonlyArray<TranslationKey>;
    }>;
    note: { titleKey: TranslationKey; textKey: TranslationKey };
  };
  risks: {
    badgeKey: TranslationKey;
    titleKey: TranslationKey;
    introKey: TranslationKey;
    items: ReadonlyArray<{
      id: string;
      icon: string;
      titleKey: TranslationKey;
      descriptionKey: TranslationKey;
      mitigations: ReadonlyArray<TranslationKey>;
    }>;
  };
  security: {
    badgeKey: TranslationKey;
    titleKey: TranslationKey;
    introKey: TranslationKey;
    helperKey: TranslationKey;
    items: ReadonlyArray<{
      id: string;
      titleKey: TranslationKey;
      descriptionKey: TranslationKey;
    }>;
    summaryKey: TranslationKey;
    resetKey: TranslationKey;
  };
  playbook: {
    badgeKey: TranslationKey;
    titleKey: TranslationKey;
    introKey: TranslationKey;
    selectLabelKey: TranslationKey;
    helperKey: TranslationKey;
    blocks: {
      actionsTitleKey: TranslationKey;
      commsTitleKey: TranslationKey;
      supportTitleKey: TranslationKey;
    };
    scenarios: ReadonlyArray<{
      id: string;
      titleKey: TranslationKey;
      descriptionKey: TranslationKey;
      actions: ReadonlyArray<TranslationKey>;
      communications: ReadonlyArray<TranslationKey>;
      support: ReadonlyArray<TranslationKey>;
    }>;
  };
  planner: {
    badgeKey: TranslationKey;
    titleKey: TranslationKey;
    introKey: TranslationKey;
    helperKey: TranslationKey;
    threatLabelKey: TranslationKey;
    threatPlaceholderKey: TranslationKey;
    threats: ReadonlyArray<{
      id: string;
      labelKey: TranslationKey;
      descriptionKey: TranslationKey;
      promptKey: TranslationKey;
    }>;
    form: {
      fields: ReadonlyArray<{
        id: 'responsible' | 'actions' | 'internal' | 'external';
        type: 'text' | 'textarea';
        labelKey: TranslationKey;
        placeholderKey: TranslationKey;
      }>;
      submitKey: TranslationKey;
      resetKey: TranslationKey;
    };
    messages: {
      missingThreatKey: TranslationKey;
      missingFieldsKey: TranslationKey;
      missingKeyKey: TranslationKey;
      networkErrorKey: TranslationKey;
    };
    result: {
      titleKey: TranslationKey;
      helperKey: TranslationKey;
      placeholderKey: TranslationKey;
      loadingKey: TranslationKey;
      disclaimerKey: TranslationKey;
      fallbackKey: TranslationKey;
    };
    promptTemplateKey: TranslationKey;
    promptToneKey: TranslationKey;
    apiBase: string;
    defaultModel: string;
  };
};

export const legalSecurityPage: LegalSecurityPageContent = {
  hero: {
    badgeKey: 'legal.hero.badge' as TranslationKey,
    titleKey: 'legal.hero.title' as TranslationKey,
    subtitleKey: 'legal.hero.subtitle' as TranslationKey,
    actions: [
      { href: '#forms', labelKey: 'legal.hero.primary' as TranslationKey, variant: 'primary' as const },
      { href: '#security', labelKey: 'legal.hero.secondary' as TranslationKey, variant: 'outline' as const }
    ],
    quickNav: [
      { href: '#overview', labelKey: 'legal.quick.overview' as TranslationKey },
      { href: '#forms', labelKey: 'legal.quick.forms' as TranslationKey },
      { href: '#risks', labelKey: 'legal.quick.risks' as TranslationKey },
      { href: '#security', labelKey: 'legal.quick.security' as TranslationKey },
      { href: '#playbook', labelKey: 'legal.quick.playbook' as TranslationKey }
    ],
    bullets: [
      {
        icon: '⚖️',
        titleKey: 'legal.hero.point1.title' as TranslationKey,
        textKey: 'legal.hero.point1.text' as TranslationKey
      },
      {
        icon: '🛡️',
        titleKey: 'legal.hero.point2.title' as TranslationKey,
        textKey: 'legal.hero.point2.text' as TranslationKey
      }
    ],
    card: {
      badgeKey: 'legal.hero.card.badge' as TranslationKey,
      titleKey: 'legal.hero.card.title' as TranslationKey,
      textKey: 'legal.hero.card.text' as TranslationKey,
      items: [
        'legal.hero.card.item1' as TranslationKey,
        'legal.hero.card.item2' as TranslationKey,
        'legal.hero.card.item3' as TranslationKey
      ],
      theme: {
        light: {
          background: '#ffffff',
          border: 'rgba(220, 38, 38, 0.18)',
          shadow: '0 26px 46px rgba(220, 38, 38, 0.12)'
        },
        dark: {
          background: 'rgba(15, 23, 42, 0.85)',
          border: 'rgba(248, 113, 113, 0.35)',
          shadow: '0 36px 70px rgba(2, 6, 23, 0.75)'
        }
      }
    }
  },
  overview: {
    badgeKey: 'legal.overview.badge' as TranslationKey,
    titleKey: 'legal.overview.title' as TranslationKey,
    leadKey: 'legal.overview.lead' as TranslationKey,
    disclaimer: {
      titleKey: 'legal.overview.disclaimer.title' as TranslationKey,
      textKey: 'legal.overview.disclaimer.text' as TranslationKey
    },
    pillars: [
      {
        id: 'law',
        icon: 'rights.svg',
        titleKey: 'legal.overview.pillars.law.title' as TranslationKey,
        descriptionKey: 'legal.overview.pillars.law.text' as TranslationKey
      },
      {
        id: 'security',
        icon: 'safety.svg',
        titleKey: 'legal.overview.pillars.security.title' as TranslationKey,
        descriptionKey: 'legal.overview.pillars.security.text' as TranslationKey
      },
      {
        id: 'team',
        icon: 'community.svg',
        titleKey: 'legal.overview.pillars.team.title' as TranslationKey,
        descriptionKey: 'legal.overview.pillars.team.text' as TranslationKey
      }
    ],
    highlights: {
      titleKey: 'legal.overview.highlights.title' as TranslationKey,
      items: [
        'legal.overview.highlights.item1' as TranslationKey,
        'legal.overview.highlights.item2' as TranslationKey,
        'legal.overview.highlights.item3' as TranslationKey
      ]
    }
  },
  forms: {
    badgeKey: 'legal.forms.badge' as TranslationKey,
    titleKey: 'legal.forms.title' as TranslationKey,
    introKey: 'legal.forms.intro' as TranslationKey,
    forms: [
      {
        id: 'oo',
        icon: 'community.svg',
        titleKey: 'legal.forms.oo.title' as TranslationKey,
        summaryKey: 'legal.forms.oo.summary' as TranslationKey,
        highlights: [
          'legal.forms.oo.point1' as TranslationKey,
          'legal.forms.oo.point2' as TranslationKey,
          'legal.forms.oo.point3' as TranslationKey
        ],
        cautions: [
          'legal.forms.oo.caution1' as TranslationKey,
          'legal.forms.oo.caution2' as TranslationKey
        ]
      },
      {
        id: 'ano',
        icon: 'interactivity.svg',
        titleKey: 'legal.forms.ano.title' as TranslationKey,
        summaryKey: 'legal.forms.ano.summary' as TranslationKey,
        highlights: [
          'legal.forms.ano.point1' as TranslationKey,
          'legal.forms.ano.point2' as TranslationKey,
          'legal.forms.ano.point3' as TranslationKey
        ],
        cautions: [
          'legal.forms.ano.caution1' as TranslationKey,
          'legal.forms.ano.caution2' as TranslationKey
        ]
      },
      {
        id: 'fund',
        icon: 'cases.svg',
        titleKey: 'legal.forms.fund.title' as TranslationKey,
        summaryKey: 'legal.forms.fund.summary' as TranslationKey,
        highlights: [
          'legal.forms.fund.point1' as TranslationKey,
          'legal.forms.fund.point2' as TranslationKey,
          'legal.forms.fund.point3' as TranslationKey
        ],
        cautions: [
          'legal.forms.fund.caution1' as TranslationKey,
          'legal.forms.fund.caution2' as TranslationKey
        ]
      },
      {
        id: 'informal',
        icon: 'visibility.svg',
        titleKey: 'legal.forms.informal.title' as TranslationKey,
        summaryKey: 'legal.forms.informal.summary' as TranslationKey,
        highlights: [
          'legal.forms.informal.point1' as TranslationKey,
          'legal.forms.informal.point2' as TranslationKey,
          'legal.forms.informal.point3' as TranslationKey
        ],
        cautions: [
          'legal.forms.informal.caution1' as TranslationKey,
          'legal.forms.informal.caution2' as TranslationKey
        ]
      }
    ],
    note: {
      titleKey: 'legal.forms.note.title' as TranslationKey,
      textKey: 'legal.forms.note.text' as TranslationKey
    }
  },
  risks: {
    badgeKey: 'legal.risks.badge' as TranslationKey,
    titleKey: 'legal.risks.title' as TranslationKey,
    introKey: 'legal.risks.intro' as TranslationKey,
    items: [
      {
        id: 'foreign-agent',
        icon: 'record_voice_over.svg',
        titleKey: 'legal.risks.items.foreign.title' as TranslationKey,
        descriptionKey: 'legal.risks.items.foreign.description' as TranslationKey,
        mitigations: [
          'legal.risks.items.foreign.m1' as TranslationKey,
          'legal.risks.items.foreign.m2' as TranslationKey,
          'legal.risks.items.foreign.m3' as TranslationKey
        ]
      },
      {
        id: 'extremism',
        icon: 'safety.svg',
        titleKey: 'legal.risks.items.extremism.title' as TranslationKey,
        descriptionKey: 'legal.risks.items.extremism.description' as TranslationKey,
        mitigations: [
          'legal.risks.items.extremism.m1' as TranslationKey,
          'legal.risks.items.extremism.m2' as TranslationKey,
          'legal.risks.items.extremism.m3' as TranslationKey
        ]
      },
      {
        id: 'data',
        icon: 'visibility.svg',
        titleKey: 'legal.risks.items.data.title' as TranslationKey,
        descriptionKey: 'legal.risks.items.data.description' as TranslationKey,
        mitigations: [
          'legal.risks.items.data.m1' as TranslationKey,
          'legal.risks.items.data.m2' as TranslationKey,
          'legal.risks.items.data.m3' as TranslationKey
        ]
      },
      {
        id: 'finance',
        icon: 'paid.svg',
        titleKey: 'legal.risks.items.finance.title' as TranslationKey,
        descriptionKey: 'legal.risks.items.finance.description' as TranslationKey,
        mitigations: [
          'legal.risks.items.finance.m1' as TranslationKey,
          'legal.risks.items.finance.m2' as TranslationKey,
          'legal.risks.items.finance.m3' as TranslationKey
        ]
      },
      {
        id: 'public',
        icon: 'campaign.svg',
        titleKey: 'legal.risks.items.public.title' as TranslationKey,
        descriptionKey: 'legal.risks.items.public.description' as TranslationKey,
        mitigations: [
          'legal.risks.items.public.m1' as TranslationKey,
          'legal.risks.items.public.m2' as TranslationKey,
          'legal.risks.items.public.m3' as TranslationKey
        ]
      }
    ]
  },
  security: {
    badgeKey: 'legal.security.badge' as TranslationKey,
    titleKey: 'legal.security.title' as TranslationKey,
    introKey: 'legal.security.intro' as TranslationKey,
    helperKey: 'legal.security.helper' as TranslationKey,
    items: [
      { id: 'dev_pass', titleKey: 'legal.security.items.dev_pass.title' as TranslationKey, descriptionKey: 'legal.security.items.dev_pass.description' as TranslationKey },
      { id: 'dev_2fa', titleKey: 'legal.security.items.dev_2fa.title' as TranslationKey, descriptionKey: 'legal.security.items.dev_2fa.description' as TranslationKey },
      { id: 'dev_encrypt', titleKey: 'legal.security.items.dev_encrypt.title' as TranslationKey, descriptionKey: 'legal.security.items.dev_encrypt.description' as TranslationKey },
      { id: 'dev_updates', titleKey: 'legal.security.items.dev_updates.title' as TranslationKey, descriptionKey: 'legal.security.items.dev_updates.description' as TranslationKey },
      { id: 'comm_messengers', titleKey: 'legal.security.items.comm_messengers.title' as TranslationKey, descriptionKey: 'legal.security.items.comm_messengers.description' as TranslationKey },
      { id: 'comm_email', titleKey: 'legal.security.items.comm_email.title' as TranslationKey, descriptionKey: 'legal.security.items.comm_email.description' as TranslationKey },
      { id: 'comm_vpn', titleKey: 'legal.security.items.comm_vpn.title' as TranslationKey, descriptionKey: 'legal.security.items.comm_vpn.description' as TranslationKey },
      { id: 'data_min', titleKey: 'legal.security.items.data_min.title' as TranslationKey, descriptionKey: 'legal.security.items.data_min.description' as TranslationKey },
      { id: 'data_anon', titleKey: 'legal.security.items.data_anon.title' as TranslationKey, descriptionKey: 'legal.security.items.data_anon.description' as TranslationKey },
      { id: 'data_store', titleKey: 'legal.security.items.data_store.title' as TranslationKey, descriptionKey: 'legal.security.items.data_store.description' as TranslationKey },
      { id: 'sec_antiphish', titleKey: 'legal.security.items.sec_antiphish.title' as TranslationKey, descriptionKey: 'legal.security.items.sec_antiphish.description' as TranslationKey },
      { id: 'sec_antivirus', titleKey: 'legal.security.items.sec_antivirus.title' as TranslationKey, descriptionKey: 'legal.security.items.sec_antivirus.description' as TranslationKey }
    ],
    summaryKey: 'legal.security.summary' as TranslationKey,
    resetKey: 'legal.security.reset' as TranslationKey
  },
  playbook: {
    badgeKey: 'legal.playbook.badge' as TranslationKey,
    titleKey: 'legal.playbook.title' as TranslationKey,
    introKey: 'legal.playbook.intro' as TranslationKey,
    selectLabelKey: 'legal.playbook.selectLabel' as TranslationKey,
    helperKey: 'legal.playbook.helper' as TranslationKey,
    blocks: {
      actionsTitleKey: 'legal.playbook.blocks.actions' as TranslationKey,
      commsTitleKey: 'legal.playbook.blocks.comms' as TranslationKey,
      supportTitleKey: 'legal.playbook.blocks.support' as TranslationKey
    },
    scenarios: [
      {
        id: 'raid',
        titleKey: 'legal.playbook.scenarios.raid.title' as TranslationKey,
        descriptionKey: 'legal.playbook.scenarios.raid.description' as TranslationKey,
        actions: [
          'legal.playbook.scenarios.raid.action1' as TranslationKey,
          'legal.playbook.scenarios.raid.action2' as TranslationKey,
          'legal.playbook.scenarios.raid.action3' as TranslationKey
        ],
        communications: [
          'legal.playbook.scenarios.raid.comms1' as TranslationKey,
          'legal.playbook.scenarios.raid.comms2' as TranslationKey
        ],
        support: [
          'legal.playbook.scenarios.raid.support1' as TranslationKey,
          'legal.playbook.scenarios.raid.support2' as TranslationKey
        ]
      },
      {
        id: 'detention',
        titleKey: 'legal.playbook.scenarios.detention.title' as TranslationKey,
        descriptionKey: 'legal.playbook.scenarios.detention.description' as TranslationKey,
        actions: [
          'legal.playbook.scenarios.detention.action1' as TranslationKey,
          'legal.playbook.scenarios.detention.action2' as TranslationKey,
          'legal.playbook.scenarios.detention.action3' as TranslationKey
        ],
        communications: [
          'legal.playbook.scenarios.detention.comms1' as TranslationKey,
          'legal.playbook.scenarios.detention.comms2' as TranslationKey
        ],
        support: [
          'legal.playbook.scenarios.detention.support1' as TranslationKey,
          'legal.playbook.scenarios.detention.support2' as TranslationKey
        ]
      },
      {
        id: 'hack',
        titleKey: 'legal.playbook.scenarios.hack.title' as TranslationKey,
        descriptionKey: 'legal.playbook.scenarios.hack.description' as TranslationKey,
        actions: [
          'legal.playbook.scenarios.hack.action1' as TranslationKey,
          'legal.playbook.scenarios.hack.action2' as TranslationKey,
          'legal.playbook.scenarios.hack.action3' as TranslationKey
        ],
        communications: [
          'legal.playbook.scenarios.hack.comms1' as TranslationKey,
          'legal.playbook.scenarios.hack.comms2' as TranslationKey
        ],
        support: [
          'legal.playbook.scenarios.hack.support1' as TranslationKey,
          'legal.playbook.scenarios.hack.support2' as TranslationKey
        ]
      },
      {
        id: 'discredit',
        titleKey: 'legal.playbook.scenarios.discredit.title' as TranslationKey,
        descriptionKey: 'legal.playbook.scenarios.discredit.description' as TranslationKey,
        actions: [
          'legal.playbook.scenarios.discredit.action1' as TranslationKey,
          'legal.playbook.scenarios.discredit.action2' as TranslationKey,
          'legal.playbook.scenarios.discredit.action3' as TranslationKey
        ],
        communications: [
          'legal.playbook.scenarios.discredit.comms1' as TranslationKey,
          'legal.playbook.scenarios.discredit.comms2' as TranslationKey
        ],
        support: [
          'legal.playbook.scenarios.discredit.support1' as TranslationKey,
          'legal.playbook.scenarios.discredit.support2' as TranslationKey
        ]
      }
    ]
  },
  planner: {
    badgeKey: 'legal.planner.badge' as TranslationKey,
    titleKey: 'legal.planner.title' as TranslationKey,
    introKey: 'legal.planner.intro' as TranslationKey,
    helperKey: 'legal.planner.helper' as TranslationKey,
    threatLabelKey: 'legal.planner.threat.label' as TranslationKey,
    threatPlaceholderKey: 'legal.planner.threat.placeholder' as TranslationKey,
    threats: [
      {
        id: 'raid',
        labelKey: 'legal.planner.threat.raid.label' as TranslationKey,
        descriptionKey: 'legal.planner.threat.raid.description' as TranslationKey,
        promptKey: 'legal.planner.threat.raid.prompt' as TranslationKey
      },
      {
        id: 'detention',
        labelKey: 'legal.planner.threat.detention.label' as TranslationKey,
        descriptionKey: 'legal.planner.threat.detention.description' as TranslationKey,
        promptKey: 'legal.planner.threat.detention.prompt' as TranslationKey
      },
      {
        id: 'hack',
        labelKey: 'legal.planner.threat.hack.label' as TranslationKey,
        descriptionKey: 'legal.planner.threat.hack.description' as TranslationKey,
        promptKey: 'legal.planner.threat.hack.prompt' as TranslationKey
      },
      {
        id: 'discredit',
        labelKey: 'legal.planner.threat.discredit.label' as TranslationKey,
        descriptionKey: 'legal.planner.threat.discredit.description' as TranslationKey,
        promptKey: 'legal.planner.threat.discredit.prompt' as TranslationKey
      }
    ],
    form: {
      fields: [
        {
          id: 'responsible',
          type: 'text',
          labelKey: 'legal.planner.fields.responsible.label' as TranslationKey,
          placeholderKey: 'legal.planner.fields.responsible.placeholder' as TranslationKey
        },
        {
          id: 'actions',
          type: 'textarea',
          labelKey: 'legal.planner.fields.actions.label' as TranslationKey,
          placeholderKey: 'legal.planner.fields.actions.placeholder' as TranslationKey
        },
        {
          id: 'internal',
          type: 'text',
          labelKey: 'legal.planner.fields.internal.label' as TranslationKey,
          placeholderKey: 'legal.planner.fields.internal.placeholder' as TranslationKey
        },
        {
          id: 'external',
          type: 'text',
          labelKey: 'legal.planner.fields.external.label' as TranslationKey,
          placeholderKey: 'legal.planner.fields.external.placeholder' as TranslationKey
        }
      ],
      submitKey: 'legal.planner.submit' as TranslationKey,
      resetKey: 'legal.planner.reset' as TranslationKey
    },
    messages: {
      missingThreatKey: 'legal.planner.errors.missingThreat' as TranslationKey,
      missingFieldsKey: 'legal.planner.errors.missingFields' as TranslationKey,
      missingKeyKey: 'legal.planner.errors.missingKey' as TranslationKey,
      networkErrorKey: 'legal.planner.errors.network' as TranslationKey
    },
    result: {
      titleKey: 'legal.planner.result.title' as TranslationKey,
      helperKey: 'legal.planner.result.helper' as TranslationKey,
      placeholderKey: 'legal.planner.result.placeholder' as TranslationKey,
      loadingKey: 'legal.planner.result.loading' as TranslationKey,
      disclaimerKey: 'legal.planner.result.disclaimer' as TranslationKey,
      fallbackKey: 'legal.planner.result.fallback' as TranslationKey
    },
    promptTemplateKey: 'legal.planner.prompt.template' as TranslationKey,
    promptToneKey: 'legal.planner.prompt.tone' as TranslationKey,
    apiBase: 'https://generativelanguage.googleapis.com/v1beta/models/',
    defaultModel: 'gemma-3n-e4b-it'
  }
};
