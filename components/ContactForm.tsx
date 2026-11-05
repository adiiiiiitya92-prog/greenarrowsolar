"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { contactSchema } from "@/lib/validation";
import { cities } from "@/lib/site";

type Errors = Record<string, string>;
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "error"; msg: string };

export function ContactForm() {
  const params = useSearchParams();
  const [openedAt] = useState(() => Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const bill = params.get("bill") ?? "";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      city: String(fd.get("city") ?? ""),
      interest: String(fd.get("interest") ?? "residential"),
      monthlyBill: String(fd.get("monthlyBill") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
      t: openedAt,
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] ??= i.message;
      setErrors(errs);
      setStatus({ kind: "idle" });
      (e.currentTarget.querySelector(`[name="${Object.keys(errs)[0]}"]`) as HTMLElement | null)?.focus();
      return;
    }
    setErrors({});
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({ kind: "ok" });
        (e.target as HTMLFormElement).reset();
        const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
        gtag?.("event", "generate_lead", { method: "contact_form" });
      } else {
        if (data.fields) setErrors(data.fields);
        setStatus({ kind: "error", msg: res.status === 429 ? "Too many attempts. Please wait a few minutes or call us." : (data.error ?? "Something went wrong. Please call us instead.") });
      }
    } catch {
      setStatus({ kind: "error", msg: "Network error. Please check your connection or call us." });
    }
  }

  const err = (k: string) => errors[k];
  const inv = (k: string) => (err(k) ? { "aria-invalid": true, "aria-describedby": `${k}-err` } : {});

  return (
    <form onSubmit={onSubmit} noValidate className="card grid gap-4 p-6 sm:p-8" aria-label="Request a free solar survey">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name *" k="name" error={err("name")}>
          <input name="name" autoComplete="name" required maxLength={80} className="field" {...inv("name")} />
        </Field>
        <Field label="Mobile number *" k="phone" error={err("phone")}>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="98765 43210" className="field" {...inv("phone")} />
        </Field>
        <Field label="Email (optional)" k="email" error={err("email")}>
          <input name="email" type="email" autoComplete="email" maxLength={120} className="field" {...inv("email")} />
        </Field>
        <Field label="City / Town" k="city" error={err("city")}>
          <input name="city" list="cities" defaultValue="Jabalpur" maxLength={60} className="field" {...inv("city")} />
          <datalist id="cities">{cities.map((c) => <option key={c.slug} value={c.name} />)}</datalist>
        </Field>
        <Field label="I am interested in" k="interest" error={err("interest")}>
          <select name="interest" className="field" defaultValue="residential">
            <option value="residential">Home rooftop solar</option>
            <option value="commercial">Commercial / industrial</option>
            <option value="agriculture">Solar water pump</option>
            <option value="offgrid">Off-grid / hybrid + battery</option>
            <option value="other">Something else</option>
          </select>
        </Field>
        <Field label="Monthly electricity bill (₹)" k="monthlyBill" error={err("monthlyBill")}>
          <input name="monthlyBill" inputMode="numeric" defaultValue={bill} maxLength={6} className="field" {...inv("monthlyBill")} />
        </Field>
      </div>
      <Field label="Message (optional)" k="message" error={err("message")}>
        <textarea name="message" rows={4} maxLength={1000} className="field" {...inv("message")} />
      </Field>

      {/* Honeypot: hidden from people, irresistible to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="consent" className="mt-1 h-5 w-5 accent-[var(--brand)]" {...inv("consent")} />
          <span>I agree to be contacted about my enquiry, as described in the <Link href="/privacy-policy" className="link">Privacy Policy</Link>.</span>
        </label>
        {err("consent") && <p id="consent-err" role="alert" className="mt-1 text-sm text-red-700 dark:text-red-300">{err("consent")}</p>}
      </div>

      <button type="submit" disabled={status.kind === "sending"} className="btn btn-primary">
        {status.kind === "sending" ? "Sending…" : "Request free survey"}
      </button>

      <div aria-live="polite">
        <AnimatePresence>
          {status.kind === "ok" && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-brand-soft p-4 font-medium text-brand">
              ✓ Thank you! We have received your request and will call you within one working day.
            </motion.p>
          )}
          {status.kind === "error" && (
            <motion.p role="alert" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-red-100 p-4 font-medium text-red-900 dark:bg-red-950 dark:text-red-200">
              {status.msg}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Field({ label, k, error, children }: { label: string; k: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1 text-sm font-medium">
      {label}
      {children}
      {error && <span id={`${k}-err`} role="alert" className="text-sm font-normal text-red-700 dark:text-red-300">{error}</span>}
    </label>
  );
}
