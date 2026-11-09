import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: site.name,
    short_name: "Green Arrow",
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f1f6fc",
    theme_color: "#1a7a22",
    lang: "en-IN",
    categories: ["business", "utilities"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Free solar survey", url: "/contact", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Admin – Leads", url: "/admin", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
