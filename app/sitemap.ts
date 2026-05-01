// import { MetadataRoute } from "next";

// export default function sitemap(): MetadataRoute.Sitemap {
//     return [
//       {
//         url: "https://almaysaroh.com",
//         lastModified: new Date(),
//         changeFrequency: "yearly",
//         priority: 1,
//       },
//       {
//         url: "https://almaysaroh.com/about",
//         lastModified: new Date(),
//         changeFrequency: "yearly",
//         priority: 0.8,
//       },
//       {
//         url: "https://almaysaroh.com/courses",
//         lastModified: new Date(),
//         changeFrequency: "monthly",
//         priority: 0.9,
//       },
//       {
//         url: "https://almaysaroh.com/contact",
//         lastModified: new Date(),
//         changeFrequency: "yearly",
//         priority: 0.8,
//       },
//       {
//         url: "https://almaysaroh.com/methodology",
//         lastModified: new Date(),
//         changeFrequency: "yearly",
//         priority: 0.8,
//       },
//       {
//         url: "https://almaysaroh.com/legal",
//         lastModified: new Date(),
//         changeFrequency: "yearly",
//         priority: 0.8,
//       },
//       {
//         url: "https://almaysaroh.com/privacy",
//         lastModified: new Date(),
//         changeFrequency: "yearly",
//         priority: 0.8,
//       },
//       {
//         url: "https://almaysaroh.com/faq",
//         lastModified: new Date(),
//         changeFrequency: "yearly",
//         priority: 0.8,
//       },
//       {
//         url: "https://almaysaroh.com/login",
//         lastModified: new Date(),
//         changeFrequency: "yearly",
//         priority: 0.8,
//       },
//       {
//         url: "https://almaysaroh.com/admissions",
//         lastModified: new Date(),
//         changeFrequency: "yearly",
//         priority: 0.8,
//       },
//       {
//         url: "https://almaysaroh.com/pricing",
//         lastModified: new Date(),
//         changeFrequency: "yearly",
//         priority: 0.8,
//       },

//     ];
// }




import { prisma } from "@/lib/prisma";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://almaysaroh.com";

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/teachers`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/admissions`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/methodology `,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },

  ];

  // Dynamic teacher routes
  let teacherRoutes: MetadataRoute.Sitemap = [];
  try {
    const teachers = await prisma.teacher.findMany({
      where: { isAvailable: true },
      include: { user: true },
      take: 100,
    });

    teacherRoutes = teachers.map((teacher) => ({
      url: `${baseUrl}/teachers/${teacher.id}`,
      lastModified: teacher.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Failed to fetch teachers for sitemap:", error);
  }

  // Dynamic course routes
  let courseRoutes: MetadataRoute.Sitemap = [];
  try {
    const courses = await prisma.course.findMany({
      where: { isActive: true },
      take: 50,
    });

    courseRoutes = courses.map((course) => ({
      url: `${baseUrl}/courses/${course.id}`,
      lastModified: course.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to fetch courses for sitemap:", error);
  }

  // Group program routes
  const groupRoutes = [
    {
      url: `${baseUrl}/courses/group-qiroah`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/juz-amma`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  return [...staticRoutes, ...teacherRoutes, ...courseRoutes, ...groupRoutes];
}