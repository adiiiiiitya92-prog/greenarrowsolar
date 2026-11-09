"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { SkyBackdrop } from "./SkyBackdrop";

/*
 * Bento hero — layout mirrors the reference:
 *  - a 4-column photo grid on the right (cols 2–4 in rows 1–2, a wide tile across cols 1–2 in row 3)
 *  - the copy overlaps the empty top-left of that grid on desktop
 *  - a floating sun beside "Solar" and a wind turbine standing in the empty cell above the panels
 * Sizes on desktop are in container-query units so the composition keeps its proportions at every width.
 */

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden" style={{ background: "var(--hero-bg)" }}>
      <SkyBackdrop />

      <div className="container-x pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-20">
        <div className="relative [container-type:inline-size]">
          {/* ---------- Copy ---------- */}
          <div className="relative z-10 lg:absolute lg:-top-[3.4cqw] lg:left-0 lg:w-[36%]">
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="mb-4 flex max-w-sm items-start gap-2 text-[0.92rem] leading-snug font-semibold text-brand lg:mb-[1.6cqw] lg:max-w-none lg:text-[clamp(.85rem,1.35cqw,1.02rem)]"
            >
              <span aria-hidden="true" className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff6a8,#ffd21f_55%,#f59e0b)] shadow-[0_0_0_3px_rgba(255,210,31,.25)]" />
              Rooftop Solar Panel Installation in Jabalpur, Madhya Pradesh
            </motion.h1>
            <p className="font-sans leading-[0.98] font-bold tracking-[-0.035em] text-[3.7rem] min-[420px]:text-[4.4rem] sm:text-[5.6rem] lg:text-[9.6cqw]" style={{ color: "var(--hero-ink)" }}>
              <span className="relative block w-fit">
                <MaskLine delay={0.05}>
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(180deg,var(--hero-solar-a),var(--hero-solar-b))" }}>
                    Solar
                  </span>
                </MaskLine>
                <Sun />
              </span>
              <MaskLine delay={0.15}>Energy</MaskLine>
            </p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease }}
              className="mt-4 max-w-md text-[0.98rem] leading-relaxed sm:text-[1.05rem] lg:mt-[1.4cqw] lg:max-w-none lg:pr-[2cqw] lg:text-[clamp(.9rem,1.45cqw,1.1rem)]"
              style={{ color: "var(--hero-muted)" }}
            >
              Green Arrow Solar designs and installs rooftop solar for homes, businesses and farms across Jabalpur &amp; Madhya Pradesh —
              subsidy and net-metering handled for you.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.48, ease }} className="mt-7 lg:mt-[3cqw]">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[0.95rem] font-semibold text-white shadow-[0_12px_24px_-14px_rgba(27,33,66,.9)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_30px_-14px_rgba(27,33,66,.9)] dark:text-[#071021]"
                style={{ background: "var(--hero-ink)" }}
              >
                Book Free Survey
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* ---------- Bento grid ---------- */}
          <div className="relative mt-16 max-sm:pb-[5.5rem] sm:mt-20 lg:static lg:mt-0 lg:ml-[26.5%] [container-type:inline-size]">
            <div className="grid aspect-[442/326] grid-cols-4 grid-rows-[0.95fr_1fr_1.11fr] gap-[2.3cqw]">
              {/* r1 c1 — the stat fills this empty corner; on desktop it moves to the bottom-left of the hero */}
              <div className="col-start-1 row-span-2 row-start-1 flex items-end">
                <Stat />
              </div>

              {/* r1 c2 — turbine */}
              <div className="relative col-start-2 row-start-1">
                <Turbine />
              </div>

              <PhotoTile src="/hero/worker-top.webp" alt="Solar technician in a safety helmet" className="col-start-3 row-start-1" i={1} pos="center 70%" />

              {/* r1 c4 — subsidy card */}
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.9, ease }}
                className="col-start-4 row-start-1"
              >
                <div className={`flex h-full flex-col justify-between rounded-[clamp(12px,4.6cqw,22px)] p-[3cqw] shadow-[0_20px_40px_-28px_rgba(27,33,66,.45)] ${reduce ? "" : "hero-float"}`} style={{ background: "var(--hero-card)" }}>
                  <div>
                    <p className="text-[clamp(1rem,5.2cqw,2.2rem)] leading-none font-semibold tracking-tight" style={{ color: "var(--hero-solar-b)" }}>
                      ₹<CountUp to={78} />K
                    </p>
                    <p className="mt-[1.4cqw] text-[clamp(.62rem,1.75cqw,.82rem)] leading-snug font-medium max-sm:hidden" style={{ color: "var(--hero-muted)" }}>
                      Max subsidy under PM Surya Ghar
                    </p>
                  </div>
                  <div className="flex -space-x-[1.4cqw]" aria-label="For homes, shops and farms">
                    {SEGMENTS.map((s) => (
                      <span key={s.label} title={s.label} className="grid aspect-square w-[clamp(20px,6cqw,34px)] place-items-center rounded-full border-2 text-white" style={{ background: s.color, borderColor: "var(--hero-card)" }}>
                        <svg viewBox="0 0 24 24" className="h-[55%] w-[55%]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d={s.icon} />
                        </svg>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <PhotoTile src="/hero/panels.webp" alt="Rows of blue solar panels" className="col-start-2 row-start-2" i={0} />
              <PhotoTile src="/hero/worker.webp" alt="Installer inspecting a rooftop solar plant" className="col-start-3 row-start-2" i={2} preload />
              <PhotoTile src="/hero/array.webp" alt="Ground-mounted solar array on grass" className="col-start-4 row-start-2" i={3} />

              {/* r3 c1–2 — wide rooftop card */}
              <PhotoTile src="/hero/rooftop.webp" alt="Solar panels on a home rooftop" className="col-span-2 col-start-1 row-start-3" i={4} pos="right center" sizes="(min-width:1024px) 34vw, 50vw">
                <div className="absolute inset-0 flex flex-col p-[3.4cqw] text-white">
                  <p className="flex items-center gap-[1cqw] text-[clamp(.55rem,1.45cqw,.72rem)] font-bold tracking-[0.08em] uppercase">
                    <MiniSun /> Subsidy Ready
                  </p>
                  <p className="mt-auto max-w-[52%] text-[clamp(.85rem,3.4cqw,1.55rem)] leading-[1.15] font-semibold tracking-tight drop-shadow-[0_2px_10px_rgba(20,60,120,.35)] max-sm:max-w-[60%]">
                    Cut Your Bill With Rooftop Solar
                  </p>
                </div>
              </PhotoTile>

              <PhotoTile src="/hero/worker-tablet.webp" alt="Technician checking generation on a tablet" className="col-start-3 row-start-3" i={5} pos="center 20%" />

              {/* r3 c4 — text block (sits under the grid on phones, where the cell is too narrow) */}
              <SmartBlock className="col-start-4 row-start-3 flex pl-[0.6cqw] max-sm:absolute max-sm:inset-x-0 max-sm:bottom-0 max-sm:pl-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- pieces ---------------- */

const SEGMENTS = [
  { label: "Homes", color: "#6aa8ee", icon: "M3 11l9-7 9 7M5 10v10h14V10" },
  { label: "Shops & businesses", color: "#f59e0b", icon: "M4 9h16l-1-5H5L4 9Zm0 0v11h16V9M9 20v-6h6v6" },
  { label: "Farms & pumps", color: "#1a7a22", icon: "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" },
];

/** Line of the headline that slides up out of a mask. */
function MaskLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, delay, ease }}>
        {children}
      </motion.span>
    </span>
  );
}

