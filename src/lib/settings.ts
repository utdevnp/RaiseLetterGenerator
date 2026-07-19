import { setItem, getItem } from './storage';

export interface CompanySettings {
  companyName: string;
  signatoryName: string;
  signatoryDesignation: string;
  subject: string;
  signature: string; // base64/png data URL of the signature image
}

const STORAGE_KEY = 'companySettings';

export const DEFAULT_SETTINGS: CompanySettings = {
  companyName: 'Your Company Name',
  signatoryName: 'Your Name',
  signatoryDesignation: 'HR Officer',
  subject: 'Promotion and Raise Letter',
  signature: ''
};

export function getStoredSettings(): CompanySettings {
  const stored = getItem(STORAGE_KEY);
  if (stored) {
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: CompanySettings): void {
  setItem(STORAGE_KEY, JSON.stringify(settings));
}