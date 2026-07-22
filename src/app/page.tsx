"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { EmployeeData } from "@/lib/excelParser";
import { getStoredTemplate, parseTemplate } from "@/lib/templateParser";
import { generateSinglePDF, generateAllPDFsAsZip } from "@/lib/pdfGenerator";
import ExcelUploader from "@/components/ExcelUploader";
import TemplateEditor from "@/components/TemplateEditor";
import SettingsModal from "@/components/SettingsModal";
import { getStoredSettings } from "@/lib/settings";

export default function Home() {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [template, setTemplate] = useState("");
  const [downloadingSingle, setDownloadingSingle] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [settingsKey, setSettingsKey] = useState(0);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    setTemplate(getStoredTemplate());
  }, []);

  const refreshTemplate = useCallback(() => {
    setSettingsKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      const html = employees.map((emp) => parseTemplate(template, emp));
      setGeneratedHtml(html);
    }
  }, [employees, template, settingsKey]);

  const handleDataLoaded = (data: EmployeeData[]) => {
    setEmployees(data);
    setSelectedIndex(0);
  };

  const handleTemplateChange = (newTemplate: string) => {
    setTemplate(newTemplate);
  };

  const handleDownloadSingle = async (index: number) => {
    const html = generatedHtml[index];
    if (!html) return;

    setDownloadingSingle(true);
    try {
      await generateSinglePDFFromHtml(html, employees[index]);
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Error generating PDF: " + err);
    }
    setDownloadingSingle(false);
  };

  const handleDownloadAll = async () => {
    if (generatedHtml.length === 0) {
      alert("Please upload employee data first");
      return;
    }

    setDownloadingZip(true);
    try {
      await generateAllPdfFromHtml(generatedHtml, employees);
    } catch (err) {
      console.error("Error generating ZIP:", err);
      alert("Error generating ZIP: " + err);
    }
    setDownloadingZip(false);
  };

  const handleCopyText = async () => {
    const html = generatedHtml[selectedIndex];
    if (!html) return;

    try {
      const blob = new Blob([html], { type: "text/html" });
      const textBlob = new Blob([html.replace(/<[^>]*>/g, " ")], {
        type: "text/plain",
      });

      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": blob,
          "text/plain": textBlob,
        }),
      ]);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      await navigator.clipboard.writeText(html.replace(/<[^>]*>/g, " "));
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    }
  };

  if (employees.length === 0) {
    return (
      <div>
        {showBanner && (
          <div key="banner" className="bg-secondary text-white py-1">
            <div className="container">
              <div className="d-flex justify-content-between align-items-center">
                <span className="small">
                  <i className="bi bi-file-earmark-text me-1"></i>
                  Raise letter generator by{" "}
                  <a
                    href="https://github.com/utdevnp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none fw-bold"
                  >
                    @utdevnp
                  </a>
                  , want to explore more tools click on username.
                </span>
                <button
                  className="btn btn-sm btn-outline-light border-0 py-0 px-1"
                  onClick={() => setShowBanner(false)}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <div className="position-relative mb-3">
                  <h1 className="h3 mb-0 text-primary">
                    Raise Letter Generator
                  </h1>
                  <div
                    className="position-absolute"
                    style={{
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => setShowSettings(true)}
                    >
                      <i className="bi bi-gear"></i> Settings
                    </button>
                    <a
                      href="/how-to-use"
                      className="btn btn-sm btn-outline-secondary"
                      title="How to Use"
                    >
                      <i className="bi bi-question-circle"></i>
                    </a>
                  </div>
                </div>
                <p className="text-muted">
                  Upload an Excel file with employee data to generate raise
                  letters
                </p>
              </div>

              <div className="card mb-4">
                <div className="card-body">
                  <ExcelUploader onDataLoaded={handleDataLoaded} />
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <TemplateEditor onTemplateChange={handleTemplateChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4 mb-5">
          <small
            className="text-muted"
            style={{ maxWidth: "600px", display: "inline-block" }}
          >
            <i className="bi bi-shield-lock me-1"></i>
            <strong>Disclaimer:</strong> Your employee data and Excel files are
            processed entirely within your browser and are never uploaded to any
            server. We do not store, copy, or retain any of your personal
            information. Only your template and settings are saved locally on
            your device for convenience, and they are encrypted for security.
          </small>
        </div>
        <div className="d-flex justify-content-center gap-3 py-3 border-top">
          <a href="/" className="text-decoration-none small">
            Home
          </a>
          <span className="text-muted small">|</span>
          <a
            href="/disclaimer"
            className="text-decoration-none small text-muted"
          >
            Disclaimer
          </a>
          <span className="text-muted small">|</span>
          <a
            href="/how-to-use"
            className="text-decoration-none small text-muted"
          >
            How to Use
          </a>
        </div>
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onSave={refreshTemplate}
        />
      </div>
    );
  }

  const currentEmployee = employees[selectedIndex];
  const parsedContent = generatedHtml[selectedIndex] || "";

  return (
    <div>
      {showBanner && (
        <div key="banner" className="bg-secondary text-white py-1">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <span className="small">
                <i className="bi bi-file-earmark-text me-1"></i>
                Raise letter generator by{" "}
                <a
                  href="https://github.com/utdevnp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none fw-bold"
                >
                  @utdevnp
                </a>
              </span>
              <button
                className="btn btn-sm btn-outline-light border-0 py-0 px-1"
                onClick={() => setShowBanner(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h4 mb-1 text-primary">Raise Letter Generator</h1>
            <p className="text-muted mb-0 small">
              {employees.length} employee{employees.length !== 1 ? "s" : ""}{" "}
              loaded
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setShowSettings(true)}
            >
              <i className="bi bi-gear"></i> Settings
            </button>
            <a
              href="/how-to-use"
              className="btn btn-outline-secondary btn-sm"
              title="How to Use"
            >
              <i className="bi bi-question-circle"></i>
            </a>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => {
                setEmployees([]);
                setSelectedIndex(0);
              }}
            >
              Upload New File
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3 mb-4">
            <div className="card">
              <div className="card-header">
                <h6 className="mb-0">Employees</h6>
              </div>
              <div className="p-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search by name or position..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div
                className="card-body p-0 employee-table"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <div className="list-group list-group-flush">
                  {filteredEmployees.length === 0 ? (
                    <div className="p-3 text-center text-muted small">
                      No employees found
                    </div>
                  ) : (
                    filteredEmployees.map((emp, index) => {
                      const originalIndex = employees.indexOf(emp);
                      return (
                        <button
                          key={emp.serialNo}
                          className={`list-group-item list-group-item-action ${originalIndex === selectedIndex ? "active text-white" : ""}`}
                          onClick={() => setSelectedIndex(originalIndex)}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <div className={`fw-semibold ${originalIndex === selectedIndex ? 'text-white' : ''}`}>{emp.serialNo}. {emp.name}</div>
                              <small className={originalIndex === selectedIndex ? 'text-white-50' : 'text-muted'}>{emp.position}</small>
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="table-responsive">
                <table className="table table-sm table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.slice(0, 5).map((emp) => (
                      <tr key={emp.serialNo}>
                        <td>{emp.serialNo}</td>
                        <td>{emp.name}</td>
                        <td>{emp.total.toLocaleString()}</td>
                      </tr>
                    ))}
                    {employees.length > 5 && (
                      <tr>
                        <td colSpan={3} className="text-center text-muted">
                          +{employees.length - 5} more...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="text-muted small">
                {employees.length} employee{employees.length !== 1 ? "s" : ""}
              </span>
              <div className="d-flex gap-2">
                <button
                  className={`btn ${copiedHtml ? "btn-success" : "btn-outline-secondary"}`}
                  onClick={handleCopyText}
                >
                  <i className="bi bi-clipboard"></i>{" "}
                  {copiedHtml ? "Copied!" : "Copy Text"}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDownloadSingle(selectedIndex)}
                  disabled={downloadingSingle}
                >
                  <i className="bi bi-download"></i>{" "}
                  {downloadingSingle ? "Downloading..." : " Download"}
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleDownloadAll}
                  disabled={downloadingZip}
                >
                  {downloadingZip
                    ? "Zipping..."
                    : `Download All (${employees.length}) as ZIP`}
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="mb-0">
                  Preview: {currentEmployee.name} - {currentEmployee.position}
                </h6>
                <span className="badge bg-secondary">
                  #{currentEmployee.serialNo}
                </span>
              </div>
              <div className="card-body p-0" style={{ overflow: "auto" }}>
                <div
                  className="letter-preview"
                  dangerouslySetInnerHTML={{ __html: parsedContent }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4 mb-4">
          <small
            className="text-muted"
            style={{ maxWidth: "600px", display: "inline-block" }}
          >
            <i className="bi bi-shield-lock me-1"></i>
            <strong>Disclaimer:</strong> Your employee data and Excel files are
            processed entirely within your browser and are never uploaded to any
            server. We do not store, copy, or retain any of your personal
            information. Only your template and settings are saved locally on
            your device for convenience, and they are encrypted for security.
          </small>
        </div>
        <div className="d-flex justify-content-center gap-3 py-3 border-top">
          <a href="/" className="text-decoration-none small">
            Home
          </a>
          <span className="text-muted small">|</span>
          <a
            href="/disclaimer"
            className="text-decoration-none small text-muted"
          >
            Disclaimer
          </a>
          <span className="text-muted small">|</span>
          <a
            href="/how-to-use"
            className="text-decoration-none small text-muted"
          >
            How to Use
          </a>
        </div>
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onSave={refreshTemplate}
        />
      </div>
    </div>
  );
}

/**
 * Wait for every <img> element inside the given container to finish loading,
 * or until a safety timeout. This ensures images are rendered before
 * html2canvas captures the container.
 */
function waitForContainerImages(container: HTMLElement): Promise<void> {
  const imgs = Array.from(container.querySelectorAll('img'));
  if (imgs.length === 0) return Promise.resolve();

  const loads = imgs.map((img) => {
    // If the image is already complete, resolve immediately
    if (img.complete) return Promise.resolve();
    return new Promise<void>((resolve) => {
      img.addEventListener('load', () => resolve(), { once: true });
      img.addEventListener('error', () => resolve(), { once: true });
      // Safety timeout in case events never fire
      setTimeout(() => resolve(), 15000);
    });
  });
  return Promise.all(loads).then(() => undefined);
}

async function generatePdfBlob(
  html: string,
  employee: EmployeeData,
): Promise<Blob> {
  const { jsPDF } = await import("jspdf");
  const html2canvas = (await import("html2canvas")).default;

  const container = document.createElement("div");
  container.innerHTML = html;

  // Inject style reset to override Bootstrap's p margin that causes
  // content to overflow the PDF page boundary.
  const resetStyle = document.createElement("style");
  resetStyle.textContent = `p { margin: 0 0 10px 0 !important; }`;
  container.appendChild(resetStyle);

  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.zIndex = "-1";
  container.style.width = "451px";
  container.style.padding = "0";
  container.style.background = "#ffffff";
  container.style.color = "#000000";
  container.style.fontWeight = "normal";
  container.style.fontFamily = '"Times New Roman", Times, serif';
  container.style.fontSize = "12px";
  container.style.lineHeight = "1.4";
  container.style.boxSizing = "border-box";
  container.style.setProperty("-webkit-font-smoothing", "antialiased");
  container.style.textRendering = "optimizeLegibility";

  document.body.appendChild(container);

  try {
    // Wait for images inside the container to load
    await waitForContainerImages(container);

    const canvas = await html2canvas(container, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      removeContainer: false,
      imageTimeout: 15000,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.92);
    const pdf = new jsPDF("p", "pt", "a4");

    const pdfW = 595;
    const pdfH = 842;
    const marginInch = 72;
    const contentW = pdfW - 2 * marginInch;
    const scalePdf = contentW / canvas.width;
    const renderW = canvas.width * scalePdf;
    const renderH = canvas.height * scalePdf;
    const renderX = marginInch;
    const renderY = marginInch;

    // Multi-page support: if content exceeds available page height, split
    const pageH = pdfH - 2 * marginInch;
    if (renderH <= pageH) {
      pdf.addImage(imgData, "JPEG", renderX, renderY, renderW, renderH);
    } else {
      const pageCanvasPx = pageH / scalePdf;
      let srcY = 0;
      let pageNum = 0;
      while (srcY < canvas.height) {
        if (pageNum > 0) pdf.addPage();
        const cropH = Math.min(pageCanvasPx, canvas.height - srcY);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = cropH;
        const ctx = tempCanvas.getContext("2d")!;
        ctx.drawImage(canvas, 0, srcY, canvas.width, cropH, 0, 0, canvas.width, cropH);
        pdf.addImage(tempCanvas.toDataURL("image/jpeg", 0.92), "JPEG", renderX, renderY, renderW, cropH * scalePdf);
        srcY += cropH;
        pageNum++;
      }
    }
    return pdf.output("blob");
  } finally {
    document.body.removeChild(container);
  }
}

async function generateSinglePDFFromHtml(
  html: string,
  employee: EmployeeData,
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const html2canvas = (await import("html2canvas")).default;

  const container = document.createElement("div");
  container.innerHTML = html;

  // Inject style reset to override Bootstrap's p margin that causes
  // content to overflow the PDF page boundary.
  const resetStyle = document.createElement("style");
  resetStyle.textContent = `p { margin: 0 0 10px 0 !important; }`;
  container.appendChild(resetStyle);

  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.zIndex = "-1";
  container.style.width = "451px";
  container.style.padding = "0";
  container.style.background = "#ffffff";
  container.style.color = "#000000";
  container.style.fontWeight = "normal";
  container.style.fontFamily = '"Times New Roman", Times, serif';
  container.style.fontSize = "12px";
  container.style.lineHeight = "1.4";
  container.style.boxSizing = "border-box";
  container.style.setProperty("-webkit-font-smoothing", "antialiased");
  container.style.textRendering = "optimizeLegibility";

  document.body.appendChild(container);

  try {
    // Wait for images inside the container to load
    await waitForContainerImages(container);

    const canvas = await html2canvas(container, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      removeContainer: false,
      imageTimeout: 15000,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.92);
    const pdf = new jsPDF("p", "pt", "a4");

    const pdfW = 595;
    const pdfH = 842;
    const marginInch = 72;
    const contentW = pdfW - 2 * marginInch;
    const scalePdf = contentW / canvas.width;
    const renderW = canvas.width * scalePdf;
    const renderH = canvas.height * scalePdf;
    const renderX = marginInch;
    const renderY = marginInch;

    // Multi-page support: if content exceeds available page height, split
    const pageH = pdfH - 2 * marginInch;
    if (renderH <= pageH) {
      pdf.addImage(imgData, "JPEG", renderX, renderY, renderW, renderH);
    } else {
      const pageCanvasPx = pageH / scalePdf;
      let srcY = 0;
      let pageNum = 0;
      while (srcY < canvas.height) {
        if (pageNum > 0) pdf.addPage();
        const cropH = Math.min(pageCanvasPx, canvas.height - srcY);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = cropH;
        const ctx = tempCanvas.getContext("2d")!;
        ctx.drawImage(canvas, 0, srcY, canvas.width, cropH, 0, 0, canvas.width, cropH);
        pdf.addImage(tempCanvas.toDataURL("image/jpeg", 0.92), "JPEG", renderX, renderY, renderW, cropH * scalePdf);
        srcY += cropH;
        pageNum++;
      }
    }

    const fileName = `${employee.serialNo}_${employee.name.replace(/\s+/g, "_")}_${employee.position.replace(/\s+/g, "_")}.pdf`;
    pdf.save(fileName);
  } finally {
    document.body.removeChild(container);
  }
}

async function generateAllPdfFromHtml(
  htmlList: string[],
  employees: EmployeeData[],
): Promise<void> {
  const JSZip = (await import("jszip")).default;
  const { jsPDF } = await import("jspdf");
  const html2canvas = (await import("html2canvas")).default;

  const zip = new JSZip();

  for (let i = 0; i < htmlList.length; i++) {
    const html = htmlList[i];
    const employee = employees[i];

    const container = document.createElement("div");
    container.innerHTML = html;

    // Inject style reset to override Bootstrap's p margin that causes
    // content to overflow the PDF page boundary.
    const resetStyle = document.createElement("style");
    resetStyle.textContent = `p { margin: 0 0 10px 0 !important; }`;
    container.appendChild(resetStyle);

    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.zIndex = "-1";
    container.style.width = "451px";
    container.style.padding = "0";
    container.style.background = "#ffffff";
    container.style.color = "#000000";
    container.style.fontWeight = "normal";
    container.style.fontFamily = '"Times New Roman", Times, serif';
    container.style.fontSize = "12px";
    container.style.lineHeight = "1.4";
    container.style.boxSizing = "border-box";
    container.style.setProperty("-webkit-font-smoothing", "antialiased");
    container.style.textRendering = "optimizeLegibility";

    document.body.appendChild(container);

    try {
      // Wait for images inside the container to load
      await waitForContainerImages(container);

      const canvas = await html2canvas(container, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        removeContainer: false,
        imageTimeout: 15000,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const pdf = new jsPDF("p", "pt", "a4");

      const pdfW = 595;
      const pdfH = 842;
      const marginInch = 72;
      const contentW = pdfW - 2 * marginInch;
      const scalePdf = contentW / canvas.width;
      const renderW = canvas.width * scalePdf;
      const renderH = canvas.height * scalePdf;
      const renderX = marginInch;
      const renderY = marginInch;

      // Multi-page support: if content exceeds available page height, split
      const pageH = pdfH - 2 * marginInch;
      if (renderH <= pageH) {
        pdf.addImage(imgData, "JPEG", renderX, renderY, renderW, renderH);
      } else {
        const pageCanvasPx = pageH / scalePdf;
        let srcY = 0;
        let pageNum = 0;
        while (srcY < canvas.height) {
          if (pageNum > 0) pdf.addPage();
          const cropH = Math.min(pageCanvasPx, canvas.height - srcY);
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = canvas.width;
          tempCanvas.height = cropH;
          const ctx = tempCanvas.getContext("2d")!;
          ctx.drawImage(canvas, 0, srcY, canvas.width, cropH, 0, 0, canvas.width, cropH);
          pdf.addImage(tempCanvas.toDataURL("image/jpeg", 0.92), "JPEG", renderX, renderY, renderW, cropH * scalePdf);
          srcY += cropH;
          pageNum++;
        }
      }

      const fileName = `${employee.serialNo}_${employee.name.replace(/\s+/g, "_")}_${employee.position.replace(/\s+/g, "_")}.pdf`;
      zip.file(fileName, pdf.output("blob"));
    } finally {
      document.body.removeChild(container);
    }
  }

  const content = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(content);
  link.download = `raise_letters_${new Date().toISOString().split("T")[0]}.zip`;
  link.click();
  URL.revokeObjectURL(link.href);
}
