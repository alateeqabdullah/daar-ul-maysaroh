
// app/(portal)/dashboard/admin/classes/new/new-class-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  X,
  Plus,
  Trash2,
  Clock,
  Calendar,
  Users,
  BookOpen,
  School,
  Loader2,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  createClass,
  addClassSchedule,
  addSubjectToClass,
} from "../../actions/classes";
import { ScheduleType } from "@/app/generated/prisma/enums";

// Types
interface Teacher {
  id: string;
  name: string;
  email: string;
  specialization: string | null;
}

interface Schedule {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface NewClassClientProps {
  teachers: Teacher[];
  academicYears: string[];
  levels: string[];
}

const DAYS_OF_WEEK = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30",
];

export function NewClassClient({ teachers, academicYears, levels }: NewClassClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    level: "",
    section: "",
    capacity: 20,
    academicYear: academicYears[0] || "",
    term: "",
    teacherId: "",
    scheduleType: "REGULAR",
    isActive: true,
    startDate: "",
    endDate: "",
  });

  // Schedules state
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: crypto.randomUUID(), dayOfWeek: 1, startTime: "09:00", endTime: "10:00" },
  ]);

  // Subjects state
  const [subjects, setSubjects] = useState<Array<{ id: string; name: string; teacherId: string }>>([]);
  const [newSubject, setNewSubject] = useState({ name: "", teacherId: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  // Schedule management
  const addSchedule = () => {
    setSchedules((prev) => [
      ...prev,
      { id: crypto.randomUUID(), dayOfWeek: 1, startTime: "09:00", endTime: "10:00" },
    ]);
  };

  const removeSchedule = (id: string) => {
    if (schedules.length === 1) {
      toast.error("At least one schedule is required");
      return;
    }
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSchedule = (id: string, field: keyof Schedule, value: string | number) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  // Subject management
  const addSubject = () => {
    if (!newSubject.name.trim()) {
      toast.error("Please enter a subject name");
      return;
    }
    if (!newSubject.teacherId) {
      toast.error("Please select a teacher for the subject");
      return;
    }

    setSubjects((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...newSubject },
    ]);
    setNewSubject({ name: "", teacherId: "" });
  };

  const removeSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const generateClassCode = () => {
    const prefix = formData.level.substring(0, 3).toUpperCase();
    const year = formData.academicYear.split("-")[0].slice(-2);
    const random = Math.floor(Math.random() * 1000);
    const code = `${prefix}-${year}-${random}`;
    setFormData((prev) => ({ ...prev, code }));
    toast.success(`Class code generated: ${code}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Class name is required");
      setActiveTab("basic");
      return;
    }
    if (!formData.code.trim()) {
      toast.error("Class code is required");
      setActiveTab("basic");
      return;
    }
    if (!formData.level) {
      toast.error("Please select a level");
      setActiveTab("basic");
      return;
    }
    if (!formData.academicYear) {
      toast.error("Please select an academic year");
      setActiveTab("basic");
      return;
    }
    if (!formData.teacherId) {
      toast.error("Please select a teacher");
      setActiveTab("basic");
      return;
    }
    if (schedules.length === 0) {
      toast.error("At least one schedule is required");
      setActiveTab("schedule");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create the class
      const classData = {
        name: formData.name,
        code: formData.code,
        description: formData.description || undefined,
        level: formData.level,
        section: formData.section || undefined,
        capacity: formData.capacity,
        academicYear: formData.academicYear,
        term: formData.term || undefined,
        scheduleType: formData.scheduleType as ScheduleType,
        teacherId: formData.teacherId,
        createdById: formData.teacherId,
        startDate: formData.startDate ? new Date(formData.startDate) : undefined,
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      };

      const newClass = await createClass(classData);

      // 2. Add schedules
      for (const schedule of schedules) {
        await addClassSchedule({
          classId: newClass.id,
          dayOfWeek: schedule.dayOfWeek,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          timezone: "UTC",
          isLive: true,
          meetingPlatform: "ZOOM",
          isRecurring: true,
        });
      }

      // 3. Add subjects
      for (const subject of subjects) {
        const subjectCode = subject.name.substring(0, 3).toUpperCase() + "-" + Math.random().toString(36).substring(2, 5).toUpperCase();
        await addSubjectToClass({
          name: subject.name,
          code: subjectCode,
          category: "QURAN",
          teacherId: subject.teacherId,
          classId: newClass.id,
        });
      }

      toast.success("Class created successfully!");
      router.push("/dashboard/admin/classes");
      router.refresh();
    } catch (error) {
      console.error("Error creating class:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create class");
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
              Academic Management
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                Create New Class
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Set up a new class with schedules, teacher assignment, and subjects
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/admin/classes">
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
                Create Class
              </Button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3 rounded-full bg-slate-100 dark:bg-slate-800 p-1">
              <TabsTrigger value="basic" className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="schedule" className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Schedule
              </TabsTrigger>
              <TabsTrigger value="subjects" className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Subjects
              </TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the core details of the class</CardDescription>
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
                        placeholder="e.g., Quran Memorization - Level 1"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Class Code *</Label>
                      <div className="flex gap-2">
                        <Input
                          id="code"
                          name="code"
                          value={formData.code}
                          onChange={handleChange}
                          placeholder="e.g., QRN-101"
                          className="rounded-lg flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={generateClassCode}
                          className="rounded-lg shrink-0"
                        >
                          Generate
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the class objectives and curriculum..."
                      rows={3}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="level">Level *</Label>
                      <Select value={formData.level} onValueChange={(v) => handleSelectChange("level", v)}>
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
                        placeholder="e.g., A, B, Morning, Evening"
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
                        placeholder="e.g., Fall 2024, Spring 2025"
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
                              {teacher.name} {teacher.specialization ? `(${teacher.specialization})` : ""}
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
                      <Label htmlFor="isActive" className="font-black">Active Status</Label>
                      <p className="text-xs text-muted-foreground">Class will be visible and enrollable</p>
                    </div>
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={handleSwitchChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Class Schedule</CardTitle>
                  <CardDescription>Set up weekly class timings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className="flex flex-wrap items-end gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <div className="flex-1 min-w-[140px]">
                        <Label className="text-xs">Day</Label>
                        <Select
                          value={schedule.dayOfWeek.toString()}
                          onValueChange={(v) => updateSchedule(schedule.id, "dayOfWeek", parseInt(v))}
                        >
                          <SelectTrigger className="rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {DAYS_OF_WEEK.map((day) => (
                              <SelectItem key={day.value} value={day.value.toString()}>
                                {day.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-32">
                        <Label className="text-xs">Start Time</Label>
                        <Select
                          value={schedule.startTime}
                          onValueChange={(v) => updateSchedule(schedule.id, "startTime", v)}
                        >
                          <SelectTrigger className="rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_SLOTS.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-32">
                        <Label className="text-xs">End Time</Label>
                        <Select
                          value={schedule.endTime}
                          onValueChange={(v) => updateSchedule(schedule.id, "endTime", v)}
                        >
                          <SelectTrigger className="rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_SLOTS.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSchedule(schedule.id)}
                        className="shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSchedule}
                    className="w-full rounded-lg border-dashed"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Time Slot
                  </Button>

                  <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                          Schedule Note
                        </p>
                        <p className="text-xs text-amber-600 dark:text-amber-500">
                          All times are displayed in the timezone selected for the class.
                          Students will see these times converted to their local timezone.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subjects Tab */}
            <TabsContent value="subjects" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subjects & Curriculum</CardTitle>
                  <CardDescription>Add subjects taught in this class</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add Subject Form */}
                  <div className="flex flex-wrap gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="flex-1 min-w-[200px]">
                      <Input
                        placeholder="Subject name (e.g., Quran, Tajweed, Arabic)"
                        value={newSubject.name}
                        onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="w-48">
                      <Select
                        value={newSubject.teacherId}
                        onValueChange={(v) => setNewSubject({ ...newSubject, teacherId: v })}
                      >
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Assign teacher" />
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
                    <Button
                      type="button"
                      onClick={addSubject}
                      className="rounded-lg bg-purple-600 hover:bg-purple-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Subject
                    </Button>
                  </div>

                  {/* Subjects List */}
                  {subjects.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>No subjects added yet</p>
                      <p className="text-sm">Add subjects to build the curriculum</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {subjects.map((subject) => {
                        const teacher = teachers.find((t) => t.id === subject.teacherId);
                        return (
                          <div
                            key={subject.id}
                            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <BookOpen className="w-4 h-4 text-purple-500" />
                              <div>
                                <p className="font-medium">{subject.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  Teacher: {teacher?.name || "Unknown"}
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeSubject(subject.id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                          Curriculum Note
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-500">
                          Subjects can be managed and reordered later. Each subject
                          will have its own gradebook and assignments.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>

        {/* Creation Progress Summary */}
        <Card className="mt-6 border-dashed">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    formData.name ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
                  )}>
                    {formData.name ? <CheckCircle className="w-4 h-4" /> : "1"}
                  </div>
                  <span className="text-sm">Basic Info</span>
                </div>
                <div className="w-8 h-px bg-border" />
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    schedules.length > 0 ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
                  )}>
                    {schedules.length > 0 ? <CheckCircle className="w-4 h-4" /> : "2"}
                  </div>
                  <span className="text-sm">Schedule</span>
                </div>
                <div className="w-8 h-px bg-border" />
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    "bg-slate-100 text-slate-400"
                  )}>
                    3
                  </div>
                  <span className="text-sm">Subjects</span>
                </div>
              </div>
              <Badge variant="outline" className="text-purple-600 border-purple-200">
                {formData.isActive ? "Will be active immediately" : "Will be saved as draft"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}