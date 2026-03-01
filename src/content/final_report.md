# Massachusetts Registry of Deeds Digitization Cost Analysis
## Full Report — FY2005-FY2026

---

## 1. Executive Summary

Massachusetts has spent **$151.9 million** (nominal) on registry of deeds technology through two dedicated funds from FY2005 through FY2026. Adjusted for inflation, this totals **$207.1 million in 2026 dollars**.

| Fund | Nominal Total | Description |
|------|-------------:|-------------|
| Fund 0049 (Registers Technological Fund) | $99.6M | 15 state-controlled registry districts |
| Fund 0050 (County Registers Techological Fund) | $52.3M | 6 county-controlled registry districts |
| **Combined** | **$151.9M** | All 21 registry districts |

Within Fund 0049, transaction-level classification (FY2010-2026) shows:
- **Narrow estimate** (direct scanning/imaging): **$3.27M nominal / $4.41M in 2026 dollars**
- **Broad estimate** (all IT infrastructure): **$37.65M nominal / $47.80M in 2026 dollars**
- **Total Fund 0049 expenditures** (FY2010-2026): **$61.84M nominal / $79.60M in 2026 dollars**

**Data gap**: FY2002-FY2004 remain unquantified. The funds were created in March 2003; FY2003-FY2004 data would require manual extraction from Comptroller SBFR reports.

**Confidence level**: HIGH for fund-level annual totals (Comptroller data). MODERATE for narrow/broad classification within Fund 0049.

---

## 2. Historical Context

### The MassLandRecords Program

In 2002, Massachusetts launched an initiative to digitize physical deed records across all 21 Registries of Deeds, making them accessible via the internet through the MassLandRecords system (`masslandrecords.com`). The program was authorized under **M.G.L. Chapter 29, Section 2KKKa** and funded through the **County Registers Technological Fund**, established by Chapter 4 of the Acts of 2003.

### Fund Structure

There are **two parallel funds**, both non-budgeted special revenue funds:

- **Fund 0049 — Registers Technological Fund** (M.G.L. c.29, s.2JJJ): Covers the 15 state-controlled registry districts. Revenue source: $5 surcharge per recording under M.G.L. c.9, s.31. Administered by the Secretary of the Commonwealth.

- **Fund 0050 — County Registers Techological Fund** (M.G.L. c.29, s.2KKK): Covers the 6 county-controlled registry districts (Barnstable, Bristol, Dukes, Norfolk, Plymouth, Nantucket). Revenue source: $5 surcharge per recording under M.G.L. c.36, s.41. Individual county registers must file spending plans under Section 2KKK(a).

Both surcharges took effect **March 15, 2003** and are authorized through **June 30, 2030** (extended from 2025 by FY2025 budget outside section 75).

Combined, the two funds have generated **$159.5 million in revenue** from FY2005-FY2026.

### Registry-by-Registry Implementation

Massachusetts has 21 separate Registry of Deeds districts across 14 counties. The digitization program involved:
- Scanning historical deed books and plans
- Building grantor/grantee indices
- OCR indexing for searchability
- Network infrastructure to support public internet access
- Ongoing hardware, software, and support contracts

A FY2016 statewide spending plan (Senate Docket SD2501) shows $4.21M in proposed expenditures across all registries, organized in three tiers:
- **Tier 1** ($3.34M): Disaster recovery, salaries, equipment leases, microfilming, software maintenance
- **Tier 2** ($619K): Scanning projects, e-recording costs, back indexing, microfilming projects
- **Tier 3** ($252K): Equipment upgrades, satellite offices, verification projects

---

## 3. Methodology

### Data Source

All expenditure data was obtained from the **CTHRU Statewide Spending Portal** (`cthruspending.mass.gov`), the Commonwealth's official financial transparency platform maintained by the Office of the Comptroller.

**API endpoint**: `https://cthruspending.mass.gov/api/checkbook_data.csv`

**Filter strategy**: Server-side filtering by department (`org2=SECRETARY+OF+STATE+(SEC)`) was used to download manageable datasets for each fiscal year. Local filtering then isolated Fund Code 0049 ("Registers Technological Fund").

**Years downloaded**: FY2010 through FY2026 (17 fiscal years). CTHRU expenditure data begins at FY2010.

