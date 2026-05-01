import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";
import type { SearchHistory } from "../model/types";

export async function searchHistoryFetch() {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ROUTES.search_history}`);

    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const result: SearchHistory[] = await res.json();
    if (!result) {
      return [];
    }

    return result;
  } catch (err) {
    console.error("[Search API]:", err);
  }
  return [];
}
