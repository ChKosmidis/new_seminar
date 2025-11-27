export const formatTemplate = (template: string, tokens: Record<string, string>) =>
  template.replace(/\{([^}]+)\}/g, (_, key) => tokens[key] ?? '');

export const extractAiText = (response: unknown): string => {
  if (
    typeof response === 'object' &&
    response !== null &&
    'candidates' in response &&
    Array.isArray((response as Record<string, unknown>).candidates)
  ) {
    const candidates = (response as {
      candidates: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    }).candidates;

    for (const candidate of candidates) {
      const parts = candidate.content?.parts;
      if (!parts) continue;
      const text = parts
        .map((part) => part.text ?? '')
        .join('\n')
        .trim();
      if (text) {
        return text;
      }
    }
  }

  return '';
};
