import Hero from '../components/hero/Hero';
import CommunicationOverview from '../components/communications/CommunicationOverview';
import CommunicationTools from '../components/communications/CommunicationTools';
import CommunicationDiagnostics from '../components/communications/CommunicationDiagnostics';
import CommunicationImprovement from '../components/communications/CommunicationImprovement';
import { internalCommunicationsPage } from '../data/pages/internalCommunications';
import styles from './InternalCommunications.module.css';

const InternalCommunicationsPage = () => {
  return (
    <div className={styles.page}>
      <Hero {...internalCommunicationsPage.hero} />
      <CommunicationOverview overview={internalCommunicationsPage.overview} />
      <CommunicationTools tools={internalCommunicationsPage.tools} />
      <CommunicationDiagnostics
        diagnostics={internalCommunicationsPage.diagnostics}
        feedback={internalCommunicationsPage.feedback}
      />
      <CommunicationImprovement improvement={internalCommunicationsPage.improvement} />
    </div>
  );
};

export default InternalCommunicationsPage;
