import Hero from '../components/hero/Hero';
import InfrastructureAudit from '../components/infrastructure/InfrastructureAudit';
import InfrastructureBrainstorm from '../components/infrastructure/InfrastructureBrainstorm';
import { infrastructurePage } from '../data/pages/infrastructure';
import styles from './Infrastructure.module.css';

const InfrastructurePage = () => {
  return (
    <div className={styles.page}>
      <Hero {...infrastructurePage.hero} />
      <InfrastructureAudit audit={infrastructurePage.audit} />
      <InfrastructureBrainstorm brainstorm={infrastructurePage.brainstorm} />
    </div>
  );
};

export default InfrastructurePage;
