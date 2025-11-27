import type { TranslationKey } from './i18n/types';

export interface ModuleLink {
  id: string;
  href: string;
  labelKey: TranslationKey;
}

export const modules: ModuleLink[] = [
  { id: '0', href: '/modules/0-introduction', labelKey: 'modules.list.0' as TranslationKey },
  { id: '1', href: '/modules/1-community-building', labelKey: 'modules.list.1' as TranslationKey },
  { id: '2', href: '/modules/2-internal-communications', labelKey: 'modules.list.2' as TranslationKey },
  { id: '3', href: '/modules/3-infrastructure', labelKey: 'modules.list.3' as TranslationKey },
  { id: '4', href: '/modules/4-legal-and-security', labelKey: 'modules.list.4' as TranslationKey },
  { id: '5', href: '/modules/5-effectiveness-and-development', labelKey: 'modules.list.5' as TranslationKey },
  { id: '6', href: '/modules/6-crisis-management', labelKey: 'modules.list.6' as TranslationKey },
  { id: '7', href: '/modules/7-fundraising', labelKey: 'modules.list.7' as TranslationKey },
  { id: '8', href: '/modules/8-cases-and-practice', labelKey: 'modules.list.8' as TranslationKey }
];
