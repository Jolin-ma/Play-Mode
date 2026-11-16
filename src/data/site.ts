export const site = {
  name: "Play Mode",
  wordmark: "play mode",
  location: "Oshawa, Ontario",
  /** The single call to action used everywhere on the site. */
  cta: { label: "Start a conversation", href: "/contact" },
  /** Empty until NEXT_PUBLIC_CONTACT_EMAIL is set. The footer falls back to the contact page. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://playmode.ca",
} as const;
