import type { ElementType, ReactNode } from "react";

export type SectionTone = "night" | "orange" | "pink" | "blue" | "cream";

interface SectionProps {
  /** Full-bleed background colour. Text colour is chosen to pass AA. */
  tone?: SectionTone;
  as?: ElementType;
  id?: string;
  /** Drop the large vertical rhythm for tighter strips such as the marquee. */
  compact?: boolean;
  className?: string;
  children: ReactNode;
}

/** Tone to classes. Light tones also flip the focus ring (see globals.css). */
const tones: Record<SectionTone, string> = {
  night: "bg-night text-cream",
  orange: "bg-orange text-night on-light",
  pink: "bg-pink text-night on-light",
  blue: "bg-blue text-night on-light",
  cream: "bg-cream text-night on-light",
};

/**
 * Full-bleed band. The background runs edge to edge, content stays inside the
 * page gutter and clear of the pill nav rail on desktop.
 */
export function Section({
  tone = "night",
  as: Tag = "section",
  id,
  compact = false,
  className = "",
  children,
}: SectionProps) {
  const padding = compact ? "py-10" : "py-section";
  return (
    <Tag
      id={id}
      className={`scroll-mt-[var(--header-height)] ${tones[tone]} ${padding} px-gutter lg:pl-rail ${className}`.trim()}
    >
      <div className="mx-auto max-w-page">{children}</div>
    </Tag>
  );
}
