"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface HeroSweepProps {
  /** Headline words, one array per line. */
  lines: readonly (readonly string[])[];
  /** Seconds before the highlight starts moving. */
  startDelay: number;
  /** Milliseconds between one word and the next. */
  step?: number;
  className?: string;
}

/**
 * Headline where a highlight hops from word to word and settles on the last
 * one, with the highlighted word turning dark so it stays readable. The active
 * word is state, so the colour change and the box movement stay in step.
 * With reduced motion it simply rests on the last word.
 */
export function HeroSweep({
  lines,
  startDelay,
  step = 520,
  className = "",
}: HeroSweepProps) {
  const reduce = useReducedMotion();
  const words = lines.flat();
  const last = words.length - 1;
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(reduce ? last : -1);
  const [box, setBox] = useState<Box | null>(null);

  useEffect(() => {
    const measure = (i: number): Box | null => {
      const el = refs.current[i];
      return el
        ? {
            x: el.offsetLeft,
            y: el.offsetTop,
            w: el.offsetWidth,
            h: el.offsetHeight,
          }
        : null;
    };

    if (reduce) {
      const id = setTimeout(() => setBox(measure(last)), 0);
      return () => clearTimeout(id);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    words.forEach((_, i) => {
      timers.push(
        setTimeout(
          () => {
            setActive(i);
            setBox(measure(i));
          },
          startDelay * 1000 + i * step,
        ),
      );
    });
    return () => timers.forEach(clearTimeout);
    // The words never change for a given scene.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, startDelay, step]);

  // Index of each line's first word, so words can be numbered without mutation.
  const starts = lines.map((_, li) =>
    lines.slice(0, li).reduce((sum, l) => sum + l.length, 0),
  );
  return (
    <span className={`relative isolate block ${className}`}>
      {box ? (
        <m.span
          aria-hidden
          className="absolute top-0 left-0 -z-10 rounded-[0.12em] bg-butter"
          initial={{
            x: box.x,
            y: box.y,
            width: box.w,
            height: box.h,
            opacity: 0,
          }}
          animate={{
            x: box.x,
            y: box.y,
            width: box.w,
            height: box.h,
            opacity: 1,
          }}
          transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
        />
      ) : null}
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((word, wi) => {
            const i = starts[li] + wi;
            return (
              <span key={wi}>
                <span
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className={`inline-block px-[0.08em] transition-colors duration-300 ${
                    active === i ? "text-night" : ""
                  }`}
                >
                  {word}
                </span>
                {wi < line.length - 1 ? " " : null}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
