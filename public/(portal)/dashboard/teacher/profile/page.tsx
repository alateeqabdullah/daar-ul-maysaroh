// src/app/(dashboard)/teacher/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Award,
  BookOpen,
  GraduationCap,
  Clock,
  Edit,
  Save,
  Users,
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
import { toast } from "sonner";
import { format } from "date-fns";

interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  qualification: string;
  specialization: string;
  experienceYears: number;
  bio: string;
  joiningDate: string;
  classes: number;
  students: number;
  rating: number;
  subjects: string[];
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "certification" | "award" | "completion";
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      // Mock data - replace with API call
      const mockProfile: TeacherProfile = {
        id: "TCH-001",
        name: "Sheikh Ahmed Al-Qari",
        email: "ahmed.alqari@madrasah.com",
        phone: "+966501234567",
        qualification: "PhD in Quranic Sciences, Ijazah in Hafs narration",
        specialization: "Quran Memorization & Tajweed",
        experienceYears: 15,
        bio: "Expert in Quran memorization with 15+ years of experience teaching students of all ages. Passionate about preserving the traditional methods while incorporating modern teaching techniques.",
        joiningDate: "2020-01-15",
        classes: 8,
        students: 156,
        rating: 4.8,
        subjects: [
          "Quran Memorization",
          "Tajweed",
          "Qiraat",
          "Islamic Studies",
        ],
        achievements: [
          {
            id: "1",
            title: "Certified Quran Teacher",
            description: "Certified by International Quran Teaching Institute",
            date: "2023-05-15",
            type: "certification",
          },
          {
            id: "2",
            title: "Teacher of the Year",
            description: "Awarded for exceptional teaching performance",
            date: "2023-12-20",
            type: "award",
          },
          {
            id: "3",
            title: "100+ Hafiz Students",
            description:
              "Successfully guided over 100 students to become Hafiz",
            date: "2024-01-01",
            type: "achievement",
          },
        ],
      };
      setProfile(mockProfile);
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully");
    // In production: API call to update profile
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="py-12 text-center">
        <User className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-4 text-lg font-semibold">Profile not found</h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Profile
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View and manage your professional profile
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button
                className="bg-gradient-primary gap-2"
                onClick={handleSave}
              >
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              className="bg-gradient-primary gap-2"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="bg-gradient-primary text-3xl text-white">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {profile.specialization}
                </p>

                <div className="mt-4 flex items-center justify-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} filled={i < Math.floor(profile.rating)} />
                    ))}
                    <span className="ml-2 font-bold">{profile.rating}</span>
                  </div>
                  <Badge className="bg-gradient-primary text-white">
                    Teacher
                  </Badge>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                    <div className="flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <p className="mt-1 text-2xl font-bold">
                      {profile.students}
                    </p>
                    <p className="text-sm text-gray-600">Students</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                    <div className="flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="mt-1 text-2xl font-bold">{profile.classes}</p>
                    <p className="text-sm text-gray-600">Classes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-600">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-gray-600">{profile.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Joined</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(profile.joiningDate), "MMMM yyyy")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Experience</p>
                  <p className="text-sm text-gray-600">
                    {profile.experienceYears} years
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Detailed Info */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {profile.bio}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Qualifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <GraduationCap className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium">{profile.qualification}</p>
                        <p className="text-sm text-gray-600">
                          Main Qualification
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Award className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Ijazah in Hafs Narration</p>
                        <p className="text-sm text-gray-600">
                          Certified by Sheikh Muhammad Al-...
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subjects">
              <Card>
                <CardHeader>
                  <CardTitle>Subjects I Teach</CardTitle>
                  <CardDescription>My areas of expertise</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {profile.subjects.map((subject, index) => (
                      <Card key={index} className="border-2">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3">
                            <div className="rounded-lg bg-purple-100 p-3">
                              <BookOpen className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{subject}</h3>
                              <p className="text-sm text-gray-600">
                                {index === 0
                                  ? "Primary Specialization"
                                  : "Expertise Area"}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm">
                              <span>Student Satisfaction</span>
                              <span className="font-bold text-green-600">
                                96%
                              </span>
                            </div>
                            <Progress value={96} className="mt-2" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements & Certifications</CardTitle>
                  <CardDescription>
                    Professional accomplishments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {profile.achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-start space-x-4"
                      >
                        <div
                          className={`
                          mt-1 flex h-12 w-12 items-center justify-center rounded-full
                          ${
                            achievement.type === "certification"
                              ? "bg-blue-100"
                              : achievement.type === "award"
                              ? "bg-yellow-100"
                              : "bg-green-100"
                          }
                        `}
                        >
                          <Award
                            className={`
                            h-6 w-6
                            ${
                              achievement.type === "certification"
                                ? "text-blue-600"
                                : achievement.type === "award"
                                ? "text-yellow-600"
                                : "text-green-600"
                            }
                          `}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">
                              {achievement.title}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {format(new Date(achievement.date), "MMM yyyy")}
                            </span>
                          </div>
                          <p className="mt-1 text-gray-600">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="statistics">
              <Card>
                <CardHeader>
                  <CardTitle>Teaching Statistics</CardTitle>
                  <CardDescription>Performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Attendance Rate</span>
                          <span className="font-bold text-green-600">94%</span>
                        </div>
                        <Progress value={94} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            Student Satisfaction
                          </span>
                          <span className="font-bold text-blue-600">96%</span>
                        </div>
                        <Progress value={96} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            Assignment Completion
                          </span>
                          <span className="font-bold text-purple-600">88%</span>
                        </div>
                        <Progress value={88} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Response Time</span>
                          <span className="font-bold text-yellow-600">
                            2.4h
                          </span>
                        </div>
                        <Progress value={85} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Star rating component
const Star = ({ filled }: { filled: boolean }) => (
  <svg
    className={`h-5 w-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
