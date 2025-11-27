import type { Language } from "../../contexts/LanguageContext";

export type ConceptType = 'direct_action' | 'networking' | 'hybrid';
export type QuizQuestionId = 'legal_form' | 'ngo_definition' | 'hr_focus' | 'networking' | 'state_support';
export type QuizOptionId =
  | 'public_org'
  | 'fund'
  | 'joint_stock'
  | 'ano'
  | 'benefit'
  | 'profit'
  | 'support'
  | 'advocacy'
  | 'monitoring'
  | 'commerce'
  | 'games'
  | 'sports'
  | 'isolation'
  | 'merge'
  | 'coordination'
  | 'competition'
  | 'audience'
  | 'slogan'
  | 'revenue'
  | 'ignoreRisks';

type IntroLocaleStrings = {
  concept: {
    emptyFields: string;
    typeLabels: Record<ConceptType, string>;
    typeFocus: Record<ConceptType, string>;
    prompts: string[];
    fallbackJustification: string;
    copyTemplate: string;
    copySuccess: string;
    copyError: string;
  };
  feedback: {
    intro: string;
    structure: string;
    justification: string;
    risks: string;
    nextSteps: string;
    closing: string;
  };
  quiz: {
    questions: Record<QuizQuestionId, { question: string; options: Partial<Record<QuizOptionId, string>> }>;

    validation: string;
    labels: [string, string];
    resultTemplate: string;
  };
};

