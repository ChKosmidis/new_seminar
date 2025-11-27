import styles from './ModuleGrid.module.css';
import type { ReactNode } from 'react';

export const ModuleGrid = ({ children }: { children: ReactNode }) => {
  return <div className={styles.grid}>{children}</div>;
};
