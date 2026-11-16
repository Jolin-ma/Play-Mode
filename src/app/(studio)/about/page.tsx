import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About",
  description:
    "Play Mode is a creative playground for ideas that want to become something. We start with stories, not formats.",
};

export default function AboutPage() {
  return (
    <main>
      <PageIntro
        eyebrow="About"
        lines={["A creative playground", "for ideas."]}
        lead="Play Mode is a creative playground for ideas that want to become something."
      />

      <Section tone="pink" className="on-light">
        <Reveal>
          <p className="max-w-5xl font-display text-[clamp(2rem,1.2rem+3.6vw,4.5rem)] leading-[1] font-extrabold tracking-[-0.035em]">
            We start with stories, not formats.
          </p>
          <p className="mt-10 max-w-2xl text-lead">
            Sometimes they become games. Sometimes interactive experiences.
            Sometimes something we haven&apos;t figured out yet.
          </p>
        </Reveal>
      </Section>
    </main>
  );
}
