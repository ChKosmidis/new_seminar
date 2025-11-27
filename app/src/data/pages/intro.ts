import type { TranslationKey } from '../i18n/types';

export const introPage = {
  hero: {
    badgeKey: 'intro.hero.badge' as TranslationKey,
    titleKey: 'intro.hero.title' as TranslationKey,
    subtitleKey: 'intro.hero.subtitle' as TranslationKey,
    actions: [
      { href: '#overview', labelKey: 'intro.hero.primary' as TranslationKey, variant: 'primary' as const },
      { href: '#interactive', labelKey: 'intro.hero.secondary' as TranslationKey, variant: 'outline' as const }
    ],
    quickNav: [
      { href: '#overview', labelKey: 'intro.quick.overview' as TranslationKey },
      { href: '#rights', labelKey: 'intro.quick.rights' as TranslationKey },
      { href: '#networking', labelKey: 'intro.quick.networking' as TranslationKey },
      { href: '#planning', labelKey: 'intro.quick.planning' as TranslationKey },
      { href: '#interactive', labelKey: 'intro.quick.interactive' as TranslationKey },
      { href: '#quiz', labelKey: 'intro.quick.quiz' as TranslationKey }
    ],
    bullets: [
      { icon: '3', titleKey: 'intro.hero.point1.title' as TranslationKey, textKey: 'intro.hero.point1.text' as TranslationKey },
      { icon: 'AI', titleKey: 'intro.hero.point2.title' as TranslationKey, textKey: 'intro.hero.point2.text' as TranslationKey }
    ],
    card: {
      badgeKey: 'intro.hero.card.badge' as TranslationKey,
      titleKey: 'intro.hero.card.title' as TranslationKey,
      textKey: 'intro.hero.card.text' as TranslationKey,
      items: [
        'intro.hero.card.item1' as TranslationKey,
        'intro.hero.card.item2' as TranslationKey,
        'intro.hero.card.item3' as TranslationKey
      ],
      theme: {
        light: {
          background: '#ffffff',
          border: 'rgba(15, 23, 42, 0.08)',
          shadow: 'var(--shadow-soft-light)'
        },
        dark: {
          background: 'rgba(15, 23, 42, 0.92)',
          border: 'rgba(96, 165, 250, 0.28)',
          shadow: '0 34px 60px rgba(2, 6, 23, 0.65)'
        }
      }
    }
  },
  sections: [
    {
      id: 'overview',
      icon: 'community.svg',
      iconAltKey: 'intro.overview.iconAlt' as TranslationKey,
      badgeKey: 'intro.overview.badge' as TranslationKey,
      titleKey: 'intro.overview.title' as TranslationKey,
      paragraphs: ['intro.overview.paragraph1' as TranslationKey, 'intro.overview.paragraph2' as TranslationKey],
      htmlKey: 'intro.overview.list' as TranslationKey
    },
    {
      id: 'rights',
      icon: 'rights.svg',
      iconAltKey: 'intro.rights.iconAlt' as TranslationKey,
      badgeKey: 'intro.rights.badge' as TranslationKey,
      titleKey: 'intro.rights.title' as TranslationKey,
      paragraphs: ['intro.rights.paragraph1' as TranslationKey, 'intro.rights.paragraph2' as TranslationKey],
      htmlKey: 'intro.rights.list' as TranslationKey
    },
    {
      id: 'networking',
      icon: 'communication.svg',
      iconAltKey: 'intro.networking.iconAlt' as TranslationKey,
      badgeKey: 'intro.networking.badge' as TranslationKey,
      titleKey: 'intro.networking.title' as TranslationKey,
      paragraphs: ['intro.networking.paragraph1' as TranslationKey, 'intro.networking.paragraph2' as TranslationKey],
      htmlKey: 'intro.networking.list' as TranslationKey
    },
    {
      id: 'planning',
      icon: 'practical.svg',
      iconAltKey: 'intro.planning.iconAlt' as TranslationKey,
      badgeKey: 'intro.planning.badge' as TranslationKey,
      titleKey: 'intro.planning.title' as TranslationKey,
      paragraphs: ['intro.planning.paragraph1' as TranslationKey, 'intro.planning.paragraph2' as TranslationKey],
      htmlKey: 'intro.planning.list' as TranslationKey
    }
  ]
} as const;

