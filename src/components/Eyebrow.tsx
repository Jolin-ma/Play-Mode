import type { ReactNode } from "react";

/** Small uppercase label that sits above a section headline. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-eyebrow font-semibold tracking-[0.12em] uppercase ${className}`.trim()}
    >
      {children}
    </p>
  );
}