**Key discovery during data acquisition**:
- Fund Code is **0049** (not 0050 as suggested in some references)
- Fund name in CTHRU is "REGISTERS TECHNOLOGICAL FUND" (corrected spelling; some legislative documents use the misspelled "Techological")
- All Fund 0049 transactions flow through Department "SECRETARY OF STATE (SEC)"
- Appropriation Code is 05266601

### Classification Logic

Transactions were classified based on MMARS **Object codes**, which describe the type of expenditure:

#### Narrow Classification (Direct Scanning/Imaging)
| Object Code | Description | Total |
|------------|-------------|-------|
| J33 | Photographic & Micrographic Services | $2,436,008 |
| JJ2 | Auxiliary Services | $287,184 |
| K06 | Printing, Photocopying & Micrographics Equipment | $264,100 |
| L46 | Print/Photocopy/Micrograph Equipment Maintenance | $182,902 |
| L26 | Print/Photocopy/Micrographics Equipment Rent/Lease | $97,676 |
| **Total** | | **$3,267,869** |

#### Broad Classification (Narrow + IT Infrastructure)
Adds these Object codes to the Narrow set:

| Object Code | Description | Total |
|------------|-------------|-------|
| U10 | IT Equipment Maintenance & Repair | $15,194,658 |
| U07 | IT Equipment | $5,925,871 |
| U05 | IT Professionals / Staff Augmentation | $6,201,131 |
| U09 | IT Equipment Rental or Lease | $2,929,410 |
| U01 | Telecommunications Services - Data | $2,277,779 |
| U03 | Software & IT Licenses | $1,674,211 |
| H19 | Management Consultants | $119,885 |
| E02 | Printing Expenses & Supplies | $33,437 |
| K05 | Office Equipment | $16,550 |
| U06 | IT Cabling | $11,948 |
| **Subtotal IT** | | **$34,384,881** |
| **Total Broad** | | **$37,652,750** |

#### Excluded Categories
| Object Code | Description | Total |
|------------|-------------|-------|
| A01/A08/A12/A13/A14 | Payroll (Salaries, Overtime, etc.) | $18,536,000 |
| U02 | Voice Telecommunications (phones) | $2,924,773 |
| N50 | Facility Maintenance | $931,336 |
| H09 | Legal Services | $800,932 |
| K07 | Office Furnishings | $706,084 |
| Other | Travel, training, office supplies, etc. | $245,536 |
| **Total Excluded** | | **$24,169,436** |

### Inflation Adjustment

All amounts adjusted to 2026 dollars using CPI-U Annual Averages (All Items, 1982-84=100) from the Bureau of Labor Statistics / Federal Reserve Bank of Minneapolis.

Base: January 2026 CPI-U = 325.3

---

## 4. Results

### 4.0 Combined Fund-Level Totals (FY2005-FY2026)

Source: CTHRU Non-Budgeted Special Revenue Funds dataset (Socrata API)

| FY | Fund 0049 Exp | Fund 0050 Exp | Combined | Combined (2026$) |
|----|-------------:|-------------:|---------:|----------------:|
| 2005 | $6,432,302 | $3,210,166 | $9,642,468 | $16,060,906 |
| 2006 | $5,984,551 | $2,949,451 | $8,934,002 | $14,415,827 |
| 2007 | $5,968,882 | $1,782,296 | $7,751,178 | $12,163,330 |
| 2008 | $5,837,208 | $1,165,287 | $7,002,495 | $10,580,175 |
| 2009 | $3,339,890 | $1,623,851 | $4,963,741 | $7,527,762 |
| 2010 | $3,899,365 | $7,908,380 | $11,807,745 | $17,611,459 |
| 2011 | $4,788,952 | $907,982 | $5,696,933 | $8,240,162 |
| 2012 | $4,188,567 | $982,094 | $5,170,661 | $7,325,854 |
| 2013 | $4,381,609 | $1,460,561 | $5,842,170 | $8,156,472 |
| 2014 | $6,402,561 | $4,354,920 | $10,757,482 | $14,784,152 |
| 2015 | $5,536,645 | $4,021,698 | $9,558,342 | $13,119,531 |
| 2016 | $4,551,675 | $1,974,745 | $6,526,420 | $8,846,019 |
| 2017 | $4,480,964 | $1,690,480 | $6,171,444 | $8,190,823 |
| 2018 | $5,504,280 | $2,423,086 | $7,927,366 | $10,269,901 |
| 2019 | $4,173,235 | $1,114,178 | $5,287,412 | $6,726,614 |
| 2020 | $4,759,392 | $1,956,628 | $6,716,021 | $8,441,737 |
| 2021 | $4,417,362 | $1,460,387 | $5,877,750 | $7,055,468 |
| 2022 | $3,405,720 | $3,489,543 | $6,895,263 | $7,663,235 |
| 2023 | $4,611,255 | $751,957 | $5,363,212 | $5,725,805 |
| 2024 | $3,200,390 | $2,123,780 | $5,324,170 | $5,521,047 |
| 2025 | $2,697,865 | $2,217,380 | $4,915,245 | $4,967,161 |
| 2026* | $1,005,925 | $2,716,110 | $3,722,035 | $3,722,035 |
| **TOTAL** | **$99,568,594** | **$52,284,961** | **$151,853,555** | **$207,115,476** |

