'use client';

import { useState, useEffect } from 'react';
import { EmployeeData } from '@/lib/excelParser';
import { getStoredTemplate, parseTemplate } from '@/lib/templateParser';

interface Props {
  employees: EmployeeData[];
}

export default function LetterPreview({ employees }: Props) {
  const [template, setTemplate] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setTemplate(getStoredTemplate());
  }, []);

  if (employees.length === 0) {
    return null;
  }

  const currentEmployee = employees[selectedIndex];
  const parsedContent = parseTemplate(template, currentEmployee);

  return (
    <div className="row">
      <div className="col-md-4 mb-3 mb-md-0">
        <div className="card">
          <div className="card-header">
            <h6 className="mb-0">Employee List</h6>
          </div>
          <div className="card-body p-0 employee-table">
            <div className="list-group list-group-flush">
              {employees.map((emp, index) => (
                <button
                  key={emp.serialNo}
                  className={`list-group-item list-group-item-action ${
                    index === selectedIndex ? 'active' : ''
                  }`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span>
                      <strong>{emp.serialNo}.</strong> {emp.name}
                    </span>
                    <small className="text-muted">{emp.position}</small>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-8">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h6 className="mb-0">
              Preview: {currentEmployee.name} ({currentEmployee.position})
            </h6>
            <span className="badge bg-secondary">#{currentEmployee.serialNo}</span>
          </div>
          <div className="card-body p-0">
            <div
              className="letter-preview letter-content p-4"
              id="letter-preview"
              dangerouslySetInnerHTML={{ __html: parsedContent.replace(/\n/g, '<br>') }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}