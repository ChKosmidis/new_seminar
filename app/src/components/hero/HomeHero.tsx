import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { homePage } from "../../data/pages/home";
import ScrollRevealText from "../ui/ScrollRevealText";

// Slide up for block elements
const fadeInUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Custom easing (Swiss-like smooth)
    },
  },
};

export default function HomeHero() {
  const { t, language } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax effect for the background/graphic elements based on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="relative min-h-[90vh] flex flex-col justify-center bg-paper dark:bg-graphite overflow-hidden pt-20"
    >
      {/* Grid Background (Swiss Style) */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0"
      >
         <div className="w-full h-full grid grid-cols-12 gap-4 px-6 md:px-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-full border-x border-ink dark:border-ash" />
            ))}
         </div>
      </motion.div>

      <div className="container max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-8 items-end">
          
          {/* LEFT: Typography (Span 9) */}
          <div className="lg:col-span-9">
            
            {/* Badge / Eyebrow */}
            <motion.div 
              key={`badge-${language}`}
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={fadeInUp}
              className="mb-8 flex items-center gap-3"
            >
               <span className="inline-block w-3 h-3 bg-orange rounded-full animate-pulse" />
               <span className="font-mono text-sm tracking-[0.2em] uppercase text-ink/60 dark:text-ash/60">
                 {t(homePage.hero.badgeKey)}
               </span>
            </motion.div>

            {/* Main Title with Paint Effect */}
            <div className="mb-8">
              <ScrollRevealText 
                key={`title-${language}`}
                text={t(homePage.hero.titleKey)}
                as="h1"
                enablePaint={true}
                paintSize={350} // Larger aura for Hero
                className="text-6xl md:text-8xl lg:text-[7rem] font-bold leading-[0.9] tracking-tighter text-ink dark:text-ash"
              />
            </div>

            {/* Subtitle / Description */}
            <motion.div 
               key={`subtitle-${language}`}
               variants={fadeInUp}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
               className="max-w-2xl"
            >
              <h2 className="text-xl md:text-2xl font-light leading-relaxed text-ink/80 dark:text-ash/80">
                {t(homePage.hero.subtitleKey)}
              </h2>
            </motion.div>
            
            {/* Buttons */}
            <motion.div 
               key={`buttons-${language}`}
               variants={fadeInUp}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               transition={{ delay: 0.6 }}
               className="flex flex-wrap items-center gap-6 mt-12"
            >
               <a 
                 href={homePage.hero.primaryCta.href} 
                 className="bg-orange text-white dark:text-graphite px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-ink dark:hover:bg-white dark:hover:text-graphite transition-all duration-300 flex items-center gap-3"
               >
                 {t(homePage.hero.primaryCta.labelKey)}
                 <ArrowRight className="w-4 h-4" />
               </a>
               
               <a 
                 href={homePage.hero.secondaryCta.href}
                 className="group relative flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-widest text-ink dark:text-ash hover:text-orange dark:hover:text-orange transition-colors"
               >
                 {t(homePage.hero.secondaryCta.labelKey)}
                 {/* Animated Underline */}
                 <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange transition-all duration-300 group-hover:w-full" />
               </a>
            </motion.div>

          </div>

          {/* RIGHT: Abstract Visual / Stats (Span 3) */}
          <div className="lg:col-span-3 flex flex-col justify-end h-full pb-2">
             <motion.div
                key={`stats-${language}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="border-t-2 border-orange pt-6"
             >
                <div className="font-mono text-xs uppercase tracking-widest text-ink/50 dark:text-ash/50 mb-2">
                   {t(homePage.hero.floating.labelKey)}
                </div>
                <div className="text-4xl font-bold text-ink dark:text-ash">
                   {t(homePage.hero.floating.valueKey)}
                </div>
                <div className="mt-8 flex items-center gap-2 text-xs font-mono text-ink/40 dark:text-ash/40">
                   <Globe className="w-4 h-4" />
                   <span>{language === 'ru' ? 'Moscow, RU' : 'International'}</span>
                </div>
             </motion.div>
          </div>
          
        </div>
      </div>

      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-ink/5 dark:bg-ash/5 flex">
         <motion.div 
           className="h-full bg-orange" 
           style={{ width: "30%" }} 
           initial={{ width: "0%" }}
           whileInView={{ width: "30%" }}
           transition={{ duration: 1.5, ease: "circOut" }}
         />
      </div>
    </section>
  );
}
