// src/app/(dashboard)/admin/courses/page.tsx
"use client";

import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,

  BookOpen,
  Users,
  Clock,
  DollarSign,
  Search,

  Star,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Mock data
const mockCourses = [
  {
    id: "1",
    name: "Complete Quran Memorization (Hifz) Program",
    description:
      "A comprehensive program to memorize the entire Quran with proper tajweed",
    category: "QURAN",
    level: "Beginner to Advanced",
    duration: "12-36 months",
    totalLessons: 240,
    price: 49.0,
    currency: "USD",
    rating: 4.9,
    totalRatings: 324,
    enrollments: 1245,
    teacher: "Sheikh Ahmed Al-Qari",
    isActive: true,
    isPublic: true,
    isFeatured: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Tajweed Rules Mastery",
    description: "Master the rules of Quranic recitation",
    category: "TAJWEED",
    level: "Beginner to Intermediate",
    duration: "3 months",
    totalLessons: 36,
    price: 29.0,
    currency: "USD",
    rating: 4.7,
    totalRatings: 156,
    enrollments: 892,
    teacher: "Sheikh Ahmed Al-Qari",
    isActive: true,
    isPublic: true,
    isFeatured: false,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
];

const categories = [
  { value: "QURAN", label: "Quran" },
  { value: "TAJWEED", label: "Tajweed" },
  { value: "ARABIC", label: "Arabic" },
  { value: "FIQH", label: "Fiqh" },
  { value: "AQEEDAH", label: "Aqeedah" },
  { value: "SEERAH", label: "Seerah" },
  { value: "HADITH", label: "Hadith" },
  { value: "AKHLAQ", label: "Akhlaq" },
];

const levels = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
  { value: "ALL_LEVELS", label: "All Levels" },
];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState(mockCourses);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    category: "QURAN",
    level: "BEGINNER",
    duration: "",
    totalLessons: 0,
    price: 0,
    currency: "USD",
    teacher: "",
    isActive: true,
    isPublic: true,
    isFeatured: false,
    features: [""],
    requirements: [""],
  });

  const handleEditCourse = (course: any) => {
    setEditingCourse(JSON.parse(JSON.stringify(course)));
  };

  const handleSaveCourse = () => {
    if (editingCourse) {
      setCourses(
        courses.map((c) => (c.id === editingCourse.id ? editingCourse : c))
      );
      setEditingCourse(null);
      toast({
        title: "Course Updated",
        description: "Course has been updated successfully.",
      });
    }
  };

  const handleCreateCourse = () => {
    const newCourseWithId = {
      ...newCourse,
      id: Date.now().toString(),
      enrollments: 0,
      rating: 0,
      totalRatings: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCourses([...courses, newCourseWithId]);
    setIsCreating(false);
    setNewCourse({
      name: "",
      description: "",
      category: "QURAN",
      level: "BEGINNER",
      duration: "",
      totalLessons: 0,
      price: 0,
      currency: "USD",
      teacher: "",
      isActive: true,
      isPublic: true,
      isFeatured: false,
      features: [""],
      requirements: [""],
    });
    toast({
      title: "Course Created",
      description: "New course has been created successfully.",
    });
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
    toast({
      title: "Course Deleted",
      description: "Course has been deleted.",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      QURAN:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      TAJWEED:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      FIQH: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      ARABIC:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    };
    return (
      colors[category] ||
      "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
    );
  };

  const filteredCourses = courses.filter((course) => {
    if (
      searchQuery &&
      !course.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (filterCategory !== "all" && course.category !== filterCategory) {
      return false;
    }
    if (filterStatus === "active" && !course.isActive) return false;
    if (filterStatus === "inactive" && course.isActive) return false;
    if (filterStatus === "featured" && !course.isFeatured) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Course Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage courses for your madrasah
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-gradient-primary"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search courses..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Course Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Create New Course</CardTitle>
              <CardDescription>
                Fill in all required course information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course-name">Course Name *</Label>
                    <Input
                      id="course-name"
                      value={newCourse.name}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, name: e.target.value })
                      }
                      placeholder="e.g., Complete Quran Memorization Program"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={newCourse.description}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe the course in detail..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Course Details</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={newCourse.category}
                      onValueChange={(value) =>
                        setNewCourse({ ...newCourse, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Level *</Label>
                    <Select
                      value={newCourse.level}
                      onValueChange={(value) =>
                        setNewCourse({ ...newCourse, level: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={newCourse.duration}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, duration: e.target.value })
                      }
                      placeholder="e.g., 3 months, 12 weeks"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lessons">Total Lessons</Label>
                    <Input
                      id="lessons"
                      type="number"
                      value={newCourse.totalLessons}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          totalLessons: parseInt(e.target.value),
                        })
                      }
                      min="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ({newCourse.currency})</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newCourse.price}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          price: parseFloat(e.target.value),
                        })
                      }
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Features & Requirements */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Features</h3>
                  <div className="space-y-2 mt-2">
                    {newCourse.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => {
                            const newFeatures = [...newCourse.features];
                            newFeatures[index] = e.target.value;
                            setNewCourse({
                              ...newCourse,
                              features: newFeatures,
                            });
                          }}
                          placeholder="e.g., Personalized lesson plan"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const newFeatures = newCourse.features.filter(
                              (_, i) => i !== index
                            );
                            setNewCourse({
                              ...newCourse,
                              features: newFeatures,
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setNewCourse({
                          ...newCourse,
                          features: [...newCourse.features, ""],
                        })
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Feature
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Requirements</h3>
                  <div className="space-y-2 mt-2">
                    {newCourse.requirements.map((requirement, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={requirement}
                          onChange={(e) => {
                            const newRequirements = [...newCourse.requirements];
                            newRequirements[index] = e.target.value;
                            setNewCourse({
                              ...newCourse,
                              requirements: newRequirements,
                            });
                          }}
                          placeholder="e.g., Basic Arabic reading skills"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const newRequirements =
                              newCourse.requirements.filter(
                                (_, i) => i !== index
                              );
                            setNewCourse({
                              ...newCourse,
                              requirements: newRequirements,
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setNewCourse({
                          ...newCourse,
                          requirements: [...newCourse.requirements, ""],
                        })
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Requirement
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                onClick={handleCreateCourse}
                className="bg-gradient-primary"
              >
                <Save className="mr-2 h-4 w-4" />
                Create Course
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge className={getCategoryColor(course.category)}>
                      {course.category}
                    </Badge>
                    <Badge variant="outline">{course.level}</Badge>
                    {course.isFeatured && (
                      <Badge className="bg-gradient-primary">Featured</Badge>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">
                        {course.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({course.totalRatings})
                      </span>
                    </div>
                  </div>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditCourse(course)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Duration
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Lessons
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <BookOpen className="h-4 w-4" />
                    {course.totalLessons} lessons
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Enrollments
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Users className="h-4 w-4" />
                    {course.enrollments}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Price
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <DollarSign className="h-4 w-4" />
                    {course.currency} {course.price?.toFixed(2)}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t pt-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Teacher: {course.teacher}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={course.isActive}
                    onCheckedChange={() => {
                      /* Handle toggle */
                    }}
                  />
                  <span className="text-sm font-medium">
                    {course.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {course.isPublic ? (
                    <Eye className="h-4 w-4 text-green-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="text-sm">
                    {course.isPublic ? "Public" : "Private"}
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
