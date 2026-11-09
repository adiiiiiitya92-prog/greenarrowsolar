"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade / rise / un-blur into place on scroll. */
export function Reveal({ delay = 0, y = 28, className, children, ...rest }: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Heading text that rises word by word out of a mask (same motion as the home hero headline).
 * Words wrapped in *asterisks* get the sky-blue gradient used for "Solar" in the hero.
 */
export function RevealWords({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{text.replaceAll("*", "")}</span>
      <span aria-hidden="true">
        {words.map((w, i) => {
          const sky = w.startsWith("*") && w.endsWith("*");
          const word = sky ? w.slice(1, -1) : w;
          return (
            <Fragment key={i}>
              <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                <motion.span
                  className={`inline-block ${sky ? "text-sky" : ""}`}
                  initial={reduce ? { opacity: 0 } : { y: "110%" }}
                  whileInView={reduce ? { opacity: 1 } : { y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.9, delay: delay + i * 0.06, ease }}
                >
                  {word}
                </motion.span>
              </span>
              {i < words.length - 1 && " "}
            </Fragment>
          );
        })}
      </span>
    </span>
  );
}
