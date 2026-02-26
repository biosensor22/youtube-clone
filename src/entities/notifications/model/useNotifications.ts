"use client";

import { useEffect, useState } from "react";
import {
  fetchNotifications,
  type Notifications,
} from "@/entities/notifications";

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchNotifications();
        if (data) {
          setNotifications(data);
        }
      } catch (err) {
        if ((err as DOMException).name === "AbortError") return;
        setError(err as Error);
        console.error("Error loading categories", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [userId]);
  return { notifications, isLoading, error };
}
