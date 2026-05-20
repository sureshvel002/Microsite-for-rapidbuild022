import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, X } from "lucide-react";
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

const challenges: ChallengeCard[] = [
  {
    number: "1",
    company: "ABN AMRO",
    title: "GenAI KYC \"Case Copilot\" (Control-Grade)",
    context: [
      "Know Your Customer (KYC) analysts spend heavy time reading documents, summarizing, completing checklists, and drafting rationales",
      "The work must be fully audit-ready with strong governance and traceability",
    ],
    coreChallenge: "How do we deploy a GenAI copilot that drastically reduces analyst handling time while maintaining full audit-readiness, governance, and traceability?",
    tension: "Speed and efficiency gains vs. control-grade compliance, evidence traceability, and policy adherence",
    opportunityAngle: "Build an AI-assisted KYC workflow with document citation, audit-replayable rationales, and human-in-the-loop governance",
    successMetrics: [
      "\u226525\u201335% reduction in analyst handling time per KYC case",
      "\u226530% reduction in end-to-end KYC cycle time (request \u2192 completion)",
      "\u226595% of AI-generated rationales include evidence links (document citations) and are audit-replayable",
      "\u22641% policy breach / escalation rate from copilot suggestions (with human-in-the-loop)",
    ],
  },
  {
    number: "2",
    company: "Air India",
    title: "Agentic AI for Refunds & Disruptions (Policy-Safe Automation)",
    context: [
      "Refunds and disruption servicing lead to backlogs and long waits",
      "Agents navigate complex policies across cases",
      "Scaling policy-safe agentic automation is a high-ROI wedge",
    ],
    coreChallenge: "How do we automate refund and disruption resolution at scale while ensuring policy compliance, proactive updates, and improved customer satisfaction?",
    tension: "Automation speed and deflection vs. policy safety, accuracy, and customer trust",
    opportunityAngle: "Deploy agentic AI that handles eligible refund cases end-to-end with policy guardrails and proactive customer communication",
    successMetrics: [
      "\u226530\u201350% reduction in refund resolution turnaround time (eligible cases)",
      "\u226525\u201340% deflection of \"refund status\" contacts via proactive, accurate updates",
      "\u226595% policy compliance on automated decisions (exceptions routed to humans)",
      "\u226515% improvement in post-case CSAT (Customer Satisfaction)",
    ],
  },
  {
    number: "3",
    company: "ALDI",
    title: "Demand Forecasting & Auto-Replenishment Copilot",
    context: [
      "Need to sustain consistently high shelf readiness and margin discipline",
      "Cutting both stockouts and waste amid store-day demand swings, promotional surges, supplier and inbound variability",
      "DC-to-store cadence constraints while keeping operational complexity off the shop floor",
    ],
    coreChallenge: "How do we optimize demand forecasting and auto-replenishment to maximize on-shelf availability while minimizing waste and operational complexity?",
    tension: "Shelf readiness and margin discipline vs. demand variability, promotional surges, and supply chain constraints",
    opportunityAngle: "Build an AI-powered demand forecasting and auto-replenishment copilot with human-in-the-loop for exceptions",
    successMetrics: [
      "On-Shelf Availability (OSA) +150\u2013300 bps on targeted SKUs within 2\u20133 quarters",
      "Forecast MAPE \u221210\u201320% vs. baseline on pilot categories; service level \u226595%",
      "Waste/markdowns \u221210\u201315% on pilot SKUs; DC \u2192 store order cycle time \u221210%",
      "\u226570% automated reorder share on stabilized SKUs, with human-in-the-loop for exceptions",
    ],
  },
  {
    number: "4",
    company: "ABB",
    title: "AI-Powered Field Service & Remote Diagnostics",
    context: [
      "Fragmented, often offline knowledge slows diagnosis",
      "Wrong-part orders, repeat visits and truck rolls, extended downtime",
      "Delayed new-hire ramp-up, higher service costs, and weaker customer confidence",
    ],
    coreChallenge: "How do we improve first-time-fix rates and reduce mean time to repair despite fragmented, often offline knowledge that slows diagnosis?",
    tension: "Knowledge fragmentation and offline access vs. the need for fast, accurate diagnosis and resolution",
    opportunityAngle: "Deploy an AI field service assistant that unifies knowledge, guides diagnosis, and enables remote resolution",
    successMetrics: [
      "FTF +8\u201312 pts; MTTR \u221215\u201320%",
      "Avoided truck rolls \u221210\u201315% via remote resolution; parts mis-orders \u221220%",
      "Technician ramp-up time \u221230\u201340%; assistant adoption \u226575% of active techs",
      "100% reasoning trace & citations logged for audit and customer reports",
    ],
  },
  {
    number: "5",
    company: "Vodafone",
    title: "Cross-Domain Telco Operations Intelligence",
    context: [
      "Network operations, OSS/BSS systems, and customer interaction data operate in silos",
      "Delayed root-cause analysis and customer-impacting incidents escalate before resolution",
    ],
    coreChallenge: "How do we design an AI-driven cross-domain operations copilot that predicts, detects, and resolves network issues proactively by unifying telemetry, service data, and customer impact signals under Responsible AI guardrails?",
    tension: "Siloed operational domains vs. the need for unified, proactive incident detection and resolution",
    opportunityAngle: "Build a cross-domain AI operations copilot that unifies network telemetry, service data, and customer signals for proactive issue resolution",
    successMetrics: [
      "30% reduction in major customer-impacting incidents",
      "25% faster root-cause identification",
      "Measurable NPS improvement in priority markets",
      "Reduced operational costs in network support",
    ],
  },
];

