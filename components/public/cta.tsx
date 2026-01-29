import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container px-4 mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16 sm:px-16 md:px-24 lg:py-24 text-center overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
           <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
               Ready to modernize your Madrasah?
             </h2>
             <p className="mx-auto mt-6 max-w-xl text-lg text-indigo-100">
               Join over 500 institutions using MadrasahPro to deliver better education and streamline operations.
             </p>
             <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
               <Button size="lg" className="h-14 px-8 rounded-full bg-white text-indigo-600 hover:bg-indigo-50 text-base w-full sm:w-auto" asChild>
                 <Link href="/register">Get Started Free</Link>
               </Button>
               <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 text-base w-full sm:w-auto" asChild>
                 <Link href="/contact">Contact Sales</Link>
               </Button>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}