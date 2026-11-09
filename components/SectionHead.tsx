import { Reveal, RevealWords } from "./Motion";

/** Highlights the last word in the hero's sky gradient unless the title already marks words with *asterisks*. */
export function skyTitle(title: string) {
  if (title.includes("*")) return title;
  const words = title.split(" ");
  words[words.length - 1] = `*${words[words.length - 1]}*`;
  return words.join(" ");
}

export function SectionHead({ eyebrow, title, text, center = true }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <Reveal y={14}><p className="eyebrow">{eyebrow}</p></Reveal>
      <h2 className="font-display mt-4 text-3xl leading-[1.08] font-bold sm:text-5xl">
        <RevealWords text={skyTitle(title)} delay={0.1} />
      </h2>
      {text && <Reveal delay={0.25} y={16}><p className="text-muted mt-4 text-lg">{text}</p></Reveal>}
    </div>
  );
}
