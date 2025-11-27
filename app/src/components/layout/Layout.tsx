import type { ReactNode } from 'react';
import Header from './Header';
import SectionsStrip from './SectionsStrip';
import styles from './Layout.module.css';

type LayoutProps = {
  children: ReactNode;
  withSectionsStrip?: boolean;
};

const Layout = ({ children, withSectionsStrip = false }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      {withSectionsStrip ? <SectionsStrip /> : null}
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
