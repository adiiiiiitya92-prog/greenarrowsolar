"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { Reveal } from "./Motion";
import Image from "next/image";
import { cities, cityHref, faqs, founders, foundersMission, services, site, steps } from "@/lib/site";
import { SectionHead } from "./SectionHead";
import { calculate, SOLAR, type PropertyType } from "@/lib/solar";

/* ---------- Trust marquee ---------- */
const trust = ["PM Surya Ghar subsidy support", "Net metering handled for you", "Free site survey", "Up to 25-year panel performance warranty", "Local Jabalpur service team", "ALMM-listed, subsidy-eligible panels"];
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
      <motion.span style={{ height: h }} className="absolute top-2 left-[1.15rem] w-0.5 bg-gradient-to-b from-brand to-accent" aria-hidden="true" />
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
  // Render the final value (what crawlers and no-JS visitors see), then count up once in view.
  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    const fmt = (x: number) => prefix + Math.round(x).toLocaleString("en-IN") + suffix;
    const c = animate(0, to, { duration: 1.8, ease: "easeOut", onUpdate: (x) => (el.textContent = fmt(x)) });
    return () => c.stop();
  }, [inView, to, prefix, suffix]);
  return <span ref={ref}>{prefix}{to.toLocaleString("en-IN")}{suffix}</span>;
}

export function Facts() {
  const items = [
    { to: 78000, prefix: "₹", label: "Maximum central subsidy for eligible homes" },
    { to: 90, suffix: "%", label: "Possible reduction in your electricity bill" },
    { to: 25, suffix: " yrs", label: "Panel performance warranty (typical)" },
    { to: 3500, prefix: "~", suffix: " hrs", label: "Of sunshine a year in Jabalpur" },
  ];
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => (
        <Reveal key={it.label} delay={i * 0.08} className="card p-6 text-center">
          <dt className="sr-only">{it.label}</dt>
          <dd className="font-display text-sky text-4xl font-bold sm:text-5xl"><Counter to={it.to} prefix={it.prefix} suffix={it.suffix} /></dd>
          <p className="text-muted mt-2 text-sm">{it.label}</p>
        </Reveal>
      ))}
    </dl>
  );
}

/* ---------- Savings calculator ---------- */
const PROPERTY_TYPES: { value: PropertyType; label: string; icon: string }[] = [
  { value: "home", label: "Home", icon: "M3 11 12 3l9 8M5 10v10h14V10M10 20v-6h4v6" },
  { value: "business", label: "Business", icon: "M4 9h16l-1-5H5L4 9Zm0 0v11h16V9M9 20v-6h6v6" },
  { value: "industry", label: "Industry", icon: "M3 21V11l6 4V11l6 4V7l6 4v10H3Z" },
];

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
const paybackText = (months: number | null) => (months == null ? "—" : `${months} months (${(months / 12).toFixed(1)} yrs)`);

function StatIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function Calculator() {
  const [type, setType] = useState<PropertyType>("home");
  const [bill, setBill] = useState(5000);
  const [rate, setRate] = useState(""); // blank = Auto

  const r = calculate(bill, type, rate === "" ? undefined : Number(rate));

  const stats = [
    { label: "Recommended system", value: `${r.kw} kW`, icon: "M12 3v2M12 19v2M5 12H3M21 12h-2M6 6 4.5 4.5M18 6l1.5-1.5M6 18l-1.5 1.5M18 18l1.5 1.5M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" },
    { label: "Govt. subsidy", value: inr(r.subsidy), icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM9.5 9.5h5M8.8 13h5.2M13.5 8l-3 8" },
    { label: "Monthly saving", value: inr(r.monthly), icon: "M3 7h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 0 2.5-3H16M16 12h.01" },
    { label: "Payback (ROI)", value: paybackText(r.paybackMonths), icon: "m3 17 6-6 4 4 8-8M21 7v4M21 7h-4" },
    { label: "Roof space needed", value: `${r.roofSqFt} sq ft`, icon: "m4 8 8-5 8 5M4 8v8l8 5 8-5V8M4 8l8 5 8-5M12 13v8" },
    { label: "CO₂ saved / yr", value: `${r.co2.toLocaleString("en-IN")} kg`, icon: "M12 21c5-2 8-6 8-11a8 8 0 0 0-8-8 8 8 0 0 0-8 8c0 2 1 4 2 5M12 21c-4-6-4-11 0-16" },
    { label: "Equal to planting", value: `${r.trees} trees`, icon: "M12 22v-6M12 16c-3 0-5-2-5-5 0-4 5-9 5-9s5 5 5 9c0 3-2 5-5 5Z" },
    { label: "Yearly saving", value: inr(r.yearly), icon: "M3 7h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 0 2.5-3H16M16 12h.01" },
    { label: `Down payment (${Math.round(SOLAR.downPaymentPct * 100)}%)`, value: inr(r.downPayment), icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM9.5 9.5h5M8.8 13h5.2M13.5 8l-3 8" },
  ];

  return (
    <div id="calculator" className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.3fr)]">
      {/* ---- Inputs ---- */}
      <div className="card h-max p-6 sm:p-7">
        <p className="text-sm font-semibold">Property type</p>
        <div role="tablist" aria-label="Property type" className="mt-2 grid grid-cols-3 gap-1 rounded-2xl bg-bg-alt p-1">
          {PROPERTY_TYPES.map((pt) => {
            const active = pt.value === type;
            return (
              <button
                key={pt.value}
                role="tab"
                aria-selected={active}
                onClick={() => setType(pt.value)}
                className={`relative flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-sm font-medium transition-colors ${active ? "text-brand" : "text-muted hover:text-ink"}`}
              >
                {active && <motion.span layoutId="calc-type" className="absolute inset-0 -z-10 rounded-xl bg-surface shadow-sm" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={pt.icon} /></svg>
                {pt.label}
              </button>
            );
          })}
        </div>

        <label htmlFor="bill" className="mt-6 block text-sm font-semibold">Average monthly electricity bill</label>
        <p className="font-display mt-1 text-5xl font-semibold tracking-tight">{inr(bill)}</p>
        <input
          id="bill"
          type="range"
          min={SOLAR.billMin}
          max={SOLAR.billMax}
          step={100}
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
          className="mt-4 w-full accent-[var(--accent)]"
          aria-valuetext={inr(bill)}
        />
        <div className="text-muted flex justify-between text-xs"><span>{inr(SOLAR.billMin)}</span><span>{inr(SOLAR.billMax)}</span></div>

        <label htmlFor="rate" className="mt-6 block text-sm font-semibold">Per-unit rate (₹/unit)</label>
        <div className="mt-2 flex items-start gap-3">
          <input
            id="rate"
            type="number"
            inputMode="decimal"
            min={1}
            step={0.5}
            value={rate}
            placeholder={String(r.autoRate)}
            onChange={(e) => setRate(e.target.value)}
            className="field !w-24 text-center"
            aria-describedby="rate-hint"
          />
          <p id="rate-hint" className="text-muted text-xs leading-snug">
            Auto — ₹{r.autoRate}/unit. Know yours? Bill amount ÷ units on your bill.
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-accent p-5 text-white">
          <p className="text-sm font-medium opacity-95">Estimated savings over {SOLAR.plantLifeYears} years</p>
          <p className="font-display mt-1 text-4xl font-bold tracking-tight">{inr(r.lifetime)}</p>
          <p className="mt-2 text-sm opacity-95">
            EMI about <strong>{inr(r.emi)}</strong>/month for {SOLAR.emiYears} years, after {inr(r.downPayment)} down payment
          </p>
        </div>
      </div>

      {/* ---- Results ---- */}
      <div aria-live="polite" className="grid content-start gap-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <motion.div key={s.label} layout className="card flex flex-col gap-2 p-4">
              <StatIcon d={s.icon} />
              <p className="text-muted text-xs">{s.label}</p>
              <motion.p key={s.value} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{s.value}</motion.p>
            </motion.div>
          ))}
        </div>

        <div className="card grid grid-cols-3 divide-x divide-line">
          {[
            { k: "System cost", v: inr(r.price), cls: "" },
            { k: "Subsidy", v: r.subsidy > 0 ? "– " + inr(r.subsidy) : "—", cls: "text-success" },
            { k: "You pay", v: inr(r.pays), cls: "" },
          ].map((c) => (
            <div key={c.k} className="px-3 py-4 text-center">
              <p className="text-muted text-xs">{c.k}</p>
              <p className={`font-display mt-1 text-lg font-semibold sm:text-xl ${c.cls}`}>{c.v}</p>
            </div>
          ))}
        </div>

        <p className="text-muted text-xs leading-relaxed">
          Estimates only. A {r.kw} kW system generates about {r.generation.toLocaleString("en-IN")} units a month and costs {inr(r.price)}
          {r.subsidy > 0 ? `, or ${inr(r.pays)} after the ${inr(r.subsidy)} PM Surya Ghar subsidy` : ""}, so it pays for itself in about {r.paybackMonths != null ? (r.paybackMonths / 12).toFixed(1) : "—"} years. Needs {SOLAR.roofSqFtPerKw} sq ft of shadow-free roof per kW. Your exact quote comes after a free site survey.
        </p>

        <Link href={`/contact?bill=${bill}&type=${type}`} className="btn btn-primary">Get an exact quote</Link>
      </div>
    </div>
  );
}

