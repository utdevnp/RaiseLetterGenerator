export function encodeData(data: string): string {
  return btoa(encodeURIComponent(data));
}

export function decodeData(encoded: string): string {
  try {
    return decodeURIComponent(atob(encoded));
  } catch {
    return '';
  }
}

export function setItem(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, encodeData(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export function getItem(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const encoded = localStorage.getItem(key);
    if (!encoded) return null;
    const decoded = decodeData(encoded);
    return decoded || null;
  } catch (e) {
    console.error('Failed to read from localStorage:', e);
    return null;
  }
}