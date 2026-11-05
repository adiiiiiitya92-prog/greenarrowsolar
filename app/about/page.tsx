import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand, FounderCard } from "@/components/Sections";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us – Jabalpur's Local Solar Installation Company",
  description: `Learn about ${site.name}, a Jabalpur-based solar installer helping homes, businesses and farms across Madhya Pradesh go solar with honest advice and local service.`,
  alternates: { canonical: "/about" },
};

const values = [
  { t: "Honest sizing", d: "We recommend the system you need, not the biggest one we can sell." },
  { t: "Paperwork handled", d: "Subsidy portal, DISCOM and net-metering formalities are our job, not yours." },
  { t: "Local, accountable", d: "A Jabalpur team you can call or visit — before and long after installation." },
  { t: "Quality components", d: "Certified panels, inverters and structures chosen for MP's heat, dust and monsoon." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="Powering Madhya Pradesh, one rooftop at a time" text={`${site.name} is a Jabalpur-based solar company on a simple mission: make clean, affordable power easy for every family and business in the region.`} />
      <section className="section container-x"><FounderCard /></section>
      <section className="section bg-bg-alt">
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
