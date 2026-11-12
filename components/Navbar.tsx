"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { nav, site } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-2">
        <Logo priority />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-0.5 rounded-full border border-line bg-surface/60 p-1 shadow-[0_10px_30px_-22px_rgba(27,33,66,.6)] backdrop-blur-md xl:flex"
        >
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`relative rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors hover:text-brand ${
                isActive(l.href) ? "text-brand" : "text-ink hover:bg-brand-soft/50"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-brand-soft" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a href={`tel:${site.phone}`} className="btn btn-ghost !min-h-10 !gap-2 !py-1 !pr-2.5 !pl-1 whitespace-nowrap max-[400px]:hidden md:!pr-4" aria-label={`Call ${site.phoneDisplay}`}>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#15803d] text-white dark:bg-[#22a83a]">
              <PhoneIcon />
            </span>
            <span className="hidden font-semibold md:inline">{site.phoneDisplay}</span>
          </a>
          <Link href="/contact" className="btn btn-accent hidden !min-h-10 !px-5 whitespace-nowrap sm:inline-flex">
            Free Survey
          </Link>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line bg-surface xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <motion.div aria-hidden="true" style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-brand via-[#6aa8ee] to-accent" />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-y-auto bg-bg xl:hidden"
          >
            <nav aria-label="Mobile" className="container-x grid gap-1 py-6">
              {nav.map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3.5 font-display text-2xl ${isActive(l.href) ? "bg-brand-soft text-brand" : ""}`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-6 grid gap-3">
                <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary">Book a Free Survey</Link>
                <a href={`tel:${site.phone}`} className="btn btn-ghost"><PhoneIcon /> {site.phoneDisplay}</a>
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">WhatsApp us</a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}
