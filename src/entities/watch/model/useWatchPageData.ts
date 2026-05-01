"use client";

import { useEffect, useState } from "react";
import { fetchWatchPageData } from "../api/watchApi";
import type { WatchPageData } from "./types";

const initialData: WatchPageData = {
  currentItem: null,
  channel: null,
  comments: [],
  recommendations: [],
};

export function useWatchPageData(videoId: string) {
  const [data, setData] = useState<WatchPageData>(initialData);
  const [loadedVideoId, setLoadedVideoId] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    void fetchWatchPageData(videoId)
      .then((response) => {
        if (!isMounted) return;
        setData(response);
        setError(null);
        setLoadedVideoId(videoId);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err as Error);
        setLoadedVideoId(videoId);
      });

    return () => {
      isMounted = false;
    };
  }, [videoId]);

  const isLoading = loadedVideoId !== videoId;

  return {
    ...data,
    isLoading,
    error,
  };
}
