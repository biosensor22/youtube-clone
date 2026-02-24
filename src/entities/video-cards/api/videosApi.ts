import type { FeedItem } from "@/entities/video-cards";
import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";

type PaginatedResponse<T> = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T;
};

export type FeedResponse = {
  items: FeedItem[];
  hasMore: boolean;
  total: number;
  page: number;
  perPage: number;
};

async function fetchWrapper<T>(
  url: string,
  signal?: AbortSignal,
  retries = 2,
): Promise<T> {
  try {
    const res = await fetch(url, { signal });

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`);
    }

    return (await res.json()) as T;
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

type FetchVideoCardsParams = {
  page?: number;
  perPage?: number;
  userId?: string;
  signal?: AbortSignal;
};

export async function fetchVideoCards(
  params: FetchVideoCardsParams = {},
): Promise<FeedResponse> {
  const { page = 1, perPage = 12, signal, userId } = params;
  void userId;

  const query = new URLSearchParams({
    _page: String(page),
    _per_page: String(perPage),
  });

  const response = await fetchWrapper<
    PaginatedResponse<FeedItem[]> | FeedItem[]
  >(`${API_BASE_URL}${API_ROUTES.videos}?${query.toString()}`, signal);

  if (Array.isArray(response)) {
    const total = response.length;
    const from = (page - 1) * perPage;
    const to = page * perPage;
    return {
      items: response.slice(from, to),
      hasMore: to < total,
      total,
      page,
      perPage,
    };
  }

  const items = Array.isArray(response.data) ? response.data : [];
  const total =
    typeof response.items === "number" ? response.items : items.length;

  return {
    items,
    hasMore: response.next !== null,
    total,
    page,
    perPage,
  };
}
