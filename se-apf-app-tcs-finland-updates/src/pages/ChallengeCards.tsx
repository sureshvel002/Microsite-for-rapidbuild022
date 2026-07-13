import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, X, ArrowRight } from "lucide-react";
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
    company: "Johnson & Johnson",
    title: "Agentic AI for Intelligent Recruitment & Candidate Screening",
    context: [
      "J&J receives approximately 1.2 million job applications annually, making recruitment highly resource intensive",
      "Recruiters spend significant time manually screening resumes and coordinating interviews",
      "Hiring delays increase recruiter workload and risk losing top talent to competitors",
    ],
    coreChallenge: "How do we automate candidate screening, qualification, and interview coordination at scale while ensuring fair hiring, recruiter oversight, and an improved candidate experience?",
    tension: "Recruitment speed and automation vs. fairness, hiring quality, and bias-free decision making",
    opportunityAngle: "Deploy an AI recruitment agent that screens resumes, ranks candidates, schedules interviews, and assists recruiters while keeping humans in the final hiring decision",
    successMetrics: [
      "≥40% reduction in recruiter screening effort",
      "≥30% reduction in time-to-hire",
      "≥25% increase in recruiter productivity",
      "≥95% compliance with recruitment policies and human review requirements",
    ],
  },
  {
    number: "2",
    company: "Johnson & Johnson",
    title: "Agentic AI for Seamless Employee Onboarding",
    context: [
      "Employee onboarding requires coordination across HR, IT, Security, Payroll, and managers",
      "Multiple approvals and disconnected systems delay employee readiness",
      "New hires often spend days waiting for access, equipment, and mandatory training",
    ],
    coreChallenge: "How do we automate onboarding workflows across enterprise systems while ensuring compliance, timely approvals, and an exceptional new-hire experience?",
    tension: "Fast employee onboarding vs. security controls, approval governance, and regulatory compliance",
    opportunityAngle: "Deploy an onboarding agent that orchestrates HR, IT, Security, Payroll, and Learning tasks, proactively tracks progress, and guides employees through every onboarding step",
    successMetrics: [
      "≥50% reduction in onboarding cycle time",
      "≥90% Day-1 readiness for new employees",
      "≥40% reduction in manual HR coordination effort",
      "≥20% improvement in new-hire satisfaction",
    ],
  },
  {
    number: "3",
    company: "Johnson & Johnson",
    title: "Agentic AI for Employee HR Support & Self-Service",
    context: [
      "HR teams handle thousands of repetitive questions related to payroll, benefits, leave, and company policies",
      "Employees experience delays while waiting for responses",
      "HR specialists spend valuable time resolving routine requests instead of strategic work",
    ],
    coreChallenge: "How do we provide instant, accurate employee support while reducing HR workload and maintaining policy compliance?",
    tension: "High self-service automation vs. accurate responses, privacy protection, and employee trust",
    opportunityAngle: "Deploy an HR support agent that answers employee questions using enterprise knowledge, resolves routine requests, and intelligently escalates complex cases",
    successMetrics: [
      "≥40% reduction in HR support tickets",
      "≥60% first-contact resolution through AI",
      "≥30% faster response times",
      "≥15% improvement in employee satisfaction",
    ],
  },
  {
    number: "4",
    company: "Johnson & Johnson",
    title: "Agentic AI for Connected HR Operations & Workflow Automation",
    context: [
      "HR processes span multiple enterprise systems including Workday, Microsoft 365, ServiceNow, Payroll, and Learning platforms",
      "Employees and HR teams manually switch between applications and perform duplicate work",
      "Fragmented workflows reduce operational efficiency and data consistency",
    ],
    coreChallenge: "How do we orchestrate end-to-end HR workflows across enterprise systems while maintaining data consistency, governance, and operational efficiency?",
    tension: "Cross-system automation vs. enterprise integration complexity, security, and governance",
    opportunityAngle: "Deploy orchestration agents that coordinate actions across HR platforms, automate workflow execution, synchronize data, and reduce manual interventions",
    successMetrics: [
      "≥35% reduction in manual HR workflow effort",
      "≥30% faster cross-functional process completion",
      "≥95% HR data synchronization accuracy",
      "≥25% improvement in HR operational efficiency",
    ],
  },
  {
    number: "5",
    company: "Johnson & Johnson",
    title: "Agentic AI for Payroll & Compliance Operations",
    context: [
      "Global payroll processing involves multiple systems, country-specific regulations, and manual validations",
      "Compliance tracking requires continuous monitoring of policies, approvals, and mandatory training",
      "Errors can impact employee trust and increase regulatory risk",
    ],
    coreChallenge: "How do we automate payroll validation and compliance monitoring while ensuring regulatory accuracy, audit readiness, and employee confidence?",
    tension: "Automation efficiency vs. payroll accuracy, regulatory compliance, and data privacy",
    opportunityAngle: "Deploy AI agents that detect payroll anomalies, monitor compliance activities, answer payroll queries, and escalate exceptions for human review",
    successMetrics: [
      "≥50% reduction in payroll exception handling time",
      "≥30% reduction in payroll-related HR queries",
      "≥95% payroll accuracy",
      "≥99% compliance with payroll and regulatory policies",
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

  const handleUseChallenge = (card: ChallengeCard) => {
    localStorage.setItem("selectedChallenge", JSON.stringify(card));
    navigate("/prompts");
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

            <Section label="Success Metrics">
              <ul className="space-y-1.5">
                {selected.successMetrics.map((m, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-primary mt-0.5 shrink-0">●</span> {m}
                  </li>
                ))}
              </ul>
            </Section>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => handleUseChallenge(selected)}>
                Use this challenge
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
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
