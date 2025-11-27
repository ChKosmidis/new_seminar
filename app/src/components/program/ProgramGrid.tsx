import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import type { TranslationKey } from '../../data/i18n/types';

interface ProgramCard {
  index: string;
  titleKey: TranslationKey;
  textKey: TranslationKey;
  href: string;
  icon?: string;
  iconAltKey?: TranslationKey;
}

interface ProgramGridProps {
  data: {
    readonly eyebrowKey: TranslationKey;
    readonly titleKey: TranslationKey;
    readonly textKey: TranslationKey;
    readonly openLabelKey: TranslationKey;
    readonly cards: ReadonlyArray<ProgramCard>;
  };
}

const ProgramGrid = ({ data }: ProgramGridProps) => {
  const { t } = useTranslation();

  return (
    <section id="sections-map" className="py-20 md:py-32 bg-ash/20 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header - Asymmetric Grid */}
        <div className="grid grid-cols-12 gap-8 mb-16">
           <div className="col-span-12 md:col-span-8">
              <motion.span
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="font-mono text-orange uppercase tracking-widest text-sm block mb-4"
              >
                {t(data.eyebrowKey)}
              </motion.span>
              <motion.h2
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-none dark:text-neutral-200"
              >
                {t(data.titleKey)}
              </motion.h2>
              <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="text-xl md:text-2xl text-ink/60 dark:text-neutral-400 max-w-2xl font-light"
              >
                {t(data.textKey)}
              </motion.p>
           </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.cards.map((card, idx) => (
            <Link to={card.href} key={idx} className="group h-full block">
              <motion.article
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1, duration: 0.5 }}
                 className="h-full border border-ink/10 dark:border-white/10 bg-paper dark:bg-[#111] p-8 transition-all duration-500 hover:border-orange hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden"
              >

                {/* Hover Fill Effect - Subtle */}
                <div className="absolute inset-0 bg-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex-grow">
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-mono text-xs font-bold border border-ink/20 dark:border-white/20 px-3 py-1 bg-white/50 dark:bg-black/50 dark:text-neutral-300 group-hover:bg-orange group-hover:text-white group-hover:border-orange transition-colors">
                      MOD {card.index}
                    </span>
                    <div className="text-ink/20 dark:text-white/20 group-hover:text-orange transition-colors duration-500">
                      <FileText size={28} strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-orange transition-colors duration-300 dark:text-neutral-200">
                    {t(card.titleKey)}
                  </h3>
                  <p className="text-ink/60 dark:text-neutral-400 leading-relaxed mb-8 text-sm md:text-base">
                    {t(card.textKey)}
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-3 text-sm font-bold uppercase tracking-wide opacity-60 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 group-hover:text-orange dark:text-neutral-400 dark:group-hover:text-orange mt-auto">
                  {t(data.openLabelKey)}
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramGrid;
