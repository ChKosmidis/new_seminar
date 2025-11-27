import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { homePage } from '../data/pages/home';

// UI Components
import HomeHero from '../components/hero/HomeHero';
import ProgramGrid from '../components/program/ProgramGrid';
import AIFeedback from '../components/ai/AIFeedback';
import BrutalistList, { type BrutalistListItem } from '../components/ui/BrutalistList';

// Icons
import { Box, Zap, TrendingUp, Monitor, CheckCircle2 } from 'lucide-react';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full overflow-hidden bg-paper dark:bg-graphite text-ink dark:text-ash">

      {/* --- HERO SECTION --- */}
      <HomeHero data={homePage.hero} />

      {/* --- TICKER TAPE --- */}
      <div className="w-full bg-ink dark:bg-ash text-paper dark:text-graphite py-3 overflow-hidden border-y-2 border-orange">
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
      <section id="about" className="py-20 md:py-32 bg-paper dark:bg-graphite">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
           {/* Left: Stats with Asymmetric Alignment */}
           <div className="space-y-10">
              <div>
                <motion.span
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   className="font-mono text-orange uppercase tracking-widest text-sm mb-2 block"
                >
                    {t(homePage.statsSection.eyebrowKey)}
                </motion.span>
                <motion.h2
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="text-5xl md:text-6xl font-display font-bold leading-tight"
                >
                    {t(homePage.statsSection.titleKey)}
                </motion.h2>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                 {homePage.stats.map((stat, idx) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx}
                        className="group border-l-4 border-ink/10 dark:border-white/10 pl-6 hover:border-orange transition-colors duration-300"
                    >
                       <div className="text-4xl md:text-5xl font-display font-bold mb-2 group-hover:text-orange transition-colors">{t(stat.valueKey)}</div>
                       <div className="text-sm font-mono text-ink/60 dark:text-neutral-500 uppercase tracking-wider">{t(stat.labelKey)}</div>
                    </motion.div>
                 ))}
              </div>
           </div>

           {/* Right: Text Block */}
           <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="space-y-8 bg-ash/30 dark:bg-neutral-900/30 p-8 md:p-12 relative overflow-hidden border border-ink/5 dark:border-white/5"
            >
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
           </motion.div>
        </div>
      </section>

      {/* --- MODULES GRID --- */}
      <ProgramGrid data={homePage.sections} />

      {/* --- PROGRAM BLOCKS (Brutalist Lists) --- */}
      <section id="program" className="py-20 md:py-32 bg-paper dark:bg-graphite">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4 space-y-8">
               <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="font-mono text-orange uppercase tracking-widest text-sm"
                >
                  {t(homePage.program.eyebrowKey)}
               </motion.span>
               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-6xl font-display font-bold leading-[0.9] dark:text-neutral-200"
                >
                  {t(homePage.program.titleKey)}
               </motion.h2>
               <p className="text-lg text-ink/70 dark:text-neutral-400 font-light">
                  {t(homePage.program.textKey)}
               </p>

               <div className="hidden lg:block pt-12">
                   <div className="w-16 h-1 bg-orange mb-6" />
                   <p className="text-sm font-mono opacity-50 uppercase dark:text-neutral-500">
                      Curriculum Version 2.0.4<br/>
                      Last Updated: Oct 2023
                   </p>
               </div>
            </div>

            <div className="lg:col-span-8 space-y-16">
               {homePage.program.blocks.map((block, idx) => {
                  // Transform links to BrutalistList items
                  const listItems: BrutalistListItem[] = block.links.map((link, lIdx) => ({
                     id: lIdx + 1,
                     label: t(link.labelKey),
                     href: link.href,
                     value: 'OPEN' // Or some other metadata if available
                  }));

                  return (
                     <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold font-display flex items-center gap-4 dark:text-neutral-200">
                            <span className="w-8 h-8 bg-ink text-paper dark:bg-white dark:text-black rounded-full flex items-center justify-center text-sm font-mono">{idx + 1}</span>
                            {t(block.titleKey)}
                        </h3>
                        <BrutalistList items={listItems} />
                     </motion.div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* --- AI FEEDBACK --- */}
      <section id="ai-feedback" className="py-20 md:py-32 bg-ink text-paper dark:bg-[#050505] dark:text-ash relative overflow-hidden">
         {/* Abstract BG - Reduced for cleaner look */}
         <div className="absolute top-0 right-0 w-2/3 h-full bg-orange/5 skew-x-12 transform origin-top-right pointer-events-none" />

         <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Column: Text (Asymmetric) */}
            <div className="order-2 lg:order-1">
               <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="font-mono text-orange uppercase tracking-widest text-sm block mb-4"
               >
                  {t(homePage.feedback.eyebrowKey)}
               </motion.span>
               <motion.h2
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="text-5xl md:text-6xl font-display font-bold mb-8 leading-[0.9] dark:text-neutral-200"
                >
                  {t(homePage.feedback.titleKey)}
               </motion.h2>
               <motion.p
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.1 }}
                   className="text-xl opacity-80 mb-12 max-w-lg font-light dark:text-neutral-400"
                >
                  {t(homePage.feedback.textKey)}
               </motion.p>

               <div className="grid gap-8">
                  {homePage.feedback.items.map((item, idx) => (
                     <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + (idx * 0.1) }}
                        key={idx}
                        className="flex gap-6 border-l-2 border-orange/30 pl-6 py-2"
                    >
                        <div className="mt-1 shrink-0">
                           {idx === 0 && <Zap className="text-orange w-8 h-8" />}
                           {idx === 1 && <Monitor className="text-orange w-8 h-8" />}
                           {idx === 2 && <TrendingUp className="text-orange w-8 h-8" />}
                        </div>
                        <div>
                           <h4 className="font-bold text-xl mb-2 font-display dark:text-neutral-200">{t(item.titleKey)}</h4>
                           <p className="opacity-60 text-sm leading-relaxed max-w-md dark:text-neutral-400">{t(item.textKey)}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>

            {/* Right Column: Terminal */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
               className="relative order-1 lg:order-2"
            >
               <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-white/10 dark:border-white/20" />
               <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-white/10 dark:border-white/20" />

               <AIFeedback
                  className="min-h-[450px]"
                  typingSpeed={15}
                  messages={[
                     "ANALYSIS COMPLETE.",
                     "-----------------",
                     "SUBJECT: Crisis Management Simulation",
                     "METRICS: Response Time: 45ms | Accuracy: 92%",
                     "",
                     "KEY INSIGHT: Team communication lacks transparency.",
                     "RISK LEVEL: MODERATE",
                     "",
                     "RECOMMENDATION: Implement weekly syncs and anonymous feedback forms.",
                     "GENERATING ACTION PLAN...",
                     "[1] Define roles",
                     "[2] Set up Signal group",
                     "[3] Schedule retro"
                  ]}
               />
            </motion.div>
         </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 md:py-32 px-4 md:px-6 lg:px-12 bg-orange text-white text-center relative overflow-hidden">
         <div className="max-w-7xl mx-auto space-y-10 relative z-10">
            <motion.h2
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-[clamp(3rem,8vw,6rem)] font-display font-bold leading-none tracking-tight"
            >
               {t(homePage.cta.titleKey)}
            </motion.h2>
            <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto"
            >
               {t(homePage.cta.textKey)}
            </motion.p>
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="pt-10"
            >
               <a href={homePage.cta.button.href} className="inline-block">
                  <button className="bg-white text-orange px-10 py-5 font-bold font-display text-xl hover:bg-black hover:text-white transition-colors duration-300 rounded-none shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                     {t(homePage.cta.button.labelKey)}
                  </button>
               </a>
            </motion.div>
         </div>
      </section>

      <footer className="py-12 px-4 md:px-6 lg:px-12 bg-paper dark:bg-graphite border-t border-ink/10 dark:border-white/10">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 text-sm font-mono dark:text-neutral-500">
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
