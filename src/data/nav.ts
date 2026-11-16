export interface NavItem {
  label: string;
  href: string;
  /** Blob colour classes when the item is not the current page. */
  chip: string;
  /** Resting tilt in degrees, straightens on hover. */
  tilt: number;
}

/**
 * Order matches the site map. Chip colours are written out in full so
 * Tailwind can see them. All pairs are checked in tokens.css. Tilts alternate
 * direction and vary in size so the stack looks hand-placed.
 */
export const navItems: readonly NavItem[] = [
  { label: "Home", href: "/", chip: "bg-cream text-night", tilt: -2.5 },
  {
    label: "Perspective",
    href: "/perspective",
    chip: "bg-blue text-night",
    tilt: 1.5,
  },
  { label: "Work", href: "/work", chip: "bg-ochre text-night", tilt: -2 },
  {
    label: "Approach",
    href: "/approach",
    chip: "bg-forest text-cream",
    tilt: 3.5,
  },
  { label: "About", href: "/about", chip: "bg-pink text-night", tilt: 2 },
  {
    label: "Contact",
    href: "/contact",
    chip: "bg-orange text-night",
    tilt: -3,
  },
];

export const legalLinks = [{ label: "Privacy", href: "/privacy" }] as const;
