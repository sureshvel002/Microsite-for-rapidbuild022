import { useEffect, useState } from "react";

// Schema mirrors the Telia Finland AI Immersion Day discovery brief: each
// card frames a *business problem* for breakout discussion (not a solution
// brief). If you re-use this app for another client whose discovery brief
// has a different shape, update this interface, the storage key suffix,
// formatChallengeText, and the renderers in ChallengeCards.tsx + Prompts.tsx.
export interface ChallengeCard {
  number: string;               // e.g. "CC03" — stable internal id (not shown in UI)
  company: string;              // e.g. "Telia Finland"
  theme: string;                // e.g. "Customer Care / Omnichannel"
  title: string;                // short problem framing
  summary: string;              // 1-line crisp description shown on card tile
  challengeStatement: string;   // the quoted business-problem statement
  whyNow: string;               // contextual paragraph: why this matters now
  baselineMetrics: string[];    // evidence bullets (sourced from brief)
  audienceFit: string;          // primary breakout audience
  crossFunctionalHooks: string; // adjacent stakeholders
  /**
   * Controls how this challenge is injected into the Widen-step prompt
   * when selected. Defaults to "title" (only the card title is injected).
   * Set to "full" for cards that benefit from the entire structured block
   * (theme, statement, why now, baseline metrics, audience, hooks) being
   * passed to the AI verbatim.
   */
  injectionMode?: "title" | "full";
}

// Storage key includes a client + schema tag so stale selections are
// auto-invalidated whenever the data shape changes. Bump the suffix on
// each new client immersion *and* whenever the ChallengeCard interface
// above changes shape.
const STORAGE_KEY = "selectedChallenge:telia-finland-v3";
const STORAGE_EVENT = "selectedChallenge:changed";

// Best-effort cleanup of legacy keys from prior immersions / schemas so
// users don't leave orphan entries in localStorage.
const LEGACY_STORAGE_KEYS = [
  "selectedChallenge",
  "selectedChallenge:telia-finland",
  "selectedChallenge:telia-finland-v2",
];

if (typeof window !== "undefined") {
  for (const legacyKey of LEGACY_STORAGE_KEYS) {
    try {
      window.localStorage.removeItem(legacyKey);
    } catch {
      // ignore (private mode, quota, etc.)
    }
  }
}

export function formatChallengeText(card: ChallengeCard): string {
  // Note: the internal `number` (e.g. "CC03") and `company` are intentionally
  // NOT rendered into the output — they're internal IDs only and should not
  // surface in the Widen-step prompt injection or in copy-to-clipboard text.
  const lines = [
    `Theme: ${card.theme}`,
    `Challenge: ${card.title}`,
    "",
    "Challenge statement:",
    `\u201C${card.challengeStatement}\u201D`,
    "",
    "Why now:",
    card.whyNow,
    "",
    "Baseline metrics / evidence:",
    ...card.baselineMetrics.map((m) => `\u25CF ${m}`),
    "",
    "Audience fit:",
    card.audienceFit,
    "",
    "Cross-functional hooks:",
    card.crossFunctionalHooks,
  ];
  return lines.join("\n");
}

// Validate a candidate object loosely matches the current ChallengeCard
// schema. Anything missing required fields is treated as stale and dropped.
function isValidChallenge(value: unknown): value is ChallengeCard {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.number === "string" &&
    typeof v.company === "string" &&
    typeof v.theme === "string" &&
    typeof v.title === "string" &&
    typeof v.summary === "string" &&
    typeof v.challengeStatement === "string" &&
    typeof v.whyNow === "string" &&
    Array.isArray(v.baselineMetrics) &&
    typeof v.audienceFit === "string" &&
    typeof v.crossFunctionalHooks === "string"
  );
}

export function getSelectedChallenge(): ChallengeCard | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!isValidChallenge(parsed)) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function setSelectedChallenge(card: ChallengeCard): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(card));
  // Notify same-tab listeners (the native `storage` event only fires across tabs).
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
}

export function clearSelectedChallenge(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
}

export function useSelectedChallenge(): [
  ChallengeCard | null,
  (card: ChallengeCard) => void,
  () => void
] {
  const [challenge, setChallenge] = useState<ChallengeCard | null>(() =>
    getSelectedChallenge()
  );

  useEffect(() => {
    const sync = () => setChallenge(getSelectedChallenge());

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) sync();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(STORAGE_EVENT, sync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(STORAGE_EVENT, sync);
    };
  }, []);

  return [
    challenge,
    (card: ChallengeCard) => {
      setSelectedChallenge(card);
      setChallenge(card);
    },
    () => {
      clearSelectedChallenge();
      setChallenge(null);
    },
  ];
}
