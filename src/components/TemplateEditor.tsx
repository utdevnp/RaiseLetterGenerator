'use client';

import { useState, useEffect, useRef } from 'react';
import { getStoredTemplate, saveTemplate, getPlaceholders, getDefaultHtmlTemplate, parseTemplate } from '@/lib/templateParser';
import { EmployeeData } from '@/lib/excelParser';
import { getStoredSettings } from '@/lib/settings';

interface Props {
  employees?: EmployeeData[];
  onTemplateChange?: (template: string) => void;
}

export default function TemplateEditor({ employees = [], onTemplateChange }: Props) {
  const [template, setTemplate] = useState('');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('preview');
  const [showHelp, setShowHelp] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const stored = getStoredTemplate();
    setTemplate(stored);
  }, []);

  const handleChange = (value: string) => {
    setTemplate(value);
    onTemplateChange?.(value);
  };

  const handleSave = () => {
    saveTemplate(template);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const handleReset = () => {
    handleChange(getDefaultHtmlTemplate());
  };

  const insertAtCursor = (text: string) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = template.substring(start, end);
    const newText = template.substring(0, start) + text + template.substring(end);
    
    handleChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length + selectedText.length);
    }, 0);
  };

  const insertPlaceholder = (placeholder: string) => {
    insertAtCursor(placeholder);
  };

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      handleChange(editorRef.current.value);
    }
  };

  const placeholders = getPlaceholders();

  const sampleEmployee: EmployeeData = employees.length > 0 ? employees[0] : {
    serialNo: 1,
    name: 'John Doe',
    position: 'Trainee',
    date: '2080/04/04',
    newPosition: 'Associate Software Engineer',
    effectiveDate: '1st Shrawan, 2080',
    previousTotal: 276000,
    basicSalary: 25800,
    dearnessAllowance: 12040,
    totalCashComponent: 37840,
    pfEmployee: 2580,
    grossSalary: 40420,
    lunchAllowance: 5000,
    pfEmployer: 2580,
    total: 48000,
    signatoryName: 'Ruchita Pathak',
    signatoryDesignation: 'HR Officer',
    companyName: 'Smart Ideas Pvt. Ltd.'
  };

  const getPreviewContent = () => {
    return parseTemplate(template, sampleEmployee);
  };

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Letter Template (HTML)</h5>
        <div>
          <button
            className="btn btn-sm btn-outline-info me-2"
            onClick={() => setShowHelp(!showHelp)}
          >
            {showHelp ? 'Hide' : 'Show'} Placeholders
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      {showHelp && (
        <div className="alert alert-info mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong className="mb-0">Available Placeholders:</strong>
            <button
              className="btn btn-sm btn-link"
              onClick={() => setShowHelp(false)}
            >
              Close
            </button>
          </div>
          <div className="mb-2">
            {placeholders.map((p) => (
              <button
                key={p}
                className="btn btn-sm btn-outline-primary me-1 mb-1"
                onClick={() => insertPlaceholder(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <small className="text-muted">
            Click to insert placeholders in your HTML template.
          </small>
        </div>
      )}

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'editor' ? 'active' : ''}`}
            onClick={() => setActiveTab('editor')}
          >
            Editor
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
        </li>
      </ul>

      {activeTab === 'editor' ? (
        <div className="template-editor">
          <div className="border rounded mb-2 p-2 bg-light d-flex flex-wrap gap-1">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => insertAtCursor('<b></b>')}
              title="Bold"
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => insertAtCursor('<i></i>')}
              title="Italic"
            >
              <em>I</em>
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => insertAtCursor('<u></u>')}
              title="Underline"
            >
              <u>U</u>
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => insertAtCursor('<h1></h1>')}
              title="Heading 1"
            >
              H1
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => insertAtCursor('<h2></h2>')}
              title="Heading 2"
            >
              H2
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => insertAtCursor('<h3></h3>')}
              title="Heading 3"
            >
              H3
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => insertAtCursor('<p></p>')}
              title="Paragraph"
            >
              ¶
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => insertAtCursor('<br>')}
              title="Line Break"
            >
              ↵ 
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => insertAtCursor('<ul>\n  <li></li>\n</ul>')}
              title="Bullet List"
            >
              •
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => insertAtCursor('<table border="1" cellpadding="5" cellspacing="0" style="width:100%;">\n  <tr><th></th></tr>\n  <tr><td></td></tr>\n</table>')}
              title="Table"
            >
              ⊞
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => insertAtCursor('<div style="border: 1px solid #ccc; padding: 10px;"></div>')}
              title="Box"
            >
              □
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => insertAtCursor('<center></center>')}
              title="Center"
            >
              ☰
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => insertAtCursor('<hr>')}
              title="Horizontal Line"
            >
              —
            </button>
          </div>
          <textarea
            ref={editorRef}
            className="form-control font-monospace"
            value={template}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Enter your HTML letter template here..."
            rows={15}
            style={{ fontSize: '14px' }}
          />
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <small className="text-muted">Preview (Sample: {sampleEmployee.name})</small>
          </div>
          <div className="card-body p-4 bg-white border" style={{ minHeight: '300px' }}>
            <div
              className="letter-content"
              dangerouslySetInnerHTML={{ __html: getPreviewContent() }}
            />
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mt-3">
        <p className="text-muted small mb-0">
          Use HTML tags for formatting. Click placeholders above to insert.
        </p>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleSave}
        >
          {savedMessage ? '✓ Saved!' : 'Save Template'}
        </button>
      </div>
    </div>
  );
}