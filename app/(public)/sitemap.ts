import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
      {
        url: "https://almaysaroh.com",
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: "https://almaysaroh.com/about",
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.8,
      },
      {
        url: "https://almaysaroh.com/courses",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: "https://almaysaroh.com/contact",
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.8,
      },
      {
        url: "https://almaysaroh.com/methodology",
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.8,
      },
      {
        url: "https://almaysaroh.com/legal",
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.8,
      },
      {
        url: "https://almaysaroh.com/privacy",
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.8,
      },
      {
        url: "https://almaysaroh.com/faq",
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.8,
      },
      {
        url: "https://almaysaroh.com/login",
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.8,
      },
      {
        url: "https://almaysaroh.com/admissions",
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.8,
      },
      {
        url: "https://almaysaroh.com/pricing",
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.8,
      },
      
    ];
}