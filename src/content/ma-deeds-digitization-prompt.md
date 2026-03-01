# 🧠 CLAUDE CODE AGENT PROMPT
## Project: Massachusetts Registry of Deeds Digitization Cost (2002–Present)

You are an autonomous research and data analysis agent.

Your task is to compute the **total statewide cost (2002–present)** of digitizing Massachusetts Registry of Deeds records — specifically scanning and indexing physical deeds to make them Internet-accessible via MassLandRecords.

---

# 1. OBJECTIVE

Produce:

1. **Narrow Estimate**
   Only clear backfile scanning and indexing expenditures.

2. **Broad Estimate**
   Scanning + indexing + OCR + verification + scanning hardware directly tied to digitization.

3. Annual totals (2002–present)

4. Inflation-adjusted totals (2026 dollars)

5. Vendor concentration analysis

6. Per-registry breakdown (if data permits)

---

# 2. DATA SOURCE

## Primary Source: CTHRU Statewide Spending

**⚠️ CRITICAL: Use the SPENDING portal, NOT the revenue portal.**

- ✅ Correct domain: `cthruspending.mass.gov`
- ❌ Wrong domain: `cthrurevenue.mass.gov` (this is the revenue side, not expenditures)

Base API endpoint:

```
https://cthruspending.mass.gov/api/checkbook_data.csv
```

### Known API Parameters (from testing)

The spending API accepts URL parameters including:
- `search_hash=%7B%7D` (empty search hash, appears required)
- `conditionalClause=And`
- `year=YYYY` or `year=All+Years`
- `org3=` or `org4=` (filter fields — see note below)

**⚠️ PARAMETER MAPPING IS UNCERTAIN.** During pre-testing, we confirmed the API works but could not verify which parameter (`org3`, `org4`, or another) maps to the Fund field. The CSV output columns include:

```
Base_Id, Budget_Fiscal_Year, Fiscal_Period, Payment Date, Cabinet_Secretariat,
Department, Appropriation_Type, Appropriation, Object_Class, Object_Code,
Encumbrance ID, Zip_Code, Amount, Fund, Fund_Code, Appropriation_Code,
Object, Department_Code, Vendor, Vendor_Id, Payment ID, Payment_Method,
State, City, Create_Date
```

### Recommended Approach for Data Acquisition

1. **First, try filtering server-side** by experimenting with these parameter combinations:
   - `org3=County+Registers+Techological+Fund+(0050)`
   - Try `Fund_Code=0050` as an alternative
   - Try other `org` parameters if those fail

2. **Fallback: Download unfiltered data and filter locally.** If server-side filtering doesn't work for the fund, download the full year's CSV and filter where `Fund_Code = '0050'` or `Fund` contains `"County Registers Techological Fund"`.

3. **Do NOT use `pay_types=pay1`** — that parameter is from the payroll portal, not spending.

### Fund Name: The Official Typo

The fund is officially named **"County Registers Techological Fund"** (missing the 'n' — "Techological" not "Technological"). This is how it appears in the state financial system. Legislative filings use the correct spelling "Technological" but the fund code uses the misspelling. Search for both variants:
- `Techological` (as in CTHRU/MMARS)
- `Technological` (as in legislative filings)

Fund code: **0050**

### Data Availability Gap: 2002–2009

**⚠️ CTHRU only contains expenditure data back to Fiscal Year 2010.** The site explicitly states: "Expenditures dating back to Fiscal Year 2010 are updated daily."

This means **8 years of data (FY2002–FY2009) are NOT available through this API.**

For the missing years, attempt these supplementary sources:

1. **Legislative filings** — Each registry submits annual expenditure plans to the legislature under M.G.L. Chapter 29, Section 2KKKa. These appear as Senate Docket filings (e.g., SD3267, SD2643, SD3118). Search for these on:
   - `trackbill.com` (confirmed to index these)
   - `malegislature.gov`

2. **Secretary of State / Registry annual reports** — May contain historical spending data.

3. **MassOpenBooks** (`massopenbooks.org`) — Pioneer Institute's transparency site using Comptroller data. May have older data than CTHRU.

4. **Direct Comptroller records** — Contact: [email protected]

5. If no data can be found for 2002–2009, **clearly document the gap** and provide estimates only for FY2010–present, with a note about the missing early years when digitization activity was likely highest.

---

# 3. SCOPE DEFINITION

Include only expenditures directly related to:

- Backfile scanning
- Imaging conversion
- Back indexing
- Grantor/Grantee index conversion
- OCR indexing
- Scan-and-load projects
- Index verification directly tied to digitized records
- Scanners purchased for digitization projects

Exclude:

- General IT payroll
- Software maintenance contracts (unless clearly digitization module)
- Hosting / internet service
- Routine hardware refresh
- Disaster recovery unrelated to digitization
- Phones / telecom

---

# 4. IMPLEMENTATION PLAN

## Phase A — Data Acquisition

1. Determine correct API parameters by testing against `cthruspending.mass.gov` (see Section 2).
2. Download CSV for each year FY2010–present (or use `year=All+Years` if the dataset is manageable).
3. If server-side fund filtering fails, download full data and filter locally on `Fund_Code` or `Fund` column.
4. Normalize schema across years (column names may vary).
5. Identify the `Amount` column.
6. Combine into unified dataframe.
7. Attempt supplementary data acquisition for FY2002–FY2009 (see Section 2).

---

## Phase B — Classification

### Step 1: Keyword Pre-Filter

Use case-insensitive search across all text columns (especially `Vendor`, `Object`, `Appropriation`, and any description fields):

Initial keyword set:

