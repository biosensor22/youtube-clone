"use client";

import { useState, useEffect } from "react";
import { fetchVideoCards } from "../api/videosApi";
import type { FeedItem } from "../model/types";

export function useUserVideos(userId: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState<FeedItem[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const empty = !isLoading && videos.length === 0 && !error;

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      setVideos([]);
      return;
    }
    const controller = new AbortController();
    let isMounted = true;

    setIsLoading(true);
    setError(null);

    const loadData = async () => {
      try {
        const data = await fetchVideoCards(userId, controller.signal);
        if (!isMounted) return;

        setVideos(data.items);
      } catch (err) {
        if (!isMounted) return;
        if ((err as DOMException).name === "AbortError") return;
        setError(err as Error);
        console.error("Error loading videos", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [userId]);

  return { videos, isLoading, empty, error };
}
