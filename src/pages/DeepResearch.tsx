import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyPath, getCompany } from "@/data/afm";
import { readableTextOn } from "@/lib/brand";

const AI_TOOLS = [
  { name: "Open ChatGPT", url: "https://chat.openai.com", color: "bg-chatgpt hover:bg-chatgpt/90 text-primary-foreground" },
  { name: "Open Gemini", url: "https://gemini.google.com", color: "bg-gemini hover:bg-gemini/90 text-primary-foreground" },
  { name: "Open Copilot", url: "https://copilot.microsoft.com", color: "bg-claude hover:bg-claude/90 text-primary-foreground" },
  { name: "Open Google AI Studio", url: "https://aistudio.google.com", color: "bg-googleai hover:bg-googleai/90 text-primary-foreground" },
];

const DeepResearch = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const company = getCompany(companyId);

  if (!company) return <Navigate to="/" replace />;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = company.pdf;
    link.download = company.pdfDownloadName;
    link.click();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(companyPath(company.id))}
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-bold"
              style={{
                background: company.brand.primary,
                color: readableTextOn(company.brand.primary),
              }}
            >
              {company.monogram}
            </span>
            <h1 className="text-lg font-semibold font-display text-card-foreground truncate">
              {company.name} Context Pack
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-1" /> Download PDF
            </Button>
            {AI_TOOLS.map((tool) => (
              <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className={tool.color}>
                  <ExternalLink className="h-3.5 w-3.5 mr-1" /> {tool.name}
                </Button>
              </a>
            ))}
            <Button
              size="sm"
              onClick={() => navigate(companyPath(company.id, "challenge-cards"))}
              style={{
                background: company.brand.primary,
                color: readableTextOn(company.brand.primary),
              }}
              className="hover:opacity-90"
            >
              Challenge cards <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </header>

      {/* PDF Viewer */}
      <div className="flex-1 p-4">
        <div className="max-w-5xl mx-auto h-[calc(100vh-100px)] bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <iframe
            src={company.pdf}
            className="w-full h-full"
            title={`${company.name} Context Pack`}
          />
        </div>
      </div>
    </div>
  );
};

export default DeepResearch;
