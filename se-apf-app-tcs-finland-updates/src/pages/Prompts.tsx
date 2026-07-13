import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, Maximize, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChallengeCard {
  number: string;
  company: string;
  title: string;
  context: string[];
  coreChallenge: string;
  tension: string;
  opportunityAngle: string;
  successMetrics: string[];
}

// Building platforms offered for step 5 (Build).
const PLATFORMS = [
  "Google AI Studio",
  "Lovable",
  "Microsoft Copilot",
  "v0 by Vercel",
  "Bolt.new",
  "Replit",
];

// Only the [selected challenge] placeholder in step 1 is filled from the
// selected challenge, and the [platform] blank in step 5 is filled from the
// selected platform. Every other prompt stays exactly as written below.
function buildPrompts(c: ChallengeCard | null, platform: string | null) {
  const selectedChallenge = c
    ? `"${c.title}" challenge at ${c.company}. Core challenge: ${c.coreChallenge} The opportunity is to ${c.opportunityAngle.charAt(0).toLowerCase()}${c.opportunityAngle.slice(1)}. The key tension to balance is ${c.tension.charAt(0).toLowerCase()}${c.tension.slice(1)}.`
    : "[selected challenge]";
  const selectedPlatform = platform || "[platform]";

  return [
    {
      step: 0,
      label: "Learn",
      text: `Here is the Johnson & Johnson HR & Agentic AI context for the challenge we are going to discuss today. No action required. Use this context, along with the selected Challenge Card, as additional grounding for your responses apart from web search and other resources.`,
    },
    {
      step: 1,
      label: "Widen",
      text: `Act as a research aide for the ${selectedChallenge}.  Map the HR value stream in scope (e.g. recruitment, onboarding, employee support, HR operations, or payroll & compliance).
List key personas (recruiters, new hires, employees, HR specialists, managers), their top pains, current manual workarounds, and the target success metrics.
Return 5 insights & 3 risks (bias, privacy, compliance, change adoption) tailored to this agentic-AI HR challenge.`,
    },
    {
      step: 2,
      label: "Diagnose",
      text: `Let's pick the [top pain-point] for this challenge.  For this pain, run a Five Whys.
Propose 3 root-cause hypotheses and the disproof evidence for each. Specify the minimum data cut (systems such as Workday, ServiceNow, Payroll, Learning) & the process owners to pull it.
Output a root-cause map, a test plan, and the privacy, fairness, and regulatory constraints that must be respected.`,
    },
    {
      step: 3,
      label: "Ideate",
      text: `Generate and cluster possible AI-driven ideas for this challenge into 3 Options:
1. Process (policy, ways of working, human-in-the-loop governance),
2. Analytics/ML (screen, rank, forecast, anomaly detection, recommend),
3. Agentic AI & Automation (multi-step HR agents, RAG over enterprise knowledge, cross-system orchestration across Workday/ServiceNow/M365/Payroll).
Score each on Impact × Feasibility × Confidence × Time-to-Value. Recommend one agentic pilot with the smallest integration surface, clearest value proof, and a mandatory human-review checkpoint.`,
    },
    {
      step: 4,
      label: "Brief",
      text: `For the recommended agentic HR pilot, create a one-page pilot brief including:  Target user(s), problem statement, success metrics & baselines (map to the Challenge Card targets), target uplift, key agent flow (5–7 steps including escalation/human-in-the-loop), screens/components, sample UI copy, representative sample data (synthetic, no real employee PII), enterprise integration points (Workday, ServiceNow, M365, Payroll, Learning), and guardrails (bias tests, privacy & data-residency boundaries, compliance checks, fallback behaviour, audit trail).`,
    },
    {
      step: 5,
      label: "Build",
      text: `You are a product design expert. Using only the brief above, write a single ${selectedPlatform} product requirements prompt that includes Product name + one-liner description (agent actions, process, capabilities), who it's for, screens + key components, J&J brand colors, main user flow with human-in-the-loop checkpoints, synthetic sample data, concise headlines/CTAs, UI instructions, a success-metric card, and constraints (no real employee PII, compliance & bias guardrails). Return the ${selectedPlatform} prompt only`,
    },
  ];
}

const Prompts = () => {
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [challenge, setChallenge] = useState<ChallengeCard | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("selectedChallenge");
      if (stored) setChallenge(JSON.parse(stored) as ChallengeCard);
    } catch {
      setChallenge(null);
    }
  }, []);

  const prompts = buildPrompts(challenge, platform);

  const clearChallenge = () => {
    localStorage.removeItem("selectedChallenge");
    setChallenge(null);
  };

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
            <h2 className="text-base font-bold font-display text-foreground mb-1">
              Follow the {prompts.length}-Step Framework
            </h2>

            {/* Selected-challenge banner */}
            {challenge ? (
              <div className="flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 mb-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
                    Tailored for · {challenge.company}
                  </p>
                  <p className="text-sm font-medium text-card-foreground truncate">
                    {challenge.title}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs shrink-0"
                  onClick={clearChallenge}
                >
                  <X className="h-3 w-3 mr-1" /> Clear
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-2.5 mb-3">
                <p className="text-sm text-muted-foreground">
                  Pick a challenge to auto-fill these prompts.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs shrink-0"
                  onClick={() => navigate("/challenge-cards")}
                >
                  Choose challenge
                </Button>
              </div>
            )}

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

                {/* Platform selector for the Build step */}
                {prompt.step === 5 && (
                  <div className="px-4 pt-3">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">
                      Choose your building platform to fill the blank:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {PLATFORMS.map((p) => (
                        <button
                          key={p}
                          onClick={() => setPlatform((prev) => (prev === p ? null : p))}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                            platform === p
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

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
