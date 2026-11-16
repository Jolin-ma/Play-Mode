import type { Metadata } from "next";
import { site } from "@/data/site";
import { body, display } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, locale: "en_CA" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-CA" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
