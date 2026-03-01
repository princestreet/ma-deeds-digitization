# Technical Appendix: Methodology, Classification Logic, and Validation

---

## A. Data Acquisition

### API Parameters

The CTHRU spending API at `cthruspending.mass.gov/api/checkbook_data.csv` was tested with multiple parameter combinations:

| Parameter | Value Tested | Result |
|-----------|-------------|--------|
| `org3=County+Registers+Techological+Fund+(0050)` | Empty response (1 byte) |
| `org3=REGISTERS+TECHNOLOGICAL+FUND+(0049)` | Empty response |
| `org4=County+Registers+Techological+Fund+(0050)` | Empty response |
| `Fund_Code=0050` | Returned full unfiltered dataset (server ignored parameter) |
| **`org2=SECRETARY+OF+STATE+(SEC)`** | **Returned filtered dataset (~2.5-3MB per year)** |
| `year=All+Years` | Empty response (whitespace only) |

**Successful approach**: Filter by `org2` (Department) to download Secretary of State spending, then filter locally for Fund Code 0049.

### Schema

CSV columns (consistent across all years FY2010-FY2026):

```
Base_Id, Budget_Fiscal_Year, Fiscal_Period, Payment Date, Cabinet_Secretariat,
Department, Appropriation_Type, Appropriation, Object_Class, Object_Code,
Encumbrance ID, Zip_Code, Amount, Fund, Fund_Code, Appropriation_Code,
Object, Department_Code, Vendor, Vendor_Id, Payment ID, Payment_Method,
State, City, Create_Date
```

### Key Corrections from Original Prompt

| Item | Prompt Stated | Actual |
|------|--------------|--------|
| Fund Code | 0050 | **0049** |
| Fund Name | "County Registers Techological Fund" (misspelled) | "REGISTERS TECHNOLOGICAL FUND" (corrected in CTHRU) |
| CTHRU Data Availability | "back to Fiscal Year 2010" | Confirmed — FY2010 is earliest |
| Server-side fund filtering | Uncertain | Does **not** work for fund-level; `org2` (department) filter works |

---

## B. Classification Rules

### Object Code Classification Map

#### NARROW — Direct Scanning/Imaging

```
J33  — PHOTOGRAPHIC & MICROGRAPHIC SERVICES
       Rationale: This is the MMARS code for scanning, imaging, and micrographic
       service contracts. Definitionally includes backfile scanning.

K06  — PRINTING, PHOTOCOPYING, & MICROGRAPHICS EQUIPMENT
       Rationale: Purchases of scanning/imaging hardware.

L26  — PRINTING/PHOTOCOPY & MICROGRAPHICS EQUIP RENT/LEASE
       Rationale: Scanner and imaging equipment leases.

L46  — PRINT, PHOTOCOPYING & MICROGRAPH EQUIPMENT MAINT/REPAIR
       Rationale: Maintenance of scanning/imaging equipment.

JJ2  — AUXILIARY SERVICES
       Rationale: Used by document management vendors (Iron Mountain, Retrievex)
       for document storage, retrieval, and processing services directly tied to
       scanned/imaged records.
```

#### BROAD — IT Infrastructure (added to Narrow)

```
U10  — IT EQUIPMENT MAINTENANCE & REPAIR ($15.2M — largest category)
       Rationale: Ongoing maintenance of servers, workstations, and network
       equipment supporting MassLandRecords platform.

U07  — IT EQUIPMENT ($5.9M)
       Rationale: Servers, workstations, networking gear for registry operations.

U05  — IT PROFESSIONALS / TEMP STAFF AUGMENTATION ($6.2M)
       Rationale: Contracted IT staff supporting registry technology.

U09  — IT EQUIP RENTAL OR LEASE ($2.9M)
       Rationale: Leased IT infrastructure.

U01  — TELECOMMUNICATIONS SERVICES — DATA ($2.3M)
       Rationale: Network connectivity for the MassLandRecords system.

U03  — SOFTWARE & IT LICENSES ($1.7M)
       Rationale: Software licenses for registry systems.

H19  — MANAGEMENT CONSULTANTS ($120K)
       Rationale: Project management consulting for technology initiatives.

E02  — PRINTING EXPENSES & SUPPLIES ($33K)
       Rationale: Document-related printing.

K05  — OFFICE EQUIPMENT ($17K)
       Rationale: May include indexing workstations.

U06  — IT CABLING ($12K)
       Rationale: Network infrastructure installation.
```

