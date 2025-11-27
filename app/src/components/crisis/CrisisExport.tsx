import { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import type {
  CrisisChecklistCustomItem,
  CrisisChecklistItemId,
  CrisisManagementPageContent,
  CrisisPlanSnapshot
} from "../../data/pages/crisisManagement";
import styles from "./CrisisExport.module.css";

const FILE_NAME = "module-6-crisis-management.pdf";

type CrisisExportProps = {
  exportContent: CrisisManagementPageContent["export"];
  checklist: CrisisManagementPageContent["checklist"];
  checkedDefault: Record<CrisisChecklistItemId, boolean>;
  customItems: ReadonlyArray<CrisisChecklistCustomItem>;
  plan: CrisisManagementPageContent["plan"];
  planSnapshot: CrisisPlanSnapshot | null;
  cases: CrisisManagementPageContent["cases"];
  selectedCaseId: string | null;
};

type ExportStatus = "idle" | "loading" | "success" | "error";

const ensureSpace = (doc: any, cursor: { y: number }, extra: number) => {
  const height = doc.internal.pageSize.getHeight();
  if (cursor.y + extra > height - 72) {
    doc.addPage();
    cursor.y = 72;
  }
};

const CrisisExport = ({
  exportContent,
  checklist,
  checkedDefault,
  customItems,
  plan,
  planSnapshot,
  cases,
  selectedCaseId
}: CrisisExportProps) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<ExportStatus>("idle");
  const [message, setMessage] = useState("");

  const handleExport = async () => {
    setStatus("loading");
    setMessage(t(exportContent.statusPreparingKey));

    try {
      const [{ jsPDF }, autoTableModule] = await Promise.all([import("jspdf"), import("jspdf-autotable")]);
      const autoTable = (autoTableModule.default ?? autoTableModule) as (doc: any, options: any) => void;

      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const cursor = { y: 72 };

      doc.setFontSize(20);
      doc.text(t(exportContent.pdf.titleKey), pageWidth / 2, cursor.y, { align: "center" });
      cursor.y += 40;

      const addSectionTitle = (title: string) => {
        ensureSpace(doc, cursor, 32);
        doc.setFontSize(14);
        doc.text(title, 60, cursor.y);
        cursor.y += 24;
      };

      const addParagraph = (text: string) => {
        ensureSpace(doc, cursor, 20);
        doc.setFontSize(10);
        const wrapped = doc.splitTextToSize(text, pageWidth - 120);
        doc.text(wrapped, 60, cursor.y);
        cursor.y += wrapped.length * 14 + 8;
      };

      const addNotice = (text: string) => {
        ensureSpace(doc, cursor, 16);
        doc.setFontSize(9);
        doc.setTextColor(120);
        const wrapped = doc.splitTextToSize(text, pageWidth - 120);
        doc.text(wrapped, 60, cursor.y);
        cursor.y += wrapped.length * 12 + 6;
        doc.setTextColor(0, 0, 0);
      };

      const addTable = (rows: Array<[string, string]>, headers: [string, string]) => {
        ensureSpace(doc, cursor, rows.length * 24 + 40);
        autoTable(doc, {
          startY: cursor.y,
          head: [headers],
          body: rows,
          theme: "grid",
          styles: { fontSize: 10, cellPadding: 6 },
          headStyles: { fillColor: [249, 115, 22] },
          margin: { left: 60, right: 60 }
        });
        const last = (doc as any).lastAutoTable;
        cursor.y = (last?.finalY ?? cursor.y) + 18;
      };

      // Checklist section
      addSectionTitle(t(exportContent.pdf.checklistSectionKey));
      const checklistRows: Array<[string, string]> = checklist.items.map((item) => {
        const statusText = checkedDefault[item.id]
          ? t(exportContent.pdf.checklistStatusReadyKey)
          : t(exportContent.pdf.checklistStatusPendingKey);
        const label = `${t(item.titleKey)} — ${t(item.descriptionKey)}`;
        return [statusText, label];
      });
      customItems.forEach((item) => {
        const statusText = item.checked
          ? t(exportContent.pdf.checklistStatusReadyKey)
          : t(exportContent.pdf.checklistStatusPendingKey);
        checklistRows.push([statusText, item.text]);
      });
      addTable(checklistRows, [t(exportContent.pdf.checklistTable.statusKey), t(exportContent.pdf.checklistTable.itemKey)]);

      // Plan section
      addSectionTitle(t(exportContent.pdf.planSectionKey));
      const planRows: Array<[string, string]> = [];
      if (planSnapshot) {
        for (const field of plan.fields) {
          const value = planSnapshot.fields[field.id]?.trim();
          if (value) {
            const label = t(exportContent.pdf.planFieldLabels[field.id]);
            planRows.push([label, value]);
          }
        }
      }
      if (planRows.length > 0) {
        addTable(planRows, [t(exportContent.pdf.planTable.parameterKey), t(exportContent.pdf.planTable.valueKey)]);
      } else {
        addParagraph(t(exportContent.pdf.planEmptyKey));
      }

      // AI feedback section
      addSectionTitle(t(exportContent.pdf.aiSectionKey));
      if (planSnapshot?.aiFeedback) {
        addParagraph(`${t(exportContent.pdf.aiTitleKey)}\n${planSnapshot.aiFeedback}`);
        if (planSnapshot.aiNotice) {
          addNotice(planSnapshot.aiNotice);
        }
      } else {
        addParagraph(t(exportContent.pdf.aiEmptyKey));
      }

      // Case section
      addSectionTitle(t(exportContent.pdf.caseSectionKey));
      const scenario = cases.scenarios.find((item) => item.id === selectedCaseId) ?? null;
      if (scenario) {
        addParagraph(`${t(exportContent.pdf.caseDescriptionKey)} ${t(scenario.crisisKey)}`);
        addParagraph(t(exportContent.pdf.caseActionsKey));
        scenario.actions.forEach((action) => {
          addParagraph(`• ${t(action)}`);
        });
        addParagraph(`${t(exportContent.pdf.caseOutcomeKey)} ${t(scenario.outcomeKey)}`);
      } else {
        addParagraph(t(exportContent.pdf.caseEmptyKey));
      }

      doc.save(FILE_NAME);
      setStatus("success");
      setMessage(t(exportContent.statusSuccessKey));
    } catch (error) {
      setStatus("error");
      setMessage(t(exportContent.statusErrorKey));
    }
  };

  return (
    <section id="export" className={styles.section} aria-labelledby="export-title">
      <div className={styles.container} data-animate>
        <h2 id="export-title" className={styles.title}>
          {t(exportContent.titleKey)}
        </h2>
        <p className={styles.description}>{t(exportContent.descriptionKey)}</p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.button}
            onClick={handleExport}
            disabled={status === "loading"}
          >
            {t(exportContent.buttonKey)}
          </button>
          {message ? <p className={styles.status}>{message}</p> : null}
        </div>
      </div>
    </section>
  );
};

export default CrisisExport;
