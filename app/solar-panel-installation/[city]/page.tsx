import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Areas, CtaBand, ServicesGrid } from "@/components/Sections";
import { SectionHead } from "@/components/SectionHead";
import { cities, site } from "@/lib/site";

type Props = { params: Promise<{ city: string }> };

const list = cities.filter((c) => c.slug !== "jabalpur");
export const dynamicParams = false;

export function generateStaticParams() {
  return list.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const c = list.find((x) => x.slug === city);
  if (!c) return {};
  return {
    title: `Solar Panel Installation in ${c.name}, Madhya Pradesh`,
    description: `Rooftop solar, solar pumps and hybrid systems in ${c.name}, MP. Free survey, subsidy and net-metering support from Jabalpur-based ${site.name}.`,
    alternates: { canonical: `/solar-panel-installation/${c.slug}` },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const c = list.find((x) => x.slug === city);
  if (!c) notFound();
  return (
    <>
      <PageHero eyebrow={`${c.name}, Madhya Pradesh`} title={`Solar panel installation in ${c.name}`} text={c.blurb} />
      <section className="section container-x">
        <div className="card mb-10 p-6">
          <h2 className="font-display text-2xl">Solar in {c.name} at a glance</h2>
          <ul className="text-muted mt-3 grid gap-1.5">
            <li>• Distribution company: {c.discom} — we file your net-metering application.</li>
            <li>• Central subsidy for eligible homes up to ₹78,000 under PM Surya Ghar (current scheme rules apply).</li>
            <li>• Free site survey and written quote; installation by our trained crew.</li>
          </ul>
          <Link href="/contact" className="btn btn-primary mt-5">Get a free quote for {c.name}</Link>
        </div>
        <SectionHead eyebrow="Services" title={`What we install in ${c.name}`} />
        <ServicesGrid />
      </section>
      <section className="section bg-bg-alt">
        <div className="container-x"><SectionHead eyebrow="More locations" title="Other areas we serve" /><Areas /></div>
      </section>
      <section className="container-x section"><CtaBand /></section>
    </>
  );
}
