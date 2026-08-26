import { useEffect, useState } from "react";

// Schema mirrors the challenge cards carried in the AFM deep research reports.
// Each report closes with two cards in a fixed shape — the challenge, who
// feels it, why it persists, what solved looks like, the evidence base and an
// open question — and this interface is that shape, field for field. A card
// frames a *business outcome* for domain-advisor & consultant breakout
// discussion: it never names a solution, a tool, a vendor or a job title,
// because those are invented in the room.
//
// If you re-use this app for another client whose context pack has a
// different card shape, update this interface, the storage key, formatChallengeText,
// and the renderers in ChallengeCards.tsx + Prompts.tsx.
export interface ChallengeCard {
  number: string;        // "C1" / "C2" — stable id, scoped to its company
  companyId: string;     // owning company slug, e.g. "leroy-merlin"
  company: string;       // display name, also injected into the prompts
  theme: string;         // short label for the pill, e.g. "Shadow AI • Inventory"
  title: string;         // the card's own title
  summary: string;       // 1-line framing shown on the card tile
  challenge: string;     // "The challenge"
  whoFeelsIt: string;    // "Who feels it"
  whyItPersists: string; // "Why it persists"
  whatSolvedLooksLike: string; // "What solved looks like"
  evidenceBase: string;  // "Evidence base"
  openQuestion: string;  // "Open question"
}

// Selections are scoped per company, so moving between AFM companies never
// carries a stale card across. Bump the version suffix whenever the
// ChallengeCard interface above changes shape.
const STORAGE_VERSION = "v1";
const storageKey = (companyId: string) =>
  `selectedChallenge:afm:${companyId}:${STORAGE_VERSION}`;
const STORAGE_EVENT = "selectedChallenge:changed";

// Best-effort cleanup of keys from prior immersions / schemas so users don't
// leave orphan entries in localStorage.
const LEGACY_STORAGE_KEYS = [
  "selectedChallenge",
  "selectedChallenge:telia-finland",
  "selectedChallenge:telia-finland-v2",
  "selectedChallenge:telia-finland-v3",
  "selectedChallenge:telia-finland-v4",
  "selectedChallenge:boehringer-ingelheim-v1",
  "selectedChallenge:tcs-belgium-v1",
  "selectedChallenge:eneco-belgium-v1",
  "workshopTool:tcs-belgium-v1",
  "workshopTool:eneco-belgium-v1",
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
// which injects the card title alone. `number` and `companyId` are left out —
// they are ids, not content.
export function formatChallengeText(card: ChallengeCard): string {
  return [
    `Company: ${card.company}`,
    `Theme: ${card.theme}`,
    `Challenge: ${card.title}`,
    "",
    "The challenge:",
    card.challenge,
    "",
    "Who feels it:",
    card.whoFeelsIt,
    "",
    "Why it persists:",
    card.whyItPersists,
    "",
    "What solved looks like:",
    card.whatSolvedLooksLike,
    "",
    "Evidence base:",
    card.evidenceBase,
    "",
    "Open question:",
    card.openQuestion,
  ].join("\n");
}

// Validate a candidate object loosely matches the current ChallengeCard
// schema. Anything missing required fields is treated as stale and dropped.
function isValidChallenge(value: unknown): value is ChallengeCard {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  const required = [
    "number",
    "companyId",
    "company",
    "theme",
    "title",
    "summary",
    "challenge",
    "whoFeelsIt",
    "whyItPersists",
    "whatSolvedLooksLike",
    "evidenceBase",
    "openQuestion",
  ];
  return required.every((field) => typeof v[field] === "string");
}

export function getSelectedChallenge(companyId: string): ChallengeCard | null {
  if (typeof window === "undefined" || !companyId) return null;
  const key = storageKey(companyId);
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    // A card stored under one company must never surface under another.
    if (!isValidChallenge(parsed) || parsed.companyId !== companyId) {
      window.localStorage.removeItem(key);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function setSelectedChallenge(card: ChallengeCard): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(card.companyId), JSON.stringify(card));
  // Notify same-tab listeners (the native `storage` event only fires across tabs).
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
}

export function clearSelectedChallenge(companyId: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(storageKey(companyId));
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
}

export function useSelectedChallenge(
  companyId: string
): [ChallengeCard | null, (card: ChallengeCard) => void, () => void] {
  const [challenge, setChallenge] = useState<ChallengeCard | null>(() =>
    getSelectedChallenge(companyId)
  );

  useEffect(() => {
    setChallenge(getSelectedChallenge(companyId));

    const sync = () => setChallenge(getSelectedChallenge(companyId));
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey(companyId)) sync();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(STORAGE_EVENT, sync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(STORAGE_EVENT, sync);
    };
  }, [companyId]);

  return [
    challenge,
    (card: ChallengeCard) => {
      setSelectedChallenge(card);
      setChallenge(card);
    },
    () => {
      clearSelectedChallenge(companyId);
      setChallenge(null);
    },
  ];
}
