import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { Section, type SectionTone } from "./Section";
import { site } from "@/data/site";

interface CtaBandProps {
  tone?: Extract<SectionTone, "orange" | "pink" | "blue">;
  headline: string;
  body?: string;
}

/** Closing band with the single call to action. */
export function CtaBand({ tone = "pink", headline, body }: CtaBandProps) {
  return (
    <Section tone={tone}>
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 className="font-display text-display-lg font-bold">{headline}</h2>
        </Reveal>
        <Reveal
          delay={0.1}
          className="space-y-6 lg:col-span-4 lg:col-start-9 lg:pt-4"
        >
          {body ? <p className="text-lead">{body}</p> : null}
          <Button href={site.cta.href} variant="dark" arrow>
            {site.cta.label}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
