import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

// Variants for text stagger
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const item: Variants = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as any // Cast to any to bypass strict type check for Bezier definition
    }
  }
};

const TypewriterEffect = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export default function HomeHero() {
  return (
    <section className="relative pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[85vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-start">

        {/* LEFT COLUMN: Typography (Span 8) */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-8 flex flex-col gap-8"
        >
          <motion.h1
            variants={item}
            className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] text-[#111] dark:text-white uppercase break-words"
          >
            Трёхчасовой<br />практикум по<br />управлению НКО
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed"
          >
            Два ведущих помогают командам НКО за 3 часа отработать ключевые управленческие задачи.
          </motion.p>

          {/* BUTTONS: Distinct spacing */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-6 mt-6">
            <button className="bg-[#FF4500] text-white px-8 py-4 text-sm font-mono uppercase tracking-widest hover:bg-black transition-colors rounded-none">
              Начать обучение
            </button>
            <button className="group flex items-center gap-2 border-b border-gray-400 pb-1 text-sm font-mono uppercase tracking-widest hover:text-[#FF4500] hover:border-[#FF4500] transition-colors">
              Посмотреть программу
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: AI Terminal Visual (Span 4) */}
        <div className="lg:col-span-4 hidden lg:block h-full min-h-[400px]">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#111] text-[#00FF00] p-8 h-full font-mono text-sm shadow-2xl border-l-4 border-[#FF4500] flex flex-col"
          >
            <div className="opacity-50 border-b border-gray-800 pb-4 mb-4">SYSTEM_STATUS: ONLINE</div>
            <div className="flex-1 space-y-2">
               <div className="flex gap-2">
                 <span>&gt;</span>
                 <TypewriterEffect text="[Initializing protocols]..." speed={30} />
               </div>
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1.5 }}
                 className="text-white"
               >
                 &gt; Module Check: <span className="text-green-500">OK</span>
               </motion.div>
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 2.0 }}
                 className="text-white"
               >
                  &gt; Risk Assessment: <span className="text-[#FF4500]">HIGH</span>
               </motion.div>
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 2.5 }}
                 className="pt-4"
               >
                 &gt; Optimizing workflows...<span className="animate-pulse">_</span>
               </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
