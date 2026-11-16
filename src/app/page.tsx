import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { LoopVideo } from "@/components/LoopVideo";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Slot } from "@/components/Slot";
import { approachStages } from "@/data/approach";
import { site } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: {
    absolute: "Creative strategy and storytelling studio | Play Mode",
  },
  description:
    "Play Mode is a creative strategy and storytelling studio in Oshawa, Ontario. A point of view on cultural and creative shifts, turned into opportunities for brands.",
};

const pillars = [
  {
    title: "Brandformance",
    paper: "bg-butter",
    body: "Too often, brand and performance are treated as separate things. I bring them together. One person, one clear direction, and creative work designed to build both your brand and your business.",
  },
  {
    title: "Strategy Sprint",
    paper: "bg-lilac",
    body: "A focused, five-week sprint that turns scattered thinking into a clear strategy and a direction everyone can move forward with.",
  },
  {
    title: "Applied AI",
    paper: "bg-pink",
    body: "AI speeds up the heavy lifting, from research and audits to first drafts and ongoing optimisation.",
  },
  {
    title: "People powered",
    paper: "bg-blue",
    body: "No handoffs. No disconnect between pitch and delivery. The person you meet from day one stays involved throughout, working alongside your marketing team to see the work through to results.",
  },
] as const;

/** Only facts that are true today. No logo, ratings, reviews or social links. */
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description:
    "A creative strategy and storytelling studio. A point of view on cultural and creative shifts, turned into opportunities for brands.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Oshawa",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  ...(site.email
    ? {
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "general enquiries",
          email: site.email,
        },
      }
    : {}),
};

const noticingPrompts = [
  "A shift you have noticed in culture, taste or behaviour, in a sentence or two.",
  "What that shift signals for how people relate to brands.",
  "The opportunity it opens up, stated as a point of view.",
] as const;

export default function Home() {
  return (
    <main>
      <JsonLd data={organization} />
      {/* 1. Hero (kept) */}
      <Hero />

      {/* 2. Positioning marquee, the only one on the site */}
      <Section tone="orange" compact className="!px-0 lg:!pl-0">
        <Marquee
          items={[
            "Creative strategy and storytelling, rooted in what is changing in culture.",
          ]}
        />
      </Section>

      {/* 3. The problem */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:col-span-7 lg:self-start">
            <div className="inline-block border-2 border-cream px-7 py-5">
              <h2 className="font-display text-heading font-bold">
                How I
                <br />
                accelerate growth
              </h2>
            </div>
            <LoopVideo
              src="/art/growth.mp4"
              poster="/art/growth-poster.webp"
              label="A short looping animation about growth."
              width={1344}
              height={768}
              className="mt-8 h-auto w-full max-w-2xl"
            />
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:pt-4">
            {/* Square cards: each sticks near the top, the next slides over it. */}
            <ul className="flex flex-col gap-6 lg:gap-[12vh]">
              {pillars.map((p, i) => (
                <li
                  key={p.title}
                  className={`on-light flex flex-col justify-start gap-3 border-2 border-night p-6 text-night shadow-[6px_6px_0_0_rgba(0,0,0,0.35)] lg:sticky lg:top-[calc(var(--header-height)+1.5rem+var(--i)*1.5rem)] lg:aspect-square lg:max-w-[28rem] ${p.paper}`}
                  style={{ "--i": i } as CSSProperties}
                >
                  <h3 className="font-display text-heading font-bold">
                    {p.title}
                  </h3>
                  <p className="text-[1.1875rem] leading-snug">{p.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 4. What I can do for you */}
      <Section tone="cream">
        <Reveal>
          <h2 className="text-left font-display text-heading font-bold">
            What I can do for you
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-14">
          <p className="max-w-5xl font-display text-[clamp(2.5rem,1.4rem+5.2vw,6rem)] leading-[0.98] font-extrabold tracking-[-0.04em] lg:max-w-none lg:text-[clamp(2rem,3.6vw,5.5rem)] lg:whitespace-nowrap">
            I make room for&nbsp;your brand&apos;s{" "}
            <span className="relative isolate inline-block px-[0.12em] before:absolute before:inset-[0.06em_-0.02em_0.02em_-0.02em] before:-z-10 before:rotate-[-2deg] before:bg-orange before:content-['']">
              next move.
            </span>
          </p>
          <p className="mt-8 max-w-2xl text-lead">
            See how strategy, creative thinking, and performance come together
            to move your business forward.
          </p>
        </Reveal>
      </Section>

      {/* 5. What I am noticing: structure only */}
      <Section>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow className="text-muted">Perspective</Eyebrow>
            <h2 className="mt-4 font-display text-display-lg font-bold">
              What I&apos;m noticing.
            </h2>
          </div>
          <Button href="/perspective" variant="text" arrow>
            All notes
          </Button>
        </Reveal>
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {noticingPrompts.map((prompt, i) => (
            <li key={prompt}>
              <Reveal delay={i * 0.08} className="h-full">
                <Slot label="a note" className="h-full">
                  {prompt}
                </Slot>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6. How I think: structure only */}
      <Section tone="blue">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>How I think</Eyebrow>
            <h2 className="mt-4 font-display text-display-lg font-bold">
              From a hunch to a story.
            </h2>
          </Reveal>
          <ol className="lg:col-span-6 lg:col-start-7">
            {approachStages.map((s, i) => (
              <li key={s.n}>
                <Reveal delay={i * 0.06}>
                  <div className="border-t-[length:var(--rule-thick)] border-night py-6">
                    <p className="font-display text-heading font-bold">
                      {s.n} {s.title}
                    </p>
                    <Slot label={s.title.toLowerCase()} className="mt-4">
                      {s.slot}
                    </Slot>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 7. Work: structure only */}
      <Section>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow className="text-muted">Work</Eyebrow>
            <h2 className="mt-4 font-display text-display-lg font-bold">
              Ideas, put to work.
            </h2>
          </div>
          <Button href="/work" variant="text" arrow>
            All work
          </Button>
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Slot label="a story" className="aspect-[16/10]">
              A piece of work: the shift behind it, the idea, and what it
              became. Label concept work as concept work.
            </Slot>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:mt-28">
            <Slot label="a story" className="aspect-[4/5]">
              A second piece of work, told the same way.
            </Slot>
          </Reveal>
        </div>
      </Section>

      {/* 8. Closing call to action */}
      <Section tone="orange">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Say hello</Eyebrow>
            <h2 className="mt-4 font-display text-display-lg font-bold">
              Something shifting for your brand?
            </h2>
          </Reveal>
          <Reveal
            delay={0.1}
            className="space-y-6 lg:col-span-5 lg:col-start-8 lg:pt-4"
          >
            <p className="text-lead">
              Tell me what you are seeing. We can work out together what it
              means.
            </p>
            <Button href={site.cta.href} variant="dark" arrow>
              {site.cta.label}
            </Button>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
