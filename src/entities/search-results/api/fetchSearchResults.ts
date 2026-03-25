import type { FeedItem } from "@/entities/video-cards";
import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";
import { normalizeSearchQuery } from "../model/normalizeSearchQuery";
import type { SearchResultsResponse } from "../model/types";

type FetchSearchResultsParams = {
  query: string;
  page?: number;
  perPage?: number;
  signal?: AbortSignal;
};

const TYPE_TERMS: Record<FeedItem["type"], string[]> = {
  video: ["video", "upload"],
  playlist: ["playlist", "mix", "collection"],
  stream: ["stream", "live", "broadcast", "station"],
};

///////////////////////////////////////////////////////////////////////////////////////////

async function fetchAllFeedItems(signal?: AbortSignal) {
  const response = await fetch(`${API_BASE_URL}${API_ROUTES.videos}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Search request failed: ${response.status}`);
  }

  const data: FeedItem[] = await response.json();

  return data;
}

/////////////////////////////////////////////////////////////////////////////

function matchesQuery(item: FeedItem, normalizedQuery: string) {
  const terms = normalizedQuery.split(" ").filter(Boolean);

  if (!terms.length) return false;

  const title = normalizeSearchQuery(item.title);
  const author = normalizeSearchQuery(item.author);
  const typeText = TYPE_TERMS[item.type].join(" ");
  const haystack = `${title} ${author} ${typeText}`.trim();

  if (haystack.includes(normalizedQuery)) {
    return true;
  }

  const termsQuery = terms.every(
    (term) =>
      title.includes(term) || author.includes(term) || typeText.includes(term),
  );

  return termsQuery;
}

/////////////////////////////////////////////////////////////////

function getItemSignature(item: FeedItem) {
  return [
    item.type,
    normalizeSearchQuery(item.title),
    normalizeSearchQuery(item.author),
    normalizeSearchQuery(item.thumbnail),
  ].join("::");
}

////////////////////////////////////////////////////////////////////////

export async function fetchSearchResults({
  query,
  page = 1,
  perPage = 8,
  signal,
}: FetchSearchResultsParams): Promise<SearchResultsResponse> {
  const normalizedQuery = normalizeSearchQuery(query);

  if (!normalizedQuery) {
    return {
      items: [],
      hasMore: false,
      total: 0,
      page,
      perPage,
      query: "",
    };
  }

  const items = await fetchAllFeedItems(signal);
  const matchedItems = items.filter((item) =>
    matchesQuery(item, normalizedQuery),
  );
  const seenSignatures = new Set<string>();
  const uniqueMatchedItems = matchedItems.filter((item) => {
    const signature = getItemSignature(item);

    if (seenSignatures.has(signature)) {
      return false;
    }

    seenSignatures.add(signature);
    return true;
  });

  const total = uniqueMatchedItems.length;
  const from = (page - 1) * perPage;
  const to = from + perPage;

  return {
    items: uniqueMatchedItems.slice(from, to),
    hasMore: to < total,
    total,
    page,
    perPage,
    query,
  };
}
