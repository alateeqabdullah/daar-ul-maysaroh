// app/(portal)/dashboard/admin/subjects/[id]/edit/edit-subject-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  BookOpen,
  CheckCircle,
  AlertCircle,
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
import { cn } from "@/lib/utils";
import { updateSubject } from "../../../actions/subjects";
import { SubjectCategory } from "@/app/generated/prisma/enums";
import { Badge } from "@/components/ui/badge";

interface Teacher {
  id: string;
  name: string;
  specialization: string | null;
}

interface Class {
  id: string;
  name: string;
  code: string;
  level: string;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  description: string | null;
  category: SubjectCategory;
  teacherId: string;
  classId: string;
  creditHours: number;
  orderIndex: number;
  teacher: {
    id: string;
    user: { name: string };
  };
  class: {
    id: string;
    name: string;
    code: string;
  };
}

interface EditSubjectClientProps {
  subject: Subject;
  categories: string[];
  teachers: Teacher[];
  classes: Class[];
}

const CATEGORY_COLORS: Record<SubjectCategory, string> = {
  QURAN:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  TAJWEED: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  ARABIC:
    "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  FIQH: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  AQEEDAH: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
  SEERAH:
    "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
  HADITH:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400",
  AKHLAQ: "bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400",
  HISTORY: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400",
  OTHER: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

export function EditSubjectClient({
  subject,
  categories,
  teachers,
  classes,
}: EditSubjectClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: subject.name,
    description: subject.description || "",
    category: subject.category,
    teacherId: subject.teacherId,
    classId: subject.classId,
    creditHours: subject.creditHours,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Subject name is required");
      return;
    }
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }
    if (!formData.teacherId) {
      toast.error("Please select a teacher");
      return;
    }
    if (!formData.classId) {
      toast.error("Please select a class");
      return;
    }

    setIsSubmitting(true);

    try {
      await updateSubject(subject.id, {
        name: formData.name,
        description: formData.description || undefined,
        category: formData.category as SubjectCategory,
        teacherId: formData.teacherId,
        creditHours: formData.creditHours,
      });

      toast.success("Subject updated successfully!");
      router.push(`/dashboard/admin/subjects/${subject.id}`);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update subject",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryColor =
    CATEGORY_COLORS[subject.category as SubjectCategory] ||
    CATEGORY_COLORS.OTHER;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Curriculum Management
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                Edit Subject
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Update subject details and configuration
              </p>
            </div>
            <div className="flex gap-3">
              <Link href={`/dashboard/admin/subjects/${subject.id}`}>
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
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Subject Information</CardTitle>
                  <CardDescription>Edit the subject details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Subject Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Subject Code</Label>
                      <Input
                        value={subject.code}
                        disabled
                        className="rounded-lg bg-muted/50"
                      />
                      <p className="text-xs text-muted-foreground">
                        Subject code cannot be changed
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the subject content and objectives..."
                      rows={4}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(v) => handleSelectChange("category", v)}
                      >
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creditHours">Credit Hours</Label>
                      <Input
                        id="creditHours"
                        name="creditHours"
                        type="number"
                        min={1}
                        max={6}
                        value={formData.creditHours}
                        onChange={handleNumberChange}
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacherId">Teacher *</Label>
                      <Select
                        value={formData.teacherId}
                        onValueChange={(v) =>
                          handleSelectChange("teacherId", v)
                        }
                      >
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Select teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          {teachers.map((teacher) => (
                            <SelectItem key={teacher.id} value={teacher.id}>
                              {teacher.name}{" "}
                              {teacher.specialization
                                ? `(${teacher.specialization})`
                                : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="classId">Class *</Label>
                      <Select
                        value={formData.classId}
                        onValueChange={(v) => handleSelectChange("classId", v)}
                      >
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem key={cls.id} value={cls.id}>
                              {cls.name} ({cls.code}) - {cls.level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Sidebar - Info Card */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-black text-muted-foreground">
                    Current Category
                  </p>
                  <Badge className={cn("mt-1", categoryColor)}>
                    {subject.category}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-black text-muted-foreground">
                    Current Teacher
                  </p>
                  <p className="text-base font-medium mt-1">
                    {subject.teacher.user.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-black text-muted-foreground">
                    Current Class
                  </p>
                  <p className="text-base font-medium mt-1">
                    {subject.class.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {subject.class.code}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-black text-muted-foreground">
                    Credit Hours
                  </p>
                  <p className="text-base font-medium mt-1">
                    {subject.creditHours}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-black text-amber-700 dark:text-amber-400">
                      Note
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">
                      Changing the class or teacher will affect all enrolled
                      students. Please notify affected parties of any changes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Summary of changes */}
        <Card className="mt-6 border-dashed">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      formData.name !== subject.name ||
                        formData.description !== subject.description ||
                        formData.category !== subject.category ||
                        formData.teacherId !== subject.teacherId ||
                        formData.classId !== subject.classId ||
                        formData.creditHours !== subject.creditHours
                        ? "bg-amber-100 text-amber-600"
                        : "bg-slate-100 text-slate-400",
                    )}
                  >
                    {formData.name !== subject.name ||
                    formData.description !== subject.description ||
                    formData.category !== subject.category ||
                    formData.teacherId !== subject.teacherId ||
                    formData.classId !== subject.classId ||
                    formData.creditHours !== subject.creditHours ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      "1"
                    )}
                  </div>
                  <span className="text-sm">Changes</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      formData.name !== subject.name ||
                        formData.description !== subject.description
                        ? "bg-green-100 text-green-600"
                        : "bg-slate-100 text-slate-400",
                    )}
                  >
                    {formData.name !== subject.name ||
                    formData.description !== subject.description ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      "2"
                    )}
                  </div>
                  <span className="text-sm">Details</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      formData.category !== subject.category
                        ? "bg-green-100 text-green-600"
                        : "bg-slate-100 text-slate-400",
                    )}
                  >
                    {formData.category !== subject.category ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      "3"
                    )}
                  </div>
                  <span className="text-sm">Category</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      formData.teacherId !== subject.teacherId ||
                        formData.classId !== subject.classId
                        ? "bg-green-100 text-green-600"
                        : "bg-slate-100 text-slate-400",
                    )}
                  >
                    {formData.teacherId !== subject.teacherId ||
                    formData.classId !== subject.classId ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      "4"
                    )}
                  </div>
                  <span className="text-sm">Assignment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      formData.creditHours !== subject.creditHours
                        ? "bg-green-100 text-green-600"
                        : "bg-slate-100 text-slate-400",
                    )}
                  >
                    {formData.creditHours !== subject.creditHours ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      "5"
                    )}
                  </div>
                  <span className="text-sm">Credits</span>
                </div>
              </div>
              {(formData.name !== subject.name ||
                formData.description !== subject.description ||
                formData.category !== subject.category ||
                formData.teacherId !== subject.teacherId ||
                formData.classId !== subject.classId ||
                formData.creditHours !== subject.creditHours) && (
                <Badge
                  variant="outline"
                  className="text-amber-600 border-amber-200"
                >
                  Unsaved changes
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
