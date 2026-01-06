// src/app/(dashboard)/student/assignments/page.tsx
"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  FileText,
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Eye,
  Edit,
  MoreVertical,
  BookOpen,
  Award,
  FileUp,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Link from "next/link";
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
  
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data
const pendingAssignments = [
  {
    id: 1,
    title: "Memorize Surah An-Naziat (1-20)",
    subject: "Quran Memorization",
    dueDate: "2024-01-20",
    dueTime: "23:59",
    points: 20,
    status: "pending",
    description:
      "Memorize the first 20 ayahs of Surah An-Naziat with proper tajweed.",
    instructions:
      "Record your recitation and upload the audio file. Make sure to apply the tajweed rules we learned.",
    attachments: ["surah_an_naziat_audio.mp3", "tajweed_guide.pdf"],
    submitted: false,
  },
  {
    id: 2,
    title: "Tajweed Practice Sheet",
    subject: "Tajweed Rules",
    dueDate: "2024-01-22",
    dueTime: "14:00",
    points: 15,
    status: "pending",
    description: "Complete the tajweed practice sheet for makharij letters.",
    instructions: "Follow the examples and practice each letter 10 times.",
    attachments: ["tajweed_sheet.pdf"],
    submitted: false,
  },
  {
    id: 3,
    title: "Fiqh of Wudu Project",
    subject: "Fiqh",
    dueDate: "2024-01-25",
    dueTime: "23:59",
    points: 30,
    status: "pending",
    description:
      "Create a presentation on the fiqh of wudu according to Hanafi madhhab.",
    instructions:
      "Include the fard, sunnah, and mustahabbat of wudu with evidences from Quran and Hadith.",
    attachments: ["wudu_guidelines.pdf", "examples.pptx"],
    submitted: false,
  },
];

const submittedAssignments = [
  {
    id: 4,
    title: "Surah An-Naba Recitation",
    subject: "Quran Memorization",
    submittedDate: "2024-01-15",
    status: "graded",
    points: 18,
    totalPoints: 20,
    grade: "A-",
    feedback: "Excellent recitation! Work on the makharij of ر and ل.",
    teacher: "Sheikh Ahmed",
  },
  {
    id: 5,
    title: "Arabic Vocabulary Quiz",
    subject: "Arabic Language",
    submittedDate: "2024-01-12",
    status: "graded",
    points: 14,
    totalPoints: 15,
    grade: "A",
    feedback: "Great job! You've mastered the vocabulary.",
    teacher: "Ustadha Fatima",
  },
];

const overdueAssignments = [
  {
    id: 6,
    title: "Islamic History Essay",
    subject: "Islamic Studies",
    dueDate: "2024-01-10",
    status: "overdue",
    points: 25,
    latePenalty: 5,
    description: "Write an essay on the Battle of Badr.",
  },
];

