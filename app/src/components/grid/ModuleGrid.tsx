import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { homePage } from "../../data/pages/home";
import { Link } from "react-router-dom";
import ScrollRevealText from "../ui/ScrollRevealText";
import type { MouseEvent } from "react";

function SpotlightCard({ children, className = "", to }: { children: React.ReactNode; className?: string; to: string }) {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(-1000);
    mouseY.set(-1000);
  }

  return (
    <Link to={to} className="block h-full">
      <div
        className={`group/card relative h-full overflow-hidden bg-paper dark:bg-neutral-900/50 border border-ink/10 dark:border-white/10 ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Spotlight Effect Layer */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover/card:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 69, 0, 0.4), 
                transparent 80%
              )
            `,
          }}
        />
        
        {/* Border Highlight Layer */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover/card:opacity-100 z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 69, 0, 0.8),
                transparent 40%
              )
            `,
            maskImage: `linear-gradient(black, black), linear-gradient(black, black)`,
            maskClip: "content-box, border-box",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px"
          }}
        />

        <div className="relative h-full flex flex-col justify-between p-8 z-20">
          {children}
        </div>
      </div>
    </Link>
  );
}

export default function ModuleGrid() {
  const { t, language } = useTranslation();
  const cards = homePage.sections.cards;

  return (
    <section 
      className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto relative" 
      id="program"
    >
      <motion.div
        key={`header-${language}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 flex flex-col gap-6 relative"
      >
        <span className="font-mono text-orange text-sm uppercase tracking-widest">
           {t(homePage.sections.eyebrowKey)}
        </span>
        
        {/* Header with Paint Effect */}
        <ScrollRevealText 
          text={t(homePage.sections.titleKey)} 
          as="h2"
          enablePaint={true}
          paintSize={300}
          className="text-4xl md:text-6xl font-bold text-ink dark:text-white leading-[0.95] tracking-tight"
        />

        <p className="max-w-2xl text-lg text-ink/60 dark:text-neutral-400">
          {t(homePage.sections.textKey)}
        </p>
      </motion.div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div key={`${i}-${language}`} className="relative">
             <SpotlightCard to={card.href}>
                {/* Top Content */}
                <div>
                  <div className="flex justify-between items-start mb-6">
                     <span className="font-mono text-xs text-orange mb-3 block">
                       MOD {card.index}
                     </span>
                  </div>
                  
                  {/* Card Title with Paint Effect */}
                  <div className="mb-4">
                    <ScrollRevealText 
                      text={t(card.titleKey)}
                      as="h3"
                      enablePaint={true}
                      paintSize={200}
                      animationPreset="fade"
                      className="text-2xl font-bold leading-tight text-ink dark:text-white"
                    />
                  </div>
                  
                  <p className="text-sm text-ink/60 dark:text-neutral-400 line-clamp-3 transition-colors leading-relaxed">
                    {t(card.textKey)}
                  </p>
                </div>

                {/* Bottom Link */}
                <div className="flex items-center justify-between pt-6 border-t border-ink/10 dark:border-white/10 mt-8 group-hover/card:border-orange/30 transition-colors">
                  <span className="font-mono text-xs uppercase tracking-wider text-ink/40 dark:text-neutral-500 group-hover/card:text-orange transition-colors">
                    {t(homePage.sections.openLabelKey)}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-ink/20 dark:text-white/20 group-hover/card:text-orange transition-colors transform group-hover/card:translate-x-1 group-hover/card:-translate-y-1 duration-300" />
                </div>
             </SpotlightCard>
          </div>
        ))}
      </div>
    </section>
  );
}

