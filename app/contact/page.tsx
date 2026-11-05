import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us – Free Solar Site Survey in Jabalpur",
  description: `Book a free solar site survey in Jabalpur or anywhere in Madhya Pradesh. Call ${site.phoneDisplay}, WhatsApp or fill the form and we will respond within one working day.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const a = site.address;
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's plan your solar system" text="Tell us a little about your home or business. We will call back within one working day to schedule your free survey." />
      <section className="section container-x grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Suspense fallback={<div className="card h-96 animate-pulse" />}>
          <ContactForm />
        </Suspense>
        <aside className="grid content-start gap-4">
          <div className="card p-6">
            <h2 className="font-display text-xl">Talk to us directly</h2>
            <ul className="mt-4 grid gap-3">
              <li><a className="btn btn-primary w-full" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a></li>
              <li><a className="btn btn-ghost w-full" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a className="btn btn-ghost w-full break-all" href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
          </div>
          <div className="card p-6 text-sm">
            <h2 className="font-display text-xl">Visit our office</h2>
            <address className="text-muted mt-3 not-italic">
              {a.street}<br />{a.city}, {a.region} {a.postalCode}
            </address>
            <p className="text-muted mt-2">{site.hours}</p>
            <a className="link mt-3 inline-block" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name} ${a.street} ${a.city}`)}`}>
              Open in Google Maps
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}
