'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star, Users, Clock, BookOpen, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCourses } from '@/hooks/use-coursesssss';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type ComparedCourse = {
  id: string;
  selected: boolean;
};

export default function CourseComparisonPage() {
  const { courses, isLoading } = useCourses();
  const [comparedCourses, setComparedCourses] = useState<ComparedCourse[]>(
    courses.slice(0, 3).map((course) => ({ id: course.id, selected: true }))
  );

  const toggleCourse = (courseId: string) => {
    setComparedCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? { ...course, selected: !course.selected }
          : course
      )
    );
  };

  const selectedCourses = courses.filter((course) =>
    comparedCourses.find((c) => c.id === course.id && c.selected)
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
      <section className="bg-gradient-to-br from-orange-500 to-red-600 text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-heading font-bold mb-6"
          >
            Compare Courses
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl lg:text-2xl text-orange-100 max-w-4xl mx-auto"
          >
            Find the perfect Quran course by comparing features, pricing, and
            benefits side by side
          </motion.p>
        </div>
      </section>

      {/* Course Selection */}
      <section className="py-8 bg-card border-b">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl font-heading font-bold mb-4">
              Select Courses to Compare
            </h2>
            <p className="text-muted-foreground">
              Choose up to 4 courses to compare features and pricing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {courses.map((course) => {
              const isSelected = comparedCourses.find(
                (c) => c.id === course.id
              )?.selected;
              return (
                <motion.button
                  key={course.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleCourse(course.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all duration-200 text-left",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-bold text-sm">
                      {course.title}
                    </h3>
                    <div
                      className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center",
                        isSelected
                          ? "bg-primary border-primary text-white"
                          : "border-border"
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full",
                        course.type === "ONE_ON_ONE"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      )}
                    >
                      {course.type === "ONE_ON_ONE" ? "1-on-1" : "Group"}
                    </span>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full",
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
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-6">
          {selectedCourses.length === 0 ? (
            <div className="text-center py-16">
              <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-heading font-bold mb-2">
                No courses selected
              </h3>
              <p className="text-muted-foreground mb-6">
                Select courses from above to start comparing
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-x-auto"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 border-b bg-muted/50">
                      Features
                    </th>
                    {selectedCourses.map((course) => (
                      <th
                        key={course.id}
                        className="text-center p-4 border-b bg-muted/50 min-w-64"
                      >
                        <div className="space-y-3">
                          <h3 className="font-heading font-bold text-lg">
                            {course.title}
                          </h3>
                          <div className="text-2xl font-bold text-primary">
                            ${course.price}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            per month
                          </div>
                          <Button size="sm" asChild>
                            <Link href={`/courses/${course.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Course Type */}
                  <tr>
                    <td className="p-4 border-b font-medium">Course Type</td>
                    {selectedCourses.map((course) => (
                      <td key={course.id} className="p-4 border-b text-center">
                        <span
                          className={cn(
                            "px-3 py-1 rounded-full text-sm font-medium",
                            course.type === "ONE_ON_ONE"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          )}
                        >
                          {course.type === "ONE_ON_ONE"
                            ? "One-on-One"
                            : "Group"}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Level */}
                  <tr>
                    <td className="p-4 border-b font-medium">Level</td>
                    {selectedCourses.map((course) => (
                      <td key={course.id} className="p-4 border-b text-center">
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
                          {course.level}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Session Duration */}
                  <tr>
                    <td className="p-4 border-b font-medium">
                      Session Duration
                    </td>
                    {selectedCourses.map((course) => (
                      <td key={course.id} className="p-4 border-b text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{course.duration} minutes</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Key Features */}
                  <tr>
                    <td className="p-4 border-b font-medium">Key Features</td>
                    {selectedCourses.map((course) => (
                      <td key={course.id} className="p-4 border-b">
                        <ul className="space-y-2 text-sm">
                          {course.features.slice(0, 5).map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Prerequisites */}
                  <tr>
                    <td className="p-4 border-b font-medium">Prerequisites</td>
                    {selectedCourses.map((course) => (
                      <td key={course.id} className="p-4 border-b">
                        <ul className="space-y-1 text-sm">
                          {course.prerequisites.map((prereq, index) => (
                            <li key={index} className="text-muted-foreground">
                              • {prereq}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Learning Outcomes */}
                  <tr>
                    <td className="p-4 border-b font-medium">
                      Learning Outcomes
                    </td>
                    {selectedCourses.map((course) => (
                      <td key={course.id} className="p-4 border-b">
                        <ul className="space-y-1 text-sm">
                          {course.outcomes.map((outcome, index) => (
                            <li key={index} className="text-muted-foreground">
                              • {outcome}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Best For */}
                  <tr>
                    <td className="p-4 border-b font-medium">Best For</td>
                    {selectedCourses.map((course) => (
                      <td
                        key={course.id}
                        className="p-4 border-b text-center text-sm text-muted-foreground"
                      >
                        {course.level === "BEGINNER" &&
                          "Absolute beginners starting from scratch"}
                        {course.level === "INTERMEDIATE" &&
                          "Students with basic Quran reading skills"}
                        {course.level === "ADVANCED" &&
                          "Advanced learners seeking mastery"}
                        {course.type === "GROUP" &&
                          " • Budget-conscious learners"}
                        {course.type === "ONE_ON_ONE" &&
                          " • Personalized attention seekers"}
                      </td>
                    ))}
                  </tr>

                  {/* CTA Row */}
                  <tr>
                    <td className="p-4"></td>
                    {selectedCourses.map((course) => (
                      <td key={course.id} className="p-4 text-center">
                        <Button asChild className="w-full">
                          <Link href={`/courses/${course.id}`}>
                            Choose This Course
                          </Link>
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </section>

      {/* Decision Helper */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Still Unsure Which Course to Choose?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Take our quick course recommendation quiz to find your perfect
              match
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: BookOpen,
                title: "Skill Assessment",
                description:
                  "Quick evaluation of your current Quran reading level",
              },
              {
                icon: Target,
                title: "Goal Setting",
                description:
                  "Define what you want to achieve with Quran learning",
              },
              {
                icon: Users,
                title: "Learning Style",
                description:
                  "Discover whether one-on-one or group learning suits you best",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8"
          >
            <Button size="lg" asChild>
              <Link href="/courses/quiz">Take Course Recommendation Quiz</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}