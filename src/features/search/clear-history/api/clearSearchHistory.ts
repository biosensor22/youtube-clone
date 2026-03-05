import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";

export async function clearSearchHistory(id: string) {
  if (!id) return;

  try {
    const res = await fetch(
      `${API_BASE_URL}${API_ROUTES.search_history}/${id}`,
      {
        method: "DELETE",
      },
    );
    if (!res.ok) {
      throw new Error(`Delete failed: ${res.status}`);
    }
  } catch (err) {
    console.error("[Search History API]:", err);
  }
}
