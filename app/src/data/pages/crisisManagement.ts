import type { TranslationKey } from "../i18n/types";

const iconPath = (fileName: string) => new URL(`../../assets/icons/${fileName}`, import.meta.url).href;

export type CrisisChecklistItemId = "community" | "communications" | "infrastructure" | "security";
export type CrisisPlanFieldId =
  | "situation"
  | "triggers"
  | "responsibles"
  | "actions"
  | "internal"
  | "external"
  | "resources"
  | "lessons";

export type CrisisChecklistCustomItem = {
  id: string;
  text: string;
  checked: boolean;
};

export type CrisisPlanSnapshot = {
  fields: Record<CrisisPlanFieldId, string>;
  aiFeedback: string;
  aiNotice?: string;
};

export type CrisisManagementPageContent = {
  hero: {
    badgeKey: TranslationKey;
    titleKey: TranslationKey;
    subtitleKey: TranslationKey;
    actions: ReadonlyArray<{ href: string; labelKey: TranslationKey; variant?: "primary" | "outline" }>;
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
  resilience: {
    badgeKey: TranslationKey;
    titleKey: TranslationKey;
    leadKey: TranslationKey;
    pillars: ReadonlyArray<{
      id: CrisisChecklistItemId;
      icon: string;
      titleKey: TranslationKey;
      descriptionKey: TranslationKey;
    }>;
  };
  checklist: {
    badgeKey: TranslationKey;
    titleKey: TranslationKey;
    leadKey: TranslationKey;
    helperKey: TranslationKey;
    customHintKey: TranslationKey;
    addPlaceholderKey: TranslationKey;
    addButtonKey: TranslationKey;
    emptyNoticeKey: TranslationKey;
    items: ReadonlyArray<{
      id: CrisisChecklistItemId;
      icon: string;
      titleKey: TranslationKey;
      descriptionKey: TranslationKey;
    }>;
  };
  plan: {
    badgeKey: TranslationKey;
    titleKey: TranslationKey;
    leadKey: TranslationKey;
    helperKey: TranslationKey;
    toggle: { showKey: TranslationKey; hideKey: TranslationKey };
    fields: ReadonlyArray<{
      id: CrisisPlanFieldId;
      type: "text" | "textarea";
      labelKey: TranslationKey;
      placeholderKey: TranslationKey;
      rows?: number;
    }>;
    ai: {
      buttonKey: TranslationKey;
      helperKey: TranslationKey;
      messages: {
        emptyKey: TranslationKey;
        missingKeyKey: TranslationKey;
        networkErrorKey: TranslationKey;
      };
      prompt: {
        systemKey: TranslationKey;
        templateKey: TranslationKey;
        toneKey: TranslationKey;
        emptyValueKey: TranslationKey;
      };
      result: {
        titleKey: TranslationKey;
        placeholderKey: TranslationKey;
        loadingKey: TranslationKey;
        disclaimerKey: TranslationKey;
        fallbackKey: TranslationKey;
      };
    };
  };
  cases: {
    badgeKey: TranslationKey;
    titleKey: TranslationKey;
    leadKey: TranslationKey;
    helperKey: TranslationKey;
    placeholderKey: TranslationKey;
    tiles: ReadonlyArray<{
      id: string;
      icon: string;
      titleKey: TranslationKey;
      descriptionKey: TranslationKey;
    }>;
    scenarios: ReadonlyArray<{
      id: string;
      titleKey: TranslationKey;
      crisisKey: TranslationKey;
      actionsTitleKey: TranslationKey;
      actions: ReadonlyArray<TranslationKey>;
      outcomeKey: TranslationKey;
    }>;
  };
  export: {
    titleKey: TranslationKey;
    descriptionKey: TranslationKey;
    buttonKey: TranslationKey;
    statusPreparingKey: TranslationKey;
    statusSuccessKey: TranslationKey;
    statusErrorKey: TranslationKey;
    pdf: {
      titleKey: TranslationKey;
      checklistSectionKey: TranslationKey;
      planSectionKey: TranslationKey;
      aiSectionKey: TranslationKey;
      caseSectionKey: TranslationKey;
      checklistStatusReadyKey: TranslationKey;
      checklistStatusPendingKey: TranslationKey;
      checklistTable: { statusKey: TranslationKey; itemKey: TranslationKey };
      planTable: { parameterKey: TranslationKey; valueKey: TranslationKey };
      planEmptyKey: TranslationKey;
      aiEmptyKey: TranslationKey;
      caseEmptyKey: TranslationKey;
      planFieldLabels: Record<CrisisPlanFieldId, TranslationKey>;
      aiTitleKey: TranslationKey;
      caseDescriptionKey: TranslationKey;
      caseActionsKey: TranslationKey;
      caseOutcomeKey: TranslationKey;
    };
  };
};

export const crisisManagementPage: CrisisManagementPageContent = {
  hero: {
    badgeKey: "crisis.hero.badge" as TranslationKey,
    titleKey: "crisis.hero.title" as TranslationKey,
    subtitleKey: "crisis.hero.subtitle" as TranslationKey,
    actions: [
      { href: "#plan", labelKey: "crisis.hero.primary" as TranslationKey, variant: "primary" },
      { href: "#checklist", labelKey: "crisis.hero.secondary" as TranslationKey, variant: "outline" }
    ],
    quickNav: [
      { href: "#resilience", labelKey: "crisis.quick.resilience" as TranslationKey },
      { href: "#checklist", labelKey: "crisis.quick.checklist" as TranslationKey },
      { href: "#plan", labelKey: "crisis.quick.plan" as TranslationKey },
      { href: "#cases", labelKey: "crisis.quick.cases" as TranslationKey },
      { href: "#export", labelKey: "crisis.quick.export" as TranslationKey }
    ],
    bullets: [
      {
        icon: "🧭",
        titleKey: "crisis.hero.point1.title" as TranslationKey,
        textKey: "crisis.hero.point1.text" as TranslationKey
      },
      {
        icon: "🛟",
        titleKey: "crisis.hero.point2.title" as TranslationKey,
        textKey: "crisis.hero.point2.text" as TranslationKey
      }
    ],
    card: {
      badgeKey: "crisis.hero.card.badge" as TranslationKey,
      titleKey: "crisis.hero.card.title" as TranslationKey,
      textKey: "crisis.hero.card.text" as TranslationKey,
      items: [
        "crisis.hero.card.item1" as TranslationKey,
        "crisis.hero.card.item2" as TranslationKey,
        "crisis.hero.card.item3" as TranslationKey
      ],
      theme: {
        light: {
          background: "#fff7ed",
          border: "rgba(249, 115, 22, 0.22)",
          shadow: "0 28px 48px rgba(249, 115, 22, 0.18)"
        },
        dark: {
          background: "rgba(15, 23, 42, 0.85)",
          border: "rgba(253, 186, 116, 0.35)",
          shadow: "0 36px 70px rgba(2, 6, 23, 0.7)"
        }
      }
    }
  },
  resilience: {
    badgeKey: "crisis.resilience.badge" as TranslationKey,
    titleKey: "crisis.resilience.title" as TranslationKey,
    leadKey: "crisis.resilience.lead" as TranslationKey,
    pillars: [
      {
        id: "community",
        icon: iconPath("groups.svg"),
        titleKey: "crisis.resilience.community.title" as TranslationKey,
        descriptionKey: "crisis.resilience.community.text" as TranslationKey
      },
      {
        id: "communications",
        icon: iconPath("communication.svg"),
        titleKey: "crisis.resilience.communications.title" as TranslationKey,
        descriptionKey: "crisis.resilience.communications.text" as TranslationKey
      },
      {
        id: "infrastructure",
        icon: iconPath("Infrastructure.svg"),
        titleKey: "crisis.resilience.infrastructure.title" as TranslationKey,
        descriptionKey: "crisis.resilience.infrastructure.text" as TranslationKey
      },
      {
        id: "security",
        icon: iconPath("safety.svg"),
        titleKey: "crisis.resilience.security.title" as TranslationKey,
        descriptionKey: "crisis.resilience.security.text" as TranslationKey
      }
    ]
  },
  checklist: {
    badgeKey: "crisis.checklist.badge" as TranslationKey,
    titleKey: "crisis.checklist.title" as TranslationKey,
    leadKey: "crisis.checklist.lead" as TranslationKey,
    helperKey: "crisis.checklist.helper" as TranslationKey,
    customHintKey: "crisis.checklist.customHint" as TranslationKey,
    addPlaceholderKey: "crisis.checklist.add.placeholder" as TranslationKey,
    addButtonKey: "crisis.checklist.add.button" as TranslationKey,
    emptyNoticeKey: "crisis.checklist.notice.empty" as TranslationKey,
    items: [
      {
        id: "community",
        icon: iconPath("groups.svg"),
        titleKey: "crisis.checklist.items.community.title" as TranslationKey,
        descriptionKey: "crisis.checklist.items.community.text" as TranslationKey
      },
      {
        id: "communications",
        icon: iconPath("communication.svg"),
        titleKey: "crisis.checklist.items.communications.title" as TranslationKey,
        descriptionKey: "crisis.checklist.items.communications.text" as TranslationKey
      },
      {
        id: "infrastructure",
        icon: iconPath("Infrastructure.svg"),
        titleKey: "crisis.checklist.items.infrastructure.title" as TranslationKey,
        descriptionKey: "crisis.checklist.items.infrastructure.text" as TranslationKey
      },
      {
        id: "security",
        icon: iconPath("safety.svg"),
        titleKey: "crisis.checklist.items.security.title" as TranslationKey,
        descriptionKey: "crisis.checklist.items.security.text" as TranslationKey
      }
    ]
  },
  plan: {
    badgeKey: "crisis.plan.badge" as TranslationKey,
    titleKey: "crisis.plan.title" as TranslationKey,
    leadKey: "crisis.plan.lead" as TranslationKey,
    helperKey: "crisis.plan.helper" as TranslationKey,
    toggle: {
      showKey: "crisis.plan.toggle.show" as TranslationKey,
      hideKey: "crisis.plan.toggle.hide" as TranslationKey
    },
    fields: [
      {
        id: "situation",
        type: "text",
        labelKey: "crisis.plan.fields.situation.label" as TranslationKey,
        placeholderKey: "crisis.plan.fields.situation.placeholder" as TranslationKey
      },
      {
        id: "triggers",
        type: "textarea",
        rows: 2,
        labelKey: "crisis.plan.fields.triggers.label" as TranslationKey,
        placeholderKey: "crisis.plan.fields.triggers.placeholder" as TranslationKey
      },
      {
        id: "responsibles",
        type: "text",
        labelKey: "crisis.plan.fields.responsibles.label" as TranslationKey,
        placeholderKey: "crisis.plan.fields.responsibles.placeholder" as TranslationKey
      },
      {
        id: "actions",
        type: "textarea",
        rows: 3,
        labelKey: "crisis.plan.fields.actions.label" as TranslationKey,
        placeholderKey: "crisis.plan.fields.actions.placeholder" as TranslationKey
      },
      {
        id: "internal",
        type: "textarea",
        rows: 2,
        labelKey: "crisis.plan.fields.internal.label" as TranslationKey,
        placeholderKey: "crisis.plan.fields.internal.placeholder" as TranslationKey
      },
      {
        id: "external",
        type: "textarea",
        rows: 2,
        labelKey: "crisis.plan.fields.external.label" as TranslationKey,
        placeholderKey: "crisis.plan.fields.external.placeholder" as TranslationKey
      },
      {
        id: "resources",
        type: "textarea",
        rows: 2,
        labelKey: "crisis.plan.fields.resources.label" as TranslationKey,
        placeholderKey: "crisis.plan.fields.resources.placeholder" as TranslationKey
      },
      {
        id: "lessons",
        type: "textarea",
        rows: 2,
        labelKey: "crisis.plan.fields.lessons.label" as TranslationKey,
        placeholderKey: "crisis.plan.fields.lessons.placeholder" as TranslationKey
      }
    ],
    ai: {
      buttonKey: "crisis.plan.ai.button" as TranslationKey,
      helperKey: "crisis.plan.ai.helper" as TranslationKey,
      messages: {
        emptyKey: "crisis.plan.ai.messages.empty" as TranslationKey,
        missingKeyKey: "crisis.plan.ai.messages.missingKey" as TranslationKey,
        networkErrorKey: "crisis.plan.ai.messages.networkError" as TranslationKey
      },
      prompt: {
        systemKey: "crisis.plan.ai.prompt.system" as TranslationKey,
        templateKey: "crisis.plan.ai.prompt.template" as TranslationKey,
        toneKey: "crisis.plan.ai.prompt.tone" as TranslationKey,
        emptyValueKey: "crisis.plan.ai.prompt.emptyValue" as TranslationKey
      },
      result: {
        titleKey: "crisis.plan.ai.result.title" as TranslationKey,
        placeholderKey: "crisis.plan.ai.result.placeholder" as TranslationKey,
        loadingKey: "crisis.plan.ai.result.loading" as TranslationKey,
        disclaimerKey: "crisis.plan.ai.result.disclaimer" as TranslationKey,
        fallbackKey: "crisis.plan.ai.result.fallback" as TranslationKey
      }
    }
  },
  cases: {
    badgeKey: "crisis.cases.badge" as TranslationKey,
    titleKey: "crisis.cases.title" as TranslationKey,
    leadKey: "crisis.cases.lead" as TranslationKey,
    helperKey: "crisis.cases.helper" as TranslationKey,
    placeholderKey: "crisis.cases.placeholder" as TranslationKey,
    tiles: [
      {
        id: "publicEvent",
        icon: iconPath("campaign.svg"),
        titleKey: "crisis.cases.tiles.public.title" as TranslationKey,
        descriptionKey: "crisis.cases.tiles.public.text" as TranslationKey
      },
      {
        id: "reputation",
        icon: iconPath("cases.svg"),
        titleKey: "crisis.cases.tiles.reputation.title" as TranslationKey,
        descriptionKey: "crisis.cases.tiles.reputation.text" as TranslationKey
      },
      {
        id: "digital",
        icon: iconPath("safety.svg"),
        titleKey: "crisis.cases.tiles.digital.title" as TranslationKey,
        descriptionKey: "crisis.cases.tiles.digital.text" as TranslationKey
      }
    ],
    scenarios: [
      {
        id: "publicEvent",
        titleKey: "crisis.cases.scenarios.public.title" as TranslationKey,
        crisisKey: "crisis.cases.scenarios.public.crisis" as TranslationKey,
        actionsTitleKey: "crisis.cases.actions.title" as TranslationKey,
        actions: [
          "crisis.cases.scenarios.public.actions.0" as TranslationKey,
          "crisis.cases.scenarios.public.actions.1" as TranslationKey,
          "crisis.cases.scenarios.public.actions.2" as TranslationKey
        ],
        outcomeKey: "crisis.cases.scenarios.public.outcome" as TranslationKey
      },
      {
        id: "reputation",
        titleKey: "crisis.cases.scenarios.reputation.title" as TranslationKey,
        crisisKey: "crisis.cases.scenarios.reputation.crisis" as TranslationKey,
        actionsTitleKey: "crisis.cases.actions.title" as TranslationKey,
        actions: [
          "crisis.cases.scenarios.reputation.actions.0" as TranslationKey,
          "crisis.cases.scenarios.reputation.actions.1" as TranslationKey,
          "crisis.cases.scenarios.reputation.actions.2" as TranslationKey
        ],
        outcomeKey: "crisis.cases.scenarios.reputation.outcome" as TranslationKey
      },
      {
        id: "digital",
        titleKey: "crisis.cases.scenarios.digital.title" as TranslationKey,
        crisisKey: "crisis.cases.scenarios.digital.crisis" as TranslationKey,
        actionsTitleKey: "crisis.cases.actions.title" as TranslationKey,
        actions: [
          "crisis.cases.scenarios.digital.actions.0" as TranslationKey,
          "crisis.cases.scenarios.digital.actions.1" as TranslationKey,
          "crisis.cases.scenarios.digital.actions.2" as TranslationKey
        ],
        outcomeKey: "crisis.cases.scenarios.digital.outcome" as TranslationKey
      }
    ]
  },
  export: {
    titleKey: "crisis.export.title" as TranslationKey,
    descriptionKey: "crisis.export.description" as TranslationKey,
    buttonKey: "crisis.export.button" as TranslationKey,
    statusPreparingKey: "crisis.export.status.preparing" as TranslationKey,
    statusSuccessKey: "crisis.export.status.success" as TranslationKey,
    statusErrorKey: "crisis.export.status.error" as TranslationKey,
    pdf: {
      titleKey: "crisis.pdf.title" as TranslationKey,
      checklistSectionKey: "crisis.pdf.section.checklist" as TranslationKey,
      planSectionKey: "crisis.pdf.section.plan" as TranslationKey,
      aiSectionKey: "crisis.pdf.section.ai" as TranslationKey,
      caseSectionKey: "crisis.pdf.section.case" as TranslationKey,
      checklistStatusReadyKey: "crisis.pdf.status.ready" as TranslationKey,
      checklistStatusPendingKey: "crisis.pdf.status.pending" as TranslationKey,
      checklistTable: {
        statusKey: "crisis.pdf.table.status" as TranslationKey,
        itemKey: "crisis.pdf.table.item" as TranslationKey
      },
      planTable: {
        parameterKey: "crisis.pdf.plan.parameter" as TranslationKey,
        valueKey: "crisis.pdf.plan.value" as TranslationKey
      },
      planEmptyKey: "crisis.pdf.plan.empty" as TranslationKey,
      aiEmptyKey: "crisis.pdf.ai.empty" as TranslationKey,
      caseEmptyKey: "crisis.pdf.case.empty" as TranslationKey,
      planFieldLabels: {
        situation: "crisis.pdf.plan.fields.situation" as TranslationKey,
        triggers: "crisis.pdf.plan.fields.triggers" as TranslationKey,
        responsibles: "crisis.pdf.plan.fields.responsibles" as TranslationKey,
        actions: "crisis.pdf.plan.fields.actions" as TranslationKey,
        internal: "crisis.pdf.plan.fields.internal" as TranslationKey,
        external: "crisis.pdf.plan.fields.external" as TranslationKey,
        resources: "crisis.pdf.plan.fields.resources" as TranslationKey,
        lessons: "crisis.pdf.plan.fields.lessons" as TranslationKey
      },
      aiTitleKey: "crisis.pdf.ai.title" as TranslationKey,
      caseDescriptionKey: "crisis.pdf.case.description" as TranslationKey,
      caseActionsKey: "crisis.pdf.case.actions" as TranslationKey,
      caseOutcomeKey: "crisis.pdf.case.outcome" as TranslationKey
    }
  }
};

