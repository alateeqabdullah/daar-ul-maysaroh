// src/components/layout/footer.tsx
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  BookOpen,
  Heart,
} from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Courses", href: "/courses" },
    { name: "Demo", href: "/demo" },
    { name: "Updates", href: "/updates" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Partners", href: "/partners" },
    { name: "Contact", href: "/contact" },
  ],
  Resources: [
    { name: "Documentation", href: "/docs" },
    { name: "Help Center", href: "/help" },
    { name: "Community", href: "/community" },
    { name: "Blog", href: "/blog" },
    { name: "Webinars", href: "/webinars" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
    { name: "Security", href: "/security" },
  ],
};

const socialLinks = [
  { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
  { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
  { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  { icon: <Youtube className="h-5 w-5" />, href: "#", label: "YouTube" },
  { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Madrasah
                  <span className="text-gradient bg-gradient-primary bg-clip-text">
                    Pro
                  </span>
                </span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">
                  Islamic Education Platform
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-gray-600 dark:text-gray-400">
              The most comprehensive platform for managing online madrasahs.
              Quran tracking, class management, payments, and more—all in one
              place.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-purple-700 dark:hover:bg-purple-900/30 dark:hover:text-purple-400"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200/50 pt-8 dark:border-gray-800/50">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>
                © {new Date().getFullYear()} MadrasahPro. All rights reserved.
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">
                Made with <Heart className="inline h-3 w-3 text-red-500" /> for
                the Muslim Ummah
              </span>
            </div>

            <div className="mt-4 flex items-center space-x-6 text-sm md:mt-0">
              <Link
                href="/privacy"
                className="text-gray-600 transition-colors hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 transition-colors hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-600 transition-colors hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
              >
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* App Badges */}
          <div className="mt-8 flex justify-center space-x-4">
            <div className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Coming soon
              </div>
              <div className="text-sm font-semibold">iOS App</div>
            </div>
            <div className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Coming soon
              </div>
              <div className="text-sm font-semibold">Android App</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
