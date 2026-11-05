import { z } from "zod";

const clean = (s: string) => s.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();

// Shared by the client form (instant feedback) and the API route (authoritative check).
export const contactSchema = z.object({
  name: z
    .string()
    .transform(clean)
    .pipe(z.string().min(2, "Please enter your full name").max(80, "Name is too long")),
  phone: z
    .string()
    .transform((s) => s.replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, ""))
    .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number")),
  email: z
    .string()
    .transform(clean)
    .pipe(z.union([z.literal(""), z.email("Enter a valid email address").max(120)])),
  city: z.string().transform(clean).pipe(z.string().max(60)),
  interest: z.enum(["residential", "commercial", "agriculture", "offgrid", "other"]),
  monthlyBill: z
    .string()
    .transform(clean)
    .pipe(z.union([z.literal(""), z.string().regex(/^\d{1,6}$/, "Enter bill amount in numbers only")])),
  message: z.string().transform(clean).pipe(z.string().max(1000, "Message is too long (max 1000 characters)")),
  consent: z.literal(true, { error: "Please agree to be contacted" }),
  // Spam traps: honeypot must stay empty; `t` is the time the form was opened.
  website: z.string().max(0).optional(),
  t: z.number().optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
