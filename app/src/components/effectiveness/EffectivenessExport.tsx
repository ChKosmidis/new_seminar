import { useState } from 'react';
import styles from './EffectivenessExport.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type {
  BrainstormResult,
  EffectivenessPageContent,
  WorksheetSelection
} from '../../data/pages/effectiveness';

const FILE_NAME = 'module-5-effectiveness.pdf';

const ensureSpace = (doc: any, cursor: { y: number }, extra: number) => {
  const height = doc.internal.pageSize.getHeight();
  if (cursor.y + extra > height - 72) {
    doc.addPage();
    cursor.y = 72;
  }
};

type EffectivenessExportProps = {
  exportContent: EffectivenessPageContent['export'];
  worksheet: EffectivenessPageContent['worksheet'];
  pdca: EffectivenessPageContent['pdca'];
  brainstormContent: EffectivenessPageContent['brainstorm'];
  selections: Record<string, WorksheetSelection>;
  brainstormResult: BrainstormResult | null;
};

const EffectivenessExport = ({
  exportContent,
  worksheet,
  pdca,
  brainstormContent,
  selections,
  brainstormResult
}: EffectivenessExportProps) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleExport = async () => {
    setStatus('loading');
    setMessage(t(exportContent.statusPreparingKey));

    try {
      const [{ jsPDF }, autoTableModule] = await Promise.all([import('jspdf'), import('jspdf-autotable')]);
      const autoTable = (autoTableModule.default ?? autoTableModule) as (doc: any, options: any) => void;

      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const cursor = { y: 72 };

      doc.setFontSize(20);
      doc.text(t(exportContent.pdf.titleKey), pageWidth / 2, cursor.y, { align: 'center' });
      cursor.y += 36;

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
        const wrapped = doc.splitTextToSize(text, pageWidth - 120);
        doc.setTextColor(120);
        doc.text(wrapped, 60, cursor.y);
        cursor.y += wrapped.length * 12 + 6;
        doc.setTextColor(0, 0, 0);
      };

      const addTable = (rows: Array<[string, string]>) => {
        autoTable(doc, {
          startY: cursor.y,
          head: [[t(exportContent.pdf.parameterKey), t(exportContent.pdf.valueKey)]],
          body: rows,
          theme: 'grid',
          styles: { fontSize: 10, cellPadding: 6 },
          headStyles: { fillColor: [253, 193, 7] },
          margin: { left: 60, right: 60 }
        });
        const last = (doc as any).lastAutoTable;
        cursor.y = (last?.finalY ?? cursor.y) + 18;
      };

      // Worksheet section (SMART Builder)
      addSectionTitle(t(exportContent.pdf.worksheetSectionKey));
      
      worksheet.categories.forEach((cat) => {
        const selection = selections[cat.id];
        if (!selection || !selection.smart) return;

        ensureSpace(doc, cursor, 40);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`${t(cat.titleKey)}`, 60, cursor.y);
        cursor.y += 16;

        addTable([
            ['Specific', selection.smart.s],
            ['Measurable', selection.smart.m],
            ['Achievable', selection.smart.a],
            ['Relevant', selection.smart.r],
            ['Time-bound', selection.smart.t]
        ]);

        if (selection.aiFeedback) {
           doc.setFontSize(11);
           doc.text(t(exportContent.pdf.aiWorksheetTitleKey), 60, cursor.y);
           cursor.y += 14;
           addParagraph(selection.aiFeedback);
           if (selection.aiNotice) {
             addNotice(selection.aiNotice);
           }
        }
      });


      // PDCA section
      addSectionTitle(t(exportContent.pdf.pdcaSectionKey));
      pdca.steps.forEach((step) => {
        doc.setFontSize(11);
        doc.text(`• ${t(step.titleKey)}`, 60, cursor.y);
        cursor.y += 14;
        addParagraph(t(step.descriptionKey));
        addParagraph(t(step.exampleKey));
      });

      // Brainstorm section
      if (brainstormResult) {
        const areaLabel = brainstormContent.options.find((option) => option.id === brainstormResult.areaId);
        addSectionTitle(t(exportContent.pdf.brainstormSectionKey));
        addTable([
          [t(brainstormContent.areaLabelKey), areaLabel ? t(areaLabel.labelKey) : ''],
          [t(brainstormContent.kpiLabelKey), brainstormResult.kpi],
          [t(brainstormContent.rationaleLabelKey), brainstormResult.rationale]
        ]);
        if (brainstormResult.feedback) {
          doc.setFontSize(11);
          doc.text(t(exportContent.pdf.aiBrainstormTitleKey), 60, cursor.y);
          cursor.y += 14;
          addParagraph(brainstormResult.feedback);
          if (brainstormResult.notice) {
            addNotice(brainstormResult.notice);
          }
        }
      }

      doc.save(FILE_NAME);
      setStatus('success');
      setMessage(t(exportContent.statusSuccessKey));
    } catch (error) {
      setStatus('error');
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
            disabled={status === 'loading'}
          >
            {t(exportContent.buttonKey)}
          </button>
          {message ? <p className={styles.status}>{message}</p> : null}
        </div>
      </div>
    </section>
  );
};

export default EffectivenessExport;