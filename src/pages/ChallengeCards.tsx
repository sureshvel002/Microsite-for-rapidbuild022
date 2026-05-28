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

// Cards from the Telia Finland AI Immersion Day discovery brief, framed
// as business problems for mixed leadership / IT breakout discussion
// (not solution briefs). The internal `number` (Cxx) is kept as a stable
// id for storage but is not surfaced in the UI per current design.
const challenges: ChallengeCard[] = [
  {
    number: "C1",
    company: "Telia Finland",
    theme: "Customer Care / Omnichannel",
    title: "Care journeys restart every time the channel changes",
    summary:
      "Channel hand-offs force customers to repeat themselves, eroding care quality and retention.",
    challengeStatement:
      "Customers contact us too many times to solve one issue, and each handoff makes them repeat context we should already know. The organization experiences it as queues and transfers; the customer experiences it as not being understood.",
    whyNow:
      "Telia says it accelerated AI in customer service during 2025 and routine enquiries are increasingly handled autonomously. Finland consumer mobile remains under competitive pressure while fixed and business solutions improve, making care quality a retention lever rather than only a support cost line.",
    baselineMetrics: [
      "2,396k mobile postpaid subscriptions excluding M2M",
      "627k broadband subscriptions",
      "659k TV subscriptions",
      "Finland service revenue: EUR ~290m in Q1 2026 and EUR ~1,205m in FY2025",
      "Vendor directional signal: Telia Finland CX program used RPA, attended automation, AI and analytics",
    ],
    audienceFit:
      "Head of B2B Customer Operations; Head of Sales Support B2C; Director Service Management Assurance & Operations; CRM & Development Lead",
    crossFunctionalHooks:
      "Head of OSS; CIO; Head of Business Intelligence; Senior Process Manager B2B; Brand Manager",
  },
  {
    number: "C2",
    company: "Telia Finland",
    theme: "B2B Sales / Enterprise Productivity",
    title: "Account teams spend too long assembling answers",
    summary:
      "Sellers lose hours stitching pricing, delivery, security, and network context together.",
    challengeStatement:
      "Our large-account sellers and customer teams lose hours pulling together pricing, delivery, assurance, security, and network context before they can even respond properly. That makes us slower than the customer expects and slower than the opportunity window allows.",
    whyNow:
      "About 50% of Telia Finland revenue comes from Enterprise customers. Finland business solutions revenue grew 5.1% in Q1 2026 and Telia was approved as a NATO framework supplier, raising the importance of complex, multi-stakeholder B2B selling.",
    baselineMetrics: [
      "About 50% of Telia Finland revenue comes from Enterprise customers",
      "Business solutions revenue in Finland: EUR ~275m in FY2025",
      "Business solutions were about 22.7% of Finland service revenue in FY2025",
      "Business solutions revenue grew 5.1% in Q1 2026",
      "Finland service revenue totaled EUR ~1,205m in FY2025",
    ],
    audienceFit:
      "Head of Large Corporate Customers; Account Management Large Corp; Head of SME Customers; Head of B2B Development",
    crossFunctionalHooks:
      "CISO; Head of OSS; Director B2B Marketing/CIE & B2B Digital Ops; Finance Director",
  },
  {
    number: "C3",
    company: "Telia Finland",
    theme: "SME Growth / Commercial Execution",
    title: "SME growth is stuck in a three-player fight",
    summary:
      "Growth leans on discounting because timing, relevance, and execution don't differentiate enough.",
    challengeStatement:
      "We are competing in a market where everyone has nationwide capabilities and customers can compare prices instantly. The result is that too much growth depends on discounts and too little comes from timing, relevance, and execution.",
    whyNow:
      "Finland remains a tightly contested three-player market. Telia held about 29% telecom turnover share in 2023, behind Elisa at 37% and ahead of DNA at 23%. In mobile subscriptions, Telia is roughly level with DNA and behind Elisa; in fixed broadband, it trails both Elisa and DNA.",
    baselineMetrics: [
      "Telecom turnover share in 2023: Telia 29%, Elisa 37%, DNA 23%",
      "Mobile subscription share in 2024: Telia about 30%, Elisa 38%, DNA 31%",
      "Fixed broadband share in 2024: Telia 24%, Elisa 31%, DNA 34%",
      "9m mobile subscriptions in use in Finland at end-2025",
      "DNA reported 28k mobile net adds and 3k fixed net adds in Q3 2025",
    ],
    audienceFit:
      "Head of SME Customers; Client Manager SME; Head of B2B Marketing; Director B2B Marketing/CIE & B2B Digital Ops",
    crossFunctionalHooks:
      "Head of B2B Customer Insights; CRM & Development Lead; Finance Director; Head of Business Intelligence",
  },
  {
    number: "C4",
    company: "Telia Finland",
    theme: "Consumer Retention / Churn",
    title: "Retention signals arrive after the customer has left",
    summary:
      "Churn signals arrive too late — through complaints, silence, or partial disengagement.",
    challengeStatement:
      "We often understand churn too late, after the customer has already shown us what mattered through complaints, silence, or partial disengagement. By then we are trying to explain the loss rather than prevent it.",
    whyNow:
      "Telia Finland's mobile postpaid base excluding M2M fell by 79,000 year on year in Q1 2026, while mobile service revenue declined 2.0%. Telia says competitive pressure continues in Finland's mobile consumer business. The consumer proposition is also structurally changing because Telia no longer owns MTV but still sells bundle-rich entertainment offers.",
    baselineMetrics: [
      "Mobile postpaid base excluding M2M down 79k year on year to 2,396k at March 31, 2026",
      "Mobile service revenue in Finland declined 2.0% like for like in Q1 2026",
      "Postpaid mobile ARPU was EUR 19.3 in Q1 2026, up 1.0% year on year",
      "Broadband subscriptions rose by 9k year on year and broadband ARPU rose 8.2%",
    ],
    audienceFit:
      "Head of Sales Support B2C; Senior Brand Manager; Head of Development Consumer Products; Head of B2B Customer Insights",
    crossFunctionalHooks:
      "CRM & Development Lead; Head of Business Intelligence; Service Management; Finance",
  },
  {
    number: "C5",
    company: "Telia Finland",
    theme: "Fraud / Security / Trust",
    title: "Fraud cases escalate faster than teams can triage",
    summary:
      "Fraud volume outpaces manual triage; pattern recognition and coordinated response lag.",
    challengeStatement:
      "The attack surface is growing across customers, channels, partners, and products, but case handling still depends too much on manual interpretation and fragmented escalation paths. We are good at reacting to obvious problems; we are slower on pattern recognition and coordinated response.",
    whyNow:
      "Telia's 2024 security foresight report says hacker attacks and cyber-crime are escalating rapidly. Telia Safe includes online security, privacy, and fraud prevention features. The AI Act timeline also matters operationally: AI literacy and prohibited-use rules are already in force, and most remaining obligations apply from August 2, 2026.",
    baselineMetrics: [
      "2,396k mobile postpaid subscriptions excluding M2M",
      "627k broadband subscriptions",
      "9m mobile subscriptions in Finland at end-2025; 72% used by private household consumers",
      "14,498 Telia employees in continuing operations at year-end 2025",
      "Most AI Act obligations apply from August 2, 2026",
    ],
    audienceFit:
      "CISO; Security Specialist; Director Service Management Assurance & Operations; Head of B2B Customer Operations",
    crossFunctionalHooks:
      "CIO; Head of Generative AI; Finance Director; Large Corporate Customers; SME Customers",
  },
  {
    number: "C6",
    company: "Telia Finland",
    theme: "IT Delivery / Legacy / Release Flow",
    title: "Release trains stall around legacy dependencies",
    summary:
      "Old logic, brittle integrations, and untrusted data drag every release.",
    challengeStatement:
      "Too many deliveries still slow down when they hit old process logic, brittle integrations, or data that nobody fully trusts. We do not feel the cost as one big outage; we feel it as constant drag on speed, coordination, and confidence.",
    whyNow:
      "Telia's broader efficiency program targeted annual savings of at least EUR ~245m from September 2024. Finland announced a proposed net reduction of around 200 positions in Q1 2026 as part of simplification and efficiency work. Public Finland-specific stack signals point to a layered environment rather than a clean-sheet one.",
    baselineMetrics: [
      "Group change program targeted annual savings of at least EUR ~245m",
      "Finland proposed net reduction of around 200 positions in Q1 2026",
      "Finland revenue: EUR ~1,405m and service revenue: EUR ~1,205m in FY2025",
      "Finland adjusted EBITDA margin: 31.3% in FY2025",
      "Dated public signal: Salesforce/Vlocity linked to Telia Finland digital transformation in 2017",
    ],
    audienceFit:
      "Finland CIO; Head of IT Execution & PMO; Release Manager; RTE / Execution Orchestrator",
    crossFunctionalHooks:
      "Head of OSS; CRM & Development Lead; Product Owner; Finance Director; Vendor Management",
  },
  {
    number: "C7",
    company: "Telia Finland",
    theme: "Workforce / Skills / AI Adoption",
    title: "Skills gaps surface after strategy has moved",
    summary:
      "Skill gaps show up in delivery and control before they're mapped or rebuilt.",
    challengeStatement:
      "We are asking managers and teams to work in new ways faster than we can reliably map, build, and redeploy the necessary skills. By the time a gap is visible in performance, it is already delaying delivery or weakening control.",
    whyNow:
      "Telia investor messaging says there is a growing need to secure competence to capture future AI opportunities. Finland is going through simplification, including a proposed reduction of around 200 positions. AI governance now includes literacy expectations under the EU AI Act, and Telia's human-rights policy emphasizes responsible use, fairness, transparency, and accountability.",
    baselineMetrics: [
      "14,498 employees in continuing operations at year-end 2025",
      "3,912 average employees in Finland in 2024",
      "Proposed net reduction of around 200 positions in Q1 2026",
      "98% of all employees had completed Telia Code of Conduct training by Q3 2025",
      "Most AI Act obligations apply from August 2, 2026",
    ],
    audienceFit: "People Partner; L&D Partner; Head of Generative AI; CIO",
    crossFunctionalHooks: "CISO; PMO; Networks; Finance; Business Intelligence",
  },
  {
    number: "C8",
    company: "Telia Finland",
    theme: "Finance / Planning / Performance Management",
    title: "Forecasts lag the business they are steering",
    summary:
      "Planning conversations arrive after the business mix has already shifted.",
    challengeStatement:
      "We still run planning and performance conversations on summaries that arrive after the mix has already moved. That makes it harder to react to shifts in subscriber quality, product mix, and delivery cost while they are still manageable.",
    whyNow:
      "Finland's Q1 2026 picture was mixed: service revenue up 0.3%, adjusted EBITDA up 1.3%, mobile service revenue down 2.0%, business solutions up 5.1%, and broadband up 7.6%. Telia's 2025\u20132027 group ambitions are exacting: 2% CAGR in service revenue, 4% CAGR in adjusted EBITDA, and CAPEX below EUR ~1.32bn per year.",
    baselineMetrics: [
      "Finland revenue: EUR ~1,405m in FY2025",
      "Finland service revenue: EUR ~1,205m in FY2025",
      "Finland adjusted EBITDA: EUR ~440m in FY2025",
      "Mobile postpaid subscriptions down 79k year on year in Q1 2026; broadband up 9k and TV up 8k",
      "2025 group CAPEX excluding licenses, spectrum fees and right-of-use assets: EUR ~1,265m",
    ],
    audienceFit:
      "Director Finance; Head of Business Intelligence; Head of Strategic Portfolio Management; Development Manager Operational Excellence",
    crossFunctionalHooks:
      "CIO; PMO; B2B Development; Networks; Consumer Products",
  },
  {
    number: "C9",
    company: "Telia Finland",
    theme: "Data Governance / Responsible AI",
    title: "Data accountability is weaker than digital ambition",
    summary:
      "Tools and decisions move faster than data lineage, ownership, and controls.",
    challengeStatement:
      "We are moving faster with new tools and new decisions than with the controls that explain where the data came from, how it was changed, and who owns the outcome. That creates friction with risk, confidence, and adoption all at once.",
    whyNow:
      "Telia says AI now spans customer service, networks, and internal processes. Telia's March 2026 human-rights policy raises the bar on responsible AI, fairness, transparency, and accountability. The AI Act timeline is close enough that operating-model questions cannot stay abstract; most obligations apply from August 2, 2026.",
    baselineMetrics: [
      "AI use described across customer service, networks and internal processes",
      "14,498 employees in continuing operations at year-end 2025",
      "2,396k mobile postpaid subscriptions excluding M2M and 627k broadband subscriptions in Finland",
      "AI literacy and prohibited-use provisions are already in force; most remaining AI Act duties apply from August 2, 2026",
    ],
    audienceFit: "Head of Generative AI; CISO; CIO; Security Specialist",
    crossFunctionalHooks:
      "Finance; HR / L&D; OSS; CRM & Development; Business Intelligence",
  },
  {
    number: "C10",
    company: "Telia Finland",
    theme: "Application Support / Incident Intelligence",
    title: "Enterprise application errors take too long to diagnose and resolve",
    summary:
      "Error interpretation, log searches, and team hand-offs slow every incident resolution.",
    challengeStatement:
      "Application and platform support teams spend too much time interpreting technical errors, searching logs, checking historical incidents and coordinating across functional and technical teams. The real issue is not only the error itself, it is the time lost in moving from symptom to root cause to resolution.",
    whyNow:
      "Enterprise application landscapes are increasingly complex, with business-critical processes depending on integrated platforms, legacy components, custom logic, interfaces and data flows. When incidents occur, support teams need faster ways to interpret error messages, correlate technical traces, identify likely causes and recommend the next best action. AI can help reduce manual investigation effort by assisting with error interpretation, log summarisation, incident pattern matching and guided remediation.",
    baselineMetrics: [
      "Average time taken to diagnose application incidents",
      "Number of incidents requiring multiple handoffs between business, functional and technical teams",
      "Repeated or recurring error categories across enterprise applications",
      "Volume of support tickets linked to integration, configuration, authorisation, data or custom-code issues",
      "Time spent searching previous incidents, logs, knowledge articles and system documentation",
      "Percentage of incidents resolved using existing knowledge versus requiring new analysis",
    ],
    audienceFit:
      "CIO; Head of IT Execution & PMO; Application Support Lead; Service Management Lead; Release Manager; Enterprise Application Owners; Product Owners; Functional Leads",
    crossFunctionalHooks:
      "Business Operations; Finance; HR / People Systems; CRM & Development; Data & Analytics; Security; Vendor Management; PMO",
    injectionMode: "full",
  },
  {
    number: "C11",
    company: "Telia Finland",
    theme: "B2B Delivery Services / Enterprise Productivity",
    title: "Delivery capacity is falling short of demand",
    summary:
      "Hansel deliveries are running well below target; capacity, complexity and post-delivery work choke the pipeline.",
    challengeStatement:
      "Hansel project's customer deliveries are progressing too slowly, and current delivery capacity is insufficient to meet rising demand. The gap is driven by limited resources, delivery complexity in non-standard cases, and post-delivery work that has not been adequately accounted for. In addition, customer delays in providing information and missing support materials further slow the process.",
    whyNow:
      "Hansel delivery volumes have increased rapidly and will continue for 2+ years. Current delivery output does not scale with rising demand, backlogs and queues are starting to threaten customer experience and trust, and manual reactive control no longer works at this scale. The Hansel delivery end date keeps slipping further out, and multiple IT systems (e.g. customer-numbering data processing) further slow the delivery process.",
    baselineMetrics: [
      "Delivery throughput is significantly below target (about 1\u20132 deliveries per week vs. a target of 6\u20138)",
      "Number-investigation backlog grew rapidly to ~150 cases",
      "Delivery start dates are delayed by several weeks due to resource constraints and customer-data / delivery-information investigation bottlenecks",
      "Asset creation and customer training take longer than before, especially when handled by less experienced personnel rather than dedicated back-office and customer trainers",
      "Post-delivery warranty work consumes delivery capacity without systematic measurement",
      "End-to-end delivery status must be manually assembled from multiple sources",
    ],
    audienceFit:
      "Head of B2B Customer Operations; Head of B2B Delivery Services; Head of Large Corporate Customers; Head of B2B Development",
    crossFunctionalHooks:
      "Delivery & Operations (workload management, prioritisation, lead times); Sales (orderability, predictability, deal progression); IT & Architecture (system integration, automation, data availability); Customer Experience (communication timing, delivery quality, post-delivery experience); Management (predictive steering, capacity decisions, risk management)",
    injectionMode: "full",
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
          mixed leadership / IT breakout discussions — not solution briefs.
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
