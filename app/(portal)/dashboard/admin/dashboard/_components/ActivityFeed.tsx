"use client";

import { formatDistanceToNow } from "date-fns";
import { DollarSign, UserPlus, Circle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ActivityItem } from "@/types/dashboard";

export function ActivityFeed({ activities }: { activities: ActivityItem[] }) {
  return (
    <Card className="border-muted/50 shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-lg">Live Activity</CardTitle>
        <CardDescription>Recent events across the madrasah</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="relative space-y-6">
          {/* Vertical Line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-muted/40" />

          {activities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              No recent activity found.
            </p>
          ) : (
            activities.map((activity, idx) => (
              <div
                key={activity.id}
                className="relative flex gap-4 items-start"
              >
                <div
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm ring-4 ring-background
                  ${activity.type === "PAYMENT" ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"}`}
                >
                  {activity.type === "PAYMENT" ? (
                    <DollarSign className="h-4 w-4" />
                  ) : (
                    <UserPlus className="h-4 w-4" />
                  )}
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <h4 className="text-sm font-semibold truncate">
                      {activity.title}
                    </h4>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(activity.timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                    {activity.description}
                  </p>
                  {activity.amount && (
                    <span className="text-xs font-bold text-emerald-600 mt-1">
                      +${activity.amount.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
