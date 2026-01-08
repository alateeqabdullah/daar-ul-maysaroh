// src/app/(dashboard)/teacher/quran/page.tsx
"use client";

import { useState } from "react";
import {
  Book,
  TrendingUp,
  Target,
  Award,
  Users,
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
import { Progress } from "@/components/ui/progress";

export default function QuranProgressPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Quran Progress Tracking
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Monitor student Quran memorization and recitation progress
          </p>
        </div>
        <Button className="bg-gradient-primary gap-2">
          <Book className="h-4 w-4" />
          Add Progress
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Students Memorizing
                </p>
                <p className="mt-2 text-2xl font-bold text-purple-600">42</p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Progress
                </p>
                <p className="mt-2 text-2xl font-bold text-green-600">68%</p>
              </div>
              <div className="rounded-lg bg-green-100 p-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Completed Juz
                </p>
                <p className="mt-2 text-2xl font-bold text-blue-600">156</p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Hafiz Students
                </p>
                <p className="mt-2 text-2xl font-bold text-yellow-600">8</p>
              </div>
              <div className="rounded-lg bg-yellow-100 p-3">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Student Progress</TabsTrigger>
          <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Progress Distribution</CardTitle>
                <CardDescription>By Juz completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 5, 10, 15, 20, 25, 30].map((juz) => (
                    <div key={juz} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Juz {juz}</span>
                        <span className="text-sm text-gray-600">
                          65% complete
                        </span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Evaluations</CardTitle>
                <CardDescription>Latest student evaluations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Ahmed Khan</p>
                          <p className="text-sm text-gray-600">
                            Juz 30 - Surah An-Naba
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          Excellent
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        Perfect tajweed, needs to work on speed control.
                      </p>
                      <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                        <span>2 days ago</span>
                        <span>Score: 9/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
