import Hero from '../components/hero/Hero';
import LegalOverview from '../components/legal/LegalOverview';
import LegalForms from '../components/legal/LegalForms';
import LegalRisks from '../components/legal/LegalRisks';
import SecurityAuditChecklist from '../components/legal/SecurityAuditChecklist';
import IncidentPlaybook from '../components/legal/IncidentPlaybook';
import ThreatResponsePlanner from '../components/legal/ThreatResponsePlanner';
import { legalSecurityPage } from '../data/pages/legalSecurity';
import styles from './LegalSecurity.module.css';

const LegalSecurityPage = () => {
  return (
    <div className={styles.page}>
      <Hero {...legalSecurityPage.hero} />
      <LegalOverview overview={legalSecurityPage.overview} />
      <LegalForms forms={legalSecurityPage.forms} />
      <LegalRisks risks={legalSecurityPage.risks} />
      <SecurityAuditChecklist security={legalSecurityPage.security} />
      <IncidentPlaybook playbook={legalSecurityPage.playbook} />
      <ThreatResponsePlanner planner={legalSecurityPage.planner} />
    </div>
  );
};

export default LegalSecurityPage;
