import Link from "next/link";
import { legalLinks, navItems } from "@/data/nav";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t-2 border-cream/30 bg-night px-gutter pt-section pb-10 text-cream lg:pl-rail">
      <div className="mx-auto max-w-page">
        <p aria-hidden className="-ml-1 font-display text-display-xl font-bold">
          {site.wordmark}
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-eyebrow font-semibold tracking-[0.12em] text-muted uppercase">
              Studio
            </p>
            <p className="mt-3 text-lead">{site.location}</p>
            <p className="mt-1 text-muted">
              Working with brands, wherever they are.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-eyebrow font-semibold tracking-[0.12em] text-muted uppercase">
              Pages
            </p>
            <ul className="mt-3 space-y-1.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-eyebrow font-semibold tracking-[0.12em] text-muted uppercase">
              Say hello
            </p>
            <p className="mt-3">
              {site.email ? (
                <a
                  href={`mailto:${site.email}`}
                  className="text-lead underline decoration-2 underline-offset-4 hover:decoration-pink"
                >
                  {site.email}
                </a>
              ) : (
                <Link
                  href={site.cta.href}
                  className="text-lead underline decoration-2 underline-offset-4 hover:decoration-pink"
                >
                  Use the contact form
                </Link>
              )}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t-2 border-cream/30 pt-6 text-small text-muted">
          <p>
            {site.name}. {site.location}.
          </p>
          <ul className="flex gap-6">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="underline-offset-4 hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
