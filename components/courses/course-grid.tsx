"use client";

import { motion } from "framer-motion";
import { Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  description: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  type: "ONE_ON_ONE" | "GROUP";
  duration: number;
  price: number;
  features: string[];
  icon: string;
  popular?: boolean;
}

interface CourseGridProps {
  courses: Course[];
  columns?: 2 | 3 | 4;
}

export function CourseGrid({ courses, columns = 3 }: CourseGridProps) {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", gridClasses[columns])}>
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          {course.popular && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <Star className="w-3 h-3 fill-current" />
                <span>Popular</span>
              </div>
            </div>
          )}

          <div className="p-6 space-y-4">
            {/* Header */}
            <div className="space-y-2">
              <h3 className="text-xl font-heading font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                {course.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {course.description}
              </p>
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
              {course.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm text-card-foreground line-clamp-1">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Price & Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-primary">
                    ${course.price}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    /month
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}m</span>
                  </div>
                  {course.type === "GROUP" && (
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>4-6</span>
                    </div>
                  )}
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
      ))}
    </div>
  );
}
