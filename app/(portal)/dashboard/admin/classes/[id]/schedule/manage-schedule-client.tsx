// app/(portal)/dashboard/admin/classes/[id]/schedule/manage-schedule-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Loader2,
  School,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  ClassWithRelations,
  addClassSchedule,
  deleteClassSchedule,
} from "../../../actions/classes";

interface ManageScheduleClientProps {
  classData: ClassWithRelations;
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

interface ScheduleForm {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export function ManageScheduleClient({ classData }: ManageScheduleClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSchedule, setNewSchedule] = useState<ScheduleForm>({
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "10:00",
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAddSchedule = async () => {
    if (!newSchedule.startTime || !newSchedule.endTime) {
      toast.error("Please select start and end times");
      return;
    }

    setIsSubmitting(true);
    try {
      await addClassSchedule({
        classId: classData.id,
        dayOfWeek: newSchedule.dayOfWeek,
        startTime: newSchedule.startTime,
        endTime: newSchedule.endTime,
        timezone: "UTC",
        isLive: true,
        meetingPlatform: "ZOOM",
        isRecurring: true,
      });

      toast.success("Schedule added successfully");
      router.refresh();
      setNewSchedule({ dayOfWeek: 1, startTime: "09:00", endTime: "10:00" });
    } catch (error) {
      toast.error("Failed to add schedule");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    setDeletingId(scheduleId);
    try {
      await deleteClassSchedule(scheduleId);
      toast.success("Schedule deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete schedule");
    } finally {
      setDeletingId(null);
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
                  Manage Schedule
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {classData.name} ({classData.code})
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Schedule Form */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Add Schedule</CardTitle>
              <CardDescription>Add a new weekly time slot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Day</Label>
                <Select
                  value={newSchedule.dayOfWeek.toString()}
                  onValueChange={(v) =>
                    setNewSchedule({ ...newSchedule, dayOfWeek: parseInt(v) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
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
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Select
                    value={newSchedule.startTime}
                    onValueChange={(v) =>
                      setNewSchedule({ ...newSchedule, startTime: v })
                    }
                  >
                    <SelectTrigger>
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
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Select
                    value={newSchedule.endTime}
                    onValueChange={(v) =>
                      setNewSchedule({ ...newSchedule, endTime: v })
                    }
                  >
                    <SelectTrigger>
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
              <Button
                onClick={handleAddSchedule}
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                Add Schedule
              </Button>
            </CardContent>
          </Card>

          {/* Current Schedules */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Current Schedule</CardTitle>
              <CardDescription>Weekly class timings</CardDescription>
            </CardHeader>
            <CardContent>
              {classData.schedules && classData.schedules.length > 0 ? (
                <div className="space-y-3">
                  {classData.schedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <Clock className="w-5 h-5 text-purple-500" />
                        <div>
                          <p className="font-medium">
                            {
                              DAYS_OF_WEEK.find(
                                (d) => d.value === schedule.dayOfWeek,
                              )?.label
                            }
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {schedule.startTime} - {schedule.endTime} (
                            {schedule.timezone})
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSchedule(schedule.id)}
                        disabled={deletingId === schedule.id}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        {deletingId === schedule.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No schedule set for this class</p>
                  <p className="text-sm">Use the form to add class timings</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Note */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                Schedule Information
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-500">
                All times are displayed in UTC. Students will see these times
                converted to their local timezone. Multiple schedules can be
                added for different days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
