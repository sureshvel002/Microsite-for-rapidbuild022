import { BANNERS } from "./banners";
import { ECOSYSTEM } from "./ecosystem";
import type { AfmCompany } from "./types";

export type { AfmCompany, BrandTheme } from "./types";

/** Every company covered by a deep research report in this pack. */
export const COMPANIES: AfmCompany[] = [...BANNERS, ...ECOSYSTEM];

/**
 * The two sections of the chooser. Retail banners first — they are the names
 * people recognise — then the shared-capability companies around them.
 */
export const COMPANY_SECTIONS: {
  id: "banner" | "ecosystem";
  label: string;
  blurb: string;
  companies: AfmCompany[];
}[] = [
  {
    id: "banner",
    label: "Retail banners",
    blurb: "Consumer-facing companies of the family's retail portfolio.",
    companies: BANNERS,
  },
  {
    id: "ecosystem",
    label: "Ecosystem & shared capability",
    blurb:
      "The data, talent, software and purchasing companies that serve the banners.",
    companies: ECOSYSTEM,
  },
];

export function getCompany(id: string | undefined): AfmCompany | undefined {
  if (!id) return undefined;
  return COMPANIES.find((c) => c.id === id);
}

/** Route helpers — every company page lives below `/c/:companyId`. */
export const companyPath = (id: string, step?: string) =>
  step ? `/c/${id}/${step}` : `/c/${id}`;
