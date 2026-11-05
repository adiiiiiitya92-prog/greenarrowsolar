"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, AnimatePresence, motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { Reveal } from "./Motion";
import { cities, cityHref, faqs, services, site, steps } from "@/lib/site";

/* ---------- Trust marquee ---------- */
const trust = ["PM Surya Ghar subsidy support", "Net metering handled for you", "Free site survey", "Up to 25-year panel performance warranty", "Local Jabalpur service team", "Tier-1 panels & inverters"];
export function TrustStrip() {
  const row = [...trust, ...trust];
  return (
    <div className="overflow-hidden border-y border-line bg-bg-alt py-4" aria-label="Why choose us">
      <div className="marquee gap-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-semibold whitespace-nowrap" aria-hidden={i >= trust.length}>
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Services ---------- */
function Icon({ name }: { name: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" {...p}>
      {name === "home" && <path d="M3 11 12 3l9 8M5 10v10h14V10M10 20v-6h4v6" />}
      {name === "building" && <path d="M4 21V5l8-2v18M12 9h8v12M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2M2 21h20" />}
      {name === "drop" && <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />}
      {name === "battery" && <path d="M3 8h15v8H3zM21 11v2M7 12h4" />}
    </svg>
  );
}

export function ServicesGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {services.map((s, i) => (
        <Reveal key={s.slug} delay={i * 0.08} id={s.slug}>
          <article className="card card-hover h-full p-6">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand">
              <Icon name={s.icon} />
            </span>
            <h3 className="font-display mt-4 text-2xl">{s.title}</h3>
            <p className="text-muted mt-2">{s.short}</p>
            <ul className="mt-4 grid gap-1.5 text-sm">
              {s.points.map((p) => (
                <li key={p} className="flex gap-2"><span className="text-brand">✓</span>{p}</li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- How it works: line fills as you scroll ---------- */
export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const h = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { stiffness: 120, damping: 24 });
  return (
    <ol ref={ref} className="relative mx-auto grid max-w-2xl gap-8 pl-14">
      <span className="absolute top-2 bottom-2 left-[1.15rem] w-0.5 bg-line" aria-hidden="true" />
      <motion.span style={{ height: h }} className="absolute top-2 left-[1.15rem] w-0.5 bg-brand" aria-hidden="true" />
      {steps.map((s, i) => (
        <Reveal key={s.title} y={20} className="relative">
          <span className="absolute top-0 -left-14 grid h-10 w-10 place-items-center rounded-full border-2 border-brand bg-bg font-bold text-brand">{i + 1}</span>
          <h3 className="font-display text-xl">{s.title}</h3>
          <p className="text-muted mt-1">{s.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/* ---------- Count-up stats ---------- */
function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: "easeOut", onUpdate: (x) => setN(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{prefix}{n.toLocaleString("en-IN")}{suffix}</span>;
}

export function Facts() {
  const items = [
    { to: 78000, prefix: "₹", label: "Maximum central subsidy for eligible homes" },
    { to: 90, suffix: "%", label: "Possible reduction in your electricity bill" },
    { to: 25, suffix: " yrs", label: "Panel performance warranty (typical)" },
    { to: 300, suffix: "+", label: "Bright sunny days a year across MP" },
  ];
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => (
        <Reveal key={it.label} delay={i * 0.08} className="card p-6 text-center">
          <dt className="sr-only">{it.label}</dt>
          <dd className="font-display text-4xl font-semibold text-brand sm:text-5xl"><Counter to={it.to} prefix={it.prefix} suffix={it.suffix} /></dd>
          <p className="text-muted mt-2 text-sm">{it.label}</p>
        </Reveal>
      ))}
    </dl>
  );
}

/* ---------- Savings calculator ---------- */
export function Calculator() {
  const [bill, setBill] = useState(3000);
  // Indicative assumptions (state in UI): ~₹7/unit blended tariff, 1 kW ≈ 120 units/month in MP, ≈ ₹60,000/kW installed.
  const units = bill / 7;
  const kw = Math.min(10, Math.max(1, Math.round(units / 120)));
  const subsidy = kw >= 3 ? 78000 : kw === 2 ? 60000 : 30000;
  const cost = kw * 60000;
  const net = Math.max(0, cost - subsidy);
  const monthly = Math.round(Math.min(bill * 0.9, kw * 120 * 7));
  const payback = monthly > 0 ? (net / (monthly * 12)).toFixed(1) : "–";
  const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

  return (
    <div id="calculator" className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
      <div>
        <label htmlFor="bill" className="font-display text-xl">Your monthly electricity bill</label>
        <p className="font-display text-brand mt-2 text-5xl font-semibold">{inr(bill)}</p>
        <input
          id="bill"
          type="range"
          min={500}
          max={20000}
          step={250}
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
          className="mt-4 w-full accent-[var(--brand)]"
          aria-valuetext={inr(bill)}
        />
        <div className="text-muted flex justify-between text-xs"><span>₹500</span><span>₹20,000</span></div>
        <p className="text-muted mt-6 text-xs">
          Indicative estimate only, assuming ~₹7/unit, ~120 units per kW per month and ~₹60,000/kW before subsidy. Actual design, price and subsidy depend on your site and current scheme rules.
        </p>
      </div>
      <div aria-live="polite" className="grid grid-cols-2 gap-3">
        {[
          ["Suggested system", `${kw} kW`],
          ["Est. monthly saving", inr(monthly)],
          ["Govt. subsidy (up to)", inr(subsidy)],
          ["Cost after subsidy", inr(net)],
        ].map(([k, v]) => (
          <motion.div key={k + v} initial={{ scale: 0.96, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }} className="rounded-2xl bg-brand-soft p-4">
            <p className="text-muted text-xs">{k}</p>
            <p className="font-display mt-1 text-2xl font-semibold">{v}</p>
          </motion.div>
        ))}
        <div className="bg-brand text-brand-ink col-span-2 rounded-2xl p-4">
          <p className="text-sm opacity-90">Estimated payback</p>
          <p className="font-display text-3xl font-semibold">~{payback} years</p>
        </div>
        <Link href={`/contact?bill=${bill}`} className="btn btn-primary col-span-2">Get an exact quote</Link>
      </div>
    </div>
  );
}

/* ---------- Founder (SVG placeholder; swap for next/image when a photo is available) ---------- */
export function FounderCard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div ref={ref} className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-line bg-brand-soft">
        <motion.div style={{ y }} className="absolute inset-[-10%]">
          <svg viewBox="0 0 320 400" className="h-full w-full" role="img" aria-label="Founder portrait placeholder">
            <defs>
              <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--sky-mid)" /><stop offset="1" stopColor="var(--hill-1)" /></linearGradient>
            </defs>
            <rect width="320" height="400" fill="url(#fg)" />
            <circle cx="160" cy="150" r="52" fill="#c68a5b" />
            <path d="M60 400c0-80 45-120 100-120s100 40 100 120Z" fill="#15803d" />
            <path d="M110 140c6-40 36-52 60-48 28 4 44 24 40 48-14-20-34-26-50-24-20 0-38 8-50 24Z" fill="#2b1d12" />
          </svg>
        </motion.div>
      </div>
      <Reveal>
        <p className="eyebrow">Meet the founder</p>
        <blockquote className="font-display mt-3 text-2xl leading-snug sm:text-3xl">“{site.founder.quote}”</blockquote>
        <p className="mt-5 font-semibold">{site.founder.name}</p>
        <p className="text-muted text-sm">{site.founder.role}, {site.name}</p>
        <Link href="/about" className="btn btn-ghost mt-6">Our story</Link>
      </Reveal>
    </div>
  );
}

/* ---------- Areas ---------- */
export function Areas() {
  return (
    <ul className="flex flex-wrap justify-center gap-3">
      {cities.map((c, i) => (
        <Reveal key={c.slug} delay={i * 0.04} y={14} className="contents">
          <li>
            <Link href={cityHref(c.slug)} className="card card-hover inline-flex min-h-11 items-center gap-2 px-5 py-2.5 font-medium">
              <span className="text-brand">●</span> Solar in {c.name}
            </Link>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

/* ---------- FAQ ---------- */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto grid max-w-3xl gap-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="card overflow-hidden">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left font-semibold"
              >
                {f.q}
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-brand text-2xl leading-none" aria-hidden="true">+</motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="text-muted px-5 pb-5">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- CTA band ---------- */
export function CtaBand({ title = "Ready to switch to solar?", text = "Book a free site survey. We will size the system honestly and handle the subsidy paperwork." }: { title?: string; text?: string }) {
  return (
    <Reveal className="relative isolate overflow-hidden rounded-[2rem] p-8 text-center text-white sm:p-14" style={{ background: "linear-gradient(135deg,#14661b 0%,#1a7a22 55%,#0f6a9e 130%)" }}>
      <div className="spin-slow absolute -top-24 -right-24 -z-10 h-72 w-72 rounded-full opacity-25" style={{ background: "repeating-conic-gradient(#fff 0 6deg, transparent 6deg 18deg)", maskImage: "radial-gradient(circle,#000 30%,transparent 68%)", WebkitMaskImage: "radial-gradient(circle,#000 30%,transparent 68%)" }} aria-hidden="true" />
      <h2 className="font-display text-3xl sm:text-5xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl opacity-90">{text}</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/contact" className="btn bg-white text-green-900 shadow-lg">Book free survey</Link>
        <a href={`tel:${site.phone}`} className="btn border-2 border-current">Call {site.phoneDisplay}</a>
        <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Green Arrow Solar, I want a solar quote.")}`} target="_blank" rel="noopener noreferrer" className="btn border-2 border-current">WhatsApp</a>
      </div>
    </Reveal>
  );
}
