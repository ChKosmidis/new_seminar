import { en } from './en';
import { ru } from './ru';
import type { TranslationMap } from './types';

export const dictionaries: Record<'ru' | 'en', TranslationMap> = {
  ru,
  en
};
