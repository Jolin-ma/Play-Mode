/**
 * The three stages of how the studio thinks. Used on Home (short) and the
 * Approach page (full). The prompts are placeholders for the owner's own
 * words, not public copy.
 */
export const approachStages = [
  {
    n: "01",
    title: "Notice",
    slot: "How you spot a shift early: where you look, what you pay attention to that others skip.",
  },
  {
    n: "02",
    title: "Interpret",
    slot: "How you decide what a shift means, and what it does not mean.",
  },
  {
    n: "03",
    title: "Translate",
    slot: "How an insight becomes a story, a direction or a move a brand can act on.",
  },
] as const;
