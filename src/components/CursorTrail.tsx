"use client";

import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Cutout objects (web-sized WebP with transparency). Width and height are the file's own. */
const OBJECTS = [
  { src: "/art/objects/blue-lobster.webp", w: 503, h: 512 },
  { src: "/art/objects/lucky-cat.webp", w: 391, h: 512 },
  { src: "/art/objects/egg.webp", w: 512, h: 501 },
  { src: "/art/objects/pickle-cake.webp", w: 512, h: 434 },
  { src: "/art/objects/brain.webp", w: 512, h: 462 },
  { src: "/art/objects/lipstick.webp", w: 511, h: 512 },
] as const;

interface Piece {
  id: number;
  x: number;
  y: number;
  rot: number;
  size: number;
  obj: number;
}

/** Pixels the cursor must travel before the next object is dropped. */
const SPACING = 190;
/** Never drop faster than this, in ms. */
const MIN_GAP = 90;
/** How long an object stays before it pops away, in ms. */
const LIFETIME = 1300;
/** At most this many are on screen at once. */
const MAX_ON_SCREEN = 9;

/**
 * Objects pop out wherever the mouse moves over the parent section, one after
 * another through the whole set, then pop away. Decorative only: hidden from
 * assistive tech, never blocks clicks, mouse only, and off for reduced motion.
 * The parent must be positioned (relative) and should clip overflow.
 */
export function CursorTrail() {
  const reduce = useReducedMotion();
  const host = useRef<HTMLDivElement>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (reduce) return;
    const section = host.current?.parentElement;
    if (!section) return;

    let last = { x: -9999, y: -9999, t: 0 };
    let count = 0;
    let nextId = 0;
    let preloaded = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse" || !section) return;

      // Fetch every image once, on the first movement, so none pop in late.
      if (!preloaded) {
        preloaded = true;
        OBJECTS.forEach((o) => {
          const img = new window.Image();
          img.src = o.src;
        });
      }

      const r = section.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const now = performance.now();
      if (Math.hypot(x - last.x, y - last.y) < SPACING) return;
      if (now - last.t < MIN_GAP) return;
      last = { x, y, t: now };

      const piece: Piece = {
        id: nextId++,
        x,
        y,
        rot: Math.random() * 30 - 15,
        size: 150 + Math.random() * 80,
        obj: count++ % OBJECTS.length,
      };
      setPieces((p) => [...p.slice(-(MAX_ON_SCREEN - 1)), piece]);

      const timer = setTimeout(() => {
        setPieces((p) => p.filter((q) => q.id !== piece.id));
        timers.delete(timer);
      }, LIFETIME);
      timers.add(timer);
    }

    section.addEventListener("pointermove", onMove);
    return () => {
      section.removeEventListener("pointermove", onMove);
      timers.forEach(clearTimeout);
    };
  }, [reduce]);

  return (
    <div
      ref={host}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
    >
      <AnimatePresence>
        {pieces.map((p) => {
          const o = OBJECTS[p.obj];
          return (
            <m.div
              key={p.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                filter: "drop-shadow(0 14px 16px rgb(0 0 0 / 0.35))",
              }}
              initial={{ scale: 0.25, opacity: 0, rotate: p.rot - 28 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: p.rot,
                transition: { type: "spring", stiffness: 380, damping: 15 },
              }}
              exit={{
                scale: 0.45,
                opacity: 0,
                y: -34,
                rotate: p.rot + 22,
                transition: { duration: 0.3 },
              }}
            >
              <Image
                src={o.src}
                alt=""
                width={o.w}
                height={o.h}
                unoptimized
                draggable={false}
                className="h-auto w-full select-none"
              />
            </m.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
