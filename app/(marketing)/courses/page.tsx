"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Clock,
  Users,
  BookOpen,
  Zap,
  Target,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/hooks/use-courses";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ViewMode = "grid" | "list";
type CourseType = "all" | "one-on-one" | "group";
type Level = "all" | "beginner" | "intermediate" | "advanced";

export default function CoursesPage() {
  const { courses, isLoading } = useCourses();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [courseType, setCourseType] = useState<CourseType>("all");
  const [level, setLevel] = useState<Level>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);

  useEffect(() => {
    let filtered = courses;

    // Filter by course type
    if (courseType !== "all") {
      filtered = filtered.filter(
        (course) => course.type === courseType.toUpperCase().replace("-", "_")
      );
    }

    // Filter by level
    if (level !== "all") {
      filtered = filtered.filter(
        (course) => course.level.toLowerCase() === level.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.features.some((feature: string) =>
            feature.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredCourses(filtered);
  }, [courses, courseType, level, searchTerm]);

  const courseStats = {
    total: courses.length,
    oneOnOne: courses.filter((c) => c.type === "ONE_ON_ONE").length,
    group: courses.filter((c) => c.type === "GROUP").length,
    beginner: courses.filter((c) => c.level === "BEGINNER").length,
    intermediate: courses.filter((c) => c.level === "INTERMEDIATE").length,
    advanced: courses.filter((c) => c.level === "ADVANCED").length,
  };

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
      <section className="bg-gradient-to-br from-primary to-accent text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-heading font-bold mb-6"
          >
            Our Quran Courses
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl lg:text-2xl text-primary-foreground/90 max-w-4xl mx-auto mb-8"
          >
            Comprehensive Quran education with certified teachers. Choose from
            one-on-one or group courses tailored to your learning goals.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {[
              {
                label: "Total Courses",
                value: courseStats.total,
                icon: BookOpen,
              },
              { label: "One-on-One", value: courseStats.oneOnOne, icon: Users },
              {
                label: "Group Courses",
                value: courseStats.group,
                icon: Target,
              },
              { label: "Skill Levels", value: 3, icon: Award },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary-foreground/80" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-card border-b">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Course Type Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={courseType}
                  onChange={(e) => setCourseType(e.target.value as CourseType)}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="one-on-one">One-on-One</option>
                  <option value="group">Group Courses</option>
                </select>
              </div>

              {/* Level Filter */}
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as Level)}
                className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-sm"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              {/* View Toggle */}
              <div className="flex border border-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === "grid"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === "list"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
            {(searchTerm || courseType !== "all" || level !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setCourseType("all");
                  setLevel("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Courses Display */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-heading font-bold mb-2">
                No courses found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or browse all courses.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setCourseType("all");
                  setLevel("all");
                }}
              >
                View All Courses
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredCourses.map((course, index) => (
                <CourseListItem key={course.id} course={course} index={index} />
              ))}
            </div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-16 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white"
          >
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4">
              {`  Can't Find What You're Looking For?`}
            </h3>
            <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              We offer custom learning plans tailored to your specific needs and
              goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link href="/contact">Get Custom Plan</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/#teachers">Meet Our Teachers</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Course Card Component for Grid View
function CourseCard({ course, index }: { course: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <h3 className="text-xl font-heading font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
              {course.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {course.description}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              course.type === "ONE_ON_ONE"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            )}
          >
            {course.type === "ONE_ON_ONE" ? "One-on-One" : "Group"}
          </span>
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              course.level === "BEGINNER"
                ? "bg-green-100 text-green-800"
                : course.level === "INTERMEDIATE"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-purple-100 text-purple-800"
            )}
          >
            {course.level}
          </span>
        </div>

        {/* Features */}
        <div className="space-y-2">
          {(Array.isArray(course.features) ? course.features : [])
            .slice(0, 3)
            .map((feature: string, idx: number) => (
              <div key={idx} className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                </div>
                <span className="text-sm text-card-foreground line-clamp-1">
                  {feature}
                </span>
              </div>
            ))}
          {course.features.length > 3 && (
            <p className="text-xs text-muted-foreground">
              +{course.features.length - 3} more features
            </p>
          )}
        </div>

        {/* Price & CTA */}
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">
                ${course.price}
              </span>
              <span className="text-sm text-muted-foreground ml-1">/month</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{course.duration}m</span>
            </div>
          </div>

          <Button
            className="w-full group-hover:scale-105 transition-transform duration-200"
            asChild
          >
            <Link href={`/courses/${course.id}`}>View Course</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Course List Item Component for List View
function CourseListItem({ course, index }: { course: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Course Info */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="text-xl font-heading font-bold text-card-foreground group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <div className="flex items-center space-x-2">
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    course.type === "ONE_ON_ONE"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  )}
                >
                  {course.type === "ONE_ON_ONE" ? "One-on-One" : "Group"}
                </span>
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    course.level === "BEGINNER"
                      ? "bg-green-100 text-green-800"
                      : course.level === "INTERMEDIATE"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                  )}
                >
                  {course.level}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground line-clamp-2">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration} minutes per session</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.8 (120 reviews)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {course.features
                .slice(0, 4)
                .map((feature: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs bg-muted px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="lg:text-right space-y-3 lg:min-w-48">
            <div>
              <div className="text-2xl font-bold text-primary">
                ${course.price}
              </div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>
            <Button asChild className="w-full lg:w-auto">
              <Link href={`/courses/${course.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// "use client"

// import { Metadata } from "next";
// import { CoursesWithCalculator } from "@/components/sections/courses-with-calculator";
// import { motion } from "framer-motion";
// import { Star, Users, Clock, Award, CheckCircle } from "lucide-react";

// // export const metadata: Metadata = {
// //   title: "Quran Courses - Al-Maysaroh Quran Institute",
// //   description:
// //     "Explore our comprehensive Quran courses including recitation, memorization, Tajweed, and Arabic. Flexible pricing with family discounts.",
// // };

// export default function CoursesPage() {
//   return (
//     <div className="min-h-screen bg-background pt-16">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-primary to-accent text-white py-20">
//         <div className="container mx-auto px-4 lg:px-6 text-center">
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-4xl lg:text-6xl font-heading font-bold mb-6"
//           >
//             Quran Courses
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-xl lg:text-2xl text-primary-foreground/90 max-w-4xl mx-auto"
//           >
//             Master the Quran with personalized one-on-one courses taught by
//             certified teachers. Start your journey today with our flexible
//             learning programs.
//           </motion.p>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="py-16 bg-muted/30">
//         <div className="container mx-auto px-4 lg:px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-center mb-12"
//           >
//             <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
//               Why Choose Al-Maysaroh?
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Experience the difference with our proven teaching methodology and
//               dedicated support
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               {
//                 icon: Award,
//                 title: "Certified Teachers",
//                 description:
//                   "All teachers are certified with Ijazah and years of experience",
//               },
//               {
//                 icon: Users,
//                 title: "One-on-One Attention",
//                 description:
//                   "Personalized lessons tailored to your learning pace and goals",
//               },
//               {
//                 icon: Clock,
//                 title: "Flexible Scheduling",
//                 description:
//                   "Learn at your convenience with 24/7 class scheduling",
//               },
//               {
//                 icon: Star,
//                 title: "Proven Results",
//                 description:
//                   "98% student satisfaction rate with measurable progress",
//               },
//             ].map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="text-center"
//               >
//                 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <feature.icon className="w-8 h-8 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-heading font-bold mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-muted-foreground">{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Courses with Calculator */}
//       <CoursesWithCalculator />

//       {/* FAQ Section */}
//       <section className="py-20 bg-background">
//         <div className="container mx-auto px-4 lg:px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-center mb-12"
//           >
//             <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
//               Frequently Asked Questions
//             </h2>
//           </motion.div>

//           <div className="max-w-4xl mx-auto grid gap-6">
//             {[
//               {
//                 question: "How do I choose the right course for me?",
//                 answer:
//                   "We recommend starting with a free trial class where our teacher will assess your current level and recommend the most suitable course based on your goals and experience.",
//               },
//               {
//                 question: "Can I change my course later?",
//                 answer:
//                   "Yes! You can switch between courses at any time. Many students start with Quran Recitation and progress to Hifz or Tajweed as they advance.",
//               },
//               {
//                 question: "What if I need to pause my learning?",
//                 answer:
//                   "We offer flexible pausing options. You can freeze your subscription for up to 3 months per year for vacations or personal reasons.",
//               },
//               {
//                 question: "How are family discounts calculated?",
//                 answer:
//                   "Family discounts start at 10% for 2 family members, 20% for 3 members, and 30% for 4 or more members learning together.",
//               },
//             ].map((faq, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="bg-card rounded-xl border shadow-sm p-6"
//               >
//                 <h3 className="font-heading font-bold text-lg mb-2">
//                   {faq.question}
//                 </h3>
//                 <p className="text-muted-foreground">{faq.answer}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
//         <div className="container mx-auto px-4 lg:px-6 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="max-w-3xl mx-auto"
//           >
//             <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-6">
//               Ready to Start Your Quran Journey?
//             </h2>
//             <p className="text-xl text-primary-foreground/90 mb-8">
//               Join thousands of students who have transformed their relationship
//               with the Quran through our personalized teaching approach.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <a
//                 href="/auth/signup"
//                 className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
//               >
//                 Start Free Trial
//               </a>
//               <a
//                 href="/contact"
//                 className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary transition-colors font-semibold text-lg"
//               >
//                 Contact Us
//               </a>
//             </div>
//             <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/80">
//               <div className="flex items-center space-x-2">
//                 <CheckCircle className="w-4 h-4" />
//                 <span>No credit card required</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <CheckCircle className="w-4 h-4" />
//                 <span>30-day satisfaction guarantee</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <CheckCircle className="w-4 h-4" />
//                 <span>Cancel anytime</span>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }
