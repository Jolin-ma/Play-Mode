import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Section } from "@/components/Section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy",
  description:
    "How Play Mode handles the details you send through the enquiry form.",
};

export default function PrivacyPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Privacy"
        lines={["Your details,", "handled simply."]}
      />

      <Section className="pt-0 md:pt-0">
        <div className="max-w-2xl space-y-6 text-lg">
          {/* TODO (owner): placeholder text. Have a real policy reviewed before launch. */}
          <p className="border-2 border-dashed border-orange p-4 text-small">
            Placeholder text. This page needs a properly reviewed privacy policy
            before the site launches.
          </p>

          <h2 className="font-display text-heading font-bold">
            What the enquiry form collects
          </h2>
          <p className="text-muted">
            The enquiry form asks for your name, brand or company, email
            address, website (optional) and your message.
          </p>

          <h2 className="font-display text-heading font-bold">
            How it is used
          </h2>
          <p className="text-muted">
            I use these details only to reply to your enquiry. The form is
            delivered to me by email through an email delivery service. I do not
            sell your details.
          </p>

          <h2 className="font-display text-heading font-bold">
            Asking me to delete your details
          </h2>
          <p className="text-muted">
            If you would like your enquiry deleted, ask by email
            {site.email ? (
              <>
                {" "}
                at{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-cream underline underline-offset-4"
                >
                  {site.email}
                </a>
              </>
            ) : null}{" "}
            and I will remove it.
          </p>
        </div>
      </Section>
    </main>
  );
}