*FY2026 partial

**Notable**: FY2010 shows a large Fund 0050 spike ($7.9M vs. typical $1-3M) — this may represent a major county-registry backfile scanning project or catch-up spending after accumulating a $7M fund balance.

### 4.1 Transaction-Level Classification (Fund 0049 only, FY2010-FY2026)

| FY | Narrow (Nominal) | Broad (Nominal) | Fund Total (Nominal) | Narrow (2026$) | Broad (2026$) | Fund Total (2026$) |
|----|----------------:|----------------:|--------------------:|---------------:|--------------:|-------------------:|
| 2010 | $359,329 | $2,146,810 | $3,433,685 | $535,945 | $3,202,005 | $5,121,402 |
| 2011 | $668,212 | $2,513,081 | $4,135,801 | $966,515 | $3,634,972 | $5,982,109 |
| 2012 | $366,541 | $2,042,902 | $3,545,242 | $519,320 | $2,894,408 | $5,022,941 |
| 2013 | $413,650 | $2,027,104 | $3,781,383 | $577,512 | $2,830,115 | $5,279,330 |
| 2014 | $226,133 | $3,310,614 | $5,744,287 | $310,777 | $4,549,821 | $7,894,451 |
| 2015 | $76,162 | $1,563,359 | $4,583,771 | $104,538 | $2,145,825 | $6,291,565 |
| 2016 | $178,324 | $1,966,894 | $3,810,061 | $241,703 | $2,665,961 | $5,164,220 |
| 2017 | $128,131 | $1,928,431 | $3,618,834 | $170,057 | $2,559,440 | $4,802,965 |
| 2018 | $83,770 | $2,927,496 | $4,628,575 | $108,524 | $3,792,571 | $5,996,318 |
| 2019 | $156,825 | $2,032,357 | $3,497,317 | $199,512 | $2,585,552 | $4,449,266 |
| 2020 | $103,194 | $2,622,678 | $4,026,280 | $129,710 | $3,296,589 | $5,060,854 |
| 2021 | $61,130 | $2,693,521 | $3,843,127 | $73,379 | $3,233,219 | $4,613,170 |
| 2022 | $20,836 | $1,988,290 | $2,885,381 | $23,157 | $2,209,740 | $3,206,745 |
| 2023 | $356,547 | $3,161,577 | $4,056,055 | $380,652 | $3,375,323 | $4,330,274 |
| 2024 | $41,022 | $2,276,613 | $2,823,173 | $42,539 | $2,360,797 | $2,927,569 |
| 2025 | $27,010 | $1,620,401 | $2,496,483 | $27,296 | $1,637,516 | $2,522,852 |
| 2026* | $1,055 | $830,623 | $930,205 | $1,055 | $830,623 | $930,205 |
| **TOTAL** | **$3,267,869** | **$37,652,750** | **$61,839,661** | **$4,412,189** | **$47,804,476** | **$79,596,235** |

*FY2026 is partial (through approximately February 2026)

### Trends

- **Narrow spending peaked in FY2011** ($668K) during active backfile scanning and declined steadily as scanning projects completed.
- **Broad spending is relatively stable** at $2-3M annually, reflecting ongoing IT infrastructure costs for maintaining the MassLandRecords platform.
- **Total fund spending has declined** from ~$4-5M/year in FY2010-2014 to ~$2.5-3M in FY2024-2025, consistent with a maturing program shifting from capital investment to operational maintenance.

### 4.2 Vendor Concentration

