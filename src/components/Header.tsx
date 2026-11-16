import Link from "next/link";
import { Button } from "./Button";
import { MobileMenu } from "./MobileMenu";
import { NavPills } from "./NavPills";
import { site } from "@/data/site";

/**
 * Top bar: wordmark left, one CTA right. On desktop the nav is a fixed stack
 * of pills at the left edge. Below lg it collapses into the Menu overlay.
 */
export function Header() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-[var(--header-height)] items-center justify-between bg-night px-gutter">
        <Link
          href="/"
          className="relative z-50 font-display text-heading font-bold tracking-tight"
          aria-label={`${site.name}, home`}
        >
          {site.wordmark}
        </Link>
        <div className="flex items-center gap-3">
          <Button href={site.cta.href} className="max-sm:hidden">
            {site.cta.label}
          </Button>
          <MobileMenu />
        </div>
      </header>

      {/* Desktop pill stack, pinned to the left edge below the header */}
      <nav
        aria-label="Main"
        className="fixed bottom-8 left-gutter z-40 hidden lg:block"
      >
        <NavPills />
      </nav>
    </>
  );
}
