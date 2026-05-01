import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";
import type { WatchChannel } from "../model/types";

export async function fetchWatchChannels(): Promise<WatchChannel[]> {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ROUTES.channels}`);

    if (!res.ok) {
      throw new Error(`[Watch API] Failed to fetch channels: ${res.status}`);
    }

    const data: WatchChannel[] = await res.json();

    if (!Array.isArray(data)) {
      console.warn("[Watch API] Unexpected channels data format:", data);
      return [];
    }

    return data;
  } catch (err) {
    console.error(err);
  }
  return [];
}
