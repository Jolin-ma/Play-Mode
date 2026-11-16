import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { CursorTrail } from "@/components/CursorTrail";
import { Eyebrow } from "@/components/Eyebrow";
import { RevealLines } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Start a conversation",
  description:
    "Tell me what is shifting for your brand. I reply within 1 business day.",
};

export default function ContactPage() {
  return (
    <main>
      <Section className="relative pt-16 md:pt-24">
        <CursorTrail />
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow className="text-muted">Contact</Eyebrow>
            <RevealLines
              className="mt-5 font-display text-display-lg font-bold"
              lines={["Start a", "conversation."]}
            />
            <p className="mt-8 max-w-md text-lead text-muted">
              Tell me what you are noticing, or what you are trying to make
              sense of. I reply within 1 business day.
            </p>

            <div className="mt-12 border-t-2 border-cream/40 pt-6">
              {site.email ? (
                <>
                  <p className="text-eyebrow font-semibold tracking-[0.12em] text-muted uppercase">
                    Prefer email?
                  </p>
                  <p className="mt-2">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-lead underline decoration-2 underline-offset-4 hover:decoration-pink"
                    >
                      {site.email}
                    </a>
                  </p>
                </>
              ) : null}
              <p className="mt-6 text-muted">{site.location}.</p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm fallbackEmail={site.email} />
          </div>
        </div>
      </Section>
    </main>
  );
}
