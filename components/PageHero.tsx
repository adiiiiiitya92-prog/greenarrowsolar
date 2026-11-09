import { Reveal, RevealWords } from "./Motion";
import { SkyBackdrop } from "./SkyBackdrop";
import { skyTitle } from "./SectionHead";

/** Inner-page hero in the same pastel-sky style as the home hero. */
export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24" style={{ background: "var(--bg)" }}>
      <SkyBackdrop />

      {/* sun by day, moon by night (CSS swaps them with the theme) */}
      <div className="pointer-events-none absolute top-24 right-[6%] -z-10 h-24 w-24 sm:top-28 sm:h-36 sm:w-36" aria-hidden="true">
        <div className="sun absolute inset-0">
          <div className="hero-float absolute inset-0">
            <div className="spin-slow absolute -inset-[45%] rounded-full opacity-70" style={{ background: "repeating-conic-gradient(from 0deg, rgba(255,190,40,.45) 0 6deg, transparent 6deg 18deg)", maskImage: "radial-gradient(circle,#000 30%,transparent 66%)", WebkitMaskImage: "radial-gradient(circle,#000 30%,transparent 66%)" }} />
            <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 38% 36%,#fff6a8,#ffd21f 55%,#f59e0b)", boxShadow: "0 0 80px 24px rgba(251,191,36,.45)" }} />
          </div>
        </div>
        <div className="moon absolute inset-0">
          <div className="hero-float absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 35% 35%,#fff,#d7def2 60%,#aab6d8)", boxShadow: "0 0 80px 18px rgba(165,180,252,.3)" }} />
        </div>
      </div>

      <div className="container-x">
        <Reveal y={14}><p className="eyebrow">{eyebrow}</p></Reveal>
        <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.04] font-bold sm:text-6xl lg:text-7xl">
          <RevealWords text={skyTitle(title)} delay={0.1} />
        </h1>
        {text && <Reveal delay={0.3} y={16}><p className="text-muted mt-5 max-w-2xl text-lg">{text}</p></Reveal>}
      </div>
    </section>
  );
}
