"use client";

import { useReducedMotion } from "motion/react";

interface LoopVideoProps {
  src: string;
  poster: string;
  /** Short description for screen readers. */
  label: string;
  width: number;
  height: number;
  className?: string;
}

/**
 * Silent, looping, decorative video. With reduced motion it shows the poster
 * frame only and never autoplays.
 */
export function LoopVideo({
  src,
  poster,
  label,
  width,
  height,
  className,
}: LoopVideoProps) {
  const reduce = useReducedMotion();
  return (
    <video
      src={src}
      poster={poster}
      aria-label={label}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload={reduce ? "none" : "metadata"}
      autoPlay={!reduce}
      className={className}
    />
  );
}
