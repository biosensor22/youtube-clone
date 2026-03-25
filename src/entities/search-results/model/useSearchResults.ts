"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FeedItem } from "@/entities/video-cards";
import { fetchSearchResults } from "../api";

const PAGE_SIZE = 8;
const OBSERVER_ROOT_MARGIN = "720px 0px";

export function useSearchResults(query: string) {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(false);
  const pageRef = useRef(1);
  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;

  const fetchPage = useCallback(
    async (targetPage: number, replace = false) => {
      if (!hasQuery) return;
      if (loadingRef.current) return;
      if (!replace && !hasMoreRef.current) return;

      const controller = new AbortController();
      abortRef.current = controller;
      loadingRef.current = true;
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchSearchResults({
          query: trimmedQuery,
          page: targetPage,
          perPage: 8,
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        setItems((prev) => (replace ? data.items : [...prev, ...data.items]));
        setTotal(data.total);
        pageRef.current = targetPage + 1;
        hasMoreRef.current = data.hasMore;
      } catch (err) {
        if ((err as DOMException).name === "AbortError") return;
        setError(err as Error);
      } finally {
        if (abortRef.current !== controller) return;
        abortRef.current = null;
        loadingRef.current = false;
        setIsLoading(false);
      }
    },
    [hasQuery, trimmedQuery],
  );

  useEffect(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    loadingRef.current = false;
    hasMoreRef.current = false;
    pageRef.current = 1;
    setItems([]);
    setTotal(0);
    setError(null);

    if (!hasQuery) {
      setIsLoading(false);
      return;
    }

    window.scrollTo({ top: 0 });
    void fetchPage(1, true);

    return () => {
      abortRef.current?.abort();
      abortRef.current = null;
      loadingRef.current = false;
    };
  }, [fetchPage, hasQuery, trimmedQuery]);

  useEffect(() => {
    if (!hasQuery) return;

    const target = sentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry?.isIntersecting &&
          hasMoreRef.current &&
          !loadingRef.current
        ) {
          void fetchPage(pageRef.current);
        }
      },
      { rootMargin: OBSERVER_ROOT_MARGIN },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [fetchPage, hasQuery, items.length]);

  const empty = hasQuery && !isLoading && !error && items.length === 0;

  return {
    items,
    total,
    error,
    empty,
    hasQuery,
    isLoading,
    sentinelRef,
  };
}
