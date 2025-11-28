import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AIFeedback() {
  const [displayedText, setDisplayedText] = useState('');

  // Hardcoded messages to replicate the "AI" feel without external props
  const messages = [
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
  ];

  useEffect(() => {
    let currentMessageIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let timeout: ReturnType<typeof setTimeout>;

    const typeWriter = () => {
      if (currentMessageIndex >= messages.length) return;

      const message = messages[currentMessageIndex];

      if (charIndex < message.length) {
        currentText += message[charIndex];
        setDisplayedText(currentText);
        charIndex++;
        timeout = setTimeout(typeWriter, 15); // Fast typing
      } else {
        currentText += '\n';
        setDisplayedText(currentText);
        charIndex = 0;
        currentMessageIndex++;
        timeout = setTimeout(typeWriter, 300); // Pause between lines
      }
    };

    timeout = setTimeout(typeWriter, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="w-full py-24 bg-[#F2F2EE] dark:bg-[#0A0A0A] text-[#111] dark:text-white transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
         {/* Left Text */}
         <div>
            <h2 className="text-5xl font-bold mb-6">Обратная связь AI</h2>
            <p className="text-xl opacity-70">AI-партнёр фиксирует ключевые цитаты...</p>
         </div>

         {/* Right Terminal (Always Dark) */}
         <div className="bg-[#111] p-8 text-green-400 font-mono text-sm rounded-sm border border-neutral-800 h-[400px] overflow-hidden relative shadow-xl">
            {/* Terminal Content */}
            <div className="whitespace-pre-wrap">
              {displayedText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-2.5 h-5 bg-green-500 ml-1 align-middle"
              />
            </div>
            {/* Scanline effect optional */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />
         </div>
      </div>
    </section>
  );
}
