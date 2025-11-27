import { useLanguage } from '../contexts/LanguageContext';
import { dictionaries } from '../data/i18n';
import type { TranslationKey } from '../data/i18n/types';

export const useTranslation = () => {
  const { language } = useLanguage();
  const dict = dictionaries[language];

  const t = (key: TranslationKey) => dict[key] ?? key;

  return { t, language };
};
