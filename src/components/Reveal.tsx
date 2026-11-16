"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
}

/** Light slide-and-fade when scrolled into view. Plain div if motion is reduced. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

interface RevealLinesProps {
  lines: ReactNode[];
  /** Heading tag. Defaults to h1. */
  as?: "h1" | "h2";
  className?: string;
}

/**
 * Headline that reveals one line at a time on load. Each line sits in a
 * masked box with extra bottom room so descenders are never clipped.
 */
export function RevealLines({
  lines,
  as: Tag = "h1",
  className,
}: RevealLinesProps) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="-mb-[0.14em] block overflow-hidden pb-[0.14em]"
        >
          {reduce ? (
            <span className="block">{line}</span>
          ) : (
            <m.span
              className="block"
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.14 }}
            >
              {line}
            </m.span>
          )}
        </span>
      ))}
    </Tag>
  );
}
