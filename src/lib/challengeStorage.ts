import { useEffect, useState } from "react";

/** Difficulty / build-signal styling for a card's chip row. */
export type ChallengeChipKind = "med" | "hard" | "build" | "plain";

export interface ChallengeChip {
  label: string; // e.g. "Medium", "Tier 1", "Build candidate"
  kind: ChallengeChipKind;
}

// Schema mirrors the GMS (Growth Market Sales) Enterprise Agentic AI
// challenge-card brief: each card frames an *agentic build candidate* for
// breakout discussion — the industry context, why it resists a naive
// solution, why an agentic decomposition fits, what success looks like, and
// the human sign-off gate that bounds it. Body text may carry `**bold**`
// emphasis markers, rendered inline by <RichText>.
//
// If you re-use this app for another brief with a different shape, update
// this interface, the storage key suffix, formatChallengeText, and the
// renderers in ChallengeCards.tsx + Prompts.tsx.
export interface ChallengeCard {
  number: string;              // e.g. "BFS1" — stable internal id (shown only as a list badge)
  themeId: string;             // e.g. "banking" — filter key
  theme: string;               // e.g. "Banking & Financial Services" — the industry domain
  focus: string;               // e.g. "Financial crime" — narrow lens within the theme
  title: string;               // the agent / capability being proposed
  summary: string;             // 1-line problem framing shown on the card tile
  chips: ChallengeChip[];      // difficulty, tier and build-signal labels
  context: string;             // the business situation as it stands today
  whyHard: string[];           // what makes it resist an off-the-shelf answer
  whyAgentic: string[];        // how the work decomposes across specialist agents
  successCriteria: string[];   // what "working" is measured as
  signOffGate: string;         // the explicit human approval boundary
  /**
   * Controls how this challenge is injected into the Widen-step prompt
   * when selected. Defaults to "title" (only the card title is injected).
   * Set to "full" for cards that benefit from the entire structured block
   * (theme, context, why hard, why agentic, success, gate) being passed to
   * the AI verbatim.
   */
  injectionMode?: "title" | "full";
}

// Storage key includes a client + schema tag so stale selections are
// auto-invalidated whenever the data shape changes. Bump the suffix on
// each new client immersion *and* whenever the ChallengeCard interface
// above changes shape.
const STORAGE_KEY = "selectedChallenge:gms-v1";
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

/** Strips `**bold**` emphasis markers for plain-text output (clipboard, prompts). */
export function stripEmphasis(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1");
}

export function formatChallengeText(card: ChallengeCard): string {
  // Note: the internal `number` (e.g. "BFS1") is intentionally NOT rendered
  // into the output — it's an internal id only and should not surface in the
  // Widen-step prompt injection or in copy-to-clipboard text. Emphasis
  // markers are stripped so the text reads cleanly in a chat window.
  const bullets = (items: string[]) =>
    items.map((i) => `\u25CF ${stripEmphasis(i)}`);

  const lines = [
    `Industry theme: ${card.theme} \u2014 ${card.focus}`,
    `Challenge: ${card.title}`,
    `Signals: ${card.chips.map((c) => c.label).join(", ")}`,
    "",
    "Context:",
    stripEmphasis(card.context),
    "",
    "Why it's hard:",
    ...bullets(card.whyHard),
    "",
    "Why agentic AI:",
    ...bullets(card.whyAgentic),
    "",
    "Success criteria:",
    ...bullets(card.successCriteria),
    "",
    "Human sign-off gate:",
    stripEmphasis(card.signOffGate),
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
    typeof v.themeId === "string" &&
    typeof v.theme === "string" &&
    typeof v.focus === "string" &&
    typeof v.title === "string" &&
    typeof v.summary === "string" &&
    Array.isArray(v.chips) &&
    typeof v.context === "string" &&
    Array.isArray(v.whyHard) &&
    Array.isArray(v.whyAgentic) &&
    Array.isArray(v.successCriteria) &&
    typeof v.signOffGate === "string"
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
