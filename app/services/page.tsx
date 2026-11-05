import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand, ServicesGrid, HowItWorks } from "@/components/Sections";
import { SectionHead } from "@/components/SectionHead";

export const metadata: Metadata = {
  title: "Solar Services – Rooftop, Commercial, Solar Pumps & Hybrid in MP",
  description:
    "Residential rooftop solar, commercial & industrial plants, solar water pumps and off-grid/hybrid battery systems across Jabalpur and Madhya Pradesh. Get a free quote.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Our services" title="Solar solutions built for Madhya Pradesh" text="Whether it is a home in Jabalpur, a shop in Katni or a farm in Narsinghpur, we have a system that fits." />
      <section className="section container-x"><ServicesGrid /></section>
      <section className="section bg-bg-alt">
        <div className="container-x">
          <SectionHead eyebrow="Process" title="How every project runs" />
          <HowItWorks />
        </div>
      </section>
      <section className="container-x section"><CtaBand /></section>
    </>
  );
}
