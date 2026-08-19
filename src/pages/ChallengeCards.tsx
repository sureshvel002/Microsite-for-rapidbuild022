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

// Cards carried in the Eneco België deep research report (TCS Rapid Build ·
// Orchestrated Deep Research). Three cards anchor the session — one
// technology-rooted, two business. Each frames a *business outcome* for
// domain-advisor & consultant breakout discussion: no card names a solution,
// a tool, a vendor, a technology or a job title — those are invented in the
// room. The internal `number` (Pn) is a stable id for storage and is shown
// only as a small chip in the list view.
const challenges: ChallengeCard[] = [
  // ── P1 · Technology-rooted ───────────────────────────────────────
  {
    number: "P1",
    company: "Eneco Belgium",
    kind: "Technology-rooted",
    theme: "Meter-to-Cash • Billing, Settlement, Dunning & Complaint Handling",
    title: "Money and trust stuck between the meter and the bill",
    summary:
      "More than a million connection points billed on readings Eneco cannot see for itself — and nearly half of all customer escalation is about that gap, not about price.",
    challengeStatement:
      "We sell to more than a million connection points but cannot see, on our own, what most of them consumed. The reading arrives from someone else, late and sometimes not at all, and the invoice waits behind it. Nearly half of everything customers escalate is about that gap rather than about price, and some households have waited years for a bill they still owe. We carry the anger, the cash cost and the disputed receivable for a failure we do not own and cannot fix alone.",
    whyNow:
      "The market-message defect entered its fifth year in 2025, with 919 meters still blocked in April 2025 and the grid operator fined roughly €500,000 by May. Suppliers carry the unbilled receivable and the late-payment interest, and no compensation scheme exists. Customer debt is worsening at the same time — Brussels consumer debt has reached €137m at €258 per customer, nearly double Wallonia's €144 — so every week of billing delay lands on a customer less able to absorb it.",
    baselineMetrics: [
      "Meters 24.2% + billing 22.6% = 46.8% of all Federal Ombudsman cases, against prices at 19% [Ombudsman 2024]",
      "Settlement lands 6–8 weeks after Eneco receives grid-operator readings, with no published deadline [general conditions / FAQ]",
      "Atrias/MIG6 defect in its fifth year: ~3,000 Flemish, 7,500 Walloon, 500 Brussels access points blocked 6+ months; Fluvius fined €120,190 plus €2,500/day",
      "Three regional data regimes — Fluvius, ORES/RESA, Sibelga — with opt-in consent and a 2–3 day activation; customer data access is a grid-operator flow, not an Eneco interface",
      "Flanders had 85,000 households on the social supplier in 2025, with 17,039 gas self-disconnections, up 9.2%",
      "Eneco complaints halved from 2,761 to 1,386 in a year — the operational trajectory is good, the residual is structural",
      "Validate live: unbilled receivable and its ageing, cost-to-serve per delayed settlement, repeat-contact rate during the wait",
      "Status: what runs underneath the Belgian meter-to-cash chain is vendor-stated only, and that vendor changed owner on 28 May 2026 — state the assumption",
    ],
    audienceFit:
      "Managing Director • customer & commercial leadership • operations and support (billing, dunning, collections)",
    crossFunctionalHooks:
      "Market & regulatory affairs • grid operators (Fluvius, ORES/RESA, Sibelga) • Federal Energy Ombudsman & VREG / CWaPE / BRUGEL • collections partners • Belgian D&TS (SIMS + CS)",
    constraints: [
      "Three regional regimes, not one. Collections already encode €20–€2,000 compensation in Flanders and Brussels against €55 a year capped in Wallonia, with different formal-demand fees.",
      "The upstream defect belongs to a third party and has not been fixed in five years. Assume it persists.",
      "The Belgian meter-to-cash stack is stated only by a vendor, and that vendor changed owner in May 2026. State the assumption rather than inherit one.",
      "Around 350 people carry the whole Belgian book, across Mechelen, Wavre and Ghent.",
    ],
    whyGoodBuild:
      "A single session can produce the thing that does not exist today: an agreed account of what a customer should experience during the weeks when nobody knows what they used, and who owes whom what at each point. Everything downstream — the reminder, the advance, the complaint, the save — depends on that decision, and the room can actually make it in a day.",
  },
  // ── P2 · Business ────────────────────────────────────────────────
  {
    number: "P2",
    company: "Eneco Belgium",
    kind: "Business",
    theme: "Retail Commercial • Pricing, Retention & Switching Defence",
    title: "Re-winning the whole book every five years",
    summary:
      "One in five Flemish customers switches supplier each year, the invoice now legally carries an exit prompt, and Eneco's fixed tariff is priced at the top of the market.",
    challengeStatement:
      "One in five Flemish customers changes supplier each year, and our business segment churns hardest of all. The invoice that is meant to carry the relationship now also carries a legally mandated code telling the customer whether to leave. Ten new suppliers entered in a single year, the market's three-year satisfaction winner exited household supply altogether, and our own fixed tariff — the product most exposed to that comparison — is priced at the top of the market. The question is what we sell, and what we are trusted on, when the entire book must be won again roughly every five years.",
    whyNow:
      "Since 1 July 2025 the V-check exit prompt has been compulsory on every bill and renewal letter, and the regulator links the 2025 step-up in switching directly to it. Top-three Flemish share has fallen from 77.7% to 74.0% since 2022 while smaller suppliers took 5.4 points of volume. From November 2026 the comparison tool assesses variable contracts on full quarter-hourly price history. The erosion is live, not forecast.",
    baselineMetrics: [
      "Flemish electricity switching 19.35% in 2025 — households 18.94% on 562,481 switches, business 21.09% on 148,762 [VREG]",
      "Eneco's fixed product sits 4.87 c/kWh above its own variable — roughly €1,517–1,523 a year at 3,500 kWh against €1,321 for the cheapest supplier",
      "Residential variable adder 3.058 c/kWh against 2.581 for business and 1.000 for dynamic — the margin structure differs by a factor of three across products the same customer can choose",
      "Ten new suppliers entered 2024–26; DATS 24, three years the Test-Aankoop winner, exited household supply on 30 July 2026, transferring 33,000 connection points",
      "Only ~45% of a Walloon electricity bill is commodity; the excise shift runs in fixed steps to January 2029, reaching +€35.30 a year for a dual-fuel household",
      "Eneco publicly opposes group-purchase campaigns and runs no referral programme, in a market where those campaigns are a named driver of switching",
      "[NL, directly relevant] A Dutch mass claim with 275,000+ registrations is testing variable-tariff price-change clauses — hearing September 2026, Supreme Court ruling due December",
      "Validate live: churn, retention and acquisition cost by cohort — Eneco publishes none of them, so the room supplies them",
    ],
    audienceFit:
      "Managing Director • customer & commercial leadership (offer, price, save) • market & regulatory affairs",
    crossFunctionalHooks:
      "Operations & support — a save is not credible right after a billing failure • VREG V-test and comparison tooling • pricing & risk • group COO Customer in Rotterdam",
    constraints: [
      "The comparison code on the invoice is a legal duty, not a design choice.",
      "Over half the bill sits outside Eneco's control, and the excise shift lands on government-set dates.",
      "Day-ahead pricing went quarter-hourly on 1 October 2025; full quarter-hourly history enters the comparison tool in November 2026. Anything that cannot represent at that granularity will be misranked on the tool consumers actually use.",
      "Eneco does not publish churn, retention or acquisition-cost figures — the room will need to supply them.",
    ],
    whyGoodBuild:
      "Belgium already knows which conversations trigger churn and which invoices go wrong. A session can produce a worked, evidenced picture of one high-churn cohort end to end — what they were told, what arrived, when, and what it cost to hold them — which nobody currently owns across all three functions.",
  },
  // ── P3 · Business ────────────────────────────────────────────────
  {
    number: "P3",
    company: "Eneco Belgium",
    kind: "Business",
    theme: "Assets & Flexibility • Storage Dispatch, Dynamic Tariffs & Household Flex",
    title: "Flexibility is scaling faster than the earnings from it",
    summary:
      "Belgium's largest flexibility position, taken deliberately asset-light — 350 of the 400 MW belongs to someone else, so what it earns is a contractual question, not an engineering one.",
    challengeStatement:
      "We are accumulating flexible capability on both sides of the meter at a pace our ability to convert it into margin has not matched. On the asset side, an almost entirely wind-based book meets a market that increasingly pays nothing — or pays negatively — exactly when the wind blows. On the customer side, roughly a gigawatt of household flexibility already sits behind Belgian meters and is essentially unremunerated. And most of the fleet we will manage in 2027 belongs to somebody else, which makes the question of who captures the value a commercial one, not an engineering one.",
    whyNow:
      "Belgium recorded 518–520 negative-price hours in 2025 — 5.9% of the year, a record — and roughly 11% of 2026 hours to date have cleared at or below zero. The single largest addition to the managed fleet, 300 MW and 1,200 MWh, delivers in 2027 on a ten-year contract. The earnings model has to be settled before the volume arrives.",
    baselineMetrics: [
      "518–520 negative-price hours in 2025, floor −€462.30/MWh on 11 May, against 404 hours in 2024; wind and solar reached 22.23 TWh, 37% of output",
      "400 MW / 1,540 MWh of storage under control by 2027 — of which Eneco owns 50 MW; a third of the headline rests on one developer, one hardware supplier and one delivery year",
      "~150,000 Flemish home batteries hold roughly 1 GW of unused flexibility, yet only 0.3% of Flemish households hold a dynamic contract — and just 58 dynamic contracts exist in the whole Brussels region",
      "Household injection nets to roughly zero after the €124.63 annual administration charge, and business injectors already pay to inject during negative hours",
      "Both offshore assets sit under mechanisms fixed in 2017–18, and Eneco takes 100% of SeaMade's ~1.8 TWh on 12.5% equity — the sourcing structure the whole Belgian book depends on",
      "No dispatchable Belgian generation since the 870 MW Manage project was withdrawn in September 2023",
      "Device-level steering in Eneco's Belgian propositions is partner software, and the group's flexibility platform has no evidenced Belgian extension",
      "Validate live: realised revenue per MW of contracted storage against 2025's actual price shape, and the revenue-share terms behind it",
    ],
    audienceFit:
      "Managing Director • assets & flexibility leadership (fleet and dispatch) • customer & commercial (contracts and tariffs)",
    crossFunctionalHooks:
      "Market & regulatory affairs (granularity, network tariffs, meter access) • operations & support — settlement is what makes any reward provable • Elia and the capacity auctions • storage counterparties • group trading in Rotterdam",
    constraints: [
      "Only 50 MW of Belgian storage is owned; the rest is contracted, and the terms are what determine the margin. The “>1.2 GW across 15 projects” figure is a 2027 group target across the Netherlands, Belgium and Germany, not a present Belgian capability.",
      "The dynamic product is Flanders-only and digital-meter-gated. Wallonia has only ~5,000 SMR3-configured meters, about 3%, and time-of-use network tariffs are deferred to 2029.",
      "Capacity payments are set by auction — €14,100/MW/year for 2026–27 rising to €27,300 for 2029–30 — not negotiable.",
      "Grid connection is the binding constraint: roughly 800 companies in Elia's queue at April 2026, with both new storage sites due in 2027.",
    ],
    whyGoodBuild:
      "One session can produce a defensible, numbers-first view of what a single contracted asset and a single household segment would actually have earned against 2025's real price shape, and what would have to be true — commercially and contractually — to retain more of it. That is a decision object a managing director can take into a capital conversation, not a demonstration.",
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
          The three cards carried in the Eneco België deep research report — one
          technology-rooted, two business. Each is framed as a{" "}
          <strong className="text-foreground">business outcome</strong> for
          domain-advisor & consultant breakout discussions — not a solution brief,
          and no card names a solution, a tool or a vendor. Click any card on the
          left to view its full context, then choose one to carry into the prompts
          page.
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
        {/* Company + Title */}
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
          {card.company}
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