/** Photo tile with a clip-path reveal and slow hover zoom. */
function PhotoTile({
  src, alt, className = "", i, pos = "center", preload = false, sizes = "(min-width:1024px) 17vw, 25vw", children,
}: {
  src: string; alt: string; className?: string; i: number; pos?: string; preload?: boolean; sizes?: string; children?: React.ReactNode;
}) {
  const delay = 0.35 + i * 0.11;
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-[clamp(12px,4.6cqw,22px)] shadow-[0_22px_40px_-30px_rgba(27,33,66,.55)] ${className}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      transition={{ duration: 1.05, delay, ease }}
    >
      <motion.div className="absolute inset-0" initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 1.5, delay, ease }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          loading={preload ? undefined : "eager"}
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.08]"
          style={{ objectPosition: pos }}
        />
      </motion.div>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
      {children}
    </motion.div>
  );
}

/** Spiky sun that sits beside "Solar". */
function Sun() {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute top-[-0.2em] left-[calc(100%+0.06em)] block w-[0.62em]"
      initial={{ opacity: 0, scale: 0.4, rotate: -60 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, delay: 0.55, ease }}
    >
      <span className="hero-float block" style={{ animationDuration: "7s" }}>
        <svg viewBox="0 0 100 100" className="block w-full overflow-visible drop-shadow-[0_0_18px_rgba(251,191,36,.55)]">
          <defs>
            <radialGradient id="sun-core" cx="40%" cy="38%" r="65%">
              <stop offset="0" stopColor="#fff6a8" />
              <stop offset=".55" stopColor="#ffd21f" />
              <stop offset="1" stopColor="#f59e0b" />
            </radialGradient>
          </defs>
          <g className="hero-spin" style={{ transformOrigin: "50px 50px", animationDuration: "40s" }}>
            {Array.from({ length: 24 }, (_, k) => (
              <path key={k} d={k % 2 ? "M50 6 L52.6 22 L47.4 22 Z" : "M50 0 L53.4 22 L46.6 22 Z"} fill={k % 2 ? "#ffcf2e" : "#ffb703"} transform={`rotate(${k * 15} 50 50)`} />
            ))}
          </g>
          <circle cx="50" cy="50" r="25" fill="url(#sun-core)" />
        </svg>
      </span>
    </motion.span>
  );
}

