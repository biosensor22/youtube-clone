"use client";

import { startTransition, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buildSearchResultsHref } from "./buildSearchResultsHref";

export function useSearchSubmit() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("search_query") ?? "";
  const [value, setValue] = useState(currentQuery);

  useEffect(() => {
    setValue(currentQuery);
  }, [currentQuery]);

  const submitSearch = (rawValue = value) => {
    const trimmedQuery = rawValue.trim();
    if (!trimmedQuery) return;

    if (pathname === "/results" && trimmedQuery === currentQuery) {
      return;
    }

    const href = buildSearchResultsHref(trimmedQuery);
    startTransition(() => {
      router.push(href);
    });
  };

  return {
    value,
    setValue,
    submitSearch,
  };
}
