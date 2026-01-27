import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Al-Maysaroh Quran Institute",
    short_name: "Al-Maysaroh",
    description: "The Operating System for Modern Islamic Education",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",

    theme_color: "#10b981", // Emerald-500 matching your theme
    orientation: "portrait",
    lang: "en",

    scope: "/",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    // Optional: Add screenshots for App Store aesthetics
    screenshots: [
      {
        src: "/screenshots/mobile.png",
        sizes: "1080x1920",
        type: "image/png",
      },
    ],
  };
}
