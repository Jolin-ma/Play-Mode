# Play Mode

Site for Play Mode (playmode.ca).

## About Play Mode

Play Mode is an independent creative and strategic studio exploring the intersection of culture, creativity, and commerce.

I follow the shifts shaping how people think, behave, and connect with brands. Then I turn those observations into perspectives, stories, and strategies that move brands forward.

At the centre is Brandformance: bringing brand and performance together into one connected operating system.

The site speaks to brands directly. It is a point of view, not a service menu: no packages, no prices.

## Stack

Next.js (App Router) + TypeScript (strict) + Tailwind CSS v4 + Motion. Forms use a route handler, Zod and Resend. Hosted on Vercel.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`, `npm run format`.

This version of Next.js has breaking changes from older releases. Read the guides in `node_modules/next/dist/docs/` before changing framework-level code.

## Environment variables

See `.env.example`. The contact form needs `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` (a sender on a domain verified in Resend). Without them the form shows a "sending is not set up" message. `NEXT_PUBLIC_CONTACT_EMAIL` powers the footer link, the mailto fallback and the structured data.

## Where things live

| What                                         | Where                                                      |
| -------------------------------------------- | ---------------------------------------------------------- |
| Colours, type scale, radius, spacing, motion | `src/styles/tokens.css` (the one file to re-skin the site) |
| Stories (work), structure only               | `src/data/stories.ts`                                      |
| Approach stages                              | `src/data/approach.ts`                                     |
| Nav and footer links                         | `src/data/nav.ts`                                          |
| CTA label, location, email, site URL         | `src/data/site.ts`                                         |
| Pages                                        | `src/app/**/page.tsx`                                      |
| Components                                   | `src/components`                                           |
| Form schema (shared by browser and server)   | `src/lib/contact-schema.ts`                                |
| Contact API                                  | `src/app/api/contact/route.ts`                             |

## Colour rules

Text on orange, pink, blue and cream blocks is always `night`. Cream text on orange fails contrast, so never use it. The measured contrast pairs are listed at the top of `tokens.css`. Re-check a pair if you change a colour.

## Placeholders to replace

Structure is in place, the thinking is yours. Every dashed box on the site is a `Slot` (`src/components/Slot.tsx`) holding a prompt, not public copy. Find them all by searching for `<Slot`, and replace each one with your own writing before launch.

- Home: "What I'm noticing", "How I think", Work
- Perspective: beliefs and notes
- Approach: the three stages and "Working together"
- Work: three stories in `src/data/stories.ts`, and the story page template
- About: portrait (`public/about/photo.jpg`, 4:5), your story, principles

Also marked in the code: the privacy policy text (`src/app/privacy/page.tsx`).

## Copy rules

No em dashes, no buzzwords, no invented clients, testimonials or stats, and any concept work is labelled as concept work. Copy speaks to brands directly, in the first person ("I"). The hero, "How we accelerate growth" and "What we can do for you" sections on Home are the owner's own copy (including the Applied AI card): keep them as they are.

## Share image font

`src/app/og-font.woff` is Bricolage Grotesque ExtraBold, bundled under the SIL Open Font License (see `og-font-LICENSE.txt`). It is used only for the generated share image.
