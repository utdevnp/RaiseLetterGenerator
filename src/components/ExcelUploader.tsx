'use client';

import { useState, useRef } from 'react';
import { parseExcelFile, EmployeeData, downloadSampleExcel } from '@/lib/excelParser';

interface Props {
  onDataLoaded: (data: EmployeeData[]) => void;
}

export default function ExcelUploader({ onDataLoaded }: Props) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      setError('Please upload a valid Excel file (.xlsx or .xls)');
      return;
    }

    setLoading(true);
    setError(null);

    const result = await parseExcelFile(file);

    if (result.success) {
      onDataLoaded(result.data);
    } else {
      setError(result.error || 'Failed to parse Excel file');
    }

    setLoading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="mb-4">
      <h5 className="mb-3">Upload Employee Data</h5>
      
      <div
        className={`upload-zone ${isDragOver ? 'dragover' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        
        {loading ? (
          <div>
            <div className="spinner-border text-primary mb-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mb-0">Processing file...</p>
          </div>
        ) : (
          <div>
            <p className="mb-1">
              <strong>Drag & drop your Excel file here</strong>
            </p>
            <p className="text-muted small mb-0">or click to browse</p>
          </div>
        )}
      </div>

      {error && (
        <div className="alert alert-danger mt-3 mb-0" role="alert">
          {error}
        </div>
      )}

      <div className="mt-3">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={downloadSampleExcel}
        >
          Download Sample Excel
        </button>
      </div>
    </div>
  );
}