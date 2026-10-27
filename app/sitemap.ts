import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/services", "/tracking", "/about", "/quote", "/privacy", "/terms"];
  return paths.map((p) => ({
    url: `${brand.url}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
