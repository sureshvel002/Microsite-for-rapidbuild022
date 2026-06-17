import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
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

// Cards from the TCS Belgium AI Immersion executive briefing,
// framed as business problems for domain-advisor & consultant breakout
// discussion (not solution briefs). Two cards per account, 12 total.
// The internal `number` (Cxx) is kept as a stable id for storage
// but is not surfaced in the UI per current design.
const challenges: ChallengeCard[] = [
  // ── BNP Paribas Fortis ──────────────────────────────────────────
  {
    number: "C1",
    company: "BNP Paribas Fortis",
    theme: "Finance \u2022 Risk \u2022 Compliance \u2022 Reporting & Control-Evidence Generation",
    title: "Cut manual evidence out of regulatory reporting",
    summary:
      "Analysts spend more time assembling and reconciling evidence than reasoning about risk, while requirements expand faster than headcount.",
    challengeStatement:
      "Every reporting and DORA cycle, my analysts spend more time assembling and reconciling evidence than reasoning about risk. The bank wants strict cost discipline while taxes and cost of risk eat our margin \u2014 yet control evidence is still largely hand-built, because requirements expand faster than the headcount we\u2019re allowed to add.",
    whyNow:
      "DORA applies across the EU financial sector from 17 Jan 2025, raising the bar on ICT-risk evidence, resilience testing and incident handling \u2014 while a EUR 124m banking-tax rise forces cost discipline now.",
    baselineMetrics: [
      "DORA applicable from 17 Jan 2025 \u2014 auditability, control observability, third-party oversight [DORA]",
      "EUR 124m banking-tax increase; EUR 251m rise in cost of risk [Annual Report 2025]",
      "Validate live: analyst-hours per report, manual DORA artefacts, rework volume",
      "Status: no public copilot deployment \u2014 confirm; group AI investment rising",
    ],
    audienceFit:
      "DORA programme lead \u2022 Chief Risk Officer \u2022 Head of Regulatory Reporting / Finance",
    crossFunctionalHooks:
      "CISO / cyber \u2022 internal audit \u2022 group compliance \u2022 IT & data",
  },
  {
    number: "C2",
    company: "BNP Paribas Fortis",
    theme: "Bancassurance Operations \u2022 Policy Servicing, Claims Intake, Customer Comms",
    title: "Industrialise insurance servicing, not just the AG contract",
    summary:
      "A 15-year partnership says to digitalise and industrialise insurance \u2014 but policy changes, claims intake and customer comms are still touched by hand.",
    challengeStatement:
      "We\u2019ve signed a 15-year partnership that explicitly tells us to digitalise and industrialise insurance \u2014 but policy changes, claims intake and customer comms are still touched by hand, and bank-to-insurer handoffs break. The contract changed; the workflow hasn\u2019t.",
    whyNow:
      "Dec 2025 AG Insurance stake sale (EUR 1.9bn) with a 15-year distribution renewal framed to \u201Cdigitalise and industrialise\u201D; bpost bank integration added ~1m customers from Jan 2024.",
    baselineMetrics: [
      "AG 25% stake sold for EUR 1.9bn; 15-yr distribution renewal, Dec 2025 [BNPF Dec 2025]",
      "bpost bank added ~1m customers from Jan 2024 [Briefing]",
      "Validate live: policy-change time, claims volume, manual-touch & handoff-failure rate",
      "Status: contractual reset done; workflow redesign unclear \u2014 scope to the real gap",
    ],
    audienceFit:
      "Bancassurance leadership (AG interface) \u2022 Belgium COO / Head of Transformation",
    crossFunctionalHooks:
      "AG Insurance counterparts \u2022 customer ops \u2022 IT / integration \u2022 compliance",
  },
  // ── bpost / bnode ────────────────────────────────────────────────
  {
    number: "C3",
    company: "bpost / bnode",
    theme: "Operations \u2022 Warehouse, Linehaul & Field-Supervisor Knowledge",
    title: "Stop execution variance leaking margin across the network",
    summary:
      "Fusing Staci, Active Ants and Radial Europe into one group, but each site runs on its own SOPs and tribal knowledge \u2014 that variance is where margin disappears.",
    challengeStatement:
      "We\u2019re fusing Staci, Active Ants and Radial Europe into one group, but each site runs on its own SOPs and tribal knowledge. People take too long to reach competence, and the same problem gets solved five different ways \u2014 that variance is where our margin disappears.",
    whyNow:
      "#Reshape2029 names \u201Cdeliver operational efficiencies\u201D and the Staci / Active Ants / Radial Europe integration as Must-Wins; synergy capture is now a core execution risk.",
    baselineMetrics: [
      "#Reshape2029: >EUR 5.0bn revenue & adj. EBIT >EUR 275m by 2027 [CMD Jun 2025]",
      "33,532 employees end-2025; ~26,628 in Belgium [bnode AR 2025 / bpost AR 2024]",
      "Validate live: time-to-competence, SOP-lookup time, exception / variance by site",
      "Status: no public postal knowledge copilot \u2014 confirm",
    ],
    audienceFit:
      "BeNe Last-Mile ops leader \u2022 3PL Europe leader \u2022 depot / warehouse managers",
    crossFunctionalHooks:
      "transformation office \u2022 HR / training \u2022 CIO/CTO \u2022 integration leads",
  },
  {
    number: "C4",
    company: "bpost / bnode",
    theme: "Network Orchestration \u2022 Route, Round & Workload Planning",
    title: "Plan rounds and labour for a parcel-driven network",
    summary:
      "Rounds and rosters were built for shrinking mail while parcels grow and flows mix \u2014 too many decisions are still manual.",
    challengeStatement:
      "Our rounds and rosters were built for a shrinking mail world while parcels grow and flows mix. Too many decisions are still manual, and we absorb overtime and absenteeism we should be able to anticipate \u2014 with a fixed cost base and a workforce we can\u2019t afford to mishandle.",
    whyNow:
      "Belgian postal market grew 2.7% to EUR 3.724bn in 2024, parcel-led, while mail declines structurally; 2025 is the first full year without Press-concession income.",
    baselineMetrics: [
      "Belgian postal market +2.7% to EUR 3.724bn, parcel / express-led [BIPT 2025]",
      "Belgian ops loss-making Q3 2024; fixed cost base threatens profit [bpost AR 2024]",
      "Validate live: % manual network decisions, overtime / absenteeism, round productivity",
      "Flag: workforce decisions politically sensitive \u2014 set the off-limits boundary first",
    ],
    audienceFit:
      "BeNe Last-Mile ops leader \u2022 network planning \u2022 HR / industrial relations",
    crossFunctionalHooks:
      "social partners / unions \u2022 transformation office \u2022 data \u2022 CIO",
  },
  // ── Proximus ─────────────────────────────────────────────────────
  {
    number: "C5",
    company: "Proximus",
    theme: "Network / Fiber \u2022 Capex Economics and Take-Up",
    title: "Turn homes-passed into homes-monetised faster",
    summary:
      "Heavy fiber capex with a halved dividend, but the gap between a home passed and a home billing is too long and too opaque.",
    challengeStatement:
      "We\u2019re pouring capital into fiber while the dividend was cut to fund it, but the gap between a home passed and a home connected and billing is too long and too opaque. Permits, work orders, contractor risk and take-up live in different places \u2014 so we can\u2019t see where rollout stalls.",
    whyNow:
      "~42% fiber coverage at end-2025 with heavy ongoing capex; full Unifiber ownership agreed May 2026 (raising spend); dividend halved to preserve flexibility for fiber.",
    baselineMetrics: [
      "~42% fiber coverage; 89.5% indoor 5G end-2025 [Proximus AR 2025]",
      "CAPEX EUR 1.249bn; adjusted FCF EUR 130m (2025) [Proximus AR 2025]",
      "Validate live: permit cycle time, passed->connected conversion, contractor delay",
      "Status: no public rollout / take-up cockpit \u2014 confirm",
    ],
    audienceFit:
      "Network / fiber leadership \u2022 CTO \u2022 fiber programme lead",
    crossFunctionalHooks:
      "Proximus Ada (AI governance) \u2022 finance / capex \u2022 field ops \u2022 data",
  },
  {
    number: "C6",
    company: "Proximus",
    theme: "Customer Operations \u2022 Care, Retention & Next-Best-Offer",
    title: "Defend churn and offer timing in a post-DIGI market",
    summary:
      "A new low-cost entrant has reset price expectations; care agents absorb the pressure with too little context to retain or upsell.",
    challengeStatement:
      "A new low-cost entrant has reset price expectations across our multi-brand stack, and care agents absorb the pressure with too little context to retain or upsell in the moment. We\u2019ve committed publicly to AI-led cost cuts \u2014 so adding headcount isn\u2019t the answer.",
    whyNow:
      "DIGI\u2019s end-2024 entry intensified Belgian mobile competition; Proximus has publicly committed to cutting 1,200 jobs by 2030 via AI-driven efficiency, and halved the dividend.",
    baselineMetrics: [
      "DIGI entry end-2024 increased mobile competition [BIPT 2025]",
      "1,200 jobs to be cut by 2030 via AI efficiency; dividend halved [Reuters Feb 2026]",
      "Validate live: churn by brand, care AHT / cost-per-contact, offer conversion",
      "Status: Jan 2025 Microsoft deal + Proximus Ada may give a landing zone \u2014 verify",
    ],
    audienceFit:
      "Customer-operations leadership \u2022 multi-brand commercial \u2022 care leadership",
    crossFunctionalHooks:
      "Proximus Ada \u2022 HR / transformation \u2022 data \u2022 compliance (AI Act transparency)",
  },
  // ── Bekaert ──────────────────────────────────────────────────────
  {
    number: "C7",
    company: "Bekaert",
    theme: "Manufacturing Operations \u2022 Quality, Scrap, Throughput & Energy",
    title: "Make a flagship plant\u2019s economics improve fast enough",
    summary:
      "Margin depends on what\u2019s clawed back inside the plant \u2014 scrap, quality, throughput, energy \u2014 but too much optimisation is still manual and reactive.",
    challengeStatement:
      "We\u2019re fighting for volumes in weak markets, so margin now depends on what we claw back inside the plant \u2014 scrap, quality, throughput, energy. The restructuring savings are real, but too much day-to-day optimisation is still manual and reactive.",
    whyNow:
      "FY2025 performance was supported by cost management and restructuring; tariffs and trade tensions undermined demand \u2014 the signal is disciplined performance improvement, not experimentation.",
    baselineMetrics: [
      "~19,000 employees; EUR 3.71bn consolidated revenue (2025) [Bekaert AR 2025]",
      "FY2025 supported by cost mgmt & restructuring; EUR 200m buyback [FY2025]",
      "Validate live: scrap rate, OEE / throughput, energy intensity, OT/IT data maturity",
      "Status: no public AI platform \u2014 scope to one flagship plant with cleanest data",
    ],
    audienceFit:
      "Plant / operations director \u2022 manufacturing-excellence lead \u2022 BU ops lead",
    crossFunctionalHooks:
      "OT/IT engineering \u2022 quality \u2022 energy / sustainability \u2022 data",
  },
  {
    number: "C8",
    company: "Bekaert",
    theme: "Commercial Excellence \u2022 Pricing & Quotation",
    title: "Protect margin and hit-rate in regional quoting",
    summary:
      "In soft markets every quote is a fight, and regional teams price under pressure with little visibility into margin leakage or win rate.",
    challengeStatement:
      "In soft markets every quote is a fight, and regional teams price under pressure with little visibility into where we leak margin or lose hit-rate. Quoting is slow and inconsistent across lines, so we win the wrong deals and miss the right ones.",
    whyNow:
      "Tariffs and trade tensions undermined demand; the CEO says teams are \u201Cfighting for volumes\u201D; business units are being made more autonomous \u2014 discipline must live in the workflow.",
    baselineMetrics: [
      "Tariffs / trade tensions undermined demand across key markets [AR 2025]",
      "\u201Cfighting for volumes in challenging markets\u201D \u2014 CEO, H1 2025 [Bekaert H1 2025]",
      "Validate live: quote turnaround, win rate, margin leakage by materials line",
      "Status: no public quote / margin copilot \u2014 scope to one materials line",
    ],
    audienceFit:
      "BU commercial leader \u2022 regional sales leadership \u2022 pricing lead",
    crossFunctionalHooks:
      "finance \u2022 product / engineering \u2022 data \u2022 CRM",
  },
  // ── Colruyt Group ────────────────────────────────────────────────
  {
    number: "C9",
    company: "Colruyt Group",
    theme: "Supply Chain \u2022 Fresh Demand Forecasting & Markdown / Waste",
    title: "Cut fresh waste without breaking the lowest-price promise",
    summary:
      "Committed to the lowest price so margin must come from running tighter \u2014 fresh is where it slips most, between forecast misses, markdowns and spoilage.",
    challengeStatement:
      "We\u2019re committed to the lowest price, so margin has to come from running tighter \u2014 and fresh is where it slips most, between forecast misses, markdowns and spoilage. With food inflation low and competition harder, the growth cushion is gone and gross-margin drag is worse than expected.",
    whyNow:
      "May 2025 profit warning on stronger competition and lower-than-expected food inflation; market share slipped to 29.0% in FY2024/25 from 29.3%; margin recovery is the stated priority.",
    baselineMetrics: [
      "Profit warning May 2025: competition + lower food inflation [Reuters]",
      "Belgian market share 29.0% (from 29.3%) FY2024/25 [Colruyt FY2024/25]",
      "Validate live: fresh waste %, markdown rate, forecast accuracy by category",
      "Status: automation heritage but no public fresh-AI deployment \u2014 confirm",
    ],
    audienceFit:
      "Supply-chain leadership \u2022 fresh / category merchandising \u2022 store operations",
    crossFunctionalHooks:
      "data / analytics \u2022 replenishment \u2022 finance \u2022 banner operations",
  },
  {
    number: "C10",
    company: "Colruyt Group",
    theme: "Store & DC Operations \u2022 Labour Productivity & Exception Handling",
    title: "Lift store and DC productivity against sticky wage costs",
    summary:
      "Belgian wage indexation keeps pushing labour costs up, and Comarkt consolidation adds to the base \u2014 yet shelf gaps and exceptions are still fixed by hand.",
    challengeStatement:
      "Belgian wage indexation keeps pushing labour costs up automatically, and Comarkt consolidation adds to the base \u2014 yet shelf gaps and exceptions are still fixed by hand and tribal knowledge. We must get more productive in stores and DCs without hurting the experience that keeps customers loyal.",
    whyNow:
      "FY2024/25 operating costs rose mainly from Comarkt consolidation and higher personnel costs driven by Belgium\u2019s automatic wage indexation; margins compress unless offset by productivity.",
    baselineMetrics: [
      "Operating costs up: Comarkt consolidation + wage indexation [FY2024/25]",
      "782 own + 1,006 affiliated / franchised stores (31 Mar 2025) [Key figures 2025]",
      "Validate live: shelf-gap rate, exception-handling time, replenishment accuracy",
      "Status: automation heritage; no public store / DC copilot \u2014 confirm",
    ],
    audienceFit:
      "Store-operations leadership \u2022 DC / logistics \u2022 workforce planning",
    crossFunctionalHooks:
      "HR \u2022 data \u2022 IT \u2022 banner management",
  },
  // ── Euroclear ────────────────────────────────────────────────────
  {
    number: "C11",
    company: "Euroclear",
    theme: "Legal & Regulatory \u2022 Sanctions Intelligence (Controlled, Non-Decisioning)",
    title: "Relieve the relentless sanctions and legal research load",
    summary:
      "Russian-assets situation is a permanent draw on legal and operations capacity \u2014 repetitive evidence retrieval, claims tracking and policy updates that never stop.",
    challengeStatement:
      "The Russian-assets situation is a permanent draw on legal and operations capacity \u2014 repetitive evidence retrieval, claims tracking and policy updates that never stop. Every hour reconstructing the same research is an hour not spent on growth or modernisation.",
    whyNow:
      "Ongoing Russian sanctioned-assets updates (latest May 2026) with sustained litigation and retaliation exposure; this is now a persistent management burden, not a side note.",
    baselineMetrics: [
      "Underlying net profit ~EUR 1.2bn (2025) [Euroclear 2025 results]",
      "Russian-assets issue active; litigation / seizure exposure [Euroclear May 2026]",
      "Validate live: legal / analyst hours on sanctions, shared legal-ops data repositories",
      "Status: must be a controlled internal assistant, not decisioning \u2014 no public deploy",
    ],
    audienceFit:
      "Legal / sanctions leadership \u2022 compliance \u2022 operations",
    crossFunctionalHooks:
      "risk \u2022 data governance \u2022 Microsoft platform team \u2022 information security",
  },
  {
    number: "C12",
    company: "Euroclear",
    theme: "Client Operations \u2022 Asset Servicing, Onboarding & Exception Triage",
    title: "Triage client-ops exceptions before they erode trust",
    summary:
      "Onboarding, asset-servicing queries and exception triage are where clients feel friction and where cost quietly accumulates.",
    challengeStatement:
      "Onboarding, asset-servicing queries and exception triage are where clients feel friction and where cost quietly accumulates. As funds and ETF flows grow, the exception load grows with them, and too much triage is still manual \u2014 but in an FMI we can\u2019t trade speed for control.",
    whyNow:
      "The seven-year Microsoft partnership (Jan 2025) is positioned to transform client experience using cloud, data and AI; funds is a named growth area with robust ETF flows in 2025.",
    baselineMetrics: [
      "7-yr Microsoft partnership (Jan 2025): client experience via cloud / data / AI [Euroclear]",
      "Strong 2025 results; high deposits, robust ETF flows [Euroclear 2025 results]",
      "Validate live: exception volume, query-resolution time, onboarding time",
      "Status: split of infra vs business-value use cases unclear \u2014 confirm",
    ],
    audienceFit:
      "Client-operations leadership \u2022 asset servicing \u2022 FundsPlace",
    crossFunctionalHooks:
      "Microsoft platform team \u2022 data products \u2022 compliance \u2022 IT",
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
            </div>
          )}
        </div>
      </header>

      {/* Intro description — full-width, tighter top spacing */}
      <div className="px-6 pt-3 pb-2 max-w-7xl mx-auto w-full text-center shrink-0">
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Extracted and structured from the executive pre-workshop briefing. These cards are
          framed as{" "}
          <strong className="text-foreground">business problems</strong> for
          domain-advisor & consultant breakout discussions — not solution briefs.
          Click any card on the left to view its full context.
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
                Click to preview
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
                Select this challenge
              </span>
            )}
          </div>
          <div className="flex gap-2 items-center shrink-0">
            {isActive ? (
              <Button variant="outline" size="sm" onClick={onClear}>
                Clear
              </Button>
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
