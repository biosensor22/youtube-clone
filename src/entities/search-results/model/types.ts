import type { FeedItem } from "@/entities/video-cards";

export type SearchResultsResponse = {
  items: FeedItem[];
  hasMore: boolean;
  total: number;
  page: number;
  perPage: number;
  query: string;
};
