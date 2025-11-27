declare module 'jspdf' {
  // Minimal surface covering our usage
  export interface JsPDFOptions {
    unit?: string;
    format?: string | number[];
  }

  export class jsPDF {
    constructor(options?: JsPDFOptions);
    internal: {
      pageSize: {
        getWidth(): number;
        getHeight(): number;
      };
    };
    addPage(): void;
    save(filename: string): void;
    setFontSize(size: number): void;
    setTextColor(r: number, g?: number, b?: number): void;
    splitTextToSize(text: string, size: number): string[];
    text(
      text: string | string[],
      x: number,
      y: number,
      options?: { align?: string }
    ): void;
  }
}

declare module 'jspdf-autotable' {
  import type { jsPDF } from 'jspdf';

  export type AutoTableOptions = {
    startY?: number;
    head?: Array<string[]>;
    body?: Array<Array<string>>;
    theme?: string;
    styles?: Record<string, unknown>;
    headStyles?: Record<string, unknown>;
    margin?: { left?: number; right?: number };
  };

  export type AutoTablePlugin = (doc: jsPDF, options: AutoTableOptions) => void;

  const autoTable: AutoTablePlugin;
  export default autoTable;
}
