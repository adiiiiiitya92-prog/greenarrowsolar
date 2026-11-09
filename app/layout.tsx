import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { JsonLd } from "@/components/JsonLd";
import { PwaRegister } from "@/components/PwaRegister";
import { SiteChrome } from "@/components/SiteChrome";
import { site, cities } from "@/lib/site";

const heading = Fraunces({ variable: "--font-heading", subsets: ["latin"], display: "swap" });
const body = Plus_Jakarta_Sans({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const deva = Noto_Sans_Devanagari({ variable: "--font-deva", subsets: ["devanagari"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Solar Panel Installation in Jabalpur & Madhya Pradesh | Green Arrow Solar",
    template: "%s | Green Arrow Solar",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "solar panel installation Jabalpur",
    "rooftop solar Madhya Pradesh",
    "solar company in Jabalpur",
    "PM Surya Ghar subsidy MP",
    "solar water pump Madhya Pradesh",
    "net metering Jabalpur",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url: site.url,
    title: "Solar Panel Installation in Jabalpur & Madhya Pradesh | Green Arrow Solar",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, email: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f1f6fc",
};

// Runs before first paint so there is no flash: saved choice → OS preference.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

const orgLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  url: site.url,
  description: site.description,
  image: `${site.url}/opengraph-image`,
  logo: `${site.url}/logo-mark.png`,
  telephone: site.phone,
  email: site.email,
  priceRange: "₹₹",
  openingHours: "Mo-Sa 10:00-19:00",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
  ...(site.socialProfiles.length ? { sameAs: site.socialProfiles } : {}),
  areaServed: [
    { "@type": "State", name: "Madhya Pradesh" },
    ...cities.map((c) => ({ "@type": "City", name: c.name })),
  ],
  knowsAbout: ["Rooftop solar", "Net metering", "Solar water pumps", "PM Surya Ghar Muft Bijli Yojana"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={`${heading.variable} ${body.variable} ${deva.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={orgLd} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-ink">
          Skip to content
        </a>
        <SiteChrome>
          <Navbar />
        </SiteChrome>
        <main id="main">{children}</main>
        <SiteChrome>
          <Footer />
          <CookieConsent />
        </SiteChrome>
        <PwaRegister />
      </body>
    </html>
  );
}
