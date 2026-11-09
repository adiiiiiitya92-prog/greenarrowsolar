"use client";

import { usePathname } from "next/navigation";

// Hides the public site's header, footer and cookie banner inside the admin app.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname.startsWith("/admin") ? null : children;
}
