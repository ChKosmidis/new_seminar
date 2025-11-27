import { useState } from "react";
import Hero from "../components/hero/Hero";
import ResilienceMatrix from "../components/crisis/ResilienceMatrix";
import CrisisChecklist from "../components/crisis/CrisisChecklist";
import CrisisPlan from "../components/crisis/CrisisPlan";
import CrisisCaseStudies from "../components/crisis/CrisisCaseStudies";
import CrisisExport from "../components/crisis/CrisisExport";
import {
  crisisManagementPage,
  type CrisisChecklistCustomItem,
  type CrisisChecklistItemId,
  type CrisisPlanSnapshot
} from "../data/pages/crisisManagement";
import styles from "./CrisisManagement.module.css";

const CrisisManagementPage = () => {
  const [checkedDefault, setCheckedDefault] = useState<Record<CrisisChecklistItemId, boolean>>(() => ({
    community: false,
    communications: false,
    infrastructure: false,
    security: false
  }));
  const [customItems, setCustomItems] = useState<CrisisChecklistCustomItem[]>([]);
  const [planSnapshot, setPlanSnapshot] = useState<CrisisPlanSnapshot | null>(null);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const handleToggleDefault = (id: CrisisChecklistItemId) => {
    setCheckedDefault((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddCustom = (text: string) => {
    setCustomItems((prev) => [
      ...prev,
      { id: `custom-${Date.now()}-${prev.length}`, text, checked: false }
    ]);
  };

  const handleToggleCustom = (id: string) => {
    setCustomItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleRemoveCustom = (id: string) => {
    setCustomItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.page}>
      <Hero {...crisisManagementPage.hero} />
      <ResilienceMatrix resilience={crisisManagementPage.resilience} />
      <CrisisChecklist
        checklist={crisisManagementPage.checklist}
        checkedDefault={checkedDefault}
        onToggleDefault={handleToggleDefault}
        customItems={customItems}
        onAddCustom={handleAddCustom}
        onToggleCustom={handleToggleCustom}
        onRemoveCustom={handleRemoveCustom}
      />
      <CrisisPlan plan={crisisManagementPage.plan} onSnapshot={setPlanSnapshot} />
      <CrisisCaseStudies
        cases={crisisManagementPage.cases}
        selectedId={selectedCaseId}
        onSelect={setSelectedCaseId}
      />
      <CrisisExport
        exportContent={crisisManagementPage.export}
        checklist={crisisManagementPage.checklist}
        checkedDefault={checkedDefault}
        customItems={customItems}
        plan={crisisManagementPage.plan}
        planSnapshot={planSnapshot}
        cases={crisisManagementPage.cases}
        selectedCaseId={selectedCaseId}
      />
    </div>
  );
};

export default CrisisManagementPage;
