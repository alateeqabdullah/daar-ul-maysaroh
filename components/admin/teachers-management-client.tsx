// src/components/admin/teachers-management-client.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  Download,
  GraduationCap,
  UserPlus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Eye,
  CheckCircle,
  XCircle,
  Users,
  Clock,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getInitials, formatDate } from "@/lib/utils";

interface TeachersManagementClientProps {
  initialTeachers: any[];
  total: number;
  page: number;
  filters: any;
}

export default function TeachersManagementClient({
  initialTeachers,
  total,
  page,
  filters,
}: TeachersManagementClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [teachers, setTeachers] = useState(initialTeachers);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [selectedStatus, setSelectedStatus] = useState(filters.status || "all");
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (selectedStatus !== "all") params.set("status", selectedStatus);
      if (page > 1) params.set("page", page.toString());

      router.push(`/admin/teachers?${params.toString()}`);

      const response = await fetch(`/api/admin/teachers?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setTeachers(data.teachers);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refreshData();
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/admin/teachers?${params.toString()}`);
  };

  const handleCreateTeacher = async (teacherData: any) => {
    try {
      const response = await fetch("/api/admin/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacherData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create teacher");
      }

      toast.success("Teacher created successfully");
      refreshData();
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast.error("Failed to create teacher", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  const handleDeleteTeacher = async (teacherId: string) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;

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

  const handleUpdateAvailability = async (
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
        throw new Error("Failed to update availability");
      }

      toast.success(
        `Teacher marked as ${isAvailable ? "available" : "unavailable"}`
      );
      refreshData();
    } catch (error) {
      toast.error("Failed to update availability", {
        description: "Please try again.",
      });
    }
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Teacher Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and monitor all teachers in your madrasah
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary gap-2">
                <UserPlus className="h-4 w-4" />
                Add Teacher
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
                <DialogDescription>
                  Create a new teacher account
                </DialogDescription>
              </DialogHeader>
              <CreateTeacherForm
                onSubmit={handleCreateTeacher}
                onCancel={() => setIsCreateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Teachers
                </p>
                <p className="mt-2 text-2xl font-bold text-purple-600">
                  {total}
                </p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {teachers.filter((t) => t.isAvailable).length}
                </p>
              </div>
              <div className="rounded-lg bg-green-100 p-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unavailable</p>
                <p className="mt-2 text-2xl font-bold text-red-600">
                  {teachers.filter((t) => !t.isAvailable).length}
                </p>
              </div>
              <div className="rounded-lg bg-red-100 p-3">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg. Experience
                </p>
                <p className="mt-2 text-2xl font-bold text-blue-600">
                  {teachers.length > 0
                    ? Math.round(
                        teachers.reduce(
                          (sum, t) => sum + (t.experienceYears || 0),
                          0
                        ) / teachers.length
                      )
                    : 0}{" "}
                  years
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Name, email, or teacher ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Availability</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Teachers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teachers</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end space-x-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Teachers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Teachers List</CardTitle>
          <CardDescription>
            {total} teachers found • Page {page} of {totalPages}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : teachers.length === 0 ? (
            <div className="py-12 text-center">
              <GraduationCap className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold">No teachers found</h3>
              <p className="mt-2 text-gray-500">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Add your first teacher"}
              </p>
              <Button
                className="mt-4"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add Teacher
              </Button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Teacher
                      </th>
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Specialization
                      </th>
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Contact
                      </th>
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Status
                      </th>
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Classes
                      </th>
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher) => (
                      <tr
                        key={teacher.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-primary text-white">
                                {getInitials(teacher.user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{teacher.user.name}</p>
                              <p className="text-sm text-gray-500">
                                {teacher.teacherId}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div>
                            <p className="font-medium">
                              {teacher.specialization || "General"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {teacher.qualification}
                            </p>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="space-y-1">
                            <p className="text-sm">{teacher.user.email}</p>
                            <p className="text-sm text-gray-500">
                              {teacher.user.phone}
                            </p>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                teacher.isAvailable ? "default" : "destructive"
                              }
                            >
                              {teacher.isAvailable
                                ? "Available"
                                : "Unavailable"}
                            </Badge>
                            <Badge variant="outline">
                              {teacher.experienceYears || 0} years
                            </Badge>
                          </div>
                        </td>
                        <td className="py-4">
                          <div>
                            <p className="font-medium">
                              {teacher.classes.length} classes
                            </p>
                            <p className="text-sm text-gray-500">
                              {teacher.classes.reduce(
                                (sum: number, cls: any) =>
                                  sum + (cls.enrollments?.length || 0),
                                0
                              )}{" "}
                              students
                            </p>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedTeacher(teacher);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleUpdateAvailability(
                                  teacher.id,
                                  !teacher.isAvailable
                                )
                              }
                            >
                              {teacher.isAvailable ? (
                                <XCircle className="h-4 w-4 text-red-600" />
                              ) : (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              )}
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>
                                  Assign Classes
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  View Schedule
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() =>
                                    handleDeleteTeacher(teacher.id)
                                  }
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {(page - 1) * 10 + 1} to{" "}
                    {Math.min(page * 10, total)} of {total} results
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Teacher View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          {selectedTeacher && (
            <>
              <DialogHeader>
                <DialogTitle>Teacher Details</DialogTitle>
                <DialogDescription>
                  Complete information for {selectedTeacher.user.name}
                </DialogDescription>
              </DialogHeader>
              <TeacherDetails teacher={selectedTeacher} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CreateTeacherForm({ onSubmit, onCancel }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    qualification: "",
    specialization: "",
    experienceYears: "",
    bio: "",
    contractType: "FULL_TIME",
    maxStudents: "20",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="qualification">Qualification</Label>
          <Input
            id="qualification"
            value={formData.qualification}
            onChange={(e) =>
              setFormData({ ...formData, qualification: e.target.value })
            }
            placeholder="e.g., MA in Islamic Studies"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization</Label>
          <Input
            id="specialization"
            value={formData.specialization}
            onChange={(e) =>
              setFormData({ ...formData, specialization: e.target.value })
            }
            placeholder="e.g., Quran Memorization, Fiqh"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="experienceYears">Years of Experience</Label>
          <Input
            id="experienceYears"
            type="number"
            min="0"
            value={formData.experienceYears}
            onChange={(e) =>
              setFormData({ ...formData, experienceYears: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contractType">Contract Type</Label>
          <Select
            value={formData.contractType}
            onValueChange={(value) =>
              setFormData({ ...formData, contractType: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FULL_TIME">Full Time</SelectItem>
              <SelectItem value="PART_TIME">Part Time</SelectItem>
              <SelectItem value="CONTRACTUAL">Contractual</SelectItem>
              <SelectItem value="VOLUNTEER">Volunteer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxStudents">Max Students</Label>
          <Input
            id="maxStudents"
            type="number"
            min="1"
            value={formData.maxStudents}
            onChange={(e) =>
              setFormData({ ...formData, maxStudents: e.target.value })
            }
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio/Introduction</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Brief introduction about the teacher..."
          rows={3}
        />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Teacher"}
        </Button>
      </DialogFooter>
    </form>
  );
}

function TeacherDetails({ teacher }: { teacher: any }) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="font-semibold">Personal Information</h4>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Full Name:</span>
                  <span>{teacher.user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Teacher ID:</span>
                  <span>{teacher.teacherId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Qualification:</span>
                  <span>{teacher.qualification || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Specialization:</span>
                  <span>{teacher.specialization || "General"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience:</span>
                  <span>{teacher.experienceYears || 0} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Joining Date:</span>
                  <span>{formatDate(teacher.joiningDate)}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold">Contact Information</h4>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span>{teacher.user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span>{teacher.user.phone || "Not set"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contract Type:</span>
                  <span>{teacher.contractType.replace("_", " ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Students:</span>
                  <span>{teacher.maxStudents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Availability:</span>
                  <Badge
                    variant={teacher.isAvailable ? "default" : "destructive"}
                  >
                    {teacher.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          {teacher.bio && (
            <div>
              <h4 className="font-semibold">Bio</h4>
              <p className="mt-2 text-sm text-gray-600">{teacher.bio}</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="classes" className="space-y-4">
          <h4 className="font-semibold">Assigned Classes</h4>
          {teacher.classes.length > 0 ? (
            <div className="space-y-3">
              {teacher.classes.map((cls: any) => (
                <div key={cls.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{cls.name}</p>
                      <div className="mt-1 flex items-center space-x-2 text-sm text-gray-600">
                        <span>{cls.level}</span>
                        <span>•</span>
                        <span>{cls.enrollments?.length || 0} students</span>
                        <span>•</span>
                        <span>{cls.capacity} capacity</span>
                      </div>
                    </div>
                    <Badge variant={cls.isActive ? "default" : "outline"}>
                      {cls.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No classes assigned</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
