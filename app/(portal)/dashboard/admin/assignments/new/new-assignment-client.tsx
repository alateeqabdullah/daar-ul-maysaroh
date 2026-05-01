// app/(portal)/dashboard/admin/assignments/new/new-assignment-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  ClipboardList,
  Plus,
  Trash2,
  Upload,
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
import { toast } from "sonner";
import { createAssignment } from "../../actions/assignments";
import { AssignmentType } from "@/app/generated/prisma/enums";

interface Subject {
  id: string;
  name: string;
  code: string;
}

interface NewAssignmentClientProps {
  types: string[];
  subjects: Subject[];
  userId: string;
}

export function NewAssignmentClient({
  types,
  subjects,
  userId,
}: NewAssignmentClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [newAttachment, setNewAttachment] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subjectId: "",
    dueDate: "",
    totalMarks: 100,
    weightage: 100,
    type: "HOMEWORK",
    instructions: "",
    rubric: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addAttachment = () => {
    if (newAttachment.trim()) {
      setAttachments((prev) => [...prev, newAttachment.trim()]);
      setNewAttachment("");
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Assignment title is required");
      return;
    }
    if (!formData.subjectId) {
      toast.error("Please select a subject");
      return;
    }
    if (!formData.dueDate) {
      toast.error("Please select a due date");
      return;
    }
    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

    setIsSubmitting(true);

    try {
      await createAssignment({
        title: formData.title,
        description: formData.description || undefined,
        subjectId: formData.subjectId,
        dueDate: new Date(formData.dueDate),
        totalMarks: formData.totalMarks,
        weightage: formData.weightage,
        type: formData.type as AssignmentType,
        attachments: attachments,
        instructions: formData.instructions || undefined,
        rubric: formData.rubric || undefined,
        createdById: userId,
      });

      toast.success("Assignment created successfully!");
      router.push("/dashboard/admin/assignments");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create assignment",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <ClipboardList className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Assignment Management
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                Create Assignment
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Create a new assignment for students
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/admin/assignments">
                <Button variant="outline" className="rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </Link>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Create Assignment
              </Button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Details</CardTitle>
                  <CardDescription>
                    Enter the assignment information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Quran Memorization Quiz 1"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the assignment requirements..."
                      rows={3}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subjectId">Subject *</Label>
                      <Select
                        value={formData.subjectId}
                        onValueChange={(v) =>
                          handleSelectChange("subjectId", v)
                        }
                      >
                        <SelectTrigger className="rounded-lg">
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
                        onValueChange={(v) => handleSelectChange("type", v)}
                      >
                        <SelectTrigger className="rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {types.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date *</Label>
                      <Input
                        id="dueDate"
                        name="dueDate"
                        type="datetime-local"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalMarks">Total Marks</Label>
                      <Input
                        id="totalMarks"
                        name="totalMarks"
                        type="number"
                        min={1}
                        value={formData.totalMarks}
                        onChange={handleNumberChange}
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea
                      id="instructions"
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleChange}
                      placeholder="Provide detailed instructions for students..."
                      rows={4}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rubric">Rubric / Grading Criteria</Label>
                    <Textarea
                      id="rubric"
                      name="rubric"
                      value={formData.rubric}
                      onChange={handleChange}
                      placeholder="Define grading criteria..."
                      rows={3}
                      className="rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attachments</CardTitle>
                  <CardDescription>Add reference materials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter file URL"
                      value={newAttachment}
                      onChange={(e) => setNewAttachment(e.target.value)}
                      className="rounded-lg flex-1"
                    />
                    <Button
                      type="button"
                      onClick={addAttachment}
                      size="sm"
                      className="rounded-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      {attachments.map((url, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                        >
                          <span className="text-sm truncate flex-1">{url}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAttachment(index)}
                            className="text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Upload className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-black text-amber-700 dark:text-amber-400">
                        Grading Note
                      </p>
                      <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">
                        Total marks and weightage affect student grades. Ensure
                        values are accurate.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
