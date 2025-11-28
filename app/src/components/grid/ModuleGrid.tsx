import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Fake Data for structure
const modules = [
  { id: "01", title: "Start", desc: "Setting the focus and expectations." },
  { id: "02", title: "Practice", desc: "Real cases and group dynamics." },
  { id: "03", title: "Plan", desc: "Implementation roadmap." },
  // ... more items
];

export default function ModuleGrid() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
      <h2 className="text-4xl font-bold mb-12 dark:text-white">Все разделы семинара</h2>

      {/* GRID: 3 Columns, Fixed Gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative h-[300px] border border-neutral-800 bg-transparent hover:bg-[#FF4500] transition-colors duration-300 p-8 flex flex-col justify-between cursor-pointer"
          >
            {/* Top Content */}
            <div>
              {/* Label turns White on hover */}
              <span className="font-mono text-xs text-[#FF4500] group-hover:text-white mb-3 block transition-colors">
                MOD {mod.id}
              </span>
              {/* Title turns White on hover */}
              <h3 className="text-2xl font-bold leading-none mb-4 text-white transition-colors">
                {mod.title}
              </h3>
              {/* Description turns White opacity-90 */}
              <p className="text-sm text-neutral-500 group-hover:text-white/90 line-clamp-3 transition-colors">
                {mod.desc}
              </p>
            </div>

            {/* Bottom Link */}
            <div className="flex items-center justify-between pt-6 border-t border-neutral-800 group-hover:border-white/30 mt-auto transition-colors">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                Перейти к разделу
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#FF4500] group-hover:text-white transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
