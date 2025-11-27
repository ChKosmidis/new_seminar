import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import GhostButton from '../ui/GhostButton';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import type { TranslationKey } from '../../data/i18n/types';

interface HeroProps {
  data: {
    badgeKey: TranslationKey;
    titleKey: TranslationKey;
    subtitleKey: TranslationKey;
    primaryCta: { href: string; labelKey: TranslationKey };
    secondaryCta: { href: string; labelKey: TranslationKey };
    noteKey: TranslationKey;
    floating: {
        labelKey: TranslationKey;
        valueKey: TranslationKey;
    };
  };
}

const HomeHero = ({ data }: HeroProps) => {
  const { t } = useTranslation();

  return (
    <motion.section
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true, margin: "-100px" }}
       transition={{ duration: 0.8 }}
       className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col items-center text-center">

          {/* Badge */}
          <div className="mb-8 md:mb-12">
             <div className="inline-flex items-center gap-3 border border-ink/10 dark:border-white/10 rounded-none px-4 py-2 bg-white/50 dark:bg-white/5 backdrop-blur-sm">
               <span className="w-2 h-2 bg-success animate-pulse" />
               <span className="text-sm font-mono uppercase tracking-widest text-ink/60 dark:text-neutral-400">
                 {t(data.badgeKey)}
               </span>
             </div>
          </div>

          {/* Typography: Massive Headers (Swiss Style) - CENTERED */}
          <div className="space-y-8 max-w-5xl mx-auto mb-12">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tight text-ink dark:text-neutral-200 break-words">
               {t(data.titleKey)}
            </h1>

            <p className="text-xl md:text-2xl text-ink/70 dark:text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
              {t(data.subtitleKey)}
            </p>
          </div>

          {/* Actions - CENTERED */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link to={data.primaryCta.href}>
              <GhostButton className="bg-ink text-paper dark:bg-white dark:text-graphite hover:bg-orange dark:hover:bg-orange hover:text-white dark:hover:text-white w-full md:w-auto text-lg px-10 py-5">
                {t(data.primaryCta.labelKey)}
              </GhostButton>
            </Link>
            <a href={data.secondaryCta.href}>
              <GhostButton className="w-full md:w-auto text-lg px-10 py-5 dark:text-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-500">
                {t(data.secondaryCta.labelKey)}
              </GhostButton>
            </a>
          </div>

          {/* Note */}
          <div className="flex items-center gap-2 text-sm font-mono text-ink/40 dark:text-neutral-500">
            <CheckCircle2 className="w-4 h-4 text-orange" />
            {t(data.noteKey)}
          </div>

      </div>
    </motion.section>
  );
};

export default HomeHero;
