// // app/(portal)/dashboard/admin/grades/[id]/edit/edit-grade-client.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  GraduationCap,
  BookOpen,
  User,
  Calendar,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { updateGrade } from "../../../actions/grades";
import { ExamType } from "@/app/generated/prisma/enums";

interface Subject {
  id: string;
  name: string;
  code: string;
  category: string;
  className: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  image: string | null;
}

interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  examType: ExamType;
  score: number;
  totalScore: number;
  percentage: number;
  grade: string | null;
  gradePoint: number | null;
  assessmentDate: Date;
  remarks: string | null;
  isPublished: boolean;
  student: {
    name: string;
    studentId: string;
  };
  subject: {
    name: string;
    code: string;
  };
}

interface EditGradeClientProps {
  grade: Grade;
  examTypes: string[];
  subjects: Subject[];
  students: Student[];
  userId: string;
  userName: string;
}

const getGradeLetter = (percentage: number): string => {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
};

const getGradeColor = (percentage: number): string => {
  if (percentage >= 90) return "text-emerald-600";
  if (percentage >= 80) return "text-blue-600";
  if (percentage >= 70) return "text-amber-600";
  if (percentage >= 60) return "text-orange-600";
  return "text-red-600";
};

const getGradePoint = (percentage: number): number => {
  if (percentage >= 90) return 4.0;
  if (percentage >= 80) return 3.0;
  if (percentage >= 70) return 2.0;
  if (percentage >= 60) return 1.0;
  return 0.0;
};

