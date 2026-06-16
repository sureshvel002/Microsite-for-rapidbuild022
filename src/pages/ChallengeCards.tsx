import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  X,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type ChallengeCard,
  formatChallengeText,
  useSelectedChallenge,
} from "@/lib/challengeStorage";

// Cards from the Boehringer Ingelheim AI Immersion Day discovery brief,
// framed as business problems for mixed leadership / HR breakout discussion
// (not solution briefs). Ordered by impact priority — highest-impact cards
// first. The internal `number` (Cxx) is kept as a stable id for storage
// but is not surfaced in the UI per current design.
const challenges: ChallengeCard[] = [
  {
    number: "C1",
    company: "Boehringer Ingelheim",
    theme: "Hiring & Recruitment / Launch & Scientific Talent",
    title: "Critical launch roles are sourced too slowly to hit the launch window",
    summary:
      "Launch-critical roles in commercial, medical and computational science take too long to fill, putting peak-share at risk.",
    challengeStatement:
      "When a launch or a new platform lands, we're given a date, not a runway. The roles we need most — launch commercial, medical, oncology, computational science — are the hardest to fill, and by the time we've sourced and screened, the window has moved. We're always recruiting against the clock, and the clock keeps speeding up.",
    whyNow:
      "Hernexeos (US Aug 2025) and Jascayd (approved Oct/Dec 2025) are launching now, and survodutide's Phase III obesity readout (Apr 2026) points to a category-defining launch. The $20bn US build adds sustained demand. Launch peak-share is won or lost in the first months — exactly when hard-to-fill roles are still open.",
    baselineMetrics: [
      "Two live launches (Hernexeos, Jascayd) + one late-stage obesity asset (survodutide, ~16.6% mean weight loss, Ph III)",
      "$20bn US investment plan 2025–2030 (sustained hiring demand)",
      "R&D \u20AC6.4bn / 22.9% of sales — a deep, specialist hiring base",
      "Operational baseline not public: time-to-fill, req volumes, offer-accept, cost-per-hire — validate live",
    ],
    audienceFit:
      "Head of Talent Acquisition (launch & scientific); HRBP Human Pharma; TA Operations Lead",
    crossFunctionalHooks:
      "Launch Excellence Lead; Medical Affairs; Innovation Unit; Employer Brand; AI Governance Counsel",
  },
  {
    number: "C2",
    company: "Boehringer Ingelheim",
    theme: "Talent Development / Launch Readiness",
    title: "Launch readiness depends on capability we must build faster than we can hire",
    summary:
      "Field, medical and access teams can't be made launch-ready at launch speed using traditional content and classroom methods.",
    challengeStatement:
      "A launch lives or dies on whether the field, medical and access teams are ready on day one. Building that readiness the old way — classroom, slides, slow content — can't keep up with the launch calendar, and every market needs it slightly differently. We're always one cycle behind the launch we're training for.",
    whyNow:
      "Live launches (Hernexeos, Jascayd) and a probable obesity/MASH launch (survodutide) create back-to-back readiness demand across markets. The gap is not 'do we have academies' — it's whether content can be generated and localised at launch speed.",
    baselineMetrics: [
      "Two live launches + survodutide late-stage; multi-market rollout",
      "Existing Functional-Specific Academies and Global Leadership Development Programs",
      "Operational baseline not public: completion, time-to-competency, field-readiness scores — validate live",
      "Academies exist; no public evidence of AI-accelerated, launch-speed content generation/localisation — that speed is the gap",
    ],
    audienceFit:
      "Head of Commercial / Medical Learning; Launch Excellence Lead; COE Learning",
    crossFunctionalHooks:
      "Medical Affairs (MLR sign-off); Market access; Local affiliate L&D; Regulatory",
  },
  {
    number: "C3",
    company: "Boehringer Ingelheim",
    theme: "HR Shared Services / Employee & Manager Self-Service",
    title: "Employees and managers in 130+ markets wait too long for routine HR answers",
    summary:
      "Repeat HR queries in a dozen languages across time zones swamp GBS agents and crowd out complex cases.",
    challengeStatement:
      "Most of what people ask us, we've answered a thousand times — leave, pay, policy, 'where do I go for X'. But it arrives in a dozen languages across a dozen time zones, and it sits in a queue. People lose time, our agents drown in repeat tickets, and the simple stuff crowds out the cases that actually need a human.",
    whyNow:
      "GBS already runs hire-to-retire from four hubs, and the Feb 2026 IT/GBS board seat sharpens the mandate to automate Tier-0. GenAI makes confident, source-grounded answers viable where legacy portals don't.",
    baselineMetrics: [
      "GBS: ~2,000 staff across 4 centres (Manila, Buenos Aires, Germany, Wroclaw) running 'hire-to-retire'",
      "130+ markets — multilingual, multi-policy demand",
      "Harsha Deshmukh — IT & GBS board responsibility from 1 Feb 2026",
      "Operational baseline not public: ticket volumes, deflection, handle times — validate live",
    ],
    audienceFit:
      "Head of HR Services / HR@GBS; GBS Service-Line Owner",
    crossFunctionalHooks:
      "IT & GBS (Deshmukh org); Data Privacy; COE Policy; local HR",
  },
  {
    number: "C4",
    company: "Boehringer Ingelheim",
    theme: "Hiring & Recruitment / Responsible AI Governance",
    title: "Hiring and talent-decision AI must be provably fair, transparent and human-overseen",
    summary:
      "EU AI Act makes recruitment AI high-risk from Aug 2026 — BI needs an assurance layer it can stand behind to regulators and works councils.",
    challengeStatement:
      "Anything we build that touches who gets hired, promoted or moved is high-risk by law — and high-stakes for trust. We can't bolt governance on afterwards, but we also can't let 'it might be risky' freeze every useful tool. We need a way to deploy AI in talent decisions we can stand behind to a regulator, a works council and a candidate.",
    whyNow:
      "EU AI Act Annex III makes recruitment and worker-management AI high-risk; obligations apply from 2 Aug 2026, with fines up to \u20AC15m or 3% of global turnover. German co-determination adds a works-council dimension. This is buildable now and underpins every other hiring-related card.",
    baselineMetrics: [
      "EU AI Act (Reg. 2024/1689) Annex III — employment / worker-management = high-risk; obligations from 2 Aug 2026",
      "Penalties up to \u20AC15,000,000 or 3% of worldwide annual turnover (Art. 99(4))",
      "German Betriebsrat co-determination + GDPR Art. 22 constraints",
      "Operational baseline not public: BI's current HR-AI inventory and works-council agreements — validate live",
      "No public evidence of an HR-specific AI assurance layer — likely a real gap given the Aug 2026 deadline",
    ],
    audienceFit:
      "CHRO office + AI Governance / Data Privacy Counsel; People Analytics; Employee Relations / Co-determination Lead",
    crossFunctionalHooks:
      "Legal & Compliance; IT & GBS; Data Governance; Works Council liaison",
  },
  {
    number: "C5",
    company: "Boehringer Ingelheim",
    theme: "Talent Development / Skills Intelligence",
    title: "We can't see the skills we already have, so we over-hire and under-deploy",
    summary:
      "Without an enterprise skills view, BI defaults to costly external hiring while internal talent stays invisible.",
    challengeStatement:
      "When a new priority lands, our first instinct is to hire — because we genuinely can't see who inside already has the adjacent skills. People who could grow into launch or AI-critical roles stay invisible, and we pay twice: external hiring cost, and disengaged internal talent who weren't asked.",
    whyNow:
      "Simultaneous launch + AI + US-build demand makes internal redeployment economically essential. Without a skills view, the default is always external hiring — the slowest, costliest option for scarce roles.",
    baselineMetrics: [
      "~54,000+ employees across 130+ markets — a large latent skills base",
      "COE owns talent & succession and people development (natural home)",
      "Growth-engine roles (launch, AI, manufacturing) all need adjacent skills",
      "Operational baseline not public: internal-fill rate, skills coverage, mobility rate — validate live",
      "No public evidence of an enterprise skills graph at BI — confirm in discovery",
    ],
    audienceFit:
      "Head of Talent Management / Strategic Workforce Planning; People Analytics",
    crossFunctionalHooks:
      "HRBP community; IT & GBS; Data Privacy (employee-data sensitivity); function heads",
  },
  {
    number: "C6",
    company: "Boehringer Ingelheim",
    theme: "Talent Development / Manufacturing Capability",
    title: "The US manufacturing build needs GMP & Annex-1 capability faster than the labour market supplies it",
    summary:
      "BI can pour concrete faster than it can build the qualified, GMP-ready workforce to fill new US facilities.",
    challengeStatement:
      "We're committing billions to US manufacturing, but the people who can run modern sterile and biologics operations to current standards are scarce and slow to develop. We can pour concrete faster than we can build the qualified, GMP-ready workforce to fill the building.",
    whyNow:
      "The $20bn US plan includes manufacturing capex, and EU GMP Annex 1 (in force Aug 2023) raises the capability bar globally. Qualified operators and QA staff must be ready as capacity comes online — qualification can't be rushed.",
    baselineMetrics: [
      "$20bn US plan 2025–2030 (manufacturing capex component)",
      "EU GMP Annex 1 contamination-control expectations",
      "Global manufacturing & biologics (BioXcellence) network",
      "Operational baseline not public: site headcount, qualification timelines, competency gaps — validate live",
      "General manufacturing training exists; no public evidence of AI-accelerated qualification for the new US build",
    ],
    audienceFit:
      "Head of Manufacturing / Operations L&D; Site HR; Quality Training Lead",
    crossFunctionalHooks:
      "Operations / Product Supply; Quality; Regulatory; IT & GBS",
  },
];

