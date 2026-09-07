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

// The five prioritised challenge cards for the OP Pohjola immersion. Each
// frames a *business problem* for leadership breakout discussion — not a
// solution brief. The AI-addressability band on each card is carried through
// to the list view as a pill so the room can see at a glance where an agentic
// build has the most room to move. The internal `number` (Cn) is a stable id
// for storage and is shown only as a small chip in the list view.
const challenges: ChallengeCard[] = [
  {
    number: "C1",
    company: "OP Pohjola",
    kind: "AI addressability 20–40%",
    theme: "Enterprise Technology & Transformation Risk",
    title: "Core Systems Modernization",
    summary:
      "Juggling dual core system replacements while migrating to the cloud and scaling AI.",
    challengeStatement:
      "We are performing open-heart surgery on the bank and our insurance business at the same time. Renewing both core systems simultaneously, migrating everything to Azure, and trying to become ‘AI-first’ is an incredibly heavy lift. A single delay or integration failure in one area could jeopardize our efficiency, time-to-market, and the entire transformation’s ROI.",
    whyNow:
      "OP has committed to renewing both its banking and insurance core platforms (the latter on Guidewire) concurrently while migrating its infrastructure to Microsoft Azure. This massive concurrent load stretches execution capacity, making program delivery the single largest operational and technological risk for the group.",
    baselineMetrics: [
      "Top risk rating: rated as the #1 business friction across the organization (Severity 5, Urgency 5)",
      "Expense growth: transformation and ICT spend contributed to an increase in operating expenses — up 6% YoY in H1 2025, with the cost/income ratio elevated to 59.5% in H1 2026",
      "Concurrent programs: dual core modernization (core banking and Guidewire insurance) running in parallel with cloud migration",
      "AI addressability: estimated at 20–40%, primarily in automated test generation, developer copilot productivity and code migration support",
    ],
    audienceFit:
      "Kasimir Hirn (CIO/CTO) • Head of Transformation • Heads of Retail, Corporate & Insurance business lines",
    crossFunctionalHooks:
      "Antti Myllymäki (Chief Data Officer) • enterprise architects • Chief Risk Officer • finance & planning directors",
  },
  {
    number: "C2",
    company: "OP Pohjola",
    kind: "AI addressability 10–20%",
    theme: "Financial Strategy & Business Performance",
    title: "Revenue Diversification & Profitability",
    summary:
      "Over-reliance on Net Interest Income in a declining interest rate environment.",
    challengeStatement:
      "Our profits have been strong, but they’re built on a foundation of high interest rates that is quickly eroding. Net Interest Income is falling, and we can’t let our overall profitability fall with it. We urgently need to scale our fee, wealth, and insurance businesses to fill the gap, but are our current systems and customer advisory models agile enough to support this pivot?",
    whyNow:
      "As ECB benchmark interest rates normalize, Net Interest Income is declining sharply — down 13% YoY in 9M 2025. To maintain profitability, OP must accelerate non-NII growth, especially through the newly consolidated Wealth Management unit and non-life insurance underwriting margins.",
    baselineMetrics: [
      "NII compression: Net Interest Income fell 13% YoY in 9M 2025",
      "Operating profit impact: group operating profit declined 16% YoY in H1 2026, down to €831m",
      "Growth engines: Wealth Management assets under management exceed €114.9bn, and net commission/fee income grew 15% to €465m in H1 2026",
      "AI addressability: 10–20% via customer segmentation, advisor enablement and targeted next-best-action wealth advisory",
    ],
    audienceFit:
      "Timo Ritakallio (President & Group CEO) • Mikko Timonen (CFO) • Hanna Porkka (Head of Wealth Management) • Vesa Aho (Head of Insurance)",
    crossFunctionalHooks:
      "Corporate strategy • B2B & retail marketing • customer experience (CX) • analytics & CRM teams",
  },
  {
    number: "C3",
    company: "OP Pohjola",
    kind: "AI addressability 30–50%",
    theme: "Data Governance & AI Value Realization",
    title: "Data & AI Readiness",
    summary:
      "Enterprise data silos and maturing data governance limit the transition to agentic AI.",
    challengeStatement:
      "We’ve declared an ‘AI-first’ strategy and have over 11,000 employees using Copilot, but our core data is still fragmented across banking and insurance silos. We can’t scale high-value agentic AI for things like real-time customer decisioning or automated underwriting if the models can’t access high-quality, trustworthy data from across the entire enterprise. Our AI adoption is currently ahead of our AI value measurement.",
    whyNow:
      "Desktop AI tools drive personal productivity, but true operational redesign requires autonomous agents integrated into live banking workflows. Without clean data pipelines, semantic layers and real-time event infrastructure, OP cannot unlock high-ROI autonomous agents.",
    baselineMetrics: [
      "Adoption vs. infrastructure: over 11,000 active Microsoft Copilot users and 92% daily AI adoption, yet core data remains fragmented",
      "Data maturity scores: data quality & lineage 3.5 / 5.0; data accessibility 3.7 / 5.0; real-time / event data 3.2 / 5.0",
      "Friction rating: data quality and governance friction rated at Severity 4, Urgency 4",
      "AI addressability: 30–50% via automated data cataloging, metadata discovery and semantic API mediation",
    ],
    audienceFit:
      "Antti Myllymäki (Chief Data Officer) • Kasimir Hirn (CIO/CTO) • enterprise data architects • AI workgroup leadership",
    crossFunctionalHooks:
      "Information security (CISO) • compliance & privacy officers • risk management • line-of-business product owners",
  },
  {
    number: "C4",
    company: "OP Pohjola",
    kind: "AI addressability 10–20%",
    theme: "Operating Model & Cooperative Governance",
    title: "Standardizing for Scale",
    summary:
      "A federated cooperative structure creates friction and delays in enterprise-wide digital rollout.",
    challengeStatement:
      "Our cooperative model is our greatest customer trust asset, but with over 90 independent member cooperative banks, driving the standardization needed for true digital and AI scale is challenging. Local differences create change-management bottlenecks for central platforms and processes. We cannot become an agile, AI-driven institution if central innovation cannot be seamlessly deployed across every bank.",
    whyNow:
      "Deploying unified digital platforms, centralized Azure infrastructure and compliant AI agents requires standardized data definitions and operational workflows across all member banks. Navigating distributed consensus slows time-to-market compared to centralized commercial competitors.",
    baselineMetrics: [
      "Structure complexity: the group comprises OP Cooperative (central agency) and ~93–96 independent member cooperative banks, consolidated down from 229 in 2013",
      "Friction rating: federated governance friction rated at Severity 4, Urgency 3",
      "Operational impact: increases integration complexity and slows rollouts of standardized customer journeys",
      "AI addressability: 10–20% — primarily an organizational and change-management challenge, with AI aiding process harmonization",
    ],
    audienceFit:
      "Timo Ritakallio (Group CEO) • executive board • chairpersons and managing directors of member cooperative banks",
    crossFunctionalHooks:
      "OP Cooperative central technology teams • group HR (Hannakaisa Länsisalmi) • legal & governance • operational risk",
  },
  {
    number: "C5",
    company: "OP Pohjola",
    kind: "AI addressability 40–60%",
    theme: "Risk, Compliance & Operational Efficiency",
    title: "Managing Financial Crime & Regulatory Burden",
    summary:
      "High volumes of AML/fraud alerts and manual triage create severe operational drag and compliance exposure.",
    challengeStatement:
      "Our compliance teams are overwhelmed by high volumes of fraud and anti-money laundering alerts, where the vast majority turn out to be false positives. Manually reviewing and assembling evidence for each alert consumes massive operational bandwidth and slows down our response to genuine risks. With tightening EU regulations, this manual burden creates both escalating costs and regulatory vulnerability.",
    whyNow:
      "Regulatory enforcement has hardened with the EU Digital Operational Resilience Act (DORA) taking effect in January 2025, alongside incoming EU AMLR/AMLA directives. Automating alert triage and investigative dossier preparation is a non-negotiable step to protect margins and avoid regulatory sanctions.",
    baselineMetrics: [
      "Friction level: financial crime and AML alert burden rated at Severity 4, Urgency 4",
      "Strategic AI priority: ranked as the #1 highest-priority AI opportunity for the NEXT (6–18 month) transformation horizon",
      "High AI addressability: 40–60% by deploying agentic workflows for automated entity resolution, transaction pattern synthesis and SAR draft generation",
      "Regulatory clock: DORA in force since January 2025, with EU AMLR/AMLA obligations following",
    ],
    audienceFit:
      "Markku Pehkonen (Chief Risk Officer) • Head of Financial Crime Prevention (AML/AFC) • Head of Compliance Operations",
    crossFunctionalHooks:
      "Chief Information Security Officer (CISO) • general counsel • internal audit • IT core banking platform leads",
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
          The five prioritised challenge cards for the OP Pohjola immersion,
          ordered by priority. Each is framed as a{" "}
          <strong className="text-foreground">business problem</strong> for
          leadership breakout discussion — not a solution brief. Click any card
          on the left to view its full context, then choose one to carry into
          the prompts page.
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
              {card.company}
            </span>
            {card.kind && (
              <span className="inline-block rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {card.kind}
              </span>
            )}
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
        {/* Company · theme + Title. The company is constant across the deck,
            so the theme is what actually distinguishes one card from another
            here — both are shown rather than one replacing the other. */}
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
          {card.company} <span className="text-muted-foreground">·</span>{" "}
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

        {/* Boundaries the room designs within — from the report's own card. */}
        {card.constraints && card.constraints.length > 0 && (
          <div className="mt-6">
            <Section label="Constraints the room must respect">
              <ul className="space-y-1.5">
                {card.constraints.map((c, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                  >
                    <span className="text-accent mt-0.5 shrink-0">▸</span> {c}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        )}

        {/* What one session can realistically produce from this card. */}
        {card.whyGoodBuild && (
          <div className="rounded-lg border border-primary/25 bg-primary/[0.04] px-4 py-3">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1.5">
              Why this is a good build
            </h3>
            <p className="text-sm text-card-foreground leading-relaxed">
              {card.whyGoodBuild}
            </p>
          </div>
        )}
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
