"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, Star, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface ProgramCardProps {
  title: string;
  category: string;
  level: string;
  duration: string;
  price: string;
  instructor: string;
  image?: string;
  href: string;
}

export function ProgramCard({
  title,
  category,
  level,
  duration,
  price,
  instructor,
  image,
  href,
}: ProgramCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="institutional-card group overflow-hidden"
    >
      <div className="relative h-48 w-full bg-muted overflow-hidden">
        {/* Placeholder for Program Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700/20 to-gold/20 flex items-center justify-center">
          <BookOpen className="w-12 h-12 text-primary-700/40" />
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest border border-primary-200/50">
            {category}
          </span>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gold">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {level} Level
            </span>
          </div>
          <h3 className="text-2xl font-black tracking-tight font-heading group-hover:text-primary-700 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            Led by {instructor} — Ijazah certified scholar with specialized
            focus on traditional methodologies.
          </p>
        </div>

        <div className="flex items-center justify-between py-4 border-y border-border/50">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-700" />
            <span className="text-xs font-bold">{duration}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black uppercase tracking-widest block text-muted-foreground">
              Tuition
            </span>
            <span className="text-lg font-black text-primary-700">
              ${price}
            </span>
          </div>
        </div>

        <Link href={href}>
          <Button className="w-full h-12 rounded-xl font-black text-xs tracking-widest bg-primary-700 hover:bg-primary-800 transition-all group-hover:shadow-lg">
            VIEW PROSPECTUS <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
