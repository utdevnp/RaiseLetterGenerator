'use client';

export default function HowToUsePage() {
  return (
    <div className="container py-4">
      <nav className="mb-2 py-2 border-bottom">
        <div className="d-flex justify-content-center gap-3">
          <a href="/" className="text-decoration-none small text-muted">Home</a>
          <span className="text-muted small">|</span>
          <a href="/disclaimer" className="text-decoration-none small text-muted">Disclaimer</a>
          <span className="text-muted small">|</span>
          <a href="/how-to-use" className="text-decoration-none small fw-bold">How to Use</a>
        </div>
      </nav>

      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            <div className="card-body">
              <h3 className="mb-4">How to Use</h3>

              <h5 className="mt-4 text-primary">1. Upload Employee Data</h5>
              <p className="text-muted">
                Click on the upload area or drag and drop your Excel file (.xlsx or .xls) containing employee data.
              </p>
              
              <h6 className="mt-3">Required Excel Columns:</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-sm">
                  <thead className="table-light">
                    <tr>
                      <th>Column Name</th>
                      <th>Description</th>
                      <th>Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>name</td><td>Employee full name</td><td>John Doe</td></tr>
                    <tr><td>position</td><td>Current position</td><td>Trainee</td></tr>
                    <tr><td>date</td><td>Letter date</td><td>2080/04/04</td></tr>
                    <tr><td>newPosition</td><td>New position after promotion</td><td>Associate Software Engineer</td></tr>
                    <tr><td>effectiveDate</td><td>Effective date of change</td><td>1st Shrawan, 2080</td></tr>
                    <tr><td>previousTotal</td><td>Previous annual salary</td><td>276000</td></tr>
                    <tr><td>basicSalary</td><td>Basic monthly salary</td><td>25800</td></tr>
                    <tr><td>dearnessAllowance</td><td>Dearness allowance</td><td>12040</td></tr>
                    <tr><td>totalCashComponent</td><td>Total cash component</td><td>37840</td></tr>
                    <tr><td>pfEmployee</td><td>PF Contribution (Employee)</td><td>2580</td></tr>
                    <tr><td>grossSalary</td><td>Gross monthly salary</td><td>40420</td></tr>
                    <tr><td>lunchAllowance</td><td>Lunch allowance</td><td>5000</td></tr>
                    <tr><td>pfEmployer</td><td>PF Contribution (Employer)</td><td>2580</td></tr>
                    <tr><td>total</td><td>Total monthly amount</td><td>48000</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-muted small">
                <a href="/" className="text-decoration-none">Click here to download sample Excel file</a>
              </p>

              <h5 className="mt-4 text-primary">2. Configure Settings</h5>
              <p className="text-muted">
                Click the Settings button (gear icon) in the top right corner to configure:
              </p>
              <div className="table-responsive">
                <table className="table table-bordered table-sm">
                  <thead className="table-light">
                    <tr>
                      <th>Setting</th>
                      <th>Description</th>
                      <th>Default</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Subject</td><td>The letter subject line</td><td>Promotion and Raise Letter</td></tr>
                    <tr><td>Company Name</td><td>Your company name for the signature</td><td>Your Company Name</td></tr>
                    <tr><td>Signatory Name</td><td>The person signing the letter</td><td>Your Name</td></tr>
                    <tr><td>Signatory Designation</td><td>The signatory's job title</td><td>HR Officer</td></tr>
                  </tbody>
                </table>
              </div>

              <h5 className="mt-4 text-primary">3. Template Customization</h5>
              <p className="text-muted">
                The template is pre-configured with a standard raise letter format. You can customize it by:
              </p>
              <ul className="text-muted">
                <li>Clicking <strong>"Editor"</strong> tab to modify HTML directly</li>
                <li>Using the <strong>toolbar buttons</strong> for formatting (Bold, Italic, Underline, Headings, Tables, etc.)</li>
                <li>Clicking <strong>placeholder buttons</strong> to insert dynamic fields</li>
                <li>Clicking <strong>"Reset"</strong> to restore default template</li>
                <li>Clicking <strong>"Save Template"</strong> to save your custom template</li>
              </ul>

              <h6 className="mt-3">Available Placeholders:</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-sm">
                  <thead className="table-light">
                    <tr>
                      <th>Placeholder</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><code>{'{name}'}</code></td><td>Employee name</td></tr>
                    <tr><td><code>{'{position}'}</code></td><td>Current position</td></tr>
                    <tr><td><code>{'{date}'}</code></td><td>Letter date</td></tr>
                    <tr><td><code>{'{newPosition}'}</code></td><td>New position (promoted)</td></tr>
                    <tr><td><code>{'{effectiveDate}'}</code></td><td>Effective date</td></tr>
                    <tr><td><code>{'{previousTotal}'}</code></td><td>Previous annual salary</td></tr>
                    <tr><td><code>{'{basicSalary}'}</code></td><td>Basic salary</td></tr>
                    <tr><td><code>{'{dearnessAllowance}'}</code></td><td>Dearness allowance</td></tr>
                    <tr><td><code>{'{totalCashComponent}'}</code></td><td>Total cash component</td></tr>
                    <tr><td><code>{'{pfEmployee}'}</code></td><td>PF (Employee)</td></tr>
                    <tr><td><code>{'{grossSalary}'}</code></td><td>Gross salary</td></tr>
                    <tr><td><code>{'{lunchAllowance}'}</code></td><td>Lunch allowance</td></tr>
                    <tr><td><code>{'{pfEmployer}'}</code></td><td>PF (Employer)</td></tr>
                    <tr><td><code>{'{total}'}</code></td><td>Total amount</td></tr>
                    <tr><td><code>{'{subject}'}</code></td><td>Letter subject (from settings)</td></tr>
                    <tr><td><code>{'{signatoryName}'}</code></td><td>Signatory name (from settings)</td></tr>
                    <tr><td><code>{'{signatoryDesignation}'}</code></td><td>Signatory designation (from settings)</td></tr>
                    <tr><td><code>{'{companyName}'}</code></td><td>Company name (from settings)</td></tr>
                  </tbody>
                </table>
              </div>

              <h5 className="mt-4 text-primary">Custom Fields (Create Your Own)</h5>
              <p className="text-muted">
                You can add your own custom columns in the Excel file and use them in the template. 
                The system automatically detects any additional columns and makes them available as placeholders.
              </p>

              <h6 className="mt-3">Example: Adding Custom Fields</h6>
              <p className="text-muted">
                Suppose you want to add <strong>department</strong> and <strong>employeeId</strong> to your Excel:
              </p>
              <div className="table-responsive">
                <table className="table table-bordered table-sm">
                  <thead className="table-light">
                    <tr>
                      <th>name</th>
                      <th>position</th>
                      <th>department</th>
                      <th>employeeId</th>
                      <th>...other columns</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John Doe</td>
                      <td>Software Engineer</td>
                      <td>IT Department</td>
                      <td>EMP001</td>
                      <td>...</td>
                    </tr>
                    <tr>
                      <td>Jane Smith</td>
                      <td>Product Manager</td>
                      <td>Product</td>
                      <td>EMP002</td>
                      <td>...</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h6 className="mt-3">How to Use Custom Fields in Template:</h6>
              <p className="text-muted">
                Simply use the column name as a placeholder with curly braces. The system converts column names to lowercase and removes spaces:
              </p>
              <ul className="text-muted">
                <li><code>{'{department}'}</code> → IT Department</li>
                <li><code>{'{employeeId}'}</code> → EMP001</li>
              </ul>

              <h6 className="mt-3">Example Template Code:</h6>
              <pre className="bg-light p-3 rounded small">
{`<p>Dear {name},</p>
<p>We are pleased to inform you about your promotion in the <strong>{department}</strong> department.</p>
<p>Your Employee ID: {employeeId}</p>
<p>Position: {position} → {newPosition}</p>
<p>New Salary: {total}</p>

<p>Best regards,</p>
<p>{signatoryName}<br/>
{signatoryDesignation}<br/>
{companyName}</p>`}
              </pre>

              <h6 className="mt-3">Tips for Custom Fields:</h6>
              <ul className="text-muted">
                <li>Use simple column names without special characters (use letters, numbers, not symbols)</li>
                <li>Column names are converted to lowercase automatically</li>
                <li>Spaces in column names are removed (e.g., "Employee ID" becomes <code>{'{employeeid}'}</code>)</li>
                <li>You can mix standard and custom fields together</li>
              </ul>

              <h5 className="mt-4 text-primary">4. Generate Letters</h5>
              <p className="text-muted">
                Select an employee from the list to preview their letter. You can:
              </p>
              <ul className="text-muted">
                <li><strong>Copy Text</strong> - Copy formatted text to paste in email</li>
                <li><strong>Download</strong> - Download individual PDF</li>
                <li><strong>Download All</strong> - Download all letters as ZIP file</li>
              </ul>

              <h5 className="mt-4 text-primary">5. Privacy & Security</h5>
              <ul className="text-muted">
                <li>Your employee data is processed entirely within your browser</li>
                <li>No data is uploaded to any server</li>
                <li>Template and settings are saved locally on your device (encrypted)</li>
                <li>You can clear data by clearing browser's local storage</li>
              </ul>

              <div className="mt-4">
                <a href="/" className="btn btn-primary">
                  <i className="bi bi-arrow-left me-2"></i>
                  Start Using Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-3 py-3 border-top mt-4">
        <a href="/" className="text-decoration-none small">Home</a>
        <span className="text-muted small">|</span>
        <a href="/disclaimer" className="text-decoration-none small text-muted">Disclaimer</a>
        <span className="text-muted small">|</span>
        <a href="/how-to-use" className="text-decoration-none small">How to Use</a>
      </div>
    </div>
  );
}