import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Copy,
  Check,
  Maximize,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type ChallengeCard,
  formatChallengeText,
  useSelectedChallenge,
} from "@/lib/challengeStorage";

const prompts = [
  {
    step: 0,
    label: "Learn",
    text: `Here is the Competitive & Strategic Intelligence Brief for Telia Finland, the account we are going to discuss today. No action required. Use this report as additional context for your responses apart from web search and other resources.`,
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
    text: `You are a product design expert. Using only the brief above, write a single Google AI Studio product requirements prompt that includes:

- Product name + one-liner description (actions, process, capabilities)
- Who it's for (primary user, secondary users)
- Screens + key components (list every screen and what sits on it)
- Brand colours (Telia palette: primary purple, neutrals, semantic colours for success / warning / alert)
- Main user flow (5–8 steps from entry to outcome)
- Sample data (synthetic, plausible, Finnish locale, no real names)
- Concise headlines and CTAs (plain business English, no marketing tone)
- UI instructions (layout patterns, density, typography hierarchy, component states: empty / loading / populated / error)
- Success metric card (baseline → target from the brief)
- Constraints (no real customer / partner / employee PII; synthetic data only)

Return the Google AI Studio prompt only — no preamble, no commentary, no explanation of what you are about to do. Just the prompt, ready to paste into Google AI Studio.`,
  },
];

function buildPromptText(
  step: number,
  baseText: string,
  challenge: ChallengeCard | null
): { text: string; injected: boolean } {
  // Inject the full challenge content into the Widen step (step 1).
  if (step === 1 && challenge) {
    const injected = `Act as a research aide for the following challenge:

${formatChallengeText(challenge)}

List key personas, top pains, current workarounds, and success metrics.
Return 5 insights & 3 risks tailored to this challenge context.`;
    return { text: injected, injected: true };
  }
  return { text: baseText, injected: false };
}

const Prompts = () => {
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [challenge, , clearChallenge] = useSelectedChallenge();

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
            Double Diamond Framework Prompts
          </h1>
        </div>
      </header>

      {/* Main content: Selected challenge + image (left), All prompts (right) */}
      <div className="flex-1 min-h-0">
        <div className="max-w-[1600px] mx-auto h-full p-4 flex gap-5">
          {/* Left column: Selected challenge above, framework image below */}
          <div className="w-[45%] shrink-0 hidden lg:flex flex-col gap-3 min-h-0">
            <SelectedChallengePanel
              challenge={challenge}
              onChange={() => navigate("/challenge-cards")}
              onClear={clearChallenge}
            />

            <div className="shrink-0 h-[36vh] rounded-lg border border-border overflow-hidden bg-black relative">
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
          </div>

          {/* Mobile: Selected challenge + image shown above prompts */}
          <div className="lg:hidden flex flex-col gap-3 mb-4">
            <SelectedChallengePanel
              challenge={challenge}
              onChange={() => navigate("/challenge-cards")}
              onClear={clearChallenge}
            />
            <div className="rounded-lg border border-border overflow-hidden bg-black relative">
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
          </div>

          {/* Right: All prompts visible, scrollable */}
          <div className="flex-1 min-w-0 overflow-y-auto pr-1 space-y-3">
            <h2 className="text-base font-bold font-display text-foreground mb-3">
              Follow the {prompts.length}-Step Framework
            </h2>

            {prompts.map((prompt, index) => {
              const { text, injected } = buildPromptText(
                prompt.step,
                prompt.text,
                challenge
              );
              return (
                <div
                  key={prompt.step}
                  className={`rounded-lg border bg-card overflow-hidden ${
                    injected ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
                  }`}
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
                      {injected && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                          <Sparkles className="h-3 w-3" />
                          Challenge injected
                        </span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`h-7 text-xs ${copiedIndex === index ? "text-green-600 border-green-300" : ""}`}
                      onClick={() => handleCopy(text, index)}
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
                      {text}
                    </p>
                  </div>
                </div>
              );
            })}
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

interface SelectedChallengePanelProps {
  challenge: ChallengeCard | null;
  onChange: () => void;
  onClear: () => void;
}

function SelectedChallengePanel({
  challenge,
  onChange,
  onClear,
}: SelectedChallengePanelProps) {
  if (!challenge) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card/50 p-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="rounded-md bg-primary/10 p-1.5 shrink-0">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-card-foreground truncate">
              No challenge selected
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              Pick one to anchor the prompts below.
            </p>
          </div>
        </div>
        <Button size="sm" className="h-7 text-xs shrink-0" onClick={onChange}>
          Choose Challenge
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-primary/30 bg-card shadow-sm overflow-hidden flex flex-col min-h-0 flex-1">
      {/* Sticky header */}
      <div className="px-3 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="rounded-md bg-primary/15 p-1 shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary shrink-0">
            Selected Challenge
          </span>
          <span className="text-[10px] text-muted-foreground truncate">
            · {challenge.company}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onChange}
            className="text-[11px] font-medium text-primary hover:underline px-1.5 py-0.5 rounded"
            title="Pick a different challenge"
          >
            Change
          </button>
          <button
            onClick={onClear}
            className="text-muted-foreground hover:text-foreground p-1 rounded"
            title="Clear selection"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Scrollable full-content body (mirrors the Challenge Cards popup) */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3">
        <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
          {challenge.theme}
        </p>
        <h3 className="text-base font-bold font-display text-card-foreground leading-snug mb-3">
          {challenge.title}
        </h3>

        {/* Highlighted challenge statement */}
        <div className="mb-4 rounded-md border-l-[3px] border-accent bg-accent/5 px-3 py-2">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
            Challenge statement
          </h4>
          <p className="text-xs text-card-foreground leading-relaxed italic">
            &ldquo;{challenge.challengeStatement}&rdquo;
          </p>
        </div>

        <PanelSection label="Why now">
          <p className="text-xs text-muted-foreground leading-relaxed">
            {challenge.whyNow}
          </p>
        </PanelSection>

        <PanelSection label="Baseline metrics / evidence">
          <ul className="space-y-1.5">
            {challenge.baselineMetrics.map((m, i) => (
              <li
                key={i}
                className="text-xs text-muted-foreground leading-relaxed flex gap-2"
              >
                <span className="text-primary mt-0.5 shrink-0">●</span> {m}
              </li>
            ))}
          </ul>
        </PanelSection>

        <PanelSection label="Audience fit">
          <p className="text-xs text-card-foreground leading-relaxed">
            {challenge.audienceFit}
          </p>
        </PanelSection>

        <PanelSection label="Cross-functional hooks" last>
          <p className="text-xs text-card-foreground leading-relaxed">
            {challenge.crossFunctionalHooks}
          </p>
        </PanelSection>
      </div>
    </div>
  );
}

function PanelSection({
  label,
  children,
  last,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "mb-4"}>
      <h4 className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1.5">
        {label}
      </h4>
      {children}
    </div>
  );
}

export default Prompts;
