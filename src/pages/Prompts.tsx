import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Copy,
  Check,
  Maximize,
  X,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type ChallengeCard,
  useSelectedChallenge,
} from "@/lib/challengeStorage";

interface PromptVariant {
  id: string;
  title: string;
  subtitle: string;
  text: string;
}

interface BasePrompt {
  step: number;
  label: string;
}

interface SimplePrompt extends BasePrompt {
  text: string;
}

interface VariantPrompt extends BasePrompt {
  variants: PromptVariant[];
}

type Prompt = SimplePrompt | VariantPrompt;

const isVariantPrompt = (p: Prompt): p is VariantPrompt =>
  "variants" in p && Array.isArray((p as VariantPrompt).variants);

const prompts: Prompt[] = [
  {
    step: 0,
    label: "Learn",
    text: `Here is the Telia Finland context pack and the challenge card we will work on today. No action required yet — read both as background.

Confirm you have understood (1) Telia Finland's business model and current strategic context, and (2) the specific friction this challenge describes.

Note three things from this material that surprised you and one assumption you would test first.`,
  },
  {
    step: 1,
    label: "Widen",
    text: `Act as a research aide for the [SELECTED CHALLENGE STATEMENT] at Telia Finland.

List the key personas inside Telia Finland who feel this friction day-to-day, the top three pains they experience, and then:

Cluster the persona pains into 2–4 system-level pains that recur across multiple personas.

For each system-level pain:
a) Give it a short label (SP1, SP2, etc.)
b) Provide a one-sentence description
c) List which personas experience it

Also list the current workarounds they rely on (manual spreadsheets, email threads, vendor tools, key-person knowledge), and the success metrics that would tell us the friction is reducing.

Return five fresh insights and three risks.`,
  },
  {
    step: 2,
    label: "Diagnose",
    text: `Pick the [TOP PAIN] for this Telia Finland challenge.

For this pain, run a Five Whys. Propose three root-cause hypotheses and the disproof evidence for each — what would have to be true for the hypothesis to be wrong.

Specify the minimum data extract needed to test each hypothesis and which Telia team is most likely to own that data (BSS / OSS, Salesforce / Vlocity CRM-CPQ, Telia ACE contact centre, ServiceNow, Microsoft 365 / SharePoint, the data platform, network management systems, billing, or any other system referenced in the Telia context pack).

Output a root-cause map and a test plan.`,
  },
  {
    step: 3,
    label: "Ideate",
    text: `Generate and cluster possible AI-driven solutions for this Telia Finland challenge into three options:

1. Process — policy, ways of working, governance changes.
2. Analytics / ML — forecast, optimise, recommend.
3. AI & Automation — RAG, agents, computer vision, copilot patterns.

For each category, list 2–3 distinct ideas. For each idea give me a brief description.

Tabulate and score each idea on Impact × Feasibility × Confidence × Time-to-Value (1–5 each) and show the total score for that idea.

Recommend one pilot, scoring it on three things:

- Ease of build — which option needs the fewest existing Telia systems to be connected? (i.e. the option that depends least on Salesforce / Vlocity, BSS / OSS, ServiceNow, Telia ACE, SharePoint or Microsoft 365)
- Owner clarity — which option has the clearest single person in the room today who could lead it?
- Strategic anchor — which option ties to a clear forcing function the room recognises today (a deadline, a leadership commitment, or a measurable outcome already on a roadmap).`,
  },
  {
    step: 4,
    label: "Brief",
    text: `For the recommended pilot, create a one-page Telia Finland pilot brief including:

• Target user (named or archetype, drawn from the persona list above)
• Problem statement in their voice
• Success metric with current baseline and target uplift
• Key flow in 5–7 steps
• Screens or components needed
• Sample UI copy in plain business English (no marketing tone, no superlatives)
• Representative sample data (no real customer / partner / employee data; use synthetic Telia-like names and amounts)
• Integration points across the Telia stack`,
  },
  {
    step: 5,
    label: "Build",
    variants: [
      {
        id: "ai-studio",
        title: "Google AI Studio",
        subtitle: "Generate a PRD-style prompt to paste into AI Studio",
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
      {
        id: "copilot-html",
        title: "Microsoft 365 Copilot",
        subtitle: "Generate a clickable HTML mockup directly via Copilot",
        text: `Create a single .html file for a clickable mock-up based on the information in the product brief generated above.

Target user: from the brief generated above
Main user flow: from the brief generated above

Requirements:

• One .html file, inline CSS and JavaScript, no external dependencies.
• Apply the Telia brand UI directly inside the file (do not reference external files):
    • Brand colours: Telia primary purple (#990AE3) for primary actions, headers and key accents. Clean light slate or off-white background. Dark slate body text. Semantic colours: green for success, amber for warning, red for alert.
    • Typography: Telia Sans (or a clean web-safe sans-serif fallback such as Inter or system-ui) with a clear hierarchy: display, heading, body, caption.
    • Layout: generous whitespace, consistent rounded corners, subtle shadows, compact-but-readable density, responsive desktop-first layout.
    • Component states: every interactive component must render empty, loading, populated and error states.
• Cover all the screens needed by the main user flow as suggested by the selected challenge card and the brief. Do not artificially cap the screen count. Include navigation between screens so the flow is clickable end-to-end.
• Synthetic sample data inline. No real names, no API calls. Use plausible Finnish-locale data (Helsinki, Espoo, Tampere; € amounts; Finnish company or contact placeholders).
• Plain business English in all UI copy. No marketing tone, no superlatives.
• A success-metric tile showing baseline and target from the brief.

Return the file as a downloadable .html using Copilot's file-creation capability. Do not paste HTML into the chat.`,
      },
    ],
  },
];

function buildPromptText(
  step: number,
  baseText: string,
  challenge: ChallengeCard | null
): { text: string; injected: boolean } {
  // Step 1 (Widen) carries a `[SELECTED CHALLENGE STATEMENT]` placeholder.
  // When a challenge is selected, swap that token in-place with the
  // challenge card's title only — the surrounding sentence already
  // anchors the context to "at Telia Finland".
  if (step === 1 && challenge) {
    const placeholder = "[SELECTED CHALLENGE STATEMENT]";
    if (baseText.includes(placeholder)) {
      const injected = baseText.replace(placeholder, challenge.title);
      return { text: injected, injected: true };
    }
  }
  return { text: baseText, injected: false };
}

const Prompts = () => {
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [challenge, , clearChallenge] = useSelectedChallenge();
  // Tracks the currently selected Build-step tool variant. Defaults to the
  // first variant defined in the prompts data (currently "ai-studio").
  const [activeBuildVariant, setActiveBuildVariant] = useState<string>(() => {
    const buildPrompt = prompts.find((p) => p.step === 5);
    if (buildPrompt && isVariantPrompt(buildPrompt)) {
      return buildPrompt.variants[0]?.id ?? "";
    }
    return "";
  });

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
              const hasVariants = isVariantPrompt(prompt);
              const activeVariant = hasVariants
                ? prompt.variants.find((v) => v.id === activeBuildVariant) ??
                  prompt.variants[0]
                : null;
              const baseText = hasVariants
                ? activeVariant!.text
                : (prompt as SimplePrompt).text;
              const { text, injected } = buildPromptText(
                prompt.step,
                baseText,
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
                      {hasVariants && activeVariant && (
                        <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                          {activeVariant.title}
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

                  {/* Variant selector — only for prompts with multiple variants */}
                  {hasVariants && (
                    <div className="px-4 pt-3 pb-1 bg-gradient-to-b from-muted/20 to-transparent">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Wrench className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Pick the tool you have access to
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {prompt.variants.map((v) => {
                          const isSelected = v.id === activeBuildVariant;
                          return (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() => setActiveBuildVariant(v.id)}
                              className={`group relative rounded-md border px-3 py-2 text-left transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/5 ring-1 ring-primary/30 shadow-sm"
                                  : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                <span
                                  className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                                    isSelected
                                      ? "border-primary bg-primary"
                                      : "border-muted-foreground/40 bg-transparent"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="h-2.5 w-2.5 text-primary-foreground" />
                                  )}
                                </span>
                                <div className="min-w-0">
                                  <div
                                    className={`text-xs font-bold leading-tight ${
                                      isSelected ? "text-primary" : "text-card-foreground"
                                    }`}
                                  >
                                    {v.title}
                                  </div>
                                  <div className="text-[10px] text-muted-foreground leading-snug mt-0.5">
                                    {v.subtitle}
                                  </div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Prompt content — `whitespace-pre-wrap` preserves leading
                      indent so nested bullet points stay nested visually. */}
                  <div className="px-4 py-3">
                    <p className="text-sm text-card-foreground leading-relaxed whitespace-pre-wrap">
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
