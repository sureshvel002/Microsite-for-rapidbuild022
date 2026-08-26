import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Layers, MapPin, Users } from "lucide-react";
import tcsLogo from "@/assets/TCS Co Logo SVG.svg";
import afmWheel from "@/assets/afm-wheel.svg";
import {
  COMPANIES,
  COMPANY_SECTIONS,
  companyPath,
  type AfmCompany,
} from "@/data/afm";
import { readableTextOn } from "@/lib/brand";

// ─────────────────────────────────────────────────────────────────────────────
// Step 0 of the immersion: find your company and open its pack.
//
// Every company in the family is a tile, and each tile carries what a
// stakeholder needs to recognise their own business without clicking or
// hovering anything: name, sector, what it is, its scale, and who the pack was
// written for. All ten fit one screen. Hovering floods a tile in its own brand
// colour; clicking washes that colour over the page as its journey opens.
// ─────────────────────────────────────────────────────────────────────────────

interface Launch {
  color: string;
  name: string;
  x: number;
  y: number;
}

const CompanyChooser = () => {
  const navigate = useNavigate();
  const [launch, setLaunch] = useState<Launch | null>(null);

  const totalCards = useMemo(
    () => COMPANIES.reduce((sum, c) => sum + c.challenges.length, 0),
    []
  );

  const handleChoose = (company: AfmCompany, el: HTMLElement) => {
    if (launch) return; // a wash is already running
    const rect = el.getBoundingClientRect();
    setLaunch({
      color: company.brand.primary,
      name: company.name,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    window.setTimeout(() => navigate(companyPath(company.id)), 430);
  };

  // Running index across both sections, so the entrance stagger reads as one
  // sequence down the page rather than restarting per section.
  let tileIndex = -1;

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <header className="relative shrink-0 overflow-hidden border-b border-border bg-gradient-to-br from-afm-blue/[0.09] via-background to-afm-orange/[0.05]">
        <AfmWaves />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 pt-5 pb-10">
          <div className="flex items-center justify-between gap-6 mb-3.5">
            <AfmMark />
            <img src={tcsLogo} alt="TCS" className="h-5 md:h-6 w-auto" />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-afm-blue animate-fade-up">
                Everyone in Everything
                <span className="h-px w-10 bg-afm-orange" />
              </p>
              <h1 className="mt-1.5 font-display text-[28px] md:text-[42px] font-bold leading-[1.08] text-foreground animate-fade-up [animation-delay:60ms]">
                Association Familiale Mulliez
                <span className="ml-2 text-afm-blue">AI Immersion</span>
              </h1>
              <p className="mt-3 max-w-3xl text-base text-muted-foreground leading-relaxed animate-fade-up [animation-delay:120ms]">
                A family of autonomous companies — 150 businesses, 62 countries,
                615,000 people. Each company in this pack has its own deep
                research report and its own challenge cards, so start by
                choosing the one you are working with.
              </p>
            </div>

            <div className="flex shrink-0 gap-2.5 animate-fade-up [animation-delay:180ms]">
              <Stat icon={Users} value={String(COMPANIES.length)} label="companies" />
              <Stat icon={Layers} value={String(totalCards)} label="challenge cards" />
              <Stat icon={MapPin} value="150 / 62" label="businesses / countries" />
            </div>
          </div>
        </div>
      </header>

      {/* ── All ten companies ───────────────────────────────────────────── */}
      <main className="flex flex-1 flex-col max-w-[1400px] w-full mx-auto px-4 sm:px-6 py-5">
        {COMPANY_SECTIONS.map((section) => (
          <section key={section.id} className="mb-6 last:mb-3">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
              <h2 className="flex items-center gap-2 text-base font-bold font-display text-foreground">
                <span className="h-1 w-1 rounded-full bg-afm-orange" />
                {section.label}
              </h2>
              <p className="text-xs text-muted-foreground">{section.blurb}</p>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {section.companies.map((company) => {
                tileIndex += 1;
                return (
                  <CompanyTile
                    key={company.id}
                    company={company}
                    delayMs={120 + tileIndex * 45}
                    onChoose={handleChoose}
                  />
                );
              })}
            </div>
          </section>
        ))}

        <p className="text-center text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
          TCS AI Advisory · Choose company → Get context → Pick challenge → Run
          prompt
        </p>
      </main>

      {launch && <BrandWash {...launch} />}
    </div>
  );
};

// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —
// Tile — everything a stakeholder needs to recognise their company, visible
// without hovering. The brand colour arrives on hover, the copy stays put.
// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —

interface CompanyTileProps {
  company: AfmCompany;
  delayMs: number;
  onChoose: (company: AfmCompany, el: HTMLElement) => void;
}

function CompanyTile({ company, delayMs, onChoose }: CompanyTileProps) {
  const { primary, secondary } = company.brand;
  const ink = readableTextOn(primary);
  // Light brands (Leroy Merlin green, Boulanger orange, Skillberg gold) read
  // with dark ink, so their flood stays inside the brand hue instead of fading
  // into a dark secondary the text would disappear against.
  const flood =
    ink === "#FFFFFF"
      ? `linear-gradient(160deg, ${primary} 0%, ${secondary} 150%)`
      : `linear-gradient(160deg, ${primary} 0%, ${primary}D9 150%)`;

  return (
    <button
      type="button"
      onClick={(e) => onChoose(company, e.currentTarget)}
      title={`${company.name} — ${company.oneLiner}`}
      style={
        {
          animationDelay: `${delayMs}ms`,
          "--tile-ink": ink,
          "--chip-bg": `${primary}14`,
          "--chip-fg": primary,
          // On the flood the chip inverts: ink background, brand-colour text.
          "--chip-on-flood": primary,
        } as React.CSSProperties
      }
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-all duration-300 animate-fade-up hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {/* Brand colour floods up from the base of the tile on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
        style={{ background: flood }}
      />
      {/* A light sweeps across once as the colour lands. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-white/25 opacity-0 group-hover:opacity-100 group-hover:animate-sheen"
      />
      {/* Brand hairline, always visible at rest. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1 transition-opacity duration-300 group-hover:opacity-0"
        style={{ background: primary }}
      />

      {/* Header: monogram, name, sector */}
      <div className="relative flex items-start gap-2.5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-display text-[11px] font-bold shadow-sm transition-all duration-300 group-hover:ring-2 group-hover:ring-white/50"
          style={{ background: primary, color: ink }}
        >
          {company.monogram}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-display text-[15px] font-bold leading-tight text-card-foreground transition-colors duration-300 group-hover:text-[color:var(--tile-ink)]">
            {company.name}
          </span>
          <span className="block truncate text-[9px] font-semibold uppercase tracking-wider text-muted-foreground transition-colors duration-300 group-hover:text-[color:var(--tile-ink)] group-hover:opacity-75">
            {company.sector}
          </span>
        </span>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[color:var(--tile-ink)]" />
      </div>

      {/* What it is */}
      <p className="relative mt-3 text-[11.5px] leading-[1.5] text-muted-foreground transition-colors duration-300 group-hover:text-[color:var(--tile-ink)] group-hover:opacity-90 line-clamp-3">
        {company.oneLiner}
      </p>

      {/* Scale */}
      <p className="relative mt-2.5 text-[10.5px] leading-[1.45] text-foreground/70 transition-colors duration-300 group-hover:text-[color:var(--tile-ink)] group-hover:opacity-80 line-clamp-3">
        {company.scale}
      </p>

      {/* Footer: who the pack is for, and how many cards it carries */}
      <div className="relative mt-auto pt-3">
        <div className="border-t border-border pt-2.5 transition-colors duration-300 group-hover:border-[color:var(--tile-ink)]/25">
          <p className="text-[10px] font-semibold leading-snug text-foreground/75 transition-colors duration-300 group-hover:text-[color:var(--tile-ink)] group-hover:opacity-90 line-clamp-2">
            Pack for: {company.preparedFor}
          </p>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[color:var(--chip-bg)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[color:var(--chip-fg)] transition-colors duration-300 group-hover:bg-[color:var(--tile-ink)] group-hover:text-[color:var(--chip-on-flood)]">
            <Layers className="h-2.5 w-2.5" />
            {company.challenges.length} challenge cards
          </span>
        </div>
      </div>
    </button>
  );
}

// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —
// Hero pieces
// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Users;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card/70 px-3 py-2 shadow-sm backdrop-blur">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-afm-blue" />
        <span className="font-display text-lg font-bold leading-none text-foreground">
          {value}
        </span>
      </div>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —
// Selection transition — the chosen brand colour expands from the tile and
// covers the page, then the router moves on.
// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —

function BrandWash({ color, name, x, y }: Launch) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setExpanded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Scale a 48px dot until it covers the furthest corner from the click point.
  const reach =
    typeof window === "undefined"
      ? 2000
      : Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );
  const scale = (reach * 2) / 48 + 1;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      <span
        className="absolute h-12 w-12 rounded-full transition-transform duration-[430ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{
          left: x,
          top: y,
          marginLeft: -24,
          marginTop: -24,
          background: color,
          transform: `scale(${expanded ? scale : 0})`,
        }}
      />
      <span
        className={`absolute inset-0 flex items-center justify-center font-display text-2xl font-bold transition-opacity duration-300 ${
          expanded ? "opacity-100 delay-200" : "opacity-0"
        }`}
        style={{ color: readableTextOn(color) }}
      >
        {name}
      </span>
    </div>
  );
}

// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —
// AFM chrome
// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —

/**
 * The AFM wheel from afm.family, sized to sit level with the TCS logo. The
 * source file is drawn in white for dark backgrounds; the copy in
 * `src/assets` carries AFM ocean blue so it reads on a light header.
 */
function AfmMark() {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={afmWheel}
        alt=""
        className="h-5 md:h-6 w-auto shrink-0 animate-pop-in"
      />
      <span className="font-display text-base md:text-lg font-bold tracking-wide text-foreground">
        AFM
      </span>
    </div>
  );
}

/** The curved wave motif AFM uses between sections, in blue and warm orange. */
function AfmWaves() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 animate-wave-drift"
    >
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="h-full w-[calc(100%+56px)]"
      >
        <defs>
          <linearGradient id="afm-wave-fade" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="hsl(var(--afm-blue))"
              stopOpacity="0.14"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--afm-blue))"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        <path
          d="M0 96 C 240 40 480 152 720 104 C 960 56 1200 128 1440 88 L1440 200 L0 200 Z"
          fill="url(#afm-wave-fade)"
        />
        <path
          d="M0 96 C 240 40 480 152 720 104 C 960 56 1200 128 1440 88"
          fill="none"
          stroke="hsl(var(--afm-blue))"
          strokeOpacity="0.3"
          strokeWidth="2"
        />
        <path
          d="M0 132 C 260 84 520 176 780 136 C 1040 96 1240 156 1440 126"
          fill="none"
          stroke="hsl(var(--afm-orange))"
          strokeOpacity="0.4"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export default CompanyChooser;
