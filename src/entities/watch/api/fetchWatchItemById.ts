import type { FeedItem } from "@/entities/video-cards";
import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";

type UnknownObject = Record<string, unknown>;

export function isFeedItem(item: UnknownObject): item is FeedItem {
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.thumbnail === "string" &&
    typeof item.author === "string" &&
    (item.type === "video" ||
      item.type === "playlist" ||
      item.type === "stream")
  );
}

export async function fetchWatchItemById(
  videoId: string,
): Promise<FeedItem | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ROUTES.videos}/${videoId}`);

    if (!res.ok) {
      throw new Error(`[Watch API] Failed to fetch item: ${res.status}`);
    }

    const item: UnknownObject = await res.json();

    return isFeedItem(item) ? item : null;
  } catch (err) {
    console.error(err);
  }
  return null;
}
