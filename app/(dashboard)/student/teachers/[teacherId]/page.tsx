// src/app/(dashboard)/student/teacher/[teacherId]/page.tsx - UPDATED
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Star,
  Award,
  BookOpen,
  Users,
  MessageSquare,
  Video,
  MapPin,
  GraduationCap,
  Clock,
  
  Share2,
  Book,

  BarChart3,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { getInitials } from "@/lib/utils";
import { toast } from "sonner";

interface TeacherData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  title: string;
  bio: string;
  qualification: string;
  specialization: string;
  experience: number;
  rating: number;
  students: number;
  classes: number;
  location: string;
  languages: string[];
  schedule: Array<{
    day: string;
    time: string;
    type: string;
    className: string;
  }>;
  classesTeaching: Array<{
    id: string;
    name: string;
    code: string;
    students: number;
    progress: number;
  }>;
  achievements: Array<{
    id: number;
    title: string;
    organization: string;
    year: number;
  }>;
  reviews: Array<{
    id: string;
    student: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

export default function TeacherProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeacherData();
  }, [params.teacherId]);

  const fetchTeacherData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/student/teacher/${params.teacherId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch teacher data");
      }

      setTeacherData(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load teacher data"
      );
      toast.error("Error", {
        description: "Failed to load teacher data. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !teacherData) {
    return (
      <div className="flex h-64 flex-col items-center justify-center">
        <div className="h-12 w-12 text-red-500">!</div>
        <h3 className="mt-4 text-lg font-semibold">Error Loading Teacher</h3>
        <p className="mt-2 text-gray-600">{error || "Teacher not found"}</p>
        <Button
          className="mt-4"
          onClick={() => router.push("/student/teachers")}
        >
          Back to Teachers
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Teacher Profile
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              View teacher details, schedule, and classes
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button className="bg-gradient-primary gap-2" asChild>
            <Link href={`/student/messages/new?teacher=${teacherData.id}`}>
              <MessageSquare className="h-4 w-4" />
              Send Message
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Teacher Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Teacher Profile Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0">
                  <Avatar className="h-32 w-32 border-4 border-purple-100 dark:border-purple-900/30">
                    <AvatarImage src={teacherData.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-3xl text-white">
                      {getInitials(teacherData.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">{teacherData.name}</h2>
                    <p className="text-lg text-purple-600 dark:text-purple-400">
                      {teacherData.title}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                      <Badge variant="outline" className="gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {teacherData.rating.toFixed(1)} ({teacherData.students}{" "}
                        students)
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <GraduationCap className="h-3 w-3" />
                        {teacherData.experience} years experience
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <BookOpen className="h-3 w-3" />
                        {teacherData.classes} classes
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 md:justify-start">
                      <Mail className="mr-2 h-4 w-4" />
                      {teacherData.email}
                    </div>
                    {teacherData.phone && (
                      <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 md:justify-start">
                        <Phone className="mr-2 h-4 w-4" />
                        {teacherData.phone}
                      </div>
                    )}
                    <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 md:justify-start">
                      <MapPin className="mr-2 h-4 w-4" />
                      {teacherData.location}
                    </div>
                    {teacherData.languages &&
                      teacherData.languages.length > 0 && (
                        <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 md:justify-start">
                          <Book className="mr-2 h-4 w-4" />
                          Languages: {teacherData.languages.join(", ")}
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {teacherData.bio && (
                <div className="mt-8">
                  <h3 className="mb-3 font-semibold">About</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {teacherData.bio}
                  </p>
                </div>
              )}

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-semibold">Qualifications</h3>
                  <div className="space-y-2">
                    {teacherData.qualification ? (
                      teacherData.qualification
                        .split("\n")
                        .map((qual, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {qual}
                            </span>
                          </div>
                        ))
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        No qualifications listed
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 font-semibold">Specialization</h3>
                  <div className="flex flex-wrap gap-2">
                    {teacherData.specialization ? (
                      teacherData.specialization
                        .split(", ")
                        .map((spec, index) => (
                          <Badge key={index} variant="secondary">
                            {spec}
                          </Badge>
                        ))
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        No specialization listed
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Navigation */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 pt-6">
              {/* Teaching Philosophy */}
              <Card>
                <CardHeader>
                  <CardTitle>Teaching Approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                      <h4 className="font-semibold text-purple-700 dark:text-purple-300">
                        Teaching Style
                      </h4>
                      <p className="mt-2 text-purple-600 dark:text-purple-400">
                        Focuses on building strong foundations with interactive
                        sessions and personalized feedback.
                      </p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300">
                        Success Rate
                      </h4>
                      <p className="mt-2 text-blue-600 dark:text-blue-400">
                        {teacherData.students}+ students taught with high
                        completion rates and satisfaction.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              {teacherData.achievements &&
                teacherData.achievements.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Achievements & Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {teacherData.achievements.map((achievement) => (
                          <div
                            key={achievement.id}
                            className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="rounded-lg bg-yellow-100 p-2 dark:bg-yellow-900/30">
                                <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                              </div>
                              <div>
                                <h4 className="font-medium">
                                  {achievement.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {achievement.organization} •{" "}
                                  {achievement.year}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
            </TabsContent>

            {/* Classes Tab */}
            <TabsContent value="classes" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Classes Teaching</CardTitle>
                  <CardDescription>
                    Classes currently taught by this teacher
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacherData.classesTeaching.map((classItem) => (
                      <div
                        key={classItem.id}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="rounded-lg bg-gradient-primary p-3">
                            <BookOpen className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">{classItem.name}</h4>
                            <div className="mt-1 flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                              <span>Code: {classItem.code}</span>
                              <span>•</span>
                              <span className="flex items-center">
                                <Users className="mr-1 h-3 w-3" />
                                {classItem.students} students
                              </span>
                              <span>•</span>
                              <span className="flex items-center">
                                <BarChart3 className="mr-1 h-3 w-3" />
                                Avg. Progress: {classItem.progress}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/student/classes/${classItem.id}`}>
                              View Class
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                  <CardDescription>
                   {` Teacher's availability and office hours`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacherData.schedule.map((slot, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`rounded-lg p-3 ${
                              slot.type === "classes"
                                ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                                : slot.type === "office hours"
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {slot.type === "classes" ? (
                              <BookOpen className="h-5 w-5" />
                            ) : (
                              <Users className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">
                              {slot.className || slot.type}
                            </h4>
                            <div className="mt-1 flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                              <span className="flex items-center">
                                <Calendar className="mr-1 h-3 w-3" />
                                {slot.day}
                              </span>
                              <span className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                {slot.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {slot.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                  <CardDescription>
                    Feedback from current and former students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {teacherData.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-6 last:border-0 dark:border-gray-700"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-gray-200 dark:bg-gray-700">
                                {getInitials(review.student)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{review.student}</h4>
                              <div className="mt-1 flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300 dark:text-gray-600"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Teacher</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link
                    href={`/student/messages/new?teacher=${teacherData.id}`}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="mr-2 h-4 w-4" />
                  Request Video Call
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a href={`mailto:${teacherData.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Teaching Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm">Student Satisfaction</span>
                    <span className="font-bold text-green-600">
                      {teacherData.rating.toFixed(1)}/5
                    </span>
                  </div>
                  <Progress
                    value={(teacherData.rating / 5) * 100}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm">Experience</span>
                    <span className="font-bold text-purple-600">
                      {teacherData.experience} years
                    </span>
                  </div>
                  <Progress
                    value={Math.min(teacherData.experience * 10, 100)}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm">Active Students</span>
                    <span className="font-bold text-blue-600">
                      {teacherData.students}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm">Class Success Rate</span>
                    <span className="font-bold text-yellow-600">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
