import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Areas, Calculator, CtaBand, Faq } from "@/components/Sections";
import { SectionHead } from "@/components/SectionHead";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Motion";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solar Panel Installation in Jabalpur – Rooftop Solar & Subsidy",
  description:
    "Rooftop solar installation in Jabalpur for homes and businesses. Free survey, PM Surya Ghar subsidy up to ₹78,000, MPPKVVCL net metering and local after-sales service.",
  alternates: { canonical: "/solar-panel-installation-jabalpur" },
};

const localities = ["Napier Town", "Vijay Nagar", "Wright Town", "Adhartal", "Ranjhi", "Madan Mahal", "Gorakhpur", "Civil Lines", "Bhawartal", "Gwarighat", "Panagar", "Sihora"];

export default function JabalpurPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Rooftop solar installation",
          provider: { "@id": `${site.url}/#business` },
          areaServed: { "@type": "City", name: "Jabalpur" },
          name: "Solar panel installation in Jabalpur",
        }}
      />
      <PageHero eyebrow="Jabalpur, Madhya Pradesh" title="Solar panel installation in Jabalpur" text="Your local rooftop solar team — free survey, subsidy and net-metering paperwork, installation and service, all within Jabalpur." />

      <section className="section container-x grid gap-8 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-3xl">Why Jabalpur homes are switching to solar</h2>
          <p className="text-muted mt-4">Jabalpur receives strong sunshine for most of the year, and domestic electricity tariffs keep rising. A well-designed rooftop system typically generates around 4 units per kW every day and can bring a household bill close to zero.</p>
          <p className="text-muted mt-3">As a Jabalpur-based company we understand local roofs, water tanks and shade patterns, and we deal with MPPKVVCL (East Discom) for net-metering approvals regularly.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">Book free survey in Jabalpur</Link>
            <a href={`tel:${site.phone}`} className="btn btn-ghost">{site.phoneDisplay}</a>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="card p-6">
          <h2 className="font-display text-2xl">Localities we serve</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {localities.map((l) => <li key={l} className="chip">{l}</li>)}
          </ul>
          <h3 className="font-display mt-6 text-xl">Typical subsidy-eligible home system</h3>
          <ul className="text-muted mt-2 grid gap-1 text-sm">
            <li>• 2–3 kW on-grid rooftop system</li>
            <li>• Central subsidy up to ₹78,000 (as per current scheme)</li>
            <li>• Net-metering with MPPKVVCL</li>
            <li>• Generation monitoring on your phone</li>
          </ul>
        </Reveal>
      </section>

      <section className="section bg-bg-alt"><div className="container-x"><Calculator /></div></section>

      <section className="section container-x">
        <SectionHead eyebrow="FAQ" title="Solar in Jabalpur — your questions" />
        <Faq />
        <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      </section>

      <section className="section bg-bg-alt">
        <div className="container-x">
          <SectionHead eyebrow="Beyond Jabalpur" title="We also serve nearby districts" />
          <Areas />
        </div>
      </section>
      <section className="container-x section"><CtaBand /></section>
    </>
  );
}
