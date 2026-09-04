import { useState, useEffect, useMemo } from "react";
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
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RichText } from "@/components/RichText";
import { challenges, challengeThemes } from "@/lib/challengeData";
import {
  type ChallengeCard,
  type ChallengeChipKind,
  formatChallengeText,
  useSelectedChallenge,
} from "@/lib/challengeStorage";

const LG_BREAKPOINT = 1024;

// Sentinel theme id for "show every card". Kept distinct from the real
// theme ids in challengeData so it can never collide with one.
const ALL_THEMES = "all";

// Chip palette mirrors the source brief: green = medium difficulty,
// orange = hard, amber = flagged build candidate, neutral = metadata.
const CHIP_STYLES: Record<ChallengeChipKind, string> = {
  med: "bg-emerald-100 text-emerald-800 border-emerald-200",
  hard: "bg-orange-100 text-orange-800 border-orange-200",
  build: "bg-amber-100 text-amber-900 border-amber-300",
  plain: "bg-muted text-muted-foreground border-border",
};

const ChallengeCards = () => {
  const navigate = useNavigate();
  const [activeChallenge, selectChallenge, clearChallenge] =
    useSelectedChallenge();

  // Theme filter — participants land on "All themes" so nothing is hidden,
  // then narrow to their own industry domain.
  const [activeThemeId, setActiveThemeId] = useState<string>(ALL_THEMES);

  const visibleChallenges = useMemo(
    () =>
      activeThemeId === ALL_THEMES
        ? challenges
        : challenges.filter((c) => c.themeId === activeThemeId),
    [activeThemeId]
  );

  const themeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of challenges) counts[c.themeId] = (counts[c.themeId] ?? 0) + 1;
    return counts;
  }, []);

  // Right-pane preview (desktop split view). Defaults to the active
  // challenge if one is selected, otherwise the first card.
  const [viewing, setViewing] = useState<ChallengeCard>(
    () => activeChallenge ?? challenges[0]
  );
  // Modal popup is the mobile fallback for the same content.
  const [mobileOpen, setMobileOpen] = useState<ChallengeCard | null>(null);
  const [copied, setCopied] = useState(false);
  const [justSavedNumber, setJustSavedNumber] = useState<string | null>(null);

  // Keep the detail pane inside the current filter — narrowing to a theme
  // that doesn't contain the previewed card would otherwise leave a detail
  // pane with no corresponding row in the list.
  useEffect(() => {
    if (!visibleChallenges.some((c) => c.number === viewing.number)) {
      setViewing(visibleChallenges[0]);
    }
  }, [visibleChallenges, viewing.number]);

  const handleListItemClick = (card: ChallengeCard) => {
    setViewing(card);
    if (typeof window !== "undefined" && window.innerWidth < LG_BREAKPOINT) {
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

      {/* Theme filter — the primary way into 24 cards, and the first thing
          on the page. "All themes" stays first so no participant has to hunt
          for the full set. */}
      <ThemeFilter
        activeThemeId={activeThemeId}
        themeCounts={themeCounts}
        totalCount={challenges.length}
        onChange={setActiveThemeId}
      />

      {/* Split view — list + detail */}
      <div className="flex-1 px-4 sm:px-6 pb-6 max-w-[1600px] mx-auto w-full lg:min-h-0 lg:overflow-hidden mt-3">
        <div className="h-full lg:grid lg:grid-cols-12 lg:gap-5">
          {/* Left: scrollable list */}
          <aside className="lg:col-span-5 lg:h-full lg:overflow-y-auto lg:pr-1 space-y-2.5 mb-4 lg:mb-0">
            <div className="hidden lg:flex items-center justify-between sticky top-0 bg-background py-2 z-10 border-b border-border mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {visibleChallenges.length}{" "}
                {visibleChallenges.length === 1 ? "Challenge" : "Challenges"}
                {activeThemeId !== ALL_THEMES ? " in this theme" : ""}
              </span>
              <span className="text-[10px] text-muted-foreground">
                Click to preview · Use to anchor prompts
              </span>
            </div>
            {visibleChallenges.map((card, idx) => {
              const isActive = activeChallenge?.number === card.number;
              const isViewing = viewing.number === card.number;
              // When showing every theme, a group header keeps the long list
              // navigable without collapsing anything away.
              const showGroupHeader =
                activeThemeId === ALL_THEMES &&
                card.themeId !== visibleChallenges[idx - 1]?.themeId;
              return (
                <div key={card.number} className="space-y-2.5">
                  {showGroupHeader && (
                    <h2 className="pt-2 text-[11px] font-bold uppercase tracking-wider text-primary/80">
                      {card.theme}
                    </h2>
                  )}
                  <ListItem
                    card={card}
                    isActive={isActive}
                    isViewing={isViewing}
                    onClick={() => handleListItemClick(card)}
                  />
                </div>
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

interface ThemeFilterProps {
  activeThemeId: string;
  themeCounts: Record<string, number>;
  totalCount: number;
  onChange: (themeId: string) => void;
}

function ThemeFilter({
  activeThemeId,
  themeCounts,
  totalCount,
  onChange,
}: ThemeFilterProps) {
  // Segmented control on a single line at every screen size. Each pill is
  // `flex-1 min-w-fit`, so the seven options stretch to share the full
  // content width when there's room and hold their natural width when there
  // isn't — in which case the strip scrolls sideways inside its own border
  // rather than wrapping or truncating a label.
  return (
    <div className="px-4 sm:px-6 pt-3 max-w-[1600px] mx-auto w-full shrink-0">
      <div className="rounded-xl border border-border bg-card p-1.5 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-1.5">
          <FilterPill
            label="All themes"
            title={`Show all ${totalCount} challenges`}
            count={totalCount}
            isActive={activeThemeId === ALL_THEMES}
            onClick={() => onChange(ALL_THEMES)}
          />

          {challengeThemes.map((theme) => (
            <FilterPill
              key={theme.id}
              label={theme.short}
              title={theme.label}
              count={themeCounts[theme.id] ?? 0}
              isActive={activeThemeId === theme.id}
              onClick={() => onChange(theme.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface FilterPillProps {
  label: string;
  title: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

function FilterPill({
  label,
  title,
  count,
  isActive,
  onClick,
  className,
}: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      title={title}
      className={`group flex flex-1 min-w-fit items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-primary/[0.07] hover:text-primary"
      } ${className ?? ""}`}
    >
      <span>{label}</span>
      <span
        className={`shrink-0 rounded-full px-1.5 text-[10px] font-bold leading-tight tabular-nums ${
          isActive
            ? "bg-primary-foreground/20 text-primary-foreground"
            : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function ChipRow({
  chips,
  className,
}: {
  chips: ChallengeCard["chips"];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className ?? ""}`}>
      {chips.map((chip) => (
        <span
          key={chip.label}
          className={`inline-block rounded border px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider leading-tight ${
            CHIP_STYLES[chip.kind]
          }`}
        >
          {chip.label}
        </span>
      ))}
    </div>
  );
}

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
          {/* Header row: card-number tag + full Selected chip (when active) +
              focus pill. The tiny mono number chip is shown ONLY here in the
              list view — it's intentionally not included in the Widen-step
              prompt injection or the copy-to-clipboard text. */}
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            <span
              className={`inline-flex items-center justify-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold font-mono leading-none ${
                isActive
                  ? "bg-green-50 text-green-700 border-green-200"
                  : isViewing
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-muted text-muted-foreground border-border"
              }`}
              title={`Challenge ${card.number} · ${card.theme}`}
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
              {card.focus}
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
          <ChipRow chips={card.chips} className="mt-2.5" />
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
        {/* Theme · focus + Title */}
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
          {card.theme} · {card.focus}
        </p>
        <h2 className="text-2xl font-bold font-display text-card-foreground leading-snug mb-3">
          {card.title}
        </h2>

        <ChipRow chips={card.chips} className="mb-5" />

        {/* Highlighted context — the situation as it stands today */}
        <div className="mb-6 rounded-lg border-l-4 border-accent bg-accent/5 px-4 py-3">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1.5">
            Context
          </h3>
          <p className="text-sm text-card-foreground leading-relaxed">
            <RichText text={card.context} />
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6">
          <Section label="Why it's hard">
            <BulletList items={card.whyHard} />
          </Section>

          <Section label="Why agentic AI">
            <BulletList items={card.whyAgentic} />
          </Section>
        </div>

        <Section label="Success criteria">
          <BulletList items={card.successCriteria} />
        </Section>

        {/* Human sign-off gate — the boundary every card in the set carries. */}
        <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3">
          <h3 className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-900 mb-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            Human sign-off gate
          </h3>
          <p className="text-sm text-amber-950 leading-relaxed">
            <RichText text={card.signOffGate} />
          </p>
        </div>
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="text-sm text-muted-foreground leading-relaxed flex gap-2"
        >
          <span className="text-primary mt-0.5 shrink-0">●</span>
          <span>
            <RichText text={item} />
          </span>
        </li>
      ))}
    </ul>
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
