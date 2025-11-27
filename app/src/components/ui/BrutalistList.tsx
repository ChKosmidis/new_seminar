import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface BrutalistListItem {
  id: string | number;
  label: string;
  value?: string;
  href?: string;
}

interface BrutalistListProps {
  items: BrutalistListItem[];
  className?: string;
}

const BrutalistList = ({ items, className = '' }: BrutalistListProps) => {
  return (
    <div className={`w-full border-t-2 border-ink dark:border-ash ${className}`}>
      {items.map((item, index) => (
        <div key={item.id || index} className="group border-b border-ink/20 dark:border-ash/20 py-4 flex items-center justify-between transition-colors hover:bg-orange/5">
             <div className="flex items-center gap-4 md:gap-6">
                <span className="font-mono text-sm text-orange w-8 md:w-12 shrink-0">
                   {String(item.id).padStart(2, '0')}
                </span>
                {item.href ? (
                    <Link to={item.href} className="font-display font-bold text-lg md:text-xl group-hover:translate-x-2 transition-transform duration-300 block">
                        {item.label}
                    </Link>
                ) : (
                    <span className="font-display font-bold text-lg md:text-xl group-hover:translate-x-2 transition-transform duration-300 block">
                        {item.label}
                    </span>
                )}
             </div>

             <div className="flex items-center gap-4">
                {item.value && (
                   <span className="font-mono text-xs opacity-60 hidden md:block uppercase tracking-wider">
                      {item.value}
                   </span>
                )}
                {item.href && (
                   <Link to={item.href} className="p-2">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-orange" />
                   </Link>
                )}
             </div>
        </div>
      ))}
    </div>
  );
};

export default BrutalistList;
