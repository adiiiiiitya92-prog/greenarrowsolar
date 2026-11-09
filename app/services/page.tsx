import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand, ServicesGrid, HowItWorks } from "@/components/Sections";
import { SectionHead } from "@/components/SectionHead";
import { JsonLd } from "@/components/JsonLd";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solar Services – Rooftop, Commercial, Solar Pumps & Hybrid in MP",
  description:
    "Residential rooftop solar, commercial & industrial plants, solar water pumps and off-grid/hybrid battery systems across Jabalpur and Madhya Pradesh. Get a free quote.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={services.map((s) => ({
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          description: s.short,
          serviceType: s.title,
          url: `${site.url}/services#${s.slug}`,
          provider: { "@id": `${site.url}/#business` },
          areaServed: { "@type": "State", name: "Madhya Pradesh" },
        }))}
      />
      <PageHero eyebrow="Our services" title="Solar solutions built for Madhya Pradesh" text="Whether it is a home in Jabalpur, a shop in Katni or a farm in Narsinghpur, we have a system that fits." />
      <section className="section container-x"><ServicesGrid /></section>
      <section className="section section-sky">
        <div className="container-x">
          <SectionHead eyebrow="Process" title="How every project runs" />
          <HowItWorks />
        </div>
      </section>
      <section className="container-x section"><CtaBand /></section>
    </>
  );
}