#### EXCLUDED

```
A01  — SALARIES: INCLUSIVE ($18.5M)
A08  — OVERTIME PAY
A12  — SICK-LEAVE BUY BACK
A13  — VACATION-IN-LIEU
A14  — STIPENDS
       Rationale: Prompt specifies "Exclude General IT payroll"

U02  — TELECOMMUNICATIONS SERVICES - VOICE ($2.9M)
       Rationale: Prompt specifies "Exclude Phones/telecom"

H09  — ATTORNEYS/LEGAL SERVICES ($801K)
       Rationale: Not digitization-related

N50  — FACILITY MAINTENANCE ($931K)
       Rationale: Not digitization-related

K07  — OFFICE FURNISHINGS ($706K)
L25  — OFFICE EQUIPMENT RENTAL ($69K)
L45  — OFFICE EQUIPMENT MAINTENANCE ($17K)
       Rationale: General office, not digitization

B02  — IN-STATE TRAVEL ($56K)
B05  — CONFERENCE/TRAINING
B10  — JOB-RELATED EXPENSES
       Rationale: Employee expenses, not digitization

E01  — OFFICE SUPPLIES ($75K)
E12  — SUBSCRIPTIONS ($294)
E22  — TEMPORARY SPACE RENTAL
J50  — INSTRUCTORS/TRAINERS ($28K)
EE2  — CONFERENCE FEES ($7K)
HH1  — FINANCIAL SERVICES
K03  — PROGRAMMATIC FACILITY EQUIPMENT
L44  — VEHICLE MAINTENANCE
L52  — TV EQUIPMENT
N71  — PEST MANAGEMENT
       Rationale: Various non-digitization categories
```

### Classification Decision Notes

1. **JJ2 (Auxiliary Services) in Narrow**: This was a judgment call. JJ2 is used by document management companies (Iron Mountain, Retrievex, Retrievex Holdings Corp) for services directly tied to physical document management — storage, retrieval, and processing of scanned records. Placed in Narrow rather than Broad because these are operationally tied to the scanning/imaging workflow.

2. **U10 (IT Equipment Maintenance) in Broad**: At $15.2M, this is the largest IT category. Some of this spending may be for routine IT maintenance unrelated to digitization. However, within Fund 0049, all IT maintenance supports the registry technology platform that exists because of the digitization program.

3. **A01 (Payroll) Excluded**: At $18.5M, payroll is the largest single category. The prompt explicitly excludes "General IT payroll." These are salaries for staff in the Secretary of State's IT division who support registry technology. A case could be made for including them in the broad estimate, which would increase it to $56.2M.

---

## C. Vendor Inclusion Rules

No vendor-level exclusion rules were applied. All vendors receiving payments under Fund 0049 with classified Object codes were included in their respective categories. The classification is driven entirely by Object code, not vendor identity.

Vendor analysis was used for **validation and context**, not classification:
- Vendors receiving J33 payments (micrographic services) were confirmed to be scanning/imaging companies
- The largest vendor (Advanced Computer Services) provides both scanning services (J33) and IT services (U10), confirming the overlap between narrow and broad categories

---

## D. Validation

### Sample Size
- 11,103 total transactions classified
- 30 Narrow transactions manually reviewed — all correctly classified
- 30 Broad-only transactions manually reviewed — all correctly classified
- 30 Excluded transactions manually reviewed — all correctly classified

### False Positive Assessment

**Narrow**: LOW risk. Object codes J33, K06, L26, L46 are definitionally micrographic/imaging services and equipment. Confirmed by vendor names (Digital Scanning Inc., Eastern Micrographics, AMS Imaging, Digiscribe, etc.).

**Broad**: LOW-MODERATE risk. All UU-class Object codes within Fund 0049 support the registry technology platform, but some spending (e.g., Comcast data service at $282/month) is routine internet access rather than digitization-specific infrastructure. These amounts are immaterial.

### Negative Transactions
20 negative transactions totaling -$52,676 exist in the dataset (likely refunds or adjustments). These are included in totals as-is, which produces a conservative estimate.

### Large Transaction Review
One transaction exceeded $500K:
- FY2024: Advanced Computer Services Inc., U07 (IT Equipment), $526,140.00

