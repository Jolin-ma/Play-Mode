import { Resend } from "resend";
import { NextResponse } from "next/server";
import { contactSchema, fieldErrors } from "@/lib/contact-schema";

/** Strips line breaks so user text can never inject an email header. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "That request could not be read." },
      { status: 400 },
    );
  }

  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (
    typeof body === "object" &&
    body !== null &&
    "companyUrl" in body &&
    (body as { companyUrl?: unknown }).companyUrl
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error(
      "Contact form: RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set.",
    );
    return NextResponse.json(
      {
        ok: false,
        message:
          "Sending is not set up yet. Please use the email link instead.",
      },
      { status: 503 },
    );
  }

  const d = parsed.data;
  const text = [
    `Name: ${oneLine(d.name)}`,
    `Brand: ${oneLine(d.brand)}`,
    `Email: ${d.email}`,
    `Website: ${d.website || "not given"}`,
    "",
    "Message:",
    d.message,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: d.email,
      subject: `New enquiry: ${oneLine(d.brand)}`,
      text,
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Something went wrong sending that. Please try again or use the email link.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
