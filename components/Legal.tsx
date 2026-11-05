import { PageHero } from "./PageHero";

export function Legal({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} text={`Last updated: ${updated}`} />
      <article className="container-x section [&_h2]:font-display [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-2xl [&_li]:ml-5 [&_li]:list-disc [&_p]:text-muted [&_li]:text-muted max-w-3xl [&_p]:mt-2 [&_ul]:mt-2">
        {children}
      </article>
    </>
  );
}
