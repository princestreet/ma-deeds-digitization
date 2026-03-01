import * as fs from "fs";
import * as path from "path";

const SOURCE = path.join(process.env.HOME!, "Desktop/ma-deeds-analysis");
const DATA_DIR = path.join(__dirname, "../src/data");
const CONTENT_DIR = path.join(__dirname, "../src/content");
const PUBLIC_DATA = path.join(__dirname, "../public/data");

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split("\n");
  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).filter(l => l.trim()).map(line => {
    const values = parseCSVLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = values[i] || ""; });
    return row;
  });
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') { current += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { current += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ",") { result.push(current.trim()); current = ""; }
      else { current += ch; }
    }
  }
  result.push(current.trim());
  return result;
}

// 1. Annual Totals
function processAnnualTotals() {
  const csv = fs.readFileSync(path.join(SOURCE, "annual_totals.csv"), "utf-8");
  const rows = parseCSV(csv);
  const data = rows.map(r => ({
    year: parseInt(r.Fiscal_Year),
    fund0049: parseFloat(r.Fund_0049_Expenses),
    fund0050: parseFloat(r.Fund_0050_Expenses),
    combined: parseFloat(r.Combined_Expenses),
    revenue0049: parseFloat(r.Fund_0049_Revenue),
    revenue0050: parseFloat(r.Fund_0050_Revenue),
    combinedRevenue: parseFloat(r.Combined_Revenue),
    balance0049: parseFloat(r.Fund_0049_Balance),
    balance0050: parseFloat(r.Fund_0050_Balance),
    inflationAdjusted: parseFloat(r.Combined_Expenses_2026_Dollars),
    note: r.Note || null,
  }));
  fs.writeFileSync(
    path.join(DATA_DIR, "annualTotals.ts"),
    `import { AnnualTotal } from "@/lib/types";\n\nexport const annualTotals: AnnualTotal[] = ${JSON.stringify(data, null, 2)};\n`
  );
  console.log(`  annualTotals: ${data.length} rows`);
}

// 2. Vendor Analysis
function processVendorAnalysis() {
  const csv = fs.readFileSync(path.join(SOURCE, "vendor_analysis.csv"), "utf-8");
  const rows = parseCSV(csv);
  const data = rows.map(r => ({
    rank: parseInt(r.Rank),
    vendor: r.Vendor,
    totalSpending: parseFloat(r.Total_Broad_Spending),
    transactionCount: parseInt(r.Transaction_Count),
    pctOfTotal: parseFloat(r.Pct_of_Total),
    cumulativePct: parseFloat(r.Cumulative_Pct),
    yearsActive: r.Years_Active,
    objectCodes: r.Object_Codes,
    likelyRole: r.Likely_Role,
  }));
  fs.writeFileSync(
    path.join(DATA_DIR, "vendorAnalysis.ts"),
    `import { Vendor } from "@/lib/types";\n\nexport const vendorAnalysis: Vendor[] = ${JSON.stringify(data, null, 2)};\n`
  );
  console.log(`  vendorAnalysis: ${data.length} rows`);
}

// 3. Object Code Breakdown (from classified CSV, Fund 0049 only, FY2010-2026)
function processObjectCodeBreakdown() {
  const csv = fs.readFileSync(path.join(SOURCE, "digitization_classified.csv"), "utf-8");
  const rows = parseCSV(csv);

  // Group by classification
  const categories: Record<string, number> = {
    "Direct Scanning & Imaging": 0,
    "IT Infrastructure & Equipment": 0,
    "Payroll & Salaries": 0,
    "Other / Excluded": 0,
  };

  const narrowCodes = new Set(["J33", "JJ2", "K06", "L46", "L26"]);
  const broadCodes = new Set(["U10", "U07", "U05", "U09", "U01", "U03", "H19", "E02", "K05", "U06"]);
  const payrollCodes = new Set(["A01", "A08", "A12", "A13", "A14"]);

  for (const r of rows) {
    const amt = parseFloat(r.Amount) || 0;
    const obj = r.Object?.trim();
    if (narrowCodes.has(obj)) categories["Direct Scanning & Imaging"] += amt;
    else if (broadCodes.has(obj)) categories["IT Infrastructure & Equipment"] += amt;
    else if (payrollCodes.has(obj)) categories["Payroll & Salaries"] += amt;
    else categories["Other / Excluded"] += amt;
  }

  const data = Object.entries(categories).map(([name, value]) => ({
    name,
    value: Math.round(value * 100) / 100,
  }));

  fs.writeFileSync(
    path.join(DATA_DIR, "objectCodeBreakdown.ts"),
    `import { ObjectCodeCategory } from "@/lib/types";\n\nexport const objectCodeBreakdown: ObjectCodeCategory[] = ${JSON.stringify(data, null, 2)};\n`
  );
  console.log(`  objectCodeBreakdown: ${data.length} categories`);
}

