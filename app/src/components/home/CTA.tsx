import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { homePage } from "../../data/pages/home";
import ScrollRevealText from "../ui/ScrollRevealText";

export default function CTA() {
  const { t, language } = useTranslation();

  return (
    <section id="contact" className="w-full bg-orange py-32 px-6 text-center mt-24">
      {/* ENSURED: flex-col, items-center, justify-center, text-center */}
      <motion.div 
        key={language}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-12 text-center text-white dark:text-white"
      >
        <div className="mx-auto">
            <ScrollRevealText 
                text={t(homePage.cta.titleKey)}
                as="h2"
                className="text-4xl md:text-7xl font-bold text-white dark:text-white tracking-tighter leading-[0.9] uppercase mx-auto whitespace-pre-line"
            />
        </div>

        <p className="text-white/80 dark:text-white/80 text-xl max-w-xl leading-relaxed mx-auto">
          {t(homePage.cta.textKey)}
        </p>

        {/* STANDALONE BUTTON */}
        <div className="mt-4">
          <a 
            href={homePage.cta.button.href}
            className="inline-flex items-center gap-3 bg-white text-black px-12 py-5 text-sm font-mono uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors rounded-none shadow-xl group"
          >
            {t(homePage.cta.button.labelKey)}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
