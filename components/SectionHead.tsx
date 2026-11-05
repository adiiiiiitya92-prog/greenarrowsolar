import { Reveal } from "./Motion";

export function SectionHead({ eyebrow, title, text, center = true }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <Reveal className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display mt-2 text-3xl leading-tight font-semibold sm:text-5xl">{title}</h2>
      {text && <p className="text-muted mt-3 text-lg">{text}</p>}
    </Reveal>
  );
}
