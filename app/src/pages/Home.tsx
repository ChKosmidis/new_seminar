import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { homePage } from '../data/pages/home';

// UI Components
import HomeHero from '../components/hero/HomeHero';
import ModuleGrid from '../components/grid/ModuleGrid';
import AIFeedback from '../components/ai/AIFeedback';
import CTA from '../components/home/CTA';

// Icons
import { Box, CheckCircle2 } from 'lucide-react';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full overflow-hidden bg-paper dark:bg-graphite text-ink dark:text-ash">

      {/* --- HERO SECTION --- */}
      <HomeHero />

      {/* --- TICKER TAPE --- */}
      <div className="w-full bg-ink dark:bg-ash text-paper dark:text-graphite py-4 my-12 overflow-hidden border-y-2 border-orange relative z-20">
        <div className="flex whitespace-nowrap animate-marquee">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="flex items-center">
                {(homePage.ticker || []).map((key, idx) => (
                   <span key={`${i}-${idx}`} className="text-lg md:text-xl font-mono font-bold tracking-widest uppercase flex items-center px-8">
                      {t(key as any)} <span className="text-orange ml-8">•</span>
                   </span>
                ))}
             </div>
           ))}
        </div>
      </div>

      {/* --- OVERVIEW & STATS --- */}
      <motion.section
         id="about"
         className="py-20 md:py-24 bg-paper dark:bg-graphite"
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.8 }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
           {/* Left: Stats */}
           <div className="space-y-10">
              <div>
                <span className="font-mono text-orange uppercase tracking-widest text-sm mb-2 block">
                    {t(homePage.statsSection.eyebrowKey)}
                </span>
                <h2 className="text-5xl md:text-6xl font-display font-bold leading-tight">
                    {t(homePage.statsSection.titleKey)}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                 {homePage.stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="group border-l-4 border-ink/10 dark:border-white/10 pl-6 hover:border-orange transition-colors duration-300"
                    >
                       <div className="text-4xl md:text-5xl font-display font-bold mb-2 group-hover:text-orange transition-colors">{t(stat.valueKey)}</div>
                       <div className="text-sm font-mono text-ink/60 dark:text-neutral-500 uppercase tracking-wider">{t(stat.labelKey)}</div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Right: Text Block */}
           <div className="space-y-8 bg-ash/30 dark:bg-neutral-900/30 p-8 md:p-12 relative overflow-hidden border border-ink/5 dark:border-white/5">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <Box size={200} strokeWidth={1} />
              </div>

              <h3 className="text-2xl md:text-3xl font-display font-bold dark:text-neutral-200">{t(homePage.about.titleKey)}</h3>
              <p className="text-lg leading-relaxed text-ink/80 dark:text-neutral-400 font-light">
                 {t(homePage.about.textKey)}
              </p>

              <ul className="space-y-4 pt-6">
                 {homePage.about.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                       <CheckCircle2 className="w-5 h-5 text-success mt-1 shrink-0" />
                       <span className="text-ink/90 dark:text-neutral-300 font-medium">{t(item as any)}</span>
                    </li>
                 ))}
              </ul>
           </div>
        </div>
      </motion.section>

      {/* --- MODULES GRID --- */}
      <ModuleGrid />

      {/* --- AI FEEDBACK --- */}
      <AIFeedback />

      {/* --- CTA --- */}
      <CTA />

      <footer className="py-12 px-6 md:px-12 bg-paper dark:bg-graphite border-t border-ink/10 dark:border-white/10">
         <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 text-sm font-mono dark:text-neutral-500">
            <p>{t(homePage.footer.textKey)}</p>
            <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-success rounded-full" />
                {t(homePage.footer.noteKey)}
            </p>
         </div>
      </footer>

    </div>
  );
};

export default HomePage;
