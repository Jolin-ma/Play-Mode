"use client";

import { useEffect, useId, useState } from "react";
import { Button } from "./Button";
import { NavPills } from "./NavPills";
import { site } from "@/data/site";

/** Menu button and full-screen overlay, shown below the lg breakpoint. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 rounded-pill border-2 border-cream px-5 py-2.5 font-semibold transition-colors hover:bg-cream hover:text-night"
      >
        {open ? "Close" : "Menu"}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-night px-[var(--spacing-gutter)] pt-28 pb-10"
      >
        <nav aria-label="Main">
          <NavPills large onNavigate={() => setOpen(false)} />
        </nav>
        <div className="mt-10 sm:hidden">
          <Button href={site.cta.href} arrow onClick={() => setOpen(false)}>
            {site.cta.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
