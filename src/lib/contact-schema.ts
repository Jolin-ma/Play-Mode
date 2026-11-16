import { z } from "zod";

/** Accepts "example.com" as well as "https://example.com". */
function isWebsite(value: string) {
  try {
    const url = new URL(
      /^https?:\/\//i.test(value) ? value : `https://${value}`,
    );
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

/** Shared by the form (client) and the route handler (server). */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(120),
  brand: z.string().trim().min(1, "Enter your brand or company").max(160),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email")
    .pipe(z.email("Enter a valid email address"))
    .pipe(z.string().max(254)),
  website: z
    .string()
    .trim()
    .max(200)
    .refine(
      (v) => v === "" || isWebsite(v),
      "Enter a valid website address, or leave this empty",
    ),
  message: z.string().trim().min(1, "Add a short message").max(3000),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

/** Turns a failed parse into one message per field. */
export function fieldErrors(error: z.ZodError<ContactInput>): ContactErrors {
  const flat = z.flattenError(error).fieldErrors as Record<
    string,
    string[] | undefined
  >;
  const out: ContactErrors = {};
  for (const [key, messages] of Object.entries(flat)) {
    if (messages?.[0]) out[key as keyof ContactInput] = messages[0];
  }
  return out;
}