export function EditGradeClient({ grade, examTypes, subjects, students, userId, userName }: EditGradeClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessedById, setAssessedById] = useState<string>("");

  // Try to get user ID from various sources
  useEffect(() => {
    const getUserId = async () => {
      // First try the prop from server
      if (userId) {
        console.log("Using userId from prop:", userId);
        setAssessedById(userId);
        return;
      }
      
      // If not, try to get from session via API
      try {
        console.log("Fetching session to get user ID...");
        const response = await fetch("/api/auth/session");
        const session = await response.json();
        console.log("Session data:", session);
        
        const sessionUserId = session?.user?.id || session?.user?.sub || (session?.user as any)?.id;
        if (sessionUserId) {
          console.log("Found user ID from session:", sessionUserId);
          setAssessedById(sessionUserId);
          return;
        }
        
        // Last resort: try to get from a test endpoint
        const testResponse = await fetch("/api/auth/test-user");
        const testData = await testResponse.json();
        if (testData?.userId) {
          console.log("Found user ID from test endpoint:", testData.userId);
          setAssessedById(testData.userId);
          return;
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
      
      // If all fails, show error but don't set
      console.warn("No user ID found. Grade updates may fail.");
    };
    
    getUserId();
  }, [userId]);

  const [formData, setFormData] = useState({
    studentId: grade.studentId,
    subjectId: grade.subjectId,
    examType: grade.examType,
    score: grade.score,
    totalScore: grade.totalScore,
    assessmentDate: new Date(grade.assessmentDate).toISOString().slice(0, 10),
    remarks: grade.remarks || "",
  });

  const [calculatedGrade, setCalculatedGrade] = useState({
    percentage: grade.percentage,
    letter: grade.grade || "F",
    gradePoint: grade.gradePoint || 0,
  });

  // Calculate grade when score or totalScore changes
  useEffect(() => {
    const percentage = (formData.score / formData.totalScore) * 100;
    setCalculatedGrade({
      percentage: Math.round(percentage * 10) / 10,
      letter: getGradeLetter(percentage),
      gradePoint: getGradePoint(percentage),
    });
  }, [formData.score, formData.totalScore]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value) || 0;
    setFormData((prev) => ({ ...prev, [name]: numValue }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.studentId) {
      toast.error("Please select a student");
      return;
    }
    if (!formData.subjectId) {
      toast.error("Please select a subject");
      return;
    }
    if (!formData.examType) {
      toast.error("Please select an exam type");
      return;
    }
    if (formData.score < 0 || formData.score > formData.totalScore) {
      toast.error(`Score must be between 0 and ${formData.totalScore}`);
      return;
    }

    if (!assessedById) {
      toast.error("Unable to authenticate. Please refresh the page and try again.");
      console.error("No assessedById available when trying to submit");
      return;
    }

    console.log("Updating grade with assessedById:", assessedById);

    setIsSubmitting(true);

    try {
      await updateGrade(grade.id, {
        score: formData.score,
        totalScore: formData.totalScore,
        examType: formData.examType as ExamType,
        remarks: formData.remarks || undefined,
        assessmentDate: new Date(formData.assessmentDate),
      });

      toast.success("Grade updated successfully!");
      router.push(`/dashboard/admin/grades/${grade.id}`);
      router.refresh();
    } catch (error) {
      console.error("Error updating grade:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update grade");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedStudent = students.find(s => s.id === formData.studentId);
  const selectedSubject = subjects.find(s => s.id === formData.subjectId);
  const percentageColor = getGradeColor(calculatedGrade.percentage);
  const isChanged = 
    formData.score !== grade.score ||
    formData.totalScore !== grade.totalScore ||
    formData.examType !== grade.examType ||
    formData.assessmentDate !== new Date(grade.assessmentDate).toISOString().slice(0, 10) ||
    formData.remarks !== (grade.remarks || "");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Grade Management
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                Edit Grade
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Update grade details for {grade.student.name}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href={`/dashboard/admin/grades/${grade.id}`}>
                <Button variant="outline" className="rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </Link>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !isChanged || !assessedById}
                className="rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Grade Information</CardTitle>
                  <CardDescription>Update the grade details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Student Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student *</Label>
                    <Select value={formData.studentId} onValueChange={(v) => handleSelectChange("studentId", v)}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name} ({student.studentId})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="subjectId">Subject *</Label>
                    <Select value={formData.subjectId} onValueChange={(v) => handleSelectChange("subjectId", v)}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name} ({subject.code}) - {subject.className}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Exam Type */}
                  <div className="space-y-2">
                    <Label htmlFor="examType">Exam Type *</Label>
                    <Select value={formData.examType} onValueChange={(v) => handleSelectChange("examType", v)}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select exam type" />
                      </SelectTrigger>
                      <SelectContent>
                        {examTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Score Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="score">Score Obtained *</Label>
                      <Input
                        id="score"
                        name="score"
                        type="number"
                        step="0.01"
                        min={0}
                        max={formData.totalScore}
                        value={formData.score}
                        onChange={handleNumberChange}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalScore">Total Marks *</Label>
                      <Input
                        id="totalScore"
                        name="totalScore"
                        type="number"
                        step="0.01"
                        min={1}
                        value={formData.totalScore}
                        onChange={handleNumberChange}
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Assessment Date */}
                  <div className="space-y-2">
                    <Label htmlFor="assessmentDate">Assessment Date</Label>
                    <Input
                      id="assessmentDate"
                      name="assessmentDate"
                      type="date"
                      value={formData.assessmentDate}
                      onChange={handleChange}
                      className="rounded-lg"
                    />
                  </div>

                  {/* Remarks */}
                  <div className="space-y-2">
                    <Label htmlFor="remarks">Remarks (Optional)</Label>
                    <Textarea
                      id="remarks"
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleChange}
                      placeholder="Add any comments or feedback..."
                      rows={3}
                      className="rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Grade Preview Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-amber-50 dark:from-purple-950/20 dark:to-amber-950/20">
              <CardHeader>
                <CardTitle>Grade Preview</CardTitle>
                <CardDescription>Calculated grade based on scores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={cn("text-6xl font-black", percentageColor)}>
                    {calculatedGrade.percentage}%
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <Badge className="text-lg px-4 py-1 bg-gradient-to-r from-purple-600 to-amber-500 text-white">
                      Grade: {calculatedGrade.letter}
                    </Badge>
                    <Badge variant="outline" className="text-lg px-4 py-1">
                      GPA: {calculatedGrade.gradePoint.toFixed(1)}
                    </Badge>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Score:</span>
                    <span className="font-black">
                      {formData.score} / {formData.totalScore}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Original Values Card */}
            <Card>
              <CardHeader>
                <CardTitle>Original Values</CardTitle>
                <CardDescription>Current grade information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Score</span>
                  <span className="font-black">{grade.score} / {grade.totalScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Percentage</span>
                  <span className="font-black">{Math.round(grade.percentage)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Letter Grade</span>
                  <Badge variant="outline">{grade.grade}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Exam Type</span>
                  <span>{grade.examType}</span>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-amber-200 bg-amber-50/30 dark:bg-amber-950/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-black text-amber-700 dark:text-amber-400">Note</p>
                    <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">
                      Changing the grade will affect the student's overall average and GPA.
                      Please verify changes before saving.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Changes Summary */}
            {isChanged && (
              <Card className="border-green-200 bg-green-50/30 dark:bg-green-950/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-black text-green-700 dark:text-green-400">Unsaved Changes</p>
                      <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                        You have made changes to this grade. Click "Save Changes" to update the record.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}