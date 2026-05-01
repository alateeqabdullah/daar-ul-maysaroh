// app/(portal)/dashboard/admin/classes/[id]/edit/edit-class-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, School, Loader2, AlertCircle } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ClassWithRelations, updateClass } from "../../../actions/classes";
import { ScheduleType } from "@/app/generated/prisma/enums";

interface Teacher {
  id: string;
  name: string;
  email: string;
  specialization: string | null;
}

interface EditClassClientProps {
  classData: ClassWithRelations;
  teachers: Teacher[];
  academicYears: string[];
  levels: string[];
}

export function EditClassClient({
  classData,
  teachers,
  academicYears,
  levels,
}: EditClassClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: classData.name,
    description: classData.description || "",
    level: classData.level,
    section: classData.section || "",
    capacity: classData.capacity,
    academicYear: classData.academicYear,
    term: classData.term || "",
    teacherId: classData.teacher.id,
    scheduleType: classData.scheduleType,
    isActive: classData.isActive,
    startDate: classData.startDate
      ? new Date(classData.startDate).toISOString().split("T")[0]
      : "",
    endDate: classData.endDate
      ? new Date(classData.endDate).toISOString().split("T")[0]
      : "",
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

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Class name is required");
      return;
    }
    if (!formData.level) {
      toast.error("Please select a level");
      return;
    }
    if (!formData.academicYear) {
      toast.error("Please select an academic year");
      return;
    }
    if (!formData.teacherId) {
      toast.error("Please select a teacher");
      return;
    }

    setIsSubmitting(true);

    try {
      await updateClass(classData.id, {
        name: formData.name,
        description: formData.description || undefined,
        level: formData.level,
        section: formData.section || undefined,
        capacity: formData.capacity,
        academicYear: formData.academicYear,
        term: formData.term || undefined,
        teacherId: formData.teacherId,
        scheduleType: formData.scheduleType as ScheduleType,
        isActive: formData.isActive,
        startDate: formData.startDate
          ? new Date(formData.startDate)
          : undefined,
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      });

      toast.success("Class updated successfully!");
      router.push(`/dashboard/admin/classes/${classData.id}`);
      router.refresh();
    } catch (error) {
      console.error("Error updating class:", error);
      toast.error("Failed to update class");
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
                  Edit Class
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {classData.name} ({classData.code})
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href={`/dashboard/admin/classes/${classData.id}`}>
                <Button variant="outline" className="rounded-full">
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

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Edit the core details of the class
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Class Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Class Code</Label>
                  <Input
                    id="code"
                    value={classData.code}
                    disabled
                    className="rounded-lg bg-slate-50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Class code cannot be changed
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
                  rows={3}
                  className="rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Level *</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(v) => handleSelectChange("level", v)}
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Input
                    id="section"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    placeholder="e.g., A, B"
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity *</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleNumberChange}
                    min={1}
                    max={100}
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic Year *</Label>
                  <Select
                    value={formData.academicYear}
                    onValueChange={(v) => handleSelectChange("academicYear", v)}
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {academicYears.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="term">Term</Label>
                  <Input
                    id="term"
                    name="term"
                    value={formData.term}
                    onChange={handleChange}
                    placeholder="e.g., Fall 2024"
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="teacherId">Teacher *</Label>
                  <Select
                    value={formData.teacherId}
                    onValueChange={(v) => handleSelectChange("teacherId", v)}
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
                  <Label htmlFor="scheduleType">Schedule Type</Label>
                  <Select
                    value={formData.scheduleType}
                    onValueChange={(v) => handleSelectChange("scheduleType", v)}
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="REGULAR">Regular</SelectItem>
                      <SelectItem value="FLEXIBLE">Flexible</SelectItem>
                      <SelectItem value="SELF_PACED">Self-Paced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div>
                  <Label htmlFor="isActive" className="font-black">
                    Active Status
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Class will be visible and enrollable
                  </p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={handleSwitchChange}
                />
              </div>

              {classData.currentEnrollment > 0 &&
                formData.capacity < classData.currentEnrollment && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      Warning: New capacity ({formData.capacity}) is less than
                      current enrollment ({classData.currentEnrollment}). Some
                      students may need to be reassigned.
                    </p>
                  </div>
                )}
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
