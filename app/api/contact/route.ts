import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clientIp, rateLimit } from "@/lib/ratelimit";
import { contactSchema } from "@/lib/validation";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const json = (body: object, status = 200, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export async function POST(req: Request) {
  // CSRF: browsers always send Origin on cross-site POSTs; require same-origin + JSON.
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  let originHost = "";
  try {
    originHost = origin ? new URL(origin).host : "";
  } catch {}
  if (!origin || (originHost !== host && origin !== site.url)) return json({ error: "Forbidden" }, 403);
  if (!req.headers.get("content-type")?.includes("application/json")) return json({ error: "Unsupported" }, 415);

  const ip = clientIp(req.headers);
  const rl = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!rl.ok) return json({ error: "Too many requests. Please try again later." }, 429, { "Retry-After": String(rl.retryAfter) });

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  // Spam protection: honeypot filled or form submitted in < 3s => pretend success, store nothing.
  const probe = raw as { website?: unknown; t?: unknown };
  if (typeof probe.website === "string" && probe.website.length > 0) return json({ ok: true });
  if (typeof probe.t === "number" && Date.now() - probe.t < 3000) return json({ ok: true });

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) fields[String(issue.path[0] ?? "form")] ??= issue.message;
    return json({ error: "Please correct the highlighted fields.", fields }, 400);
  }
  const d = parsed.data;

  db.prepare(
    `INSERT INTO leads (name, phone, email, city, interest, monthly_bill, message, ip_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    d.name,
    d.phone,
    d.email || null,
    d.city || null,
    d.interest,
    d.monthlyBill ? Number(d.monthlyBill) : null,
    d.message || null,
    createHash("sha256").update(ip).digest("hex").slice(0, 16),
  );

  return json({ ok: true });
}

export function GET() {
  return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
}