function formatCardText(card: ChallengeCard): string {
  const lines = [
    `${card.company}`,
    `Challenge Card: "${card.title}"`,
    "",
    "Context:",
    ...card.context.map((c) => `● ${c}`),
    "",
    "Core Challenge:",
    card.coreChallenge,
    "",
    "Tension:",
    card.tension,
    "",
    "Opportunity Angle:",
    card.opportunityAngle,
    "",
    "Success Metrics:",
    ...card.successMetrics.map((m) => `● ${m}`),
  ];
  return lines.join("\n");
}

const ChallengeCards = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<ChallengeCard | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedPopup, setCopiedPopup] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopy = async (card: ChallengeCard, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(formatCardText(card));
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handlePopupCopy = async (card: ChallengeCard) => {
    await navigator.clipboard.writeText(formatCardText(card));
    setCopiedPopup(true);
    setTimeout(() => setCopiedPopup(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-2 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold font-display text-card-foreground">
            Challenge Cards
          </h1>
        </div>
      </header>

      {/* Cards */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {challenges.map((card, idx) => (
            <button
              key={idx}
              onClick={() => { setSelected(card); setCopiedPopup(false); }}
              className="group relative rounded-xl border border-border bg-card p-6 text-left transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-accent rounded-t-xl" />

              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-bold text-primary uppercase tracking-wide">
                  {card.company}
                </p>
                <button
                  onClick={(e) => handleCopy(card, idx, e)}
                  className="rounded-md p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  title="Copy challenge content"
                >
                  {copiedIdx === idx ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              <h2 className="text-base font-semibold text-card-foreground font-display leading-snug mb-3 group-hover:text-primary transition-colors">
                {card.title}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {card.coreChallenge}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail popup */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-card rounded-2xl border border-border shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close + Copy buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => handlePopupCopy(selected)}
                className="rounded-full p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                title="Copy full challenge"
              >
                {copiedPopup ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => setSelected(null)}
                className="rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">{selected.company}</p>
            <h2 className="text-2xl font-bold font-display text-card-foreground mb-5 pr-16">{selected.title}</h2>

            <Section label="Context">
              <ul className="space-y-1.5">
                {selected.context.map((c, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-primary mt-0.5 shrink-0">●</span> {c}
                  </li>
                ))}
              </ul>
            </Section>

            <Section label="Core Challenge">
              <p className="text-sm text-card-foreground leading-relaxed font-medium italic">{selected.coreChallenge}</p>
            </Section>

            <Section label="Tension">
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.tension}</p>
            </Section>

            <Section label="Opportunity Angle">
              <p className="text-sm text-card-foreground leading-relaxed font-medium">{selected.opportunityAngle}</p>
            </Section>

            <Section label="Success Metrics" last>
              <ul className="space-y-1.5">
                {selected.successMetrics.map((m, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-primary mt-0.5 shrink-0">●</span> {m}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>
      )}
    </div>
  );
};

function Section({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={last ? "" : "mb-5"}>
      <h3 className="text-xs font-bold uppercase tracking-wide text-primary mb-2">{label}</h3>
      {children}
    </div>
  );
}

export default ChallengeCards;
