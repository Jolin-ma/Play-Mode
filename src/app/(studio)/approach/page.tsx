import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Eyebrow } from "@/components/Eyebrow";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Slot } from "@/components/Slot";
import { approachStages } from "@/data/approach";

export const metadata: Metadata = {
  alternates: { canonical: "/approach" },
  title: "Approach",
  description:
    "How Play Mode thinks: noticing a shift, interpreting it, and translating it into something a brand can act on.",
};

const together = [
  { label: "how it starts", prompt: "How a conversation with a brand begins." },
  {
    label: "how we work through it",
    prompt: "What the thinking looks like day to day, and who is in the room.",
  },
  {
    label: "what you walk away with",
    prompt: "What a brand has in hand when the work is done.",
  },
] as const;

export default function ApproachPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Approach"
        lines={["How I think,", "step by step."]}
        lead="The thinking behind the work: how a hunch about a shift becomes a story a brand can act on."
      />

      {/* The three stages, big */}
      <Section className="pt-0 md:pt-0">
        <ol>
          {approachStages.map((s) => (
            <li
              key={s.n}
              className="border-t-[length:var(--rule-thick)] border-cream py-10 md:py-14"
            >
              <Reveal>
                <div className="grid gap-8 lg:grid-cols-12">
                  <p
                    aria-hidden
                    className="font-display text-display-xl font-bold text-orange lg:col-span-3"
                  >
                    {s.n}
                  </p>
                  <h2 className="font-display text-display-md font-bold lg:col-span-4">
                    {s.title}
                  </h2>
                  <div className="lg:col-span-4 lg:col-start-9">
                    <Slot label={s.title.toLowerCase()}>{s.slot}</Slot>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Working together */}
      <Section tone="orange">
        <Reveal>
          <Eyebrow>Working together</Eyebrow>
          <h2 className="mt-4 max-w-4xl font-display text-display-lg font-bold">
            What it is like.
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {together.map((t, i) => (
            <li key={t.label}>
              <Reveal delay={i * 0.08} className="h-full">
                <Slot label={t.label} className="h-full">
                  {t.prompt}
                </Slot>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        tone="pink"
        headline="Want to think something through?"
        body="Start with what you are noticing. I will bring the questions."
      />
    </main>
  );
}
