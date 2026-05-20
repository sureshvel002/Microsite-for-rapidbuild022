import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, Maximize, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const prompts = [
  {
    step: 0,
    label: "Learn",
    text: `Here is the Competitive & Strategic Intelligence Brief for the account we are going to discuss today. No action required. Use this report as additional context for your responses apart from web search and other resources.`,
  },
  {
    step: 1,
    label: "Widen",
    text: `Act as a research aide for the [selected challenge].  List key personas, top pains, current workarounds, and success metrics.
Return 5 insights & 3 risks tailored to this challenge context.`,
  },
  {
    step: 2,
    label: "Diagnose",
    text: `Let's pick the [top pain-point] for this challenge.  For this pain, run a Five Whys.
Propose 3 root-cause hypotheses and the disproof evidence for each. Specify the minimum data cut & owners to pull.
Output a root-cause map, test plan, and privacy constraints.`,
  },
  {
    step: 3,
    label: "Ideate",
    text: `Generate and Cluster possible AI driven ideas into 3 Options:
1.Process (policy, ways of working),
2.Analytics/ML (forecast, optimise, recommend),
3.AI & Automation (Computer Vision, Retrieval Augmented Generation, Agentic AI, etc.).
Score each on Impact × Feasibility × Confidence × Time-to-Value. Recommend one pilot with the smallest integration surface and clearest value proof.`,
  },
  {
    step: 4,
    label: "Brief",
    text: `For the recommended pilot, create a one-page pilot brief including:  Target user(s), problem statement, success metrics & baselines, target uplift, key flow (5–7 steps), screens/components, sample UI copy, representative sample data, integration points, and relevant guardrails ((domain specific regulation boundaries, bias tests, fallback behaviour, etc.).`,
  },
  {
    step: 5,
    label: "Build",
    text: `You are a product design expert. Using only the brief above, write a single [platform] product requirements prompt that includes Product name + one liner description (actions, process, capabilities), who it's for, screens + key components, brand colors, main user flow, sample data, concise headlines/CTAs, UI instructions, success metric card, constraints (no PII). Return the [platform] prompt only`,
  },
];

const Prompts = () => {
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showFullscreen, setShowFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopy = useCallback(async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-2 shrink-0">
        <div className="max-w-[1600px] mx-auto flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold font-display text-card-foreground">
            From Abstract Ideas to Working Demos
          </h1>
        </div>
      </header>

      {/* Main content: Image left, All prompts right */}
      <div className="flex-1 min-h-0">
        <div className="max-w-[1600px] mx-auto h-full p-4 flex gap-5">
          {/* Left: Image – sticky, stretched vertically */}
          <div className="w-[45%] shrink-0 rounded-lg border border-border overflow-hidden bg-black relative hidden lg:flex flex-col">
            <div className="w-full h-full bg-black flex items-center justify-center">
              <img
                src="/dd-prompt.jpeg"
                alt="Framework diagram"
                className="w-full h-full object-contain"
              />
            </div>
            <button
              className="absolute top-3 right-3 h-8 w-8 rounded-md bg-black/60 hover:bg-black/80 text-white flex items-center justify-center z-10"
              onClick={() => setShowFullscreen(true)}
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile: Image shown above prompts */}
          <div className="lg:hidden rounded-lg border border-border overflow-hidden bg-black relative mb-4">
            <img
              src="/dd-prompt.jpeg"
              alt="Framework diagram"
              className="w-full h-auto object-contain"
            />
            <button
              className="absolute top-3 right-3 h-8 w-8 rounded-md bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
              onClick={() => setShowFullscreen(true)}
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>

          {/* Right: All prompts visible, scrollable */}
          <div className="flex-1 min-w-0 overflow-y-auto pr-1 space-y-3">
            <h2 className="text-base font-bold font-display text-foreground mb-3">
              Follow the {prompts.length}-Step Framework
            </h2>

            {prompts.map((prompt, index) => (
              <div
                key={prompt.step}
                className="rounded-lg border border-border bg-card overflow-hidden"
              >
                {/* Card header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {prompt.step}
                    </span>
                    <span className="text-sm font-semibold text-card-foreground font-display">
                      {prompt.label}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-7 text-xs ${copiedIndex === index ? "text-green-600 border-green-300" : ""}`}
                    onClick={() => handleCopy(prompt.text, index)}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-3 w-3 mr-1" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" /> Copy
                      </>
                    )}
                  </Button>
                </div>

                {/* Prompt content */}
                <div className="px-4 py-3">
                  <p className="text-sm text-card-foreground leading-relaxed whitespace-pre-line">
                    {prompt.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen image overlay */}
      {showFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setShowFullscreen(false)}
        >
          <img
            src="/dd-prompt.jpeg"
            alt="Framework diagram fullscreen"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Prompts;
