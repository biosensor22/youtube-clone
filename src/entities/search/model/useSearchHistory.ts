"use client";

import { searchHistoryFetch } from "@/entities/search/api";
import { useEffect, useState } from "react";
import { SearchHistory } from "./types";

export function useSearchHistory() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await searchHistoryFetch();
        if (data) {
          setSearchHistory(data);
        } else {
          return [];
        }
      } catch (err) {
        if ((err as DOMException).name === "AbortError") return;
        setError(err as Error);
        console.error("Error loading categories", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSearchHistory();
  }, []);

  return { searchHistory, isLoading, error };
}
