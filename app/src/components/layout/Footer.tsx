import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 px-6 md:px-12 bg-paper dark:bg-graphite border-t border-ink/10 dark:border-white/10 text-ink dark:text-ash">
       <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
             {/* Brand */}
             <div className="col-span-1 md:col-span-2">
                <Link to="/" className="text-2xl font-bold tracking-tight block mb-6">
                   NKO<span className="text-[#FF4500]">.MANAGEMENT</span>
                </Link>
                <p className="text-lg opacity-60 max-w-sm">
                   Образовательная платформа для руководителей и команд некоммерческого сектора.
                </p>
             </div>

             {/* Links */}
             <div>
                <h4 className="font-mono text-sm uppercase tracking-widest opacity-50 mb-6">Навигация</h4>
                <ul className="space-y-4 font-medium">
                   <li><a href="#about" className="hover:text-[#FF4500] transition-colors">О семинаре</a></li>
                   <li><a href="#program" className="hover:text-[#FF4500] transition-colors">Программа</a></li>
                   <li><a href="#ai-feedback" className="hover:text-[#FF4500] transition-colors">AI Feedback</a></li>
                </ul>
             </div>

             {/* Legal / Contact */}
             <div>
                <h4 className="font-mono text-sm uppercase tracking-widest opacity-50 mb-6">Контакты</h4>
                <ul className="space-y-4 font-medium">
                   <li><a href="mailto:contact@nko.management" className="hover:text-[#FF4500] transition-colors">contact@nko.management</a></li>
                   <li className="opacity-50 text-sm pt-4">Москва, ул. Покровка 1/13/6</li>
                </ul>
             </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-ink/5 dark:border-white/5 opacity-40 text-sm font-mono">
             <p>&copy; {currentYear} NKO Management. All rights reserved.</p>
             <p>Swiss Style System v2.1</p>
          </div>
       </div>
    </footer>
  );
}
