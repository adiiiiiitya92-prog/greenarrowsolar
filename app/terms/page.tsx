import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for using the ${site.name} website and requesting solar quotations and services.`,
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <Legal title="Terms & Conditions" updated="4 November 2026">
      <p>By using {site.url} you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Information on this website</h2>
      <p>Content, savings figures and subsidy information are indicative and for general guidance. Actual system size, price, generation and subsidy depend on your site, equipment and the rules in force at the time. Nothing on this site is a binding offer.</p>
      <h2>Quotations and services</h2>
      <p>Services are provided under a separate written quotation or agreement. Prices, timelines and warranties are as stated in that document. Product warranties are provided by the respective manufacturers.</p>
      <h2>Government schemes</h2>
      <p>Subsidies (such as PM Surya Ghar: Muft Bijli Yojana) are granted by the government subject to eligibility and scheme rules. We assist with applications but cannot guarantee approval or disbursement.</p>
      <h2>Acceptable use</h2>
      <p>You agree not to misuse the site, submit false information, attempt unauthorised access, or interfere with its operation.</p>
      <h2>Intellectual property</h2>
      <p>The name, logo, text and design of this website belong to {site.name} and may not be copied without permission.</p>
      <h2>Limitation of liability</h2>
      <p>To the extent permitted by law, we are not liable for indirect or consequential losses arising from use of this website. Our website is provided “as is”.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India. Courts at Jabalpur, Madhya Pradesh have jurisdiction.</p>
      <h2>Contact</h2>
      <p>Questions? Email <a className="link" href={`mailto:${site.email}`}>{site.email}</a> or call <a className="link" href={`tel:${site.phone}`}>{site.phoneDisplay}</a>.</p>
    </Legal>
  );
}
