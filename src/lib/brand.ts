// Brand colours in this pack run from Norauto's midnight blue to Leroy
// Merlin's lime green, so nothing can assume white text will be readable on
// top of one. These helpers pick the text colour from the background's actual
// luminance, which keeps every brand-filled chip, badge and button legible.

const DARK_INK = "#0B1220";
const LIGHT_INK = "#FFFFFF";

/** WCAG relative luminance of a `#rrggbb` colour, 0 (black) to 1 (white). */
export function relativeLuminance(hex: string): number {
  const value = hex.replace("#", "");
  if (value.length !== 6) return 0;
  const channels = [0, 2, 4].map((i) => {
    const srgb = parseInt(value.slice(i, i + 2), 16) / 255;
    return srgb <= 0.03928
      ? srgb / 12.92
      : Math.pow((srgb + 0.055) / 1.055, 2.4);
  });
  return (
    0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
  );
}

/**
 * Text colour to use on a solid brand background. The 0.3 cut-off is where
 * white stops beating near-black on the colours in this pack.
 */
export function readableTextOn(hex: string): string {
  return relativeLuminance(hex) > 0.3 ? DARK_INK : LIGHT_INK;
}

/** `#rrggbb` plus an alpha suffix, for tints of a brand colour. */
export function tint(hex: string, alpha: "08" | "0D" | "14" | "1A" | "33") {
  return `${hex}${alpha}`;
}

/**
 * A brand colour darkened just enough to carry small text on a light surface.
 *
 * Several brands in this pack (Leroy Merlin green, Boulanger orange, Skillberg
 * gold) sit near 2.5:1 against white, so labels set in the raw brand colour
 * are hard to read. This walks the colour down in even steps until it clears
 * the target contrast, which keeps the hue recognisable instead of falling
 * back to grey.
 */
export function readableInk(hex: string, minContrast = 4.5): string {
  const value = hex.replace("#", "");
  if (value.length !== 6) return hex;
  const rgb = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));

  const contrastOnWhite = (channels: number[]) => {
    const lum = relativeLuminance(
      "#" + channels.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")
    );
    return 1.05 / (lum + 0.05);
  };

  let scale = 1;
  while (scale > 0.15 && contrastOnWhite(rgb.map((c) => c * scale)) < minContrast) {
    scale -= 0.02;
  }
  return (
    "#" +
    rgb
      .map((c) => Math.round(c * scale).toString(16).padStart(2, "0"))
      .join("")
  );
}
