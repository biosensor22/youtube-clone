"use client";

import { fetchCategories } from "@/entities/category/api/categoryApi";
import { useEffect, useState } from "react";
import type { Category } from "./types";

export const useUserCategories = (userId: string) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchCategories(userId);
        if (data) {
          setCategories(data);
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
  return { categories, isLoading, error };
};
