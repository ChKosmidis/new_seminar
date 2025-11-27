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
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
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
            viewport={{ once: true }}
            className="flex flex-wrap gap-x-[0.25em]"
        >
            {words.map((word, index) => (
            <span key={index} className="overflow-hidden inline-block relative">
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
