import type { ReactNode } from "react";

interface SlotProps {
  /** What kind of thinking belongs here, e.g. "a note". */
  label: string;
  /** A prompt for the owner. Not public copy: replace the whole Slot. */
  children: ReactNode;
  className?: string;
}

/**
 * Structure-only placeholder for the owner's own point of view. Inherits the
 * text colour of its section so it works on every tone. Every Slot must be
 * replaced with real writing before launch: search for "<Slot" to find them.
 */
export function Slot({ label, children, className = "" }: SlotProps) {
  return (
    <div
      data-slot
      className={`border-2 border-dashed border-current p-6 md:p-8 ${className}`.trim()}
    >
      <p className="text-eyebrow font-semibold tracking-[0.12em] uppercase">
        Your thinking: {label}
      </p>
      <p className="mt-3 max-w-prose">{children}</p>
    </div>
  );
}
