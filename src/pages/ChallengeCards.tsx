import { useEffect, useState } from "react";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type ChallengeCard,
  formatChallengeText,
  useSelectedChallenge,
} from "@/lib/challengeStorage";
import { companyPath, getCompany } from "@/data/afm";
import { readableInk, readableTextOn } from "@/lib/brand";

// Each AFM report closes with a small set of challenge cards. They sit in the
// left rail and the one being read fills the pane beside it, so the page holds
// to one screen and only the card body scrolls. Cards are business outcomes
// for breakout discussion, not solution briefs — nothing in them names a tool,
// a vendor or a job title.

const ChallengeCards = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const [searchParams] = useSearchParams();
  const company = getCompany(companyId);
  const [activeChallenge, selectChallenge, clearChallenge] =
    useSelectedChallenge(companyId ?? "");

  const cards = company?.challenges ?? [];
  // `?card=C2` (set when a card is opened from the home board) decides which
  // card is showing on arrival.
  const requestedCard = searchParams.get("card");
  const [viewingNumber, setViewingNumber] = useState<string | null>(
    requestedCard
  );
  const [copied, setCopied] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  // Default to the selected card if there is one, else the first.
  const viewing =
    cards.find((c) => c.number === viewingNumber) ??
    cards.find((c) => c.number === activeChallenge?.number) ??
    cards[0];

  useEffect(() => {
    setViewingNumber(requestedCard);
    setCopied(false);
  }, [companyId, requestedCard]);

  if (!company) return <Navigate to="/" replace />;

  const brand = company.brand.primary;
  const ink = readableTextOn(brand);
  // Labels and small type use a darkened brand so light brands stay readable.
  const label = readableInk(brand);

  const handleUse = (card: ChallengeCard) => {
    selectChallenge(card);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1800);
  };

  const handleCopy = async (card: ChallengeCard) => {
    await navigator.clipboard.writeText(formatChallengeText(card));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isSelected = activeChallenge?.number === viewing?.number;

  return (
    <div className="min-h-screen lg:h-screen bg-background flex flex-col lg:overflow-hidden">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="border-b border-border bg-card px-4 py-2 shrink-0">
        <div className="max-w-[1600px] mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(companyPath(company.id))}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-bold"
            style={{ background: brand, color: ink }}
          >
            {company.monogram}
          </span>
          <h1 className="text-base font-semibold font-display text-card-foreground truncate">
            {company.name} — Challenge Cards
          </h1>
          <span className="hidden xl:inline text-xs text-muted-foreground truncate">
            · {cards.length} business outcomes for breakout discussion, written
            for {company.preparedFor}
          </span>

          {activeChallenge && (
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-muted-foreground max-w-[260px]">
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
                className="h-7 text-xs hover:opacity-90"
                style={{ background: brand, color: ink }}
                onClick={() => navigate(companyPath(company.id, "prompts"))}
              >
                Go to Prompts
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* ── Rail + card body, both inside one screen ────────────────────── */}
      <div className="flex-1 min-h-0 max-w-[1600px] w-full mx-auto px-4 sm:px-5 py-3">
        <div className="h-full lg:grid lg:grid-cols-12 lg:gap-4">
          {/* Left rail: this company's cards */}
          <aside className="lg:col-span-4 xl:col-span-3 flex flex-col gap-2.5 mb-3 lg:mb-0 lg:min-h-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {cards.length} challenge cards · click to read
            </p>
            {cards.map((card, idx) => (
              <CardTile
                key={card.number}
                card={card}
                brand={brand}
                isViewing={viewing?.number === card.number}
                isActive={activeChallenge?.number === card.number}
                delayMs={60 + idx * 60}
                onClick={() => {
                  setViewingNumber(card.number);
                  setCopied(false);
                }}
              />
            ))}
            <div className="mt-auto hidden lg:block rounded-lg border border-dashed border-border bg-muted/30 p-3">
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Pick one card to anchor the Double Diamond prompts. The cards
                are drawn from the {company.name} deep research report and from
                evidence published since it was written.
              </p>
            </div>
          </aside>

          {/* Right: the card being read */}
          {viewing && (
            <section className="lg:col-span-8 xl:col-span-9 lg:h-full lg:min-h-0 lg:overflow-y-auto rounded-xl border border-border bg-card shadow-sm">
              {/* Action strip */}
              <div className="sticky top-0 z-10 flex flex-col gap-2 border-b border-border bg-card/95 px-5 py-2.5 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
                {isSelected ? (
                  <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-green-200 bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    Selected for your prompts
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-0.5 text-xs font-bold"
                    style={{ background: `${brand}1A`, color: label }}
                  >
                    <Sparkles className="h-3.5 w-3.5 shrink-0" />
                    Pick this challenge to anchor your prompts
                  </span>
                )}

                <div className="flex shrink-0 items-center gap-2">
                  {isSelected ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={clearChallenge}
                      >
                        Clear
                      </Button>
                      <Button
                        size="sm"
                        className="h-7 text-xs hover:opacity-90"
                        style={{ background: brand, color: ink }}
                        onClick={() =>
                          navigate(companyPath(company.id, "prompts"))
                        }
                      >
                        Go to Prompts
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      className="h-7 text-xs hover:opacity-90"
                      style={{
                        background: justSaved ? "#16a34a" : brand,
                        color: justSaved ? "#FFFFFF" : ink,
                      }}
                      onClick={() => handleUse(viewing)}
                    >
                      {justSaved ? (
                        <>
                          <Check className="h-3.5 w-3.5 mr-1" /> Saved
                        </>
                      ) : (
                        <>Use this Challenge</>
                      )}
                    </Button>
                  )}
                  <button
                    onClick={() => handleCopy(viewing)}
                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    title="Copy the full card"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Card body — two columns so the whole card reads in one view */}
              <div className="px-5 py-4">
                <p
                  className="text-[10px] font-bold uppercase tracking-wider mb-1"
                  style={{ color: label }}
                >
                  {viewing.theme}
                </p>
                <h2 className="text-xl md:text-2xl font-bold font-display text-card-foreground leading-snug mb-3">
                  {viewing.title}
                </h2>

                <div
                  className="mb-4 rounded-lg border-l-4 px-4 py-2.5"
                  style={{ borderColor: brand, background: `${brand}0D` }}
                >
                  <h3
                    className="text-[10px] font-bold uppercase tracking-wider mb-1"
                    style={{ color: label }}
                  >
                    The challenge
                  </h3>
                  <p className="text-sm text-card-foreground leading-relaxed">
                    {viewing.challenge}
                  </p>
                </div>

                <div className="grid gap-3.5 xl:grid-cols-2">
                  <Field label="Who feels it" brand={label}>
                    {viewing.whoFeelsIt}
                  </Field>
                  <Field label="Why it persists" brand={label}>
                    {viewing.whyItPersists}
                  </Field>
                  <Field label="What solved looks like" brand={label}>
                    {viewing.whatSolvedLooksLike}
                  </Field>
                  <Field label="Evidence base" brand={label}>
                    {viewing.evidenceBase}
                  </Field>
                </div>

                <div className="mt-4 rounded-lg border border-dashed border-afm-orange/50 bg-afm-orange/[0.06] px-4 py-2.5">
                  <h3 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-afm-orange mb-1">
                    <HelpCircle className="h-3.5 w-3.5" />
                    Open question for the room
                  </h3>
                  <p className="text-sm font-medium text-card-foreground leading-relaxed">
                    {viewing.openQuestion}
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —
// Subcomponents
// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —

interface CardTileProps {
  card: ChallengeCard;
  brand: string;
  isViewing: boolean;
  isActive: boolean;
  delayMs: number;
  onClick: () => void;
}

function CardTile({
  card,
  brand,
  isViewing,
  isActive,
  delayMs,
  onClick,
}: CardTileProps) {
  return (
    <button
      onClick={onClick}
      style={{
        animationDelay: `${delayMs}ms`,
        borderColor: isActive ? "#16a34a" : isViewing ? brand : undefined,
        background: isActive ? "#f0fdf4" : isViewing ? `${brand}08` : undefined,
      }}
      className={`group relative w-full overflow-hidden rounded-xl border bg-card pl-4 pr-3.5 py-3 text-left transition-all animate-fade-up ${
        isViewing || isActive
          ? "shadow-md"
          : "border-border hover:-translate-y-0.5 hover:shadow-md"
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-1"
        style={{
          background: isActive ? "#16a34a" : isViewing ? brand : "transparent",
        }}
      />

      <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
        <span
          className="inline-flex items-center justify-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold font-mono leading-none"
          style={
            isActive
              ? {
                  background: "#dcfce7",
                  color: "#15803d",
                  borderColor: "#bbf7d0",
                }
              : {
                  background: `${brand}14`,
                  color: readableInk(brand),
                  borderColor: `${brand}33`,
                }
          }
        >
          {card.number}
        </span>
        {isActive && (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
            <CheckCircle2 className="h-2.5 w-2.5 shrink-0" />
            Selected
          </span>
        )}
      </div>

      <h3 className="text-sm font-semibold font-display leading-snug text-card-foreground mb-1">
        {card.title}
      </h3>
      <p className="text-[11px] text-muted-foreground leading-snug line-clamp-3">
        {card.summary}
      </p>
      <p
        className="mt-1.5 text-[9px] font-bold uppercase tracking-wider leading-tight line-clamp-1"
        style={{ color: isActive ? "#15803d" : readableInk(brand) }}
      >
        {card.theme}
      </p>
    </button>
  );
}

function Field({
  label,
  brand,
  children,
}: {
  label: string;
  brand: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/25 p-3">
      <h3
        className="text-[10px] font-bold uppercase tracking-wider mb-1"
        style={{ color: brand }}
      >
        {label}
      </h3>
      <p className="text-xs text-card-foreground leading-relaxed">{children}</p>
    </div>
  );
}

export default ChallengeCards;
