// app/(portal)/dashboard/admin/groups/[id]/edit/edit-group-client.tsx
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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { updateGroup, addGroupSchedule, deleteGroupSchedule } from "../../../actions/groups";
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

interface GroupWithRelations {
  id: string;
  name: string;
  description: string | null;
  type: GroupType;
  academicYear: string;
  term: string | null;
  capacity: number;
  currentCount: number;
  teacherId: string | null;
  assistantTeacherId: string | null;
  classId: string | null;
  scheduleType: string;
  isActive: boolean;
  startDate: Date | null;
  endDate: Date | null;
  schedules: Array<{
    id: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isOnline: boolean;
    meetingPlatform: string;
    meetingUrl: string | null;
    physicalLocation: string | null;
  }>;
}

interface EditGroupClientProps {
  group: GroupWithRelations;
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
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30",
];

export function EditGroupClient({ group, types, teachers, classes }: EditGroupClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);

  const [formData, setFormData] = useState({
    name: group.name,
    description: group.description || "",
    type: group.type,
    academicYear: group.academicYear,
    term: group.term || "",
    capacity: group.capacity,
    teacherId: group.teacherId || "",
    assistantTeacherId: group.assistantTeacherId || "",
    classId: group.classId || "",
    scheduleType: group.scheduleType,
    isActive: group.isActive,
    startDate: group.startDate ? new Date(group.startDate).toISOString().split("T")[0] : "",
    endDate: group.endDate ? new Date(group.endDate).toISOString().split("T")[0] : "",
  });

  const [newSchedule, setNewSchedule] = useState({
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "10:00",
    isOnline: true,
    meetingPlatform: "ZOOM",
    meetingUrl: "",
    physicalLocation: "",
  });

  const [showNewSchedule, setShowNewSchedule] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (!confirm("Are you sure you want to delete this schedule?")) return;
    
    setIsSubmitting(true);
    try {
      await deleteGroupSchedule(scheduleId);
      toast.success("Schedule deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete schedule");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSchedule = async () => {
    setIsAddingSchedule(true);
    try {
      await addGroupSchedule({
        groupId: group.id,
        dayOfWeek: newSchedule.dayOfWeek,
        startTime: newSchedule.startTime,
        endTime: newSchedule.endTime,
        isOnline: newSchedule.isOnline,
        meetingPlatform: newSchedule.meetingPlatform as MeetingPlatform,
        meetingUrl: newSchedule.meetingUrl || undefined,
        physicalLocation: newSchedule.physicalLocation || undefined,
      });
      toast.success("Schedule added successfully");
      setShowNewSchedule(false);
      setNewSchedule({
        dayOfWeek: 1,
        startTime: "09:00",
        endTime: "10:00",
        isOnline: true,
        meetingPlatform: "ZOOM",
        meetingUrl: "",
        physicalLocation: "",
      });
      router.refresh();
    } catch (error) {
      toast.error("Failed to add schedule");
    } finally {
      setIsAddingSchedule(false);
    }
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

    setIsSubmitting(true);

    try {
      await updateGroup(group.id, {
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
        isActive: formData.isActive,
        startDate: formData.startDate ? new Date(formData.startDate) : undefined,
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      });

      toast.success("Group updated successfully!");
      router.push(`/dashboard/admin/groups/${group.id}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update group");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDayName = (day: number) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day];
  };

  const typeColor = {
    ACADEMIC: "bg-purple-100 text-purple-700",
    HIFZ: "bg-emerald-100 text-emerald-700",
    REVISION: "bg-blue-100 text-blue-700",
    SUPPORT: "bg-amber-100 text-amber-700",
    PROJECT: "bg-cyan-100 text-cyan-700",
    COMPETITION: "bg-rose-100 text-rose-700",
    SOCIAL: "bg-indigo-100 text-indigo-700",
    OTHER: "bg-gray-100 text-gray-700",
  }[formData.type as GroupType] || "bg-gray-100 text-gray-700";

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
                Edit Group
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Update group details and settings
              </p>
            </div>
            <div className="flex gap-3">
              <Link href={`/dashboard/admin/groups/${group.id}`}>
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

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Group Information</CardTitle>
                  <CardDescription>Update the basic details of the group</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Group Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
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
                      <Label htmlFor="type">Group Type *</Label>
                      <Select value={formData.type} onValueChange={(v) => handleSelectChange("type", v)}>
                        <SelectTrigger className="rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {types.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Badge className={cn("mt-1", typeColor)}>Current: {formData.type}</Badge>
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
                      <p className="text-xs text-muted-foreground">Current members: {group.currentCount}</p>
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
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacherId">Supervising Teacher</Label>
                      <Select value={formData.teacherId} onValueChange={(v) => handleSelectChange("teacherId", v)}>
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Select teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {teachers.map((t) => (
                            <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assistantTeacherId">Assistant Teacher</Label>
                      <Select value={formData.assistantTeacherId} onValueChange={(v) => handleSelectChange("assistantTeacherId", v)}>
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Select assistant" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {teachers.map((t) => (
                            <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="classId">Associated Class</Label>
                    <Select value={formData.classId} onValueChange={(v) => handleSelectChange("classId", v)}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {classes.map((c) => (
                          <SelectItem key={c.id} value={c.id}>{c.name} ({c.code})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule Management */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Schedules</CardTitle>
                    <CardDescription>Manage meeting times for this group</CardDescription>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setShowNewSchedule(!showNewSchedule)}
                    className="rounded-full"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Schedule
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {group.schedules.length === 0 && !showNewSchedule ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No schedules yet</p>
                      <p className="text-xs">Click "Add Schedule" to create one</p>
                    </div>
                  ) : (
                    <>
                      {group.schedules.map((schedule) => (
                        <div key={schedule.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-purple-600" />
                                <span className="font-black">
                                  {getDayName(schedule.dayOfWeek)} • {schedule.startTime} - {schedule.endTime}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                {schedule.isOnline ? (
                                  <>
                                    <span>💻 Online Meeting</span>
                                    {schedule.meetingUrl && (
                                      <a href={schedule.meetingUrl} target="_blank" className="text-purple-600 hover:underline ml-2">
                                        Join Link
                                      </a>
                                    )}
                                  </>
                                ) : (
                                  <span>📍 {schedule.physicalLocation || "Location TBD"}</span>
                                )}
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSchedule(schedule.id)}
                              className="text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      {showNewSchedule && (
                        <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200">
                          <h4 className="font-black text-sm mb-3">New Schedule</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                            <div>
                              <Label className="text-xs">Day</Label>
                              <Select
                                value={newSchedule.dayOfWeek.toString()}
                                onValueChange={(v) => setNewSchedule({ ...newSchedule, dayOfWeek: parseInt(v) })}
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
                            <div>
                              <Label className="text-xs">Start Time</Label>
                              <Select
                                value={newSchedule.startTime}
                                onValueChange={(v) => setNewSchedule({ ...newSchedule, startTime: v })}
                              >
                                <SelectTrigger className="rounded-lg">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                {TIME_SLOTS.map((time) => (
                                    <SelectItem key={time} value={time}>{time}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs">End Time</Label>
                              <Select
                                value={newSchedule.endTime}
                                onValueChange={(v) => setNewSchedule({ ...newSchedule, endTime: v })}
                              >
                                <SelectTrigger className="rounded-lg">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {TIME_SLOTS.map((time) => (
                                    <SelectItem key={time} value={time}>{time}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={newSchedule.isOnline}
                                onCheckedChange={(checked) => setNewSchedule({ ...newSchedule, isOnline: checked })}
                              />
                              <Label className="text-xs">Online Meeting</Label>
                            </div>
                          </div>

                          {newSchedule.isOnline ? (
                            <div className="mb-3">
                              <Label className="text-xs">Meeting URL</Label>
                              <Input
                                value={newSchedule.meetingUrl}
                                onChange={(e) => setNewSchedule({ ...newSchedule, meetingUrl: e.target.value })}
                                placeholder="https://zoom.us/..."
                                className="rounded-lg text-sm"
                              />
                            </div>
                          ) : (
                            <div className="mb-3">
                              <Label className="text-xs">Physical Location</Label>
                              <Input
                                value={newSchedule.physicalLocation}
                                onChange={(e) => setNewSchedule({ ...newSchedule, physicalLocation: e.target.value })}
                                placeholder="Room number, building, etc."
                                className="rounded-lg text-sm"
                              />
                            </div>
                          )}

                          <div className="flex gap-2 justify-end pt-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setShowNewSchedule(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              onClick={handleAddSchedule}
                              disabled={isAddingSchedule}
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              {isAddingSchedule && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                              Add Schedule
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div>
                      <Label htmlFor="isActive" className="font-black">Active Status</Label>
                      <p className="text-xs text-muted-foreground">Group will be visible and enrollable</p>
                    </div>
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={handleSwitchChange}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Date Range</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
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
                </CardContent>
              </Card>

              <Card className="border-amber-200 bg-amber-50/30">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-black text-amber-700">Schedule Note</p>
                      <p className="text-xs text-amber-600 mt-1">
                        Changes to schedules will notify all group members. Please ensure meeting times are correct.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Change Summary */}
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <p className="text-sm font-black">Changes Summary</p>
                    <div className="space-y-2">
                      {formData.name !== group.name && (
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline" className="bg-amber-50">Name changed</Badge>
                        </div>
                      )}
                      {formData.type !== group.type && (
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline" className="bg-amber-50">Type changed</Badge>
                        </div>
                      )}
                      {formData.capacity !== group.capacity && (
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline" className="bg-amber-50">Capacity changed</Badge>
                        </div>
                      )}
                      {formData.teacherId !== group.teacherId && (
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline" className="bg-amber-50">Teacher changed</Badge>
                        </div>
                      )}
                      {formData.isActive !== group.isActive && (
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline" className="bg-amber-50">
                            Status: {formData.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      )}
                      {formData.name === group.name &&
                        formData.type === group.type &&
                        formData.capacity === group.capacity &&
                        formData.teacherId === group.teacherId &&
                        formData.isActive === group.isActive && (
                          <p className="text-sm text-muted-foreground">No changes yet</p>
                        )}
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