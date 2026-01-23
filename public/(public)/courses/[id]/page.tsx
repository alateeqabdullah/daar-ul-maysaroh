// src/app/(public)/courses/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Users,
  Clock,
  Star,
  CheckCircle,
  PlayCircle,
  Calendar,
  FileText,
  Video,
  Download,
  Share2,
  Heart,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// Mock course data - In real app, this would come from API
const courseDetails = {
  id: "1",
  title: "Quran Memorization (Hifz) - Complete Program",
  subtitle:
    "Master the art of Quran memorization with proper tajweed and understanding",
  description:
    "A comprehensive program designed to help you memorize the entire Quran with proper pronunciation, tajweed rules, and understanding. This program combines traditional teaching methods with modern memorization techniques.",
  category: "Quran",
  level: "Beginner to Advanced",
  duration: "12-36 months",
  totalLessons: 240,
  studentsEnrolled: 1245,
  rating: 4.9,
  reviews: 324,
  instructor: {
    name: "Sheikh Ahmed Al-Qari",
    title: "PhD in Quranic Sciences, Ijazah in Hafs narration",
    bio: "With over 20 years of teaching experience, Sheikh Ahmed has helped thousands of students memorize the Quran. He holds ijazah in Hafs narration and specializes in Quran memorization techniques.",
    students: 2500,
    courses: 12,
    rating: 4.9,
  },
  features: [
    "Personalized memorization plan",
    "Daily revision schedule",
    "Tajweed correction",
    "Monthly progress evaluation",
    "Audio recording review",
    "One-on-one teacher sessions",
    "Memorization techniques workshop",
    "Quran understanding sessions",
  ],
  curriculum: [
    {
      week: 1,
      title: "Foundation & Basics",
      topics: [
        "Introduction to Hifz methodology",
        "Basic tajweed rules review",
        "Memorization techniques",
        "Setting up your revision schedule",
      ],
      duration: "2 hours",
    },
    {
      week: 2,
      title: "Juz Amma (Part 1)",
      topics: [
        "Memorizing Surah An-Naba to An-Naziat",
        "Tajweed: Rules of noon saakinah and tanween",
        "Understanding meanings",
        "Practical application",
      ],
      duration: "3 hours",
    },
    {
      week: 3,
      title: "Juz Amma (Part 2)",
      topics: [
        "Memorizing Surah Abasa to At-Takwir",
        "Tajweed: Rules of meem saakinah",
        "Recitation practice",
        "Revision techniques",
      ],
      duration: "3 hours",
    },
  ],
  pricing: [
    {
      type: "ONE_ON_ONE",
      name: "Personalized One-on-One",
      description: "Individual attention with dedicated teacher",
      price: "$49/month",
      features: [
        "30 min daily sessions",
        "Personalized plan",
        "Flexible timing",
      ],
    },
    {
      type: "GROUP",
      name: "Small Group (3-5 students)",
      description: "Learn with peers in interactive sessions",
      price: "$29/month",
      features: ["45 min sessions", "Group activities", "Peer learning"],
    },
    {
      type: "SELF_PACED",
      name: "Self-Paced Learning",
      description: "Recorded lessons with weekly check-ins",
      price: "$19/month",
      features: [
        "Recorded lessons",
        "Weekly assignments",
        "Monthly evaluation",
      ],
    },
  ],
  schedule: [
    { day: "Monday", time: "9:00 AM - 10:30 AM", type: "Live Session" },
    { day: "Wednesday", time: "9:00 AM - 10:30 AM", type: "Live Session" },
    { day: "Friday", time: "3:00 PM - 4:30 PM", type: "Revision & Q&A" },
  ],
  requirements: [
    "Basic ability to read Arabic script",
    "Dedication to daily practice",
    "Microphone and webcam for live sessions",
    "Quran copy (mushaf)",
  ],
};

