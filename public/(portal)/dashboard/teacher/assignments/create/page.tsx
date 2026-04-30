// src/app/(dashboard)/teacher/assignments/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Upload,
  Calendar,
  BookOpen,
  Users,
  FileText,
  X,
  Paperclip,
  AlertCircle,
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";

interface Class {
  id: string;
  name: string;
  code: string;
}

interface Subject {
  id: string;
  name: string;
  code: string;
}

export default function CreateAssignmentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  // Mock data - Replace with API fetch
  const [classes] = useState<Class[]>([
    { id: "1", name: "Quran Memorization - Level 1", code: "QUR-101" },
    { id: "2", name: "Tajweed Rules - Beginner", code: "TAJ-101" },
    { id: "3", name: "Fiqh of Worship", code: "FIQ-201" },
  ]);

  const [subjects] = useState<Subject[]>([
    { id: "1", name: "Quran Memorization", code: "QUR" },
    { id: "2", name: "Tajweed", code: "TAJ" },
    { id: "3", name: "Fiqh", code: "FIQ" },
    { id: "4", name: "Arabic Language", code: "ARA" },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subjectId: "",
    dueDate: "",
    totalMarks: "100",
    type: "HOMEWORK",
    instructions: "",
    rubric: "",
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleClassSelection = (classId: string) => {
    setSelectedClasses((prev) =>
      prev.includes(classId)
        ? prev.filter((id) => id !== classId)
        : [...prev, classId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.subjectId ||
      !formData.dueDate ||
      selectedClasses.length === 0
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("subjectId", formData.subjectId);
      formDataToSend.append("dueDate", formData.dueDate);
      formDataToSend.append("totalMarks", formData.totalMarks);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("instructions", formData.instructions);
      formDataToSend.append("rubric", formData.rubric);
      formDataToSend.append("classIds", JSON.stringify(selectedClasses));

      attachments.forEach((file, index) => {
        formDataToSend.append(`attachments[${index}]`, file);
      });

      // API call would go here
      // const response = await fetch('/api/teacher/assignments', {
      //   method: 'POST',
      //   body: formDataToSend,
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Assignment created successfully!");
      router.push("/teacher/assignments");
    } catch (error) {
      toast.error("Failed to create assignment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/teacher/assignments">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create Assignment
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create a new assignment for your students
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" asChild>
            <Link href="/teacher/assignments">Cancel</Link>
          </Button>
          <Button
            className="bg-gradient-primary gap-2"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Create Assignment
              </>
            )}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter assignment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Assignment Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Memorize Surah Al-Fatihah"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the assignment objectives and expectations..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      Subject <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.subjectId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, subjectId: value })
                      }
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
                    <Label htmlFor="type">Assignment Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HOMEWORK">Homework</SelectItem>
                        <SelectItem value="PROJECT">Project</SelectItem>
                        <SelectItem value="QUIZ">Quiz</SelectItem>
                        <SelectItem value="TEST">Test</SelectItem>
                        <SelectItem value="PRESENTATION">
                          Presentation
                        </SelectItem>
                        <SelectItem value="RECITATION">Recitation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">
                      Due Date <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="dueDate"
                        type="datetime-local"
                        className="pl-10"
                        value={formData.dueDate}
                        onChange={(e) =>
                          setFormData({ ...formData, dueDate: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalMarks">Total Marks</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="totalMarks"
                        type="number"
                        className="pl-10"
                        placeholder="100"
                        value={formData.totalMarks}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            totalMarks: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions & Rubric */}
            <Card>
              <CardHeader>
                <CardTitle>Instructions & Rubric</CardTitle>
                <CardDescription>
                  Provide detailed instructions and grading criteria
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Provide step-by-step instructions for students..."
                    rows={4}
                    value={formData.instructions}
                    onChange={(e) =>
                      setFormData({ ...formData, instructions: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rubric">Grading Rubric (Optional)</Label>
                  <Textarea
                    id="rubric"
                    placeholder="Define grading criteria and point distribution..."
                    rows={4}
                    value={formData.rubric}
                    onChange={(e) =>
                      setFormData({ ...formData, rubric: e.target.value })
                    }
                  />
                  <p className="text-sm text-gray-500">
                    You can use markdown or plain text to define your rubric
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
                <CardDescription>
                  Upload files for the assignment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 dark:border-gray-700">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <span className="rounded-md bg-gradient-primary px-4 py-2 text-white hover:opacity-90">
                          Choose Files
                        </span>
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </Label>
                      <p className="mt-2 text-sm text-gray-500">
                        Upload PDFs, images, audio files, or other resources
                      </p>
                    </div>
                  </div>
                </div>

                {attachments.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files</Label>
                    <div className="space-y-2">
                      {attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                        >
                          <div className="flex items-center space-x-3">
                            <Paperclip className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-gray-500">
                                {(file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeAttachment(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Class Selection & Preview */}
          <div className="space-y-6">
            {/* Class Selection */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Assign To Classes <span className="text-red-500">*</span>
                </CardTitle>
                <CardDescription>
                  Select which classes receive this assignment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {classes.map((cls) => (
                    <div
                      key={cls.id}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                        selectedClasses.includes(cls.id)
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                          : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => toggleClassSelection(cls.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`h-4 w-4 rounded border ${
                            selectedClasses.includes(cls.id)
                              ? "border-purple-500 bg-purple-500"
                              : "border-gray-300"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{cls.name}</p>
                          <p className="text-sm text-gray-500">{cls.code}</p>
                        </div>
                      </div>
                      {selectedClasses.includes(cls.id) && (
                        <Badge className="bg-gradient-primary text-white">
                          Selected
                        </Badge>
                      )}
                    </div>
                  ))}

                  {selectedClasses.length === 0 && (
                    <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          Please select at least one class
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Assignment Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Assignment Preview</CardTitle>
                <CardDescription>
                  How students will see this assignment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Title</p>
                    <p className="font-semibold">
                      {formData.title || "Untitled Assignment"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">
                      Due Date
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {formData.dueDate
                        ? new Date(formData.dueDate).toLocaleString()
                        : "Not set"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">
                      Assigned To
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedClasses.length > 0 ? (
                        selectedClasses.map((classId) => {
                          const cls = classes.find((c) => c.id === classId);
                          return cls ? (
                            <Badge key={cls.id} variant="outline">
                              {cls.code}
                            </Badge>
                          ) : null;
                        })
                      ) : (
                        <span className="text-gray-500">
                          No classes selected
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">
                      Requirements
                    </p>
                    <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                      <li>{formData.totalMarks || "100"} total marks</li>
                      <li>{attachments.length} attachment(s)</li>
                      <li>
                        {formData.instructions
                          ? "Detailed instructions provided"
                          : "No instructions"}
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Save className="mr-2 h-4 w-4" />
                  Save as Draft
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Publication
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Preview for Students
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Assignment Preview</DialogTitle>
                      <DialogDescription>
                        How this assignment will appear to students
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <h3 className="font-bold">
                          {formData.title || "Untitled Assignment"}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                          {formData.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <span>
                            Due:{" "}
                            {formData.dueDate
                              ? new Date(formData.dueDate).toLocaleDateString()
                              : "Not set"}
                          </span>
                          <span>{formData.totalMarks || "100"} marks</span>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
