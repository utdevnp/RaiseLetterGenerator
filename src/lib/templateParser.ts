import { EmployeeData } from './excelParser';
import { DEFAULT_HTML_TEMPLATE } from './defaultTemplate';
import { getStoredSettings } from './settings';
import { setItem, getItem } from './storage';

const STORAGE_KEY = 'raiseLetterTemplate';

export function getStoredTemplate(): string {
  const stored = getItem(STORAGE_KEY);
  return stored || DEFAULT_HTML_TEMPLATE;
}

export function saveTemplate(template: string): void {
  setItem(STORAGE_KEY, template);
}

export function parseTemplate(template: string, employee: EmployeeData): string {
  const settings = getStoredSettings();
  let parsed = template;

  parsed = parsed.replace(/{name}/g, employee.name);
  parsed = parsed.replace(/{position}/g, employee.position);
  parsed = parsed.replace(/{date}/g, employee.date);
  parsed = parsed.replace(/{newPosition}/g, employee.newPosition);
  parsed = parsed.replace(/{effectiveDate}/g, employee.effectiveDate);
  parsed = parsed.replace(/{previousTotal}/g, formatNumber(employee.previousTotal));
  parsed = parsed.replace(/{basicSalary}/g, formatNumber(employee.basicSalary));
  parsed = parsed.replace(/{dearnessAllowance}/g, formatNumber(employee.dearnessAllowance));
  parsed = parsed.replace(/{totalCashComponent}/g, formatNumber(employee.totalCashComponent));
  parsed = parsed.replace(/{pfEmployee}/g, formatNumber(employee.pfEmployee));
  parsed = parsed.replace(/{grossSalary}/g, formatNumber(employee.grossSalary));
  parsed = parsed.replace(/{lunchAllowance}/g, formatNumber(employee.lunchAllowance));
  parsed = parsed.replace(/{pfEmployer}/g, formatNumber(employee.pfEmployer));
  parsed = parsed.replace(/{total}/g, formatNumber(employee.total));
  parsed = parsed.replace(/{signatoryName}/g, settings.signatoryName);
  parsed = parsed.replace(/{signatoryDesignation}/g, settings.signatoryDesignation);

  // Replace {signature} with an embedded image if available
  if (settings.signature) {
    parsed = parsed.replace(
      /{signature}/g,
      `<img src="${settings.signature}" alt="Signature" style="max-height: 60px; margin-top: 5px;" />`
    );
  } else {
    parsed = parsed.replace(/{signature}/g, '');
  }
  parsed = parsed.replace(/{companyName}/g, settings.companyName);
  parsed = parsed.replace(/{subject}/g, settings.subject);

  return parsed;
}

function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}

export function getDefaultTemplate(): string {
  return DEFAULT_HTML_TEMPLATE;
}

export function getDefaultHtmlTemplate(): string {
  return DEFAULT_HTML_TEMPLATE;
}

export function getPlaceholders(): string[] {
  return [
    '{name}', '{position}', '{date}', '{newPosition}', '{effectiveDate}',
    '{previousTotal}', '{basicSalary}', '{dearnessAllowance}', '{totalCashComponent}',
    '{pfEmployee}', '{grossSalary}', '{lunchAllowance}', '{pfEmployer}', '{total}',
    '{signatoryName}', '{signatoryDesignation}', '{companyName}', '{subject}',
    '{signature}'
  ];
}