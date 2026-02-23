"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchVideoCards } from "../api/videosApi";
import type { FeedItem } from "../model/types";

const PAGE_SIZE = 12;
const SCROLL_OFFSET = 120;

export function useUserVideos(userId: string) {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState<FeedItem[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const pageRef = useRef(1);

  const empty = !isLoading && videos.length === 0 && !error;

  const fetchData = useCallback(async (targetPage: number, replace = false) => {
    if (loadingRef.current) return;
    if (!replace && !hasMoreRef.current) return;

    const controller = new AbortController();
    abortRef.current = controller;

    loadingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchVideoCards({
        page: targetPage,
        perPage: PAGE_SIZE,
        userId,
        signal: controller.signal,
      });

      if (controller.signal.aborted) return;

      setVideos((prev) => (replace ? data.items : [...prev, ...data.items]));

      const nextPage = targetPage + 1;
      pageRef.current = nextPage;

      hasMoreRef.current = data.hasMore;
    } catch (err) {
      if ((err as DOMException).name === "AbortError") return;

      setError(err as Error);
      console.error("Error loading videos", err);
    } finally {
      if (abortRef.current !== controller) return;
      abortRef.current = null;
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    abortRef.current?.abort();
    abortRef.current = null;

    loadingRef.current = false;
    pageRef.current = 1;
    hasMoreRef.current = true;

    setVideos([]);
    setError(null);

    void fetchData(1, true);

    return () => {
      abortRef.current?.abort();
      abortRef.current = null;
      loadingRef.current = false;
    };
  }, [userId, fetchData]);

  useEffect(() => {
    let animationFrame = 0;

    const handleScroll = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;

        const reachedBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - SCROLL_OFFSET;

        if (
          reachedBottom &&
          !loadingRef.current &&
          hasMoreRef.current
        ) {
          void fetchData(pageRef.current);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);

  return { videos, isLoading, empty, error };
}
