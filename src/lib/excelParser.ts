import * as XLSX from 'xlsx';

export interface EmployeeData {
  serialNo: number;
  name: string;
  position: string;
  date: string;
  newPosition: string;
  effectiveDate: string;
  previousTotal: number;
  basicSalary: number;
  dearnessAllowance: number;
  totalCashComponent: number;
  pfEmployee: number;
  grossSalary: number;
  lunchAllowance: number;
  pfEmployer: number;
  total: number;
  signatoryName: string;
  signatoryDesignation: string;
  companyName: string;
}

export interface ParseResult {
  success: boolean;
  data: EmployeeData[];
  error?: string;
}

const ALL_COLUMNS = [
  'name', 'position', 'date', 'newposition', 'effectivedate', 'previoustotal',
  'basicsalary', 'dearnessallowance', 'totalcashcomponent', 'pfemployee',
  'grosssalary', 'lunchallowance', 'pfemployer', 'total',
  'signatoryname', 'signatorydesignation', 'companyname'
];

function normalizeColumnName(name: string): string {
  return String(name).trim().toLowerCase().replace(/\s+/g, '');
}

function getColumnIndex(headers: string[], columnName: string): number {
  const variants = [
    columnName,
    columnName.replace(/([A-Z])/g, ' $1').trim(),
    columnName.replace(/([a-z])([A-Z])/g, '$1 $2')
  ];
  for (const variant of variants) {
    const idx = headers.findIndex(h => normalizeColumnName(h) === normalizeColumnName(variant));
    if (idx !== -1) return idx;
  }
  return -1;
}

export function parseExcelFile(file: File): Promise<ParseResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false }) as any[][];

        if (jsonData.length < 2) {
          resolve({
            success: false,
            data: [],
            error: 'Excel file is empty or has no data rows'
          });
          return;
        }

        const headers = jsonData[0].map(h => normalizeColumnName(String(h)));
        const columnMap: Record<string, number> = {};

        ALL_COLUMNS.forEach(col => {
          const index = getColumnIndex(headers, col);
          if (index !== -1) {
            columnMap[col] = index;
          }
        });

        const nameIdx = columnMap['name'] !== undefined ? columnMap['name'] : getColumnIndex(headers, 'name');
        
        if (nameIdx === -1) {
          resolve({
            success: false,
            data: [],
            error: 'Excel file must have a "name" column'
          });
          return;
        }

        const employees: EmployeeData[] = [];
        let serialNo = 1;

        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];
          const name = String(row[nameIdx] || '').trim();

          if (!name) {
            continue;
          }

          const getVal = (col: string, def: string | number = ''): any => {
            if (columnMap[col] === undefined) return def;
            const val = row[columnMap[col]];
            if (typeof def === 'number') return parseFloat(val) || 0;
            return String(val || def);
          };

          const employee: EmployeeData = {
            serialNo: serialNo++,
            name: name,
            position: getVal('position', ''),
            date: getVal('date', ''),
            newPosition: getVal('newposition', ''),
            effectiveDate: getVal('effectivedate', ''),
            previousTotal: getVal('previoustotal', 0),
            basicSalary: getVal('basicsalary', 0),
            dearnessAllowance: getVal('dearnessallowance', 0),
            totalCashComponent: getVal('totalcashcomponent', 0),
            pfEmployee: getVal('pfemployee', 0),
            grossSalary: getVal('grosssalary', 0),
            lunchAllowance: getVal('lunchallowance', 0),
            pfEmployer: getVal('pfemployer', 0),
            total: getVal('total', 0),
            signatoryName: getVal('signatoryname', 'HR Officer'),
            signatoryDesignation: getVal('signatorydesignation', 'HR Officer'),
            companyName: getVal('companyname', 'Company Name')
          };

          employees.push(employee);
        }

        if (employees.length === 0) {
          resolve({
            success: false,
            data: [],
            error: 'No valid employee data found in the Excel file'
          });
          return;
        }

        resolve({
          success: true,
          data: employees
        });
      } catch (error) {
        resolve({
          success: false,
          data: [],
          error: 'Failed to parse Excel file. Please ensure it is a valid .xlsx or .xls file.'
        });
      }
    };

    reader.onerror = () => {
      resolve({
        success: false,
        data: [],
        error: 'Failed to read file'
      });
    };

    reader.readAsBinaryString(file);
  });
}

export function downloadSampleExcel(): void {
  const sampleData = [
    {
      name: 'Avipsha Shahi',
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
    },
    {
      name: 'Rahul Sharma',
      position: 'Junior Developer',
      date: '2080/04/04',
      newPosition: 'Software Engineer',
      effectiveDate: '1st Shrawan, 2080',
      previousTotal: 350000,
      basicSalary: 32000,
      dearnessAllowance: 15000,
      totalCashComponent: 47000,
      pfEmployee: 3200,
      grossSalary: 50200,
      lunchAllowance: 5000,
      pfEmployer: 3200,
      total: 58200,
      signatoryName: 'Ruchita Pathak',
      signatoryDesignation: 'HR Officer',
      companyName: 'Smart Ideas Pvt. Ltd.'
    }
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

  XLSX.writeFile(workbook, 'sample_employees.xlsx');
}