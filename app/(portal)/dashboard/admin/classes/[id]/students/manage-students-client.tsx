// app/(portal)/dashboard/admin/classes/[id]/students/manage-students-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  UserPlus,
  Loader2,
  School,
  Users,
  Search,
  X,
  Mail,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  ClassWithRelations,
  enrollStudent,
  removeStudentFromClass,
} from "../../../actions/classes";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
}

interface ManageStudentsClientProps {
  classData: ClassWithRelations;
  availableStudents: Student[];
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function ManageStudentsClient({
  classData,
  availableStudents,
}: ManageStudentsClientProps) {
  const router = useRouter();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const filteredStudents = availableStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddStudent = async () => {
    if (!selectedStudent) {
      toast.error("Please select a student");
      return;
    }

    setIsSubmitting(true);
    try {
      await enrollStudent({
        studentId: selectedStudent.id,
        classId: classData.id,
      });

      toast.success(`${selectedStudent.name} enrolled successfully`);
      router.refresh();
      setOpenAddDialog(false);
      setSelectedStudent(null);
    } catch (error) {
      toast.error("Failed to enroll student");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveStudent = async (
    studentId: string,
    studentName: string,
  ) => {
    setRemovingId(studentId);
    try {
      await removeStudentFromClass(studentId, classData.id);
      toast.success(`${studentName} removed from class`);
      router.refresh();
    } catch (error) {
      toast.error("Failed to remove student");
    } finally {
      setRemovingId(null);
    }
  };

  const enrollmentPercentage =
    (classData.currentEnrollment / classData.capacity) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <School className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Class Management
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href={`/dashboard/admin/classes/${classData.id}`}>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tighter">
                  Manage Students
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {classData.name} ({classData.code})
                </p>
              </div>
            </div>
            <Button
              onClick={() => setOpenAddDialog(true)}
              disabled={classData.currentEnrollment >= classData.capacity}
              className="rounded-full bg-purple-600 hover:bg-purple-700"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Enrolled</p>
                  <p className="text-2xl font-black">
                    {classData.currentEnrollment}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-600 opacity-60" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="text-2xl font-black">{classData.capacity}</p>
                </div>
                <Users className="w-8 h-8 text-amber-600 opacity-60" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Available Seats
                  </p>
                  <p className="text-2xl font-black">
                    {classData.capacity - classData.currentEnrollment}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-black">
                    {Math.round(enrollmentPercentage)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrolled Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Students</CardTitle>
            <CardDescription>
              {classData.enrollments?.length || 0} students currently enrolled
            </CardDescription>
          </CardHeader>
          <CardContent>
            {classData.enrollments && classData.enrollments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Enrolled Date</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classData.enrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs bg-gradient-to-br from-purple-100 to-amber-100 text-purple-600">
                              {getInitials(enrollment.studentName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              {enrollment.studentName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {enrollment.studentEmail}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {enrollment.studentId}
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {enrollment.progress || 0}%
                          </span>
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-600 rounded-full"
                              style={{ width: `${enrollment.progress || 0}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {enrollment.status.toLowerCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleRemoveStudent(
                              enrollment.studentId,
                              enrollment.studentName,
                            )
                          }
                          disabled={removingId === enrollment.studentId}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          {removingId === enrollment.studentId ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No students enrolled yet</p>
                <Button
                  onClick={() => setOpenAddDialog(true)}
                  variant="link"
                  className="mt-2"
                >
                  Add Students
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Student to Class</DialogTitle>
            <DialogDescription>
              Select a student to enroll in {classData.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or student ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-lg"
              />
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2">
              {filteredStudents.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No students available
                </p>
              ) : (
                filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-all",
                      selectedStudent?.id === student.id
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                        : "border-border hover:border-purple-300",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          <span>{student.email}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="font-mono">
                        {student.studentId}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddStudent}
              disabled={!selectedStudent || isSubmitting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Enroll Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
