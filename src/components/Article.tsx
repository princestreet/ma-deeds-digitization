"use client";

import dynamic from "next/dynamic";
import { SECTION_IDS } from "@/lib/constants";
import StatCard from "@/components/StatCard";
import CalloutBox from "@/components/CalloutBox";
import SectionHeading from "@/components/SectionHeading";
import CollapsibleSection from "@/components/CollapsibleSection";
import DownloadCard from "@/components/DownloadCard";
import TableOfContents from "@/components/TableOfContents";
import MarkdownContent from "@/components/MarkdownContent";

const AnnualSpendingChart = dynamic(() => import("@/components/charts/AnnualSpendingChart"), { ssr: false });
const RevenueVsExpenseChart = dynamic(() => import("@/components/charts/RevenueVsExpenseChart"), { ssr: false });
const ObjectCodeChart = dynamic(() => import("@/components/charts/ObjectCodeChart"), { ssr: false });
const NarrowVsBroadChart = dynamic(() => import("@/components/charts/NarrowVsBroadChart"), { ssr: false });
const RegistryBreakdownChart = dynamic(() => import("@/components/charts/RegistryBreakdownChart"), { ssr: false });
const VendorTable = dynamic(() => import("@/components/tables/VendorTable"), { ssr: false });
const ScanningContractorsTable = dynamic(() => import("@/components/tables/ScanningContractorsTable"), { ssr: false });
const AnnualTotalsTable = dynamic(() => import("@/components/tables/AnnualTotalsTable"), { ssr: false });

interface ArticleProps {
  technicalAppendix: string;
  executiveSummary: string;
  finalReport: string;
  prompt: string;
}

