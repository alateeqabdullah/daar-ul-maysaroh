"use client";

import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ParentSummaryWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/10 border border-violet-200/50 dark:border-violet-800/30"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-black uppercase tracking-wider text-foreground">
          Child Summary
        </p>
        <Users className="h-4 w-4 text-violet-500" aria-hidden="true" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-muted-foreground">
            Attendance
          </span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            95%
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-muted-foreground">
            Avg. Grade
          </span>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
            A-
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-muted-foreground">
            Assignments Due
          </span>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
            2
          </span>
        </div>
      </div>
      <Button
        size="sm"
        variant="outline"
        className="w-full mt-4 h-9 border-violet-200 dark:border-violet-800/30 text-violet-700 dark:text-violet-400 text-xs font-bold rounded-xl"
      >
        View Children
      </Button>
    </motion.div>
  );
}
