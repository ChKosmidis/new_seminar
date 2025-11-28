import type { ReactNode } from 'react';
import { useEffect } from 'react';
// import Header from './Header'; // OLD HEADER
import FloatingNavbar from './FloatingNavbar'; // NEW NAVBAR
import SectionsStrip from './SectionsStrip';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

type LayoutProps = {
  children: ReactNode;
  withSectionsStrip?: boolean;
};

const Layout = ({ children, withSectionsStrip = false }: LayoutProps) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper dark:bg-graphite text-ink dark:text-ash transition-colors duration-300">
      <FloatingNavbar />
      {withSectionsStrip ? <SectionsStrip /> : null}
      <main className="relative z-10">{children}</main>
    </div>
  );
};

export default Layout;
