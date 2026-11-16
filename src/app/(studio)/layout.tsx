import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/MotionProvider";

/**
 * The earlier studio site (about, work, approach and so on). It keeps its own
 * header and footer. The landing page at "/" sits outside this group.
 */
export const metadata: Metadata = {
  description:
    "Play Mode is a creative strategy and storytelling studio in Oshawa, Ontario. A point of view on cultural and creative shifts, turned into opportunities for brands.",
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Without JavaScript the reveal animations never run, so show everything. */}
      <noscript>
        <style>{`[style*="opacity"]{opacity:1!important}[style*="transform"]{transform:none!important}`}</style>
      </noscript>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-20 bg-pink px-5 py-3 font-semibold text-night focus:translate-y-0 focus:rounded-pill"
      >
        Skip to content
      </a>
      <MotionProvider>
        <Header />
        <div id="main" className="pt-[var(--header-height)]">
          {children}
        </div>
        <Footer />
      </MotionProvider>
    </>
  );
}
