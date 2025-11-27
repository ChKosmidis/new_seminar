import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { homePage } from '../data/pages/home';
import { Link } from 'react-router-dom';

// UI Components
import RevealingText from '../components/ui/RevealingText';
import GhostButton from '../components/ui/GhostButton';
import AITerminalBlock from '../components/ui/AITerminalBlock';

// Icons
import { ArrowRight, Box, Zap, TrendingUp, FileText, Monitor, CheckCircle2 } from 'lucide-react';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full overflow-hidden">

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-4 md:px-8 lg:px-12 pt-24 pb-12">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-8 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 border border-ink/10 dark:border-ash/10 rounded-full px-4 py-1 w-fit"
            >
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm font-mono uppercase tracking-wider text-ink/60 dark:text-ash/60">
                {t(homePage.hero.badgeKey)}
              </span>
            </motion.div>

            <div className="space-y-4">
              <RevealingText
                text={t(homePage.hero.titleKey)}
                tag="h1"
                className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tight text-ink dark:text-ash uppercase"
              />
              <p className="text-xl md:text-2xl text-ink/70 dark:text-ash/70 max-w-2xl font-light leading-relaxed">
                {t(homePage.hero.subtitleKey)}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to={homePage.hero.primaryCta.href}>
                <GhostButton className="bg-ink text-paper dark:bg-ash dark:text-graphite hover:text-white dark:hover:text-ink">
                  {t(homePage.hero.primaryCta.labelKey)}
                </GhostButton>
              </Link>
              <a href={homePage.hero.secondaryCta.href}>
                <GhostButton>
                  {t(homePage.hero.secondaryCta.labelKey)}
                </GhostButton>
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm font-mono text-ink/40 dark:text-ash/40 pt-4">
              <CheckCircle2 className="w-4 h-4 text-orange" />
              {t(homePage.hero.noteKey)}
            </div>
          </div>

          <div className="lg:col-span-4 relative hidden lg:block">
             <div className="absolute -top-12 -left-12 w-24 h-24 border-t-2 border-l-2 border-orange opacity-50" />
             <div className="absolute -bottom-12 -right-12 w-24 h-24 border-b-2 border-r-2 border-orange opacity-50" />

             <AITerminalBlock
               className="min-h-[300px] shadow-2xl"
               messages={[
                  "> INITIALIZING SEMINAR PROTOCOLS...",
                  "> LOADING MODULES: 0-8",
                  "> AI FEEDBACK: ACTIVE",
                  "> STATUS: READY TO START"
               ]}
             />

             <motion.div
               className="absolute -right-8 top-1/2 -translate-y-1/2 bg-paper dark:bg-graphite border border-ink/10 dark:border-ash/10 p-4 shadow-xl z-20 max-w-[180px]"
               initial={{ x: 50, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 1, duration: 0.8 }}
             >
                <div className="text-xs font-mono uppercase text-ink/40 dark:text-ash/40 mb-1">
                   {t(homePage.hero.floating.labelKey)}
                </div>
                <div className="font-display font-bold text-xl text-orange">
                   {t(homePage.hero.floating.valueKey)}
                </div>
             </motion.div>
          </div>

        </div>
      </section>

      {/* --- TICKER TAPE --- */}
      <div className="w-full bg-ink dark:bg-ash text-paper dark:text-graphite py-4 overflow-hidden border-y border-orange">
        <div className="flex whitespace-nowrap animate-marquee">
           {/* Duplicate logic for infinite scroll effect would be here, simply repeating standard items for now */}
           {[...Array(10)].map((_, i) => (
             <div key={i} className="flex items-center gap-8 mx-4">
                {(homePage.ticker || []).map((key) => (
                   <span key={key} className="text-lg font-mono font-bold tracking-widest uppercase flex items-center gap-8">
                      {t(key as any)} <span className="text-orange">•</span>
                   </span>
                ))}
             </div>
           ))}
        </div>
      </div>

      {/* --- OVERVIEW & STATS --- */}
      <section id="about" className="py-24 px-4 md:px-8 lg:px-12 bg-paper dark:bg-graphite">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
           <div className="space-y-8">
              <span className="font-mono text-orange uppercase tracking-widest text-sm">
                {t(homePage.statsSection.eyebrowKey)}
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                {t(homePage.statsSection.titleKey)}
              </h2>

              <div className="grid grid-cols-2 gap-8 pt-8">
                 {homePage.stats.map((stat, idx) => (
                    <div key={idx} className="border-l-2 border-ink/10 dark:border-ash/10 pl-6 hover:border-orange transition-colors duration-300">
                       <div className="text-3xl font-display font-bold mb-1">{t(stat.valueKey)}</div>
                       <div className="text-sm font-mono text-ink/60 dark:text-ash/60">{t(stat.labelKey)}</div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="space-y-8 bg-ash/20 dark:bg-ink/20 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Box size={120} />
              </div>

              <h3 className="text-2xl font-display font-bold">{t(homePage.about.titleKey)}</h3>
              <p className="text-lg leading-relaxed text-ink/80 dark:text-ash/80">
                 {t(homePage.about.textKey)}
              </p>

              <ul className="space-y-4 pt-4">
                 {homePage.about.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                       <CheckCircle2 className="w-5 h-5 text-success mt-1 shrink-0" />
                       <span className="text-ink/80 dark:text-ash/80">{t(item as any)}</span>
                    </li>
                 ))}
              </ul>
           </div>
        </div>
      </section>

      {/* --- MODULES GRID (GHOST CARDS) --- */}
      <section id="sections-map" className="py-24 px-4 md:px-8 lg:px-12 bg-ash/10 dark:bg-ink/10">
         <div className="max-w-7xl mx-auto space-y-16">
            <div className="max-w-3xl">
               <span className="font-mono text-orange uppercase tracking-widest text-sm block mb-4">
                 {t(homePage.sections.eyebrowKey)}
               </span>
               <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                 {t(homePage.sections.titleKey)}
               </h2>
               <p className="text-xl text-ink/60 dark:text-ash/60">
                 {t(homePage.sections.textKey)}
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {homePage.sections.cards.map((card, idx) => (
                  <Link to={card.href} key={idx} className="group">
                     <div className="h-full border border-ink/10 dark:border-ash/10 bg-paper dark:bg-graphite p-8 transition-all duration-500 hover:border-orange hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden">

                        {/* Hover Fill Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                           <div className="flex justify-between items-start mb-6">
                              <span className="font-mono text-xs border border-ink/20 dark:border-ash/20 px-2 py-1 rounded-none group-hover:bg-orange group-hover:text-white group-hover:border-orange transition-colors">
                                 MOD {card.index}
                              </span>
                              {/* Icon could be rendered here dynamically if needed, keeping it simple for now or using lucide */}
                              <div className="text-ink/20 dark:text-ash/20 group-hover:text-orange transition-colors">
                                 <FileText size={24} />
                              </div>
                           </div>

                           <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-orange transition-colors">
                              {t(card.titleKey)}
                           </h3>
                           <p className="text-ink/60 dark:text-ash/60 leading-relaxed mb-8">
                              {t(card.textKey)}
                           </p>
                        </div>

                        <div className="relative z-10 flex items-center gap-2 text-sm font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                           {t(homePage.sections.openLabelKey)} <ArrowRight size={16} />
                        </div>
                     </div>
                  </Link>
               ))}
            </div>
         </div>
      </section>

      {/* --- PROGRAM BLOCKS --- */}
      <section id="program" className="py-24 px-4 md:px-8 lg:px-12 bg-paper dark:bg-graphite">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-6">
               <span className="font-mono text-orange uppercase tracking-widest text-sm">
                  {t(homePage.program.eyebrowKey)}
               </span>
               <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                  {t(homePage.program.titleKey)}
               </h2>
               <p className="text-lg text-ink/70 dark:text-ash/70">
                  {t(homePage.program.textKey)}
               </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {homePage.program.blocks.map((block, idx) => (
                  <div key={idx} className="space-y-6">
                     <div className="h-1 w-12 bg-orange" />
                     <h3 className="text-xl font-bold">{t(block.titleKey)}</h3>
                     <ul className="space-y-4">
                        {block.links.map((link, lIdx) => (
                           <li key={lIdx} className="border-t border-ink/10 dark:border-ash/10 pt-3">
                              <Link to={link.href} className="flex justify-between items-center group">
                                 <span className="text-sm group-hover:text-orange transition-colors duration-300">
                                    {t(link.labelKey)}
                                 </span>
                                 <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-orange" />
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- AI FEEDBACK --- */}
      <section id="ai-feedback" className="py-24 px-4 md:px-8 lg:px-12 bg-ink text-paper dark:bg-ash dark:text-graphite relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-orange/5 skew-x-12 transform origin-top-right" />

         <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <span className="font-mono text-orange uppercase tracking-widest text-sm block mb-4">
                  {t(homePage.feedback.eyebrowKey)}
               </span>
               <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
                  {t(homePage.feedback.titleKey)}
               </h2>
               <p className="text-xl opacity-80 mb-12 max-w-lg">
                  {t(homePage.feedback.textKey)}
               </p>

               <div className="grid gap-8">
                  {homePage.feedback.items.map((item, idx) => (
                     <div key={idx} className="flex gap-4">
                        <div className="mt-1">
                           {idx === 0 && <Zap className="text-orange" />}
                           {idx === 1 && <Monitor className="text-orange" />}
                           {idx === 2 && <TrendingUp className="text-orange" />}
                        </div>
                        <div>
                           <h4 className="font-bold text-lg mb-2">{t(item.titleKey)}</h4>
                           <p className="opacity-70 text-sm leading-relaxed">{t(item.textKey)}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="relative">
               <AITerminalBlock
                  className="bg-black/50 text-green-400 backdrop-blur-sm border-orange/50 shadow-2xl min-h-[400px]"
                  typingSpeed={20}
                  messages={[
                     "ANALYSIS COMPLETE.",
                     "-----------------",
                     "KEY INSIGHT: Team communication lacks transparency.",
                     "RISK LEVEL: MODERATE",
                     "RECOMMENDATION: Implement weekly syncs and anonymous feedback forms.",
                     "",
                     "GENERATING ACTION PLAN...",
                     "[1] Define roles",
                     "[2] Set up Signal group",
                     "[3] Schedule retro"
                  ]}
               />
            </div>
         </div>
      </section>

      {/* --- CTA / FOOTER-ISH --- */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-orange text-white text-center">
         <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-display font-bold">
               {t(homePage.cta.titleKey)}
            </h2>
            <p className="text-xl md:text-2xl font-light opacity-90">
               {t(homePage.cta.textKey)}
            </p>
            <div className="pt-8">
               <a href={homePage.cta.button.href}>
                  <button className="bg-white text-orange px-8 py-4 font-bold text-lg hover:bg-black hover:text-white transition-colors duration-300">
                     {t(homePage.cta.button.labelKey)}
                  </button>
               </a>
            </div>
         </div>
      </section>

      <footer className="py-12 px-4 md:px-8 lg:px-12 bg-paper dark:bg-graphite border-t border-ink/10 dark:border-ash/10">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 text-sm">
            <p>{t(homePage.footer.textKey)}</p>
            <p>{t(homePage.footer.noteKey)}</p>
         </div>
      </footer>

    </div>
  );
};

export default HomePage;
