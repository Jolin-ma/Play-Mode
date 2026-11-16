import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Eyebrow } from "@/components/Eyebrow";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Slot } from "@/components/Slot";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About the studio",
  description:
    "Play Mode is a creative strategy and storytelling studio in Oshawa, Ontario, run by one person with a point of view.",
};

const guides = [
  "A principle that shapes what you take on and what you turn down.",
  "A principle about how you work with the people in the room.",
  "A principle about what makes an idea worth acting on.",
] as const;

export default function AboutPage() {
  return (
    <main>
      <PageIntro
        eyebrow="About"
        lines={["One studio,", "one point of view."]}
        lead="Play Mode is a creative strategy and storytelling studio in Oshawa, Ontario, run by one person."
      />

      <Section className="pt-0 md:pt-0">
        <div className="grid items-start gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Slot label="a portrait" className="aspect-[4/5]">
              A photo of you, in a setting that says something about how you
              see. Replace this box with an image at public/about/photo.jpg.
            </Slot>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <Slot label="your story">
              A few honest sentences, in your own voice: where your curiosity
              comes from, and why you work on culture, creativity and brands.
            </Slot>
            <p className="mt-10 text-lead text-muted">
              Because it is just me, you talk to the person doing the thinking.
              There is no hand-off between a salesperson and a strategist.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="cream">
        <Reveal>
          <Eyebrow>What guides the work</Eyebrow>
          <h2 className="mt-4 max-w-4xl font-display text-display-lg font-bold">
            A few things I hold to.
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {guides.map((g, i) => (
            <li key={g}>
              <Reveal delay={i * 0.06} className="h-full">
                <Slot label="a principle" className="h-full">
                  {g}
                </Slot>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        tone="pink"
        headline="Let's talk about what is changing."
        body="A short conversation is a good way to see whether we fit."
      />
    </main>
  );
}
