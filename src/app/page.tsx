import Article from "@/components/Article";
import { readContent } from "./content-loader";

export default function Home() {
  const technicalAppendix = readContent("technical_appendix.md");
  const executiveSummary = readContent("executive_summary.md");
  const finalReport = readContent("final_report.md");
  const prompt = readContent("ma-deeds-digitization-prompt.md");

  return (
    <Article
      technicalAppendix={technicalAppendix}
      executiveSummary={executiveSummary}
      finalReport={finalReport}
      prompt={prompt}
    />
  );
}
