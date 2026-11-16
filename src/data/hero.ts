export interface HeroContent {
  /** Read by screen readers in place of the decorative headline. */
  srHeading: string;
  /** One supporting line per scene. */
  subs: Record<"orange" | "pink" | "night", string>;
  orange: { lines: readonly string[]; mark: string };
  pink: readonly string[];
  night: readonly (readonly string[])[];
  link: { href: string; label: string };
}

/** The original studio hero copy. */
export const studioHero: HeroContent = {
  srHeading:
    "I build websites for what your brand needs next. Where ambitious ideas turn into real growth. Where wild ideas and sharp data share a room.",
  subs: {
    orange:
      "Creative strategy and storytelling, rooted in what is changing in culture.",
    pink: "A point of view on what is shifting, turned into something a brand can use.",
    night: "Start with what I am noticing.",
  },
  orange: {
    lines: ["I build", "websites for", "what your brand"],
    mark: "needs next.",
  },
  pink: ["Where", "ambitious", "ideas turn", "into real", "growth."],
  night: [
    ["Where", "wild", "ideas"],
    ["and", "sharp", "data"],
    ["share", "a", "room."],
  ],
  link: { href: "/work", label: "See the work" },
};

/** Landing page copy for the interactive-stories direction. */
export const playHero: HeroContent = {
  srHeading:
    "Stories you can step into. Start with a story, then find the medium that tells it best. Games, 3D worlds and small experiments.",
  subs: {
    orange: "Interactive projects that let people experience an idea.",
    pink: "Games, 3D worlds and small experiments, each built around a story.",
    night: "Sometimes Unity. Sometimes the web. Always a reason.",
  },
  orange: { lines: ["Stories", "you can"], mark: "step into." },
  pink: ["Start", "with a", "story,", "then find", "the medium."],
  night: [
    ["Not", "a", "pitch."],
    ["A", "place", "to", "play."],
  ],
  link: { href: "/about", label: "About Play Mode" },
};
