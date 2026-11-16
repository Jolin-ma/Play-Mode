import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { NotepadStack, type Notepad } from "@/components/NotepadStack";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { playHero } from "@/data/hero";
import { site } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: { absolute: `${site.name} | ${site.tagline}` },
  description: site.description,
};

const notes: readonly Notepad[] = [
  {
    title: "Start with a story",
    paper: "bg-butter",
    body: "Every project begins with an observation or a question worth exploring, not a brief and not a pitch.",
  },
  {
    title: "Then find the medium",
    paper: "bg-lilac",
    body: "Sometimes Unity. Sometimes a small interactive site, a 3D environment or a simulation. The story decides.",
  },
  {
    title: "Make it playable",
    paper: "bg-pink",
    body: "People experience the idea instead of reading about it. The project is the medium, and the story is the reason.",
  },
  {
    title: "Leave room to experiment",
    paper: "bg-blue",
    body: "No packages to sell. Things get made because there is something worth exploring, and some will not fit a category.",
  },
];

export default function Home() {
  return (
    <main>
      <Hero content={playHero} />
      <NotepadStack
        heading={
          <>
            How an idea becomes
            <br />
            something you can play
          </>
        }
        notes={notes}
        videoLabel="A short looping animation."
      />

      <Section tone="cream">
        <Reveal>
          <h2 className="text-left font-display text-heading font-bold">
            What happens here
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-14">
          <p className="max-w-5xl font-display text-[clamp(2.5rem,1.4rem+5.2vw,6rem)] leading-[0.98] font-extrabold tracking-[-0.04em] lg:max-w-none lg:text-[clamp(2rem,3.6vw,5.5rem)] lg:whitespace-nowrap">
            We make room for ideas{" "}
            <span className="relative isolate inline-block px-[0.12em] before:absolute before:inset-[0.06em_-0.02em_0.02em_-0.02em] before:-z-10 before:rotate-[-2deg] before:bg-orange before:content-['']">
              to play.
            </span>
          </p>
          <p className="mt-8 max-w-2xl text-lead">
            Stories become games, interactive experiences, or something we
            haven&apos;t figured out yet.
          </p>
        </Reveal>
      </Section>

      <Section tone="blue">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal
            delay={0.1}
            className="order-last lg:order-first lg:col-span-5"
          >
            {/* Frame turns oval on hover. The photo shrinks inside it so the oval never cuts off the arm. */}
            <div className="group max-w-[32rem] overflow-hidden rounded-none border-2 border-night bg-[#d2b8e7] shadow-[6px_6px_0_0_rgba(0,0,0,0.35)] transition-[border-radius] duration-500 ease-out hover:rounded-[50%] motion-reduce:transition-none">
              <Image
                src="/art/arm.png"
                alt="A flexed arm, the bicep wrapped in a glossy red sleeve, against a lilac background."
                width={832}
                height={842}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="block h-auto w-full origin-[90%_50%] transition-transform duration-500 ease-out group-hover:scale-[0.82] motion-reduce:transition-none"
              />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <p className="max-w-5xl font-display text-display-md font-bold">
              Explore the shifts shaping design and culture.
            </p>
            <p className="mt-6 max-w-5xl font-display text-display-md font-bold">
              Turn observations into ideas.
            </p>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