export default function Article({
  technicalAppendix,
  executiveSummary,
  finalReport,
  prompt,
}: ArticleProps) {
  return (
    <main className="min-h-screen pb-20">
      <TableOfContents />

      {/* Section 1: Header / Lede */}
      <section id={SECTION_IDS.header} className="pt-12 md:pt-20 pb-12 border-b border-slate-200">
        <div className="max-w-[720px] mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight" style={{ fontFamily: "var(--font-sans)" }}>
            Massachusetts Has Spent $152&nbsp;Million Digitizing Its Deed Records
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed">
            Since 2003, two dedicated technology funds have channeled recording surcharges into scanning historical deeds,
            building IT infrastructure, and maintaining the MassLandRecords platform across all 21 registry districts.
            Here&rsquo;s where the money went.
          </p>
        </div>

        <div className="max-w-[900px] mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard value="$151.9M" label="Total Spent" sublabel="Nominal, FY2005-2026" />
          <StatCard value="$207.1M" label="Inflation-Adjusted" sublabel="In 2026 dollars" />
          <StatCard value="$159.5M" label="Total Revenue" sublabel="$5/recording surcharges" />
        </div>

        <div className="max-w-[720px] mx-auto px-4 mt-8">
          <p className="text-sm text-slate-400" style={{ fontFamily: "var(--font-sans)" }}>
            Analysis published March 1, 2026 &middot; Data from{" "}
            <a href="https://cthruspending.mass.gov" className="underline hover:text-slate-600" target="_blank" rel="noopener noreferrer">
              CTHRU Spending Portal
            </a>{" "}
            &amp; Socrata API &middot; 11,103 transactions analyzed
          </p>
        </div>
      </section>

      {/* Section 2: The Big Picture */}
      <section id={SECTION_IDS.bigPicture} className="pt-4">
        <div className="max-w-[720px] mx-auto px-4">
          <SectionHeading id={SECTION_IDS.bigPicture}>The Big Picture</SectionHeading>
          <p>
            In 2002, Massachusetts launched an initiative to digitize physical deed records across all 21 Registries of Deeds,
            making them accessible via the internet through the{" "}
            <a href="https://www.masslandrecords.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">MassLandRecords</a> system.
            The program was authorized under M.G.L. Chapter 29 and funded through a $5 surcharge on every deed recording statewide.
          </p>
          <p className="mt-4">
            Two parallel funds were established: <strong>Fund 0049</strong> for the 15 state-controlled registry districts
            (administered by the Secretary of the Commonwealth), and <strong>Fund 0050</strong> for the 6 county-controlled
            districts (Barnstable, Bristol, Dukes, Norfolk, Plymouth, Nantucket). Combined, the funds have spent{" "}
            <strong>$151.9 million nominal</strong> ($207.1M in 2026 dollars) from FY2005 through FY2026.
          </p>
        </div>

        <AnnualSpendingChart />

        <div className="max-w-[720px] mx-auto px-4">
          <CalloutBox>
            <strong>FY2010 spike:</strong> Combined spending peaked at $11.8M, driven by a $7.9M surge in Fund 0050 (county registries) &mdash;
            likely a major backfile scanning push after accumulating a $7M fund balance.
          </CalloutBox>
          <p>
            Revenue from the recording surcharges has generally exceeded expenses in most years, with the funds accumulating
            modest balances. However, spending has declined from $7-12M/year in FY2005-2015 to $4-5M/year recently, consistent
            with a program shifting from capital investment to operational maintenance.
          </p>
        </div>

        <RevenueVsExpenseChart />
      </section>

      {/* Section 3: What the Money Bought */}
      <section id={SECTION_IDS.whatMoneyBought} className="pt-4">
        <div className="max-w-[720px] mx-auto px-4">
          <SectionHeading id={SECTION_IDS.whatMoneyBought}>What the Money Bought</SectionHeading>
          <p>
            Not all of the $152M went to scanning documents. Transaction-level data from Fund 0049 (FY2010-2026, 11,103 transactions)
            lets us classify spending into categories using state accounting codes (MMARS Object codes).
          </p>
          <p className="mt-4">
            We use two classification levels: <strong>Narrow</strong> captures only direct scanning/imaging services and equipment
            (Object codes J33, K06, L26, L46, JJ2). <strong>Broad</strong> adds all IT infrastructure &mdash; servers, networking,
            software licenses, contracted IT staff, and equipment maintenance &mdash; that supports the MassLandRecords platform.
          </p>
        </div>

        <ObjectCodeChart />

        <div className="max-w-[720px] mx-auto px-4">
          <CalloutBox variant="amber">
            <strong>Only $3.3M of the $61.8M</strong> in Fund 0049 spending (FY2010-2026) was classified as direct scanning and imaging.
            The vast majority supported IT infrastructure ($34.4M), payroll ($18.5M), and other costs ($5.7M).
          </CalloutBox>
          <p>
            The narrow classification has declined over time as physical scanning projects completed, while broad IT spending
            remains relatively stable at $2-3M per year &mdash; reflecting the ongoing cost of maintaining the platform.
          </p>
        </div>

        <NarrowVsBroadChart />
      </section>

      {/* Section 4: Who Got Paid */}
      <section id={SECTION_IDS.whoGotPaid} className="pt-4">
        <div className="max-w-[720px] mx-auto px-4">
          <SectionHeading id={SECTION_IDS.whoGotPaid}>Who Got Paid</SectionHeading>
          <p>
            Vendor analysis of Fund 0049 broad-classified spending (FY2010-2026) reveals significant concentration.
            The top 5 vendors account for 49.4% of all IT spending, and the top 10 account for 68.5%.
          </p>
        </div>

        <div className="max-w-[900px] mx-auto px-4 my-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4" style={{ fontFamily: "var(--font-sans)" }}>
            Top 25 Vendors by Broad Spending
          </h3>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <VendorTable limit={25} />
          </div>
        </div>

        <div className="max-w-[720px] mx-auto px-4">
          <CalloutBox>
            <strong>Advanced Computer Services (ACS)</strong> is the dominant vendor at $7.76M (20.6%), providing both
            scanning/imaging services and IT maintenance across multiple registries. ACS Enterprise Solutions adds another $1.86M.
          </CalloutBox>
          <p className="mt-4">
            Vendors identified through narrow classification (scanning-related Object codes) tell a more focused story
            about who actually performed the physical digitization work:
          </p>
        </div>

        <div className="max-w-[900px] mx-auto px-4 my-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4" style={{ fontFamily: "var(--font-sans)" }}>
            Scanning &amp; Imaging Contractors (Narrow Classification)
          </h3>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <ScanningContractorsTable />
          </div>
        </div>
      </section>

      {/* Section 5: Two-Fund Structure */}
      <section id={SECTION_IDS.twoFundStructure} className="pt-4">
        <div className="max-w-[720px] mx-auto px-4">
          <SectionHeading id={SECTION_IDS.twoFundStructure}>The Two-Fund Structure</SectionHeading>
          <p>
            A key finding of this analysis is that Massachusetts operates <strong>two parallel technology funds</strong> for its registries,
            a structure that reflects the state&rsquo;s unusual split between state-controlled and county-controlled registry districts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 text-sm" style={{ fontFamily: "var(--font-sans)" }}>
                Fund 0049 &mdash; State Registries
              </h4>
              <p className="text-sm text-blue-800 mt-1">M.G.L. c.29, s.2JJJ</p>
              <p className="text-sm text-blue-700 mt-2">15 districts administered by the Secretary of the Commonwealth</p>
              <p className="text-lg font-bold text-blue-900 mt-2" style={{ fontFamily: "var(--font-sans)" }}>$99.6M spent</p>
            </div>
            <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
              <h4 className="font-bold text-violet-900 text-sm" style={{ fontFamily: "var(--font-sans)" }}>
                Fund 0050 &mdash; County Registries
              </h4>
              <p className="text-sm text-violet-800 mt-1">M.G.L. c.29, s.2KKK</p>
              <p className="text-sm text-violet-700 mt-2">6 districts (Barnstable, Bristol, Dukes, Norfolk, Plymouth, Nantucket)</p>
              <p className="text-lg font-bold text-violet-900 mt-2" style={{ fontFamily: "var(--font-sans)" }}>$52.3M spent</p>
            </div>
          </div>

          <p>
            Both surcharges ($5 per recording) took effect March 15, 2003 and are authorized through June 30, 2030.
            A FY2016 statewide spending plan filed with the legislature (SD2501) provides a rare window into per-registry
            planned expenditures:
          </p>
        </div>

        <RegistryBreakdownChart />

        <div className="max-w-[720px] mx-auto px-4">
          <CalloutBox>
            <strong>Boston/Suffolk</strong> consistently accounts for the largest share (~40%) of Fund 0049 expenditures,
            reflecting its status as the highest-volume registry district in the Commonwealth.
          </CalloutBox>
        </div>
      </section>

      {/* Section 6: Data Gaps & Limitations */}
      <section id={SECTION_IDS.dataGaps} className="pt-4">
        <div className="max-w-[720px] mx-auto px-4">
          <SectionHeading id={SECTION_IDS.dataGaps}>Data Gaps &amp; Limitations</SectionHeading>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold" style={{ fontFamily: "var(--font-sans)" }}>1</div>
              <div>
                <strong>FY2002-2004 missing</strong>: The funds were created in March 2003. FY2003-2004 spending is estimated
                at $5-10M but would require manual extraction from Comptroller SBFR reports to quantify precisely.
              </div>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold" style={{ fontFamily: "var(--font-sans)" }}>2</div>
              <div>
                <strong>Fund 0050 no transaction detail</strong>: The CTHRU spending portal provides transaction-level data only
                for Fund 0049. Fund 0050 is captured at the aggregate fund level, so we cannot classify county-registry spending.
              </div>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold" style={{ fontFamily: "var(--font-sans)" }}>3</div>
              <div>
                <strong>Object codes don&rsquo;t specify exact purchases</strong>: A $500K payment under &ldquo;IT Equipment Maintenance&rdquo;
                could include scanning services bundled with other IT support. Classification relies on code definitions, not
                line-item descriptions.
              </div>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold" style={{ fontFamily: "var(--font-sans)" }}>4</div>
              <div>
                <strong>Scanning possibly bundled into IT contracts</strong>: Some vendors (notably ACS) provide both scanning
                and IT services. Their non-J33 payments may include scanning work classified under broader IT codes.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Methodology */}
      <section id={SECTION_IDS.methodology} className="pt-4">
        <div className="max-w-[720px] mx-auto px-4">
          <SectionHeading id={SECTION_IDS.methodology}>Methodology</SectionHeading>
          <p className="mb-4">
            Full technical details on data acquisition, classification rules, validation, and inflation methodology.
          </p>
          <CollapsibleSection title="Technical Appendix">
            <MarkdownContent content={technicalAppendix} />
          </CollapsibleSection>
        </div>
      </section>

      {/* Section 8: Source Data & Downloads */}
      <section id={SECTION_IDS.sourceData} className="pt-4">
        <div className="max-w-[720px] mx-auto px-4">
          <SectionHeading id={SECTION_IDS.sourceData}>Source Data &amp; Downloads</SectionHeading>
          <p className="mb-6">
            All data used in this analysis is available for download. The underlying transaction-level datasets,
            annual totals, and legislative documents are provided below.
          </p>
        </div>

        <div className="max-w-[900px] mx-auto px-4 my-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4" style={{ fontFamily: "var(--font-sans)" }}>
            Annual Totals (FY2005-2026)
          </h3>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <AnnualTotalsTable />
          </div>
        </div>

        <div className="max-w-[900px] mx-auto px-4 my-8">
          <CollapsibleSection title="Full Vendor Table (125 vendors)">
            <VendorTable limit={125} />
          </CollapsibleSection>
        </div>

        <div className="max-w-[900px] mx-auto px-4 my-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4" style={{ fontFamily: "var(--font-sans)" }}>
            Downloads
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <DownloadCard
              title="Classified Transaction Dataset"
              description="All 11,103 Fund 0049 transactions with narrow/broad classification flags"
              href="/data/digitization_classified.csv"
              size="5.0 MB CSV"
            />
            <DownloadCard
              title="Master Dataset"
              description="Full Secretary of State transactions from CTHRU (all funds)"
              href="/data/digitization_master_dataset.csv"
              size="4.4 MB CSV"
            />
            <DownloadCard
              title="Annual Totals"
              description="Fund-level annual totals for both Fund 0049 and Fund 0050"
              href="/data/annual_totals.csv"
              size="3 KB CSV"
            />
            <DownloadCard
              title="Vendor Analysis"
              description="All 125 vendors ranked by broad-classified spending"
              href="/data/vendor_analysis.csv"
              size="11 KB CSV"
            />
            <DownloadCard
              title="Socrata Fund Data"
              description="Raw fund-level data from Socrata API (FY2005-2026)"
              href="/data/fund_0049_0050_fy2005_2026.csv"
              size="5 KB CSV"
            />
            <DownloadCard
              title="FY2016 Statewide Spending Plan (SD2501)"
              description="Senate Docket with per-registry planned expenditures"
              href="/data/SD2501_statewide_spending_plan_fy2016.pdf"
              size="3.0 MB PDF"
            />
            <DownloadCard
              title="Barnstable Spending Plan (HD5341)"
              description="Barnstable County registry spending plan"
              href="/data/HD5341_barnstable_spending_plan.pdf"
              size="138 KB PDF"
            />
            <DownloadCard
              title="Dukes County Spending Plan (HD5281)"
              description="Dukes County registry spending plan"
              href="/data/HD5281_dukes_county_spending_plan.pdf"
              size="1.6 MB PDF"
            />
            <DownloadCard
              title="Plymouth County 38th Request (SD2643)"
              description="Plymouth County Registry 38th spending request"
              href="/data/SD2643_plymouth_county_38th_request.pdf"
              size="1.0 MB PDF"
            />
            <DownloadCard
              title="Plymouth County Spending Plan (SD3065)"
              description="Plymouth County registry spending plan"
              href="/data/SD3065_plymouth_county_spending_plan.pdf"
              size="1.2 MB PDF"
            />
          </div>
        </div>

        <div className="max-w-[720px] mx-auto px-4 my-8 space-y-2">
          <CollapsibleSection title="Executive Summary">
            <MarkdownContent content={executiveSummary} />
          </CollapsibleSection>
          <CollapsibleSection title="Full Report">
            <MarkdownContent content={finalReport} />
          </CollapsibleSection>
          <CollapsibleSection title="Original Analysis Prompt">
            <MarkdownContent content={prompt} />
          </CollapsibleSection>
        </div>

        <div className="max-w-[720px] mx-auto px-4 mt-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-3" style={{ fontFamily: "var(--font-sans)" }}>
            External Resources
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://cthruspending.mass.gov" className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                CTHRU Statewide Spending Portal
              </a>{" "}
              &mdash; Massachusetts Office of the Comptroller transparency platform
            </li>
            <li>
              <a href="https://cthru.data.socrata.com" className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                CTHRU Socrata Open Data
              </a>{" "}
              &mdash; API access to non-budgeted special revenue fund data
            </li>
            <li>
              <a href="https://www.masslandrecords.com" className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                MassLandRecords
              </a>{" "}
              &mdash; The public-facing deed search system funded by these expenditures
            </li>
            <li>
              <a href="https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIII/Chapter29/Section2JJJ" className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                M.G.L. c.29, s.2JJJ
              </a>{" "}
              &mdash; Registers Technological Fund statute
            </li>
          </ul>
        </div>

        <div className="max-w-[720px] mx-auto px-4 mt-16 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-400" style={{ fontFamily: "var(--font-sans)" }}>
            Analysis produced March 1, 2026. Data downloaded from CTHRU spending portal on the same date.
            11,103 transactions analyzed across 17 fiscal years.
            Fund-level totals cover 22 fiscal years (FY2005-FY2026).
          </p>
        </div>
      </section>
    </main>
  );
}
