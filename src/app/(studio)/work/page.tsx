import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { StoryCard } from "@/components/StoryCard";
import { stories } from "@/data/stories";

export const metadata: Metadata = {
  alternates: { canonical: "/work" },
  title: "Work",
  description:
    "Stories of a cultural or creative shift, the insight behind it and what it became.",
};

export default function WorkPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Work"
        lines={["Ideas,", "put to work."]}
        lead="Each story starts with a shift worth noticing, and follows it to something a brand can use."
      />

      <Section className="pt-0 md:pt-0">
        <div className="grid gap-y-20 lg:grid-cols-12">
          {stories.map((s, i) => (
            <Reveal
              key={s.slug}
              className={
                i % 2 === 0 ? "lg:col-span-9" : "lg:col-span-9 lg:col-start-4"
              }
            >
              <StoryCard story={s} headingLevel="h2" />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        tone="orange"
        headline="Have a shift of your own?"
        body="Tell me what you are noticing, and we can work out the story together."
      />
    </main>
  );
}
