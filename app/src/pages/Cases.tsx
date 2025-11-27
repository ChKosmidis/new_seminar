import { useState } from 'react';
import Hero from '../components/hero/Hero';
import CaseMatcher from '../components/cases/CaseMatcher';
import CaseAdvisor from '../components/cases/CaseAdvisor';
import CasesExport from '../components/cases/CasesExport';
import { casesPage } from '../data/pages/cases';
import styles from './Cases.module.css';
import type { CaseStudy } from '../data/pages/cases';

type SelectionState = {
  interests: ReadonlyArray<string>;
  conditions: ReadonlyArray<string>;
  cases: ReadonlyArray<CaseStudy>;
};

type AdvisorSnapshot = {
  description: string;
  result: string;
  notice: string | null;
};

const CasesPage = () => {
  const [selection, setSelection] = useState<SelectionState>({ interests: [], conditions: [], cases: [] });
  const [advisorSnapshot, setAdvisorSnapshot] = useState<AdvisorSnapshot>({ description: '', result: '', notice: null });

  return (
    <div className={styles.page}>
      <Hero {...casesPage.hero} />
      <CaseMatcher matcher={casesPage.matcher} onSelectionChange={setSelection} />
      <CaseAdvisor advisor={casesPage.advisor} cases={casesPage.matcher.cases} onResultChange={setAdvisorSnapshot} />
      <CasesExport exportContent={casesPage.export} selection={selection} advisorSnapshot={advisorSnapshot} />
    </div>
  );
};

export default CasesPage;
