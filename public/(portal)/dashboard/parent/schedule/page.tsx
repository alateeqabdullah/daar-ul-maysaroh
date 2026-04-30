// src/app/(dashboard)/parent/schedule/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Video,
  Download,
  Printer,
  Share2,
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

interface ClassSchedule {
  id: string;
  childName: string;
  className: string;
  subject: string;
  teacher: string;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  type: "LIVE" | "RECORDED" | "OFFLINE";
  meetingPlatform?: "ZOOM" | "GOOGLE_MEET" | "MICROSOFT_TEAMS";
  meetingUrl?: string;
  meetingId?: string;
  meetingPassword?: string;
  location?: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
  materials?: string[];
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: "EXAM" | "HOLIDAY" | "EVENT" | "DEADLINE" | "MEETING";
  children: string[];
  importance: "HIGH" | "MEDIUM" | "LOW";
}

export default function ParentSchedulePage() {
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedChild, setSelectedChild] = useState("ALL");
  const [selectedDay, setSelectedDay] = useState("ALL");
  const [selectedView, setSelectedView] = useState("weekly");
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      setIsLoading(true);
      try {
        // Mock data - Replace with API calls
        const mockSchedules: ClassSchedule[] = [
          {
            id: "1",
            childName: "Omar Ahmed",
            className: "Quran Memorization - Level 1",
            subject: "Quran Memorization",
            teacher: "Sheikh Ahmed Al-Qari",
            day: "Monday",
            date: "2024-01-15",
            startTime: "09:00",
            endTime: "10:30",
            duration: "1h 30m",
            type: "LIVE",
            meetingPlatform: "ZOOM",
            meetingUrl: "https://zoom.us/j/123456789",
            meetingId: "123 456 7890",
            status: "UPCOMING",
          },
          {
            id: "2",
            childName: "Omar Ahmed",
            className: "Tajweed Rules",
            subject: "Tajweed",
            teacher: "Sheikh Ahmed Al-Qari",
            day: "Wednesday",
            date: "2024-01-17",
            startTime: "09:00",
            endTime: "10:30",
            duration: "1h 30m",
            type: "LIVE",
            meetingPlatform: "ZOOM",
            meetingUrl: "https://zoom.us/j/987654321",
            meetingId: "987 654 3210",
            status: "UPCOMING",
          },
          {
            id: "3",
            childName: "Aisha Ahmed",
            className: "Fiqh of Worship - Intermediate",
            subject: "Fiqh of Purification",
            teacher: "Ustadh Muhammad Ali",
            day: "Tuesday",
            date: "2024-01-16",
            startTime: "18:00",
            endTime: "19:30",
            duration: "1h 30m",
            type: "LIVE",
            meetingPlatform: "GOOGLE_MEET",
            meetingUrl: "https://meet.google.com/abc-defg-hij",
            status: "UPCOMING",
          },
          {
            id: "4",
            childName: "Aisha Ahmed",
            className: "Arabic Language - Intermediate",
            subject: "Arabic Grammar",
            teacher: "Ustadha Fatima Zahra",
            day: "Saturday",
            date: "2024-01-20",
            startTime: "10:00",
            endTime: "11:30",
            duration: "1h 30m",
            type: "RECORDED",
            status: "UPCOMING",
          },
          {
            id: "5",
            childName: "Omar Ahmed",
            className: "Islamic Studies",
            subject: "Seerah",
            teacher: "Ustadh Ibrahim",
            day: "Friday",
            date: "2024-01-19",
            startTime: "14:00",
            endTime: "15:30",
            duration: "1h 30m",
            type: "OFFLINE",
            location: "Main Hall",
            status: "UPCOMING",
          },
        ];

        const mockEvents: Event[] = [
          {
            id: "e1",
            title: "Midterm Exams",
            description: "All subjects midterm examination",
            date: "2024-01-25",
            time: "09:00 - 12:00",
            type: "EXAM",
            children: ["Omar Ahmed", "Aisha Ahmed"],
            importance: "HIGH",
          },
          {
            id: "e2",
            title: "Eid al-Fitr Holiday",
            description: "Madrasah closed for Eid celebrations",
            date: "2024-04-10",
            time: "All day",
            type: "HOLIDAY",
            children: ["Omar Ahmed", "Aisha Ahmed"],
            importance: "MEDIUM",
          },
          {
            id: "e3",
            title: "Parent-Teacher Meeting",
            description: "Monthly progress review meeting",
            date: "2024-01-30",
            time: "16:00 - 18:00",
            type: "MEETING",
            children: ["Omar Ahmed"],
            importance: "HIGH",
          },
          {
            id: "e4",
            title: "Quran Competition",
            description: "Annual Quran memorization competition",
            date: "2024-02-15",
            time: "10:00 - 14:00",
            type: "EVENT",
            children: ["Omar Ahmed", "Aisha Ahmed"],
            importance: "MEDIUM",
          },
          {
            id: "e5",
            title: "Assignment Deadline",
            description: "Fiqh project submission",
            date: "2024-01-22",
            time: "23:59",
            type: "DEADLINE",
            children: ["Aisha Ahmed"],
            importance: "HIGH",
          },
        ];

        setSchedules(mockSchedules);
        setEvents(mockEvents);
      } catch (error) {
        toast.error("Failed to load schedule");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const filteredSchedules = schedules.filter((schedule) => {
    const matchesChild =
      selectedChild === "ALL" || schedule.childName.includes(selectedChild);
    const matchesDay = selectedDay === "ALL" || schedule.day === selectedDay;
    return matchesChild && matchesDay;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "LIVE":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "RECORDED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "OFFLINE":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "EXAM":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "HOLIDAY":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "EVENT":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "DEADLINE":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "MEETING":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "HIGH":
        return "text-red-600 dark:text-red-400";
      case "MEDIUM":
        return "text-yellow-600 dark:text-yellow-400";
      case "LOW":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const handleJoinClass = (schedule: ClassSchedule) => {
    if (schedule.meetingUrl) {
      window.open(schedule.meetingUrl, "_blank");
      toast.success(`Joining ${schedule.className}`);
    } else {
      toast.info("No meeting link available");
    }
  };

  const handleSetReminder = (schedule: ClassSchedule) => {
    toast.success(`Reminder set for ${schedule.className}`);
    // In production: Integrate with calendar API
  };

  const handleDownloadSchedule = () => {
    toast.success("Downloading schedule...");
    // In production: Generate and download PDF/ICS
  };

  const handleShareSchedule = () => {
    toast.success("Schedule shared successfully");
    // In production: Generate shareable link
  };

  // Get days of current week
  const getWeekDays = () => {
    const start = new Date(currentWeek);
    start.setDate(start.getDate() - start.getDay());

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Schedule
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Class timetables and important events
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Schedule Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentWeek((prev) => {
                    const newDate = new Date(prev);
                    newDate.setDate(newDate.getDate() - 7);
                    return newDate;
                  })
                }
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="text-center">
                <p className="font-semibold">
                  Week of {formatDate(weekDays[0])}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(weekDays[0])} - {formatDate(weekDays[6])}
                </p>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentWeek((prev) => {
                    const newDate = new Date(prev);
                    newDate.setDate(newDate.getDate() + 7);
                    return newDate;
                  })
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                onClick={() => setCurrentWeek(new Date())}
              >
                Today
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Select value={selectedView} onValueChange={setSelectedView}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Children" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Children</SelectItem>
                  <SelectItem value="Omar">Omar Ahmed</SelectItem>
                  <SelectItem value="Aisha">Aisha Ahmed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly View */}
      {selectedView === "weekly" && (
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>Class timetable for the week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Days Header */}
                <div className="grid grid-cols-8 border-b">
                  <div className="p-4"></div>
                  {weekDays.map((day, index) => (
                    <div key={index} className="p-4 text-center">
                      <p className="font-semibold">
                        {day.toLocaleDateString("en-US", { weekday: "short" })}
                      </p>
                      <p
                        className={`text-sm ${
                          day.toDateString() === new Date().toDateString()
                            ? "text-purple-600 font-bold"
                            : "text-gray-600"
                        }`}
                      >
                        {day.getDate()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                {["09:00", "12:00", "15:00", "18:00"].map((time, timeIndex) => (
                  <div
                    key={timeIndex}
                    className="grid grid-cols-8 border-b last:border-b-0"
                  >
                    <div className="p-4 border-r">
                      <p className="font-medium">{time}</p>
                    </div>
                    {weekDays.map((day, dayIndex) => {
                      const daySchedules = filteredSchedules.filter(
                        (schedule) => {
                          const scheduleDate = new Date(schedule.date);
                          return (
                            scheduleDate.toDateString() ===
                              day.toDateString() &&
                            schedule.startTime.startsWith(time.split(":")[0])
                          );
                        }
                      );

                      return (
                        <div
                          key={dayIndex}
                          className="p-2 border-r last:border-r-0 min-h-[120px]"
                        >
                          {daySchedules.map((schedule) => (
                            <div
                              key={schedule.id}
                              className="mb-2 rounded-lg border border-gray-200 p-3 hover:shadow-md dark:border-gray-700"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium text-sm">
                                    {schedule.subject}
                                  </p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {schedule.childName.split(" ")[0]}
                                  </p>
                                </div>
                                <Badge
                                  className={`text-xs ${getTypeColor(
                                    schedule.type
                                  )}`}
                                >
                                  {schedule.type}
                                </Badge>
                              </div>
                              <div className="mt-2 flex items-center justify-between text-xs">
                                <span className="text-gray-600 dark:text-gray-400">
                                  {schedule.startTime} - {schedule.endTime}
                                </span>
                                {schedule.type === "LIVE" && (
                                  <Button
                                    size="sm"
                                    className="h-6 bg-gradient-primary text-xs"
                                    onClick={() => handleJoinClass(schedule)}
                                  >
                                    Join
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Class List View */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
          <TabsTrigger value="events">Events & Deadlines</TabsTrigger>
          <TabsTrigger value="completed">Completed Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Upcoming Classes */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>Next 7 days of classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSchedules
                    .filter((s) => s.status === "UPCOMING")
                    .sort(
                      (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    )
                    .slice(0, 5)
                    .map((schedule) => (
                      <div
                        key={schedule.id}
                        className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">
                                {schedule.className}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {schedule.childName.split(" ")[0]}
                              </Badge>
                            </div>
                            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-gray-400" />
                                  <span>
                                    {schedule.day}, {formatDate(schedule.date)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-gray-400" />
                                  <span>
                                    {schedule.startTime} - {schedule.endTime}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-gray-400" />
                                  <span>{schedule.teacher}</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                {schedule.type === "LIVE" &&
                                  schedule.meetingPlatform && (
                                    <div className="flex items-center gap-2">
                                      <Video className="h-4 w-4 text-gray-400" />
                                      <span>{schedule.meetingPlatform}</span>
                                    </div>
                                  )}
                                {schedule.location && (
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span>{schedule.location}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="ml-4 flex flex-col gap-2">
                            <Badge className={getTypeColor(schedule.type)}>
                              {schedule.type}
                            </Badge>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleSetReminder(schedule)}
                              >
                                <Bell className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleJoinClass(schedule)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Upcoming Classes
                </Button>
              </CardFooter>
            </Card>

            {/* Important Events */}
            <Card>
              <CardHeader>
                <CardTitle>Important Events</CardTitle>
                <CardDescription>
                  Upcoming exams, holidays, and deadlines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events
                    .sort(
                      (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    )
                    .slice(0, 5)
                    .map((event) => (
                      <div
                        key={event.id}
                        className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{event.title}</h3>
                              <Badge className={getEventColor(event.type)}>
                                {event.type}
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              {event.description}
                            </p>
                            <div className="mt-3 flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span>{event.time}</span>
                              </div>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {event.children.map((child) => (
                                <Badge
                                  key={child}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {child.split(" ")[0]}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div
                            className={`font-semibold ${getImportanceColor(
                              event.importance
                            )}`}
                          >
                            {event.importance}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Calendar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
                <Bell className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold">Set Reminders</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Get notified before classes and events
              </p>
              <Button className="mt-4 w-full" variant="outline">
                Configure Alerts
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                <Share2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold">Share Schedule</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Share with family members or print
              </p>
              <Button
                className="mt-4 w-full"
                variant="outline"
                onClick={handleShareSchedule}
              >
                Share Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <CalendarDays className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold">Sync Calendar</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Import schedule to Google/Apple Calendar
              </p>
              <Button
                className="mt-4 w-full"
                variant="outline"
                onClick={handleDownloadSchedule}
              >
                Download .ics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