export const introInteractiveLocales: Record<Language, IntroLocaleStrings> = {
  "ru": {
    "concept": {
      "emptyFields": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0432\u0441\u0435 \u043f\u043e\u043b\u044f, \u0447\u0442\u043e\u0431\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0430\u0446\u0438\u0438.",
      "typeLabels": {
        "direct_action": "\u041e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f \u043f\u0440\u044f\u043c\u043e\u0433\u043e \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f",
        "networking": "\u041d\u0435\u0442\u0432\u043e\u0440\u043a\u0438\u043d\u0433/\u0440\u0435\u0441\u0443\u0440\u0441\u043d\u044b\u0439 \u0446\u0435\u043d\u0442\u0440",
        "hybrid": "\u0413\u0438\u0431\u0440\u0438\u0434\u043d\u044b\u0439 \u0444\u043e\u0440\u043c\u0430\u0442"
      },
      "typeFocus": {
        "direct_action": "\u0421\u043e\u0441\u0440\u0435\u0434\u043e\u0442\u043e\u0447\u044c\u0442\u0435\u0441\u044c \u043d\u0430 \u0440\u0435\u0433\u0443\u043b\u044f\u0440\u043d\u043e\u043c \u043c\u043e\u043d\u0438\u0442\u043e\u0440\u0438\u043d\u0433\u0435, \u043e\u043f\u0435\u0440\u0430\u0442\u0438\u0432\u043d\u043e\u0439 \u043f\u043e\u043c\u043e\u0449\u0438 \u0438 \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u044b\u0445 \u043a\u0430\u043d\u0430\u043b\u0430\u0445 \u0441\u0432\u044f\u0437\u0438.",
        "networking": "\u041f\u0440\u043e\u0434\u0443\u043c\u0430\u0439\u0442\u0435 \u0441\u0435\u0440\u0432\u0438\u0441\u044b \u0434\u043b\u044f \u043f\u0430\u0440\u0442\u043d\u0451\u0440\u043e\u0432: \u043e\u0431\u043c\u0435\u043d \u0437\u043d\u0430\u043d\u0438\u044f\u043c\u0438, \u0440\u0435\u0433\u0443\u043b\u044f\u0440\u043d\u044b\u0435 \u0432\u0441\u0442\u0440\u0435\u0447\u0438, \u0431\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0443 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u043e\u0432.",
        "hybrid": "\u0420\u0430\u0437\u0434\u0435\u043b\u0438\u0442\u0435 \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0441\u0442\u044c: \u043e\u0434\u043d\u0430 \u043a\u043e\u043c\u0430\u043d\u0434\u0430 \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442 \u0441 \u043a\u0435\u0439\u0441\u0430\u043c\u0438, \u0434\u0440\u0443\u0433\u0430\u044f \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u0435\u0442 \u0441\u043e\u043e\u0431\u0449\u0435\u0441\u0442\u0432\u043e \u0438 \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u044b."
      },
      "prompts": [
        "\u041e\u043f\u0438\u0448\u0438\u0442\u0435 \u0442\u0440\u0438 \u043f\u0435\u0440\u0432\u044b\u0445 \u0448\u0430\u0433\u0430: \u0447\u0442\u043e \u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u0435 \u0438 \u043a\u0430\u043a\u0438\u0435 \u0440\u0435\u0441\u0443\u0440\u0441\u044b \u043d\u0443\u0436\u043d\u044b?",
        "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043f\u0430\u0440\u0442\u043d\u0451\u0440\u043e\u0432 \u2014 \u044d\u0442\u043e \u0443\u0441\u043a\u043e\u0440\u0438\u0442 \u0441\u0442\u0430\u0440\u0442 \u0438 \u043f\u043e\u0432\u044b\u0441\u0438\u0442 \u0443\u0441\u0442\u043e\u0439\u0447\u0438\u0432\u043e\u0441\u0442\u044c.",
        "\u0417\u0430\u043f\u043b\u0430\u043d\u0438\u0440\u0443\u0439\u0442\u0435 \u0437\u0430\u0431\u043e\u0442\u0443 \u043e \u043a\u043e\u043c\u0430\u043d\u0434\u0435 \u0438 \u043f\u0440\u0430\u0432\u0438\u043b\u0430 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u0438 \u2014 \u044d\u0442\u043e \u043a\u0440\u0438\u0442\u0438\u0447\u043d\u043e \u0432 \u043f\u0440\u0430\u0432\u043e\u0437\u0430\u0449\u0438\u0442\u043d\u043e\u0439 \u0440\u0430\u0431\u043e\u0442\u0435."
      ],
      "fallbackJustification": "\u041e\u0431\u043e\u0441\u043d\u043e\u0432\u0430\u043d\u0438\u0435 \u043f\u043e\u043a\u0430 \u043d\u0435 \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u043e, \u0434\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0439.",
      "copySuccess": "\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043e",
      "copyError": "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0441\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0442\u0435\u043a\u0441\u0442",
      "copyTemplate": "\\u041f\\u0440\\u043e\\u0431\\u043b\\u0435\\u043c\\u0430: {problem}\\n\\u0424\\u043e\\u0440\\u043c\\u0430\\u0442 \\u041d\\u041a\\u041e: {typeLabel}\\n\\u041e\\u0431\\u043e\\u0441\\u043d\\u043e\\u0432\\u0430\\u043d\\u0438\\u0435: {justification}"
    },
    "feedback": {
      "intro": "\u0427\u0442\u043e \u0432\u0438\u0434\u0438\u0442 \u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043d\u0442:",
      "structure": "\u0412\u044b \u0432\u044b\u0431\u0440\u0430\u043b\u0438 {typeLabel}. \u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044c, \u0447\u0442\u043e \u043a\u043e\u043c\u0430\u043d\u0434\u0430 \u043f\u043e\u043d\u0438\u043c\u0430\u0435\u0442 \u0444\u043e\u0440\u043c\u0430\u0442 \u0438 \u0440\u0430\u0441\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u0438\u0435 \u0440\u043e\u043b\u0435\u0439.",
      "justification": "\u041e\u0431\u043e\u0441\u043d\u043e\u0432\u0430\u043d\u0438\u0435 \u043c\u043e\u0436\u043d\u043e \u0443\u0441\u0438\u043b\u0438\u0442\u044c: \u0434\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u0438\u0437\u043c\u0435\u0440\u0438\u043c\u044b\u0439 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u0438 \u043e\u0431\u043e\u0437\u043d\u0430\u0447\u044c\u0442\u0435, \u043a\u043e\u0433\u043e \u0432\u043e\u0432\u043b\u0435\u043a\u0430\u0435\u0442\u0435. \u0421\u0435\u0439\u0447\u0430\u0441 \u043e\u043d\u043e \u0437\u0432\u0443\u0447\u0438\u0442 \u0442\u0430\u043a: {justificationText}.",
      "risks": "\u0417\u0430\u043a\u0440\u0435\u043f\u0438\u0442\u0435 \u0431\u0430\u0437\u043e\u0432\u044b\u0435 \u043f\u0440\u0430\u0432\u0438\u043b\u0430 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u0438: \u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435 \u0434\u0430\u043d\u043d\u044b\u0445, \u0440\u0435\u0430\u0433\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u043d\u0430 \u0440\u0438\u0441\u043a\u0438 \u0438 \u043f\u0443\u0431\u043b\u0438\u0447\u043d\u044b\u0435 \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438.",
      "nextSteps": "\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0435 \u0448\u0430\u0433\u0438:",
      "closing": "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u0435 \u0437\u0430\u043c\u0435\u0442\u043a\u0443 \u0432 PDF/Notion \u2014 \u043e\u043d\u0430 \u043f\u0440\u0438\u0433\u043e\u0434\u0438\u0442\u0441\u044f \u0432 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0445 \u043c\u043e\u0434\u0443\u043b\u044f\u0445."
    },
    "quiz": {
      "questions": {
        "legal_form": {
          "question": "\u041a\u0430\u043a\u0430\u044f \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u043e\u043d\u043d\u043e-\u043f\u0440\u0430\u0432\u043e\u0432\u0430\u044f \u0444\u043e\u0440\u043c\u0430 \u043d\u0435 \u043f\u043e\u0434\u0445\u043e\u0434\u0438\u0442 \u0434\u043b\u044f \u041d\u041a\u041e \u0432 \u0420\u043e\u0441\u0441\u0438\u0438?",
          "options": {
            "public_org": "\u041e\u0431\u0449\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u0430\u044f \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f",
            "fund": "\u0424\u043e\u043d\u0434",
            "joint_stock": "\u0410\u043a\u0446\u0438\u043e\u043d\u0435\u0440\u043d\u043e\u0435 \u043e\u0431\u0449\u0435\u0441\u0442\u0432\u043e",
            "ano": "\u0410\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u0430\u044f \u043d\u0435\u043a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0430\u044f \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f"
          }
        },
        "ngo_definition": {
          "question": "\u0427\u0442\u043e \u0438\u0437 \u043f\u0435\u0440\u0435\u0447\u0438\u0441\u043b\u0435\u043d\u043d\u043e\u0433\u043e \u043d\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043f\u0440\u0438\u0437\u043d\u0430\u043a\u043e\u043c \u041d\u041a\u041e?",
          "options": {
            "benefit": "\u0414\u0435\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c \u0432 \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u0430\u0445 \u043e\u0431\u0449\u0435\u0441\u0442\u0432\u0430",
            "profit": "\u041f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u0435 \u043f\u0440\u0438\u0431\u044b\u043b\u0438 \u043a\u0430\u043a \u043e\u0441\u043d\u043e\u0432\u043d\u043e\u0439 \u0446\u0435\u043b\u0438",
            "support": "\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430 \u0443\u044f\u0437\u0432\u0438\u043c\u044b\u0445 \u0433\u0440\u0443\u043f\u043f",
            "advocacy": "\u0410\u0434\u0432\u043e\u043a\u0430\u0446\u0438\u044f \u0438 \u043f\u0440\u043e\u0441\u0432\u0435\u0449\u0435\u043d\u0438\u0435"
          }
        },
        "hr_focus": {
          "question": "\u0427\u0442\u043e \u043e\u0442\u043d\u043e\u0441\u0438\u0442\u0441\u044f \u043a \u043a\u043b\u044e\u0447\u0435\u0432\u044b\u043c \u0437\u0430\u0434\u0430\u0447\u0430\u043c \u043f\u0440\u0430\u0432\u043e\u0437\u0430\u0449\u0438\u0442\u043d\u044b\u0445 \u041d\u041a\u041e?",
          "options": {
            "monitoring": "\u041c\u043e\u043d\u0438\u0442\u043e\u0440\u0438\u043d\u0433 \u0438 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u043d\u0430\u0440\u0443\u0448\u0435\u043d\u0438\u0439",
            "commerce": "\u041e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f \u043a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u0438\u0445 \u0432\u044b\u0441\u0442\u0430\u0432\u043e\u043a",
            "games": "\u0420\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u043a\u043e\u043c\u043f\u044c\u044e\u0442\u0435\u0440\u043d\u044b\u0445 \u0438\u0433\u0440",
            "sports": "\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u0441\u043f\u043e\u0440\u0442\u0438\u0432\u043d\u044b\u0445 \u043a\u043b\u0443\u0431\u043e\u0432"
          }
        },
        "networking": {
          "question": "\u0421\u0435\u0442\u0435\u0432\u043e\u0435 \u0432\u0437\u0430\u0438\u043c\u043e\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 (\u043d\u0435\u0442\u0432\u043e\u0440\u043a\u0438\u043d\u0433) \u043f\u043e\u043c\u043e\u0433\u0430\u0435\u0442 \u041d\u041a\u041e\u2026",
          "options": {
            "isolation": "\u0418\u0437\u043e\u043b\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f \u043e\u0442 \u0432\u043d\u0435\u0448\u043d\u0435\u0433\u043e \u043c\u0438\u0440\u0430",
            "merge": "\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u0441\u043b\u0438\u0432\u0430\u0442\u044c\u0441\u044f \u0432 \u043e\u0434\u043d\u0443 \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044e",
            "coordination": "\u041e\u0431\u043c\u0435\u043d\u0438\u0432\u0430\u0442\u044c\u0441\u044f \u043e\u043f\u044b\u0442\u043e\u043c \u0438 \u043a\u043e\u043e\u0440\u0434\u0438\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0443\u0441\u0438\u043b\u0438\u044f",
            "competition": "\u041f\u043e\u0432\u044b\u0448\u0430\u0442\u044c \u043a\u043e\u043d\u043a\u0443\u0440\u0435\u043d\u0446\u0438\u044e \u043c\u0435\u0436\u0434\u0443 \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f\u043c\u0438"
          }
        },
        "state_support": {
          "question": "\u0427\u0442\u043e \u0432\u0430\u0436\u043d\u043e \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u043f\u0440\u0438 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0438 \u0431\u0443\u0434\u0443\u0449\u0435\u0439 \u041d\u041a\u041e?",
          "options": {
            "audience": "\u0426\u0435\u043b\u0435\u0432\u0443\u044e \u0430\u0443\u0434\u0438\u0442\u043e\u0440\u0438\u044e \u0438 \u0435\u0451 \u043f\u043e\u0442\u0440\u0435\u0431\u043d\u043e\u0441\u0442\u0438",
            "slogan": "\u0422\u043e\u043b\u044c\u043a\u043e \u0441\u043b\u043e\u0433\u0430\u043d \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u0438",
            "revenue": "\u041f\u043b\u0430\u043d \u043f\u043e \u043f\u0440\u043e\u0434\u0430\u0436\u0435 \u043f\u0440\u043e\u0434\u0443\u043a\u0446\u0438\u0438",
            "ignoreRisks": "\u0420\u0435\u0448\u0435\u043d\u0438\u0435 \u0438\u0433\u043d\u043e\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0440\u0438\u0441\u043a\u0438"
          }
        }
      },
      "validation": "\u041e\u0442\u0432\u0435\u0442\u044c\u0442\u0435 \u043d\u0430 \u0432\u0441\u0435 \u0432\u043e\u043f\u0440\u043e\u0441\u044b, \u0447\u0442\u043e\u0431\u044b \u0443\u0432\u0438\u0434\u0435\u0442\u044c \u043e\u0442\u0447\u0451\u0442.",
      "labels": [
        "\u041f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u044b\u0435 \u043e\u0442\u0432\u0435\u0442\u044b",
        "\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u044b\u0435 \u043e\u0442\u0432\u0435\u0442\u044b"
      ],
      "resultTemplate": "\\u0412\\u0430\\u0448 \\u0440\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442: {score} \\u0438\\u0437 {total} ({percentage}%)"
    }
  },
  "en": {
    "concept": {
      "emptyFields": "Please fill in every field to receive recommendations.",
      "typeLabels": {
        "direct_action": "Direct-action organisation",
        "networking": "Networking/resource hub",
        "hybrid": "Hybrid format"
      },
      "typeFocus": {
        "direct_action": "Focus on regular monitoring, rapid response and clear communication channels.",
        "networking": "Design services for peers: knowledge exchange, convenings and shared toolkits.",
        "hybrid": "Split responsibilities: one stream works with cases, the other nurtures the community and standards."
      },
      "prompts": [
        "Write down three first actions: what launches first and which resources are required?",
        "List partners to collaborate with \u2014 it speeds up launch and boosts resilience.",
        "Plan wellbeing and security routines for the team \u2014 human rights work needs them."
      ],
      "fallbackJustification": "Add a short justification to keep the plan consistent.",
      "copySuccess": "Copied",
      "copyError": "Copy failed",
      "copyTemplate": "Problem: {problem}\\nNGO format: {typeLabel}\\nJustification: {justification}"
    },
    "feedback": {
      "intro": "Assistant notice:",
      "structure": "You chose {typeLabel}. Make sure the team understands the format and role allocation.",
      "justification": "Strengthen the justification with tangible outcomes and mention who is involved. It currently reads: {justificationText}.",
      "risks": "Document security routines: data handling, crisis response and responsible communications.",
      "nextSteps": "Next steps:",
      "closing": "Store these notes in PDF/Notion \u2014 they will support the next sessions."
    },
    "quiz": {
      "questions": {
        "legal_form": {
          "question": "Which legal form is not suitable for NGOs in Russia?",
          "options": {
            "public_org": "Public organisation",
            "fund": "Charitable fund",
            "joint_stock": "Joint-stock company",
            "ano": "Autonomous non-profit organisation"
          }
        },
        "ngo_definition": {
          "question": "Which of the following is not a characteristic of an NGO?",
          "options": {
            "benefit": "Serving public benefit",
            "profit": "Profit as the primary goal",
            "support": "Supporting vulnerable groups",
            "advocacy": "Advocacy and education"
          }
        },
        "hr_focus": {
          "question": "Which task belongs to human rights NGOs?",
          "options": {
            "monitoring": "Monitoring and documenting violations",
            "commerce": "Running commercial fairs",
            "games": "Developing video games",
            "sports": "Setting up sports clubs"
          }
        },
        "networking": {
          "question": "Networking helps NGOs to\u2026",
          "options": {
            "isolation": "Isolate from the outside world",
            "merge": "Merge into one organisation by default",
            "coordination": "Exchange experience and coordinate efforts",
            "competition": "Increase competition between organisations"
          }
        },
        "state_support": {
          "question": "What is essential when describing your future NGO?",
          "options": {
            "audience": "Target audience and their needs",
            "slogan": "Only the organisation slogan",
            "revenue": "Sales projection for products",
            "ignoreRisks": "Decision to ignore risks"
          }
        }
      },
      "validation": "Answer every question to see the report.",
      "labels": [
        "Correct answers",
        "Incorrect answers"
      ],
      "resultTemplate": "Your result: {score} of {total} ({percentage}%)"
    }
  }
} as const;

