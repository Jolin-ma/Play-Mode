import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CtaBand } from "@/components/CtaBand";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, RevealLines } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Slot } from "@/components/Slot";
import { getStory, stories } from "@/data/stories";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.summary,
    alternates: { canonical: `/work/${story.slug}` },
  };
}

/** The closing band must not repeat the hero's colour. */
const ctaTone = { orange: "pink", blue: "orange", pink: "orange" } as const;

const beats = [
  {
    label: "the shift",
    title: "The shift",
    prompt: "What was changing in culture, taste or behaviour.",
  },
  {
    label: "the insight",
    title: "The insight",
    prompt: "What you understood about it that others had missed.",
  },
  {
    label: "the idea",
    title: "The idea",
    prompt: "The move, story or direction that came out of it.",
  },
] as const;

export default function StoryPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={null}>
      <StoryContent params={params} />
    </Suspense>
  );
}

async function StoryContent({
  params,
}: {
  params: PageProps<"/work/[slug]">["params"];
}) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const index = stories.findIndex((s) => s.slug === story.slug);
  const next = stories[(index + 1) % stories.length];

  return (
    <main>
      {/* Hero */}
      <Section tone={story.tone} className="pt-16 md:pt-20">
        <Eyebrow>Story {story.n}</Eyebrow>
        <RevealLines
          className="mt-6 font-display text-display-xl font-bold"
          lines={[story.title]}
        />
        <p className="mt-6 max-w-2xl text-lead">{story.summary}</p>

        <div className="mt-12">
          <Slot label="a key visual" className="aspect-[16/10]">
            The image, frame or film still that carries this story.
          </Slot>
        </div>
      </Section>

      {/* Shift, insight, idea */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          {beats.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08} className="h-full">
              <Eyebrow className="mb-4 text-muted">{b.title}</Eyebrow>
              <Slot label={b.label}>{b.prompt}</Slot>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How it was told */}
      <Section tone="cream">
        <Reveal>
          <Eyebrow>How it was told</Eyebrow>
          <h2 className="mt-4 max-w-4xl font-display text-display-lg font-bold">
            The story, in the work.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <Slot label="the work" className="aspect-[16/10]">
              Show the work itself: a campaign frame, a page, a film still.
            </Slot>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:mt-20">
            <Slot label="what happened">
              What it became, and what you learned. Only claim what is true.
            </Slot>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        tone={ctaTone[story.tone]}
        headline="Have a shift of your own?"
        body="Tell me what you are noticing, and we can work out the story together."
      />

      {/* Next story */}
      <Section compact>
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-wrap items-end justify-between gap-6"
        >
          <span>
            <Eyebrow className="text-muted">Next story</Eyebrow>
            <span className="mt-2 block font-display text-display-md font-bold">
              {next.title}
            </span>
          </span>
          <ArrowRight
            weight="bold"
            aria-hidden
            className="size-12 transition-transform duration-[var(--duration-hover)] group-hover:translate-x-2 motion-reduce:transition-none"
          />
        </Link>
      </Section>
    </main>
  );
}
