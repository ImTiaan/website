import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://imtiaan.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Since individual blog posts don't have routes in the current OS architecture,
    // we only index the main page.
  ];
}