```
scan
scanning
scanner
imaging
back index
back-index
backindex
indexing
index verify
verification
ocr
scan and load
grantor/grantee
grantor grantee
conversion
backfile
retro index
```

---

### Step 2: Vendor Clustering

1. Rank vendors by total spending within Fund 0050.
2. Identify recurring vendors associated with digitization.
3. Manually review top 100 vendor-description combinations.
4. Refine inclusion/exclusion rules.

---

### Step 3: Dual Model Classification

Produce:

**NARROW FILTER**
- Explicit back indexing
- Explicit backfile scanning
- Explicit scan-and-load

**BROAD FILTER**
- Narrow + scanners + OCR modules + verification contracts

Document exact logic used.

---

# 5. ANALYTICS REQUIRED

Produce:

### 1. Nominal Totals
- Narrow total (all available years)
- Broad total (all available years)
- Clearly note which years are covered

### 2. Annual Breakdown
Table:
- Year
- Narrow total
- Broad total

### 3. Inflation Adjustment
Adjust all years to 2026 dollars using CPI-U.

Output:
- Inflation-adjusted narrow total
- Inflation-adjusted broad total

---

### 4. Vendor Concentration

- Top 10 vendors by digitization spending
- % of total represented
- Identify likely scanning contractors

---

### 5. Registry-Level Breakdown (If Available)

The `Department` column may contain individual registry names (e.g., "BARNSTABLE COUNTY REGISTRY OF DEEDS"). If registry-level data is present:

- Total digitization cost by registry
- Completion timeline patterns

If not available, clearly state limitation.

---

# 6. QUALITY CONTROLS

You must:

- Sample at least 100 classified records to validate logic.
- Flag ambiguous transactions.
- Provide false-positive risk estimate.
- Provide sensitivity analysis:
  - What happens if keyword filter widened?
  - What happens if hardware excluded?

---

# 7. DELIVERABLES

Generate:

1. `digitization_master_dataset.csv` — All Fund 0050 transactions
2. `digitization_classified.csv` — Transactions with narrow/broad classification flags
3. `annual_totals.csv` — Year-by-year narrow and broad totals (nominal and inflation-adjusted)
4. `vendor_analysis.csv` — Top vendors and concentration metrics
5. `final_report.md` — Full analysis report
6. `executive_summary.md` — 1-page summary of findings
7. `technical_appendix.md` — Methodology details, keyword logic, vendor rules

---

# 8. REPORT STRUCTURE (final_report.md)

Include:

## Executive Summary
- Estimated cost range
- Inflation-adjusted totals
- Confidence level
- Methodology summary
- Data coverage (which years available, which missing)

## Historical Context
- 2002 launch of MassLandRecords
- Registry-by-registry implementation
- Tech Fund financing structure (M.G.L. c.29, §2KKKa)

## Methodology
- Data source (CTHRU spending portal)
- API parameters used
- Filters applied
- Classification logic
- Inflation method
- Data gap handling

## Results
- Totals
- Annual trends
- Vendor analysis
- Registry patterns

## Sensitivity Analysis

## Limitations
- FY2002–FY2009 data gap (if applicable)
- Fund 0050 may not capture ALL digitization spending (some may flow through other appropriations)
- Transaction descriptions may be too vague for confident classification
- CTHRU does not provide line-item detail of goods/services per transaction

## Appendix
- Full keyword logic
- Vendor inclusion rules
- Sample validated transactions

---

# 9. ADDITIONAL ANALYSIS (Optional If Time Permits)

- Estimate cost per scanned document (if document counts available)
- Estimate cost per parcel
- Compare digitization cost to annual registry revenue (available on `cthrurevenue.mass.gov`)
- Compare MA digitization cost to another state

---

# 10. EXPECTED OUTPUT STYLE

- Reproducible
- Transparent
- No hand-waving
- Clearly separate assumptions from facts
- Flag uncertainties
- Show code used
- Comment code clearly

---

# 11. STOP CONDITIONS

Do not stop until:

- All available years processed
- Both narrow and broad totals computed
- Inflation-adjusted values computed
- Report files generated
- Data gaps clearly documented

If API schema changes or parameters don't work as expected, adapt dynamically and log adjustments.

---

# 12. SUCCESS CRITERIA

The project is complete when:

- A defensible statewide digitization cost range exists for all available years
- The FY2002–FY2009 data gap is either filled or clearly documented
- All assumptions documented
- Output files generated
- Methodology reproducible

If you encounter ambiguity, err toward:
- Transparency
- Conservative estimation
- Clear documentation

---

# 13. REFERENCE: CONFIRMED WORKING API PATTERNS

These URL patterns were confirmed to return valid CSV data during pre-testing:

```
# Spending API — filter by appropriation (org4)
https://cthruspending.mass.gov/api/checkbook_data.csv?search_hash=%7B%7D&conditionalClause=And&year=2023&org4=(80004611)+JUSTICE+ASSISTANCE+GRANT

# Spending API — all years with appropriation filter
https://cthruspending.mass.gov/api/checkbook_data.csv?search_hash=%7B%7D&conditionalClause=And&year=All+Years&org4=(15996070)+HARM+REDUCTION

# Revenue API — filter by fund (org3)
https://cthrurevenue.mass.gov/api/checkbook_data.csv?search_hash=%7B%7D&year=2021&org3=Motor+Vehicle+Safety+Inspection+Trust+Fund+(0176)&pay_types=pay1
```

Note: The revenue API uses `org3` for fund-level filtering. The spending API may use a different parameter for fund filtering — experiment accordingly. The spending API confirmed parameters include `org4` for appropriation-level filtering.

---

Proceed.
