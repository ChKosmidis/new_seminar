import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AITerminalBlockProps {
  messages: string[];
  typingSpeed?: number;
  className?: string;
}

const AITerminalBlock = ({
  messages,
  typingSpeed = 30,
  className = ''
}: AITerminalBlockProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

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
      // Message complete, wait a bit then maybe move to next or just stop
      // For this specific design, we might just want to show one block or stream lines.
      // Let's assume we print them line by line with line breaks if multiple messages.
      // BUT current logic prints character by character.
      // If we have multiple messages, let's treat them as sequential lines.

      if (currentMessageIndex < messages.length - 1) {
         const timeout = setTimeout(() => {
            setDisplayedText((prev) => prev + '\n');
            setCurrentMessageIndex((prev) => prev + 1);
            setCharIndex(0);
         }, 500); // Pause between lines
         return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, currentMessageIndex, messages, typingSpeed]);

  return (
    <div className={`font-mono text-sm leading-relaxed p-4 bg-ash/10 dark:bg-ink/50 border-l-4 border-orange ${className}`}>
        <div className="whitespace-pre-wrap text-ink dark:text-ash">
          {displayedText}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-orange ml-1 align-middle"
          />
        </div>
    </div>
  );
};

export default AITerminalBlock;
