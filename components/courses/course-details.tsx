"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  
  Star,
  BookOpen,
  CheckCircle,
  PlayCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Helper functions to safely get arrays
const getFeaturesArray = (features: any): string[] => {
  if (Array.isArray(features)) return features;
  if (typeof features === "string") return [features];
  if (features?.toString) return [features.toString()];
  return [];
};

const getCurriculumArray = (
  curriculum: any
): Array<{
  week: number;
  title: string;
  topics: string[];
}> => {
  if (Array.isArray(curriculum)) return curriculum;
  return [];
};

const getReviewsArray = (
  reviews: any
): Array<{
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}> => {
  if (Array.isArray(reviews)) return reviews;
  return [];
};

const getInstructorData = (
  instructor: any
): {
  name: string;
  bio: string;
  image?: string;
} => {
  if (instructor && typeof instructor === "object") {
    return {
      name: instructor.name || "Unknown Instructor",
      bio: instructor.bio || "No bio available",
      image: instructor.image,
    };
  }
  return {
    name: "Unknown Instructor",
    bio: "No bio available",
  };
};

interface CourseDetailsProps {
  course: {
    id: string;
    title: string;
    description: string;
    level: string;
    duration: string;
    students: number;
    rating: number;
    price: number;
    originalPrice?: number;
    features?: string[];
    curriculum?: string[];
    instructor?: string[];
    reviews?: string[];
  };
  onClose: () => void;
}

export function CourseDetails({ course, onClose }: CourseDetailsProps) {
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Safely get all data arrays
  const features = getFeaturesArray(course.features);
  const curriculum = getCurriculumArray(course.curriculum);
  const reviews = getReviewsArray(course.reviews);
  const instructor = getInstructorData(course.instructor);

  const courseImages = [
    "/api/placeholder/800/450",
    "/api/placeholder/800/450",
    "/api/placeholder/800/450",
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === courseImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? courseImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-card rounded-2xl border shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-card-foreground">
              {course.title || "Untitled Course"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {course.description || "No description available"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6 space-y-8">
            {/* Course Images */}
            <div className="relative">
              <div className="grid grid-cols-3 gap-4">
                {courseImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => {
                      setSelectedMedia(index);
                      setCurrentImageIndex(index);
                    }}
                  >
                    <img
                      src={image}
                      alt={`Course preview ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Info Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Features */}
                {features.length > 0 && (
                  <div className="bg-muted/30 rounded-2xl p-6">
                    <h2 className="text-xl font-heading font-bold text-card-foreground mb-4">
                    {`  What You'll Learn`}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-card-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Curriculum */}
                {curriculum.length > 0 && (
                  <div className="bg-muted/30 rounded-2xl p-6">
                    <h2 className="text-xl font-heading font-bold text-card-foreground mb-6">
                      Course Curriculum
                    </h2>
                    <div className="space-y-4">
                      {curriculum.map((week) => (
                        <div
                          key={week.week}
                          className="bg-card rounded-xl p-4 border"
                        >
                          <h3 className="font-semibold text-card-foreground mb-3">
                            Week {week.week}: {week.title}
                          </h3>
                          <ul className="space-y-2">
                            {Array.isArray(week.topics) ? (
                              week.topics.map((topic, index) => (
                                <li
                                  key={index}
                                  className="flex items-center space-x-3 text-sm text-muted-foreground"
                                >
                                  <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
                                  <span>{topic}</span>
                                </li>
                              ))
                            ) : (
                              <li className="text-sm text-muted-foreground">
                                No topics available
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews */}
                {reviews.length > 0 && (
                  <div className="bg-muted/30 rounded-2xl p-6">
                    <h2 className="text-xl font-heading font-bold text-card-foreground mb-6">
                      Student Reviews
                    </h2>
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="bg-card rounded-xl p-4 border"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-semibold text-card-foreground">
                              {review.user || "Anonymous User"}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">
                                {review.rating || 0}
                              </span>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">
                            {review.comment || "No comment provided"}
                          </p>
                          <div className="text-xs text-muted-foreground/70">
                            {review.date || "Unknown date"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Pricing Card */}
                <div className="bg-card rounded-2xl border p-6 sticky top-6">
                  <div className="text-center mb-6">
                    {course.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through mb-1">
                        ${course.originalPrice}
                      </div>
                    )}
                    <div className="text-3xl font-bold text-card-foreground">
                      ${course.price || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      one-time payment
                    </div>
                  </div>

                  <Button className="w-full mb-4" size="lg">
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Start Free Trial
                  </Button>

                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Level</span>
                      <span className="font-medium text-card-foreground">
                        {course.level || "Not specified"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium text-card-foreground">
                        {course.duration || "Not specified"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Students</span>
                      <span className="font-medium text-card-foreground">
                        {course.students || 0}+ enrolled
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Rating</span>
                      <span className="font-medium text-card-foreground flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {course.rating || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Instructor */}
                <div className="bg-card rounded-2xl border p-6">
                  <h3 className="font-heading font-bold text-card-foreground mb-4">
                    Instructor
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
                      {instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-card-foreground">
                        {instructor.name}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {instructor.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Image/Video Modal */}
      <AnimatePresence>
        {selectedMedia !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <div className="relative max-w-4xl w-full max-h-full">
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute -top-12 right-0 text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-video bg-card rounded-xl overflow-hidden">
                <img
                  src={courseImages[currentImageIndex]}
                  alt="Course preview"
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white opacity-80" />
                </div>
              </div>

              {/* Thumbnail Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {courseImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={cn(
                      "w-3 h-3 rounded-full transition-colors",
                      index === currentImageIndex
                        ? "bg-primary"
                        : "bg-muted-foreground/50"
                    )}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
