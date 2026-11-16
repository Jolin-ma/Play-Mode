"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "./Button";
import {
  contactSchema,
  fieldErrors,
  type ContactErrors,
  type ContactInput,
} from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

interface ContactFormProps {
  /** Shown as a mailto link if sending fails. Empty hides the link. */
  fallbackEmail: string;
}

const inputClass =
  "w-full border-2 border-cream bg-night px-4 py-3.5 text-body text-cream placeholder:text-muted/70 aria-[invalid=true]:border-orange rounded-[var(--radius-block)]";

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-semibold">
        {label}
        {optional ? (
          <span className="ml-2 font-normal text-muted">Optional</span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-2 text-small text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-2 text-small font-semibold text-orange"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm({ fallbackEmail }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverMessage, setServerMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const describe = (id: keyof ContactInput, hint = false) => {
    const ids = [];
    if (errors[id]) ids.push(`${id}-error`);
    else if (hint) ids.push(`${id}-hint`);
    return ids.join(" ") || undefined;
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const values = Object.fromEntries(
      ["name", "brand", "email", "website", "message"].map((k) => [
        k,
        String(form.get(k) ?? ""),
      ]),
    );

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const found = fieldErrors(parsed.error);
      setErrors(found);
      setStatus("idle");
      const first = Object.keys(found)[0];
      if (first)
        formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          companyUrl: String(form.get("companyUrl") ?? ""),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: ContactErrors;
        message?: string;
      };
      if (res.ok && data.ok) {
        setStatus("success");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerMessage(
        data.message ??
          "Something went wrong. Please check the form and try again.",
      );
      setStatus("error");
    } catch {
      setServerMessage(
        "I could not reach the server. Check your connection and try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="bg-pink p-8 text-night md:p-10">
        <h2 className="font-display text-display-md font-bold">
          Thank you. Your message is in.
        </h2>
        <p className="mt-4 max-w-md text-lead">
          I reply within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      method="post"
      action="/api/contact"
      onSubmit={onSubmit}
      noValidate
      className="space-y-7"
      aria-describedby={status === "error" ? "form-error" : undefined}
    >
      {status === "error" ? (
        <div
          id="form-error"
          role="alert"
          className="bg-orange p-5 font-semibold text-night"
        >
          <p>{serverMessage}</p>
          {fallbackEmail ? (
            <p className="mt-2">
              <a
                href={`mailto:${fallbackEmail}`}
                className="underline underline-offset-4"
              >
                {fallbackEmail}
              </a>
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-7 md:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
            className={inputClass}
          />
        </Field>
        <Field id="brand" label="Brand or company" error={errors.brand}>
          <input
            id="brand"
            name="brand"
            type="text"
            autoComplete="organization"
            required
            aria-invalid={errors.brand ? true : undefined}
            aria-describedby={describe("brand")}
            className={inputClass}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email")}
            className={inputClass}
          />
        </Field>
        <Field id="website" label="Website" optional error={errors.website}>
          <input
            id="website"
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="yourbrand.ca"
            aria-invalid={errors.website ? true : undefined}
            aria-describedby={describe("website")}
            className={inputClass}
          />
        </Field>
      </div>

      <Field
        id="message"
        label="What are you noticing, or trying to figure out?"
        error={errors.message}
        hint="A few lines is plenty. Rough is fine."
      >
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describe("message", true)}
          className={inputClass}
        />
      </Field>

      {/* Honeypot. Hidden from people and from assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Leave this empty
          <input
            type="text"
            name="companyUrl"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <Button type="submit" arrow disabled={status === "submitting"}>
          {status === "submitting" ? "Sending" : "Send message"}
        </Button>
        <p className="text-small text-muted">I reply within 1 business day.</p>
      </div>
    </form>
  );
}
