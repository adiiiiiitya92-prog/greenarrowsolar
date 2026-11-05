"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, unstable_retry }: { error: Error & { digest?: string }; unstable_retry: () => void }) {
  useEffect(() => {
    // Reported to server logs via the beacon below; plug Sentry/etc. in here if needed.
    console.error("[app-error]", error.digest ?? error.message);
  }, [error]);
  return (
    <section className="grid min-h-[80svh] place-items-center px-4 pt-24 text-center">
      <div>
        <h1 className="font-display text-4xl">Something went wrong</h1>
        <p className="text-muted mx-auto mt-3 max-w-md">An unexpected error occurred. Please try again, or call us and we will help you directly.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => unstable_retry()} className="btn btn-primary">Try again</button>
          <Link href="/" className="btn btn-ghost">Home</Link>
        </div>
      </div>
    </section>
  );
}
