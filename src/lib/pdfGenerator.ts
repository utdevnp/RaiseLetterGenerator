import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { EmployeeData } from './excelParser';
import { parseTemplate } from './templateParser';

export async function generateSinglePDF(
  element: HTMLElement,
  employee: EmployeeData
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff'
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  const imgX = (pdfWidth - imgWidth * ratio) / 2;
  const imgY = 10;

  const height = imgHeight * ratio;
  pdf.addImage(imgData, 'PNG', imgX, imgY, pdfWidth - 20, height);

  const fileName = `${employee.serialNo}_${employee.name.replace(/\s+/g, '_')}_${employee.position.replace(/\s+/g, '_')}.pdf`;
  pdf.save(fileName);
}

export async function generateAllPDFsAsZip(
  elements: HTMLElement[],
  employees: EmployeeData[]
): Promise<void> {
  const zip = new JSZip();

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const employee = employees[i];

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 10;

    const height = imgHeight * ratio;
    pdf.addImage(imgData, 'PNG', imgX, imgY, pdfWidth - 20, height);

    const fileName = `${employee.serialNo}_${employee.name.replace(/\s+/g, '_')}_${employee.position.replace(/\s+/g, '_')}.pdf`;
    zip.file(fileName, pdf.output('blob'));
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(content);
  link.download = `raise_letters_${new Date().toISOString().split('T')[0]}.zip`;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function generatePDFName(employee: EmployeeData): string {
  return `${employee.serialNo}_${employee.name.replace(/\s+/g, '_')}_${employee.position.replace(/\s+/g, '_')}.pdf`;
}