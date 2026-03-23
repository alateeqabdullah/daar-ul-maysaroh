import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://almaysaroh.com",
      lastModified: new Date(),
    },
  ]
}