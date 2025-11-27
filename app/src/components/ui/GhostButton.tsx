import { motion } from 'framer-motion';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
}

const GhostButton = ({
  children,
  className = '',
  isActive = false,
  ...props
}: GhostButtonProps) => {
  return (
    <button
      className={`group relative overflow-hidden border border-ink/20 dark:border-ash/20 bg-transparent px-6 py-3 font-display font-medium text-ink dark:text-ash transition-colors rounded-none ${className}`}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-orange z-0"
        initial={{ y: '100%' }}
        whileHover={{ y: '0%' }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }} // smooth editorial ease
      />

      {/* Active state fill */}
      {isActive && (
        <div className="absolute inset-0 bg-orange z-0" />
      )}

      <span className="relative z-10 transition-colors duration-200 group-hover:text-white dark:group-hover:text-ink delay-75">
        {children}
      </span>
    </button>
  );
};

export default GhostButton;
