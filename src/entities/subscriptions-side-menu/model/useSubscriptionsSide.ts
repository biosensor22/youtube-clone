"use client";

import { fetchSubscriptions } from "../api/subscriptionsApi";
import { useState, useEffect } from "react";
import { SubscriptionsSideMenu } from "./types";

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
        const data = await fetchSubscriptions(userId);
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
