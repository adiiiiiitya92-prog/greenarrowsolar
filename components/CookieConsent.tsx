"use client";

import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

type Choice = "accepted" | "declined" | null;
const KEY = "cookie-consent";
const EVT = "cookie-consent-change";

function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
}
const read = (): Choice => {
  try {
    return localStorage.getItem(KEY) as Choice;
  } catch {
    return null;
  }
};
function write(v: Choice) {
  try {
    if (v) localStorage.setItem(KEY, v);
    else localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new Event(EVT));
}

export function useConsent() {
  return useSyncExternalStore(subscribe, read, () => "pending" as unknown as Choice);
}

export function CookieSettingsButton() {
  return (
    <button type="button" className="cursor-pointer hover:text-brand" onClick={() => write(null)}>
      Cookie settings
    </button>
  );
}

/** Banner + Google Analytics, which only loads after the visitor accepts. */
export function CookieConsent() {
  const consent = useConsent();

  const gaId = site.gaId;
  const showBanner = consent === null; // server snapshot is "pending", so nothing renders until hydrated

  return (
    <>
      {consent === "accepted" && gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            role="dialog"
            aria-label="Cookie consent"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="card fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-2xl flex-col gap-3 p-4 shadow-2xl sm:flex-row sm:items-center"
          >
            <p className="text-sm">
              We use cookies for analytics to improve this site. See our{" "}
              <Link href="/privacy-policy" className="link">Privacy Policy</Link>.
            </p>
            <div className="flex shrink-0 gap-2">
              <button type="button" className="btn btn-ghost !min-h-10 !px-4" onClick={() => write("declined")}>Decline</button>
              <button type="button" className="btn btn-primary !min-h-10 !px-4" onClick={() => write("accepted")}>Accept</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
