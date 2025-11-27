import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { homePage } from '../data/pages/home';
import { Link } from 'react-router-dom';

// UI Components
import RevealingText from '../components/ui/RevealingText';
import GhostButton from '../components/ui/GhostButton';
import AITerminalBlock from '../components/ui/AITerminalBlock';
import BrutalistList, { type BrutalistListItem } from '../components/ui/BrutalistList';

// Icons
import { ArrowRight, Box, Zap, TrendingUp, FileText, Monitor, CheckCircle2 } from 'lucide-react';

const HomePage = () => {
  const { t } = useTranslation();

  // Convert program blocks to BrutalistList items
  // Flattening all links from all blocks for a single massive list or per block?
  // Let's do per block or combine them. The design usually favors a big list.
  // But let's stick to the structure: Program has blocks.
  // Let's make a list for each block.

  return (
    <div className="w-full overflow-hidden bg-paper dark:bg-graphite text-ink dark:text-ash">

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-[1920px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 border border-ink/10 dark:border-ash/10 rounded-none px-4 py-2 w-fit bg-white/50 dark:bg-black/20 backdrop-blur-sm"
            >
              <span className="w-2 h-2 bg-success animate-pulse" />
              <span className="text-xs md:text-sm font-mono uppercase tracking-widest text-ink/60 dark:text-ash/60">
                {t(homePage.hero.badgeKey)}
              </span>
            </motion.div>

            <div className="space-y-4 md:space-y-6">
              <RevealingText
                text={t(homePage.hero.titleKey)}
                tag="h1"
                className="text-[clamp(3.5rem,8vw,8rem)] font-display font-bold leading-[0.85] tracking-tight text-ink dark:text-ash uppercase break-words"
              />
              <p className="text-[clamp(1.1rem,1.5vw,1.5rem)] text-ink/70 dark:text-ash/70 max-w-2xl font-light leading-relaxed">
                {t(homePage.hero.subtitleKey)}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to={homePage.hero.primaryCta.href}>
                <GhostButton className="bg-ink text-paper dark:bg-ash dark:text-graphite hover:text-white dark:hover:text-ink w-full md:w-auto">
                  {t(homePage.hero.primaryCta.labelKey)}
                </GhostButton>
              </Link>
              <a href={homePage.hero.secondaryCta.href}>
                <GhostButton className="w-full md:w-auto">
                  {t(homePage.hero.secondaryCta.labelKey)}
                </GhostButton>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs md:text-sm font-mono text-ink/40 dark:text-ash/40 pt-2">
              <CheckCircle2 className="w-4 h-4 text-orange" />
              {t(homePage.hero.noteKey)}
            </div>
          </div>

          <div className="lg:col-span-4 relative hidden lg:block h-full min-h-[400px]">
             {/* Decorative Corners */}
             <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-orange" />
             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-orange" />

             <div className="relative z-10 h-full flex flex-col justify-center">
                <AITerminalBlock
                  className="w-full shadow-2xl backdrop-blur-md"
                  messages={[
                      "> SYSTEM_CHECK: PASS",
                      "> LOADING_CURRICULUM: 100%",
                      "> AI_ASSISTANT: ONLINE",
                      "> READY_FOR_INPUT..."
                  ]}
                />
             </div>

             <motion.div
               className="absolute -right-4 top-1/4 bg-paper dark:bg-graphite border border-ink/10 dark:border-ash/10 p-6 shadow-xl z-20 max-w-[200px]"
               initial={{ x: 100, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
             >
                <div className="text-xs font-mono uppercase text-ink/40 dark:text-ash/40 mb-2 border-b border-ink/10 dark:border-ash/10 pb-2">
                   {t(homePage.hero.floating.labelKey)}
                </div>
                <div className="font-display font-bold text-4xl text-orange">
                   {t(homePage.hero.floating.valueKey)}
                </div>
             </motion.div>
          </div>

        </div>
      </section>

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
      <section id="about" className="py-20 md:py-32 px-4 md:px-6 lg:px-12 bg-paper dark:bg-graphite">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
           <div className="space-y-10">
              <div>
                <span className="font-mono text-orange uppercase tracking-widest text-sm mb-2 block">
                    {t(homePage.statsSection.eyebrowKey)}
                </span>
                <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-display font-bold leading-tight">
                    {t(homePage.statsSection.titleKey)}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                 {homePage.stats.map((stat, idx) => (
                    <div key={idx} className="group border-l-4 border-ink/10 dark:border-ash/10 pl-6 hover:border-orange transition-colors duration-300">
                       <div className="text-4xl md:text-5xl font-display font-bold mb-2 group-hover:text-orange transition-colors">{t(stat.valueKey)}</div>
                       <div className="text-sm font-mono text-ink/60 dark:text-ash/60 uppercase tracking-wider">{t(stat.labelKey)}</div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="space-y-8 bg-ash/30 dark:bg-ink/30 p-8 md:p-12 relative overflow-hidden border border-ink/5 dark:border-ash/5">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <Box size={200} strokeWidth={1} />
              </div>

              <h3 className="text-2xl md:text-3xl font-display font-bold">{t(homePage.about.titleKey)}</h3>
              <p className="text-lg leading-relaxed text-ink/80 dark:text-ash/80 font-light">
                 {t(homePage.about.textKey)}
              </p>

              <ul className="space-y-4 pt-6">
                 {homePage.about.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                       <CheckCircle2 className="w-5 h-5 text-success mt-1 shrink-0" />
                       <span className="text-ink/90 dark:text-ash/90 font-medium">{t(item as any)}</span>
                    </li>
                 ))}
              </ul>
           </div>
        </div>
      </section>

      {/* --- MODULES GRID (GHOST CARDS) --- */}
      <section id="sections-map" className="py-20 md:py-32 px-4 md:px-6 lg:px-12 bg-ash/20 dark:bg-ink/20">
         <div className="max-w-[1920px] mx-auto space-y-16">
            <div className="max-w-4xl">
               <span className="font-mono text-orange uppercase tracking-widest text-sm block mb-4">
                 {t(homePage.sections.eyebrowKey)}
               </span>
               <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display font-bold mb-6 leading-none">
                 {t(homePage.sections.titleKey)}
               </h2>
               <p className="text-xl md:text-2xl text-ink/60 dark:text-ash/60 max-w-2xl font-light">
                 {t(homePage.sections.textKey)}
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {homePage.sections.cards.map((card, idx) => (
                  <Link to={card.href} key={idx} className="group h-full">
                     <article className="h-full border border-ink/10 dark:border-ash/10 bg-paper dark:bg-graphite p-8 transition-all duration-500 hover:border-orange hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden">

                        {/* Hover Fill Effect - Subtle */}
                        <div className="absolute inset-0 bg-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                           <div className="flex justify-between items-start mb-8">
                              <span className="font-mono text-xs font-bold border border-ink/20 dark:border-ash/20 px-3 py-1 bg-white/50 dark:bg-black/50 group-hover:bg-orange group-hover:text-white group-hover:border-orange transition-colors">
                                 MOD {card.index}
                              </span>
                              <div className="text-ink/20 dark:text-ash/20 group-hover:text-orange transition-colors duration-500">
                                 <FileText size={28} strokeWidth={1.5} />
                              </div>
                           </div>

                           <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-orange transition-colors duration-300">
                              {t(card.titleKey)}
                           </h3>
                           <p className="text-ink/60 dark:text-ash/60 leading-relaxed mb-8 text-sm md:text-base">
                              {t(card.textKey)}
                           </p>
                        </div>

                        <div className="relative z-10 flex items-center gap-3 text-sm font-bold uppercase tracking-wide opacity-60 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 group-hover:text-orange">
                           {t(homePage.sections.openLabelKey)}
                           <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                     </article>
                  </Link>
               ))}
            </div>
         </div>
      </section>

      {/* --- PROGRAM BLOCKS (Brutalist Lists) --- */}
      <section id="program" className="py-20 md:py-32 px-4 md:px-6 lg:px-12 bg-paper dark:bg-graphite">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4 space-y-8">
               <span className="font-mono text-orange uppercase tracking-widest text-sm">
                  {t(homePage.program.eyebrowKey)}
               </span>
               <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-display font-bold leading-[0.9]">
                  {t(homePage.program.titleKey)}
               </h2>
               <p className="text-lg text-ink/70 dark:text-ash/70 font-light">
                  {t(homePage.program.textKey)}
               </p>

               <div className="hidden lg:block pt-12">
                   <div className="w-16 h-1 bg-orange mb-6" />
                   <p className="text-sm font-mono opacity-50 uppercase">
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
                     <div key={idx} className="space-y-6">
                        <h3 className="text-2xl font-bold font-display flex items-center gap-4">
                            <span className="w-8 h-8 bg-ink text-paper dark:bg-ash dark:text-graphite rounded-full flex items-center justify-center text-sm font-mono">{idx + 1}</span>
                            {t(block.titleKey)}
                        </h3>
                        <BrutalistList items={listItems} />
                     </div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* --- AI FEEDBACK --- */}
      <section id="ai-feedback" className="py-20 md:py-32 px-4 md:px-6 lg:px-12 bg-ink text-paper dark:bg-ash dark:text-graphite relative overflow-hidden">
         {/* Abstract BG */}
         <div className="absolute top-0 right-0 w-2/3 h-full bg-orange/10 skew-x-12 transform origin-top-right pointer-events-none" />

         <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
               <span className="font-mono text-orange uppercase tracking-widest text-sm block mb-4">
                  {t(homePage.feedback.eyebrowKey)}
               </span>
               <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display font-bold mb-8 leading-[0.9]">
                  {t(homePage.feedback.titleKey)}
               </h2>
               <p className="text-xl opacity-80 mb-12 max-w-lg font-light">
                  {t(homePage.feedback.textKey)}
               </p>

               <div className="grid gap-8">
                  {homePage.feedback.items.map((item, idx) => (
                     <div key={idx} className="flex gap-6 border-l-2 border-orange/30 pl-6 py-2">
                        <div className="mt-1 shrink-0">
                           {idx === 0 && <Zap className="text-orange w-8 h-8" />}
                           {idx === 1 && <Monitor className="text-orange w-8 h-8" />}
                           {idx === 2 && <TrendingUp className="text-orange w-8 h-8" />}
                        </div>
                        <div>
                           <h4 className="font-bold text-xl mb-2 font-display">{t(item.titleKey)}</h4>
                           <p className="opacity-60 text-sm leading-relaxed max-w-md">{t(item.textKey)}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="relative order-1 lg:order-2">
               <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-white/20" />
               <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-white/20" />

               <AITerminalBlock
                  className="bg-black/80 text-green-400 backdrop-blur-md border border-white/10 shadow-2xl min-h-[450px] text-sm md:text-base font-medium"
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
            </div>
         </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 md:py-32 px-4 md:px-6 lg:px-12 bg-orange text-white text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" /> {/* Noise texture if available, or just ignore */}

         <div className="max-w-5xl mx-auto space-y-10 relative z-10">
            <h2 className="text-[clamp(3rem,8vw,6rem)] font-display font-bold leading-none tracking-tight">
               {t(homePage.cta.titleKey)}
            </h2>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
               {t(homePage.cta.textKey)}
            </p>
            <div className="pt-10">
               <a href={homePage.cta.button.href} className="inline-block">
                  <button className="bg-white text-orange px-10 py-5 font-bold font-display text-xl hover:bg-black hover:text-white transition-colors duration-300 rounded-none shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                     {t(homePage.cta.button.labelKey)}
                  </button>
               </a>
            </div>
         </div>
      </section>

      <footer className="py-12 px-4 md:px-6 lg:px-12 bg-paper dark:bg-graphite border-t border-ink/10 dark:border-ash/10">
         <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 text-sm font-mono">
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
