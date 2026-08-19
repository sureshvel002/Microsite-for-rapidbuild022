import { useState, useCallback, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Copy,
  Check,
  Maximize,
  X,
  Sparkles,
  Wrench,
  Bot,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type ChallengeCard,
  formatChallengeText,
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

// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —
// Workshop-tool selection
//
// Senior stakeholders running the workshop pick a single AI assistant
// upfront (Google AI Studio vs Microsoft 365 Copilot). That choice drives
// which variant of the Step-5 (Build) prompt is shown, and is reminded
// across the page so participants don't second-guess themselves at Step 5
// after using one tool for Steps 1–4. Persisted in localStorage so the
// pick survives page reloads (matches the challenge-selection pattern).
// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —
const TOOL_STORAGE_KEY = "workshopTool:eneco-belgium-v1";

function readStoredTool(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOOL_STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStoredTool(toolId: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(TOOL_STORAGE_KEY, toolId);
  } catch {
    // ignore (private mode, quota, etc.)
  }
}

const prompts: Prompt[] = [
  {
    step: 0,
    label: "Learn",
    text: `Here is a deep research report for the topic we are going to discuss today. No action required. Use this report as additional context for your responses apart from web search and other resources.`,
  },
  {
    step: 1,
    label: "Widen",
    text: `Act as a research aide for [SELECTED CHALLENGE] for [COMPANY]. List key personas, top pains, current workarounds, and success metrics. Return 5 insights & 3 risks tailored to this challenge context.`,
  },
  {
    step: 2,
    label: "Diagnose",
    text: `Let's pick the top [NUMBER] pains for this challenge. For these listed top pains, run a Five Whys. Propose 3 root-cause hypotheses and the disproof evidence for each. Specify the minimum data cut & owners to pull. Output a root-cause map, test plan, and privacy constraints.`,
  },
  {
    step: 3,
    label: "Ideate",
    text: `Generate and cluster possible AI-driven ideas into 3 options:

1. Process — policy, ways of working.
2. Analytics / ML — forecast, optimise, recommend.
3. Automation — CV, RAG / Co-Pilot, tasking.

Score each on Impact \u00D7 Feasibility \u00D7 Confidence \u00D7 Time-to-Value. Recommend one pilot with the smallest integration surface and clearest value proof to the client.`,
  },
  {
    step: 4,
    label: "Brief",
    text: `For option [NUMBER], create a one-page pilot brief including: Target user(s), problem statement, success metrics & baselines, target uplift, key flow (5\u20137 steps), screens/components, sample UI copy, representative sample data, integration points, and relevant guardrails (GDPR/PCI, domain-specific regulation boundaries, bias tests, fallback behaviour).`,
  },
  {
    step: 5,
    label: "Build",
    text: `Create a single .html file for a clickable mock-up based on the information in the product brief generated above.

Target user: from the brief generated above
Main user flow: from the brief generated above

Requirements:

\u2022 One .html file, inline CSS and JavaScript, no external dependencies.
\u2022 Apply the [COMPANY] brand UI directly inside the file (do not reference external files):
    \u2022 Brand colours: [BRAND COLOURS]. Clean light slate or off-white background. Dark slate body text. Semantic colours: green for success, amber for warning, red for alert.
    \u2022 Typography: A clean web-safe sans-serif fallback such as Inter or system-ui with a clear hierarchy: display, heading, body, caption.
    \u2022 Layout: generous whitespace, consistent rounded corners, subtle shadows, compact-but-readable density, responsive desktop-first layout.
    \u2022 Component states: every interactive component must render empty, loading, populated and error states.
\u2022 Cover all the screens needed by the main user flow as suggested by the selected challenge card and the brief. Do not artificially cap the screen count. Include navigation between screens so the flow is clickable end-to-end.
\u2022 Synthetic sample data inline. No real names, no API calls. Use plausible Belgian-locale data (Mechelen, Wavre, Ghent, Antwerp; \u20AC amounts; Dutch- and French-language placeholders \u2014 never English-only; EAN connection-point references and Belgian company or contact placeholders).
\u2022 Plain business English in all UI copy. No marketing tone, no superlatives.
\u2022 A success-metric tile showing baseline and target from the brief.

Return the file as a downloadable .html using Copilot\u2019s file-creation capability. Do not paste HTML into the chat.`,
  },
];

// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —
// Company brand mapping — used by the Build step to inject company-specific
// brand colours into the mock-up prompt.
// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —
const COMPANY_BRANDS: Record<string, string> = {
  "Eneco Belgium":
    "Eneco brand red (#E5322D) for primary actions, headers and key accents, with a warm coral secondary (#F26A4B) and a deep slate (#1F2933) for text",
};

// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —
// Prompt segmentation — turns a plain prompt string into a list of typed
// segments so the renderer can visually distinguish:
//   • static       → normal prose
//   • placeholder  → `[TOP PAIN]`-style tokens the user must fill in
//   • injected     → text the system has substituted in (selected challenge)
// The `text` field returned alongside is the plain concatenation, used by
// the Copy button so the clipboard still gets the placeholder verbatim.
// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —

type PromptSegment =
  | { type: "static"; text: string }
  | { type: "placeholder"; text: string }
  | { type: "injected"; text: string };

// Matches uppercase bracketed tokens like `[TOP PAIN]`,
// `[SELECTED CHALLENGE STATEMENT]`. Lowercase bracketed text is left alone.
const PLACEHOLDER_RE = /\[[A-Z][A-Z0-9 _-]*\]/g;

function splitPlaceholders(input: string): PromptSegment[] {
  if (!input) return [];
  const out: PromptSegment[] = [];
  let cursor = 0;
  for (const m of input.matchAll(PLACEHOLDER_RE)) {
    const start = m.index ?? 0;
    if (start > cursor) {
      out.push({ type: "static", text: input.slice(cursor, start) });
    }
    out.push({ type: "placeholder", text: m[0] });
    cursor = start + m[0].length;
  }
  if (cursor < input.length) {
    out.push({ type: "static", text: input.slice(cursor) });
  }
  return out;
}

// Produces segments for the resolved Build prompt. The resolved text has
// company/brand values substituted in; we mark those substituted strings
// as "injected" so they get the purple highlight in the UI.
function splitWithInjections(
  _template: string,
  resolved: string,
  companyName: string
): PromptSegment[] {
  // Simple approach: split the resolved text on placeholder-style tokens
  // first, then mark any segment that contains the injected company name
  // or brand string as "injected".
  const base = splitPlaceholders(resolved);
  const brandText = COMPANY_BRANDS[companyName] ?? companyName;
  const out: PromptSegment[] = [];
  for (const seg of base) {
    if (
      seg.type === "static" &&
      (seg.text.includes(companyName) || seg.text.includes(brandText))
    ) {
      // Split on injected company / brand occurrences
      let remainder = seg.text;
      const targets = [brandText, companyName].filter((t) =>
        remainder.includes(t)
      );
      if (targets.length === 0) {
        out.push(seg);
        continue;
      }
      // Process longest match first to avoid partial overlap
      targets.sort((a, b) => b.length - a.length);
      const parts: PromptSegment[] = [];
      for (const target of targets) {
        const temp: PromptSegment[] = [];
        const pending = parts.length ? parts : [{ type: "static" as const, text: remainder }];
        for (const p of pending) {
          if (p.type !== "static" || !p.text.includes(target)) {
            temp.push(p);
            continue;
          }
          const chunks = p.text.split(target);
          chunks.forEach((chunk, ci) => {
            if (chunk) temp.push({ type: "static", text: chunk });
            if (ci < chunks.length - 1) temp.push({ type: "injected", text: target });
          });
        }
        parts.length = 0;
        parts.push(...temp);
      }
      out.push(...(parts.length ? parts : [seg]));
    } else {
      out.push(seg);
    }
  }
  return out;
}

function buildPromptSegments(
  step: number,
  baseText: string,
  challenge: ChallengeCard | null
): { segments: PromptSegment[]; text: string; injected: boolean } {
  // Step 1 (Widen) carries `[SELECTED CHALLENGE]` and `[COMPANY]` placeholders.
  // When a challenge is selected, swap the challenge token in-place with the
  // card title (or the full structured block for `injectionMode: "full"`) and
  // swap `[COMPANY]` with the selected challenge's company.
  if (step === 1 && challenge) {
    const token = "[SELECTED CHALLENGE]";
    const companyToken = "[COMPANY]";

    if (baseText.includes(token) || baseText.includes(companyToken)) {
      let segments: PromptSegment[];
      if (baseText.includes(token)) {
        const idx = baseText.indexOf(token);
        const before = baseText.slice(0, idx);
        const after = baseText.slice(idx + token.length);
        const injectedText =
          challenge.injectionMode === "full"
            ? `the following challenge:\n\n${formatChallengeText(challenge)}\n`
            : challenge.title;
        segments = [
          ...splitPlaceholders(before),
          { type: "injected", text: injectedText },
          ...splitPlaceholders(after),
        ];
      } else {
        segments = splitPlaceholders(baseText);
      }

      // Swap the `[COMPANY]` placeholder for the selected challenge's company.
      segments = segments.map((seg) =>
        seg.type === "placeholder" && seg.text === companyToken
          ? { type: "injected" as const, text: challenge.company }
          : seg
      );

      return {
        segments,
        text: segments.map((s) => s.text).join(""),
        injected: true,
      };
    }
  }

  // Step 5 (Build) carries `[COMPANY]` and `[BRAND COLOURS]` placeholders.
  // When a challenge is selected, inject the company name and brand colours.
  if (step === 5 && challenge) {
    let resolved = baseText;
    const companyToken = "[COMPANY]";
    const brandToken = "[BRAND COLOURS]";
    const hasCompany = resolved.includes(companyToken);
    const hasBrand = resolved.includes(brandToken);

    if (hasCompany || hasBrand) {
      if (hasCompany) {
        resolved = resolved.replaceAll(companyToken, challenge.company);
      }
      if (hasBrand) {
        const brandText =
          COMPANY_BRANDS[challenge.company] ??
          `${challenge.company} primary colour for primary actions, headers and key accents`;
        resolved = resolved.replaceAll(brandToken, brandText);
      }
      // Re-segment with injected markers for changed tokens
      const segments = splitWithInjections(baseText, resolved, challenge.company);
      return { segments, text: resolved, injected: true };
    }
  }

  // No injection — just split the literal placeholders so they get the
  // "fill me in" pill treatment in the renderer.
  return {
    segments: splitPlaceholders(baseText),
    text: baseText,
    injected: false,
  };
}

// Inline highlight for system-injected challenge content. When the injected
// payload is long (e.g. C11's `injectionMode: "full"` block), it's
// collapsed by default with a Read more / Read less toggle — keeps the
// surrounding prompt instructions readable. Short injections (title-only
// mode) render as a plain inline highlight, no toggle.
function InjectedSegment({ text }: { text: string }) {
  const COLLAPSE_THRESHOLD = 220;
  const [expanded, setExpanded] = useState(false);

  const highlightClass =
    "rounded-sm bg-primary/10 text-primary px-1 font-semibold ring-1 ring-primary/20";

  if (text.length <= COLLAPSE_THRESHOLD) {
    return (
      <span
        className={highlightClass}
        title="Filled in from your selected challenge"
      >
        {text}
      </span>
    );
  }

  // Find a clean clip point — prefer the end of a line, then a sentence
  // boundary near the threshold; fall back to a hard cut + ellipsis.
  const slice = text.slice(0, COLLAPSE_THRESHOLD);
  const lastNewline = slice.lastIndexOf("\n");
  const lastSentence = slice.lastIndexOf(". ");
  const clipPoint = Math.max(
    lastNewline,
    lastSentence > 0 ? lastSentence + 1 : -1
  );
  const clipped =
    clipPoint > COLLAPSE_THRESHOLD * 0.4
      ? text.slice(0, clipPoint)
      : `${slice}\u2026`;

  return (
    <>
      <span
        className={highlightClass}
        title="Filled in from your selected challenge"
      >
        {expanded ? text : clipped}
      </span>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="ml-1.5 align-baseline text-[11px] font-bold text-primary hover:underline inline-flex items-center gap-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
        aria-expanded={expanded}
      >
        {expanded ? "Read less" : "Read more"}
        <ChevronRight
          className={`h-3 w-3 transition-transform ${
            expanded ? "-rotate-90" : "rotate-90"
          }`}
        />
      </button>
    </>
  );
}

function PromptBody({ segments }: { segments: PromptSegment[] }) {
  return (
    <p className="text-sm text-card-foreground leading-relaxed whitespace-pre-wrap">
      {segments.map((seg, i) => {
        if (seg.type === "injected") {
          return <InjectedSegment key={i} text={seg.text} />;
        }
        if (seg.type === "placeholder") {
          return (
            <span
              key={i}
              className="rounded-sm bg-amber-100 text-amber-800 border border-dashed border-amber-400 px-1 font-mono text-[12px] font-bold uppercase tracking-wide"
              title="Replace this placeholder before running the prompt"
            >
              {seg.text}
            </span>
          );
        }
        return <Fragment key={i}>{seg.text}</Fragment>;
      })}
    </p>
  );
}

const Prompts = () => {
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [challenge, , clearChallenge] = useSelectedChallenge();
  // Tracks the currently selected workshop tool. Persisted in localStorage
  // so the pick survives reloads. Falls back to the first variant defined
  // in the prompts data when nothing is stored yet.
  const buildVariants = (() => {
    const buildPrompt = prompts.find((p) => p.step === 5);
    return buildPrompt && isVariantPrompt(buildPrompt) ? buildPrompt.variants : [];
  })();
  const [activeBuildVariant, setActiveBuildVariantState] = useState<string>(() => {
    const stored = readStoredTool();
    if (stored && buildVariants.some((v) => v.id === stored)) return stored;
    return buildVariants[0]?.id ?? "";
  });
  const setActiveBuildVariant = useCallback((toolId: string) => {
    setActiveBuildVariantState(toolId);
    writeStoredTool(toolId);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopy = useCallback(async (text: string, index: number, step: number) => {
    // For the Widen step, append the full selected challenge card content so
    // the AI tool gets the complete challenge context, not just the title.
    let clipboard = text;
    if (step === 1 && challenge) {
      clipboard = `${text}\n\n--- Challenge details ---\n${formatChallengeText(challenge)}`;
    }
    await navigator.clipboard.writeText(clipboard);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, [challenge]);

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
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 mb-3">
              <h2 className="text-base font-bold font-display text-foreground">
                Follow the {prompts.length}-Step Framework
              </h2>
              {/* Highlight legend — explains the two visual styles used inside
                  each prompt body. Lives next to the heading so the user sees
                  it before scanning the first card. */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="rounded-sm bg-amber-100 text-amber-800 border border-dashed border-amber-400 px-1 font-mono text-[10px] font-bold leading-tight">
                    [PLACEHOLDER]
                  </span>
                  fill in manually
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="rounded-sm bg-primary/10 text-primary px-1 font-semibold ring-1 ring-primary/20 text-[10px] leading-tight">
                    selected challenge
                  </span>
                  auto-injected
                </span>
              </div>
            </div>

            {prompts.map((prompt, index) => {
              const hasVariants = isVariantPrompt(prompt);
              const activeVariant = hasVariants
                ? prompt.variants.find((v) => v.id === activeBuildVariant) ??
                  prompt.variants[0]
                : null;
              const baseText = hasVariants
                ? activeVariant!.text
                : (prompt as SimplePrompt).text;
              const { segments, text, injected } = buildPromptSegments(
                prompt.step,
                baseText,
                challenge
              );
              return (
                <Fragment key={prompt.step}>
                  {/* Workshop-tool picker — rendered immediately above the
                      variant-bearing Step 5 card so the build-path choice
                      sits exactly where it applies. Keeps Steps 0–4 reading
                      uninterrupted at the top of the prompts column. */}
                  {hasVariants && (
                    <WorkshopToolPicker
                      variants={prompt.variants}
                      activeId={activeBuildVariant}
                      onChange={setActiveBuildVariant}
                    />
                  )}

                {/* Section title */}
                <h3 className="text-base font-bold font-display text-foreground mt-2 mb-1">
                  Step {prompt.step} — {prompt.label}
                </h3>

                <div
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
                        <span
                          className="inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                          title="Paste this prompt into the same chat as Steps 0–4. The label below tells you what it produces."
                        >
                          <Bot className="h-3 w-3" />
                          {activeVariant.title}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`h-7 text-xs ${copiedIndex === index ? "text-green-600 border-green-300" : ""}`}
                      onClick={() => handleCopy(text, index, prompt.step)}
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

                  {/* Prompt content — segmented so dynamic content (system
                      injections + user-fill placeholders) can be visually
                      distinguished from static prose. `whitespace-pre-wrap`
                      preserves leading indent on nested bullets. */}
                  <div className="px-4 py-3">
                    <PromptBody segments={segments} />
                  </div>
                </div>
                </Fragment>
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

        <PanelSection label="Cross-functional hooks">
          <p className="text-xs text-card-foreground leading-relaxed">
            {challenge.crossFunctionalHooks}
          </p>
        </PanelSection>

        {challenge.constraints && challenge.constraints.length > 0 && (
          <PanelSection label="Constraints the room must respect">
            <ul className="space-y-1.5">
              {challenge.constraints.map((c, i) => (
                <li
                  key={i}
                  className="text-xs text-muted-foreground leading-relaxed flex gap-2"
                >
                  <span className="text-accent mt-0.5 shrink-0">▸</span> {c}
                </li>
              ))}
            </ul>
          </PanelSection>
        )}

        {challenge.whyGoodBuild && (
          <PanelSection label="Why this is a good build" last>
            <p className="text-xs text-card-foreground leading-relaxed">
              {challenge.whyGoodBuild}
            </p>
          </PanelSection>
        )}
      </div>
    </div>
  );
}

interface WorkshopToolPickerProps {
  variants: PromptVariant[];
  activeId: string;
  onChange: (toolId: string) => void;
}

// Upfront, page-level tool picker. Shown at the top of the prompts column
// so participants commit to one assistant (Google AI Studio vs Microsoft
// 365 Copilot) before they start running prompts — and aren't surprised
// by a tool decision when they reach Step 5. Step 5's prompt body
// automatically follows whatever is selected here.
function WorkshopToolPicker({
  variants,
  activeId,
  onChange,
}: WorkshopToolPickerProps) {
  if (variants.length === 0) return null;
  return (
    <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-accent/5 shadow-sm overflow-hidden">
      <div className="px-4 py-2 border-b border-primary/20 bg-primary/5">
        <div className="flex items-center gap-2 min-w-0">
          <div className="rounded-md bg-primary/15 p-1 shrink-0">
            <Wrench className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
            Step 5 · Build path
          </span>
        </div>
      </div>

      <div className="px-4 py-3">
        <p className="text-xs text-card-foreground leading-relaxed mb-3 flex items-start gap-1.5">
          <MessageCircle className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
          <span>
            Paste Step 5's prompt in the <span className="font-semibold">same chat</span> as
            Steps 0–4. Pick the tool you want to produce with:
          </span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {variants.map((v) => {
            const isSelected = v.id === activeId;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onChange(v.id)}
                aria-pressed={isSelected}
                className={`group relative rounded-lg border-2 px-3 py-2.5 text-left transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border bg-card hover:border-primary/50 hover:bg-muted/30"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/40 bg-transparent group-hover:border-primary/50"
                    }`}
                  >
                    {isSelected && (
                      <Check className="h-2.5 w-2.5 text-primary-foreground" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Bot
                        className={`h-3.5 w-3.5 shrink-0 ${
                          isSelected ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <div
                        className={`text-sm font-bold leading-tight ${
                          isSelected ? "text-primary" : "text-card-foreground"
                        }`}
                      >
                        {v.title}
                      </div>
                    </div>
                    <div className="text-[11px] text-muted-foreground leading-snug">
                      {v.subtitle}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
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
