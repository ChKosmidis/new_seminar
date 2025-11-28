import { motion, type Variants, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef, type MouseEvent } from "react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  enablePaint?: boolean;
  paintSize?: number;
  animationPreset?: 'stagger' | 'fade' | 'none';
  viewport?: { once?: boolean; margin?: string; amount?: number | "some" | "all" };
}

export default function ScrollRevealText({ 
  text, 
  className = "", 
  as: Component = "div",
  enablePaint = false,
  paintSize = 250,
  animationPreset = 'stagger',
  viewport = { once: true, margin: "-10%" }
}: ScrollRevealTextProps) {
  const targetRef = useRef(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Split into words
  const words = text.split(" ");

  // Variants for different presets
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const staggerChild: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "0%", opacity: 1,
      transition: { type: "spring", damping: 15, stiffness: 100 }
    },
  };

  const fadeContainer: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const noneContainer: Variants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  };

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(-1000);
    mouseY.set(-1000);
  }

  const Content = ({ isOverlay = false }) => {
    if (animationPreset === 'stagger') {
      return (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className={`flex flex-wrap gap-x-[0.25em] gap-y-1 ${isOverlay ? 'text-[#FF4500]' : ''}`}
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-2 -mb-2">
              <motion.span
                variants={staggerChild}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.div>
      );
    }

    // For 'fade' or 'none'
    return (
      <motion.div
        variants={animationPreset === 'fade' ? fadeContainer : noneContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className={`${isOverlay ? 'text-[#FF4500]' : ''}`}
      >
        {text}
      </motion.div>
    );
  };

  if (enablePaint) {
    return (
      <Component 
        ref={targetRef} 
        className={`relative ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Base Layer */}
        <Content />

        {/* Paint Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none select-none z-10"
          aria-hidden="true"
          style={{
            maskImage: useMotionTemplate`
              radial-gradient(
                ${paintSize}px circle at ${mouseX}px ${mouseY}px,
                black,
                transparent
              )
            `,
            WebkitMaskImage: useMotionTemplate`
              radial-gradient(
                ${paintSize}px circle at ${mouseX}px ${mouseY}px,
                black,
                transparent
              )
            `
          }}
        >
          <Content isOverlay={true} />
        </motion.div>
      </Component>
    );
  }

  return (
    <Component ref={targetRef} className={`overflow-hidden ${className}`}>
      <Content />
    </Component>
  );
}
