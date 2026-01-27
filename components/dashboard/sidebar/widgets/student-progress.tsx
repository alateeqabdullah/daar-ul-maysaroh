"use client";

import { Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export function StudentProgressWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/10 border border-blue-200/50 dark:border-blue-800/30"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-black uppercase tracking-wider text-foreground">
          Learning Progress
        </p>
        <Target className="h-4 w-4 text-blue-500" aria-hidden="true" />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-muted-foreground">
            <span>Quran Memorization</span>
            <span className="text-blue-700 dark:text-blue-400">65%</span>
          </div>
          <Progress
            value={65}
            className="h-1.5 bg-blue-100 dark:bg-blue-900/30"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-muted-foreground">
            <span>Assignments Complete</span>
            <span className="text-emerald-600 dark:text-emerald-400">8/10</span>
          </div>
          <Progress
            value={80}
            className="h-1.5 bg-blue-100 dark:bg-blue-900/30"
          />
        </div>
      </div>
      <Button
        size="sm"
        variant="outline"
        className="w-full mt-4 h-9 border-blue-200 dark:border-blue-800/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-xl"
      >
        <TrendingUp className="mr-2 h-3 w-3" />
        View Progress Report
      </Button>
    </motion.div>
  );
}