const LG_BREAKPOINT = 1024;

const ChallengeCards = () => {
  const navigate = useNavigate();
  const [activeChallenge, selectChallenge, clearChallenge] =
    useSelectedChallenge();

  // Right-pane preview (desktop split view). Defaults to the active
  // challenge if one is selected, otherwise the first card.
  const [viewing, setViewing] = useState<ChallengeCard>(
    () => activeChallenge ?? challenges[0]
  );
  // Modal popup is the mobile fallback for the same content.
  const [mobileOpen, setMobileOpen] = useState<ChallengeCard | null>(null);
  const [copied, setCopied] = useState(false);
  const [justSavedNumber, setJustSavedNumber] = useState<string | null>(null);

  const handleListItemClick = (card: ChallengeCard) => {
    setViewing(card);
    if (
      typeof window !== "undefined" &&
      window.innerWidth < LG_BREAKPOINT
    ) {
      setMobileOpen(card);
      setCopied(false);
    }
  };

  const handleUseChallenge = (card: ChallengeCard) => {
    selectChallenge(card);
    setJustSavedNumber(card.number);
    setTimeout(() => setJustSavedNumber(null), 1800);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopy = async (card: ChallengeCard) => {
    await navigator.clipboard.writeText(formatChallengeText(card));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen lg:h-screen bg-background flex flex-col lg:overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-2 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold font-display text-card-foreground">
            Challenge Cards
          </h1>

          {activeChallenge && (
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-muted-foreground max-w-[280px]">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                <span className="truncate">
                  Selected:{" "}
                  <span className="font-semibold text-foreground">
                    {activeChallenge.title}
                  </span>
                </span>
              </span>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs"
                onClick={clearChallenge}
              >
                Clear
              </Button>
              <Button
                size="sm"
                className="h-7 text-xs"
                onClick={() => navigate("/prompts")}
              >
                Go to Prompts
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Intro description — full-width, tighter top spacing */}
      <div className="px-6 pt-3 pb-2 max-w-7xl mx-auto w-full text-center shrink-0">
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Extracted and structured from the discovery brief. These cards are
          framed as{" "}
          <strong className="text-foreground">business problems</strong> for
          mixed leadership / HR breakout discussions — not solution briefs.
          Click any card on the left to view its full context, then choose one
          to carry into the prompts page.
        </p>
      </div>

      {/* Split view — list + detail */}
      <div className="flex-1 px-4 sm:px-6 pb-6 max-w-7xl mx-auto w-full lg:min-h-0 lg:overflow-hidden mt-3">
        <div className="h-full lg:grid lg:grid-cols-12 lg:gap-5">
          {/* Left: scrollable list */}
          <aside className="lg:col-span-5 lg:h-full lg:overflow-y-auto lg:pr-1 space-y-2.5 mb-4 lg:mb-0">
            <div className="hidden lg:flex items-center justify-between sticky top-0 bg-background py-2 z-10 border-b border-border mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {challenges.length} Challenges
              </span>
              <span className="text-[10px] text-muted-foreground">
                Click to preview · Use to anchor prompts
              </span>
            </div>
            {challenges.map((card) => {
              const isActive = activeChallenge?.number === card.number;
              const isViewing = viewing.number === card.number;
              return (
                <ListItem
                  key={card.number}
                  card={card}
                  isActive={isActive}
                  isViewing={isViewing}
                  onClick={() => handleListItemClick(card)}
                />
              );
            })}
          </aside>

          {/* Right: sticky detail pane (desktop only) */}
          <section className="hidden lg:block lg:col-span-7 lg:h-full lg:overflow-y-auto rounded-xl border border-border bg-card shadow-sm">
            <DetailContent
              card={viewing}
              activeChallenge={activeChallenge}
              justSavedNumber={justSavedNumber}
              copied={copied}
              onCopy={() => handleCopy(viewing)}
              onUse={() => handleUseChallenge(viewing)}
              onClear={() => {
                clearChallenge();
                setJustSavedNumber(null);
              }}
              onGoToPrompts={() => navigate("/prompts")}
            />
          </section>
        </div>
      </div>

      {/* Mobile-only modal popup (same content as the right pane) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 lg:hidden"
          onClick={() => setMobileOpen(null)}
        >
          <div
            className="relative bg-card rounded-2xl border border-border shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMobileOpen(null)}
              className="absolute top-4 right-4 z-30 rounded-full bg-card p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm"
            >
              <X className="h-5 w-5" />
            </button>
            <DetailContent
              card={mobileOpen}
              activeChallenge={activeChallenge}
              justSavedNumber={justSavedNumber}
              copied={copied}
              onCopy={() => handleCopy(mobileOpen)}
              onUse={() => handleUseChallenge(mobileOpen)}
              onClear={() => {
                clearChallenge();
                setJustSavedNumber(null);
              }}
              onGoToPrompts={() => navigate("/prompts")}
              extraTopPadding
            />
          </div>
        </div>
      )}
    </div>
  );
};

// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —
// Subcomponents
// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —

interface ListItemProps {
  card: ChallengeCard;
  isActive: boolean;
  isViewing: boolean;
  onClick: () => void;
}

function ListItem({ card, isActive, isViewing, onClick }: ListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-xl border bg-card pl-5 pr-4 py-4 text-left transition-all ${
        isActive
          ? "border-green-500/50 bg-green-50/40 shadow-md ring-1 ring-green-500/20"
          : isViewing
          ? "border-primary bg-primary/[0.04] shadow-md"
          : "border-border hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
      }`}
    >
      {/* Left vertical accent stripe — green when selected, primary when viewing, faint on hover */}
      <div
        className={`pointer-events-none absolute left-0 top-0 h-full w-1 transition-all ${
          isActive
            ? "bg-gradient-to-b from-green-500 to-emerald-600"
            : isViewing
            ? "bg-gradient-to-b from-primary to-accent"
            : "bg-transparent group-hover:bg-primary/30"
        }`}
      />

      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {/* Header row: card-number tag + full Selected chip (when active) + theme pill.
              The tiny mono number chip is shown ONLY here in the list view —
              it's intentionally not included in the Widen-step prompt
              injection or the copy-to-clipboard text. */}
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            <span
              className={`inline-flex items-center justify-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold font-mono leading-none ${
                isActive
                  ? "bg-green-50 text-green-700 border-green-200"
                  : isViewing
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-muted text-muted-foreground border-border"
              }`}
              title={`Challenge ${card.number}`}
            >
              {card.number}
            </span>
            {isActive && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-600 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                <CheckCircle2 className="h-3 w-3 shrink-0" />
                Selected
              </span>
            )}
            <span
              className={`inline-block rounded-full text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                isActive
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {card.theme}
            </span>
          </div>
          <h3
            className={`text-sm font-semibold font-display leading-snug mb-1.5 transition-colors ${
              isActive
                ? "text-green-900"
                : isViewing
                ? "text-primary"
                : "text-card-foreground group-hover:text-primary"
            }`}
          >
            {card.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {card.summary}
          </p>
        </div>

        <ChevronRight
          className={`h-4 w-4 shrink-0 mt-1 transition-all ${
            isActive
              ? "text-green-600 translate-x-0.5"
              : isViewing
              ? "text-primary translate-x-0.5"
              : "text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5"
          }`}
        />
      </div>
    </button>
  );
}

interface DetailContentProps {
  card: ChallengeCard;
  activeChallenge: ChallengeCard | null;
  justSavedNumber: string | null;
  copied: boolean;
  onCopy: () => void;
  onUse: () => void;
  onClear: () => void;
  onGoToPrompts: () => void;
  /**
   * When rendered inside the mobile modal, the close button is positioned
   * absolutely at top-right of the modal scroll container. The sticky
   * action strip needs extra right padding so its buttons don't sit under
   * the close button.
   */
  extraTopPadding?: boolean;
}

function DetailContent({
  card,
  activeChallenge,
  justSavedNumber,
  copied,
  onCopy,
  onUse,
  onClear,
  onGoToPrompts,
  extraTopPadding,
}: DetailContentProps) {
  const isActive = activeChallenge?.number === card.number;
  return (
    <div className="flex flex-col">
      {/* Sticky top action strip — chip + primary action + copy.
          Stays pinned at top of the scroll container as the body scrolls. */}
      <div
        className={`sticky top-0 z-10 bg-card/95 supports-[backdrop-filter]:bg-card/85 backdrop-blur border-b border-border px-6 sm:px-8 py-4 ${
          extraTopPadding ? "pr-14" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="min-w-0">
            {isActive ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 text-green-700 px-3 py-1 text-sm font-bold border border-green-200">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                This challenge is currently selected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-bold border border-primary/20">
                <Sparkles className="h-4 w-4 shrink-0" />
                Pick this challenge to anchor your prompts
              </span>
            )}
          </div>
          <div className="flex gap-2 items-center shrink-0">
            {isActive ? (
              <>
                <Button variant="outline" size="sm" onClick={onClear}>
                  Clear
                </Button>
                <Button size="sm" onClick={onGoToPrompts}>
                  Go to Prompts
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={onUse}
                className={
                  justSavedNumber === card.number
                    ? "bg-green-600 hover:bg-green-600 text-white"
                    : ""
                }
              >
                {justSavedNumber === card.number ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1" /> Saved
                  </>
                ) : (
                  <>Use this Challenge</>
                )}
              </Button>
            )}
            <button
              onClick={onCopy}
              className="rounded-md p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              title="Copy full challenge"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable body content */}
      <div className="px-6 sm:px-8 py-6 sm:py-8">
        {/* Theme + Title */}
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
          {card.theme}
        </p>
        <h2 className="text-2xl font-bold font-display text-card-foreground leading-snug mb-5">
          {card.title}
        </h2>

        {/* Highlighted challenge statement */}
        <div className="mb-6 rounded-lg border-l-4 border-accent bg-accent/5 px-4 py-3">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1.5">
            Challenge statement
          </h3>
          <p className="text-base text-card-foreground leading-relaxed italic">
            &ldquo;{card.challengeStatement}&rdquo;
          </p>
        </div>

        <Section label="Why now">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {card.whyNow}
          </p>
        </Section>

        <Section label="Baseline metrics / evidence">
          <ul className="space-y-1.5">
            {card.baselineMetrics.map((m, i) => (
              <li
                key={i}
                className="text-sm text-muted-foreground leading-relaxed flex gap-2"
              >
                <span className="text-primary mt-0.5 shrink-0">●</span> {m}
              </li>
            ))}
          </ul>
        </Section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1.5">
              Audience fit
            </h3>
            <p className="text-xs text-card-foreground leading-relaxed">
              {card.audienceFit}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1.5">
              Cross-functional hooks
            </h3>
            <p className="text-xs text-card-foreground leading-relaxed">
              {card.crossFunctionalHooks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  label,
  children,
  last,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "mb-5"}>
      <h3 className="text-xs font-bold uppercase tracking-wide text-primary mb-2">
        {label}
      </h3>
      {children}
    </div>
  );
}

export default ChallengeCards;
