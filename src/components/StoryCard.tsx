import Link from "next/link";
import type { Story } from "@/data/stories";
import { Slot } from "./Slot";

const toneBg = {
  orange: "bg-orange",
  blue: "bg-blue",
  pink: "bg-pink",
} as const;

interface StoryCardProps {
  story: Story;
  /** Heading level for the title. Use h2 when the card sits directly under the page h1. */
  headingLevel?: "h2" | "h3";
  className?: string;
}

/**
 * Large story tile. The visual sits on a block of the story colour. On hover
 * the number tag fills.
 */
export function StoryCard({
  story,
  headingLevel: Heading = "h3",
  className = "",
}: StoryCardProps) {
  return (
    <Link
      href={`/work/${story.slug}`}
      className={`group block ${className}`.trim()}
    >
      <div className={`${toneBg[story.tone]} on-light p-6 text-night md:p-10`}>
        <Slot label="a key visual" className="aspect-[16/10]">
          An image, a frame or a pull quote that carries the story.
        </Slot>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="rounded-pill border-2 border-cream px-3 py-1.5 text-eyebrow font-semibold tracking-[0.12em] uppercase transition-colors group-hover:border-orange group-hover:bg-orange group-hover:text-night">
          Story {story.n}
        </span>
      </div>
      <Heading className="mt-3 font-display text-heading font-bold">
        {story.title}
      </Heading>
      <p className="mt-2 max-w-md text-muted">{story.summary}</p>
    </Link>
  );
}