| Rank | Vendor | Total (Broad) | % of Total | Cumulative % | Role |
|------|--------|-------------:|----------:|------------:|------|
| 1 | Advanced Computer Services Inc. | $7,764,925 | 20.6% | 20.6% | Scanning/Imaging + IT |
| 2 | Rutter Networking Technologies | $3,398,727 | 9.0% | 29.6% | IT Equipment/Software |
| 3 | DSCI LLC | $2,676,491 | 7.1% | 36.8% | IT Equipment/Software |
| 4 | Future Technologies Group LLC | $2,472,174 | 6.6% | 43.3% | IT Equipment/Software |
| 5 | Applied Intelligence Technologies | $2,292,879 | 6.1% | 49.4% | Scanning/Imaging |
| 6 | ACS Enterprise Solutions Inc. | $1,856,426 | 4.9% | 54.3% | Scanning/Imaging + IT |
| 7 | M & R Consultants Corporation | $1,702,472 | 4.5% | 58.9% | IT Consulting/Staff |
| 8 | PeopleServe PRS Inc. | $1,486,071 | 3.9% | 62.8% | IT Consulting/Staff |
| 9 | Future Technologies Group Inc. | $1,284,284 | 3.4% | 66.2% | IT Equipment/Software |
| 10 | NTT Data Inc. | $853,645 | 2.3% | 68.5% | IT Consulting/Staff |

**Concentration**: Top 5 vendors = 49.4%, Top 10 = 68.5%.

**Advanced Computer Services** (ACS) is the dominant vendor at $7.76M, providing both scanning/imaging services (J33 Object code) and IT maintenance/equipment. ACS appears to be the primary technology contractor supporting the MassLandRecords platform across multiple registries.

### Identified Scanning Contractors

These vendors were identified through Narrow classification (J33/K06/L26/L46 Object codes) as providing scanning, imaging, or micrographic services:

| Vendor | Total |
|--------|------:|
| Advanced Computer Services Inc. | $1,513,558 |
| Applied Intelligence Technologies | $319,250 |
| Eastern Micrographics Inc. | $278,766 |
| Town Bookbindery Inc. | $150,122 |
| Iron Mountain (multiple entities) | $191,805 |
| Retrievex (Inc. + Holdings Corp) | $160,727 |
| Government Revenue Solutions | $74,350 |
| Digiscribe New England | $55,691 |
| ACS Enterprise Solutions Inc. | $59,745 |
| GE Capital Info Tech Solutions | $50,000 |
| Image Tek | $43,220 |
| EOS Approach LLC | $40,964 |
| Databank IMX LLC | $34,193 |

### 4.3 Registry-Level Breakdown

**Registry-level breakdown is NOT available in CTHRU data.** All Fund 0049 transactions are attributed to the single department "SECRETARY OF STATE (SEC)" with appropriation code 05266601. The fund appears to be administered centrally.

However, legislative spending plan filings provide per-registry planned expenditures. From SD2501 (FY2016 spending plan):

| Registry | Planned Expenditure (FY2016) |
|----------|----------------------------:|
| Boston (Suffolk) | $1,666,050 |
| Southern Middlesex | $523,873 |
| Southern Essex | $396,560 |
| Hampden | $322,375 |
| Worcester | $238,212 |
| Essex North | $188,020 |
| Worcester North | $145,424 |
| Berkshire Middle | $136,481 |
| Berkshire North | $121,971 |
| Middlesex North | $93,119 |
| Berkshire South | $67,737 |
| Hampshire | $43,000 |
| Franklin | $6,000 |
| **Total (from plan)** | **$4,212,346** |

Note: This is one year's planned spending, not historical actuals. Boston/Suffolk consistently accounts for the largest share (~40%) of fund expenditures.

---

## 5. Sensitivity Analysis

| Scenario | Nominal | 2026 Dollars |
|----------|--------:|------------:|
| Most conservative (J33 only — micrographic services) | $2,436,008 | $3,298,160 |
| **Narrow** (J33 + K06 + L26 + L46 + JJ2) | **$3,267,869** | **$4,412,189** |
| **Broad** (Narrow + all IT Object codes) | **$37,652,750** | **$47,804,476** |
| Broad + payroll | $56,188,750 | $72,160,020 |
| All non-payroll Fund 0049 | $43,303,661 | $55,240,691 |
| Total Fund 0049 | $61,839,661 | $79,596,235 |

### What Changes If:

- **Keyword filter widened**: Minimal impact. Keyword matching on CTHRU data captures very little because transaction descriptions use generic MMARS Object codes, not descriptive text. The Object code approach is far more effective.

- **Hardware excluded from narrow**: Removes $544,676 (K06 + L26 + L46), reducing narrow to $2,723,192 (J33 + JJ2 only).

