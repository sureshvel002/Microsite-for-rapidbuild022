import type { ChallengeCard } from "@/lib/challengeStorage";

/**
 * One company in the AFM (Association Familiale Mulliez) ecosystem, as covered
 * by a deep research report in `public/documents`.
 *
 * `brand.primary` drives that company's accent colour everywhere in the app —
 * the chooser tile, the transition wash, the step badges, and the brand-colour
 * instruction injected into the Step 5 (Build) prompt.
 */
export interface AfmCompany {
  /** URL slug. Appears in every route below `/c/`. */
  id: string;
  /** Display name, injected into the prompts as `[COMPANY]`. */
  name: string;
  /** Single initial or short monogram shown on the chooser tile. */
  monogram: string;
  /** Which section of the chooser this sits in. */
  group: "banner" | "ecosystem";
  /** Sector label, e.g. "Home improvement". */
  sector: string;
  /** The report's own "Prepared for" line — the attendee the pack was built for. */
  preparedFor: string;
  /** One sentence describing what the company is. */
  oneLiner: string;
  /** Scale line for the tile: revenue, estate, headcount. */
  scale: string;
  /** Ownership / holding context worth knowing before the room. */
  ownership: string;
  /** Path to the report under /public. */
  pdf: string;
  /** Filename used by the Download button. */
  pdfDownloadName: string;
  brand: BrandTheme;
  /** The challenge cards carried in that company's report. */
  challenges: ChallengeCard[];
}

export interface BrandTheme {
  /** Primary brand colour, hex. */
  primary: string;
  /** Secondary brand colour, hex — used for the tile's second gradient stop. */
  secondary: string;
  /**
   * `true` where the hex is corroborated by a published brand reference,
   * `false` where it is a close approximation chosen to read as the brand.
   * Approximations are safe to overwrite with the official value.
   */
  verified: boolean;
  /** The brand-colour sentence injected into the Step 5 (Build) prompt. */
  promptDescription: string;
}
