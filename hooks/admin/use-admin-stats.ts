"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminStats } from "@/types/admin/dashboard";

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const response = await fetch("/api/admin/dashboard");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setStats(data);
      setRetryCount(0);
    } catch (error) {
      console.error("Failed to fetch admin stats:", error);
      setIsError(true);
      setRetryCount((prev) => prev + 1);
    } finally {
      setIsLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const refresh = useCallback(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    isLoading,
    isError,
    refresh,
    retryCount,
  };
}