function MiniSun() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.6em] w-[1.6em]" aria-hidden="true">
      <g className="hero-spin" style={{ transformOrigin: "12px 12px", animationDuration: "18s" }}>
        {Array.from({ length: 12 }, (_, k) => (
          <rect key={k} x="11.2" y="1" width="1.6" height="5" rx=".8" fill="#ffd21f" transform={`rotate(${k * 30} 12 12)`} />
        ))}
      </g>
      <circle cx="12" cy="12" r="5" fill="#ffd21f" />
    </svg>
  );
}

/** White wind turbine; stands in the empty cell and its tower runs down to the tile below. */
function Turbine() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[-2.4cqw] left-1/2 w-[112%] -translate-x-1/2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.7, ease }}
    >
      <svg viewBox="0 0 120 134" className="block w-full overflow-visible drop-shadow-[0_10px_14px_rgba(60,90,140,.18)]">
        <defs>
          <linearGradient id="tb-tower" x1="0" x2="1">
            <stop offset="0" stopColor="#e6ecf4" />
            <stop offset=".45" stopColor="#ffffff" />
            <stop offset="1" stopColor="#c9d3e0" />
          </linearGradient>
          <linearGradient id="tb-blade" x1="0" x2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#d5dde8" />
          </linearGradient>
        </defs>
        <path d="M58 62 L62 62 L64 134 L56 134 Z" fill="url(#tb-tower)" />
        <rect x="55" y="56.5" width="12" height="7" rx="3.5" fill="#eef2f7" />
        <g className="hero-spin" style={{ transformOrigin: "60px 60px" }}>
          {[0, 120, 240].map((r) => (
            <path key={r} d="M59.6 60 C56.8 44 57.6 20 60.2 4 C63.4 18 64.6 42 63 58 Z" fill="url(#tb-blade)" stroke="#d3dbe6" strokeWidth=".4" transform={`rotate(${r} 60 60)`} />
          ))}
          <circle cx="60" cy="60" r="4.2" fill="#f4f7fb" stroke="#cdd6e2" strokeWidth=".6" />
        </g>
      </svg>
    </motion.div>
  );
}

function SmartBlock({ className = "" }: { className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.25, ease }} className={`flex-col justify-end ${className}`}>
      <p className="text-[clamp(.95rem,2.6cqw,1.15rem)] leading-tight font-semibold" style={{ color: "var(--hero-ink)" }}>
        Solar For Homes, Farms &amp; Business
      </p>
      <p className="mt-1.5 text-[clamp(.78rem,1.6cqw,.85rem)] leading-snug sm:mt-[1.2cqw]" style={{ color: "var(--hero-muted)" }}>
        On-grid, hybrid and solar pump systems — sized honestly and fitted by our own trained crew.
      </p>
    </motion.div>
  );
}

function Stat() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75, ease }} className="lg:absolute lg:bottom-0 lg:left-0 lg:z-10" style={{ color: "var(--hero-ink)" }}>
      <p className="relative inline-block text-[clamp(1.9rem,10cqw,3.4rem)] leading-none font-semibold tracking-[-0.04em] lg:text-[9cqw]">
        <CountUp to={300} />
        <span className="absolute top-[-0.12em] left-full ml-[0.04em] text-[0.42em] font-medium">+</span>
      </p>
      <p className="mt-1 text-[clamp(.7rem,2.4cqw,.95rem)] font-medium lg:text-[clamp(.85rem,1.9cqw,1rem)]" style={{ color: "var(--hero-muted)" }}>
        Sunny days a year in MP
      </p>
    </motion.div>
  );
}

/** Counts up once when visible; renders the final number for SSR / no-JS / reduced motion. */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const controls = animate(0, to, { duration: 1.8, delay: 0.6, ease, onUpdate: (v) => (el.textContent = Math.round(v).toString()) });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return <span ref={ref}>{to}</span>;
}
