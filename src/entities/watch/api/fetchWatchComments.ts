import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";
import type { WatchComment } from "../model/types";

export async function fetchWatchComments(
  videoId: string,
): Promise<WatchComment[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}${API_ROUTES.comments}?videoId=${encodeURIComponent(videoId)}`,
    );

    if (!res.ok) {
      throw new Error(`[Watch API] Failed to fetch comments: ${res.status}`);
    }

    const data: WatchComment[] = await res.json();

    if (!Array.isArray(data)) {
      console.warn("[Watch API] Unexpected comments data format:", data);
      return [];
    }

    return data;
  } catch (err) {
    console.error(err);
  }
  return [];
}
