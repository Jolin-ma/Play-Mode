import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Eyebrow } from "@/components/Eyebrow";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Slot } from "@/components/Slot";

export const metadata: Metadata = {
  alternates: { canonical: "/perspective" },
  title: "Perspective",
  description:
    "What Play Mode is noticing in culture and creativity, and what it means for brands.",
};

const beliefs = [
  "A belief about how brands should behave right now.",
  "A belief about what audiences have stopped caring about.",
  "A belief about where creative work is heading.",
] as const;

const notes = [
  {
    label: "a note",
    prompt: "A shift in culture, taste or behaviour you have noticed.",
  },
  {
    label: "a note",
    prompt: "Another observation, and why it caught your attention.",
  },
  {
    label: "a note",
    prompt: "A third, ideally from somewhere a brand would not usually look.",
  },
  {
    label: "a note",
    prompt: "A fourth. Notes can be a paragraph or a few lines.",
  },
] as const;

export default function PerspectivePage() {
  return (
    <main>
      <PageIntro
        eyebrow="Perspective"
        lines={["What I notice,", "and what it means."]}
        lead="A running record of the cultural and creative shifts worth paying attention to, and how they turn into opportunities for brands."
      />

      <Section tone="cream">
        <Reveal>
          <Eyebrow>What I believe</Eyebrow>
          <h2 className="mt-4 max-w-4xl font-display text-display-lg font-bold">
            A few things I will argue for.
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {beliefs.map((b, i) => (
            <li key={b}>
              <Reveal delay={i * 0.06} className="h-full">
                <Slot label="a belief" className="h-full">
                  {b}
                </Slot>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow className="text-muted">Notes</Eyebrow>
          <h2 className="mt-4 max-w-4xl font-display text-display-lg font-bold">
            Recently noticed.
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {notes.map((n, i) => (
            <li key={n.prompt}>
              <Reveal delay={i * 0.06} className="h-full">
                <Slot label={n.label} className="h-full">
                  {n.prompt}
                </Slot>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        tone="orange"
        headline="Seeing something similar?"
        body="Tell me what is shifting in your category. I am always curious."
      />
    </main>
  );
}
