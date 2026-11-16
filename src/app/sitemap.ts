import type { MetadataRoute } from "next";
import { stories } from "@/data/stories";
import { site } from "@/data/site";

const routes = [
  "",
  "/perspective",
  "/work",
  "/approach",
  "/about",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [...routes, ...stories.map((s) => `/work/${s.slug}`)];
  return pages.map((path) => ({
    url: `${site.url}${path}`,
    priority: path === "" ? 1 : path.startsWith("/work/") ? 0.6 : 0.8,
  }));
}
