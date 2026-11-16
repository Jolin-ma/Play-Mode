import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/MotionProvider";
import { site } from "@/data/site";
import { body, display } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description:
    "Play Mode is a creative strategy and storytelling studio in Oshawa, Ontario. A point of view on cultural and creative shifts, turned into opportunities for brands.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-CA" className={`${display.variable} ${body.variable}`}>
      <body>
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
      </body>
    </html>
  );
}
