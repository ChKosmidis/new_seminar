import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import GhostButton from '../ui/GhostButton';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import type { TranslationKey } from '../../data/i18n/types';

// Assuming the homePage data structure is available or passed in.
// However, the previous Hero component took specific props.
// Given the refactor instructions to "rewrite the Hero... component",
// and the context of Home.tsx which uses `homePage` data object,
// I will design this Hero to accept the specific data it needs or be more flexible.
// To keep it clean and match the new Home.tsx usage, I'll stick to props but aligned with the new design.

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

const Hero = ({ data }: HeroProps) => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-12 gap-8 items-center relative z-10">

        {/* LEFT COLUMN: CONTENT (Cols 1-8) */}
        <div className="col-span-12 md:col-span-8 flex flex-col gap-8 md:gap-10">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 border border-ink/10 dark:border-white/10 rounded-none px-4 py-2 w-fit bg-white/50 dark:bg-white/5 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-success animate-pulse" />
            <span className="text-sm font-mono uppercase tracking-widest text-ink/60 dark:text-neutral-400">
              {t(data.badgeKey)}
            </span>
          </motion.div>

          {/* Typography: Massive Headers (Swiss Style) */}
          <div className="space-y-6">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-7xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.85] tracking-tight text-ink dark:text-neutral-200 uppercase break-words"
            >
               {t(data.titleKey)}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-ink/70 dark:text-neutral-400 max-w-2xl font-light leading-relaxed"
            >
              {t(data.subtitleKey)}
            </motion.p>
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link to={data.primaryCta.href}>
              <GhostButton className="bg-ink text-paper dark:bg-white dark:text-graphite hover:bg-orange dark:hover:bg-orange hover:text-white dark:hover:text-white w-full md:w-auto text-lg px-8 py-4">
                {t(data.primaryCta.labelKey)}
              </GhostButton>
            </Link>
            <a href={data.secondaryCta.href}>
              <GhostButton className="w-full md:w-auto text-lg px-8 py-4 dark:text-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-500">
                {t(data.secondaryCta.labelKey)}
              </GhostButton>
            </a>
          </motion.div>

          {/* Note */}
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.5 }}
             className="flex items-center gap-2 text-sm font-mono text-ink/40 dark:text-neutral-500 pt-2"
          >
            <CheckCircle2 className="w-4 h-4 text-orange" />
            {t(data.noteKey)}
          </motion.div>
        </div>

        {/* RIGHT COLUMN: EMPTY / DECORATIVE (Cols 9-12) */}
        <div className="col-span-12 md:col-span-4 hidden md:block relative h-full min-h-[400px]">
           {/* Decorative elements or Negative Space */}

           {/* Example Floating Element for visual interest, kept minimal as per Swiss Style */}
            <motion.div
               className="absolute right-0 top-1/4 bg-paper dark:bg-[#111] border border-ink/10 dark:border-white/10 p-6 shadow-xl z-20 max-w-[200px]"
               initial={{ x: 100, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.8, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
             >
                <div className="text-xs font-mono uppercase text-ink/40 dark:text-neutral-500 mb-2 border-b border-ink/10 dark:border-white/10 pb-2">
                   {t(data.floating.labelKey)}
                </div>
                <div className="font-display font-bold text-4xl text-orange">
                   {t(data.floating.valueKey)}
                </div>
             </motion.div>
        </div>

      </div>

      {/* Ticker at the bottom of hero or part of the layout?
          The original design had a ticker below the hero.
          I will leave it out of this component to keep it modular,
          Home.tsx can render it after.
      */}
    </section>
  );
};

export default Hero;
