"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/nav";

interface NavPillsProps {
  /** Called when a pill is chosen, so the mobile menu can close. */
  onNavigate?: () => void;
  /** Larger pills for the full-screen mobile menu. */
  large?: boolean;
  className?: string;
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/**
 * The signature nav: a tight stack of chunky, tilted colour blobs. The current
 * page becomes a tall, thin-outlined box. Hover straightens the tilt.
 */
export function NavPills({
  onNavigate,
  large = false,
  className = "",
}: NavPillsProps) {
  const pathname = usePathname();

  const text = large ? "text-[1.35rem]" : "text-[1.0625rem]";
  const blob = large
    ? "rounded-[1.7rem] px-7 py-3.5"
    : "rounded-[1.35rem] px-[1.1rem] py-2.5";
  const tall = large
    ? "min-h-[10.5rem] rounded-[2.4rem] px-9"
    : "min-h-[9.25rem] rounded-[1.9rem] px-6";

  return (
    <ul className={`flex flex-col items-start gap-1 ${className}`}>
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              style={{ "--tilt": `${item.tilt}deg` } as React.CSSProperties}
              className={`${text} block rotate-[var(--tilt)] font-display leading-none font-bold transition-transform duration-[var(--duration-hover)] hover:rotate-0 motion-reduce:transition-none ${
                active
                  ? `${tall} flex items-center border border-cream bg-night text-cream`
                  : `${blob} border-2 border-night ${item.chip}`
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
