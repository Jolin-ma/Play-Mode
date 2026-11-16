"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { Pause, Play } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Button } from "./Button";
import { CursorTrail } from "./CursorTrail";
import { HeroSweep } from "./HeroSweep";
import { site } from "@/data/site";
import { studioHero, type HeroContent } from "@/data/hero";

const EASE = [0.16, 1, 0.3, 1] as const;

const C = {
  night: "#201e1f",
  cream: "#f4efe8",
  orange: "#fc4109",
  pink: "#ffabc8",
} as const;

/** First-load order, in seconds: backgrounds, then headline, then copy. */
const T = {
  headline: 0.35,
  headlineStep: 0.09,
} as const;

interface Scene {
  id: "orange" | "pink" | "night";
  /** How long the scene rests before the next one, in ms. */
  ms: number;
  bg: string;
  /** Headline colour. */
  head: string;
  /** Small text and control colour (must pass AA on the background). */
  fg: string;
  /** Slab geometry as % of the stage (desktop). */
  slab: { l: string; w: string; t: string; b: string };
  pinkTab: boolean;
}

const SCENES: readonly Scene[] = [
  {
    id: "orange",
    ms: 6200,
    bg: C.orange,
    head: C.cream,
    fg: C.night,
    slab: { l: "4%", w: "92%", t: "6%", b: "2%" },
    pinkTab: true,
  },
  {
    id: "pink",
    ms: 4800,
    bg: C.pink,
    head: C.night,
    fg: C.night,
    slab: { l: "10%", w: "80%", t: "2%", b: "0%" },
    pinkTab: false,
  },
  {
    id: "night",
    ms: 6600,
    bg: C.night,
    head: C.cream,
    fg: C.cream,
    slab: { l: "4%", w: "86%", t: "6%", b: "2%" },
    pinkTab: false,
  },
];

const varStyle = (vars: Record<string, string>) => vars as CSSProperties;

/** Scene text: headline lines rise in, then the supporting line. */
function SceneText({
  scene,
  content,
  intro,
  reduce,
}: {
  scene: Scene;
  content: HeroContent;
  intro: boolean;
  reduce: boolean | null;
}) {
  const base = intro ? T.headline : 0.3;
  const rise = (i: number) => ({
    initial: reduce ? (false as const) : { opacity: 0, y: 44 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay: base + i * T.headlineStep },
  });
  // The desktop size follows both width and height so it never overflows the slab.
  const head =
    "font-display max-w-[11ch] text-[clamp(2.75rem,14vw,5.25rem)] leading-[0.94] font-extrabold tracking-[-0.045em] lg:max-w-none lg:text-[clamp(3.25rem,min(7vw,12svh),7.5rem)]";

  let headline: ReactNode;
  let lineCount: number;
  if (scene.id === "orange") {
    const l = content.orange.lines;
    lineCount = l.length + 1;
    headline = (
      <>
        {l.map((line, i) => (
          <m.span key={line} className="block" {...rise(i)}>
            {line}
          </m.span>
        ))}
        <m.span className="block" {...rise(l.length)}>
          <span className="relative isolate -ml-[0.06em] inline-block px-[0.12em] text-night before:absolute before:inset-[0.06em_-0.02em_0.02em_-0.02em] before:-z-10 before:rotate-[-2deg] before:bg-butter before:content-['']">
            {content.orange.mark}
          </span>
        </m.span>
      </>
    );
  } else if (scene.id === "pink") {
    const l = content.pink;
    lineCount = l.length;
    headline = l.map((line, i) => (
      <m.span key={line} className="block" {...rise(i)}>
        {line}
      </m.span>
    ));
  } else {
    lineCount = content.night.length;
    headline = (
      <m.span className="block" {...rise(0)}>
        <HeroSweep lines={content.night} startDelay={base + 0.9} step={340} />
      </m.span>
    );
  }

  return (
    <m.div
      className="flex flex-1 flex-col justify-between gap-8"
      exit={
        reduce
          ? undefined
          : { opacity: 0, y: -28, transition: { duration: 0.28 } }
      }
    >
      {/* Decorative: the real heading is the screen-reader h1 above. */}
      <p aria-hidden className={head} style={{ color: scene.head }}>
        {headline}
      </p>
      <m.p
        className="max-w-[28ch] text-[clamp(1.0625rem,1.6vw,1.5rem)] leading-[1.22] font-medium tracking-[-0.01em]"
        style={{ color: scene.fg }}
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: EASE,
          delay: base + lineCount * T.headlineStep + 0.15,
        }}
      >
        {content.subs[scene.id]}
      </m.p>
    </m.div>
  );
}