export type IntroLocalesMap = typeof introInteractiveLocales;

export const introQuizBlueprint = [
  {
    "id": "legal_form",
    "options": [
      {
        "id": "public_org"
      },
      {
        "id": "fund"
      },
      {
        "id": "joint_stock",
        "correct": true
      },
      {
        "id": "ano"
      }
    ]
  },
  {
    "id": "ngo_definition",
    "options": [
      {
        "id": "benefit"
      },
      {
        "id": "profit",
        "correct": true
      },
      {
        "id": "support"
      },
      {
        "id": "advocacy"
      }
    ]
  },
  {
    "id": "hr_focus",
    "options": [
      {
        "id": "monitoring",
        "correct": true
      },
      {
        "id": "commerce"
      },
      {
        "id": "games"
      },
      {
        "id": "sports"
      }
    ]
  },
  {
    "id": "networking",
    "options": [
      {
        "id": "isolation"
      },
      {
        "id": "merge"
      },
      {
        "id": "coordination",
        "correct": true
      },
      {
        "id": "competition"
      }
    ]
  },
  {
    "id": "state_support",
    "options": [
      {
        "id": "audience",
        "correct": true
      },
      {
        "id": "slogan"
      },
      {
        "id": "revenue"
      },
      {
        "id": "ignoreRisks"
      }
    ]
  }
] as const;

