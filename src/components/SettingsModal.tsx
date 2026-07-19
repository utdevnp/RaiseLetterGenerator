'use client';

import { useState, useEffect } from 'react';
import { getStoredSettings, saveSettings, DEFAULT_SETTINGS, CompanySettings } from '@/lib/settings';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
}

export default function SettingsModal({ isOpen, onClose, onSave }: Props) {
  const [settings, setSettings] = useState<CompanySettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSettings(getStoredSettings());
    }
  }, [isOpen]);

  const handleSave = () => {
    saveSettings(settings);
    onSave?.();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark" 
        style={{ opacity: 0.5, zIndex: 1040 }}
        onClick={onClose}
      />
      <div 
        className="position-fixed top-0 end-0 h-100 bg-white shadow"
        style={{ width: '400px', maxWidth: '100%', zIndex: 1050, animation: 'slideIn 0.3s ease' }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="mb-0">Settings</h5>
          <button 
            className="btn btn-sm btn-outline-secondary" 
            onClick={onClose}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        
        <div className="p-3">
          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input
              type="text"
              className="form-control"
              value={settings.subject}
              onChange={(e) => setSettings({ ...settings, subject: e.target.value })}
              placeholder="Enter letter subject"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-control"
              value={settings.companyName}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              placeholder="Enter company name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Signatory Name (HR Officer)</label>
            <input
              type="text"
              className="form-control"
              value={settings.signatoryName}
              onChange={(e) => setSettings({ ...settings, signatoryName: e.target.value })}
              placeholder="Enter HR officer name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Signatory Designation</label>
            <input
              type="text"
              className="form-control"
              value={settings.signatoryDesignation}
              onChange={(e) => setSettings({ ...settings, signatoryDesignation: e.target.value })}
              placeholder="Enter designation"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Signature Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    setSettings({ ...settings, signature: ev.target?.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {settings.signature ? (
              <div className="mt-2">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={settings.signature}
                    alt="Signature preview"
                    style={{ maxHeight: '50px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setSettings({ ...settings, signature: '' })}
                    title="Remove signature"
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                </div>
                <small className="text-muted d-block mt-1">Signature preview shown above.</small>
              </div>
            ) : (
              <small className="text-muted d-block mt-1">
                Upload a PNG or JPG image of the signature. Use <code>{'{signature}'}</code> in your template.
              </small>
            )}
          </div>
        </div>

        <div className="p-3 border-top position-absolute bottom-0 w-100">
          <div className="d-flex gap-2">
            <button 
              className="btn btn-secondary flex-grow-1" 
              onClick={handleReset}
            >
              Reset
            </button>
            <button 
              className="btn btn-primary flex-grow-1" 
              onClick={handleSave}
            >
              {saved ? '✓ Saved!' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}