/* ---------- Founders ---------- */
/** Blank portrait slot; shows the photo once founders[i].photo is set in lib/site.ts. */
function FounderPhoto({ photo, alt }: { photo?: string; alt: string }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.4rem] border border-dashed border-line bg-gradient-to-b from-[var(--sky-mid)] to-[var(--bg-alt)]">
      {photo ? (
        <Image src={photo} alt={alt} fill sizes="(min-width:1024px) 22vw, 90vw" className="object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-muted" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-14 w-14 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
          </svg>
        </div>
      )}
    </div>
  );
}

export function FounderCard() {
  return (
    <div>
      <SectionHead eyebrow="Meet our founders" title="Two solar veterans, one *Jabalpur* mission" text={foundersMission} />
      <div className="grid gap-6 md:grid-cols-2">
        {founders.map((f, i) => {
          const label = f.name || `${f.role}, ${f.company}`;
          return (
            <Reveal key={i} delay={i * 0.12} className="card card-hover grid gap-6 p-5 sm:grid-cols-[0.8fr_1.2fr] sm:p-6">
              <FounderPhoto photo={f.photo} alt={label} />
              <div className="flex flex-col justify-center">
                <h3 className="font-display text-2xl">{f.name || f.role}</h3>
                <p className="text-brand mt-1 text-sm font-semibold">{f.name ? `${f.role} · ` : ""}{f.company}</p>
                <p className="text-muted mt-3 leading-relaxed">{f.bio}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.2} className="mt-8 text-center">
        <Link href="/about" className="btn btn-ghost">Our story</Link>
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
            <div
              id={`faq-${i}`}
              role="region"
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="text-muted px-5 pb-5">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- CTA band ---------- */
export function CtaBand({ title = "Ready to switch to solar?", text = "Book a free site survey. We will size the system honestly and handle the subsidy paperwork." }: { title?: string; text?: string }) {
  return (
    <Reveal className="relative isolate overflow-hidden rounded-[2rem] p-8 text-center text-white shadow-[0_40px_70px_-45px_rgba(27,33,66,.9)] sm:p-14" style={{ background: "linear-gradient(135deg,#1b2142 0%,#24427f 55%,#5b9be8 125%)" }}>
      {/* drifting light + sun rays, echoing the hero */}
      <div className="hero-blob absolute -bottom-1/2 -left-1/4 -z-10 h-full w-2/3 rounded-full bg-[#6aa8ee]/35 blur-[80px]" aria-hidden="true" />
      <div className="spin-slow absolute -top-28 -right-28 -z-10 h-80 w-80 rounded-full opacity-60" style={{ background: "repeating-conic-gradient(rgba(255,200,60,.55) 0 6deg, transparent 6deg 18deg)", maskImage: "radial-gradient(circle,#000 22%,transparent 66%)", WebkitMaskImage: "radial-gradient(circle,#000 22%,transparent 66%)" }} aria-hidden="true" />
      <div className="hero-float absolute top-6 right-6 -z-10 h-16 w-16 rounded-full sm:top-8 sm:right-10" style={{ background: "radial-gradient(circle at 38% 36%,#fff6a8,#ffd21f 55%,#f59e0b)", boxShadow: "0 0 70px 20px rgba(251,191,36,.5)" }} aria-hidden="true" />
      <h2 className="font-display text-3xl font-bold sm:text-5xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-white/85">{text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/contact" className="btn btn-accent">Book free survey</Link>
        <a href={`tel:${site.phone}`} className="btn border-[1.5px] border-white/40 bg-white/10 backdrop-blur hover:border-white">Call {site.phoneDisplay}</a>
        <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Green Arrow Solar, I want a solar quote.")}`} target="_blank" rel="noopener noreferrer" className="btn border-[1.5px] border-white/40 bg-white/10 backdrop-blur hover:border-white">WhatsApp</a>
      </div>
    </Reveal>
  );
}
