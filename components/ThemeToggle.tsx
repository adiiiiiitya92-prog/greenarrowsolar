"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with class set by the pre-paint script
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next ? "#060d1a" : "#fffbf2");
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={dark === true}
      aria-label={dark ? "Switch to day mode" : "Switch to night mode"}
      className="relative h-10 w-[4.5rem] shrink-0 cursor-pointer rounded-full border border-line bg-surface p-1 transition-colors hover:border-brand"
    >
      <motion.span
        className="grid h-8 w-8 place-items-center rounded-full bg-amber-400 text-amber-950 shadow dark:bg-indigo-300 dark:text-indigo-950"
        animate={{ x: dark ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {dark ? (
            <motion.svg key="m" viewBox="0 0 24 24" className="h-4 w-4" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <path fill="currentColor" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
            </motion.svg>
          ) : (
            <motion.svg key="s" viewBox="0 0 24 24" className="h-4 w-4" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <circle cx="12" cy="12" r="4.5" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
              </g>
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
