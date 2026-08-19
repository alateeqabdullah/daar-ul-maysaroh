// app/(marketing)/onsite/programs/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramClient from "./program-client";
import { getProgramBySlug, getAllProgramSlugs } from "./program-data";

// Generate static params for all programs (Stays the same)
export async function generateStaticParams() {
  const slugs = getAllProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  
  if (!program) {
    return {
      title: "Program Not Found | Daar-ul-Maysaroh",
    };
  }

  return {
    title: `${program.title} | Daar-ul-Maysaroh`,
    description: program.description.substring(0, 160),
    keywords: `${program.title}, Quran memorization, ${program.subtitle}, Daar-ul-Maysaroh`,
    openGraph: {
      title: `${program.title} - Daar-ul-Maysaroh`,
      description: program.description.substring(0, 160),
      type: "website",
      locale: "en_NG",
    },
  };
}

// Fix 2: Turn the page component into an async function and await params
export default async function ProgramPage({ params }: RouteParams) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  
  if (!program) {
    notFound();
  }

  return <ProgramClient program={program} />;
}
