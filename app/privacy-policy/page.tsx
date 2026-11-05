import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your personal information when you use our website or request a solar quote.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function Privacy() {
  return (
    <Legal title="Privacy Policy" updated="4 November 2026">
      <p>{site.name} (“we”, “us”) respects your privacy. This policy explains what information we collect through {site.url} and how we use it.</p>
      <h2>Information we collect</h2>
      <ul>
        <li>Details you submit in our enquiry form: name, mobile number, email, city, electricity bill, interest and message.</li>
        <li>Anonymised usage data (pages visited, device type) via Google Analytics, only if you accept cookies.</li>
        <li>A one-way hashed form of your IP address for spam and abuse prevention.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To contact you about your solar enquiry, survey and quotation.</li>
        <li>To improve our website and services.</li>
        <li>To prevent spam, fraud and misuse.</li>
      </ul>
      <h2>Sharing</h2>
      <p>We do not sell your data. We may share it with installation partners, DISCOMs or government portals only where needed to deliver your project (for example subsidy and net-metering applications), and with service providers who help us run the website, under confidentiality obligations.</p>
      <h2>Cookies</h2>
      <p>We use a cookie-consent banner. Analytics cookies are loaded only after you click “Accept”. You can change your choice any time using “Cookie settings” in the footer. Your theme (day/night) and consent choice are stored in your browser’s local storage.</p>
      <h2>Retention and security</h2>
      <p>We keep enquiry data only as long as needed to respond and for legitimate business and legal purposes. We use access controls, encryption in transit (HTTPS) and other safeguards, but no system is completely secure.</p>
      <h2>Your rights</h2>
      <p>You may request access, correction or deletion of your personal data by contacting us at <a className="link" href={`mailto:${site.email}`}>{site.email}</a>.</p>
      <h2>Contact</h2>
      <p>{site.name}, {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode} · <a className="link" href={`tel:${site.phone}`}>{site.phoneDisplay}</a></p>
    </Legal>
  );
}
