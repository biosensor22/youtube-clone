import type { FeedItem } from "../model/types";
import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";

export type FeedResponse = {
  items: FeedItem[];
  nextCursor?: string;
  hasMore?: boolean;
};

async function fetchWrapper<T>(
  url: string,
  signal?: AbortSignal,
  retries: number = 0,
): Promise<T> {
  try {
    const fetchOptions: RequestInit = {};
    if (signal instanceof AbortSignal) {
      fetchOptions.signal = signal;
    }

    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`);
    }

    const data: T = await res.json();
    return data;
  } catch (err) {
    if ((err as DOMException).name === "AbortError") {
      throw err;
    }

    if (retries > 0) {
      return fetchWrapper<T>(url, signal, retries - 1);
    }

    throw err;
  }
}

export async function fetchVideoCards(
  signal?: AbortSignal,
): Promise<FeedResponse> {
  const items = await fetchWrapper<FeedItem[]>(
    `${API_BASE_URL}${API_ROUTES.videos}`,
    signal,
  );

  return {
    items,
    nextCursor: "page_2",
    hasMore: false,
  };
}
