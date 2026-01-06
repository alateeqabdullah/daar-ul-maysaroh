// src/components/admin/students-management-client.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  Download,
  User,
  UserPlus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Eye,
  CheckCircle,
  XCircle,
  Users,
  Award,
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

interface StudentsManagementClientProps {
  initialStudents: any[];
  total: number;
  page: number;
  classes: any[];
  filters: any;
}

export default function StudentsManagementClient({
  initialStudents,
  total,
  page,
  classes,
  filters,
}: StudentsManagementClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [students, setStudents] = useState(initialStudents);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [selectedClass, setSelectedClass] = useState(filters.class || "all");
  const [selectedStatus, setSelectedStatus] = useState(filters.status || "all");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (selectedClass !== "all") params.set("class", selectedClass);
      if (selectedStatus !== "all") params.set("status", selectedStatus);
      if (page > 1) params.set("page", page.toString());

      router.push(`/admin/students?${params.toString()}`);

      const response = await fetch(`/api/admin/students?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setStudents(data.students);
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
    router.push(`/admin/students?${params.toString()}`);
  };

  const handleCreateStudent = async (studentData: any) => {
    try {
      // Clean data before sending: if classId is "none", send null or empty string as per your API needs
      const payload = {
        ...studentData,
        classId: studentData.classId === "none" ? "" : studentData.classId,
      };

      const response = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create student");
      }

      toast.success("Student created successfully");
      refreshData();
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast.error("Failed to create student", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      const response = await fetch(`/api/admin/students/${studentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      toast.success("Student deleted successfully");
      setStudents(students.filter((s) => s.id !== studentId));
    } catch (error) {
      toast.error("Failed to delete student", {
        description: "Please try again.",
      });
    }
  };

  const handleUpdateStatus = async (studentId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/students/${studentId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      toast.success(
        `Student ${isActive ? "activated" : "deactivated"} successfully`
      );
      refreshData();
    } catch (error) {
      toast.error("Failed to update status", {
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
            Student Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and monitor all students in your madrasah
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
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Create a new student account
                </DialogDescription>
              </DialogHeader>
              <CreateStudentForm
                classes={classes}
                onSubmit={handleCreateStudent}
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
                  Total Students
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
                <p className="text-sm font-medium text-gray-600">
                  Active Students
                </p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {students.filter((s) => s.user.isActive).length}
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
                <p className="text-sm font-medium text-gray-600">
                  Inactive Students
                </p>
                <p className="mt-2 text-2xl font-bold text-red-600">
                  {students.filter((s) => !s.user.isActive).length}
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
                  Avg. Attendance
                </p>
                <p className="mt-2 text-2xl font-bold text-blue-600">92%</p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="grid gap-4 sm:grid-cols-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Name, email, or student ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="class">Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes
                    ?.filter((cls) => cls.id)
                    .map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
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

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
          <CardDescription>
            {total} students found • Page {page} of {totalPages}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : students.length === 0 ? (
            <div className="py-12 text-center">
              <User className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold">No students found</h3>
              <p className="mt-2 text-gray-500">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Add your first student"}
              </p>
              <Button
                className="mt-4"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Student
                      </th>
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Class
                      </th>
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Contact
                      </th>
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Status
                      </th>
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Enrollment
                      </th>
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-primary text-white">
                                {getInitials(student.user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{student.user.name}</p>
                              <p className="text-sm text-gray-500">
                                {student.studentId}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          {student.currentClass ? (
                            <div>
                              <p className="font-medium">
                                {student.currentClass.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {student.currentClass.teacher?.user?.name}
                              </p>
                            </div>
                          ) : (
                            <span className="text-gray-500">Not assigned</span>
                          )}
                        </td>
                        <td className="py-4">
                          <div className="space-y-1">
                            <p className="text-sm">{student.user.email}</p>
                            <p className="text-sm text-gray-500">
                              {student.user.phone}
                            </p>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                student.user.isActive
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {student.user.isActive ? "Active" : "Inactive"}
                            </Badge>
                            <Badge variant="outline">
                              {student.hifzLevel || "Beginner"}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-4">
                          <p className="text-sm">
                            {formatDate(student.enrollmentDate)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {student.enrollments.length} classes
                          </p>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedStudent(student);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleUpdateStatus(
                                  student.id,
                                  !student.user.isActive
                                )
                              }
                            >
                              {student.user.isActive ? (
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
                                  View Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() =>
                                    handleDeleteStudent(student.id)
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

      {/* Student View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          {selectedStudent && (
            <>
              <DialogHeader>
                <DialogTitle>Student Details</DialogTitle>
                <DialogDescription>
                  Complete information for {selectedStudent.user.name}
                </DialogDescription>
              </DialogHeader>
              <StudentDetails student={selectedStudent} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CreateStudentForm({ classes, onSubmit, onCancel }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "MALE",
    dateOfBirth: "",
    hifzLevel: "BEGINNER",
    memorizationGoal: "",
    classId: "none", // Set to "none" instead of empty string
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
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) =>
              setFormData({ ...formData, gender: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hifzLevel">Hifz Level</Label>
          <Select
            value={formData.hifzLevel}
            onValueChange={(value) =>
              setFormData({ ...formData, hifzLevel: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BEGINNER">Beginner</SelectItem>
              <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
              <SelectItem value="ADVANCED">Advanced</SelectItem>
              <SelectItem value="HAFIZ">Hafiz</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="class">Class</Label>
          <Select
            value={formData.classId}
            onValueChange={(value) =>
              setFormData({ ...formData, classId: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {/* Changed value="" to value="none" to prevent runtime crash */}
              <SelectItem value="none">No class</SelectItem>
              {classes
                ?.filter((cls: any) => cls.id)
                .map((cls: any) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="memorizationGoal">Memorization Goal</Label>
        <Textarea
          id="memorizationGoal"
          value={formData.memorizationGoal}
          onChange={(e) =>
            setFormData({ ...formData, memorizationGoal: e.target.value })
          }
          placeholder="e.g., Complete Quran in 3 years"
        />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Student"}
        </Button>
      </DialogFooter>
    </form>
  );
}

function StudentDetails({ student }: { student: any }) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="parent">Parent</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="font-semibold">Personal Information</h4>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Full Name:</span>
                  <span>{student.user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Student ID:</span>
                  <span>{student.studentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender:</span>
                  <span>{student.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date of Birth:</span>
                  <span>
                    {student.dateOfBirth
                      ? formatDate(student.dateOfBirth)
                      : "Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Enrollment Date:</span>
                  <span>{formatDate(student.enrollmentDate)}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold">Contact Information</h4>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span>{student.user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span>{student.user.phone || "Not set"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Address:</span>
                  <span>{student.address || "Not set"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Emergency Contact:</span>
                  <span>{student.emergencyContact || "Not set"}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Current Class</h4>
              {student.currentClass ? (
                <div className="mt-2 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{student.currentClass.name}</p>
                      <p className="text-sm text-gray-600">
                        Teacher: {student.currentClass.teacher?.user?.name}
                      </p>
                    </div>
                    <Badge>{student.currentClass.level}</Badge>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-gray-500">Not enrolled in any class</p>
              )}
            </div>
            <div>
              <h4 className="font-semibold">Quran Progress</h4>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-gray-600">Hifz Level</p>
                  <p className="font-medium">
                    {student.hifzLevel || "Beginner"}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-gray-600">Tajweed Level</p>
                  <p className="font-medium">
                    {student.tajweedLevel || "Beginner"}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-gray-600">Memorization Goal</p>
                  <p className="font-medium">
                    {student.memorizationGoal || "Not set"}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-gray-600">Qiraah Style</p>
                  <p className="font-medium">{student.qiraahStyle || "Hafs"}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="parent" className="space-y-4">
          {student.parent ? (
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {getInitials(student.parent.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.parent.user.name}</p>
                    <p className="text-sm text-gray-600">
                      {student.parent.user.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      {student.parent.user.phone}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-600">Occupation</p>
                    <p className="font-medium">
                      {student.parent.occupation || "Not set"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Employer</p>
                    <p className="font-medium">
                      {student.parent.employer || "Not set"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No parent information available</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
