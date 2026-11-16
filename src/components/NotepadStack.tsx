import type { CSSProperties, ReactNode } from "react";
import { LoopVideo } from "@/components/LoopVideo";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export interface Notepad {
  title: string;
  /** Paper colour class, written out in full so Tailwind can see it. */
  paper: string;
  body: string;
}

interface NotepadStackProps {
  heading: ReactNode;
  notes: readonly Notepad[];
  videoLabel: string;
}

/**
 * Looping video on the left, a stack of square "notepad" cards on the right.
 * Each card sticks near the top and the next one slides over it.
 */
export function NotepadStack({
  heading,
  notes,
  videoLabel,
}: NotepadStackProps) {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:col-span-7 lg:self-start">
          <div className="inline-block border-2 border-cream px-7 py-5">
            <h2 className="font-display text-heading font-bold">{heading}</h2>
          </div>
          <LoopVideo
            src="/art/growth.mp4"
            poster="/art/growth-poster.webp"
            label={videoLabel}
            width={1344}
            height={768}
            className="mt-8 h-auto w-full max-w-2xl"
          />
        </Reveal>
        <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:pt-4">
          <ul className="flex flex-col gap-6 lg:gap-[12vh]">
            {notes.map((p, i) => (
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
  );
}
