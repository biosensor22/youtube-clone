import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";
import type { Category } from "@/entities/category";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ROUTES.user_category}`);

    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

    const data: Category[] = await res.json();

    return data;
  } catch (err) {
    console.error("[Category API]:", err);
  }
  return [];
}
