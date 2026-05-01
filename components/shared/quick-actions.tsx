// components/shared/quick-actions.tsx
"use client";

import Link from "next/link";
import { Home, BookOpen, Phone, User, Menu } from "lucide-react";

export function QuickActions() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border py-2 px-4 flex justify-around items-center z-40 lg:hidden">
      <Link href="/" className="flex flex-col items-center gap-0.5">
        <Home className="w-5 h-5 text-muted-foreground" />
        <span className="text-[9px] font-black">Home</span>
      </Link>
      <Link href="/courses" className="flex flex-col items-center gap-0.5">
        <BookOpen className="w-5 h-5 text-muted-foreground" />
        <span className="text-[9px] font-black">Courses</span>
      </Link>
      <Link href="/assessment" className="flex flex-col items-center gap-0.5">
        <div className="w-10 h-10 -mt-5 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
          <Menu className="w-5 h-5 text-white" />
        </div>
        <span className="text-[9px] font-black">Menu</span>
      </Link>
      <Link href="/contact" className="flex flex-col items-center gap-0.5">
        <Phone className="w-5 h-5 text-muted-foreground" />
        <span className="text-[9px] font-black">Contact</span>
      </Link>
      <Link href="/dashboard" className="flex flex-col items-center gap-0.5">
        <User className="w-5 h-5 text-muted-foreground" />
        <span className="text-[9px] font-black">Account</span>
      </Link>
    </div>
  );
}
