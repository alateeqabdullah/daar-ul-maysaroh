// src/app/(public)/about/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  Target,
  Users,
  Globe,
  Heart,
 
  Clock,
  Shield,
  GraduationCap,
} from "lucide-react";

const values = [
  {
    icon: <Target className="h-8 w-8" />,
    title: "Our Mission",
    description:
      "To make quality Islamic education accessible to everyone, everywhere through technology.",
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Our Vision",
    description:
      "To become the global standard for Islamic education management and delivery.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Our Values",
    description:
      "Excellence, integrity, innovation, and service to the Muslim community.",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Global Reach",
    description:
      "Serving students and madrasahs in over 45 countries worldwide.",
  },
];

const team = [
  {
    name: "Dr. Ahmed Al-Qari",
    role: "Founder & CEO",
    bio: "PhD in Islamic Studies, 20+ years experience in Islamic education.",
    avatar: "/team/ahmed.jpg",
  },
  {
    name: "Ustadha Fatima Zahra",
    role: "Head of Education",
    bio: "MA in Arabic Language, specialized in curriculum development.",
    avatar: "/team/fatima.jpg",
  },
  {
    name: "Imran Khan",
    role: "CTO",
    bio: "Former tech lead at major ed-tech company, passionate about Islamic tech.",
    avatar: "/team/imran.jpg",
  },
  {
    name: "Sarah Ali",
    role: "Product Manager",
    bio: "10+ years in product management focused on educational technology.",
    avatar: "/team/sarah.jpg",
  },
];

const milestones = [
  {
    year: "2020",
    event: "MadrasahPro founded with vision to digitize Islamic education",
  },
  {
    year: "2021",
    event: "Launched MVP with Quran tracking and basic management features",
  },
  {
    year: "2022",
    event: "Reached 100 madrasahs and 5,000+ students worldwide",
  },
  {
    year: "2023",
    event: "Introduced AI-powered progress tracking and analytics",
  },
  {
    year: "2024",
    event: "Expanded to 45+ countries with multi-language support",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-purple-50/50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-gradient bg-gradient-primary bg-clip-text">
                Our Story & Mission
              </span>
              <span className="block text-gray-900 dark:text-white">
                Revolutionizing Islamic Education
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              Founded in 2020, MadrasahPro was born from a simple idea: to make
              quality Islamic education accessible to every Muslim through the
              power of technology.
            </p>
            <div className="mt-10">
              <Button size="lg" className="bg-gradient-primary" asChild>
                <Link href="/register">Join Our Mission</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50"
              >
                <CardHeader>
                  <div
                    className={`mb-4 inline-flex rounded-xl p-3 ${
                      index === 0
                        ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                        : index === 1
                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        : index === 2
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    }`}
                  >
                    {value.icon}
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Our Journey
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  What started as a small project to help local madrasahs manage
                  their operations has grown into a comprehensive platform
                  serving Islamic institutions worldwide.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Expert-Backed Curriculum</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      All courses and features developed in consultation with
                      qualified Islamic scholars and experienced educators.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Trust & Security</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Enterprise-grade security with data encryption, regular
                      backups, and strict privacy policies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Continuous Innovation</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Regular updates and new features based on user feedback
                      and the latest educational technology trends.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-lg">
                <div className="absolute -top-4 -left-4 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />
                <div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

                <Card className="relative border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
                  <CardHeader>
                    <CardTitle className="text-2xl">By The Numbers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gradient bg-gradient-primary bg-clip-text">
                          2,500+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Active Students
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gradient bg-gradient-primary bg-clip-text">
                          150+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Qualified Teachers
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gradient bg-gradient-primary bg-clip-text">
                          45+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Countries
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gradient bg-gradient-primary bg-clip-text">
                          98.7%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Satisfaction Rate
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Meet Our Leadership Team
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Passionate individuals dedicated to transforming Islamic education
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50"
              >
                <CardHeader className="items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4 text-center">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Our Journey Timeline
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Key milestones in our growth and development
              </p>
            </div>

            <div className="relative mt-12">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-primary md:left-1/2 md:-translate-x-1/2" />

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative mb-8 flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary md:left-1/2 md:-translate-x-1/2">
                    <div className="h-3 w-3 rounded-full bg-white" />
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-20 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                      <CardHeader>
                        <CardTitle className="text-purple-600 dark:text-purple-400">
                          {milestone.year}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {milestone.event}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              ))}
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
                Join Us in Our Mission
              </h2>
              <p className="mt-4 text-lg text-purple-100">
                Be part of the revolution in Islamic education. Whether
                you&apos;re a student, teacher, or madrasah administrator, we
                have a place for you.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-white text-purple-700 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/register">Join as Institution</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/courses">Explore Courses</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
