// app/(marketing)/onsite/programs/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramClient from "./program-client";
import { getAllProgramSlugs, getProgramBySlug } from "./program-data";

// Generate static params for all programs
export async function generateStaticParams() {
  const slugs = getAllProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const program = getProgramBySlug(params.slug);

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

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = getProgramBySlug(params.slug);

  if (!program) {
    notFound();
  }

  return <ProgramClient program={program} />;
}
