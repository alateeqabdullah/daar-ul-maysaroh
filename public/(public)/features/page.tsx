// src/app/(public)/features/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Calendar,
  Award,
  Video,
  FileText,
  BarChart,
  MessageSquare,
  Shield,
  Globe,
  Smartphone,
  CreditCard,
  Bell,
  Download,
  Upload,
  Settings,
  Database,
} from "lucide-react";

const features = [
  {
    category: "Learning Management",
    items: [
      {
        icon: <BookOpen className="h-6 w-6" />,
        title: "Quran Tracking",
        description:
          "Track memorization progress, revision schedules, and teacher evaluations.",
        color: "purple",
      },
      {
        icon: <Video className="h-6 w-6" />,
        title: "Live & Recorded Classes",
        description:
          "Integrated Zoom/Google Meet with recording and playback features.",
        color: "blue",
      },
      {
        icon: <FileText className="h-6 w-6" />,
        title: "Assignments & Grades",
        description:
          "Create, submit, and grade assignments with detailed feedback.",
        color: "green",
      },
      {
        icon: <BarChart className="h-6 w-6" />,
        title: "Progress Analytics",
        description:
          "Detailed reports and analytics for students, parents, and admins.",
        color: "yellow",
      },
    ],
  },
  {
    category: "Administration",
    items: [
      {
        icon: <Users className="h-6 w-6" />,
        title: "User Management",
        description:
          "Manage students, teachers, parents with approval system and roles.",
        color: "purple",
      },
      {
        icon: <Calendar className="h-6 w-6" />,
        title: "Smart Scheduling",
        description:
          "Automated timetables with conflict detection and prayer time integration.",
        color: "blue",
      },
      {
        icon: <CreditCard className="h-6 w-6" />,
        title: "Payment System",
        description:
          "Multiple payment gateways with invoice generation and tracking.",
        color: "green",
      },
      {
        icon: <Database className="h-6 w-6" />,
        title: "Bulk Operations",
        description: "Import/export data, bulk messaging, and batch updates.",
        color: "yellow",
      },
    ],
  },
  {
    category: "Communication",
    items: [
      {
        icon: <MessageSquare className="h-6 w-6" />,
        title: "Announcements",
        description:
          "Targeted announcements to specific groups or individuals.",
        color: "purple",
      },
      {
        icon: <Bell className="h-6 w-6" />,
        title: "Notifications",
        description: "Email and in-app notifications for important updates.",
        color: "blue",
      },
      {
        icon: <Upload className="h-6 w-6" />,
        title: "Resource Sharing",
        description: "Upload and share study materials, videos, and documents.",
        color: "green",
      },
      {
        icon: <Download className="h-6 w-6" />,
        title: "Parent Portal",
        description:
          "Parents can monitor child's progress and communicate with teachers.",
        color: "yellow",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        icon: <Globe className="h-6 w-6" />,
        title: "Multi-language",
        description: "Full Arabic/English support with RTL layout.",
        color: "purple",
      },
      {
        icon: <Smartphone className="h-6 w-6" />,
        title: "Mobile Responsive",
        description: "Fully responsive design that works on all devices.",
        color: "blue",
      },
      {
        icon: <Shield className="h-6 w-6" />,
        title: "Security",
        description:
          "Enterprise-grade security with data encryption and backups.",
        color: "green",
      },
      {
        icon: <Settings className="h-6 w-6" />,
        title: "Customizable",
        description:
          "Custom themes, settings, and configurations for your madrasah.",
        color: "yellow",
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-purple-50/50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
              All-in-One Solution
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-gradient bg-gradient-primary bg-clip-text">
                Comprehensive Features
              </span>
              <span className="block text-gray-900 dark:text-white">
                For Modern Madrasahs
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              Everything you need to manage your madrasah efficiently, from
              Quran tracking to payment processing, all in one platform.
            </p>
            <div className="mt-10">
              <Button size="lg" className="bg-gradient-primary" asChild>
                <Link href="/register">Get Started Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features by Category */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {features.map((category, categoryIndex) => (
            <div
              key={category.category}
              className={`mb-20 ${categoryIndex > 0 ? "scroll-mt-20" : ""}`}
            >
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {category.category}
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  Powerful tools designed specifically for{" "}
                  {category.category.toLowerCase()}
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {category.items.map((feature, featureIndex) => (
                  <Card
                    key={featureIndex}
                    className="border-gray-200/50 bg-white/50 backdrop-blur-sm transition-all hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/50"
                  >
                    <CardHeader>
                      <div
                        className={`mb-4 inline-flex rounded-xl p-3 ${
                          feature.color === "purple"
                            ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                            : feature.color === "blue"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            : feature.color === "green"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                  Live Demo
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  See Our Platform in Action
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Experience the intuitive interface and powerful features that
                  make managing your madrasah effortless.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Quran Progress Dashboard</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Track memorization progress with visual charts and
                      detailed reports.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Smart Attendance System</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Automated attendance tracking with notifications and
                      reports.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Parent Communication Portal
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Real-time updates and communication between teachers and
                      parents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button size="lg" className="bg-gradient-primary" asChild>
                  <Link href="/register">Request a Demo</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-lg">
                <div className="absolute -top-4 -left-4 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />
                <div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

                <div className="relative rounded-2xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/80">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Admin Dashboard
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-lg bg-gradient-primary p-4">
                      <div className="flex items-center justify-between text-white">
                        <div>
                          <div className="text-sm opacity-90">
                            Active Students
                          </div>
                          <div className="text-2xl font-bold">2,543</div>
                        </div>
                        <Users className="h-8 w-8 opacity-80" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span className="text-sm">Online Classes</span>
                        </div>
                        <span className="font-semibold">142</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                          <span className="text-sm">Pending Approvals</span>
                        </div>
                        <span className="font-semibold">23</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-2 rounded-full bg-purple-500" />
                          <span className="text-sm">Monthly Revenue</span>
                        </div>
                        <span className="font-semibold">$45,230</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="mb-2 flex justify-between text-sm">
                        <span>System Performance</span>
                        <span className="font-semibold">78%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="h-full w-3/4 rounded-full bg-gradient-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Compare Features
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              See how we stack up against traditional methods
            </p>
          </div>

          <div className="mt-16">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-center text-2xl">
                    Traditional Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      "Manual attendance registers",
                      "Paper-based grade books",
                      "No centralized communication",
                      "Limited parent involvement",
                      "No progress tracking",
                      "Manual fee collection",
                      "No data backup",
                      "Geographic limitations",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600 dark:text-gray-400"
                      >
                        <div className="mr-3 h-5 w-5 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30">
                          <div className="flex h-full w-full items-center justify-center text-xs">
                            ×
                          </div>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="relative border-purple-200/50 bg-linear-to-b from-purple-50/50 to-white backdrop-blur-sm dark:border-purple-800/50 dark:from-gray-900/50 dark:to-gray-800/50">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-primary">Recommended</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-center text-2xl">
                    MadrasahPro Platform
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      "Automated attendance with notifications",
                      "Digital grade books with analytics",
                      "Centralized communication system",
                      "Parent portal with real-time updates",
                      "Detailed progress tracking",
                      "Integrated payment system",
                      "Cloud backup & security",
                      "Global access 24/7",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-800 dark:text-gray-300"
                      >
                        <div className="mr-3 h-5 w-5 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30">
                          <div className="flex h-full w-full items-center justify-center text-xs">
                            ✓
                          </div>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-gradient-primary p-8 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Ready to Modernize Your Madrasah?
              </h2>
              <p className="mt-4 text-lg text-purple-100">
                Join hundreds of Islamic institutions that have transformed
                their operations with our comprehensive platform.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-white text-purple-700 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/register">Start Free Trial</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/contact">Book a Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
