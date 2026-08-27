import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Download,
  Images,
  MessageSquare,
} from "lucide-react";
import tcsLogo from "@/assets/TCS Co Logo SVG.svg";
import { companyPath, getCompany } from "@/data/afm";
import { readableTextOn } from "@/lib/brand";

// The three-step journey, scoped to one AFM company. Same pattern for every
// company in the pack — only the context pack, the challenge cards and the
// brand colour change.
const STEPS = [
  {
    step: 1,
    title: "Context Pack",
    tagline: "Get Context",
    slug: "deep-research",
    icon: Download,
    describe: (name: string, _cardCount: number) =>
      `Read the ${name} deep research report — the company, its market, its strategic direction, the regulatory frame and the friction map behind the challenge cards.`,
  },
  {
    step: 2,
    title: "Challenge Cards",
    tagline: "Pick Challenge",
    slug: "challenge-cards",
    icon: Images,
    describe: (name: string, cardCount: number) =>
      `Explore the ${cardCount} challenge cards the ${name} report closes with — framed as business outcomes for domain-advisor & consultant breakout discussion.`,
  },
  {
    step: 3,
    title: "Prompts",
    tagline: "Run Prompt",
    slug: "prompts",
    icon: MessageSquare,
    describe: (_name: string, _cardCount: number) =>
      "Double Diamond framework prompts, anchored on the challenge you picked. Copy and use with your preferred AI assistant.",
  },
];

const CompanyHome = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const company = getCompany(companyId);

  if (!company) return <Navigate to="/" replace />;

  const { primary, secondary } = company.brand;

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      {/* ── Company header, in the company's own colour ─────────────────── */}
      <header
        className="relative overflow-hidden text-white"
        style={{
          background: `linear-gradient(140deg, ${primary} 0%, ${secondary} 135%)`,
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-black/25 via-black/10 to-transparent"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-7">
          <div className="flex items-center justify-between gap-4 mb-7">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1.5 rounded-md bg-white/15 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/25"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All AFM companies
            </button>
            <img
              src={tcsLogo}
              alt="TCS"
              className="h-5 md:h-6 w-auto brightness-0 invert"
            />
          </div>

          <div className="flex items-start gap-4 animate-fade-up">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 font-display text-lg font-bold ring-1 ring-white/25">
              {company.monogram}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
                {company.sector} · AFM{" "}
                {company.group === "banner" ? "retail banner" : "ecosystem"}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold font-display leading-tight">
                {company.name}
              </h1>
              <p className="mt-2 max-w-3xl text-sm md:text-base text-white/90 leading-relaxed">
                {company.oneLiner}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3 animate-fade-up [animation-delay:100ms]">
            <Fact label="Scale" value={company.scale} />
            <Fact label="Ownership" value={company.ownership} />
            <Fact label="Pack written for" value={company.preparedFor} />
          </div>
        </div>
      </header>

      {/* ── The three steps ────────────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-5 md:gap-2 w-full">
          {STEPS.map((section, idx) => (
            <div
              key={section.slug}
              className="flex items-stretch md:flex-1 min-w-0"
            >
              <button
                onClick={() => navigate(companyPath(company.id, section.slug))}
                style={{ animationDelay: `${140 + idx * 70}ms` }}
                className="group relative overflow-hidden rounded-xl bg-card border border-border p-5 text-left transition-all hover:shadow-lg hover:-translate-y-1 w-full flex flex-col min-w-0 animate-fade-up"
              >
                <div
                  className="absolute top-0 left-0 h-1 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${primary}, ${secondary})`,
                  }}
                />

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="relative flex items-center justify-center h-9 w-9 rounded-full font-bold font-display text-sm shadow-md"
                      style={{ background: primary, color: readableTextOn(primary) }}
                    >
                      {section.step}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground truncate">
                      Step {section.step} · {section.tagline}
                    </span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 transition-all group-hover:translate-x-1" />
                </div>

                <div className="flex flex-col gap-3 flex-1">
                  <div
                    className="rounded-lg p-2.5 w-fit"
                    style={{ background: `${primary}1A` }}
                  >
                    <section.icon
                      className="h-6 w-6"
                      style={{ color: primary }}
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold font-display text-card-foreground mb-2">
                      {section.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {section.describe(company.name, company.challenges.length)}
                    </p>
                  </div>
                </div>
              </button>

              {idx < STEPS.length - 1 && (
                <div className="flex items-center justify-center self-center shrink-0">
                  <div className="hidden md:flex items-center px-1">
                    <ChevronRight
                      className="h-7 w-7"
                      style={{ color: primary }}
                    />
                  </div>
                  <div className="md:hidden flex flex-col items-center py-1">
                    <ChevronRight
                      className="h-6 w-6 rotate-90"
                      style={{ color: primary }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-xs font-medium tracking-widest uppercase text-muted-foreground mt-10">
          A guided three-step journey · Get Context → Pick Challenge → Run
          Prompt
        </p>
      </main>
    </div>
  );
};

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/10 px-3 py-2.5 ring-1 ring-white/15">
      <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">
        {label}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-white/95">{value}</p>
    </div>
  );
}

export default CompanyHome;
