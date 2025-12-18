// src/components/admin/class-management-client.tsx
"use client";

import { useState } from "react";
import {
  BookOpen,
  Users,
  GraduationCap,
  Calendar,
  Plus,
  Search,
  Edit,
  Trash2,
  MoreVertical,
  Check,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";

interface ClassManagementClientProps {
  initialClasses: any[];
  teachers: any[];
  subjects: any[];
  stats: {
    totalClasses: number;
    activeClasses: number;
    totalStudents: number;
    totalTeachers: number;
  };
}

export default function ClassManagementClient({
  initialClasses,
  teachers,
  subjects,
  stats,
}: ClassManagementClientProps) {
  const [classes, setClasses] = useState(initialClasses);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [newClass, setNewClass] = useState({
    name: "",
    code: "",
    description: "",
    level: "BEGINNER",
    section: "",
    capacity: 20,
    academicYear: "2024-2025",
    term: "Fall 2024",
    teacherId: "",
    isActive: true,
  });

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statsData = [
    {
      label: "Total Classes",
      value: stats.totalClasses,
      icon: BookOpen,
      color: "purple",
    },
    {
      label: "Active Classes",
      value: stats.activeClasses,
      icon: BookOpen,
      color: "green",
    },
    {
      label: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "blue",
    },
    {
      label: "Available Teachers",
      value: stats.totalTeachers,
      icon: GraduationCap,
      color: "yellow",
    },
  ];

  const handleCreateClass = async () => {
    if (!newClass.name.trim() || !newClass.code.trim()) {
      toast.error("Class name and code are required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClass),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create class");
      }

      toast.success("Class created successfully");
      setClasses([data.class, ...classes]);
      setIsCreateDialogOpen(false);
      resetNewClass();
    } catch (error) {
      toast.error("Failed to create class", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClass = async (classId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this class? This will also remove all enrollments."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/classes/${classId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete class");
      }

      toast.success("Class deleted successfully");
      setClasses(classes.filter((c) => c.id !== classId));
    } catch (error) {
      toast.error("Failed to delete class", {
        description: "Please try again.",
      });
    }
  };

  const handleToggleActive = async (classId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/classes/${classId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });

      if (!response.ok) {
        throw new Error("Failed to update class status");
      }

      toast.success(
        `Class ${isActive ? "activated" : "deactivated"} successfully`
      );

      setClasses(
        classes.map((cls) => (cls.id === classId ? { ...cls, isActive } : cls))
      );
    } catch (error) {
      toast.error("Failed to update class", {
        description: "Please try again.",
      });
    }
  };

  const resetNewClass = () => {
    setNewClass({
      name: "",
      code: "",
      description: "",
      level: "BEGINNER",
      section: "",
      capacity: 20,
      academicYear: "2024-2025",
      term: "Fall 2024",
      teacherId: "",
      isActive: true,
    });
  };

  const levels = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
  const terms = ["Fall 2024", "Spring 2025", "Summer 2025"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Class Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage all classes and course offerings
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary gap-2">
                <Plus className="h-4 w-4" />
                Create Class
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Class</DialogTitle>
                <DialogDescription>
                  Create a new class with teacher assignment and schedule
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Class Name *</Label>
                    <Input
                      id="name"
                      value={newClass.name}
                      onChange={(e) =>
                        setNewClass({ ...newClass, name: e.target.value })
                      }
                      placeholder="e.g., Quran Memorization - Level 1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Class Code *</Label>
                    <Input
                      id="code"
                      value={newClass.code}
                      onChange={(e) =>
                        setNewClass({ ...newClass, code: e.target.value })
                      }
                      placeholder="e.g., QUR-101"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newClass.description}
                    onChange={(e) =>
                      setNewClass({ ...newClass, description: e.target.value })
                    }
                    placeholder="Describe the class curriculum and objectives..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level">Level *</Label>
                    <Select
                      value={newClass.level}
                      onValueChange={(value) =>
                        setNewClass({ ...newClass, level: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="section">Section</Label>
                    <Input
                      id="section"
                      value={newClass.section}
                      onChange={(e) =>
                        setNewClass({ ...newClass, section: e.target.value })
                      }
                      placeholder="e.g., A, B, Morning"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      max="100"
                      value={newClass.capacity}
                      onChange={(e) =>
                        setNewClass({
                          ...newClass,
                          capacity: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher">Teacher *</Label>
                    <Select
                      value={newClass.teacherId}
                      onValueChange={(value) =>
                        setNewClass({ ...newClass, teacherId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {teachers.map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.id}>
                            {teacher.user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Input
                      id="academicYear"
                      value={newClass.academicYear}
                      onChange={(e) =>
                        setNewClass({
                          ...newClass,
                          academicYear: e.target.value,
                        })
                      }
                      placeholder="e.g., 2024-2025"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="term">Term</Label>
                    <Select
                      value={newClass.term}
                      onValueChange={(value) =>
                        setNewClass({ ...newClass, term: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        {terms.map((term) => (
                          <SelectItem key={term} value={term}>
                            {term}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={newClass.isActive}
                    onCheckedChange={(checked) =>
                      setNewClass({ ...newClass, isActive: checked })
                    }
                  />
                  <Label htmlFor="active">Active Class</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateClass} disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Class"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p
                    className={`mt-2 text-2xl font-bold text-${stat.color}-600`}
                  >
                    {stat.value}
                  </p>
                </div>
                <div className={`rounded-lg bg-${stat.color}-100 p-3`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Classes Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredClasses.map((cls) => (
          <Card key={cls.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{cls.name}</CardTitle>
                    <Badge variant={cls.isActive ? "default" : "outline"}>
                      {cls.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline">{cls.level}</Badge>
                  </div>
                  <CardDescription className="mt-2">
                    {cls.code} • {cls.teacher?.user.name}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleToggleActive(cls.id, !cls.isActive)}
                    >
                      {cls.isActive ? (
                        <>
                          <X className="mr-2 h-4 w-4" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Activate
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteClass(cls.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Class Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-medium">
                      {cls.enrollments.length} / {cls.capacity} students
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Academic Year:</span>
                    <span className="font-medium">{cls.academicYear}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Term:</span>
                    <span className="font-medium">{cls.term}</span>
                  </div>
                  {cls.section && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Section:</span>
                      <span className="font-medium">{cls.section}</span>
                    </div>
                  )}
                </div>

                {/* Schedule */}
                {cls.schedules.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Schedule</h4>
                    <div className="space-y-2">
                      {cls.schedules.map((schedule: any) => (
                        <div
                          key={schedule.id}
                          className="flex items-center justify-between rounded-lg border p-2 text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>
                              {
                                [
                                  "Sun",
                                  "Mon",
                                  "Tue",
                                  "Wed",
                                  "Thu",
                                  "Fri",
                                  "Sat",
                                ][schedule.dayOfWeek]
                              }{" "}
                              {schedule.startTime} - {schedule.endTime}
                            </span>
                          </div>
                          <Badge variant="outline">
                            {schedule.meetingPlatform}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Students */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-sm font-medium">Students</h4>
                    <span className="text-sm text-gray-500">
                      {cls.enrollments.length} enrolled
                    </span>
                  </div>
                  <div className="flex -space-x-2">
                    {cls.enrollments.slice(0, 5).map((enrollment: any) => (
                      <Avatar
                        key={enrollment.id}
                        className="border-2 border-white"
                      >
                        <AvatarFallback className="text-xs">
                          {getInitials(enrollment.student.user.name)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {cls.enrollments.length > 5 && (
                      <Avatar className="border-2 border-white">
                        <AvatarFallback className="text-xs bg-gray-100">
                          +{cls.enrollments.length - 5}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Students
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-semibold">No classes found</h3>
            <p className="mt-2 text-gray-500">
              {searchQuery
                ? "Try adjusting your search query"
                : "Create your first class"}
            </p>
            <Button
              className="mt-4 bg-gradient-primary gap-2"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Create Class
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
