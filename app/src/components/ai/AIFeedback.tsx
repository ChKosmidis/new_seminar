import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AIFeedbackProps {
  messages: string[];
  typingSpeed?: number;
  className?: string;
}

const AIFeedback = ({
  messages,
  typingSpeed = 20,
  className = ''
}: AIFeedbackProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Reset state if messages change (optional, but good for stability)
  useEffect(() => {
    setDisplayedText('');
    setCurrentMessageIndex(0);
    setCharIndex(0);
  }, [messages]);

  useEffect(() => {
    if (currentMessageIndex >= messages.length) return;

    const currentMessage = messages[currentMessageIndex];

    if (charIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentMessage[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      // Line finished
      if (currentMessageIndex < messages.length - 1) {
         const timeout = setTimeout(() => {
            setDisplayedText((prev) => prev + '\n');
            setCurrentMessageIndex((prev) => prev + 1);
            setCharIndex(0);
         }, 400); // Pause between lines
         return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, currentMessageIndex, messages, typingSpeed]);

  return (
    <div className={`font-mono text-sm md:text-base leading-relaxed p-6 bg-black text-neutral-300 border border-l-4 border-l-green-500 border-neutral-800 shadow-2xl ${className}`}>
        {/* Terminal Header Decoration (Optional) */}
        <div className="flex gap-2 mb-4 opacity-50 border-b border-white/10 pb-2">
            <div className="w-3 h-3 rounded-full bg-red-900/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-900/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-900/50"></div>
        </div>

        <div className="whitespace-pre-wrap min-h-[300px]">
          {displayedText}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="inline-block w-2.5 h-5 bg-green-500 ml-1 align-middle"
          />
        </div>
    </div>
  );
};

export default AIFeedback;
