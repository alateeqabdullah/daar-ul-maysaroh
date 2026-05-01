"use client";

import { motion } from "framer-motion";
import {
  User,
  Target,
  Star,
  Clock,
  CheckCircle,
  Zap,
  Award,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/hooks/use-courses";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function OneOnOneCoursesPage() {
  const { courses, isLoading } = useCourses("ONE_ON_ONE");

  const oneOnOneCourses = courses.filter(
    (course) => course.type === "ONE_ON_ONE"
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-card rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-card rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 w-fit">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">One-on-One Learning</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-heading font-bold">
                Personalized Quran Learning
              </h1>

              <p className="text-xl text-blue-100">
                Get undivided attention from certified teachers with customized
                lessons tailored to your pace and learning style.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Personalized Pace", value: "100%" },
                  { label: "Teacher Attention", value: "Dedicated" },
                  { label: "Flexible Scheduling", value: "24/7" },
                  { label: "Success Rate", value: "98%" },
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-heading font-bold mb-6">
                Why Choose One-on-One?
              </h3>
              <div className="space-y-4">
                {[
                  "Customized learning plan based on your goals",
                  "Learn at your own comfortable pace",
                  "Immediate feedback and correction",
                  "Flexible scheduling around your life",
                  "Build strong teacher-student relationship",
                  "Focus on your specific challenges",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span className="text-blue-100">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              One-on-One Courses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our specialized one-on-one Quran courses designed for
              personalized learning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {oneOnOneCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  {/* Course Header */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-heading font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* Level Badge */}
                  <div>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium",
                        course.level === "BEGINNER"
                          ? "bg-green-100 text-green-800"
                          : course.level === "INTERMEDIATE"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                      )}
                    >
                      {course.level} Level
                    </span>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-2">
                    {course.features
                      .slice(0, 3)
                      .map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-card-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                  </div>

                  {/* Price & Duration */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        ${course.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        per month
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}m</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        per session
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    className="w-full group-hover:scale-105 transition-transform duration-200"
                    asChild
                  >
                    <Link href={`/courses/${course.id}`}>Start Learning</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Award className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Ready to Start Your Personalized Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students who have transformed their Quran
              recitation through personalized one-on-one learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/signup">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Free Trial
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  <Users className="w-4 h-4 mr-2" />
                  Speak with Advisor
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
