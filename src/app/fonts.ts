import { Bricolage_Grotesque, Geist } from "next/font/google";

/**
 * Display: Bricolage Grotesque. A characterful grotesk with real personality
 * at large sizes. Chosen because it ships through next/font/google, so there
 * are no font files to host. Cabinet Grotesk or Clash Grotesk (Fontshare) can
 * replace it later with next/font/local if you prefer them.
 */
export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
  weight: ["600", "700", "800"],
});

/** Body: Geist, clean and neutral so the display type does the talking. */
export const body = Geist({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});
