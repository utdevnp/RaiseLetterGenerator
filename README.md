# Raise Letter Generator

A simple tool to generate professional raise letters from Excel data with customizable HTML templates and PDF export.

## The Story

One of my friends works as an HR manager and recently had to send raise letters to over 50 employees, which meant using the same template again and again while manually changing names, salaries, and dates—a tedious and time-consuming process. She asked if I could help simplify it, and I was glad to take on the challenge.

I built a simple tool called **Raise Letter Generator**, where she can upload an Excel file with employee details, customize a single template, and generate professional PDF letters in seconds. It completely removed the need for repetitive copy-pasting and made the whole process much more efficient.

What stood out to me wasn't just the tool itself, but the impact—it felt great to create something practical that genuinely made someone's work easier.

## Features

- **Excel Upload** — Import employee data from Excel (.xlsx, .xls) files
- **Flexible Columns** — Supports 17+ standard columns + custom fields
- **Customizable Template** — Edit the HTML letter template with live preview
- **PDF Export** — Generate individual PDFs or download all as ZIP
- **Copy to Clipboard** — Copy formatted letter for email or documents
- **Local Storage** — Settings and templates saved locally (encrypted)
- **Privacy First** — All data processed in browser, nothing uploaded to server

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Bootstrap 5 + Bootstrap Icons
- **PDF Generation**: jsPDF + html2canvas
- **Excel Parsing**: xlsx
- **ZIP Creation**: JSZip

## Prerequisites

- Node.js 18+
- A web browser

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Excel Columns Supported

| Column | Description |
|--------|-------------|
| Name | Employee full name |
| Position | Job title |
| Company | Company name |
| Manager Name | Reporting manager |
| Current Salary | Current salary amount |
| New Salary | Proposed salary |
| Raise Percentage | % increase |
| Start Date | Effective date |
| Department | Department name |
| Location | Office location |
| + Custom fields | Any additional columns |

## Template Placeholders

Use these in your HTML template: `{{name}}`, `{{position}}`, `{{company}}`, `{{managerName}}`, `{{currentSalary}}`, `{{newSalary}}`, `{{raisePercentage}}`, `{{startDate}}`, etc.

## Pages

- **Home** — Upload Excel, edit template, generate letters
- **How to Use** — Detailed guide with examples
- **Disclaimer** — Privacy and terms information

## Privacy

All employee data is processed locally in your browser. No data is sent to any server. Only your template and settings are saved in localStorage (Base64 encoded).

## License

MIT License