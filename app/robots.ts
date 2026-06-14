import type { MetadataRoute } from "next";
import { siteUrl } from "@/shared/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/contacts"],
        disallow: ["/admin", "/api", "/login", "/registration", "/u"],
      },
    ],
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
