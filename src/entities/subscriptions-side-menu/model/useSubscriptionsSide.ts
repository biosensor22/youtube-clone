"use client";

import {
  fetchSubscriptions,
  type SubscriptionsSideMenu,
} from "@/entities/subscriptions-side-menu";
import { useState, useEffect } from "react";

export function useSubscriptionsSide(userId: string) {
  const [subscriptions, setSubscriptions] = useState<SubscriptionsSideMenu[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchSubscriptions();
        if (data) {
          setSubscriptions(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        console.error("Hook catch:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [userId]);
  return { subscriptions, isLoading, error };
}
