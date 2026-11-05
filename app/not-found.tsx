import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center px-4 pt-24 text-center">
      <div>
        <p className="font-display text-brand text-8xl font-semibold sm:text-9xl">404</p>
        <h1 className="font-display mt-2 text-3xl sm:text-4xl">This page went off-grid</h1>
        <p className="text-muted mx-auto mt-3 max-w-md">The page you are looking for does not exist or has moved. Let&apos;s get you back to the sunshine.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Back to home</Link>
          <Link href="/contact" className="btn btn-ghost">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
