import type { FeedItem } from "../model/types";

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
    const res = await fetch(url, { signal });

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
  userId: string,
  signal?: AbortSignal,
): Promise<FeedResponse> {
  const items: FeedItem[] = await fetchWrapper<FeedItem[]>(
    "/api/videos.json",
    signal,
  );

  return {
    items,
    nextCursor: "page_2",
    hasMore: false,
  };
}
