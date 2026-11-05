"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site";

const stars = Array.from({ length: 46 }, (_, i) => ({
  x: (i * 53.7) % 100,
  y: (i * 29.3) % 62,
  s: 1 + ((i * 7) % 3),
  d: (i % 9) * 0.4,
}));

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  const sunScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const cloudA = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const cloudB = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const hill1 = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const hill2 = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const hill3 = useTransform(scrollYProgress, [0, 1], ["0%", "42%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const textO = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden" aria-labelledby="hero-title">
      {/* Sky */}
      <div className="absolute inset-0 -z-30 transition-colors duration-700" style={{ background: "linear-gradient(180deg,var(--sky-top) 0%,var(--sky-mid) 55%,var(--sky-low) 100%)" }} />

      {/* Stars (night only) */}
      <div className="stars absolute inset-0 -z-20" aria-hidden="true">
        {stars.map((s, i) => (
          <span key={i} className="twinkle absolute rounded-full bg-white" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />
        ))}
      </div>

      {/* Sun & moon share a slot and swap with the theme */}
      <motion.div style={{ y: sunY, scale: sunScale }} className="absolute top-[11%] right-[5%] -z-20 h-20 w-20 sm:top-[14%] sm:right-[8%] sm:h-40 sm:w-40 lg:right-[14%] lg:h-52 lg:w-52" aria-hidden="true">
        <div className="sun absolute inset-0">
          <div className="spin-slow absolute -inset-[45%] rounded-full opacity-70" style={{ background: "repeating-conic-gradient(from 0deg, rgba(255,200,60,.35) 0 6deg, transparent 6deg 18deg)", maskImage: "radial-gradient(circle,#000 28%,transparent 66%)", WebkitMaskImage: "radial-gradient(circle,#000 28%,transparent 66%)" }} />
          <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 35% 35%,#fff7c2,#fbbf24 55%,#f59e0b)", boxShadow: "0 0 90px 30px rgba(251,191,36,.55)" }} />
        </div>
        <div className="moon absolute inset-0">
          <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 35% 35%,#ffffff,#e5eaf7 60%,#b8c3e0)", boxShadow: "0 0 80px 20px rgba(165,180,252,.35)" }} />
          <span className="absolute top-[28%] left-[55%] h-[16%] w-[16%] rounded-full bg-slate-300/70" />
          <span className="absolute top-[58%] left-[28%] h-[22%] w-[22%] rounded-full bg-slate-300/60" />
          <span className="absolute top-[62%] left-[66%] h-[10%] w-[10%] rounded-full bg-slate-300/70" />
        </div>
      </motion.div>

      {/* Clouds */}
      <motion.div style={{ x: cloudA }} className="absolute top-[26%] left-[4%] -z-10 hidden h-10 w-40 sm:block rounded-full bg-white/70 blur-[2px] dark:bg-slate-300/10 sm:w-56" aria-hidden="true" />
      <motion.div style={{ x: cloudB }} className="absolute top-[38%] right-[2%] -z-10 hidden h-8 w-32 sm:block rounded-full bg-white/60 blur-[2px] dark:bg-slate-300/10 sm:w-44" aria-hidden="true" />

      {/* Hills (3 depth layers) */}
      <motion.svg style={{ y: hill1 }} className="absolute inset-x-0 bottom-[18%] -z-10 h-[30%] w-full" viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 180 C240 60 420 60 640 150 S1100 240 1440 90 V300 H0Z" style={{ fill: "var(--hill-1)" }} />
      </motion.svg>
      <motion.svg style={{ y: hill2 }} className="absolute inset-x-0 bottom-[8%] -z-10 h-[30%] w-full" viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 140 C300 260 520 40 800 130 S1250 220 1440 110 V300 H0Z" style={{ fill: "var(--hill-2)" }} />
      </motion.svg>
      <motion.svg style={{ y: hill3 }} className="absolute inset-x-0 bottom-0 -z-10 h-[30%] w-full" viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 120 C260 40 500 220 760 150 S1200 40 1440 140 V300 H0Z" style={{ fill: "var(--hill-3)" }} />
      </motion.svg>

      {/* Foreground solar array */}
      <motion.div style={{ y: hill3 }} className="absolute inset-x-0 bottom-[3%] z-0 flex justify-center gap-1.5 px-2 sm:gap-2" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, rotateX: 40 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.8, ease: "easeOut" }}
            className="relative h-14 w-1/6 max-w-28 -skew-x-12 overflow-hidden rounded-[3px] border border-sky-200/60 sm:h-20"
            style={{ background: "repeating-linear-gradient(90deg,transparent 0 22%,rgba(255,255,255,.18) 22% 23%),repeating-linear-gradient(0deg,transparent 0 33%,rgba(255,255,255,.18) 33% 34%),linear-gradient(135deg,#1e3a8a,#1e40af 55%,#2563eb)" }}
          >
            <span className="glint absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent" style={{ animationDelay: `${i * 0.5}s` }} />
          </motion.div>
        ))}
      </motion.div>

      {/* Copy */}
      <motion.div style={{ y: textY, opacity: textO }} className="container-x relative z-10 flex min-h-[100svh] flex-col justify-center pt-36 pb-[38vh] sm:pt-28 sm:pb-[34vh]">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="eyebrow">
          Jabalpur · Madhya Pradesh
        </motion.p>
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-display mt-3 max-w-2xl text-[2.5rem] leading-[1.05] font-semibold sm:text-6xl lg:text-7xl"
        >
          Turn your rooftop into a <em className="text-brand not-italic">power plant.</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-3 max-w-xl text-lg font-medium">
          अपनी छत से बनाइए अपनी बिजली — जबलपुर और पूरे मध्य प्रदेश में।
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-3 max-w-xl text-base text-ink/80 dark:text-ink/85">
          Cut your electricity bill by up to 90%, claim up to ₹78,000 government subsidy, and get free survey, net metering and installation from one local team.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-7 flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">Book a free site survey</Link>
          <a href="#calculator" className="btn btn-ghost">Calculate my savings</a>
          <a href={`tel:${site.phone}`} className="btn btn-ghost sm:hidden">Call now</a>
        </motion.div>
      </motion.div>
    </section>
  );
}
