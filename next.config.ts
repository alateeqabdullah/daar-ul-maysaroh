// import type { NextConfig } from "next";
// import withSerwistInit from "@serwist/next";

// const withSerwist = withSerwistInit({
//   // Points to your custom service worker file
//   swSrc: "src/app/sw.ts",
//   // Output location
//   swDest: "public/sw.js",
//   // Disable in dev to allow Turbopack to work for the rest of the app
//   disable: process.env.NODE_ENV === "development",
// });

// const nextConfig: NextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**",
//       },
//     ],
//   },
// };

// export default withSerwist(nextConfig);












import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
    // !! WARN !!
    // This allows production builds to complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  /* config options here */
};

export default nextConfig;
