import { useEffect, useState } from "react";

export interface ChallengeCard {
  number: string;
  company: string;
  title: string;
  context: string[];
  coreChallenge: string;
  tension: string;
  opportunityAngle: string;
  successMetrics: string[];
}

const STORAGE_KEY = "selectedChallenge";
const STORAGE_EVENT = "selectedChallenge:changed";

export function formatChallengeText(card: ChallengeCard): string {
  const lines = [
    `${card.company}`,
    `Challenge Card: "${card.title}"`,
    "",
    "Context:",
    ...card.context.map((c) => `\u25CF ${c}`),
    "",
    "Core Challenge:",
    card.coreChallenge,
    "",
    "Tension:",
    card.tension,
    "",
    "Opportunity Angle:",
    card.opportunityAngle,
    "",
    "Success Metrics:",
    ...card.successMetrics.map((m) => `\u25CF ${m}`),
  ];
  return lines.join("\n");
}

export function getSelectedChallenge(): ChallengeCard | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ChallengeCard;
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
