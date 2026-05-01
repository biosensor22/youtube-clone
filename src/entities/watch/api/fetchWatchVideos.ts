import type { VideoItem } from "@/entities/video-cards";
import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";

type UnknownObject = Record<string, unknown>;

export function isVideoItem(item: UnknownObject): item is VideoItem {
  return item.type === "video";
}

export async function fetchWatchVideos(): Promise<VideoItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ROUTES.videos}?type=video`);

    if (!res.ok) {
      throw new Error(`[Watch API] Failed to fetch videos: ${res.status}`);
    }

    const items: UnknownObject[] = await res.json();

    if (!Array.isArray(items)) {
      console.warn("[Watch API] Unexpected videos data format:", items);
      return [];
    }

    return items.filter(isVideoItem) as VideoItem[];
  } catch (err) {
    console.error(err);
  }
  return [];
}
