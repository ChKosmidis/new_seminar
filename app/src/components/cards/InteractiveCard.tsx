import { ModuleCard } from './ModuleCard';
import type { ModuleCardProps } from './ModuleCard';
import styles from './InteractiveCard.module.css';

export const InteractiveCard = (props: ModuleCardProps) => {
  return (
    <ModuleCard {...props}>
      <div className={styles.wrapper}>{props.children}</div>
    </ModuleCard>
  );
};
