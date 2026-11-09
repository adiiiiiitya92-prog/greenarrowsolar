import type { MetadataRoute } from "next";
import { cities, site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("", 1, "weekly"),
    page("/services", 0.9),
    page("/solar-panel-installation-jabalpur", 0.95, "weekly"),
    page("/solar-panel-price-jabalpur", 0.9, "weekly"),
    ...cities.filter((c) => c.slug !== "jabalpur").map((c) => page(`/solar-panel-installation/${c.slug}`, 0.7)),
    page("/about", 0.6),
    page("/contact", 0.8),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
