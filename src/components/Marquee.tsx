import { Asterisk } from "@phosphor-icons/react/dist/ssr";

interface MarqueeProps {
  items: readonly string[];
}

function Row({ items, hidden = false }: MarqueeProps & { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center ${hidden ? "motion-reduce:hidden" : ""}`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 font-display text-display-md font-bold whitespace-nowrap">
            {item}
          </span>
          <Asterisk
            weight="bold"
            aria-hidden
            className="size-[0.9em] text-[clamp(2rem,1.4rem+3.8vw,5rem)]"
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * The one marquee on the site. Two identical rows slide left by half the
 * track width so the loop has no jump. Pauses on hover. With reduced motion it
 * stops, drops the duplicate row and scrolls by hand.
 */
export function Marquee({ items }: MarqueeProps) {
  return (
    <div
      className="group overflow-hidden motion-reduce:overflow-x-auto"
      role="region"
      aria-label="What I do"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Row items={items} />
        <Row items={items} hidden />
      </div>
    </div>
  );
}
