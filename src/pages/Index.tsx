import { useNavigate } from "react-router-dom";
import { Download, Images, MessageSquare, ArrowRight, ChevronRight } from "lucide-react";
import tcsLogo from "@/assets/TCS Co Logo SVG.svg";

const steps = [
  {
    step: 1,
    title: "Context Pack",
    tagline: "Get Context",
    description:
      "Download the deep research brief — market context, agentic AI maturity and where the enterprise opportunity sits across the six industry themes.",
    icon: Download,
    path: "/deep-research",
    gradient: "from-primary to-accent",
  },
  {
    step: 2,
    title: "Challenge Cards",
    tagline: "Pick Challenge",
    description:
      "24 enterprise agentic challenges across six industry themes — filter by theme, then pick the one your breakout will build against.",
    icon: Images,
    path: "/challenge-cards",
    gradient: "from-accent to-primary",
  },
  {
    step: 3,
    title: "Prompts",
    tagline: "Run Prompt",
    description:
      "Double Diamond framework prompts for the GMS immersion. Copy and use with your preferred AI assistant.",
    icon: MessageSquare,
    path: "/prompts",
    gradient: "from-primary to-accent",
  },
];

const Index = () => {
  const navigate = useNavigate();

  // The landing page is sized to sit inside one viewport with no scrolling
  // from `sm` up — it's the first thing shown on a shared screen, so the
  // whole three-step journey has to be visible at once. Below `sm` the page
  // stays scrollable rather than clipping the stacked cards.
  return (
    <div className="min-h-dvh sm:h-dvh bg-background flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-8 overflow-x-hidden sm:overflow-hidden">
      <div className="max-w-6xl w-full animate-fade-in">
        {/* Logo header */}
        <div className="flex items-center justify-center mb-5 md:mb-7">
          <img src={tcsLogo} alt="TCS" className="h-5 md:h-6 w-auto" />
        </div>

        {/* Title block */}
        <div className="text-center mb-7 md:mb-9">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground mb-2.5 md:mb-3">
            GM AI Immersion Day
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Resources for the Growth Market Sales immersion — deep research context, 24 agentic challenge cards across six industry themes, and the Double Diamond prompts that turn one of them into a working pilot.
          </p>
        </div>

        {/* Linear process: numbered cards with connecting arrows */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-3 md:gap-2 w-full">
          {steps.map((section, idx) => (
            <div key={section.path} className="flex items-stretch md:flex-1 min-w-0">
              <button
                onClick={() => navigate(section.path)}
                className="group relative overflow-hidden rounded-xl bg-card border border-border p-4 md:p-5 text-left transition-all hover:shadow-lg hover:border-primary/40 hover:-translate-y-1 w-full flex flex-col min-w-0"
              >
                <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${section.gradient}`} />

                {/* Step badge */}
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold font-display text-sm shadow-md ring-4 ring-primary/10 shrink-0">
                      {section.step}
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground truncate">
                      Step {section.step} · {section.tagline}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                </div>

                {/* Icon + content */}
                <div className="flex flex-col gap-2.5 flex-1">
                  <div className="rounded-lg bg-primary/10 p-2 w-fit">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-semibold font-display text-card-foreground mb-1.5 group-hover:text-primary transition-colors">
                      {section.title}
                    </h2>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
              </button>

              {/* Connector arrow between cards (hidden after last card) */}
              {idx < steps.length - 1 && (
                <div className="flex items-center justify-center self-center shrink-0">
                  <div className="hidden md:flex items-center px-1">
                    <ChevronRight className="h-6 w-6 text-primary animate-pulse" />
                  </div>
                  <div className="md:hidden flex flex-col items-center py-0.5">
                    <ChevronRight className="h-5 w-5 text-primary rotate-90 animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Subtle footer tag */}
        <p className="text-center text-[10px] md:text-xs font-medium tracking-widest uppercase text-muted-foreground mt-6 md:mt-8">
          A guided three-step journey · Get Context → Pick Challenge → Run Prompt
        </p>
      </div>
    </div>
  );
};

export default Index;
