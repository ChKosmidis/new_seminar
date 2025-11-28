import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HomeHero() {
  return (
    <section className="relative pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[85vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-start">

        {/* LEFT COLUMN: Typography (Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] text-[#111] dark:text-white uppercase break-words"
          >
            Трёхчасовой<br />практикум по<br />управлению НКО
          </motion.h1>

          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Два ведущих помогают командам НКО за 3 часа отработать ключевые управленческие задачи.
          </p>

          {/* BUTTONS: Distinct spacing */}
          <div className="flex flex-wrap items-center gap-6 mt-6">
            <button className="bg-[#FF4500] text-white px-8 py-4 text-sm font-mono uppercase tracking-widest hover:bg-black transition-colors rounded-none">
              Начать обучение
            </button>
            <button className="group flex items-center gap-2 border-b border-gray-400 pb-1 text-sm font-mono uppercase tracking-widest hover:text-[#FF4500] hover:border-[#FF4500] transition-colors">
              Посмотреть программу
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Terminal Visual (Span 4) */}
        <div className="lg:col-span-4 hidden lg:block mt-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#111] text-[#00FF00] p-6 font-mono text-xs shadow-2xl border-l-4 border-[#FF4500]"
          >
            <div className="opacity-50 mb-4 border-b border-gray-800 pb-2">AI_FEEDBACK_LOOP // ACTIVE</div>
            <p className="mb-2">[ANALYZING TEAM PATTERNS]...</p>
            <p className="text-white">
              &gt; Risk Assessment: <span className="text-[#FF4500]">HIGH</span><br/>
              &gt; Optimizing workflows...<br/>
              &gt; <span className="animate-pulse">_</span>
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
