import { Footer } from "@/components/layoutt/footer";
import { Header } from "@/components/layoutt/header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

// // 📄 src/app/(marketing)/layout.tsx
// import { Header } from "@/components/layout/header";
// import { Footer } from "@/components/layout/footer";
// import { AnnouncementBar } from "@/components/layout/announcement-bar";
// import { PageTransition } from "@/components/ui/page-transition";

// interface MarketingLayoutProps {
//   children: React.ReactNode;
// }

// export default function MarketingLayout({ children }: MarketingLayoutProps) {
//   return (
//     <div className="flex min-h-screen flex-col">
//       {/* Announcement Bar - Promotional Messages */}
//       <AnnouncementBar />

//       {/* Sticky Header with Navigation */}
//       <Header />

//       {/* Main Content with Smooth Transitions */}
//       <PageTransition>
//         <main className="flex-1">{children}</main>
//       </PageTransition>

//       {/* Comprehensive Footer */}
//       <Footer />
//     </div>
//   );
// }

// // // src/app/(marketing)/layout.tsx
// // import { Header } from "@/components/layout/header";
// // import { Footer } from "@/components/layout/footer";

// // export default function MarketingLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <>
// //       <Header />
// //       {children}
// //       <Footer />
// //     </>
// //   );
// // }
