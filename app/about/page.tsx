import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand, FounderCard } from "@/components/Sections";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Motion";
import { about, parentCompanies, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us – Solar Company in Jabalpur, MP",
  description: `${site.name} is a Jabalpur solar company founded by two industry veterans, backed by Green Energy Solutions Pvt. Ltd. (Nagpur) and Solar Trees.`,
  alternates: { canonical: "/about" },
};

const values = [
  { t: "Honest sizing", d: "We recommend the system you need, not the biggest one we can sell." },
  { t: "Paperwork handled", d: "Subsidy portal, DISCOM and net-metering formalities are our job, not yours." },
  { t: "Local, accountable", d: "A Jabalpur team you can call or visit — before and long after installation." },
  { t: "Quality components", d: "Subsidy-eligible panels, inverters and structures chosen for MP's heat, dust and monsoon." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="Jabalpur's solar company, backed by proven experience" text={about.intro} />

      <section className="section container-x">
        <div className="grid gap-5 md:grid-cols-[1.2fr_1fr_1fr]">
          <Reveal className="card p-7">
            <p className="eyebrow">Not newcomers</p>
            <p className="font-display mt-4 text-2xl leading-snug font-semibold">{about.notNew}</p>
          </Reveal>
          <Reveal delay={0.08} className="card card-hover p-7">
            <h2 className="font-display text-sky text-2xl">Our mission</h2>
            <p className="text-muted mt-3">{about.mission}</p>
          </Reveal>
          <Reveal delay={0.16} className="card card-hover p-7">
            <h2 className="font-display text-sky text-2xl">Our vision</h2>
            <p className="text-muted mt-3">{about.vision}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section-sky">
        <div className="container-x"><FounderCard /></div>
      </section>

      <section className="section container-x">
        <SectionHead eyebrow="Our parent companies" title="The experience behind Green Arrow Solar" />
        <div className="grid gap-5 md:grid-cols-2">
          {parentCompanies.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.1} className="card card-hover p-7">
              <h3 className="font-display text-2xl">{c.name}</h3>
              <p className="text-brand mt-1 text-sm font-semibold">{c.place}</p>
              <p className="text-muted mt-3">{c.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section-sky">
        <div className="container-x">
          <SectionHead eyebrow="What we stand for" title="Our promise to you" />
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.08} className="card card-hover p-6">
                <h3 className="font-display text-xl">{v.t}</h3>
                <p className="text-muted mt-2">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="container-x section"><CtaBand /></section>
    </>
  );
}
