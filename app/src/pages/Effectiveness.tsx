import { useState } from 'react';
import Hero from '../components/hero/Hero';
import KpiWorksheet from '../components/effectiveness/KpiWorksheet';
import PdcaCycle from '../components/effectiveness/PdcaCycle';
import KpiBrainstorm from '../components/effectiveness/KpiBrainstorm';
import EffectivenessExport from '../components/effectiveness/EffectivenessExport';
import { effectivenessPage } from '../data/pages/effectiveness';
import styles from './Effectiveness.module.css';
import type { BrainstormResult, WorksheetSelection } from '../data/pages/effectiveness';

const EffectivenessPage = () => {
  const [worksheetSelections, setWorksheetSelections] = useState<Record<string, WorksheetSelection>>({});
  const [brainstormResult, setBrainstormResult] = useState<BrainstormResult | null>(null);

  const handleAreaUpdate = (areaId: string, selection: WorksheetSelection) => {
    setWorksheetSelections((prev) => ({ ...prev, [areaId]: selection }));
  };

  return (
    <div className={styles.page}>
      <Hero {...effectivenessPage.hero} />
      <KpiWorksheet worksheet={effectivenessPage.worksheet} onAreaUpdate={handleAreaUpdate} />
      <PdcaCycle pdca={effectivenessPage.pdca} />
      <KpiBrainstorm brainstorm={effectivenessPage.brainstorm} onUpdate={setBrainstormResult} />
      <EffectivenessExport
        exportContent={effectivenessPage.export}
        worksheet={effectivenessPage.worksheet}
        pdca={effectivenessPage.pdca}
        brainstormContent={effectivenessPage.brainstorm}
        selections={worksheetSelections}
        brainstormResult={brainstormResult}
      />
    </div>
  );
};

export default EffectivenessPage;
