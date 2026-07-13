import { useNavigate } from "react-router-dom";
import { FileText, MessageSquare, Images, ArrowRight } from "lucide-react";

const sections = [
  {
    title: "Challenge Cards",
    description: "Explore customer-specific challenges across six Finnish accounts — mapped to AI-driven opportunities for TCS delivery.",
    icon: Images,
    path: "/challenge-cards",
    gradient: "from-primary to-accent",
  },
  {
    title: "Deep Research Report",
    description: "Read the J&J Deep Research Document — background intelligence to ground your ideas during the immersion session.",
    icon: FileText,
    path: "/deep-research",
    gradient: "from-accent to-primary",
  },
  {
    title: "Prompts",
    description: "Double Diamond framework prompts tailored for TCS Finland accounts. Copy and use with your preferred AI assistant.",
    icon: MessageSquare,
    path: "/prompts",
    gradient: "from-primary to-accent",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full animate-fade-in">
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-3">
            TCS AI Advisory
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
            AI Immersion Day
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resources for the rapid build immersion session — challenge cards, frameworks, and prompts to turn abstract ideas into working AI demos.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {sections.map((section) => (
            <button
              key={section.path}
              onClick={() => navigate(section.path)}
              className="group relative overflow-hidden rounded-xl bg-card border border-border p-6 text-left transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 w-full md:w-[calc(33.333%-1rem)] max-w-sm"
            >
              <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${section.gradient}`} />
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold font-display text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
