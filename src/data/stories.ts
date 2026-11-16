import type { SectionTone } from "@/components/Section";

/**
 * Structure only. Each story is a placeholder for a real piece of work:
 * the shift behind it, the insight, the idea and how it was told. Replace the
 * title and summary, then fill the Slots on the story page. Label any
 * concept work as concept work. No invented clients, results or numbers.
 */
export interface Story {
  slug: string;
  /** Shown as the story number, e.g. "01". */
  n: string;
  title: string;
  summary: string;
  /** Block colour used on cards and the detail page hero. */
  tone: Extract<SectionTone, "orange" | "blue" | "pink">;
}

export const stories: readonly Story[] = [
  {
    slug: "story-one",
    n: "01",
    title: "Untitled story 01",
    summary: "One sentence on the shift you noticed and what it became.",
    tone: "orange",
  },
  {
    slug: "story-two",
    n: "02",
    title: "Untitled story 02",
    summary: "One sentence on the shift you noticed and what it became.",
    tone: "blue",
  },
  {
    slug: "story-three",
    n: "03",
    title: "Untitled story 03",
    summary: "One sentence on the shift you noticed and what it became.",
    tone: "pink",
  },
];

export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}
