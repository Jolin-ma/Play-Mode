import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { NotepadStack, type Notepad } from "@/components/NotepadStack";
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
    </main>
  );
}
