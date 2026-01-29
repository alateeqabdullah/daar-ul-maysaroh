"use client";

import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  BookOpen,
  GraduationCap,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Counter } from "@/components/admin/dashboard-ui";
import { DashboardStats } from "@/types/dashboard";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export function StatCardsGrid({ stats }: { stats: DashboardStats }) {
  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "from-violet-500 to-purple-600",
      shadow: "shadow-purple-500/20",
    },
    {
      label: "Pending",
      value: stats.pendingUsers,
      icon: UserCheck,
      color: "from-amber-400 to-orange-500",
      shadow: "shadow-orange-500/20",
    },
    {
      label: "Active Classes",
      value: stats.activeClasses,
      icon: BookOpen,
      color: "from-blue-400 to-cyan-500",
      shadow: "shadow-blue-500/20",
    },
    {
      label: "Teachers",
      value: stats.activeTeachers,
      icon: GraduationCap,
      color: "from-emerald-400 to-teal-500",
      shadow: "shadow-emerald-500/20",
    },
    {
      label: "Total Revenue",
      value: stats.revenue,
      prefix: "$",
      icon: DollarSign,
      color: "from-green-500 to-emerald-700",
      shadow: "shadow-green-500/20",
    },
    {
      label: "Attendance",
      value: stats.attendanceRate,
      suffix: "%",
      icon: TrendingUp,
      color: "from-indigo-400 to-blue-600",
      shadow: "shadow-indigo-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((stat) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <Card className="border-none shadow-md overflow-hidden bg-background/60 backdrop-blur-md">
            <CardContent className="p-5 flex flex-col justify-between h-full relative">
              <div
                className={`absolute top-0 right-0 w-16 h-16 bg-linear-to-br ${stat.color} opacity-5 rounded-bl-full`}
              />

              <div
                className={`w-10 h-10 rounded-xl bg-linear-to-br ${stat.color} ${stat.shadow} flex items-center justify-center text-white mb-4`}
              >
                <stat.icon className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
                <div className="text-2xl font-bold mt-1">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
