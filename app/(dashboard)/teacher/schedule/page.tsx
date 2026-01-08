// src/app/(dashboard)/teacher/schedule/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Video,
  Users,
  MoreVertical,
  Plus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isToday,
} from "date-fns";
import Link from "next/link";

interface ScheduleItem {
  id: string;
  className: string;
  subject: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isLive: boolean;
  meetingUrl?: string;
  students: number;
}

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const getDaySchedule = (dayIndex: number) => {
    return schedule
      .filter((item) => item.dayOfWeek === dayIndex)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Teaching Schedule
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View and manage your class schedule
          </p>
        </div>
        <Button className="bg-gradient-primary gap-2">
          <Plus className="h-4 w-4" />
          Add Session
        </Button>
      </div>

      <Tabs defaultValue="week">
        <TabsList>
          <TabsTrigger value="week">Week View</TabsTrigger>
          <TabsTrigger value="day">Day View</TabsTrigger>
          <TabsTrigger value="month">Month View</TabsTrigger>
        </TabsList>

        <TabsContent value="week">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>
                Week of {format(weekStart, "MMM d")} -{" "}
                {format(weekEnd, "MMM d, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4">
                {weekDays.map((day, index) => {
                  const daySchedule = getDaySchedule(index);
                  const isTodayDate = isToday(day);

                  return (
                    <div key={index} className="space-y-2">
                      <div
                        className={`
                        rounded-lg p-3 text-center
                        ${
                          isTodayDate
                            ? "bg-gradient-primary text-white"
                            : "bg-gray-100 dark:bg-gray-800"
                        }
                      `}
                      >
                        <div className="font-semibold">
                          {format(day, "EEE")}
                        </div>
                        <div className="text-2xl font-bold">
                          {format(day, "d")}
                        </div>
                      </div>

                      <div className="space-y-2">
                        {daySchedule.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold">
                                  {item.className}
                                </h3>
                                {item.isLive && (
                                  <Badge variant="destructive">LIVE</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                {item.subject}
                              </p>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {formatTime(item.startTime)} -{" "}
                                  {formatTime(item.endTime)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {item.students}
                                </div>
                              </div>
                              {item.meetingUrl && (
                                <Button size="sm" className="w-full" asChild>
                                  <Link href={item.meetingUrl}>
                                    <Video className="mr-2 h-4 w-4" />
                                    Join Class
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}

                        {daySchedule.length === 0 && (
                          <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center dark:border-gray-700">
                            <Calendar className="mx-auto h-8 w-8 text-gray-300" />
                            <p className="mt-2 text-sm text-gray-500">
                              No classes
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Placeholder for upcoming classes */}
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <p className="text-gray-500">No upcoming classes data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule Statistics</CardTitle>
            <CardDescription>This week overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                  <p className="text-sm font-medium">Total Hours</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                  <p className="text-sm font-medium">Live Sessions</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
