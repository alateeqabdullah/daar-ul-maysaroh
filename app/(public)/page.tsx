// src/app/(public)/page.tsx - LANDING PAGE
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Award,
  Calendar,
  Video,
  FileText,
  CheckCircle,
  Star,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: <BookOpen className="h-10 w-10" />,
      title: "Quran Memorization Tracking",
      description:
        "Track surah-by-surah progress with detailed analytics and teacher evaluations.",
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Live & Recorded Classes",
      description:
        "Attend live sessions or watch recordings at your convenience with integrated Zoom.",
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: "Islamic Studies Curriculum",
      description:
        "Comprehensive courses in Fiqh, Aqeedah, Seerah, Arabic, and more.",
    },
    {
      icon: <Calendar className="h-10 w-10" />,
      title: "Smart Scheduling",
      description:
        "Automated timetables with prayer time integration and Hijri calendar.",
    },
    {
      icon: <Video className="h-10 w-10" />,
      title: "Interactive Learning",
      description:
        "Video lessons, quizzes, assignments, and one-on-one teacher sessions.",
    },
    {
      icon: <FileText className="h-10 w-10" />,
      title: "Progress Reports",
      description:
        "Detailed reports for students, parents, and administrators.",
    },
  ];

  const stats = [
    { label: "Active Students", value: "2,500+" },
    { label: "Qualified Teachers", value: "150+" },
    { label: "Courses Available", value: "50+" },
    { label: "Countries Served", value: "45+" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                  <Star className="mr-2 h-4 w-4" />
                  Leading Online Madrasah Platform
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block text-gradient bg-gradient-primary bg-clip-text">
                    Islamic Education
                  </span>
                  <span className="block text-gray-900 dark:text-white">
                    For The Digital Age
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                  A comprehensive management system for modern madrasahs. Track
                  Quran memorization, manage classes, monitor progress, and
                  connect teachers with students worldwide.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90"
                  asChild
                >
                  <Link href="/register">Start Free Trial</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/courses">View Courses</Link>
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-lg">
                <div className="absolute -top-4 -left-4 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />
                <div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

                <div className="relative rounded-2xl border border-gray-200/50 bg-white/80 p-8 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Admin Dashboard Preview
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Real-time insights and management tools
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Active Students
                        </span>
                        <span className="font-semibold text-purple-600 dark:text-purple-400">
                          2,543
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Live Classes
                        </span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          142
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Hifz Progress
                        </span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          78%
                        </span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="h-full w-3/4 rounded-full bg-gradient-primary" />
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        System performance this month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gradient bg-gradient-primary bg-clip-text md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Everything Your Madrasah Needs
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              From Quran tracking to payment management, we&apos;ve built the
              most comprehensive platform for Islamic education.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-gray-200/50 bg-white/50 backdrop-blur-sm transition-all hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/50"
              >
                <CardHeader>
                  <div className="mb-4 inline-flex rounded-xl bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-gradient-primary p-8 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                Ready to Transform Your Madrasah?
              </h2>
              <p className="mt-4 text-lg text-purple-100">
                Join hundreds of madrasahs using our platform to deliver
                exceptional Islamic education online.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-white text-purple-700 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/register">Get Started Free</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/contact">Schedule a Demo</Link>
                </Button>
              </div>
              <p className="mt-4 text-sm text-purple-200">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
