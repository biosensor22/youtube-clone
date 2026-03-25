import type { FeedItem } from "@/entities/video-cards";
import { numberConvert, timeAgo } from "@/shared/lib/hooks";

export type SearchResultPresentation = {
  statsLine: string;
  summaryLine: string;
  mediaBadge: string;
};

export function buildSearchResultPresentation(
  item: FeedItem,
): SearchResultPresentation {
  switch (item.type) {
    case "video":
      return {
        statsLine: `${numberConvert(item.views)} views • ${timeAgo(item.publishedAt)}`,
        summaryLine: "",
        mediaBadge: item.duration,
      };
    case "stream":
      return {
        statsLine: `${numberConvert(item.viewers)} watching • started ${timeAgo(item.startedAt)}`,
        summaryLine: "",
        mediaBadge: `${numberConvert(item.viewers)} watching`,
      };
    case "playlist":
      return {
        statsLine: `${item.author.split(",")[0]} • Playlist • ${timeAgo(item.updatedAt)}`,
        summaryLine: "",
        mediaBadge: `${item.videosCount} videos`,
      };
    default:
      return {
        statsLine: "",
        summaryLine: "",
        mediaBadge: "",
      };
  }
}
