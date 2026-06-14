import type { MetadataRoute } from "next";
import { siteUrl } from "@/shared/lib/seo";

const publicRoutes = ["", "/about", "/contacts"];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route ? "monthly" : "weekly",
    priority: route ? 0.7 : 1,
  }));
}
