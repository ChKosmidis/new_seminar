import { Link } from 'react-router-dom';
import { Menu, Sun, Moon, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function FloatingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <>
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className={`
          pointer-events-auto
          max-w-3xl w-full mx-auto
          bg-black/80 backdrop-blur-md text-white
          rounded-full px-8 py-4
          flex justify-between items-center
          shadow-2xl transition-all duration-300
          ${isScrolled ? 'scale-100' : 'scale-100'}
        `}>
           {/* Logo / Brand */}
           <Link to="/" className="font-bold text-lg tracking-tight hover:text-orange transition-colors">
              NKO<span className="text-[#FF4500]">.MANAGEMENT</span>
           </Link>

           {/* Desktop Links */}
           <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a href="#about" className="hover:text-[#FF4500] transition-colors">О семинаре</a>
              <a href="#program" className="hover:text-[#FF4500] transition-colors">Программа</a>
              <a href="#ai-feedback" className="hover:text-[#FF4500] transition-colors">AI</a>
           </div>

           {/* Actions: Theme, Lang, CTA */}
           <div className="hidden md:flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 hover:text-[#FF4500] transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-xs font-mono uppercase hover:text-[#FF4500] transition-colors w-8"
                aria-label="Toggle language"
              >
                {language}
              </button>

              {/* CTA Button (Small) */}
              <a href="#contact" className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#FF4500] hover:text-white transition-colors">
                 Связаться
              </a>
           </div>

           {/* Mobile Menu Toggle */}
           <button
             className="md:hidden text-white hover:text-[#FF4500]"
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           >
             <Menu size={24} />
           </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 pt-32 px-6"
          >
             <div className="flex flex-col gap-8 text-2xl font-bold text-white text-center">
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>О семинаре</a>
                <a href="#program" onClick={() => setIsMobileMenuOpen(false)}>Программа</a>
                <a href="#ai-feedback" onClick={() => setIsMobileMenuOpen(false)}>AI Feedback</a>

                <div className="flex justify-center gap-8 mt-8">
                   <button onClick={toggleTheme} className="flex items-center gap-2 text-sm uppercase">
                      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />} Theme
                   </button>
                   <button onClick={toggleLanguage} className="flex items-center gap-2 text-sm uppercase">
                      <Globe size={20} /> {language}
                   </button>
                </div>

                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FF4500] mt-4">Связаться</a>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-12 text-sm text-neutral-500 uppercase tracking-widest"
                >
                  Закрыть
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
