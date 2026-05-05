// app/(portal)/dashboard/admin/groups/new/new-group-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  Users,
  Plus,
  Trash2,
  Calendar,
  Clock,
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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { createGroup } from "../../actions/groups";
import { GroupType, MeetingPlatform } from "@/app/generated/prisma/enums";

interface Teacher {
  id: string;
  name: string;
  email: string;
}

interface Class {
  id: string;
  name: string;
  code: string;
  level: string;
}

interface NewGroupClientProps {
  types: string[];
  teachers: Teacher[];
  classes: Class[];
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
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

interface Schedule {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isOnline: boolean;
  meetingPlatform: string;
  meetingUrl: string;
  physicalLocation: string;
}

export function NewGroupClient({
  types,
  teachers,
  classes,
}: NewGroupClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    academicYear:
      new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
    term: "",
    capacity: 20,
    teacherId: "",
    assistantTeacherId: "",
    classId: "",
    scheduleType: "REGULAR",
    isActive: true,
    startDate: "",
    endDate: "",
  });

  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: crypto.randomUUID(),
      dayOfWeek: 1,
      startTime: "09:00",
      endTime: "10:00",
      isOnline: true,
      meetingPlatform: "ZOOM",
      meetingUrl: "",
      physicalLocation: "",
    },
  ]);

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

  const addSchedule = () => {
    setSchedules((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        dayOfWeek: 1,
        startTime: "09:00",
        endTime: "10:00",
        isOnline: true,
        meetingPlatform: "ZOOM",
        meetingUrl: "",
        physicalLocation: "",
      },
    ]);
  };

  const removeSchedule = (id: string) => {
    if (schedules.length === 1) {
      toast.error("At least one schedule is required");
      return;
    }
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSchedule = (
    id: string,
    field: keyof Schedule,
    value: string | number | boolean,
  ) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Group name is required");
      setActiveTab("basic");
      return;
    }
    if (!formData.type) {
      toast.error("Please select a group type");
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
      await createGroup({
        name: formData.name,
        description: formData.description || undefined,
        type: formData.type as GroupType,
        academicYear: formData.academicYear,
        term: formData.term || undefined,
        capacity: formData.capacity,
        teacherId: formData.teacherId || undefined,
        assistantTeacherId: formData.assistantTeacherId || undefined,
        classId: formData.classId || undefined,
        scheduleType: formData.scheduleType as any,
        startDate: formData.startDate
          ? new Date(formData.startDate)
          : undefined,
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
        schedules: schedules.map((s) => ({
          dayOfWeek: s.dayOfWeek,
          startTime: s.startTime,
          endTime: s.endTime,
          isOnline: s.isOnline,
          meetingPlatform: s.meetingPlatform as MeetingPlatform,
          meetingUrl: s.meetingUrl || undefined,
          physicalLocation: s.physicalLocation || undefined,
        })),
      });

      toast.success("Group created successfully!");
      router.push("/dashboard/admin/groups");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create group",
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
            <Users className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Group Management
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                Create Group
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Create a new student group
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/admin/groups">
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
                Create Group
              </Button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full max-w-md grid-cols-3 rounded-full bg-slate-100 dark:bg-slate-800 p-1">
              <TabsTrigger
                value="basic"
                className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Basic Info
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Schedule
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Group Information</CardTitle>
                  <CardDescription>
                    Enter the basic details of the group
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Group Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Quran Memorization Circle - Level 1"
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
                      placeholder="Describe the group's purpose and objectives..."
                      rows={3}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Group Type *</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(v) => handleSelectChange("type", v)}
                      >
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {types.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        name="capacity"
                        type="number"
                        min={1}
                        max={100}
                        value={formData.capacity}
                        onChange={handleNumberChange}
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="academicYear">Academic Year</Label>
                      <Input
                        id="academicYear"
                        name="academicYear"
                        value={formData.academicYear}
                        onChange={handleChange}
                        placeholder="2024-2025"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="term">Term</Label>
                      <Input
                        id="term"
                        name="term"
                        value={formData.term}
                        onChange={handleChange}
                        placeholder="Fall 2024, Spring 2025"
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacherId">Supervising Teacher</Label>
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
                          {teachers.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assistantTeacherId">
                        Assistant Teacher
                      </Label>
                      <Select
                        value={formData.assistantTeacherId}
                        onValueChange={(v) =>
                          handleSelectChange("assistantTeacherId", v)
                        }
                      >
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Select assistant" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {teachers.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="classId">Associated Class</Label>
                    <Select
                      value={formData.classId}
                      onValueChange={(v) => handleSelectChange("classId", v)}
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {classes.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name} ({c.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Group Schedule</CardTitle>
                  <CardDescription>
                    Set up meeting times for the group
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {schedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-black text-sm">Meeting Schedule</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSchedule(schedule.id)}
                          className="text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label className="text-xs">Day</Label>
                          <Select
                            value={schedule.dayOfWeek.toString()}
                            onValueChange={(v) =>
                              updateSchedule(
                                schedule.id,
                                "dayOfWeek",
                                parseInt(v),
                              )
                            }
                          >
                            <SelectTrigger className="rounded-lg">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {DAYS_OF_WEEK.map((day) => (
                                <SelectItem
                                  key={day.value}
                                  value={day.value.toString()}
                                >
                                  {day.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Start Time</Label>
                          <Select
                            value={schedule.startTime}
                            onValueChange={(v) =>
                              updateSchedule(schedule.id, "startTime", v)
                            }
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
                        <div>
                          <Label className="text-xs">End Time</Label>
                          <Select
                            value={schedule.endTime}
                            onValueChange={(v) =>
                              updateSchedule(schedule.id, "endTime", v)
                            }
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
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={schedule.isOnline}
                            onCheckedChange={(checked) =>
                              updateSchedule(schedule.id, "isOnline", checked)
                            }
                          />
                          <Label className="text-xs">Online Meeting</Label>
                        </div>
                        {schedule.isOnline ? (
                          <div className="flex-1">
                            <Label className="text-xs">Meeting URL</Label>
                            <Input
                              value={schedule.meetingUrl}
                              onChange={(e) =>
                                updateSchedule(
                                  schedule.id,
                                  "meetingUrl",
                                  e.target.value,
                                )
                              }
                              placeholder="https://zoom.us/..."
                              className="rounded-lg text-sm"
                            />
                          </div>
                        ) : (
                          <div className="flex-1">
                            <Label className="text-xs">Physical Location</Label>
                            <Input
                              value={schedule.physicalLocation}
                              onChange={(e) =>
                                updateSchedule(
                                  schedule.id,
                                  "physicalLocation",
                                  e.target.value,
                                )
                              }
                              placeholder="Room number, building, etc."
                              className="rounded-lg text-sm"
                            />
                          </div>
                        )}
                      </div>
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
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Group Settings</CardTitle>
                  <CardDescription>
                    Configure additional settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                        Group will be visible and enrollable
                      </p>
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
          </Tabs>
        </form>
      </div>
    </div>
  );
}