// 4. Narrow vs Broad by Year
function processNarrowVsBroad() {
  const csv = fs.readFileSync(path.join(SOURCE, "digitization_classified.csv"), "utf-8");
  const rows = parseCSV(csv);

  const narrowCodes = new Set(["J33", "JJ2", "K06", "L46", "L26"]);
  const broadCodes = new Set(["U10", "U07", "U05", "U09", "U01", "U03", "H19", "E02", "K05", "U06"]);

  const byYear: Record<number, { narrow: number; broad: number; total: number }> = {};

  for (const r of rows) {
    const year = parseInt(r.Budget_Fiscal_Year);
    if (!byYear[year]) byYear[year] = { narrow: 0, broad: 0, total: 0 };
    const amt = parseFloat(r.Amount) || 0;
    const obj = r.Object?.trim();
    byYear[year].total += amt;
    if (narrowCodes.has(obj)) byYear[year].narrow += amt;
    else if (broadCodes.has(obj)) byYear[year].broad += amt;
  }

  const data = Object.keys(byYear)
    .map(Number)
    .sort()
    .map(year => ({
      year,
      narrow: Math.round(byYear[year].narrow * 100) / 100,
      broadOnly: Math.round(byYear[year].broad * 100) / 100,
      broadTotal: Math.round((byYear[year].narrow + byYear[year].broad) * 100) / 100,
      fundTotal: Math.round(byYear[year].total * 100) / 100,
    }));

  fs.writeFileSync(
    path.join(DATA_DIR, "narrowVsBroad.ts"),
    `import { NarrowBroadYear } from "@/lib/types";\n\nexport const narrowVsBroad: NarrowBroadYear[] = ${JSON.stringify(data, null, 2)};\n`
  );
  console.log(`  narrowVsBroad: ${data.length} years`);
}

// 5. Scanning Contractors
function processScanningContractors() {
  const csv = fs.readFileSync(path.join(SOURCE, "digitization_classified.csv"), "utf-8");
  const rows = parseCSV(csv);

  const narrowCodes = new Set(["J33", "JJ2", "K06", "L46", "L26"]);
  const byVendor: Record<string, number> = {};

  for (const r of rows) {
    const obj = r.Object?.trim();
    if (narrowCodes.has(obj)) {
      const vendor = r.Vendor?.trim();
      if (vendor && vendor !== "UNASSIGNED") {
        byVendor[vendor] = (byVendor[vendor] || 0) + (parseFloat(r.Amount) || 0);
      }
    }
  }

  const data = Object.entries(byVendor)
    .map(([vendor, total]) => ({ vendor, total: Math.round(total * 100) / 100 }))
    .sort((a, b) => b.total - a.total)
    .filter(d => d.total > 0);

  fs.writeFileSync(
    path.join(DATA_DIR, "scanningContractors.ts"),
    `import { ScanningContractor } from "@/lib/types";\n\nexport const scanningContractors: ScanningContractor[] = ${JSON.stringify(data, null, 2)};\n`
  );
  console.log(`  scanningContractors: ${data.length} vendors`);
}