export default function CoursePage() {
  const params = useParams();
  const [selectedPricing, setSelectedPricing] = useState("ONE_ON_ONE");
  const [isFavorite, setIsFavorite] = useState(false);

  // In real app, fetch course by ID
  const course = courseDetails;

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50/50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="/"
              className="hover:text-purple-600 dark:hover:text-purple-400"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/courses"
              className="hover:text-purple-600 dark:hover:text-purple-400"
            >
              Courses
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 dark:text-white">
              {course.category}
            </span>
          </nav>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                        {course.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-blue-300 dark:border-blue-700"
                      >
                        {course.level}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="ml-1 font-medium">
                          {course.rating}
                        </span>
                        <span className="ml-1 text-gray-500 dark:text-gray-400">
                          ({course.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    <div>
                      <CardTitle className="text-3xl">{course.title}</CardTitle>
                      <CardDescription className="text-lg mt-2">
                        {course.subtitle}
                      </CardDescription>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {course.studentsEnrolled.toLocaleString()} students
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {course.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {course.totalLessons} lessons
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isFavorite ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Course Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle>Course Description</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      {course.description}
                    </p>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">
                        What You Will Learn
                      </h4>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {course.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Course Requirements */}
                <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.requirements.map((req, index) => (
                        <li key={index} className="flex items-center">
                          <div className="mr-3 h-2 w-2 rounded-full bg-purple-500" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {req}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Schedule */}
                <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle>Class Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.schedule.map((session, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                              <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                              <div className="font-semibold">{session.day}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {session.time}
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">{session.type}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Curriculum Tab */}
              <TabsContent value="curriculum" className="space-y-4">
                <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle>Course Curriculum</CardTitle>
                    <CardDescription>
                      {course.totalLessons} lessons • {course.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {course.curriculum.map((week, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-gray-200 p-6 dark:border-gray-700"
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <div>
                              <h4 className="text-lg font-semibold">
                                Week {week.week}: {week.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Duration: {week.duration}
                              </p>
                            </div>
                            <Badge variant="outline">{week.duration}</Badge>
                          </div>
                          <ul className="space-y-2">
                            {week.topics.map((topic, topicIndex) => (
                              <li
                                key={topicIndex}
                                className="flex items-center"
                              >
                                <PlayCircle className="mr-3 h-5 w-5 text-gray-400" />
                                <span className="text-gray-700 dark:text-gray-300">
                                  {topic}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Instructor Tab */}
              <TabsContent value="instructor">
                <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle>About the Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-8 md:grid-cols-3">
                      <div className="md:col-span-1">
                        <div className="space-y-4">
                          <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full">
                            <div className="flex h-full w-full items-center justify-center bg-gradient-primary text-6xl font-bold text-white">
                              {course.instructor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                          </div>
                          <div className="text-center">
                            <h3 className="text-xl font-bold">
                              {course.instructor.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              {course.instructor.title}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-6">
                        <div>
                          <h4 className="mb-2 font-semibold">Biography</h4>
                          <p className="text-gray-700 dark:text-gray-300">
                            {course.instructor.bio}
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="rounded-lg border border-gray-200 p-4 text-center dark:border-gray-700">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                              {course.instructor.students.toLocaleString()}+
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Students
                            </div>
                          </div>
                          <div className="rounded-lg border border-gray-200 p-4 text-center dark:border-gray-700">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                              {course.instructor.courses}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Courses
                            </div>
                          </div>
                          <div className="rounded-lg border border-gray-200 p-4 text-center dark:border-gray-700">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                              {course.instructor.rating}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Rating
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                    <CardDescription>
                      Average rating: {course.rating} ({course.reviews} reviews)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[1, 2, 3].map((review, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-200 pb-6 last:border-0 dark:border-gray-700"
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary font-semibold text-white">
                                SA
                              </div>
                              <div>
                                <div className="font-semibold">
                                  Student {review}
                                </div>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < 4
                                          ? "text-yellow-500 fill-current"
                                          : "text-gray-300 dark:text-gray-600"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              2 months ago
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            This course has transformed my relationship with the
                            Quran. The teaching methodology is excellent, and
                            Sheikh Ahmed is incredibly patient and
                            knowledgeable.
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Pricing & Enrollment */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card className="sticky top-6 border-purple-200/50 bg-linear-to-b from-purple-50/50 to-white backdrop-blur-sm dark:border-purple-800/50 dark:from-gray-900/50 dark:to-gray-800/50">
              <CardHeader>
                <CardTitle>Enroll in This Course</CardTitle>
                <CardDescription>
                  Choose your preferred learning style
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pricing Options */}
                <div className="space-y-4">
                  {course.pricing.map((option) => (
                    <div
                      key={option.type}
                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        selectedPricing === option.type
                          ? "border-purple-500 bg-purple-50 dark:border-purple-600 dark:bg-purple-900/20"
                          : "border-gray-200 hover:border-purple-300 dark:border-gray-700 dark:hover:border-purple-700"
                      }`}
                      onClick={() => setSelectedPricing(option.type)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold">{option.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {option.description}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">
                            {option.price}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {option.features.map((feature, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected Plan Details */}
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                  <h4 className="mb-3 font-semibold">Selected Plan Details</h4>
                  <div className="space-y-2 text-sm">
                    {selectedPricing === "ONE_ON_ONE" && (
                      <>
                        <div className="flex justify-between">
                          <span>Session Duration:</span>
                          <span className="font-medium">30-60 minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Frequency:</span>
                          <span className="font-medium">3-5 sessions/week</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Teacher:</span>
                          <span className="font-medium">Dedicated 1:1</span>
                        </div>
                      </>
                    )}
                    {selectedPricing === "GROUP" && (
                      <>
                        <div className="flex justify-between">
                          <span>Group Size:</span>
                          <span className="font-medium">3-5 students</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Session Duration:</span>
                          <span className="font-medium">45 minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Schedule:</span>
                          <span className="font-medium">Fixed weekly</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Features Included */}
                <div>
                  <h4 className="mb-2 font-semibold">Included in all plans:</h4>
                  <ul className="space-y-2">
                    {[
                      "Access to all course materials",
                      "Weekly progress tracking",
                      "Certificate of completion",
                      "Lifetime access to recordings",
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <Button
                  className="w-full bg-gradient-primary"
                  size="lg"
                  asChild
                >
                  <Link
                    href={`/subscribe?course=${course.id}&type=${selectedPricing}`}
                  >
                    Enroll Now
                  </Link>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/contact">Request More Info</Link>
                </Button>
                <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                  14-day money-back guarantee • Cancel anytime
                </p>
              </CardFooter>
            </Card>

            {/* Course Stats */}
            <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Students Enrolled
                    </span>
                    <span className="font-semibold">
                      {course.studentsEnrolled.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Course Rating
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-semibold">
                        {course.rating}
                      </span>
                      <span className="ml-1 text-gray-500">
                        ({course.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Duration
                    </span>
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Lessons
                    </span>
                    <span className="font-semibold">{course.totalLessons}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Download Syllabus */}
            <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-lg">Course Materials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Syllabus
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="mr-2 h-4 w-4" />
                  Sample Lesson
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Study Materials
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
