// src/app/(dashboard)/student/schedule/page.tsx
"use client";

import { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Video,
  Users,
  Download,
  Printer,
  Filter,
  MoreVertical,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
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
import { toast } from "sonner";
import {
  addDays,
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isToday,
  isSameDay,
} from "date-fns";

// Mock data
const weeklySchedule = [
  {
    id: 1,
    day: "Monday",
    date: "2024-01-22",
    classes: [
      {
        id: 1,
        name: "Quran Memorization",
        time: "09:00 - 10:30",
        teacher: "Sheikh Ahmed",
        type: "live",
        zoomLink: "#",
        status: "upcoming",
      },
      {
        id: 2,
        name: "Arabic Language",
        time: "14:00 - 15:30",
        teacher: "Ustadha Fatima",
        type: "recorded",
        status: "completed",
      },
    ],
  },
  {
    id: 2,
    day: "Tuesday",
    date: "2024-01-23",
    classes: [
      {
        id: 3,
        name: "Tajweed Rules",
        time: "14:00 - 15:30",
        teacher: "Ustadha Fatima",
        type: "live",
        zoomLink: "#",
        status: "upcoming",
      },
    ],
  },
  {
    id: 3,
    day: "Wednesday",
    date: "2024-01-24",
    classes: [
      {
        id: 4,
        name: "Quran Memorization",
        time: "09:00 - 10:30",
        teacher: "Sheikh Ahmed",
        type: "live",
        zoomLink: "#",
        status: "upcoming",
      },
      {
        id: 5,
        name: "Fiqh of Worship",
        time: "16:00 - 17:30",
        teacher: "Ustadh Muhammad",
        type: "live",
        zoomLink: "#",
        status: "upcoming",
      },
    ],
  },
  {
    id: 4,
    day: "Thursday",
    date: "2024-01-25",
    classes: [
      {
        id: 6,
        name: "Tajweed Rules",
        time: "14:00 - 15:30",
        teacher: "Ustadha Fatima",
        type: "live",
        zoomLink: "#",
        status: "upcoming",
      },
    ],
  },
  {
    id: 5,
    day: "Friday",
    date: "2024-01-26",
    classes: [
      {
        id: 7,
        name: "Quran Memorization",
        time: "09:00 - 10:30",
        teacher: "Sheikh Ahmed",
        type: "live",
        zoomLink: "#",
        status: "upcoming",
      },
    ],
  },
  {
    id: 6,
    day: "Saturday",
    date: "2024-01-27",
    classes: [
      {
        id: 8,
        name: "Fiqh of Worship",
        time: "16:00 - 17:30",
        teacher: "Ustadh Muhammad",
        type: "live",
        zoomLink: "#",
        status: "upcoming",
      },
    ],
  },
  {
    id: 7,
    day: "Sunday",
    date: "2024-01-28",
    classes: [],
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Midterm Exams",
    date: "2024-02-01",
    type: "exam",
    description: "All subjects midterm exams",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    date: "2024-02-05",
    type: "meeting",
    description: "Virtual meeting with parents",
  },
  {
    id: 3,
    title: "Quran Competition",
    date: "2024-02-10",
    type: "event",
    description: "Annual Quran memorization competition",
  },
  {
    id: 4,
    title: "Eid al-Fitr Holiday",
    date: "2024-04-10",
    type: "holiday",
    description: "Madrasah closed for Eid",
  },
];

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month" | "day">("week");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const getWeekDates = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 });
    const end = endOfWeek(currentDate, { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  };

  const handleJoinClass = (classId: number, className: string) => {
    toast.success(`Joining ${className}...`, {
      description: "Opening Zoom meeting.",
    });
  };

  const handlePreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const daySchedule = weeklySchedule.find((day) => day.date === dateStr);
    const events = upcomingEvents.filter((event) => event.date === dateStr);

    return {
      classes: daySchedule?.classes || [],
      events: events || [],
    };
  };

  const weekDates = getWeekDates();
  const todayEvents = getEventsForDate(selectedDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Schedule & Calendar
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View your class schedule and upcoming events
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <CalendarIcon className="h-4 w-4" />
            Add to Calendar
          </Button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleToday}>
                Today
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePreviousWeek}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold">
                  {format(currentDate, "MMMM yyyy")}
                </h2>
                <Button variant="outline" size="icon" onClick={handleNextWeek}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)}>
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Week View */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Week Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>
                {format(weekDates[0], "MMM d")} -{" "}
                {format(weekDates[6], "MMM d, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {/* Days Header */}
                  <div className="grid grid-cols-7 gap-2">
                    {weekDates.map((date, index) => (
                      <div
                        key={index}
                        className={`rounded-lg p-3 text-center ${
                          isSameDay(date, selectedDate)
                            ? "bg-gradient-primary text-white"
                            : isToday(date)
                            ? "bg-purple-50 dark:bg-purple-900/20"
                            : "bg-gray-50 dark:bg-gray-800"
                        }`}
                        onClick={() => setSelectedDate(date)}
                      >
                        <div className="text-sm font-medium">
                          {format(date, "EEE")}
                        </div>
                        <div className="text-2xl font-bold">
                          {format(date, "d")}
                        </div>
                        <div className="text-xs opacity-75">
                          {format(date, "MMM")}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Schedule Grid */}
                  <div className="mt-4 space-y-4">
                    {weeklySchedule.map((day) => (
                      <div key={day.id} className="space-y-3">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                          {day.day}, {format(new Date(day.date), "MMM d")}
                        </h3>
                        {day.classes.length > 0 ? (
                          <div className="space-y-2">
                            {day.classes.map((classItem) => (
                              <div
                                key={classItem.id}
                                className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-semibold">
                                        {classItem.name}
                                      </h4>
                                      <Badge
                                        variant="outline"
                                        className="gap-1"
                                      >
                                        <Clock className="h-3 w-3" />
                                        {classItem.time}
                                      </Badge>
                                      {classItem.type === "live" && (
                                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                          Live
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                      <span className="flex items-center gap-1">
                                        <Users className="h-3 w-3" />
                                        {classItem.teacher}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        {classItem.status === "completed" ? (
                                          <>
                                            <CheckCircle className="h-3 w-3 text-green-500" />
                                            Completed
                                          </>
                                        ) : (
                                          <>
                                            <AlertCircle className="h-3 w-3 text-blue-500" />
                                            Upcoming
                                          </>
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {classItem.type === "live" &&
                                      classItem.status === "upcoming" && (
                                        <Button
                                          size="sm"
                                          className="bg-gradient-primary"
                                          onClick={() =>
                                            handleJoinClass(
                                              classItem.id,
                                              classItem.name
                                            )
                                          }
                                        >
                                          <Video className="mr-2 h-4 w-4" />
                                          Join
                                        </Button>
                                      )}
                                    <Button size="sm" variant="ghost">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                            <CalendarIcon className="mx-auto h-12 w-12 text-gray-300" />
                            <p className="mt-2 text-gray-500">
                              No classes scheduled
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Day & Upcoming Events */}
        <div className="space-y-6">
          {/* Selected Day */}
          <Card>
            <CardHeader>
              <CardTitle>
                {format(selectedDate, "EEEE, MMMM d")}
                {isToday(selectedDate) && (
                  <Badge className="ml-2 bg-gradient-primary">Today</Badge>
                )}
              </CardTitle>
              <CardDescription>Schedule for selected day</CardDescription>
            </CardHeader>
            <CardContent>
              {todayEvents.classes.length > 0 ? (
                <div className="space-y-3">
                  {todayEvents.classes.map((classItem) => (
                    <div
                      key={classItem.id}
                      className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{classItem.name}</h4>
                          <p className="text-sm text-gray-600">
                            {classItem.time}
                          </p>
                        </div>
                        <Badge
                          className={
                            classItem.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }
                        >
                          {classItem.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-2 text-gray-500">No classes scheduled</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Personal Event
              </Button>
            </CardFooter>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Important dates and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start space-x-3">
                    <div
                      className={`mt-0.5 rounded-lg p-2 ${
                        event.type === "exam"
                          ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                          : event.type === "meeting"
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          : event.type === "holiday"
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                      }`}
                    >
                      <CalendarIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-600">
                        {event.description}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-sm">
                        <CalendarIcon className="h-3 w-3" />
                        {format(new Date(event.date), "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Events
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-semibold">8 classes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Live Sessions</span>
                  <span className="font-semibold">6</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Recorded</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Hours</span>
                  <span className="font-semibold">12.5 hrs</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Time Slots View (For Day View) */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Time Slots</CardTitle>
          <CardDescription>
            Detailed view of your daily schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                {/* Time Slots */}
                {[
                  "08:00",
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00",
                  "13:00",
                  "14:00",
                  "15:00",
                  "16:00",
                  "17:00",
                  "18:00",
                ].map((time) => (
                  <div key={time} className="md:col-span-12">
                    <div className="grid grid-cols-7 gap-2">
                      {/* Time Label */}
                      <div className="col-span-1 py-3 text-right">
                        <span className="text-sm font-medium">{time}</span>
                      </div>

                      {/* Day Columns */}
                      {weekDates.map((date, dayIndex) => {
                        const dateStr = format(date, "yyyy-MM-dd");
                        const daySchedule = weeklySchedule.find(
                          (d) => d.date === dateStr
                        );
                        const classAtThisTime = daySchedule?.classes.find(
                          (cls) => {
                            const [start] = cls.time.split(" - ");
                            return start.startsWith(time.substring(0, 2));
                          }
                        );

                        return (
                          <div
                            key={dayIndex}
                            className={`col-span-1 rounded-lg border ${
                              classAtThisTime
                                ? "border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/20"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            {classAtThisTime && (
                              <div className="p-2">
                                <p className="text-xs font-medium">
                                  {classAtThisTime.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {classAtThisTime.time}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
