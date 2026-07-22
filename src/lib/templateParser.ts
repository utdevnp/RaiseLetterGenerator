import { EmployeeData } from './excelParser';
import { DEFAULT_HTML_TEMPLATE } from './defaultTemplate';
import { getStoredSettings } from './settings';
import { setItem, getItem } from './storage';

const STORAGE_KEY = 'raiseLetterTemplate';

export function getStoredTemplate(): string {
  const stored = getItem(STORAGE_KEY);
  if (stored) {
    // Auto-migrate old saved templates to the latest compact table format.
    // The original default had padding:8px, then padding:4px 8px — both are
    // updated to padding:2px 8px so the sign-off block fits on one page.
    let migrated = stored
      .replace(/padding:[84]px(?: 8px)?; border:1px solid #000; text-align:left;/g, 'padding:2px 8px; border:1px solid #000; text-align:left;')
      .replace(/padding:[84]px(?: 8px)?; border:1px solid #000;/g, 'padding:2px 8px; border:1px solid #000;')
      .replace(/margin-top:1[06]px;/g, 'margin-top:4px;');
    if (migrated !== stored) {
      saveTemplate(migrated); // persist the migration
    }
    return migrated;
  }
  return DEFAULT_HTML_TEMPLATE;
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
  parsed = parsed.replace(/{subject}/g, settings.subject);

  // Strip any sign-off placeholders from the template body; they'll be
  // re-appended at the end so they always appear after "Thank You".
  parsed = parsed.replace(/{signatoryName}/g, '');
  parsed = parsed.replace(/{signatoryDesignation}/g, '');
  parsed = parsed.replace(/{companyName}/g, '');
  parsed = parsed.replace(/{signature}/g, '');

  // Clean up any leftover empty <p> tags (including those with only <br>)
  // that held the stripped placeholders
  parsed = parsed.replace(/<p>\s*(<br\s*\/?>\s*)*<\/p>/gi, '');

  // Always append the sign-off block after "Thank You" text
  parsed += `\n<p style="margin-top:12px;">`;
  if (settings.signature) {
    parsed += `<img src="${settings.signature}" alt="Signature" style="display:block; max-width:200px; max-height:50px; margin-top:6px; margin-bottom:3px;" /><br>`;
  }
  parsed += `${settings.signatoryName}<br>`;
  parsed += `${settings.signatoryDesignation}<br>`;
  parsed += `${settings.companyName}`;
  parsed += `</p>`;

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