import { useNavigate } from "react-router-dom";
import { Download, Images, MessageSquare, ArrowRight, ChevronRight } from "lucide-react";
import tcsLogo from "@/assets/tata-consultancy-services-logo.png";
import teliaLogo from "@/assets/Telia Co Logo SVG.svg";

const steps = [
  {
    step: 1,
    title: "Context Pack",
    tagline: "Get Context",
    description:
      "Download the Telia Finland discovery brief — business model, market position, strategic priorities and competitive landscape.",
    icon: Download,
    path: "/deep-research",
    gradient: "from-primary to-accent",
  },
  {
    step: 2,
    title: "Challenge Cards",
    tagline: "Pick Challenge",
    description:
      "Explore the business problems extracted from the discovery brief — framed for mixed leadership / IT breakout discussions.",
    icon: Images,
    path: "/challenge-cards",
    gradient: "from-accent to-primary",
  },
  {
    step: 3,
    title: "Prompts",
    tagline: "Run Prompt",
    description:
      "Double Diamond framework prompts tailored for the Telia Finland immersion. Copy and use with your preferred AI assistant.",
    icon: MessageSquare,
    path: "/prompts",
    gradient: "from-primary to-accent",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 sm:px-6 py-12 overflow-x-hidden">
      <div className="max-w-6xl w-full animate-fade-in">
        {/* Logo header — identical bounding boxes so both logos render at the same visual size */}
        <div className="flex items-center justify-center gap-8 md:gap-12 mb-10">
          <div className="flex items-center justify-center h-14 md:h-16 w-40 md:w-48">
            <img
              src={tcsLogo}
              alt="TCS"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="h-12 md:h-14 w-px bg-border" aria-hidden="true" />
          <div className="flex items-center justify-center h-14 md:h-16 w-40 md:w-48">
            <img
              src={teliaLogo}
              alt="Telia Finland"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* Title block */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
            Telia Finland — AI Immersion Day
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resources for the Telia Finland immersion — discovery context, the Double Diamond framework, and prompts to turn business problems into AI-driven pilots.
          </p>
        </div>

        {/* Linear process: numbered cards with connecting arrows */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-5 md:gap-2 w-full">
          {steps.map((section, idx) => (
            <div key={section.path} className="flex items-stretch md:flex-1 min-w-0">
              <button
                onClick={() => navigate(section.path)}
                className="group relative overflow-hidden rounded-xl bg-card border border-border p-5 text-left transition-all hover:shadow-lg hover:border-primary/40 hover:-translate-y-1 w-full flex flex-col min-w-0"
              >
                <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${section.gradient}`} />

                {/* Step badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold font-display text-sm shadow-md ring-4 ring-primary/10 shrink-0">
                      {section.step}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground truncate">
                      Step {section.step} · {section.tagline}
                    </span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                </div>

                {/* Icon + content */}
                <div className="flex flex-col gap-3 flex-1">
                  <div className="rounded-lg bg-primary/10 p-2.5 w-fit">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold font-display text-card-foreground mb-2 group-hover:text-primary transition-colors">
                      {section.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
              </button>

              {/* Connector arrow between cards (hidden after last card) */}
              {idx < steps.length - 1 && (
                <div className="flex items-center justify-center self-center shrink-0">
                  <div className="hidden md:flex items-center px-1">
                    <ChevronRight className="h-7 w-7 text-primary animate-pulse" />
                  </div>
                  <div className="md:hidden flex flex-col items-center py-1">
                    <ChevronRight className="h-6 w-6 text-primary rotate-90 animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Subtle footer tag */}
        <p className="text-center text-xs font-medium tracking-widest uppercase text-muted-foreground mt-10">
          A guided three-step journey · Get Context → Pick Challenge → Run Prompt
        </p>
      </div>
    </div>
  );
};

export default Index;
