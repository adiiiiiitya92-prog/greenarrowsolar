import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Areas, Calculator, CtaBand, Facts, Faq, FounderCard, HowItWorks, ServicesGrid, TrustStrip } from "@/components/Sections";
import { SectionHead } from "@/components/SectionHead";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Solar Panel Installation Jabalpur | Green Arrow Solar" },
  description:
    "Green Arrow Solar — Jabalpur's trusted solar installer. Get rooftop solar with ₹78,000 subsidy. Free site survey. Call now for best solar panel prices.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <Hero />
      <TrustStrip />

      <section className="section container-x">
        <SectionHead eyebrow="What we do" title="Rooftop solar for every home, farm and business in Jabalpur" text="From a 1 kW home system to a factory rooftop plant, designed and installed by one accountable local team." />
        <ServicesGrid />
      </section>

      <section className="section section-sky">
        <div className="container-x">
          <SectionHead eyebrow="Why go solar in MP" title="The numbers speak for themselves" />
          <Facts />
        </div>
      </section>

      <section className="section container-x">
        <SectionHead eyebrow="How it works" title="From first call to free power in five steps" />
        <HowItWorks />
      </section>

      <section className="section section-sky">
        <div className="container-x">
          <SectionHead eyebrow="Savings calculator" title="Solar subsidy & savings calculator for MP" text="Move the slider to match your bill. See your system size, PM Surya Ghar subsidy, payback and EMI." />
          <Calculator />
        </div>
      </section>

      <section className="section container-x">
        <FounderCard />
      </section>

      <section className="section section-sky">
        <div className="container-x">
          <SectionHead eyebrow="Service areas" title="Solar across Jabalpur & Madhya Pradesh" text="Based in Jabalpur, serving homes, businesses and farms across the state." />
          <Areas />
        </div>
      </section>

      <section className="section container-x">
        <SectionHead eyebrow="FAQ" title="Solar questions from Jabalpur homeowners" />
        <Faq />
      </section>

      <section className="container-x pb-20">
        <CtaBand />
      </section>
    </>
  );
}
