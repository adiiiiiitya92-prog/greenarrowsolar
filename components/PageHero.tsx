import { Reveal } from "./Motion";

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20" style={{ background: "linear-gradient(180deg,var(--sky-top) -40%,var(--sky-mid) 60%,var(--bg) 100%)" }}>
      <div className="sun pointer-events-none absolute -top-16 -right-16 -z-10 h-56 w-56 rounded-full sm:h-72 sm:w-72" style={{ background: "radial-gradient(circle at 35% 35%,#fff7c2,#fbbf24 60%,#f59e0b)", boxShadow: "0 0 120px 40px rgba(251,191,36,.4)" }} aria-hidden="true" />
      <div className="moon pointer-events-none absolute -top-16 -right-16 -z-10 h-56 w-56 rounded-full sm:h-72 sm:w-72" style={{ background: "radial-gradient(circle at 35% 35%,#fff,#d7def2 60%,#aab6d8)", boxShadow: "0 0 100px 20px rgba(165,180,252,.3)" }} aria-hidden="true" />
      <div className="container-x">
        <Reveal><p className="eyebrow">{eyebrow}</p></Reveal>
        <Reveal delay={0.08}><h1 className="font-display mt-3 max-w-3xl text-4xl leading-tight font-semibold sm:text-6xl">{title}</h1></Reveal>
        {text && <Reveal delay={0.16}><p className="mt-4 max-w-2xl text-lg text-ink/80">{text}</p></Reveal>}
      </div>
    </section>
  );
}
