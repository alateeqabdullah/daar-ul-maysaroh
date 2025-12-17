// src/components/live-class/class-scheduler.tsx
"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  Lock,
  Users,
  Globe,
  Repeat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ClassSchedulerProps {
  onSchedule: (meetingData: any) => void;
  defaultClass?: any;
}

export default function ClassScheduler({
  onSchedule,
  defaultClass,
}: ClassSchedulerProps) {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:30");
  const [recurring, setRecurring] = useState(false);

  const [formData, setFormData] = useState({
    topic: defaultClass?.name || "",
    agenda: defaultClass?.description || "",
    duration: 90,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    password: "",
    settings: {
      host_video: true,
      participant_video: true,
      join_before_host: false,
      mute_upon_entry: true,
      waiting_room: true,
      auto_recording: "cloud",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!date) {
        throw new Error("Please select a date");
      }

      // Combine date and time
      const startDateTime = new Date(date);
      const [hours, minutes] = startTime.split(":").map(Number);
      startDateTime.setHours(hours, minutes);

      const meetingData = {
        ...formData,
        type: recurring ? 8 : 2, // 2=Scheduled, 8=Recurring fixed
        start_time: startDateTime.toISOString(),
        duration: calculateDuration(),
        recurrence: recurring
          ? {
              type: 2, // Weekly
              repeat_interval: 1,
              weekly_days: "1,3,5", // Mon, Wed, Fri
              end_times: 12, // 12 occurrences
            }
          : undefined,
      };

      // Call API to create Zoom meeting
      const response = await fetch("/api/zoom/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meetingData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Class scheduled successfully!");
        onSchedule(data.meeting);
      } else {
        throw new Error(data.message || "Failed to schedule class");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const calculateDuration = () => {
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);

    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    return Math.max(0, endMinutes - startMinutes);
  };

  const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topic">Class Title</Label>
          <Input
            id="topic"
            placeholder="Enter class title"
            value={formData.topic}
            onChange={(e) =>
              setFormData({ ...formData, topic: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="agenda">Description/Agenda</Label>
          <Textarea
            id="agenda"
            placeholder="What will be covered in this class?"
            value={formData.agenda}
            onChange={(e) =>
              setFormData({ ...formData, agenda: e.target.value })
            }
            rows={3}
          />
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-gray-500"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Timezone</Label>
          <Select
            value={formData.timezone}
            onValueChange={(value) =>
              setFormData({ ...formData, timezone: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC">UTC</SelectItem>
              <SelectItem value="America/New_York">Eastern Time</SelectItem>
              <SelectItem value="Europe/London">London</SelectItem>
              <SelectItem value="Asia/Dubai">Dubai</SelectItem>
              <SelectItem value="Asia/Karachi">Karachi</SelectItem>
              <SelectItem value="Asia/Jakarta">Jakarta</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Start Time</Label>
          <Select value={startTime} onValueChange={setStartTime}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>End Time</Label>
          <Select value={endTime} onValueChange={setEndTime}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Duration Display */}
      <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-600" />
            <span className="font-medium">Duration</span>
          </div>
          <span className="text-lg font-bold">
            {calculateDuration()} minutes
          </span>
        </div>
      </div>

      {/* Recurring Option */}
      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <Repeat className="h-5 w-5 text-purple-600" />
          <div>
            <Label htmlFor="recurring" className="font-medium">
              Recurring Class
            </Label>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Schedule this class to repeat weekly
            </p>
          </div>
        </div>
        <Switch
          id="recurring"
          checked={recurring}
          onCheckedChange={setRecurring}
        />
      </div>

      {/* Meeting Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Meeting Settings</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="h-5 w-5" />
              <Label htmlFor="host_video">Host Video On</Label>
            </div>
            <Switch
              id="host_video"
              checked={formData.settings.host_video}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  settings: { ...formData.settings, host_video: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <Label htmlFor="participant_video">Participant Video</Label>
            </div>
            <Switch
              id="participant_video"
              checked={formData.settings.participant_video}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  settings: {
                    ...formData.settings,
                    participant_video: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <Label htmlFor="join_before_host">Join Before Host</Label>
            </div>
            <Switch
              id="join_before_host"
              checked={formData.settings.join_before_host}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  settings: { ...formData.settings, join_before_host: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <Label htmlFor="waiting_room">Waiting Room</Label>
            </div>
            <Switch
              id="waiting_room"
              checked={formData.settings.waiting_room}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  settings: { ...formData.settings, waiting_room: checked },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="space-y-2">
        <Label htmlFor="password">Meeting Password (Optional)</Label>
        <Input
          id="password"
          type="text"
          placeholder="Enter meeting password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          maxLength={10}
        />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Leave empty to generate automatically
        </p>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Scheduling..." : "Schedule Live Class"}
      </Button>
    </form>
  );
}
