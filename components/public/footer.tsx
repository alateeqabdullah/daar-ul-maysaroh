import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
             <Link href="/" className="flex items-center gap-2 mb-4">
               <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white"><BookOpen className="h-4 w-4" /></div>
               <span className="text-lg font-bold text-slate-900 dark:text-white">MadrasahPro</span>
             </Link>
             <p className="text-sm text-slate-500 leading-relaxed">
               The operating system for modern Islamic education. Built with Ihsan, for the Ummah.
             </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-slate-500">
               <li><Link href="#features" className="hover:text-emerald-600">Features</Link></li>
               <li><Link href="#pricing" className="hover:text-emerald-600">Pricing</Link></li>
               <li><Link href="/demo" className="hover:text-emerald-600">Demo</Link></li>
               <li><Link href="/roadmap" className="hover:text-emerald-600">Roadmap</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-500">
               <li><Link href="/about" className="hover:text-emerald-600">About Us</Link></li>
               <li><Link href="/careers" className="hover:text-emerald-600">Careers</Link></li>
               <li><Link href="/blog" className="hover:text-emerald-600">Blog</Link></li>
               <li><Link href="/contact" className="hover:text-emerald-600">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-500">
               <li><Link href="/privacy" className="hover:text-emerald-600">Privacy Policy</Link></li>
               <li><Link href="/terms" className="hover:text-emerald-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} MadrasahPro Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}