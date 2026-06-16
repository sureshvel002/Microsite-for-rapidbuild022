import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const AI_TOOLS = [
  { name: "Open ChatGPT", url: "https://chat.openai.com", color: "bg-chatgpt hover:bg-chatgpt/90 text-primary-foreground" },
  { name: "Open Gemini", url: "https://gemini.google.com", color: "bg-gemini hover:bg-gemini/90 text-primary-foreground" },
  { name: "Open Copilot", url: "https://copilot.microsoft.com", color: "bg-claude hover:bg-claude/90 text-primary-foreground" },
  { name: "Open Google AI Studio", url: "https://aistudio.google.com", color: "bg-googleai hover:bg-googleai/90 text-primary-foreground" },
];

const PDF_PATH = "/documents/bi_ai_immersion_day_discovery_brief.pdf";
const DOWNLOAD_FILENAME = "Boehringer Ingelheim - Context Pack.pdf";

const DeepResearch = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = PDF_PATH;
    link.download = DOWNLOAD_FILENAME;
    link.click();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <h1 className="text-lg font-semibold font-display text-card-foreground">Boehringer Ingelheim Context Pack</h1>
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
          </div>
        </div>
      </header>

      {/* PDF Viewer */}
      <div className="flex-1 p-4">
        <div className="max-w-5xl mx-auto h-[calc(100vh-100px)] bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <iframe
            src={PDF_PATH}
            className="w-full h-full"
            title="Boehringer Ingelheim Context Pack"
          />
        </div>
      </div>
    </div>
  );
};

export default DeepResearch;
