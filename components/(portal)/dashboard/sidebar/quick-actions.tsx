"use client";

import { Calendar, FileText, MessageSquare, TrendingUp } from "lucide-react";

interface QuickActionsProps {
  userRole: string;
  onAction: (path: string) => void;
}

export function QuickActions({ userRole, onAction }: QuickActionsProps) {
  // Define quick actions based on role
  const getQuickActions = () => {
    const common = [
      { icon: Calendar, label: "Schedule", path: "/schedule" },
      { icon: MessageSquare, label: "Messages", path: "/messages" },
    ];

    switch (userRole) {
      case "STUDENT":
        return [
          ...common,
          {
            icon: FileText,
            label: "Assignments",
            path: "/dashboard/student/assignments",
          },
          {
            icon: TrendingUp,
            label: "Progress",
            path: "/dashboard/student/progress",
          },
        ];
      case "TEACHER":
        return [
          ...common,
          {
            icon: FileText,
            label: "Grade",
            path: "/dashboard/teacher/assignments",
          },
          {
            icon: TrendingUp,
            label: "Reports",
            path: "/dashboard/teacher/reports",
          },
        ];
      case "PARENT":
        return [
          ...common,
          {
            icon: TrendingUp,
            label: "Progress",
            path: "/dashboard/parent/progress",
          },
        ];
      default:
        return common;
    }
  };

  const actions = getQuickActions();

  return (
    <div className="space-y-2">
      <h3 className="px-3 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => onAction(action.path)}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300"
            >
              <Icon className="h-5 w-5 text-primary-700 dark:text-primary-400" />
              <span className="text-xs font-bold text-foreground">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