export default function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [submissionText, setSubmissionText] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setAttachments([...attachments, ...newFiles]);
      toast.success(`${newFiles.length} file(s) added`);
    }
  };

  const handleSubmitAssignment = (assignmentId: number) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedAssignment(null);
      setSubmissionText("");
      setAttachments([]);

      toast.success("Assignment submitted successfully!", {
        description: "Your teacher will review it soon.",
      });
    }, 2000);
  };

  const handleViewAssignment = (assignment: any) => {
    setSelectedAssignment(assignment);
  };

  const filteredAssignments = pendingAssignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject =
      selectedSubject === "all" || assignment.subject === selectedSubject;
    const matchesStatus =
      selectedStatus === "all" || assignment.status === selectedStatus;

    return matchesSearch && matchesSubject && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "submitted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "graded":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays > 1) return `In ${diffDays} days`;
    if (diffDays === -1) return "Yesterday";
    return `${Math.abs(diffDays)} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Assignments
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your assignments and submit your work
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="mt-2 text-2xl font-bold text-yellow-600">
                  {pendingAssignments.length}
                </p>
              </div>
              <div className="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900/30">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Submitted</p>
                <p className="mt-2 text-2xl font-bold text-blue-600">
                  {submittedAssignments.length}
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Graded</p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {
                    submittedAssignments.filter((a) => a.status === "graded")
                      .length
                  }
                </p>
              </div>
              <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="mt-2 text-2xl font-bold text-red-600">
                  {overdueAssignments.length}
                </p>
              </div>
              <div className="rounded-lg bg-red-100 p-3 dark:bg-red-900/30">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 sm:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search assignments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Subject</label>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Quran Memorization">
                    Quran Memorization
                  </SelectItem>
                  <SelectItem value="Tajweed Rules">Tajweed Rules</SelectItem>
                  <SelectItem value="Fiqh">Fiqh</SelectItem>
                  <SelectItem value="Arabic Language">
                    Arabic Language
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="graded">Graded</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Sort By</label>
              <Select defaultValue="dueDate">
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="points">Points</SelectItem>
                  <SelectItem value="subject">Subject</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingAssignments.length})
          </TabsTrigger>
          <TabsTrigger value="submitted">
            Submitted ({submittedAssignments.length})
          </TabsTrigger>
          <TabsTrigger value="overdue">
            Overdue ({overdueAssignments.length})
          </TabsTrigger>
          <TabsTrigger value="all">All Assignments</TabsTrigger>
        </TabsList>

        {/* Pending Assignments Tab */}
        <TabsContent value="pending" className="space-y-6">
          {filteredAssignments.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-semibold">
                  No pending assignments
                </h3>
                <p className="mt-2 text-gray-500">
                 {` Great job! You've completed all your assignments.`}
                </p>
                <Button className="mt-4 bg-gradient-primary">
                  View Completed
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredAssignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">
                                {assignment.title}
                              </h3>
                              <Badge
                                className={getStatusColor(assignment.status)}
                              >
                                {assignment.status.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                              <Badge variant="outline">
                                {assignment.subject}
                              </Badge>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Due: {assignment.dueDate} at{" "}
                                {assignment.dueTime}
                              </span>
                              <span className="flex items-center gap-1">
                                <Award className="h-3 w-3" />
                                {assignment.points} points
                              </span>
                              <span className="flex items-center gap-1 text-yellow-600">
                                <Clock className="h-3 w-3" />
                                {getDaysUntilDue(assignment.dueDate)}
                              </span>
                            </div>
                            <p className="mt-3 text-sm text-gray-600">
                              {assignment.description}
                            </p>
                          </div>
                        </div>

                        {assignment.attachments &&
                          assignment.attachments.length > 0 && (
                            <div className="mt-4">
                              <p className="mb-2 text-sm font-medium">
                                Attachments:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {assignment.attachments.map((file, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="gap-1"
                                  >
                                    <FileText className="h-3 w-3" />
                                    {file}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          className="bg-gradient-primary"
                          onClick={() => handleViewAssignment(assignment)}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Submit Assignment
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={`/student/assignments/${assignment.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Submitted Assignments Tab */}
        <TabsContent value="submitted">
          <Card>
            <CardHeader>
              <CardTitle>Submitted Assignments</CardTitle>
              <CardDescription>Assignments you have submitted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submittedAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{assignment.title}</h3>
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status.toUpperCase()}
                          </Badge>
                          {assignment.grade && (
                            <Badge className="bg-gradient-primary">
                              {assignment.grade}
                            </Badge>
                          )}
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <Badge variant="outline">{assignment.subject}</Badge>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Submitted: {assignment.submittedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            Score: {assignment.points}/{assignment.totalPoints}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            Teacher: {assignment.teacher}
                          </span>
                        </div>
                        {assignment.feedback && (
                          <div className="mt-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                              Teacher Feedback:
                            </p>
                            <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                              {assignment.feedback}
                            </p>
                          </div>
                        )}
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Overdue Assignments Tab */}
        <TabsContent value="overdue">
          <Card>
            <CardHeader>
              <CardTitle>Overdue Assignments</CardTitle>
              <CardDescription>Assignments past their due date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overdueAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/20"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{assignment.title}</h3>
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                            OVERDUE
                          </Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-red-700 dark:text-red-400">
                          <Badge variant="outline">{assignment.subject}</Badge>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due: {assignment.dueDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Late penalty: -{assignment.latePenalty} points
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-red-600 dark:text-red-400">
                          {assignment.description}
                        </p>
                        <div className="mt-4 rounded-lg bg-white p-3 dark:bg-gray-800">
                          <p className="text-sm font-medium">Note:</p>
                          <p className="mt-1 text-sm text-gray-600">
                            Please submit as soon as possible to minimize point
                            deduction. Contact your teacher if you need an
                            extension.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button className="bg-gradient-primary">
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Now
                      </Button>
                      <Button variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Request Extension
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Submission Dialog */}
      <Dialog
        open={!!selectedAssignment}
        onOpenChange={() => setSelectedAssignment(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Assignment</DialogTitle>
            <DialogDescription>
              Submit your work for: {selectedAssignment?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h4 className="mb-2 font-medium">Assignment Details</h4>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subject:</span>
                    <span className="font-medium">
                      {selectedAssignment?.subject}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Due Date:</span>
                    <span className="font-medium">
                      {selectedAssignment?.dueDate} at{" "}
                      {selectedAssignment?.dueTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Points:</span>
                    <span className="font-medium">
                      {selectedAssignment?.points}
                    </span>
                  </div>
                </div>
                {selectedAssignment?.instructions && (
                  <div className="mt-3">
                    <p className="text-sm font-medium">Instructions:</p>
                    <p className="mt-1 text-sm text-gray-600">
                      {selectedAssignment?.instructions}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="submission-text">Submission Text</Label>
                <Textarea
                  id="submission-text"
                  placeholder="Type your submission here..."
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  className="mt-2 min-h-[120px]"
                />
              </div>

              <div>
                <Label>Upload Files</Label>
                <div className="mt-2">
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 dark:border-gray-700">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <Label
                          htmlFor="file-upload"
                          className="cursor-pointer rounded-md bg-gradient-primary px-4 py-2 text-white hover:opacity-90"
                        >
                          <FileUp className="mr-2 inline h-4 w-4" />
                          Choose Files
                        </Label>
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                        <p className="mt-2 text-sm text-gray-600">
                          PDF, DOC, MP3, MP4 up to 50MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {attachments.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm font-medium">Selected Files:</p>
                    <div className="space-y-2">
                      {attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setAttachments(
                                attachments.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedAssignment?.attachments && (
                <div>
                  <p className="mb-2 text-sm font-medium">Assignment Files:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAssignment.attachments.map(
                      (file: string, index: number) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="gap-1"
                        >
                          <Download className="h-3 w-3" />
                          {file}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedAssignment(null)}
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-primary"
              onClick={() => handleSubmitAssignment(selectedAssignment.id)}
              disabled={
                isSubmitting || (!submissionText && attachments.length === 0)
              }
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Assignment
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
