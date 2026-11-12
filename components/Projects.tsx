"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal, RevealWords } from "./Motion";
import { skyTitle } from "./SectionHead";
import { projects } from "@/lib/site";

export function ProjectsSlider() {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () =>
      setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function step(dir: 1 | -1) {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: "smooth" });
  }

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <Reveal y={14}><p className="eyebrow">Our projects</p></Reveal>
          <h2 className="font-display mt-4 text-3xl leading-[1.08] font-bold sm:text-5xl">
            <RevealWords text={skyTitle("Our latest solar installations")} delay={0.1} />
          </h2>
          <Reveal delay={0.25} y={16}>
            <p className="text-muted mt-4 text-lg">Real homes and businesses now running on sunshine — designed and installed by our team.</p>
          </Reveal>
        </div>
        <div className="flex gap-2">
          <ArrowButton label="Previous project" disabled={edge.start} onClick={() => step(-1)} flip />
          <ArrowButton label="Next project" disabled={edge.end} onClick={() => step(1)} />
        </div>
      </div>

      <ul
        ref={track}
        aria-label="Completed solar installations"
        tabIndex={0}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-brand [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p, i) => (
          <li key={p.photo} className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]">
            <Reveal delay={i * 0.08} y={20}>
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-40px_rgba(27,33,66,.8)]">
                <Image
                  src={p.photo}
                  alt={`${p.kw} kW solar installation for ${p.name}, ${p.place}`}
                  fill
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 82vw"
                  style={{ objectPosition: p.focus }}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="inline-block rounded-full bg-[#ffc21f] px-3 py-1 text-sm font-bold text-[#1b2142]">{p.kw} kW</span>
                  <p className="font-display mt-3 text-2xl font-bold">{p.name}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-white/85">
                    <PinIcon /> {p.place}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArrowButton({ label, disabled, onClick, flip }: { label: string; disabled: boolean; onClick: () => void; flip?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-line bg-surface transition-colors hover:border-brand hover:text-brand disabled:cursor-default disabled:opacity-40 disabled:hover:border-line disabled:hover:text-current"
    >
      <svg viewBox="0 0 24 24" className={`h-5 w-5 ${flip ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}
