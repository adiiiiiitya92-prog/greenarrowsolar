import Link from "next/link";
import { Logo } from "./Logo";
import { CopyrightYear } from "./CopyrightYear";
import { CookieSettingsButton } from "./CookieConsent";
import { cities, cityHref, nav, services, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-alt">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="grid content-start gap-4">
          <Logo />
          <p className="text-muted text-sm">{site.tagline}. Clean power, lower bills, zero hassle.</p>
          <address className="text-muted grid gap-1 text-sm not-italic">
            <span>{site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}</span>
            <a className="link w-fit" href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
            <a className="link w-fit break-all" href={`mailto:${site.email}`}>{site.email}</a>
            <span>{site.hours}</span>
          </address>
        </div>
        <div>
          <h2 className="font-display text-lg">Explore</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {nav.map((l) => (
              <li key={l.href}><Link className="text-muted hover:text-brand" href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-lg">Services</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}><Link className="text-muted hover:text-brand" href={`/services#${s.slug}`}>{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-lg">Areas we serve</h2>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link className="text-muted hover:text-brand hover:border-brand rounded-full border border-line px-3 py-1" href={cityHref(c.slug)}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x text-muted flex flex-col items-start justify-between gap-3 py-5 text-sm sm:flex-row sm:items-center">
          <p>© <CopyrightYear /> {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li><Link className="hover:text-brand" href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link className="hover:text-brand" href="/terms">Terms &amp; Conditions</Link></li>
            <li><CookieSettingsButton /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
