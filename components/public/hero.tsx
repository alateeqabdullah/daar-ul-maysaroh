"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, PlayCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400 mb-6">
              <Star className="mr-2 h-4 w-4 fill-emerald-500 text-emerald-500" />
              Trusted by 500+ Institutes
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
              Islamic Education <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Reimagined.</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              The complete operating system for modern madrasahs. Track Hifz progress, automate fees, and engage parents—all in one beautiful platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button size="lg" className="h-14 px-8 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-base shadow-xl hover:shadow-2xl transition-all hover:scale-105" asChild>
                <Link href="/register">Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 text-base" asChild>
                <Link href="/demo"><PlayCircle className="mr-2 h-5 w-5" /> Watch Demo</Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm font-medium text-slate-500">
               <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500"/> No credit card required</div>
               <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500"/> 14-day free trial</div>
            </div>
          </motion.div>

          {/* Visual Content (Dashboard Mockup) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 w-full max-w-[600px] lg:max-w-none perspective-1000"
          >
            <div className="relative rounded-2xl bg-slate-900/5 dark:bg-white/5 p-2 ring-1 ring-inset ring-slate-900/10 dark:ring-white/10 lg:rotate-y-12 lg:rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out shadow-2xl">
               <div className="rounded-xl overflow-hidden bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl aspect-[4/3] relative">
                  {/* Abstract UI Representation */}
                  <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900">
                    <div className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center px-6 gap-4">
                       <div className="w-32 h-4 bg-slate-100 dark:bg-slate-800 rounded-full"/>
                       <div className="ml-auto flex gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800"/>
                          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30"/>
                       </div>
                    </div>
                    <div className="p-8 grid gap-6 grid-cols-3">
                       <div className="col-span-2 h-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm p-4 space-y-3">
                          <div className="w-1/3 h-4 bg-slate-100 dark:bg-slate-800 rounded"/>
                          <div className="w-full h-24 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg mt-4"/>
                       </div>
                       <div className="h-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm p-4">
                          <div className="w-1/2 h-4 bg-slate-100 dark:bg-slate-800 rounded"/>
                          <div className="w-full h-full mt-4 flex items-center justify-center">
                             <div className="w-20 h-20 rounded-full border-4 border-emerald-500 border-t-transparent"/>
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}