import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, ExternalLink, FileClock } from "lucide-react";
import { Button } from "@/components/ui/button";

const AI_TOOLS = [
  { name: "Open ChatGPT", url: "https://chat.openai.com", color: "bg-chatgpt hover:bg-chatgpt/90 text-primary-foreground" },
  { name: "Open Gemini", url: "https://gemini.google.com", color: "bg-gemini hover:bg-gemini/90 text-primary-foreground" },
  { name: "Open Copilot", url: "https://copilot.microsoft.com", color: "bg-claude hover:bg-claude/90 text-primary-foreground" },
  { name: "Open Google AI Studio", url: "https://aistudio.google.com", color: "bg-googleai hover:bg-googleai/90 text-primary-foreground" },
];

// Drop the gm deep research PDF at this path in `public/` and the viewer
// picks it up with no code change. Until it lands, the page shows a
// "not published yet" state instead of a browser PDF error.
const PDF_PATH = "/documents/gm_agentic_ai_deep_research.pdf";
const DOWNLOAD_FILENAME = "GM - Enterprise Agentic AI Context Pack.pdf";

type PdfState = "checking" | "available" | "missing";

const DeepResearch = () => {
  const navigate = useNavigate();
  const [pdfState, setPdfState] = useState<PdfState>("checking");

  // A dev server / SPA host answers an unknown path with the index.html
  // fallback rather than a 404, so check the content type too — otherwise
  // the iframe would render the app inside itself.
  useEffect(() => {
    let cancelled = false;
    fetch(PDF_PATH, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") ?? "";
        const ok = res.ok && type.includes("pdf");
        if (!cancelled) setPdfState(ok ? "available" : "missing");
      })
      .catch(() => {
        if (!cancelled) setPdfState("missing");
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
            <h1 className="text-lg font-semibold font-display text-card-foreground">
              GM Context Pack
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={pdfState !== "available"}
            >
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
          {pdfState === "available" ? (
            <iframe
              src={PDF_PATH}
              className="w-full h-full"
              title="GM Context Pack"
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 px-8">
              <div className="rounded-full bg-primary/10 p-3">
                <FileClock className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-xl font-semibold font-display text-card-foreground">
                {pdfState === "checking"
                  ? "Loading context pack…"
                  : "Context pack not published yet"}
              </h2>
              {pdfState === "missing" && (
                <>
                  <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                    The GM deep research brief hasn&rsquo;t been added to this
                    site yet. Once it&rsquo;s dropped in, it will open and
                    download from right here.
                  </p>
                  <p className="text-xs text-muted-foreground/80 font-mono">
                    Expected at <code>public{PDF_PATH}</code>
                  </p>
                  <Button
                    size="sm"
                    className="mt-2"
                    onClick={() => navigate("/challenge-cards")}
                  >
                    Go to Challenge Cards instead
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeepResearch;
