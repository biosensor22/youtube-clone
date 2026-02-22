import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";
import type { Category } from "../model/types";

export async function fetchCategories(userId: string): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ROUTES.user_category}`);

    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

    const data: Category[] = await res.json();

    return data;
  } catch (err) {
    console.error("[Category API]:", err);
    return [];
  }
}
