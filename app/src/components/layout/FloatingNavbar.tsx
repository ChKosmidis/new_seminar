import { Link } from 'react-router-dom';
import { Menu, Sun, Moon, X, Globe, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';

export default function FloatingNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  // Smart visibility logic
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() || 0;
    const diff = current - previous;

    // Show if scrolling up or at the very top
    if (current < 50 || diff < 0) {
      setIsVisible(true);
    } else if (diff > 10 && !isMobileMenuOpen) {
      // Hide if scrolling down
      setIsVisible(false);
    }
  });

  // Show on mouse hover near top
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100) {
        setIsVisible(true);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 pointer-events-none"
      >
        <div className="
          pointer-events-auto
          w-full max-w-[1400px] mx-auto
          bg-paper/80 dark:bg-graphite/80 backdrop-blur-xl
          border border-ink/5 dark:border-white/10
          text-ink dark:text-white
          px-6 py-4 md:px-8 md:py-4
          flex justify-between items-center
          shadow-sm hover:shadow-md transition-shadow duration-300
        ">
           {/* Logo / Brand */}
           <Link to="/" className="font-bold text-xl tracking-tighter uppercase flex items-center gap-1 group">
              <span className="w-3 h-3 bg-orange rounded-full group-hover:scale-110 transition-transform" />
              <span>NKO<span className="text-orange">.MNGMNT</span></span>
           </Link>

           {/* Desktop Links */}
           <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase">
              <a href="#about" className="hover:text-orange transition-colors relative group">
                {t('layout.nav.home')}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange transition-all group-hover:w-full" />
              </a>
              <a href="#program" className="hover:text-orange transition-colors relative group">
                {t('layout.nav.program')}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange transition-all group-hover:w-full" />
              </a>
              <a href="#ai-feedback" className="hover:text-orange transition-colors relative group">
                AI Feedback
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange transition-all group-hover:w-full" />
              </a>
           </div>

           {/* Actions */}
           <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 border-r border-ink/10 dark:border-white/10 pr-6">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 hover:text-orange transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Language Toggle */}
                <button
                  onClick={toggleLanguage}
                  className="p-2 font-mono text-xs uppercase hover:text-orange transition-colors w-8 text-center"
                  aria-label="Toggle language"
                >
                  {language}
                </button>
              </div>

              {/* CTA Button */}
              <a href="#contact" className="group flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#FF4500] dark:hover:bg-[#FF4500] hover:text-white dark:hover:text-white transition-all shadow-lg">
                 {t('layout.action.contact')}
                 <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </a>
           </div>

           {/* Mobile Menu Toggle */}
           <button
             className="md:hidden p-2 hover:text-orange transition-colors"
             onClick={() => setIsMobileMenuOpen(true)}
             aria-label="Open menu"
           >
             <Menu size={24} />
           </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-paper dark:bg-graphite flex flex-col"
          >
             {/* Header */}
             <div className="flex justify-between items-center p-6 border-b border-ink/10 dark:border-white/10">
                <span className="font-bold text-xl tracking-tighter uppercase">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:text-orange transition-colors"
                >
                  <X size={24} />
                </button>
             </div>

             {/* Links */}
             <div className="flex-1 flex flex-col justify-center px-8 gap-8">
                {[
                  { href: "#about", label: t('layout.nav.home') },
                  { href: "#program", label: t('layout.nav.program') },
                  { href: "#ai-feedback", label: "AI Feedback" },
                  { href: "#contact", label: t('layout.action.contact') },
                ].map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="text-4xl font-bold tracking-tight hover:text-orange transition-colors flex items-center gap-4 group"
                  >
                    <span className="text-xs font-mono text-orange opacity-0 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                    {link.label}
                  </motion.a>
                ))}
             </div>

             {/* Footer Actions */}
             <div className="p-8 border-t border-ink/10 dark:border-white/10 flex justify-between items-center">
                 <div className="flex gap-6">
                   <button onClick={toggleTheme} className="flex items-center gap-2 text-sm uppercase font-bold tracking-widest hover:text-orange">
                      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                      {theme === 'dark' ? 'Light' : 'Dark'}
                   </button>
                   <button onClick={toggleLanguage} className="flex items-center gap-2 text-sm uppercase font-bold tracking-widest hover:text-orange">
                      <Globe size={18} />
                      {language === 'ru' ? 'English' : 'Русский'}
                   </button>
                 </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