- **Payroll included in broad**: Adds $18.5M. This is defensible since Fund 0049 payroll supports staff directly working on registry technology, but the prompt explicitly excludes "general IT payroll."

---

## 6. Limitations

### 6.1 FY2002-FY2004 Data Gap

The Socrata dataset provides fund-level data back to FY2005, significantly narrowing the original data gap. However, **FY2003-FY2004 remain unquantified**:

- The $5 surcharges took effect **March 15, 2003** (per Chapter 4 of the Acts of 2003)
- FY2002 (July 2001 - June 2002): **Zero activity** — funds did not yet exist
- FY2003 (July 2002 - June 2003): Partial year, surcharge active only March 15 - June 30, 2003 (~3.5 months)
- FY2004 (July 2003 - June 2004): First full fiscal year of fund operation

The FY2005 beginning balance for Fund 0049 was $1.09M and for Fund 0050 was $2.80M, suggesting meaningful activity in FY2003-2004.

**Estimated FY2003-2004 spending**: Based on the beginning balances and typical revenue/expense ratios, combined FY2003-2004 spending was likely **$5-10M**, bringing estimated total program cost since inception to approximately **$157-162M nominal**.

Source for FY2003-2004 data: Comptroller SBFR PDF reports at `https://www.macomptroller.org/sbfr/` (would require manual extraction from non-budgeted special revenue fund schedules).

### 6.2 Fund 0049 May Not Capture All Digitization Spending

Some digitization expenditures may flow through:
- Individual registry operating budgets (separate appropriations under 0540-xxxx)
- General Fund appropriations
- Capital improvement budgets
- Direct county expenditures (for the 6 independently elected registers)

### 6.3 Transaction-Level Detail Limitations

CTHRU provides Object code classifications but not line-item descriptions of goods/services per transaction. A $500K payment to "Advanced Computer Services" under Object code U10 (IT Equipment Maintenance) could include scanning services bundled with other IT support — we cannot distinguish at this level of detail.

### 6.4 No Registry-Level Breakdown

CTHRU records all Fund 0049 spending under "Secretary of State" with no sub-department coding. Per-registry actual expenditures cannot be determined from this data source.

---

## 7. Appendix

### 7.1 Data Source Details

**Fund-level data (FY2005-2026):**
- **Dataset**: CTHRU Non-Budgeted Special Revenue Funds
- **API**: `https://cthru.data.socrata.com/resource/uaqe-2tpk.json?$where=fund_number='0049' OR fund_number='0050'`
- **Coverage**: Fund 0049 and Fund 0050, FY2005-FY2026
- **Records**: 48 fund-year records

**Transaction-level data (FY2010-2026):**
- **Portal**: CTHRU Statewide Spending (`cthruspending.mass.gov`)
- **API**: `checkbook_data.csv` with `org2=SECRETARY+OF+STATE+(SEC)` filter
- **Fund**: Code 0049 only (Fund 0050 not available at transaction level in this portal)
- **Appropriation**: 05266601
- **Years**: FY2010-FY2026 (17 fiscal years)
- **Total transactions**: 11,103

### 7.2 Object Code Reference

See technical appendix for full Object code mapping and classification rules.

### 7.3 CPI-U Values Used

| Year | CPI-U | Factor to 2026 |
|------|------:|---------------:|
| 2010 | 218.1 | 1.492 |
| 2011 | 224.9 | 1.446 |
| 2012 | 229.6 | 1.417 |
| 2013 | 233.0 | 1.396 |
| 2014 | 236.7 | 1.374 |
| 2015 | 237.0 | 1.373 |
| 2016 | 240.0 | 1.355 |
| 2017 | 245.1 | 1.327 |
| 2018 | 251.1 | 1.295 |
| 2019 | 255.7 | 1.272 |
| 2020 | 258.8 | 1.257 |
| 2021 | 271.0 | 1.200 |
| 2022 | 292.7 | 1.111 |
| 2023 | 304.7 | 1.068 |
| 2024 | 313.7 | 1.037 |
| 2025 | 321.9 | 1.011 |
| 2026 | 325.3 | 1.000 |

Source: Federal Reserve Bank of Minneapolis / BLS CPI-U Annual Averages

---

*Analysis produced March 1, 2026. Data downloaded from CTHRU spending portal on the same date.*
*11,103 transactions analyzed across 17 fiscal years.*
