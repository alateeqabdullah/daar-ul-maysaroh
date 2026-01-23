// src/app/(dashboard)/teacher/grades/add/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Upload,
  Download,
  Users,
  BookOpen,
  FileText,
  Plus,
  Minus,
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";

interface Student {
  id: string;
  name: string;
  studentId: string;
}

interface Class {
  id: string;
  name: string;
  code: string;
  students: Student[];
}

interface Subject {
  id: string;
  name: string;
  code: string;
}

export default function AddGradesPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [examType, setExamType] = useState("MIDTERM");

  // Mock data - Replace with API fetch
  const [classes, setClasses] = useState<Class[]>([
    {
      id: "1",
      name: "Quran Memorization - Level 1",
      code: "QUR-101",
      students: [
        { id: "1", name: "Ahmed Khan", studentId: "STD-001" },
        { id: "2", name: "Fatima Ali", studentId: "STD-002" },
        { id: "3", name: "Omar Hassan", studentId: "STD-003" },
      ],
    },
  ]);

  const [subjects] = useState<Subject[]>([
    { id: "1", name: "Quran Memorization", code: "QUR" },
    { id: "2", name: "Tajweed", code: "TAJ" },
    { id: "3", name: "Fiqh", code: "FIQ" },
  ]);

  const [grades, setGrades] = useState<
    Record<
      string,
      {
        score: string;
        totalScore: string;
        remarks: string;
      }
    >
  >({});

  const selectedClassObj = classes.find((c) => c.id === selectedClass);

  useEffect(() => {
    if (selectedClassObj) {
      // Initialize grades for all students in the class
      const initialGrades: Record<string, any> = {};
      selectedClassObj.students.forEach((student) => {
        initialGrades[student.id] = {
          score: "",
          totalScore: "100",
          remarks: "",
        };
      });
      setGrades(initialGrades);
    }
  }, [selectedClassObj]);

  const handleGradeChange = (
    studentId: string,
    field: string,
    value: string
  ) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const calculatePercentage = (score: string, totalScore: string) => {
    const scoreNum = parseFloat(score);
    const totalNum = parseFloat(totalScore);

    if (isNaN(scoreNum) || isNaN(totalNum) || totalNum === 0) return 0;
    return Math.round((scoreNum / totalNum) * 100);
  };

  const getGradeLetter = (percentage: number) => {
    if (percentage >= 97) return "A+";
    if (percentage >= 93) return "A";
    if (percentage >= 90) return "A-";
    if (percentage >= 87) return "B+";
    if (percentage >= 83) return "B";
    if (percentage >= 80) return "B-";
    if (percentage >= 77) return "C+";
    if (percentage >= 73) return "C";
    if (percentage >= 70) return "C-";
    if (percentage >= 67) return "D+";
    if (percentage >= 63) return "D";
    if (percentage >= 60) return "D-";
    return "F";
  };

  const getGradePoint = (percentage: number) => {
    if (percentage >= 97) return 4.0;
    if (percentage >= 93) return 4.0;
    if (percentage >= 90) return 3.7;
    if (percentage >= 87) return 3.3;
    if (percentage >= 83) return 3.0;
    if (percentage >= 80) return 2.7;
    if (percentage >= 77) return 2.3;
    if (percentage >= 73) return 2.0;
    if (percentage >= 70) return 1.7;
    if (percentage >= 67) return 1.3;
    if (percentage >= 63) return 1.0;
    if (percentage >= 60) return 0.7;
    return 0.0;
  };

  const validateGrades = () => {
    if (!selectedClass || !selectedSubject || !examType) {
      toast.error("Please select class, subject, and exam type");
      return false;
    }

    for (const studentId in grades) {
      const grade = grades[studentId];
      if (
        grade.score &&
        (!grade.totalScore || parseFloat(grade.totalScore) === 0)
      ) {
        toast.error(`Invalid total score for student ${studentId}`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateGrades()) return;

    setIsSubmitting(true);

    try {
      const gradesToSubmit = Object.entries(grades)
        .filter(([_, grade]) => grade.score.trim() !== "")
        .map(([studentId, grade]) => {
          const percentage = calculatePercentage(grade.score, grade.totalScore);
          return {
            studentId,
            score: parseFloat(grade.score),
            totalScore: parseFloat(grade.totalScore),
            percentage,
            grade: getGradeLetter(percentage),
            gradePoint: getGradePoint(percentage),
            remarks: grade.remarks,
            examType,
            subjectId: selectedSubject,
          };
        });

      // API call would go here
      // const response = await fetch('/api/teacher/grades', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     classId: selectedClass,
      //     subjectId: selectedSubject,
      //     examType,
      //     grades: gradesToSubmit
      //   })
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(`${gradesToSubmit.length} grades added successfully!`);
      router.push("/teacher/grades");
    } catch (error) {
      toast.error("Failed to add grades");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImportCSV = () => {
    // CSV import functionality would go here
    toast.info("CSV import feature coming soon");
  };

  const handleExportTemplate = () => {
    // Export CSV template functionality
    toast.info("Downloading template...");
  };

  const handleBulkUpdate = (field: string, value: string) => {
    if (!selectedClassObj) return;

    const updatedGrades = { ...grades };
    selectedClassObj.students.forEach((student) => {
      if (updatedGrades[student.id]) {
        updatedGrades[student.id] = {
          ...updatedGrades[student.id],
          [field]: value,
        };
      }
    });
    setGrades(updatedGrades);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/teacher/grades">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Add Grades
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Enter grades for students in bulk
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleExportTemplate}
          >
            <Download className="h-4 w-4" />
            Template
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleImportCSV}>
            <Upload className="h-4 w-4" />
            Import CSV
          </Button>
          <Button
            className="bg-gradient-primary gap-2"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Grades
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Selection Panel */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>
                Class <span className="text-red-500">*</span>
              </Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name} ({cls.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Subject <span className="text-red-500">*</span>
              </Label>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name} ({subject.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Exam Type <span className="text-red-500">*</span>
              </Label>
              <Select value={examType} onValueChange={setExamType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MIDTERM">Midterm Exam</SelectItem>
                  <SelectItem value="FINAL">Final Exam</SelectItem>
                  <SelectItem value="QUIZ">Quiz</SelectItem>
                  <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
                  <SelectItem value="RECITATION_TEST">
                    Recitation Test
                  </SelectItem>
                  <SelectItem value="MEMORIZATION_TEST">
                    Memorization Test
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedClassObj && (
        <>
          {/* Bulk Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Bulk Actions</CardTitle>
              <CardDescription>
                Quickly update multiple students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center space-x-2">
                  <Label>Total Score:</Label>
                  <Input
                    type="number"
                    placeholder="100"
                    className="w-24"
                    defaultValue="100"
                    onChange={(e) =>
                      handleBulkUpdate("totalScore", e.target.value)
                    }
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkUpdate("totalScore", "100")}
                  >
                    Apply to All
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Label>Set Score:</Label>
                  <Input
                    type="number"
                    placeholder="Score"
                    className="w-24"
                    onChange={(e) => handleBulkUpdate("score", e.target.value)}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const score = (
                        document.querySelector(
                          'input[placeholder="Score"]'
                        ) as HTMLInputElement
                      )?.value;
                      if (score) handleBulkUpdate("score", score);
                    }}
                  >
                    Apply to Empty
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const updatedGrades = { ...grades };
                    selectedClassObj.students.forEach((student) => {
                      if (updatedGrades[student.id]) {
                        updatedGrades[student.id].score = "";
                        updatedGrades[student.id].remarks = "";
                      }
                    });
                    setGrades(updatedGrades);
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear All Scores
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Grades Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    Enter Grades for {selectedClassObj.name}
                  </CardTitle>
                  <CardDescription>
                    {selectedClassObj.students.length} students
                  </CardDescription>
                </div>
                <Badge variant="outline">
                  {
                    Object.values(grades).filter((g) => g.score.trim() !== "")
                      .length
                  }{" "}
                  grades entered
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800">
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Student
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Student ID
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Score
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Total
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Percentage
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Grade
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Remarks
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {selectedClassObj.students.map((student) => {
                      const grade = grades[student.id] || {
                        score: "",
                        totalScore: "100",
                        remarks: "",
                      };
                      const percentage = calculatePercentage(
                        grade.score,
                        grade.totalScore
                      );
                      const gradeLetter = getGradeLetter(percentage);
                      const gradePoint = getGradePoint(percentage);
                      const hasScore = grade.score.trim() !== "";

                      return (
                        <tr
                          key={student.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="whitespace-nowrap px-4 py-3">
                            <div className="flex items-center space-x-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-xs font-bold text-white">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </div>
                              <span className="font-medium">
                                {student.name}
                              </span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">
                            <Badge variant="outline">{student.studentId}</Badge>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">
                            <Input
                              type="number"
                              className="w-24"
                              placeholder="0-100"
                              value={grade.score}
                              onChange={(e) =>
                                handleGradeChange(
                                  student.id,
                                  "score",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">
                            <Input
                              type="number"
                              className="w-20"
                              value={grade.totalScore}
                              onChange={(e) =>
                                handleGradeChange(
                                  student.id,
                                  "totalScore",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">
                            <div className="flex items-center space-x-2">
                              <span
                                className={`font-bold ${
                                  percentage >= 80
                                    ? "text-green-600"
                                    : percentage >= 60
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                }`}
                              >
                                {hasScore ? `${percentage}%` : "-"}
                              </span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">
                            <Badge
                              className={`
                              ${
                                gradeLetter === "A+" ||
                                gradeLetter === "A" ||
                                gradeLetter === "A-"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                  : gradeLetter === "B+" ||
                                    gradeLetter === "B" ||
                                    gradeLetter === "B-"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                  : gradeLetter === "C+" ||
                                    gradeLetter === "C" ||
                                    gradeLetter === "C-"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                  : gradeLetter === "D+" ||
                                    gradeLetter === "D" ||
                                    gradeLetter === "D-"
                                  ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                              }
                            `}
                            >
                              {hasScore
                                ? `${gradeLetter} (${gradePoint})`
                                : "-"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Input
                              placeholder="Add remarks..."
                              value={grade.remarks}
                              onChange={(e) =>
                                handleGradeChange(
                                  student.id,
                                  "remarks",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">
                            {hasScore ? (
                              <div className="flex items-center text-green-600">
                                <Check className="mr-1 h-4 w-4" />
                                <span className="text-sm">Entered</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-gray-400">
                                <Minus className="mr-1 h-4 w-4" />
                                <span className="text-sm">Pending</span>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Grade Summary</CardTitle>
              <CardDescription>Statistics for entered grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    Average Score
                  </p>
                  <p className="mt-2 text-2xl font-bold text-blue-600">
                    {(() => {
                      const scores = Object.values(grades)
                        .filter((g) => g.score.trim() !== "")
                        .map((g) => calculatePercentage(g.score, g.totalScore));

                      if (scores.length === 0) return "0%";
                      const avg =
                        scores.reduce((a, b) => a + b, 0) / scores.length;
                      return `${Math.round(avg)}%`;
                    })()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    Highest Score
                  </p>
                  <p className="mt-2 text-2xl font-bold text-green-600">
                    {(() => {
                      const scores = Object.values(grades)
                        .filter((g) => g.score.trim() !== "")
                        .map((g) => calculatePercentage(g.score, g.totalScore));

                      if (scores.length === 0) return "0%";
                      return `${Math.max(...scores)}%`;
                    })()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    Lowest Score
                  </p>
                  <p className="mt-2 text-2xl font-bold text-red-600">
                    {(() => {
                      const scores = Object.values(grades)
                        .filter((g) => g.score.trim() !== "")
                        .map((g) => calculatePercentage(g.score, g.totalScore));

                      if (scores.length === 0) return "0%";
                      return `${Math.min(...scores)}%`;
                    })()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    Students Graded
                  </p>
                  <p className="mt-2 text-2xl font-bold text-purple-600">
                    {
                      Object.values(grades).filter((g) => g.score.trim() !== "")
                        .length
                    }
                    /{selectedClassObj.students.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
