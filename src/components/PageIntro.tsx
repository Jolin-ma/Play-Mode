import type { ReactNode } from "react";
import { CursorTrail } from "./CursorTrail";
import { Eyebrow } from "./Eyebrow";
import { RevealLines } from "./Reveal";
import { Section } from "./Section";

interface PageIntroProps {
  eyebrow: string;
  /** Headline, one entry per line. Revealed line by line on load. */
  lines: ReactNode[];
  lead?: string;
  /** Extra content under the lead, such as jump links. */
  children?: ReactNode;
}

/** Opening block for an inner page. Holds the page's single h1. */
export function PageIntro({ eyebrow, lines, lead, children }: PageIntroProps) {
  return (
    <Section className="relative pt-16 md:pt-24">
      <Eyebrow className="text-muted">{eyebrow}</Eyebrow>
      <RevealLines
        className="mt-5 font-display text-display-lg font-bold"
        lines={lines}
      />
      {lead ? (
        <p className="mt-8 max-w-2xl text-lead text-muted">{lead}</p>
      ) : null}
      {children}
      {/* Objects pop out wherever the mouse moves over the intro. */}
      <CursorTrail />
    </Section>
  );
}
