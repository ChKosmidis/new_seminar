import { useState } from 'react';
import styles from './CasesExport.module.css';
import { useTranslation } from '../../hooks/useTranslation';
import type { CaseStudy, CasesPageContent } from '../../data/pages/cases';

const FILE_NAME = 'module-8-cases-and-practice.pdf';

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

type CasesExportProps = {
  exportContent: CasesPageContent['export'];
  selection: SelectionState;
  advisorSnapshot: AdvisorSnapshot;
};

const hexToRgb = (value: string) => {
  const hex = value.replace('#', '');
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b] as const;
};

const CasesExport = ({ exportContent, selection, advisorSnapshot }: CasesExportProps) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const statusRole = status === 'error' ? 'alert' : 'status';

  const handleExport = async () => {
    setStatus('loading');
    setMessage(t(exportContent.statusPreparingKey));

    try {
      const [{ jsPDF }] = await Promise.all([import('jspdf')]);
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const width = doc.internal.pageSize.getWidth();
      const height = doc.internal.pageSize.getHeight();
      const cursor = { y: 72 };

      const ensureSpace = (extra: number) => {
        if (cursor.y + extra > height - 72) {
          doc.addPage();
          cursor.y = 72;
        }
      };

      const addSectionTitle = (text: string) => {
        ensureSpace(32);
        doc.setFontSize(14);
        doc.text(text, 60, cursor.y);
        cursor.y += 26;
      };

      const addParagraph = (text: string) => {
        ensureSpace(20);
        doc.setFontSize(10);
        const lines = doc.splitTextToSize(text, width - 120);
        doc.text(lines, 60, cursor.y);
        cursor.y += lines.length * 14 + 8;
      };

      const addNotice = (text: string) => {
        ensureSpace(16);
        doc.setFontSize(9);
        doc.setTextColor(120);
        const lines = doc.splitTextToSize(text, width - 120);
        doc.text(lines, 60, cursor.y);
        cursor.y += lines.length * 12 + 6;
        doc.setTextColor(0, 0, 0);
      };

      doc.setFontSize(20);
      doc.text(t(exportContent.pdf.titleKey), width / 2, cursor.y, { align: 'center' });
      cursor.y += 40;

      addSectionTitle(t(exportContent.pdf.descriptionTitleKey));
      if (advisorSnapshot.description) {
        addParagraph(advisorSnapshot.description);
      } else {
        addParagraph(t(exportContent.pdf.descriptionEmptyKey));
      }

      addSectionTitle(t(exportContent.pdf.aiTitleKey));
      if (advisorSnapshot.result) {
        addParagraph(advisorSnapshot.result);
      } else {
        addParagraph(t(exportContent.pdf.aiEmptyKey));
      }
      if (advisorSnapshot.notice) {
        addNotice(`${t(exportContent.pdf.aiNoticeKey)} ${advisorSnapshot.notice}`.trim());
      }

      addSectionTitle(t(exportContent.pdf.filtersTitleKey));
      const hasFilters = selection.interests.length > 0 || selection.conditions.length > 0;
      if (!hasFilters) {
        addParagraph(t(exportContent.pdf.filtersEmptyKey));
      } else {
        if (selection.interests.length > 0) {
          addParagraph(`${t(exportContent.pdf.filtersInterestsKey)} ${selection.interests.join(', ')}`);
        }
        if (selection.conditions.length > 0) {
          addParagraph(`${t(exportContent.pdf.filtersConditionsKey)} ${selection.conditions.join(', ')}`);
        }
      }

      addSectionTitle(t(exportContent.pdf.casesTitleKey));
      if (selection.cases.length === 0) {
        addParagraph(t(exportContent.pdf.caseEmptyKey));
      } else {
        selection.cases.forEach((item, index) => {
          ensureSpace(60);
          const [r, g, b] = hexToRgb(item.color);
          doc.setTextColor(r, g, b);
          doc.setFontSize(12);
          doc.text(`${index + 1}. ${item.title}`, 60, cursor.y);
          cursor.y += 18;

          doc.setTextColor(55, 65, 81);
          doc.setFontSize(9.5);
          addParagraph(`${t(exportContent.pdf.caseTagsKey)} ${item.tags.join(', ')}`);
          addParagraph(`${t(exportContent.pdf.caseAspectsKey)} ${item.aspects.join(' • ')}`);
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(10);
          addParagraph(item.description);

          if (item.link) {
            addParagraph(`${t(exportContent.pdf.caseLinkKey)} ${item.link}`);
          }

          if (item.disclaimer) {
            addNotice(`${t(exportContent.pdf.caseDisclaimerKey)} ${item.disclaimer}`);
          }
        });
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
    <section id="export" className={styles.section} aria-labelledby="cases-export-title">
      <div className={styles.container} data-animate>
        <h2 id="cases-export-title" className={styles.title}>
          {t(exportContent.titleKey)}
        </h2>
        <p className={styles.description}>{t(exportContent.descriptionKey)}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.button} onClick={handleExport} disabled={status === 'loading'}>
            {t(exportContent.buttonKey)}
          </button>
          {message ? (
            <p className={styles.status} role={statusRole} aria-live="polite">
              {message}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default CasesExport;