// 6. Registry Breakdown (hardcoded from FY2016 spending plan in final_report.md)
function processRegistryBreakdown() {
  const data = [
    { registry: "Boston (Suffolk)", planned: 1666050 },
    { registry: "Southern Middlesex", planned: 523873 },
    { registry: "Southern Essex", planned: 396560 },
    { registry: "Hampden", planned: 322375 },
    { registry: "Worcester", planned: 238212 },
    { registry: "Essex North", planned: 188020 },
    { registry: "Worcester North", planned: 145424 },
    { registry: "Berkshire Middle", planned: 136481 },
    { registry: "Berkshire North", planned: 121971 },
    { registry: "Middlesex North", planned: 93119 },
    { registry: "Berkshire South", planned: 67737 },
    { registry: "Hampshire", planned: 43000 },
    { registry: "Franklin", planned: 6000 },
  ];

  fs.writeFileSync(
    path.join(DATA_DIR, "registryBreakdown.ts"),
    `import { RegistryEntry } from "@/lib/types";\n\nexport const registryBreakdown: RegistryEntry[] = ${JSON.stringify(data, null, 2)};\n`
  );
  console.log(`  registryBreakdown: ${data.length} registries`);
}

// 7. Topline Stats
function processToplineStats() {
  const data = {
    nominalTotal: 151853555,
    inflationAdjustedTotal: 207115476,
    totalRevenue: 159500000,
    fund0049Total: 99568594,
    fund0050Total: 52284961,
    narrowTotal: 3267869,
    broadTotal: 37652750,
    fund0049FY10_26Total: 61839661,
    peakYear: 2010,
    peakSpending: 11807745,
    totalTransactions: 11103,
    yearsOfData: 22,
    numRegistries: 21,
    topVendorName: "Advanced Computer Services Inc.",
    topVendorTotal: 7764925,
    top5Pct: 49.4,
  };

  fs.writeFileSync(
    path.join(DATA_DIR, "toplineStats.ts"),
    `export const toplineStats = ${JSON.stringify(data, null, 2)} as const;\n`
  );
  console.log(`  toplineStats: written`);
}

// 8. Copy download files
function copyDownloads() {
  const copies: [string, string][] = [
    [path.join(SOURCE, "digitization_classified.csv"), "digitization_classified.csv"],
    [path.join(SOURCE, "digitization_master_dataset.csv"), "digitization_master_dataset.csv"],
    [path.join(SOURCE, "annual_totals.csv"), "annual_totals.csv"],
    [path.join(SOURCE, "vendor_analysis.csv"), "vendor_analysis.csv"],
    [path.join(SOURCE, "source-data/socrata/fund_0049_0050_fy2005_2026.csv"), "fund_0049_0050_fy2005_2026.csv"],
  ];

  for (const [src, dest] of copies) {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(PUBLIC_DATA, dest));
      const size = (fs.statSync(src).size / 1024 / 1024).toFixed(1);
      console.log(`  copied ${dest} (${size}MB)`);
    }
  }

  // PDFs
  const pdfDir = path.join(SOURCE, "source-data/legislative-pdfs");
  if (fs.existsSync(pdfDir)) {
    for (const f of fs.readdirSync(pdfDir)) {
      if (f.endsWith(".pdf")) {
        fs.copyFileSync(path.join(pdfDir, f), path.join(PUBLIC_DATA, f));
        console.log(`  copied ${f}`);
      }
    }
  }
}

// 9. Copy markdown content
function copyContent() {
  const mdFiles = ["executive_summary.md", "final_report.md", "technical_appendix.md", "ma-deeds-digitization-prompt.md"];
  for (const f of mdFiles) {
    const src = path.join(SOURCE, f);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(CONTENT_DIR, f));
      console.log(`  copied ${f}`);
    }
  }
}

// Run
console.log("Processing data...");
ensureDir(DATA_DIR);
ensureDir(CONTENT_DIR);
ensureDir(PUBLIC_DATA);

processAnnualTotals();
processVendorAnalysis();
processObjectCodeBreakdown();
processNarrowVsBroad();
processScanningContractors();
processRegistryBreakdown();
processToplineStats();
copyDownloads();
copyContent();
console.log("Done!");
