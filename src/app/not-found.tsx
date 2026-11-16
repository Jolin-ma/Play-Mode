import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main>
      <Section tone="orange" className="min-h-[70svh]">
        <p className="text-eyebrow font-semibold tracking-[0.12em] uppercase">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-display-xl font-bold">
          Nothing here.
        </h1>
        <p className="mt-6 max-w-lg text-lead">
          That page does not exist, or it has moved. The home page is a good
          place to start over.
        </p>
        <div className="mt-10">
          <Button href="/" variant="dark" arrow>
            Back to home
          </Button>
        </div>
      </Section>
    </main>
  );
}
