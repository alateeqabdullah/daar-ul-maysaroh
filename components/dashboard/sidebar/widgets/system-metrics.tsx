"use client";

import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export function SystemMetricsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/10 border border-primary-200/50 dark:border-primary-800/30"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-black uppercase tracking-wider text-foreground">
          System Status
        </p>
        <Zap className="h-4 w-4 text-amber-500" aria-hidden="true" />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-muted-foreground">
            <span>Storage Usage</span>
            <span className="text-primary-700 dark:text-primary-400">78%</span>
          </div>
          <Progress
            value={78}
            className="h-1.5 bg-primary-100 dark:bg-primary-900/30"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-muted-foreground">
            <span>Active Users</span>
            <span className="text-emerald-600 dark:text-emerald-400">
              42/100
            </span>
          </div>
          <Progress
            value={42}
            className="h-1.5 bg-primary-100 dark:bg-primary-900/30"
          />
        </div>
      </div>
      <Button
        size="sm"
        className="w-full mt-4 h-9 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-xs font-black text-white rounded-xl shadow-lg"
      >
        Upgrade Plan
      </Button>
    </motion.div>
  );
}
