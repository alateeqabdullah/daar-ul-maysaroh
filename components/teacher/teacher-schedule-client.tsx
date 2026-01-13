"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  ArrowLeft,
  MoreVertical,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { cn } from "@/lib/utils";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function TeacherScheduleClient({
  schedules,
}: {
  schedules: any[];
}) {
  const todayIndex = new Date().getDay();
  const [activeDay, setActiveDay] = useState(todayIndex.toString());

  const formatTime = (time: string) => {
    const [h, m] = time.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  const getDaySchedules = (dayIndex: string) => {
    return schedules.filter((s) => s.dayOfWeek.toString() === dayIndex);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/teacher">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            My Schedule
          </h1>
          <p className="text-muted-foreground">Manage your weekly classes</p>
        </div>
      </div>

      {/* Day Tabs */}
      <Tabs
        defaultValue={activeDay}
        onValueChange={setActiveDay}
        className="w-full"
      >
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full justify-start overflow-x-auto">
          {days.map((day, index) => (
            <TabsTrigger
              key={day}
              value={index.toString()}
              className={cn(
                "rounded-lg px-6 py-2.5 transition-all data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-950",
                index === todayIndex && "font-bold"
              )}
            >
              {day}{" "}
              {index === todayIndex && (
                <span className="ml-2 w-2 h-2 bg-indigo-500 rounded-full" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {getDaySchedules(activeDay).length > 0 ? (
                <div className="grid gap-4">
                  {getDaySchedules(activeDay).map((s) => (
                    <Card
                      key={s.id}
                      className="border-l-4 border-l-indigo-500 shadow-sm hover:shadow-md transition-all"
                    >
                      <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        {/* Time Block */}
                        <div className="flex items-center gap-4">
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-4 py-3 rounded-xl text-center min-w-[100px]">
                            <span className="block text-lg font-bold">
                              {formatTime(s.startTime)}
                            </span>
                            <span className="text-xs opacity-70">
                              to {formatTime(s.endTime)}
                            </span>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                              {s.class.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="font-mono">
                                {s.class.code}
                              </Badge>
                              <Badge variant="outline">{s.class.level}</Badge>
                            </div>
                          </div>
                        </div>

                        {/* Location & Action */}
                        <div className="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0">
                          {s.isLive ? (
                            <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                              <Video className="h-4 w-4" /> Virtual Class
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">
                              <MapPin className="h-4 w-4" /> Room 101
                            </div>
                          )}

                          {s.meetingUrl && (
                            <Button
                              size="sm"
                              className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
                              onClick={() =>
                                window.open(s.meetingUrl, "_blank")
                              }
                            >
                              Launch <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-muted/20 border border-dashed rounded-3xl">
                  <Calendar className="h-16 w-16 text-slate-300 mb-4" />
                  <h3 className="text-lg font-medium text-slate-600">
                    No classes scheduled
                  </h3>
                  <p className="text-slate-400">Enjoy your free time!</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
}