/**
 * Home hero: a looping showreel built from three scenes. The slab changes
 * colour and shape, the headline swaps, and a highlight sweeps across the
 * last scene. Auto-play can be paused, and is off for reduced motion. Below
 * lg the slab stacks and keeps one stable height.
 */
export function Hero({ content = studioHero }: { content?: HeroContent }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [intro, setIntro] = useState(true);
  const scene = SCENES[index];
  const auto = playing && !reduce;

  useEffect(() => {
    const id = setTimeout(() => setIntro(false), 2000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!auto) return;
    const id = setTimeout(
      () => setIndex((i) => (i + 1) % SCENES.length),
      SCENES[index].ms,
    );
    return () => clearTimeout(id);
  }, [auto, index]);

  const first = SCENES[0].slab;
  const dur = reduce ? 0 : 0.9;

  return (
    <section
      aria-label="Introduction"
      className="relative overflow-hidden bg-night px-gutter pt-4 pb-8 lg:flex lg:min-h-[max(40rem,calc(100svh-var(--header-height)))] lg:pt-6 lg:pl-rail"
    >
      <h1 className="sr-only">{content.srHeading}</h1>

      <div className="relative flex flex-col gap-4 lg:flex-1">
        {/* Pink tab behind the slab, first scene only */}
        <m.div
          aria-hidden
          className="absolute top-0 left-[12%] hidden h-[30%] w-[58%] origin-bottom bg-pink lg:block"
          initial={reduce ? false : { opacity: 0, scaleY: 0.6 }}
          animate={{
            opacity: scene.pinkTab ? 1 : 0,
            scaleY: scene.pinkTab ? 1 : 0.6,
          }}
          transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
        />

        {/* The slab: morphs colour and shape between scenes */}
        <m.div
          className="relative flex min-h-[32rem] flex-col gap-8 p-6 sm:p-8 lg:absolute lg:top-[var(--t)] lg:bottom-[var(--b)] lg:left-[var(--l)] lg:min-h-0 lg:w-[var(--w)] lg:p-[clamp(1.5rem,2.6vw,2.5rem)]"
          style={varStyle({
            "--l": first.l,
            "--w": first.w,
            "--t": first.t,
            "--b": first.b,
          })}
          initial={
            reduce ? false : { opacity: 0, y: 40, backgroundColor: C.orange }
          }
          animate={
            {
              opacity: 1,
              y: 0,
              backgroundColor: scene.bg,
              "--l": scene.slab.l,
              "--w": scene.slab.w,
              "--t": scene.slab.t,
              "--b": scene.slab.b,
            } as never
          }
          transition={{ duration: dur, ease: EASE, delay: 0.05 }}
        >
          <AnimatePresence mode="wait" initial>
            <SceneText
              key={scene.id}
              scene={scene}
              content={content}
              intro={intro}
              reduce={reduce}
            />
          </AnimatePresence>

          {/* Controls: link, scene dots, pause */}
          <m.div
            className="flex flex-wrap items-center gap-x-6 gap-y-4"
            style={{ color: SCENES[0].fg }}
            initial={false}
            animate={{ color: scene.fg }}
            transition={{ duration: dur, ease: EASE }}
          >
            <Button
              href={content.link.href}
              variant="text"
              className="whitespace-nowrap"
            >
              {content.link.label}
            </Button>
            <div
              role="group"
              aria-label="Choose a hero scene"
              className="flex items-center"
            >
              {SCENES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Show scene ${i + 1} of ${SCENES.length}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => setIndex(i)}
                  className="grid size-8 place-items-center"
                >
                  <span
                    aria-hidden
                    className={`size-3.5 rounded-full border-2 border-current transition-colors ${
                      i === index ? "bg-current" : "bg-transparent"
                    }`}
                  />
                </button>
              ))}
            </div>
            {reduce ? null : (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-pressed={!playing}
                className="inline-flex min-h-8 items-center gap-2 font-semibold"
              >
                {playing ? (
                  <Pause weight="fill" aria-hidden className="size-4" />
                ) : (
                  <Play weight="fill" aria-hidden className="size-4" />
                )}
                {playing ? "Pause animation" : "Play animation"}
              </button>
            )}
          </m.div>
        </m.div>

        {/* The header carries this button from sm up. */}
        <div className="sm:hidden">
          <Button href={site.cta.href} arrow>
            {site.cta.label}
          </Button>
        </div>
      </div>

      {/* Objects pop out wherever the mouse moves over the hero. */}
      <CursorTrail />
    </section>
  );
}
