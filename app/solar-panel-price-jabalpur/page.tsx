import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Calculator, CtaBand } from "@/components/Sections";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Motion";
import { JsonLd } from "@/components/JsonLd";
import { homeQuote, SOLAR } from "@/lib/solar";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solar Panel Price in Jabalpur 2026 (With Subsidy)",
  description: "Rooftop solar panel price in Jabalpur from 1 kW to 10 kW, with PM Surya Ghar subsidy, monthly generation, roof space and EMI. Free site survey for an exact quote.",
  alternates: { canonical: "/solar-panel-price-jabalpur" },
};

const SIZES = [1, 2, 2.5, 3, 3.6, 4, 5, 6, 8, 10];
const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export default function PricePage() {
  const rows = SIZES.map(homeQuote);
  const three = homeQuote(3);
  const faqs = [
    {
      q: "What is the price of a 3 kW solar system in Jabalpur?",
      a: `A 3 kW rooftop system costs about ${inr(three.price)}. After the ${inr(three.subsidy)} PM Surya Ghar subsidy you pay about ${inr(three.pays)}. It generates around ${three.units} units a month.`,
    },
    {
      q: "How much subsidy do I get on rooftop solar in Jabalpur?",
      a: `Homes get ₹30,000 per kW for the first 2 kW and ₹18,000 for the third kW under PM Surya Ghar Muft Bijli Yojana, capped at ${inr(SOLAR.subsidy.cap)} for 3 kW and above. Businesses and industries are not covered by this scheme.`,
    },
    {
      q: "What does solar cost for a business or factory in Jabalpur?",
      a: `Commercial and industrial systems are priced at about ${inr(SOLAR.businessPricePerKw)} per kW, with no PM Surya Ghar subsidy. Use the calculator and choose Business or Industry for an estimate.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <PageHero
        eyebrow="Solar panel price"
        title="Solar panel price in Jabalpur with subsidy"
        text={`Rooftop solar prices for homes in Jabalpur and Madhya Pradesh, after the PM Surya Ghar subsidy of up to ${inr(SOLAR.subsidy.cap)}.`}
      />

      <section className="section container-x">
        <SectionHead eyebrow="2026 price list" title="Home rooftop solar prices by system size" text="Your exact quote comes after a free site survey." />
        <Reveal className="card overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <caption className="sr-only">Rooftop solar price list for homes in Jabalpur</caption>
            <thead className="text-muted border-b border-line text-xs uppercase tracking-wider">
              <tr>
                <th scope="col" className="px-5 py-4">System</th>
                <th scope="col" className="px-5 py-4">Price</th>
                <th scope="col" className="px-5 py-4">Govt. subsidy</th>
                <th scope="col" className="px-5 py-4">You pay</th>
                <th scope="col" className="px-5 py-4">Units / month</th>
                <th scope="col" className="px-5 py-4">Roof needed</th>
                <th scope="col" className="px-5 py-4">EMI / month*</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.kw} className="border-b border-line/70 transition-colors last:border-0 hover:bg-brand-soft/50">
                  <th scope="row" className="font-display px-5 py-4 text-base font-semibold">
                    {r.kw} kW{r.indicative && <span className="text-muted ml-1 align-super text-[0.65rem]" title="Indicative price">†</span>}
                  </th>
                  <td className="px-5 py-4">{inr(r.price)}</td>
                  <td className="text-success px-5 py-4 font-semibold">– {inr(r.subsidy)}</td>
                  <td className="px-5 py-4 font-semibold">{inr(r.pays)}</td>
                  <td className="px-5 py-4">~{r.units}</td>
                  <td className="px-5 py-4">{r.roofSqFt} sq ft</td>
                  <td className="px-5 py-4">{inr(r.emi)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="text-muted mt-4 text-xs leading-relaxed">
          * EMI after a {Math.round(SOLAR.downPaymentPct * 100)}% down payment, at {SOLAR.emiInterestPct}% a year for {SOLAR.emiYears} years. † Indicative price outside our standard 3–5 kW list. Subsidy as per current PM Surya Ghar Muft Bijli Yojana rules for homes. Business and industrial systems are about {inr(SOLAR.businessPricePerKw)} per kW without subsidy. All prices are estimates; the exact price is confirmed after a free site survey.
        </p>
      </section>

      <section className="section section-sky">
        <div className="container-x">
          <SectionHead eyebrow="Calculator" title="Work out your own price and savings" text="Enter your monthly bill to see the right size, subsidy, payback and EMI." />
          <Calculator />
        </div>
      </section>

      <section className="section container-x">
        <SectionHead eyebrow="FAQ" title="Solar price questions" />
        <div className="mx-auto grid max-w-3xl gap-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.06} className="card p-6">
              <h3 className="font-display text-lg">{f.q}</h3>
              <p className="text-muted mt-2">{f.a}</p>
            </Reveal>
          ))}
        </div>
        <p className="text-muted mt-8 text-center text-sm">
          Ready for an exact quote? <Link href="/contact" className="link">Book a free site survey</Link> or call <a className="link" href={`tel:${site.phone}`}>{site.phoneDisplay}</a>.
        </p>
      </section>

      <section className="container-x pb-20"><CtaBand /></section>
    </>
  );
}
