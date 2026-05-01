// app/(portal)/dashboard/admin/assignments/[id]/edit/edit-assignment-client.tsx
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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { updateAssignment } from "../../../actions/assignments";
import { AssignmentType } from "@/app/generated/prisma/enums";

interface Subject {
  id: string;
  name: string;
  code: string;
}

interface Assignment {
  createdAt: string | number | Date;
  updatedAt: string | number | Date;
  id: string;
  title: string;
  description: string | null;
  subjectId: string;
  dueDate: Date;
  totalMarks: number;
  weightage: number;
  type: AssignmentType;
  attachments: string[];
  instructions: string | null;
  rubric: string | null;
}

interface EditAssignmentClientProps {
  assignment: Assignment;
  types: string[];
  subjects: Subject[];
}

const TYPE_COLORS: Record<AssignmentType, string> = {
  HOMEWORK: "bg-purple-100 text-purple-700",
  PROJECT: "bg-blue-100 text-blue-700",
  QUIZ: "bg-amber-100 text-amber-700",
  TEST: "bg-red-100 text-red-700",
  PRESENTATION: "bg-emerald-100 text-emerald-700",
  RECITATION: "bg-cyan-100 text-cyan-700",
  OTHER: "bg-gray-100 text-gray-700",
};

export function EditAssignmentClient({
  assignment,
  types,
  subjects,
}: EditAssignmentClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<string[]>(
    assignment.attachments,
  );
  const [newAttachment, setNewAttachment] = useState("");

  const [formData, setFormData] = useState({
    title: assignment.title,
    description: assignment.description || "",
    subjectId: assignment.subjectId,
    dueDate: new Date(assignment.dueDate).toISOString().slice(0, 16),
    totalMarks: assignment.totalMarks,
    weightage: assignment.weightage,
    type: assignment.type,
    instructions: assignment.instructions || "",
    rubric: assignment.rubric || "",
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

    setIsSubmitting(true);

    try {
      await updateAssignment(assignment.id, {
        title: formData.title,
        description: formData.description || undefined,
        dueDate: new Date(formData.dueDate),
        totalMarks: formData.totalMarks,
        weightage: formData.weightage,
        type: formData.type as AssignmentType,
        attachments: attachments,
        instructions: formData.instructions || undefined,
        rubric: formData.rubric || undefined,
      });

      toast.success("Assignment updated successfully!");
      router.push(`/dashboard/admin/assignments/${assignment.id}`);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update assignment",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const typeColor =
    TYPE_COLORS[assignment.type as AssignmentType] || TYPE_COLORS.OTHER;

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
                Edit Assignment
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Update assignment details
              </p>
            </div>
            <div className="flex gap-3">
              <Link href={`/dashboard/admin/assignments/${assignment.id}`}>
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
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Details</CardTitle>
                <CardDescription>
                  Update the assignment information
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
                    rows={3}
                    className="rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subjectId">Subject *</Label>
                    <Select
                      value={formData.subjectId}
                      onValueChange={(v) => handleSelectChange("subjectId", v)}
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue />
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

            <Card className="border-amber-200 bg-amber-50/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Badge className={typeColor}>
                    Current Type: {assignment.type}
                  </Badge>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>
                    Created:{" "}
                    {new Date(assignment.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    Last Updated:{" "}
                    {new Date(assignment.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
