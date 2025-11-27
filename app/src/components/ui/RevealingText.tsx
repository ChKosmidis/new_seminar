import { motion, type Variants } from 'framer-motion';

interface RevealingTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
}

const RevealingText = ({
  text,
  className = '',
  tag: Tag = 'h2',
  delay = 0
}: RevealingTextProps) => {
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i }, // Faster stagger
    }),
  };

  const child: Variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 100,
        mass: 0.5,
      },
    },
    hidden: {
      y: '100%',
      opacity: 0,
    },
  };

  return (
    <Tag className={`overflow-hidden ${className}`}>
        <span className="sr-only">{text}</span>
        <motion.span
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="flex flex-wrap gap-x-[0.2em] gap-y-1"
        >
            {words.map((word, index) => (
            <span key={index} className="overflow-hidden inline-block relative py-1 -my-1">
                 <motion.span variants={child} className="inline-block">
                    {word}
                 </motion.span>
            </span>
            ))}
        </motion.span>
    </Tag>
  );
};

export default RevealingText;
