import type { MetadataRoute } from "next";
import { sports } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://epyal.stincebuilt.com";
  const staticRoutes = [
    "", "/sports", "/registration", "/news", "/events", "/photos", "/volunteer",
    "/sponsors", "/leadership", "/contact", "/about", "/locations", "/privacy",
    "/resources", "/parents", "/coaches", "/documents", "/faq", "/safety", "/board", "/fundraising"
  ];

  return [
    ...staticRoutes.map(path => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : .7
    })),
    ...sports.map(sport => ({
      url: `${base}/sports/${sport.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: .8
    }))
  ];
}
