export interface AnnualTotal {
  year: number;
  fund0049: number;
  fund0050: number;
  combined: number;
  revenue0049: number;
  revenue0050: number;
  combinedRevenue: number;
  balance0049: number;
  balance0050: number;
  inflationAdjusted: number;
  note: string | null;
}

export interface Vendor {
  rank: number;
  vendor: string;
  totalSpending: number;
  transactionCount: number;
  pctOfTotal: number;
  cumulativePct: number;
  yearsActive: string;
  objectCodes: string;
  likelyRole: string;
}

export interface ObjectCodeCategory {
  name: string;
  value: number;
}

export interface NarrowBroadYear {
  year: number;
  narrow: number;
  broadOnly: number;
  broadTotal: number;
  fundTotal: number;
}

export interface ScanningContractor {
  vendor: string;
  total: number;
}

export interface RegistryEntry {
  registry: string;
  planned: number;
}
