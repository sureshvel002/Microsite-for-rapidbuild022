import { useEffect, useState } from "react";

// Schema mirrors the OP Pohjola prioritised challenge cards: each card frames
// a *business problem* for leadership breakout discussion — not a solution
// brief. If you re-use this app for another client whose context pack has a
// different shape, update this interface, the storage key suffix,
// formatChallengeText, and the renderers in ChallengeCards.tsx + Prompts.tsx.
export interface ChallengeCard {
  number: string;               // e.g. "C1" — stable internal id
  company: string;              // e.g. "OP Pohjola" — also injected into prompts
  theme: string;                // e.g. "Enterprise Technology & Transformation Risk"
  title: string;                // short problem framing
  summary: string;              // 1-line crisp description shown on card tile
  challengeStatement: string;   // the quoted business-problem statement
  whyNow: string;               // contextual paragraph: why this matters now
  baselineMetrics: string[];    // evidence bullets (sourced from the report)
  audienceFit: string;          // primary breakout audience
  crossFunctionalHooks: string; // adjacent stakeholders
  /** Short scanning label shown as a pill — e.g. the AI-addressability band. */
  kind?: string;
  /** Boundaries the room must design within (from the report's card). */
  constraints?: string[];
  /** Why one session can produce something real from this card. */
  whyGoodBuild?: string;
}

// Storage key includes a client + schema tag so stale selections are
// auto-invalidated whenever the data shape changes. Bump the suffix on
// each new client immersion *and* whenever the ChallengeCard interface
// above changes shape.
const STORAGE_KEY = "selectedChallenge:op-pohjola-v1";
const STORAGE_EVENT = "selectedChallenge:changed";

// Best-effort cleanup of legacy keys from prior immersions / schemas so
// users don't leave orphan entries in localStorage.
const LEGACY_STORAGE_KEYS = [
  "selectedChallenge",
  "selectedChallenge:telia-finland",
  "selectedChallenge:telia-finland-v2",
  "selectedChallenge:telia-finland-v3",
  "selectedChallenge:telia-finland-v4",
  "selectedChallenge:boehringer-ingelheim-v1",
  "selectedChallenge:tcs-belgium-v1",
  "selectedChallenge:eneco-belgium-v1",
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

// Full structured rendering of a card, used by the Copy button on the
// Challenge Cards page. It is deliberately NOT used by the Widen-step prompt,
// which injects the card title alone. The internal `number` and `company` are
// left out — they are ids, not content.
export function formatChallengeText(card: ChallengeCard): string {
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
  if (card.constraints?.length) {
    lines.push(
      "",
      "Constraints the room must respect:",
      ...card.constraints.map((c) => `\u25CF ${c}`)
    );
  }
  if (card.whyGoodBuild) {
    lines.push("", "Why this is a good build:", card.whyGoodBuild);
  }
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
