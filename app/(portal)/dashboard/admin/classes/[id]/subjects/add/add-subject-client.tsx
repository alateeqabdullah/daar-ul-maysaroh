// app/(portal)/dashboard/admin/classes/[id]/subjects/add/add-subject-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, School, BookOpen } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { addSubjectToClass } from "../../../../actions/classes";

interface Teacher {
  id: string;
  name: string;
}

interface AddSubjectClientProps {
  classData: { id: string; name: string; code: string };
  teachers: Teacher[];
}

export function AddSubjectClient({
  classData,
  teachers,
}: AddSubjectClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    teacherId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Subject name is required");
      return;
    }
    if (!formData.teacherId) {
      toast.error("Please select a teacher");
      return;
    }

    setIsSubmitting(true);

    try {
      const subjectCode =
        formData.name.substring(0, 3).toUpperCase() +
        "-" +
        Math.random().toString(36).substring(2, 5).toUpperCase();

      await addSubjectToClass({
        name: formData.name,
        code: subjectCode,
        category: "QURAN",
        teacherId: formData.teacherId,
        classId: classData.id,
      });

      toast.success("Subject added successfully");
      router.push(`/dashboard/admin/classes/${classData.id}`);
      router.refresh();
    } catch (error) {
      toast.error("Failed to add subject");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <School className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Class Management
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/dashboard/admin/classes/${classData.id}`}>
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tighter">
                Add Subject
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {classData.name} ({classData.code})
              </p>
            </div>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Subject Information</CardTitle>
            <CardDescription>Add a new subject to this class</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Subject Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Quran Recitation, Tajweed, Arabic Language"
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacherId">Teacher *</Label>
                <Select
                  value={formData.teacherId}
                  onValueChange={(v) =>
                    setFormData({ ...formData, teacherId: v })
                  }
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <Link href={`/dashboard/admin/classes/${classData.id}`}>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isSubmitting && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  <Save className="w-4 h-4 mr-2" />
                  Add Subject
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
