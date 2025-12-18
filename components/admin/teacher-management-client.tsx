// src/components/admin/teacher-management-client.tsx
"use client";

import { useState } from "react";
import {
  GraduationCap,
  Users,
  BookOpen,
  Star,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  Calendar,
  MapPin,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Download,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";

interface TeacherManagementClientProps {
  initialTeachers: any[];
  stats: {
    totalTeachers: number;
    availableTeachers: number;
    totalClasses: number;
    totalStudents: number;
  };
}

export default function TeacherManagementClient({
  initialTeachers,
  stats,
}: TeacherManagementClientProps) {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    specialization: "",
    experienceYears: 0,
    bio: "",
    isAvailable: true,
  });

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.specialization?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statsData = [
    {
      label: "Total Teachers",
      value: stats.totalTeachers,
      icon: GraduationCap,
      color: "purple",
    },
    {
      label: "Available",
      value: stats.availableTeachers,
      icon: Check,
      color: "green",
    },
    {
      label: "Total Classes",
      value: stats.totalClasses,
      icon: BookOpen,
      color: "blue",
    },
    {
      label: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "yellow",
    },
  ];

  const handleCreateTeacher = async () => {
    if (!newTeacher.name.trim() || !newTeacher.email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeacher),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create teacher");
      }

      toast.success("Teacher created successfully");
      setTeachers([data.teacher, ...teachers]);
      setIsCreateDialogOpen(false);
      resetNewTeacher();
    } catch (error) {
      toast.error("Failed to create teacher", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTeacher = async (teacherId: string) => {
    if (!confirm("Are you sure you want to delete this teacher?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/teachers/${teacherId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete teacher");
      }

      toast.success("Teacher deleted successfully");
      setTeachers(teachers.filter((t) => t.id !== teacherId));
    } catch (error) {
      toast.error("Failed to delete teacher", {
        description: "Please try again.",
      });
    }
  };

  const handleToggleAvailability = async (
    teacherId: string,
    isAvailable: boolean
  ) => {
    try {
      const response = await fetch(
        `/api/admin/teachers/${teacherId}/availability`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isAvailable }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update teacher availability");
      }

      toast.success(
        `Teacher ${
          isAvailable ? "marked as available" : "marked as unavailable"
        }`
      );

      setTeachers(
        teachers.map((teacher) =>
          teacher.id === teacherId ? { ...teacher, isAvailable } : teacher
        )
      );
    } catch (error) {
      toast.error("Failed to update teacher", {
        description: "Please try again.",
      });
    }
  };

  const resetNewTeacher = () => {
    setNewTeacher({
      name: "",
      email: "",
      phone: "",
      qualification: "",
      specialization: "",
      experienceYears: 0,
      bio: "",
      isAvailable: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Teacher Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage teaching staff and assignments
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search teachers..."
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
                Add Teacher
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
                <DialogDescription>
                  Add a new teacher to the system
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newTeacher.name}
                      onChange={(e) =>
                        setNewTeacher({ ...newTeacher, name: e.target.value })
                      }
                      placeholder="e.g., Sheikh Ahmed Al-Qari"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newTeacher.email}
                      onChange={(e) =>
                        setNewTeacher({ ...newTeacher, email: e.target.value })
                      }
                      placeholder="e.g., teacher@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newTeacher.phone}
                      onChange={(e) =>
                        setNewTeacher({ ...newTeacher, phone: e.target.value })
                      }
                      placeholder="e.g., +1234567890"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience (Years)</Label>
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      value={newTeacher.experienceYears}
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          experienceYears: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualifications</Label>
                  <Input
                    id="qualification"
                    value={newTeacher.qualification}
                    onChange={(e) =>
                      setNewTeacher({
                        ...newTeacher,
                        qualification: e.target.value,
                      })
                    }
                    placeholder="e.g., PhD in Quranic Sciences, Ijazah in Hafs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    value={newTeacher.specialization}
                    onChange={(e) =>
                      setNewTeacher({
                        ...newTeacher,
                        specialization: e.target.value,
                      })
                    }
                    placeholder="e.g., Quran Memorization, Tajweed, Fiqh"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Biography</Label>
                  <Textarea
                    id="bio"
                    value={newTeacher.bio}
                    onChange={(e) =>
                      setNewTeacher({ ...newTeacher, bio: e.target.value })
                    }
                    placeholder="Brief introduction about the teacher..."
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="available"
                    checked={newTeacher.isAvailable}
                    onCheckedChange={(checked) =>
                      setNewTeacher({ ...newTeacher, isAvailable: checked })
                    }
                  />
                  <Label htmlFor="available">Available for Teaching</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateTeacher} disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Teacher"}
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

      {/* Teachers Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {getInitials(teacher.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">
                      {teacher.user.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {teacher.teacherId} •{" "}
                      {teacher.specialization || "No specialization"}
                    </CardDescription>
                  </div>
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
                      onClick={() =>
                        handleToggleAvailability(
                          teacher.id,
                          !teacher.isAvailable
                        )
                      }
                    >
                      {teacher.isAvailable ? (
                        <>
                          <X className="mr-2 h-4 w-4" />
                          Mark Unavailable
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Mark Available
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteTeacher(teacher.id)}
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
                {/* Teacher Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={teacher.isAvailable ? "default" : "outline"}
                      >
                        {teacher.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                      {teacher.experienceYears > 0 && (
                        <Badge variant="outline">
                          {teacher.experienceYears} years exp
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-yellow-600">
                      <Star className="h-4 w-4 fill-current" />
                      <span>4.8</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {teacher.user.email}
                    </div>
                    {teacher.user.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {teacher.user.phone}
                      </div>
                    )}
                    {teacher.qualification && (
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-gray-400" />
                        {teacher.qualification}
                      </div>
                    )}
                  </div>
                  {teacher.bio && (
                    <p className="text-sm text-gray-600">{teacher.bio}</p>
                  )}
                </div>

                {/* Classes and Subjects */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Classes</h4>
                    <div className="space-y-2">
                      {teacher.classes.slice(0, 3).map((cls: any) => (
                        <div
                          key={cls.id}
                          className="flex items-center justify-between rounded-lg border p-2"
                        >
                          <div>
                            <p className="text-sm font-medium">{cls.name}</p>
                            <p className="text-xs text-gray-500">
                              {cls.enrollments.length} students
                            </p>
                          </div>
                          <Badge variant="outline">{cls.level}</Badge>
                        </div>
                      ))}
                      {teacher.classes.length > 3 && (
                        <p className="text-center text-sm text-gray-500">
                          + {teacher.classes.length - 3} more classes
                        </p>
                      )}
                      {teacher.classes.length === 0 && (
                        <p className="text-center text-sm text-gray-500 py-2">
                          No classes assigned
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Subjects</h4>
                    <div className="space-y-2">
                      {teacher.subjects.slice(0, 3).map((subject: any) => (
                        <Badge
                          key={subject.id}
                          variant="secondary"
                          className="w-full justify-start"
                        >
                          {subject.name}
                        </Badge>
                      ))}
                      {teacher.subjects.length > 3 && (
                        <p className="text-center text-sm text-gray-500">
                          + {teacher.subjects.length - 3} more subjects
                        </p>
                      )}
                      {teacher.subjects.length === 0 && (
                        <p className="text-center text-sm text-gray-500 py-2">
                          No subjects assigned
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Assign Class
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

      {filteredTeachers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <GraduationCap className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-semibold">No teachers found</h3>
            <p className="mt-2 text-gray-500">
              {searchQuery
                ? "Try adjusting your search query"
                : "Add your first teacher"}
            </p>
            <Button
              className="mt-4 bg-gradient-primary gap-2"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Teacher
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
