import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "You are offline",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="container-x grid min-h-[60vh] place-content-center gap-4 py-20 text-center">
      <h1 className="font-display text-3xl">You are offline</h1>
      <p className="text-muted">Check your internet connection and try again, or call us directly.</p>
      <a className="btn btn-primary mx-auto" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
    </div>
  );
}