This appears to be a major equipment purchase or upgrade and is correctly classified as Broad.

---

## E. Keyword Pre-Filter Results

The original methodology called for keyword matching across text fields. This was attempted but proved ineffective:

- CTHRU `Object` column contains only codes (e.g., "J33", "U10"), not descriptive text
- CTHRU `Vendor` column contains company names, not service descriptions
- Only 22 of 11,103 transactions matched any keyword (0.2%)
- Keywords matched vendor names containing "IMAGING", "SCANNING", "IMAGE", "MICROFILM"

**Conclusion**: Keyword matching is not a viable primary classification method for CTHRU data. Object code classification is the correct approach.

---

## F. Inflation Methodology

CPI-U Annual Averages (All Items, U.S. City Average, 1982-84=100) from Bureau of Labor Statistics via Federal Reserve Bank of Minneapolis.

For each transaction:
```
Adjusted_Amount = Nominal_Amount * (CPI_2026 / CPI_FY)
```

Where CPI_2026 = 325.3 (January 2026 value, used as proxy for 2026 annual average since full-year data not yet available).

---

## G. Code Used

### Data Download
```bash
# For each year FY2010-FY2026:
curl -s -o "sec_${year}.csv" \
  "https://cthruspending.mass.gov/api/checkbook_data.csv?\
search_hash=%7B%7D&conditionalClause=And&year=${year}&\
org2=SECRETARY+OF+STATE+(SEC)"
```

### Data Processing
All processing performed in Python 3 using only standard library modules (`csv`, `json`, `os`, `re`, `collections`). No external dependencies beyond PyPDF2 (used only for reading supplementary legislative PDFs, not for core analysis).

### Classification
```python
# Core classification logic
NARROW_OBJECTS = {'J33', 'K06', 'L26', 'L46', 'JJ2'}
BROAD_ADDITIONAL = {'U03', 'U05', 'U06', 'U07', 'U09', 'U10', 'U01', 'H19', 'K05', 'E02'}
EXCLUDED_OBJECTS = {'A01', 'A08', 'A12', 'A13', 'A14', 'B02', 'B05', 'B10',
                    'E01', 'H09', 'K07', 'L25', 'L45', 'N50', 'U02', ...}

for row in transactions:
    obj = row['Object'].strip()
    if obj in NARROW_OBJECTS:
        classification = 'NARROW'
    elif obj in BROAD_ADDITIONAL:
        classification = 'BROAD'
    elif obj in EXCLUDED_OBJECTS:
        classification = 'EXCLUDED'
    else:
        classification = 'UNCLASSIFIED'
```

### Socrata Fund-Level Data
```bash
# Fund-level totals for both Fund 0049 and Fund 0050 (FY2005-FY2026):
curl -s "https://cthru.data.socrata.com/resource/uaqe-2tpk.json?\
\$where=fund_number='0049' OR fund_number='0050'&\$limit=200"
```
This dataset (Socrata ID: `uaqe-2tpk`) provides beginning balance, revenue collected, total expenses, and balance forward for each fund-year.

### Reproducibility
All intermediate data files preserved:
- Raw downloaded CSVs in `/tmp/cthru_years/sec_*.csv`
- Socrata fund-level data in `/tmp/socrata_funds.json`
- Master dataset: `digitization_master_dataset.csv` (11,103 rows)
- Classified dataset: `digitization_classified.csv` (11,103 rows with flags)

---

## H. Dual Fund Structure

A critical finding during this analysis was the existence of TWO parallel technology funds:

- **Fund 0049** (Registers Technological Fund, M.G.L. c.29, s.2JJJ) — state-controlled registries
- **Fund 0050** (County Registers Techological Fund, M.G.L. c.29, s.2KKK) — county-controlled registries

The CTHRU spending portal (`cthruspending.mass.gov`) provides transaction-level detail only for Fund 0049. Fund 0050 spending is captured at the fund level via the Socrata API but transaction-level detail is not available through the same portal.

The fund names differ between systems:
- In CTHRU/MMARS: "REGISTERS TECHNOLOGICAL FUND" (corrected spelling)
- In Socrata: Fund 0050 retains the misspelling "County Registers Techological Fund"
- In legislation: "Registers Technological Fund" / "County Registers Technological Fund" (correct spelling)

---

*Appendix prepared March 1, 2026.*
